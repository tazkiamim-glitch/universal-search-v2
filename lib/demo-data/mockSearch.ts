import { catalog } from "./fixtures";
import type { Catalog, Chapter, Content, Subject, Topic } from "./types";

type SearchSections = {
  subjects: Subject[];
  chapters: Chapter[];
  topics: Topic[];
  videos: {
    live: Content[];
    recorded: Content[];
    animated: Content[];
    stories: Content[];
    guideline: Content[];
  };
  notes: {
    smart: Content[];
    class: Content[];
    pdf: Content[];
  };
  tests: {
    mcq: Content[];
    cq: Content[];
    model: Content[];
    liveExam: Content[];
  };
};

const TYPE_INTENTS: Record<string, string[]> = {
  VIDEO: ["video", "ভিডিও"],
  LIVE: ["live", "লাইভ"],
  REC: ["recorded", "রেকর্ড", "class", "ক্লাস"],
  ANIM: ["animated", "animation", "অ্যানিম"],
  STORY: ["story", "শর্ট", "স্টোরি"],
  GUIDE: ["guideline", "tip", "গাইড"],
  NOTE: ["note", "notes", "নোট"],
  SMART: ["smart"],
  CLASS: ["class note", "class-note"],
  PDF: ["pdf"],
  MCQ: ["mcq", "quiz", "কুইজ"],
  CQ: ["cq"],
  MODEL: ["model"],
  LIVE_EXAM: ["live exam", "লাইভ পরীক্ষা"],
};

function normalize(s: string): string {
  return s.trim().toLowerCase();
}

function includesAny(hay: string, needles: string[]): boolean {
  const h = normalize(hay);
  return needles.some((n) => h.includes(normalize(n)));
}

function fuzzyIncludes(hay: string, needle: string): boolean {
  const h = normalize(hay);
  const n = normalize(needle);
  // distance <= 1 via simple windowed check
  if (h.includes(n)) return true;
  if (n.length < 5) return false; // no fuzzy for <5-char tokens (per requirement)
  // allow one deletion/insertion
  for (let i = 0; i < h.length - n.length + 2; i++) {
    const window = h.slice(i, i + n.length + 1);
    let best = 999;
    for (let j = 0; j < window.length - n.length + 1; j++) {
      const candidate = window.slice(j, j + n.length);
      const dist = levenshtein1(candidate, n);
      if (dist < best) best = dist;
      if (best <= 1) return true;
    }
  }
  return false;
}

function levenshtein1(a: string, b: string): number {
  // optimized for distance small; bail >1
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > 1) return 2;
  let diff = 0;
  const minLen = Math.min(a.length, b.length);
  for (let i = 0; i < minLen; i++) if (a[i] !== b[i]) diff++;
  diff += Math.abs(a.length - b.length);
  return diff;
}

function matchTokens(q: string, tokens: string[]): boolean {
  if (!q) return true;
  return tokens.some((t) => fuzzyIncludes(q, t) || fuzzyIncludes(t, q));
}

function paperHints(q: string): { first?: boolean; second?: boolean } {
  const n = normalize(q);
  const firstHints = ["১ম", "প্রথম", "1st", "first", "bangla 1st", "bn 1st"]; // cover bn/en
  const secondHints = ["২য়", "দ্বিতীয়", "2nd", "second", "bangla 2nd", "bn 2nd"];
  return {
    first: includesAny(n, firstHints),
    second: includesAny(n, secondHints),
  };
}

function detectTypeIntents(q: string): Set<keyof typeof TYPE_INTENTS> {
  const found = new Set<keyof typeof TYPE_INTENTS>();
  const n = normalize(q);
  (Object.keys(TYPE_INTENTS) as Array<keyof typeof TYPE_INTENTS>).forEach((k) => {
    if (includesAny(n, TYPE_INTENTS[k])) found.add(k);
  });
  return found;
}

function bySubjectFilter(q: string, cat: Catalog): { subjectIds: Set<string> } {
  const wanted = new Set<string>();
  const hints = paperHints(q);
  for (const s of cat.subjects) {
    if (matchTokens(q, s.tokens)) {
      if (s.paper === "১ম পত্র" && hints.second) continue;
      if (s.paper === "২য় পত্র" && hints.first) continue;
      wanted.add(s.id);
    }
  }
  // If no explicit subject match, keep it empty (means all subjects allowed)
  return { subjectIds: wanted };
}

function topN<T>(arr: T[], n = 3): T[] {
  return arr.slice(0, n);
}

export function searchAll(q: string): SearchSections {
  const intents = detectTypeIntents(q);
  const { subjectIds } = bySubjectFilter(q, catalog);
  const restrictBySubject = subjectIds.size > 0;

  const subjects = catalog.subjects.filter((s) => {
    if (restrictBySubject && !subjectIds.has(s.id)) return false;
    return matchTokens(q, [s.name, ...(s.tokens || [])]);
  });

  const chapters = catalog.chapters.filter((c) => {
    if (restrictBySubject && !subjectIds.has(c.subjectId)) return false;
    const subject = catalog.subjects.find((s) => s.id === c.subjectId);
    return matchTokens(q, [c.name, ...(c.tokens || []), ...(subject?.tokens || [])]);
  });

  const topics = catalog.topics.filter((t) => {
    const chapter = catalog.chapters.find((c) => c.id === t.chapterId);
    if (!chapter) return false;
    if (restrictBySubject && !subjectIds.has(chapter.subjectId)) return false;
    return matchTokens(q, [t.name, ...(t.tokens || [])]);
  });

  const contents = catalog.contents.filter((cnt) => {
    const topic = catalog.topics.find((t) => t.id === cnt.topicId);
    if (!topic) return false;
    const chapter = catalog.chapters.find((c) => c.id === topic.chapterId);
    if (!chapter) return false;
    if (restrictBySubject && !subjectIds.has(chapter.subjectId)) return false;

    let ok = matchTokens(q, [cnt.title, ...(cnt.tags || [])]);
    if (!ok) {
      // also let topic/chapter tokens help
      ok = matchTokens(q, [ ...(topic.tokens || []), ...(chapter.tokens || []) ]);
    }

    if (!ok) return false;

    // type intent filters
    if (intents.size > 0) {
      const t = cnt.type;
      const typeOk = (
        (t === "LIVE_CLASS" && (intents.has("LIVE") || intents.has("VIDEO"))) ||
        (t === "RECORDED_CLASS" && (intents.has("REC") || intents.has("VIDEO") || intents.has("NOTE") === false)) ||
        (t === "ANIMATED_VIDEO" && (intents.has("ANIM") || intents.has("VIDEO"))) ||
        (t === "STORY" && intents.has("STORY")) ||
        (t === "GUIDELINE_VIDEO" && (intents.has("GUIDE") || intents.has("VIDEO"))) ||
        (t === "SMART_NOTE" && (intents.has("SMART") || intents.has("NOTE"))) ||
        (t === "CLASS_NOTE" && (intents.has("CLASS") || intents.has("NOTE"))) ||
        (t === "PDF_NOTES" && (intents.has("PDF") || intents.has("NOTE"))) ||
        (t === "MCQ" && intents.has("MCQ")) ||
        (t === "CQ" && intents.has("CQ")) ||
        (t === "MODEL_TEST" && intents.has("MODEL")) ||
        (t === "LIVE_EXAM" && (intents.has("LIVE_EXAM") || intents.has("LIVE")))
      );
      if (!typeOk) return false;
    }
    return true;
  });

  const videos = {
    live: topN(contents.filter((c) => c.type === "LIVE_CLASS")),
    recorded: topN(contents.filter((c) => c.type === "RECORDED_CLASS")),
    animated: topN(contents.filter((c) => c.type === "ANIMATED_VIDEO")),
    stories: topN(contents.filter((c) => c.type === "STORY")),
    guideline: topN(contents.filter((c) => c.type === "GUIDELINE_VIDEO")),
  };

  const notes = {
    smart: topN(contents.filter((c) => c.type === "SMART_NOTE")),
    class: topN(contents.filter((c) => c.type === "CLASS_NOTE")),
    pdf: topN(contents.filter((c) => c.type === "PDF_NOTES")),
  };

  const tests = {
    mcq: topN(contents.filter((c) => c.type === "MCQ")),
    cq: topN(contents.filter((c) => c.type === "CQ")),
    model: topN(contents.filter((c) => c.type === "MODEL_TEST")),
    liveExam: topN(contents.filter((c) => c.type === "LIVE_EXAM")),
  };

  return {
    subjects: topN(subjects),
    chapters: topN(chapters),
    topics: topN(topics),
    videos,
    notes,
    tests,
  };
}

export type { SearchSections };



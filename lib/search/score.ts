import { Class, Program, Phase, Subject, Chapter, Topic, Content, MixedResult, MixedResultType } from "./types";
import { normalize, tokenize, isBengaliToken, isLatinToken } from "./normalize";
import { SEARCH_CONFIG } from "./config";
import { detectIntent, Intent } from "./intent";

type Catalog = {
  classes: Class[];
  programs: Program[];
  phases: Phase[];
  subjects: Subject[];
  chapters: Chapter[];
  topics: Topic[];
  contents: Content[];
};

const WEIGHTS = SEARCH_CONFIG.boosts;

export function buildSearchableString(
  item: Class | Program | Phase | Subject | Chapter | Topic | Content,
  catalog: Catalog
): { title: string; searchable: string; breadcrumbs: string[]; kind: MixedResultType } {
  // Class
  if ('name' in (item as any) && !('classId' in (item as any)) && !('programId' in (item as any)) && !('phaseId' in (item as any)) && !('subjectId' in (item as any)) && !('chapterId' in (item as any)) && !('topicId' in (item as any))) {
    const cls = item as Class;
    const title = cls.name;
    return { title, searchable: normalize(title), breadcrumbs: [], kind: "CLASS" };
  }
  
  // Program
  if ('classId' in (item as any) && !('programId' in (item as any)) && !('phaseId' in (item as any)) && !('subjectId' in (item as any)) && !('chapterId' in (item as any)) && !('topicId' in (item as any))) {
    const prog = item as Program;
    const cls = catalog.classes.find(c => c.id === prog.classId);
    const bc = [cls?.name ?? ""];
    const title = prog.name;
    const searchable = normalize(`${title} ${bc.join(" ")}`);
    return { title, searchable, breadcrumbs: bc, kind: "PROGRAM" };
  }
  
  // Phase
  if ('programId' in (item as any) && !('phaseId' in (item as any)) && !('subjectId' in (item as any)) && !('chapterId' in (item as any)) && !('topicId' in (item as any))) {
    const phase = item as Phase;
    const prog = catalog.programs.find(p => p.id === phase.programId);
    const cls = prog ? catalog.classes.find(c => c.id === prog.classId) : undefined;
    const bc = [cls?.name ?? "", prog?.name ?? ""];
    const title = phase.name;
    const searchable = normalize(`${title} ${bc.join(" ")}`);
    return { title, searchable, breadcrumbs: bc, kind: "PHASE" };
  }
  
  // Subject
  if ('phaseId' in (item as any) && !('subjectId' in (item as any)) && !('chapterId' in (item as any)) && !('topicId' in (item as any))) {
    const subj = item as Subject;
    const phase = catalog.phases.find(p => p.id === subj.phaseId);
    const prog = phase ? catalog.programs.find(p => p.id === phase.programId) : undefined;
    const cls = prog ? catalog.classes.find(c => c.id === prog.classId) : undefined;
    const bc = [cls?.name ?? "", prog?.name ?? "", phase?.name ?? ""];
    const title = `${subj.name}${subj.paper ? ` ${subj.paper}` : ""}`;
    const searchable = normalize(`${title} ${bc.join(" ")}`);
    return { title, searchable, breadcrumbs: bc, kind: "SUBJECT" };
  }
  
  // Chapter
  if ('subjectId' in (item as any) && !('chapterId' in (item as any)) && !('topicId' in (item as any))) {
    const ch = item as Chapter;
    const subj = catalog.subjects.find(s => s.id === ch.subjectId);
    const phase = subj ? catalog.phases.find(p => p.id === subj.phaseId) : undefined;
    const prog = phase ? catalog.programs.find(p => p.id === phase.programId) : undefined;
    const cls = prog ? catalog.classes.find(c => c.id === prog.classId) : undefined;
    const bc = [cls?.name ?? "", prog?.name ?? "", phase?.name ?? "", subj?.name ?? ""];
    const title = ch.name;
    const searchable = normalize(`${title} ${bc.join(" ")}`);
    return { title, searchable, breadcrumbs: bc, kind: "CHAPTER" };
  }
  
  // Topic
  if ('chapterId' in (item as any) && !('type' in (item as any))) {
    const tp = item as Topic;
    const ch = catalog.chapters.find(c => c.id === tp.chapterId);
    const subj = ch ? catalog.subjects.find(s => s.id === ch.subjectId) : undefined;
    const phase = subj ? catalog.phases.find(p => p.id === subj.phaseId) : undefined;
    const prog = phase ? catalog.programs.find(p => p.id === phase.programId) : undefined;
    const cls = prog ? catalog.classes.find(c => c.id === prog.classId) : undefined;
    const bc = [cls?.name ?? "", prog?.name ?? "", phase?.name ?? "", subj?.name ?? "", ch?.name ?? ""];
    const title = tp.name;
    const searchable = normalize(`${title} ${bc.join(" ")}`);
    return { title, searchable, breadcrumbs: bc, kind: "TOPIC" };
  }
  
  // Content
  const cnt = item as Content;
  const tp = catalog.topics.find(t => t.id === cnt.topicId);
  const ch = tp ? catalog.chapters.find(c => c.id === tp.chapterId) : undefined;
  const subj = ch ? catalog.subjects.find(s => s.id === ch.subjectId) : undefined;
  const phase = subj ? catalog.phases.find(p => p.id === subj.phaseId) : undefined;
  const prog = phase ? catalog.programs.find(p => p.id === phase.programId) : undefined;
  const cls = prog ? catalog.classes.find(c => c.id === prog.classId) : undefined;
  const bc = [cls?.name ?? "", prog?.name ?? "", phase?.name ?? "", subj?.name ?? "", ch?.name ?? "", tp?.name ?? ""];
  const title = cnt.title;
  const typeLabel = contentTypeLabel(cnt.type);
  const desc = cnt.description || "";
  const teacher = cnt.teacher || "";
  const topicTokens = tp?.tokens ? tp.tokens.join(" ") : "";
  const searchable = normalize(`${title} ${typeLabel} ${desc} ${teacher} ${topicTokens} ${bc.join(" ")}`);
  return { title, searchable, breadcrumbs: bc, kind: "CONTENT" };
}

export function scoreItem(qTokens: string[], item: Class | Program | Phase | Subject | Chapter | Topic | Content, catalog: Catalog, intent: Intent): MixedResult | null {
  const meta = buildSearchableString(item, catalog);
  const titleN = normalize(meta.title);
  const breadN = meta.breadcrumbs.map(b => normalize(b));
  const searchableN = normalize(meta.searchable);

  let score = 0;
  let matchedAny = false;
  
  // Debug information
  const debug = {
    matchedTokens: [] as string[],
    searchableString: searchableN,
    titleMatches: 0,
    searchableMatches: 0,
    freeContentBoost: false,
    contentTypeBoost: 0,
    recencyBoost: false
  };

  // Exact phrase boost for title
  const phrase = qTokens.join(" ");
  if (phrase && titleN.includes(phrase)) score += WEIGHTS.exactPhrase;

  // Token matching with TF-IDF style scoring
  let titleExactHits = 0;
  let titleTokenCount = 0;
  
  for (const t of qTokens) {
    if (!t) continue;
    titleTokenCount++;
    const tIsBn = isBengaliToken(t);
    const tIsLat = isLatinToken(t);
    const allowFuzzy = t.length >= SEARCH_CONFIG.minTokenLengthForFuzzy;

    // Exact term match in title (highest weight)
    if (titleN.split(" ").includes(t)) {
      score += WEIGHTS.exactTerm;
      matchedAny = true;
      titleExactHits++;
      debug.matchedTokens.push(t);
      debug.titleMatches++;
      continue;
    }

    // Exact term match in description/teacher (medium weight)
    if (meta.kind === "CONTENT") {
      const content = item as Content;
      const descN = normalize(content.description || "");
      const teacherN = normalize(content.teacher || "");
      if (descN.split(" ").includes(t) || teacherN.split(" ").includes(t)) {
        score += WEIGHTS.exactTerm * 0.7; // Slightly lower than title match
        matchedAny = true;
        continue;
      }
    }

    // Exact term match in searchable string (includes topic tokens)
    if (searchableN.split(" ").includes(t)) {
      score += WEIGHTS.exactTerm * 0.8; // High weight for searchable match
      matchedAny = true;
      debug.matchedTokens.push(t);
      debug.searchableMatches++;
      continue;
    }

    // Partial match in searchable string (for partial search)
    if (searchableN.split(" ").some(word => word.includes(t) || t.includes(word))) {
      score += WEIGHTS.exactTerm * 0.6; // Medium weight for partial match
      matchedAny = true;
      debug.matchedTokens.push(t);
      debug.searchableMatches++;
      continue;
    }

    // Prefix helper (edge n-gram like)
    if (titleN.split(" ").some(w => w.startsWith(t)) || breadN.some(b => b.split(" ").some(w => w.startsWith(t)))) {
      score += WEIGHTS.prefix;
    }

    // Breadcrumb exact match
    if (breadN.some(b => b.split(" ").includes(t))) {
      score += WEIGHTS.breadcrumb;
      matchedAny = true;
    }

    // Fuzzy backup only for long tokens, and do not cross scripts
    if (allowFuzzy) {
      const fuzzyHit = fuzzyContains(searchableN, t, tIsBn ? "bn" : tIsLat ? "en" : "any");
      if (fuzzyHit) {
        score += WEIGHTS.fuzzy;
        matchedAny = true;
      }
    }
  }

  // Minimum should match for content titles
  if (meta.kind === "CONTENT" && titleTokenCount > 0) {
    const ratio = titleExactHits / titleTokenCount;
    if (ratio < SEARCH_CONFIG.minShouldMatchContent) {
      // Check if there are matches in the searchable string (includes topic tokens)
      const searchableHits = qTokens.filter(t => searchableN.split(" ").includes(t)).length;
      const searchableRatio = searchableHits / titleTokenCount;
      if (searchableRatio < SEARCH_CONFIG.minShouldMatchContent) {
        return null;
      }
    }
  }

  // Recency boost for live content
  if (meta.kind === "CONTENT") {
    const content = item as Content;
    if (content.startsAt) {
      const startsAt = new Date(content.startsAt).getTime();
      const now = Date.now();
      if (startsAt > now - 12 * 60 * 60 * 1000) score += WEIGHTS.recency;
    }
  }

  // Content type priority boost (from PRD)
  if (meta.kind === "CONTENT") {
    const content = item as Content;
    
    // Free content gets priority boost
    if (content.isFree) {
      score += 5; // Significant boost for free content
      debug.freeContentBoost = true;
    }
    
    switch (content.type) {
      case "LIVE_CLASS": score += 3; debug.contentTypeBoost = 3; break;
      case "RECORDED_CLASS": score += 2; debug.contentTypeBoost = 2; break;
      case "ANIMATED_VIDEO": score += 1; debug.contentTypeBoost = 1; break;
      case "SMART_NOTE": score += 2; debug.contentTypeBoost = 2; break;
      case "PDF_NOTES": score += 1; debug.contentTypeBoost = 1; break;
      case "QUIZ": score += 1; debug.contentTypeBoost = 1; break;
      case "MODEL_TEST": score += 2; debug.contentTypeBoost = 2; break;
      case "LIVE_EXAM": score += 3; debug.contentTypeBoost = 3; break;
    }
  }

  if (!matchedAny) return null;
  return { kind: meta.kind, score, item, debug };
}

function contentTypeLabel(t: Content["type"]): string {
  switch (t) {
    case "LIVE_CLASS": return "লাইভ ক্লাস";
    case "LIVE_REPLAY": return "লাইভ রিপ্লে";
    case "LIVE_EXAM": return "লাইভ এক্সাম";
    case "MODEL_TEST": return "মডেল টেস্ট";
    case "CQ_EXAM": return "CQ এক্সাম";
    case "ANIMATED_VIDEO": return "ভিডিও লেসন";
    case "RECORDED_CLASS": return "রেকর্ডেড ক্লাস";
    case "STORY": return "স্টোরি";
    case "GUIDELINE_VIDEO": return "গাইডলাইন ভিডিও";
    case "PDF_NOTES": return "PDF নোট";
    case "SMART_NOTE": return "স্মার্ট নোট";
    case "CLASS_NOTE": return "ক্লাস নোট";
    case "ADMISSION_NOTE": return "ভর্তি নোট";
    case "QUIZ": return "কুইজ";
    case "HOMEWORK": return "হোমওয়ার্ক";
  }
}

export function searchAll(query: string, catalog: Catalog): { results: MixedResult[]; intent: Intent } {
  const intent = detectIntent(query, catalog.subjects);
  const qTokens = intent.tokens;
  const results: MixedResult[] = [];
  const push = (x: MixedResult | null) => { if (x) results.push(x); };
  
  // Search all hierarchy levels
  catalog.classes.forEach(c => push(scoreItem(qTokens, c, catalog, intent)));
  catalog.programs.forEach(p => push(scoreItem(qTokens, p, catalog, intent)));
  catalog.phases.forEach(ph => push(scoreItem(qTokens, ph, catalog, intent)));
  catalog.subjects.forEach(s => push(scoreItem(qTokens, s, catalog, intent)));
  catalog.chapters.forEach(c => push(scoreItem(qTokens, c, catalog, intent)));
  catalog.topics.forEach(t => push(scoreItem(qTokens, t, catalog, intent)));
  catalog.contents.forEach(c => push(scoreItem(qTokens, c, catalog, intent)));
  
  return { results: results.sort((a, b) => b.score - a.score || secondarySort(a, b, catalog)), intent };
}

function secondarySort(a: MixedResult, b: MixedResult, catalog: Catalog): number {
  // Prioritize by hierarchy level (Content > Topic > Chapter > Subject > Phase > Program > Class)
  const hierarchyOrder = { "CONTENT": 7, "TOPIC": 6, "CHAPTER": 5, "SUBJECT": 4, "PHASE": 3, "PROGRAM": 2, "CLASS": 1 };
  const aOrder = hierarchyOrder[a.kind];
  const bOrder = hierarchyOrder[b.kind];
  
  if (aOrder !== bOrder) return bOrder - aOrder;
  
  // For same hierarchy level, prioritize by recency
  const getStartsAt = (m: MixedResult): number => {
    if (m.kind !== "CONTENT") return 0;
    const c = m.item as Content;
    return c.startsAt ? new Date(c.startsAt).getTime() : 0;
  };
  return getStartsAt(b) - getStartsAt(a);
}

function getSubjectIdForItem(item: Class | Program | Phase | Subject | Chapter | Topic | Content, catalog: Catalog): string | null {
  if ('topicId' in (item as any)) {
    const cnt = item as Content;
    const tp = catalog.topics.find(t => t.id === cnt.topicId);
    const ch = tp ? catalog.chapters.find(c => c.id === tp.chapterId) : undefined;
    const subj = ch ? catalog.subjects.find(s => s.id === ch.subjectId) : undefined;
    return subj ? subj.id : null;
  }
  if ('chapterId' in (item as any)) {
    const tp = item as Topic;
    const ch = catalog.chapters.find(c => c.id === tp.chapterId);
    const subj = ch ? catalog.subjects.find(s => s.id === ch.subjectId) : undefined;
    return subj ? subj.id : null;
  }
  if ('subjectId' in (item as any)) {
    const ch = item as Chapter;
    return ch.subjectId;
  }
  if ('phaseId' in (item as any)) {
    const subj = item as Subject;
    return subj.id;
  }
  return null;
}

function fuzzyContains(text: string, token: string, script: "bn" | "en" | "any"): boolean {
  const words = text.split(" ");
  for (const w of words) {
    if (!w) continue;
    if (script !== "any") {
      const wIsBn = /[\u0980-\u09FF]/.test(w);
      const wIsEn = /[A-Za-z]/.test(w);
      if ((script === "bn" && !wIsBn) || (script === "en" && !wIsEn)) continue;
    }
    if (levenshteinLeq1(w, token)) return true;
  }
  return false;
}

// Fast path Levenshtein distance check for <= 1
function levenshteinLeq1(a: string, b: string): boolean {
  if (a === b) return true;
  const la = a.length, lb = b.length;
  if (Math.abs(la - lb) > 1) return false;
  // If lengths equal: allow one substitution
  if (la === lb) {
    let diff = 0;
    for (let i = 0; i < la; i++) {
      if (a[i] !== b[i]) {
        diff++;
        if (diff > 1) return false;
      }
    }
    return diff <= 1;
  }
  // If length differs by 1: allow one insertion/deletion
  let i = 0, j = 0, diffs = 0;
  while (i < la && j < lb) {
    if (a[i] === b[j]) { i++; j++; continue; }
    diffs++;
    if (diffs > 1) return false;
    if (la > lb) i++; else j++;
  }
  return true; // remaining tail counts as the one edit
}

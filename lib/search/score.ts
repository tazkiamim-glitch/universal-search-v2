import { Chapter, Content, MixedResult, MixedResultType, Subject, Topic } from "./types";
import { normalize, tokenize, isBengaliToken, isLatinToken } from "./normalize";
import { SEARCH_CONFIG } from "./config";
import { detectIntent, Intent } from "./intent";

type Catalog = {
  subjects: Subject[];
  chapters: Chapter[];
  topics: Topic[];
  contents: Content[];
};

const WEIGHTS = SEARCH_CONFIG.boosts;

export function buildSearchableString(
  item: Subject | Chapter | Topic | Content,
  catalog: Catalog
): { title: string; searchable: string; breadcrumbs: string[]; kind: MixedResultType } {
  if (!('subjectId' in (item as any)) && !('chapterId' in (item as any)) && !('topicId' in (item as any))) {
    const subj = item as Subject;
    const title = `${subj.name}${subj.paper ? ` ${subj.paper}` : ""}`;
    return { title, searchable: normalize(title), breadcrumbs: [], kind: "SUBJECT" };
  }
  if ('subjectId' in (item as any)) {
    const ch = item as Chapter;
    const subj = catalog.subjects.find(s => s.id === ch.subjectId);
    const bc = [subj?.name ?? ""];
    const title = ch.name;
    const searchable = normalize(`${title} ${bc.join(" ")}`);
    return { title, searchable, breadcrumbs: bc, kind: "CHAPTER" };
  }
  if ('chapterId' in (item as any) && !('type' in (item as any))) {
    const tp = item as Topic;
    const ch = catalog.chapters.find(c => c.id === tp.chapterId);
    const subj = ch ? catalog.subjects.find(s => s.id === ch.subjectId) : undefined;
    const bc = [subj?.name ?? "", ch?.name ?? ""];
    const title = tp.name;
    const searchable = normalize(`${title} ${bc.join(" ")}`);
    return { title, searchable, breadcrumbs: bc, kind: "TOPIC" };
  }
  const cnt = item as Content;
  const tp = catalog.topics.find(t => t.id === cnt.topicId);
  const ch = tp ? catalog.chapters.find(c => c.id === tp.chapterId) : undefined;
  const subj = ch ? catalog.subjects.find(s => s.id === ch.subjectId) : undefined;
  const bc = [subj?.name ?? "", ch?.name ?? "", tp?.name ?? ""];
  const title = cnt.title;
  const typeLabel = contentTypeLabel(cnt.type);
  const searchable = normalize(`${title} ${typeLabel} ${bc.join(" ")}`);
  return { title, searchable, breadcrumbs: bc, kind: "CONTENT" };
}

export function scoreItem(qTokens: string[], item: Subject | Chapter | Topic | Content, catalog: Catalog, intent: Intent): MixedResult | null {
  const meta = buildSearchableString(item, catalog);
  const titleN = normalize(meta.title);
  const breadN = meta.breadcrumbs.map(b => normalize(b));
  const itemSubjectId = getSubjectIdForItem(item, catalog);

  // If a specific subject inferred, only that subject can appear
  if (meta.kind === "SUBJECT" && intent.inferredSubjectId) {
    const subj = item as Subject;
    if (subj.id !== intent.inferredSubjectId) return null;
  }
  // If only subject family detected (no paper), allow only those subjects
  if (meta.kind === "SUBJECT" && !intent.inferredSubjectId && intent.subjectCandidateIds.length > 0) {
    const subj = item as Subject;
    if (!intent.subjectCandidateIds.includes(subj.id)) return null;
  }

  // Note: Hard content-type filters are applied in the UI per-tab/segment.

  // For non-subject items, gate by inferred subject (strict) or subject family presence
  if (meta.kind !== "SUBJECT") {
    if (intent.inferredSubjectId) {
      if (!itemSubjectId || itemSubjectId !== intent.inferredSubjectId) return null;
    } else if (intent.subjectCandidateIds.length > 0) {
      if (!itemSubjectId || !intent.subjectCandidateIds.includes(itemSubjectId)) return null;
    }
  }

  let score = 0;
  let matchedAny = false;

  // Build subject-term set for candidate subjects to exclude from title mm
  const subjectTermSet = new Set<string>();
  for (const sid of intent.subjectCandidateIds) {
    const s = catalog.subjects.find(x => x.id === sid);
    if (s) {
      subjectTermSet.add(normalize(s.name));
      if ((s as any).paper) subjectTermSet.add(normalize(String((s as any).paper)));
      for (const tk of s.tokens) subjectTermSet.add(normalize(tk));
    }
  }

  // Exact phrase boost for title
  const phrase = qTokens.join(" ");
  if (phrase && titleN.includes(phrase)) score += WEIGHTS.exactPhrase;

  // Token matching with rules
  let titleExactHits = 0;
  let titleTokenCount = 0;
  for (const t of qTokens) {
    if (!t) continue;
    const isSubjectToken = subjectTermSet.has(t);
    if (!isSubjectToken) titleTokenCount++;
    const tIsBn = isBengaliToken(t);
    const tIsLat = isLatinToken(t);
    const allowFuzzy = t.length >= SEARCH_CONFIG.minTokenLengthForFuzzy;

    // Exact term match
    if (titleN.split(" ").includes(t)) {
      score += WEIGHTS.exactTerm;
      matchedAny = true;
      if (!isSubjectToken) titleExactHits++;
      continue;
    }

    // Prefix helper (edge n-gram like) - helper only: do not make it the sole reason to include
    if (titleN.split(" ").some(w => w.startsWith(t)) || breadN.some(b => b.split(" ").some(w => w.startsWith(t)))) {
      score += WEIGHTS.prefix;
    }

    // Breadcrumb exact
    if (breadN.some(b => b.split(" ").includes(t))) {
      score += WEIGHTS.breadcrumb;
      matchedAny = true;
    }

    // Fuzzy backup only for long tokens, and do not cross scripts
    if (allowFuzzy) {
      const fuzzyHit = fuzzyContains(titleN, t, tIsBn ? "bn" : tIsLat ? "en" : "any") || breadN.some(b => fuzzyContains(b, t, tIsBn ? "bn" : tIsLat ? "en" : "any"));
      if (fuzzyHit) {
        score += WEIGHTS.fuzzy;
        matchedAny = true;
      }
    }
  }

  // Minimum should match for content titles
  if (meta.kind === "CONTENT" && titleTokenCount > 0) {
    const ratio = titleExactHits / titleTokenCount;
    if (ratio < SEARCH_CONFIG.minShouldMatchContent) return null;
  }

  // Recency
  const content = item as Content;
  if (meta.kind === "CONTENT" && content.startsAt) {
    const startsAt = new Date(content.startsAt).getTime();
    const now = Date.now();
    if (startsAt > now - 12 * 60 * 60 * 1000) score += WEIGHTS.recency;
  }

  if (!matchedAny) return null;
  return { kind: meta.kind, score, item };
}

function contentTypeLabel(t: Content["type"]): string {
  switch (t) {
    case "LIVE_CLASS": return "লাইভ ক্লাস";
    case "LIVE_EXAM": return "লাইভ এক্সাম";
    case "MODEL_TEST": return "মডেল টেস্ট";
    case "CQ_EXAM": return "CQ এক্সাম";
    case "ANIMATED_VIDEO": return "ভিডিও লেসন";
    case "RECORDED_CLASS": return "রেকর্ডেড ক্লাস";
    case "STORY": return "স্টোরি";
    case "GUIDELINE_VIDEO": return "গাইডলাইন ভিডিও";
    case "PDF_NOTES": return "PDF নোট";
    case "SMART_NOTE": return "স্মার্ট নোট";
    case "QUIZ": return "কুইজ";
    case "HOMEWORK": return "হোমওয়ার্ক";
  }
}

export function searchAll(query: string, catalog: Catalog): { results: MixedResult[]; intent: Intent } {
  const intent = detectIntent(query, catalog.subjects);
  const qTokens = intent.tokens;
  const results: MixedResult[] = [];
  const push = (x: MixedResult | null) => { if (x) results.push(x); };
  catalog.subjects.forEach(s => push(scoreItem(qTokens, s, catalog, intent)));
  catalog.chapters.forEach(c => push(scoreItem(qTokens, c, catalog, intent)));
  catalog.topics.forEach(t => push(scoreItem(qTokens, t, catalog, intent)));
  catalog.contents.forEach(c => push(scoreItem(qTokens, c, catalog, intent)));
  return { results: results.sort((a, b) => b.score - a.score || secondarySort(a, b, catalog)), intent };
}

function secondarySort(a: MixedResult, b: MixedResult, catalog: Catalog): number {
  const getStartsAt = (m: MixedResult): number => {
    if (m.kind !== "CONTENT") return 0;
    const c = m.item as Content;
    return c.startsAt ? new Date(c.startsAt).getTime() : 0;
  };
  return getStartsAt(b) - getStartsAt(a);
}

function intentSubjectNameMatches(breadcrumbSubjectNameN: string, intent: Intent, catalog: Catalog): boolean {
  if (!breadcrumbSubjectNameN) return false;
  const norm = (s: string) => normalize(s);
  const wanted = new Set(intent.subjectCandidateIds.map(id => {
    const s = catalog.subjects.find(x => x.id === id);
    return s ? norm(s.name) : "";
  }).filter(Boolean));
  return wanted.has(breadcrumbSubjectNameN);
}

function getSubjectIdForItem(item: Subject | Chapter | Topic | Content, catalog: Catalog): string | null {
  if (!('subjectId' in (item as any)) && !('chapterId' in (item as any)) && !('topicId' in (item as any))) {
    const subj = item as Subject;
    return subj.id;
  }
  if ('subjectId' in (item as any) && !('chapterId' in (item as any))) {
    const ch = item as Chapter;
    return ch.subjectId;
  }
  if ('chapterId' in (item as any) && !('type' in (item as any))) {
    const tp = item as Topic;
    const ch = catalog.chapters.find(c => c.id === tp.chapterId);
    return ch ? ch.subjectId : null;
  }
  const cnt = item as Content;
  const tp = catalog.topics.find(t => t.id === cnt.topicId);
  const ch = tp ? catalog.chapters.find(c => c.id === tp.chapterId) : undefined;
  return ch ? ch.subjectId : null;
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



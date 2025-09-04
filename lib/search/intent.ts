import { INTENT_KEYWORDS, CONTENT_TYPE_GROUPS } from "./config";
import { tokenize } from "./normalize";
import { Subject } from "./types";

export type Intent = {
  // Clean tokens used for matching (intent words removed)
  tokens: string[];
  // Hard content-type filter derived from query intent words
  allowedContentTypes: ReadonlyArray<string> | null;
  // If query mentions subject names, list candidate subject IDs
  subjectCandidateIds: string[];
  // Strong inference of single subject with optional paper
  inferredSubjectId: string | null;
  inferredPaper: 1 | 2 | null;
  // Simple flags for UI/debug
  flags: { notes: boolean; videos: boolean; classes: boolean; tests: boolean; live: boolean };
};

export function detectIntent(query: string, subjects: Subject[]): Intent {
  const lower = normalizeDigits(tokenize(query).map(t => t.toLowerCase()));

  const flags = {
    notes: intersects(lower, INTENT_KEYWORDS.notes),
    videos: intersects(lower, INTENT_KEYWORDS.videos),
    classes: intersects(lower, INTENT_KEYWORDS.classes),
    tests: intersects(lower, INTENT_KEYWORDS.tests),
    live: intersects(lower, INTENT_KEYWORDS.live),
  } as const;

  let allowedContentTypes: ReadonlyArray<string> | null = null;
  if (flags.notes) allowedContentTypes = CONTENT_TYPE_GROUPS.notes;
  if (flags.videos) allowedContentTypes = CONTENT_TYPE_GROUPS.videos;
  if (flags.classes) allowedContentTypes = CONTENT_TYPE_GROUPS.classes;
  if (flags.tests) allowedContentTypes = CONTENT_TYPE_GROUPS.tests;
  // if live specified with videos/tests we still keep broader set from above

  // Remove intent tokens from search tokens
  const intentTerms = new Set<string>([
    ...INTENT_KEYWORDS.notes,
    ...INTENT_KEYWORDS.videos,
    ...INTENT_KEYWORDS.classes,
    ...INTENT_KEYWORDS.tests,
    ...INTENT_KEYWORDS.live,
  ].map(s => s.toLowerCase()));
  const tokens = lower.filter(t => !intentTerms.has(t));

  // Remove generic stopwords that hurt matching/thresholds (demo convenience)
  const STOPWORDS = new Set(["all", "all-in-one", "allinone", "demo", "সব", "পত্র"]);
  const cleaned = tokens.filter(t => !STOPWORDS.has(t));

  // Subject candidates
  const subjectCandidateIds = detectSubjectCandidates(cleaned, subjects);

  // Try to infer specific subject by matching name + paper tokens
  const { inferredSubjectId, inferredPaper } = inferSubjectFromTokens(cleaned, subjects);

  return { tokens: cleaned, allowedContentTypes, subjectCandidateIds, inferredSubjectId, inferredPaper, flags };
}
function inferSubjectFromTokens(tokens: string[], subjects: Subject[]): { inferredSubjectId: string | null; inferredPaper: 1 | 2 | null } {
  const paper = detectPaper(tokens);
  // Prefer exact canonical if paper present
  if (paper) {
    for (const s of subjects) {
      if (!s.paper) continue;
      const canonical = `${s.name} ${s.paper}`.toLowerCase();
      if (tokens.join(" ").includes(canonical)) {
        return { inferredSubjectId: s.id, inferredPaper: paper };
      }
    }
    // fallback: subject name + paper token present
    const family = detectSubjectCandidates(tokens, subjects);
    if (family.length > 0) {
      const chosen = subjects.find(s => family.includes(s.id) && ((paper === 1 && (s.paper||"").includes("১ম")) || (paper === 2 && (s.paper||"").includes("২য়"))));
      if (chosen) return { inferredSubjectId: chosen.id, inferredPaper: paper };
    }
  }
  // No paper: return null inferred, but subject family is available via subjectCandidateIds
  return { inferredSubjectId: null, inferredPaper: null };
}

function detectPaper(tokens: string[]): 1 | 2 | null {
  const t = new Set(tokens);
  const one = ["১ম","1ম","1st","first","প্রথম","1"];
  const two = ["২য়","2য়","2nd","second","দ্বিতীয়","2"];
  if (one.some(x => t.has(x))) return 1;
  if (two.some(x => t.has(x))) return 2;
  return null;
}

function normalizeDigits(tokens: string[]): string[] {
  const map: Record<string, string> = { "১": "1", "২": "2", "৩": "3", "৪": "4", "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9", "০": "0" };
  return tokens.map(t => t.split("").map(ch => map[ch] ?? ch).join(""));
}

function detectSubjectCandidates(tokens: string[], subjects: Subject[]): string[] {
  const ids: string[] = [];
  for (const s of subjects) {
    const name = s.name.toLowerCase();
    const paper = (s as any).paper ? String((s as any).paper).toLowerCase() : "";
    const tset = new Set([name, paper, ...s.tokens.map(x => x.toLowerCase())].filter(Boolean));
    const exact = tokens.some(t => tset.has(t));
    const prefix = tokens.some(t => name.startsWith(t) && t.length >= 2);
    if (exact || prefix) ids.push(s.id);
  }
  return Array.from(new Set(ids));
}

function intersects(a: string[], b: readonly string[]): boolean {
  const set = new Set(a);
  for (const x of b) if (set.has(x.toLowerCase())) return true;
  return false;
}



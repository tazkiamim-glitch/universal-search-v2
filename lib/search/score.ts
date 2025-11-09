import { Class, Program, Phase, Subject, Chapter, Topic, Content, MixedResult, MixedResultType } from "./types";
import { normalize, tokenize, isBengaliToken, isLatinToken, transliterateBnToLatin, getBanglaSynonyms } from "./normalize";
import { SEARCH_CONFIG } from "./config";
import { detectIntent, Intent } from "./intent";

const FIELD_WEIGHTS = SEARCH_CONFIG.fieldWeights;
const BASE_WEIGHTS = SEARCH_CONFIG.baseWeights;

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
    const base = `${title}`;
    const searchable = normalize(`${base} ${transliterateBnToLatin(base)}`);
    return { title, searchable, breadcrumbs: [], kind: "CLASS" };
  }
  
  // Program
  if ('classId' in (item as any) && !('programId' in (item as any)) && !('phaseId' in (item as any)) && !('subjectId' in (item as any)) && !('chapterId' in (item as any)) && !('topicId' in (item as any))) {
    const prog = item as Program;
    const cls = catalog.classes.find(c => c.id === prog.classId);
    const bc = [cls?.name ?? ""];
    const title = prog.name;
    const base = `${title} ${bc.join(" ")}`;
    const searchable = normalize(`${base} ${transliterateBnToLatin(base)}`);
    return { title, searchable, breadcrumbs: bc, kind: "PROGRAM" };
  }
  
  // Phase
  if ('programId' in (item as any) && !('phaseId' in (item as any)) && !('subjectId' in (item as any)) && !('chapterId' in (item as any)) && !('topicId' in (item as any))) {
    const phase = item as Phase;
    const prog = catalog.programs.find(p => p.id === phase.programId);
    const cls = prog ? catalog.classes.find(c => c.id === prog.classId) : undefined;
    const bc = [cls?.name ?? "", prog?.name ?? ""];
    const title = phase.name;
    const base = `${title} ${bc.join(" ")}`;
    const searchable = normalize(`${base} ${transliterateBnToLatin(base)}`);
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
    const base = `${title} ${bc.join(" ")}`;
    const searchable = normalize(`${base} ${transliterateBnToLatin(base)}`);
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
    const base = `${title} ${bc.join(" ")}`;
    const searchable = normalize(`${base} ${transliterateBnToLatin(base)}`);
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
    const base = `${title} ${bc.join(" ")}`;
    const searchable = normalize(`${base} ${transliterateBnToLatin(base)}`);
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
  const base = `${title} ${typeLabel} ${desc} ${teacher} ${topicTokens} ${bc.join(" ")}`;
  const searchable = normalize(`${base} ${transliterateBnToLatin(base)}`);
  return { title, searchable, breadcrumbs: bc, kind: "CONTENT" };
}

export function scoreItem(qTokens: string[], item: Class | Program | Phase | Subject | Chapter | Topic | Content, catalog: Catalog, intent: Intent): MixedResult | null {
  const meta = buildSearchableString(item, catalog);
  const titleN = normalize(meta.title);
  const breadN = meta.breadcrumbs.map(b => normalize(b));
  const searchableN = normalize(meta.searchable);

  let score = 0;
  let matchedAny = false;
  
  // Individual field scores for detailed breakdown
  const fieldScores = {
    titleScore: 0,
    topicScore: 0,
    chapterScore: 0,
    subjectScore: 0,
    descriptionScore: 0,
    programScore: 0,
    phaseScore: 0,
    synonymScore: 0,
  };
  
  // Debug information
  const debug = {
    matchedTokens: [] as string[],
    searchableString: searchableN,
    titleMatches: 0,
    searchableMatches: 0,
    baseMatchScore: 0, // Base score from Title + Context matches
    scores: fieldScores,
    freeContentBoost: false,
    contentTypeBoost: 0,
    recencyBoost: false,
    intentBoost: 0,
    durationBoost: 0,
    popularityBoost: 0,
    teacherBoost: 0,
    jitter: 0,
    // Match type tracking
    exactPhraseMatches: 0,
    directTokenMatches: 0,
    synonymMatches: 0,
    partialMatches: 0,
    fuzzyMatches: 0
  };

  // Exact phrase boost for title
  const phrase = qTokens.join(" ");
  if (phrase && titleN.includes(phrase)) {
    score += WEIGHTS.exactPhrase;
    debug.exactPhraseMatches = 1; // Track exact phrase match
  }

  // Token matching with TF-IDF style scoring
  let titleExactHits = 0;
  let titleTokenCount = 0;
  
  for (const t of qTokens) {
    if (!t) continue;
    titleTokenCount++;
    const tIsBn = isBengaliToken(t);
    const tIsLat = isLatinToken(t);
    const allowFuzzy = t.length >= SEARCH_CONFIG.minTokenLengthForFuzzy;
    
    // Reset synonym matches counter for each token
    let synonymMatchesInAllFields = 0;

    // Helper to check if any title word matches token via synonyms
    function checkSynonymsMatch(words: string[], token: string): boolean {
      const synonyms = getBanglaSynonyms(token);
      for (const synonym of synonyms) {
        if (words.some(w => w.includes(synonym))) {
          return true;
        }
      }
      // Also check reverse
      const tokenWords = token.split(" ");
      for (const word of words) {
        const synonymsForWord = getBanglaSynonyms(word);
        if (synonymsForWord.some(s => tokenWords.includes(s) || s === token)) {
          return true;
        }
      }
      return false;
    }
    
    // Count how many times token appears in title
    let titleMatchesCount = 0;
    let synonymMatchesCount = 0;
    const titleN = normalize(meta.title);
    const tokenLower = t.toLowerCase();
    
    // Count direct matches - check if token appears in the normalized title
    if (titleN.includes(tokenLower)) {
      titleMatchesCount = 1; // Count as 1 match regardless of how many times it appears
    }
    
    // Count synonym matches (e.g., "biology" matches "জীববিজ্ঞান")
    const synonyms = getBanglaSynonyms(t);
    console.log(`[SYNONYM] Token "${t}" has synonyms:`, synonyms);
    for (const synonym of synonyms) {
      const synonymLower = synonym.toLowerCase();
      const titleNSpaceFree = titleN.replace(/\s+/g, "");
      const synonymSpaceFree = synonymLower.replace(/\s+/g, "");
      
      // Check with spaces preserved
      if (titleN.includes(synonymLower)) {
        synonymMatchesCount = 1; // Count as 1 if any synonym found
        console.log(`[SYNONYM] Found "${synonymLower}" in title: "${titleN}"`);
        break;
      }
      
      // Check without spaces (handles "আলোক সংশ্লেষণ" vs "আলোকসংশ্লেষণ")
      if (titleNSpaceFree.includes(synonymSpaceFree) || synonymSpaceFree.includes(titleNSpaceFree)) {
        synonymMatchesCount = 1;
        console.log(`[SYNONYM] Found "${synonymSpaceFree}" in title (space-free): "${titleNSpaceFree}"`);
        break;
      }
    }
    
    // Also check reverse: if searching for Bengali term, check for English in title
    if (isBengaliToken(t)) {
      const titleWords = titleN.split(" ");
      const englishSynonyms = getBanglaSynonyms(t);
      for (const w of titleWords) {
        if (isLatinToken(w)) {
          for (const synonym of englishSynonyms) {
            if (w.toLowerCase().includes(synonym.toLowerCase()) || synonym.toLowerCase().includes(w.toLowerCase())) {
              synonymMatchesCount = 1;
              break;
            }
          }
          if (synonymMatchesCount > 0) break;
        }
      }
    }
    
    // Track match types
    if (titleMatchesCount > 0) {
      // Direct token match
      const titleScore = BASE_WEIGHTS.exactTerm * FIELD_WEIGHTS.title * titleMatchesCount;
      score += titleScore;
      fieldScores.titleScore += titleScore;
      matchedAny = true;
      titleExactHits++;
      debug.matchedTokens.push(t);
      debug.titleMatches += titleMatchesCount;
      debug.directTokenMatches += 1; // Track direct token match
    }
    
    // Add title synonym matches to the count
    if (synonymMatchesCount > 0) {
      synonymMatchesInAllFields += synonymMatchesCount;
      debug.synonymMatches += 1; // Track synonym match
    }

    const titleMatched = titleMatchesCount > 0;

    // Count matches in description/teacher - these contribute to searchableMatches
    let descriptionMatchesCount = 0;
    if (meta.kind === "CONTENT") {
      const content = item as Content;
      const descN = normalize(content.description || "");
      const teacherN = normalize(content.teacher || "");
      
      // Space-free versions for matching
      const descText = descN.replace(/\s+/g, "");
      const teacherText = teacherN.replace(/\s+/g, "");
      const tNoSpace = t.replace(/\s+/g, "");
      
      // Direct character-based match (handles "আলোকসংশ্লেষণ" vs "আলোক সংশ্লেষণ")
      if (descText && (descText.includes(tNoSpace) || tNoSpace.includes(descText))) {
        descriptionMatchesCount++;
      }
      if (teacherText && (teacherText.includes(tNoSpace) || tNoSpace.includes(teacherText))) {
        descriptionMatchesCount++;
      }
      
      const descWords = descN.split(" ");
      const teacherWords = teacherN.split(" ");
      
      descWords.forEach(w => {
        if (w === t || w.includes(t) || t.includes(w)) {
          descriptionMatchesCount++;
        }
      });
      
      teacherWords.forEach(w => {
        if (w === t || w.includes(t) || t.includes(w)) {
          descriptionMatchesCount++;
        }
      });
      
      // Check via synonyms
      const synonyms = getBanglaSynonyms(t);
      for (const synonym of synonyms) {
        const synonymNoSpace = synonym.replace(/\s+/g, "");
        if (descText && descText.includes(synonymNoSpace)) {
          descriptionMatchesCount++;
        }
        if (teacherText && teacherText.includes(synonymNoSpace)) {
          descriptionMatchesCount++;
        }
        if (descWords.some(w => w.includes(synonym))) {
          descriptionMatchesCount++;
        }
        if (teacherWords.some(w => w.includes(synonym))) {
          descriptionMatchesCount++;
        }
      }
    }
    
    if (descriptionMatchesCount > 0) {
      // Description and teacher fields have lower weight
      const descriptionScore = BASE_WEIGHTS.exactTerm * FIELD_WEIGHTS.description * descriptionMatchesCount;
      score += descriptionScore;
      fieldScores.descriptionScore += descriptionScore;
      matchedAny = true;
      debug.searchableMatches += descriptionMatchesCount;
    }
    
    // Count matches in Topic, Chapter, Subject fields with field-specific weights
    let topicMatches = 0;
    let chapterMatches = 0;
    let subjectMatches = 0;
    
    if (meta.topic) {
      const topicN = normalize(meta.topic);
      const topicText = topicN.replace(/\s+/g, "");
      const tNoSpace = t.replace(/\s+/g, "");
      
      console.log(`[DEBUG Topic] Token: "${t}", Topic: "${topicN}", Checking matches...`);
      
      if (topicText.includes(tNoSpace) || tNoSpace.includes(topicText)) {
        topicMatches++;
        console.log(`[DEBUG Topic] Space-free match found! Count now: ${topicMatches}`);
      }
      
      const topicWords = topicN.split(" ");
      topicWords.forEach(w => {
        if (w === t || w.includes(t) || t.includes(w)) {
          topicMatches++;
          console.log(`[DEBUG Topic] Word "${w}" matched token. Count now: ${topicMatches}`);
        }
      });
      
      const synonyms = getBanglaSynonyms(t);
      console.log(`[DEBUG Topic] Synonyms for "${t}": ${synonyms.join(", ")}`);
      topicWords.forEach(w => {
        for (const synonym of synonyms) {
          if (w.includes(synonym) || synonym.includes(w)) {
            topicMatches++;
            console.log(`[DEBUG Topic] Word "${w}" matched synonym "${synonym}". Count now: ${topicMatches}`);
            break; // Count once per word
          }
        }
      });
      console.log(`[DEBUG Topic] Final topicMatches: ${topicMatches}`);
    }
    
    if (meta.chapter) {
      const chapterN = normalize(meta.chapter);
      const chapterText = chapterN.replace(/\s+/g, "");
      const tNoSpace = t.replace(/\s+/g, "");
      
      if (chapterText.includes(tNoSpace) || tNoSpace.includes(chapterText)) {
        chapterMatches++;
      }
      
      const chapterWords = chapterN.split(" ");
      chapterWords.forEach(w => {
        if (w === t || w.includes(t) || t.includes(w)) {
          chapterMatches++;
        }
      });
      
      const synonyms = getBanglaSynonyms(t);
      chapterWords.forEach(w => {
        for (const synonym of synonyms) {
          if (w.includes(synonym) || synonym.includes(w)) {
            chapterMatches++;
            break; // Count once per word
          }
        }
      });
    }
    
    if (meta.subject) {
      const subjectN = normalize(meta.subject);
      const subjectText = subjectN.replace(/\s+/g, "");
      const tNoSpace = t.replace(/\s+/g, "");
      
      if (subjectText.includes(tNoSpace) || tNoSpace.includes(subjectText)) {
        subjectMatches++;
      }
      
      const subjectWords = subjectN.split(" ");
      subjectWords.forEach(w => {
        if (w === t || w.includes(t) || t.includes(w)) {
          subjectMatches++;
        }
      });
      
      const synonyms = getBanglaSynonyms(t);
      subjectWords.forEach(w => {
        for (const synonym of synonyms) {
          if (w.includes(synonym) || synonym.includes(w)) {
            subjectMatches++;
            break; // Count once per word
          }
        }
      });
    }
    
    // Apply field-specific weights following TF-IDF logic:
    // Title (1.0) > Topic (0.8) > Chapter (0.7) > Subject (0.5) > Description (0.3)
    // First, apply scores and count matches for Topic, Chapter, Subject (these go to base scores)
    if (topicMatches > 0) {
      const topicScore = BASE_WEIGHTS.exactTerm * FIELD_WEIGHTS.topic * topicMatches;
      score += topicScore;
      fieldScores.topicScore += topicScore;
      matchedAny = true;
      // Don't count in searchableMatches here - we'll count synonym matches separately
      console.log(`[DEBUG] Token "${t}" matched in Topic: ${topicMatches} times. Score: ${topicScore}`);
    }
    if (chapterMatches > 0) {
      const chapterScore = BASE_WEIGHTS.exactTerm * FIELD_WEIGHTS.chapter * chapterMatches;
      score += chapterScore;
      fieldScores.chapterScore += chapterScore;
      matchedAny = true;
      console.log(`[DEBUG] Token "${t}" matched in Chapter: ${chapterMatches} times. Score: ${chapterScore}`);
    }
    if (subjectMatches > 0) {
      const subjectScore = BASE_WEIGHTS.exactTerm * FIELD_WEIGHTS.subject * subjectMatches;
      score += subjectScore;
      fieldScores.subjectScore += subjectScore;
      matchedAny = true;
      console.log(`[DEBUG] Token "${t}" matched in Subject: ${subjectMatches} times. Score: ${subjectScore}`);
    }
    
    // Now count synonym matches across ALL fields (Topic, Chapter, Subject, Description, etc.)
    // Note: synonymMatchesInAllFields already includes title synonym matches (from earlier in this loop)
    // Just add topic/chapter/subject/description synonym matches
    // These should be counted in synonymScore and searchableMatches
    const allFieldSynonyms = getBanglaSynonyms(t);
    
    if (meta.topic) {
      const topicN = normalize(meta.topic);
      const topicNSpaceFree = topicN.replace(/\s+/g, "");
      for (const synonym of allFieldSynonyms) {
        const synonymLower = synonym.toLowerCase();
        const synonymSpaceFree = synonymLower.replace(/\s+/g, "");
        if (topicN.includes(synonymLower) || topicNSpaceFree.includes(synonymSpaceFree)) {
          synonymMatchesInAllFields++;
          break;
        }
      }
    }
    
    if (meta.chapter) {
      const chapterN = normalize(meta.chapter);
      const chapterNSpaceFree = chapterN.replace(/\s+/g, "");
      for (const synonym of allFieldSynonyms) {
        const synonymLower = synonym.toLowerCase();
        const synonymSpaceFree = synonymLower.replace(/\s+/g, "");
        if (chapterN.includes(synonymLower) || chapterNSpaceFree.includes(synonymSpaceFree)) {
          synonymMatchesInAllFields++;
          break;
        }
      }
    }
    
    if (meta.subject) {
      const subjectN = normalize(meta.subject);
      const subjectNSpaceFree = subjectN.replace(/\s+/g, "");
      for (const synonym of allFieldSynonyms) {
        const synonymLower = synonym.toLowerCase();
        const synonymSpaceFree = synonymLower.replace(/\s+/g, "");
        if (subjectN.includes(synonymLower) || subjectNSpaceFree.includes(synonymSpaceFree)) {
          synonymMatchesInAllFields++;
          break;
        }
      }
    }
    
    // Check description and teacher
    if (meta.kind === "CONTENT") {
      const content = item as Content;
      const descN = normalize(content.description || "");
      const teacherN = normalize(content.teacher || "");
      const descNSpaceFree = descN.replace(/\s+/g, "");
      const teacherNSpaceFree = teacherN.replace(/\s+/g, "");
      
      for (const synonym of allFieldSynonyms) {
        const synonymLower = synonym.toLowerCase();
        const synonymSpaceFree = synonymLower.replace(/\s+/g, "");
        if (descN.includes(synonymLower) || descNSpaceFree.includes(synonymSpaceFree)) {
          synonymMatchesInAllFields++;
          break;
        }
        if (teacherN.includes(synonymLower) || teacherNSpaceFree.includes(synonymSpaceFree)) {
          synonymMatchesInAllFields++;
          break;
        }
      }
    }
    
    // Add synonym matches found in any field to the score and count
    if (synonymMatchesInAllFields > 0) {
      const synonymScore = BASE_WEIGHTS.synonymTerm * synonymMatchesInAllFields;
      score += synonymScore;
      fieldScores.synonymScore += synonymScore;
      debug.searchableMatches += synonymMatchesInAllFields;
      // Don't double-count synonym matches - we already tracked title synonym matches above
      // Only track if this is a synonym match in other fields (topic/chapter/subject/description)
      // but not in title (since we already tracked that)
      if (synonymMatchesCount === 0) {
        debug.synonymMatches += 1; // Track synonym matches in other fields
      }
      console.log(`[SYNONYM] Token "${t}" found ${synonymMatchesInAllFields} synonym match(es). Score: ${synonymScore}`);
    }

    // Legacy searchable string check for other fields (Phase, Program, Class)
    let otherFieldsMatchesCount = 0;
    const breadcrumbWords = breadN.join(" ").split(" ");
    
    breadcrumbWords.forEach(w => {
      if (w === t || w.includes(t) || t.includes(w)) {
        otherFieldsMatchesCount++;
      }
    });
    
    // Check via synonyms for Phase/Program/Class fields
    const phaseProgramClassSynonyms = getBanglaSynonyms(t);
    for (const synonym of phaseProgramClassSynonyms) {
      if (breadcrumbWords.some(w => w.includes(synonym))) {
        otherFieldsMatchesCount++;
      }
    }
    
    if (otherFieldsMatchesCount > 0) {
      score += WEIGHTS.breadcrumb * 0.5; // Lower weight for Phase/Program/Class matches
      matchedAny = true;
      debug.searchableMatches += otherFieldsMatchesCount;
    }

    // Prefix helper (edge n-gram like) - Track as partial match
    let partialMatch = false;
    if (titleN.split(" ").some(w => w.startsWith(t)) || breadN.some(b => b.split(" ").some(w => w.startsWith(t)))) {
      score += WEIGHTS.prefix;
      partialMatch = true;
      debug.partialMatches += 1; // Track partial match
    }

    // Fuzzy backup only for long tokens, and do not cross scripts
    let fuzzyMatch = false;
    if (allowFuzzy) {
      const fuzzyHit = fuzzyContains(searchableN, t, tIsBn ? "bn" : tIsLat ? "en" : "any");
      if (fuzzyHit) {
        score += WEIGHTS.fuzzy;
        matchedAny = true;
        fuzzyMatch = true;
        debug.fuzzyMatches += 1; // Track fuzzy match
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

  // Calculate and store baseMatchScore (Title + Topic + Chapter + Subject + Description matches)
  const baseMatchScore = score;
  debug.baseMatchScore = baseMatchScore;

  // Content-specific boosts to create clearer variations and demo-friendly ordering
  let totalScore = score;
  if (meta.kind === "CONTENT") {
    const c = item as Content;
    let typeBoost = 0;
    switch (c.type) {
      case "LIVE_CLASS":
        typeBoost = 1.5; // Highest among the three to highlight live classes
        break;
      case "LIVE_EXAM":
        typeBoost = 1.2;
        break;
      case "RECORDED_CLASS":
        typeBoost = 0.8;
        break;
      default:
        typeBoost = 0;
    }
    if (typeBoost) {
      score += typeBoost;
      totalScore += typeBoost;
      debug.contentTypeBoost = typeBoost;
    }
    // Small nudge for free content so it tends to surface above premium on ties
    if (c.isFree) {
      score += 0.5;
      totalScore += 0.5;
      debug.freeContentBoost = true;
    }
  }

  // Recency is handled only as a tie-breaker in secondarySort

  if (!matchedAny) return null;
  return { kind: meta.kind, score: totalScore, item, debug };
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

// Parses popularity strings like "১২.৫ হাজার+", "15.2k+", "5k", "21.6 হাজার+" to a plain number
function parsePopularity(text: string): number {
  const normalized = bengaliToEnglishDigits(text.toLowerCase().replace(/\s+/g, " "))
  // english style: 15.2k+
  const m1 = normalized.match(/([0-9]+(?:\.[0-9]+)?)k\+?/) // 15.2k+
  if (m1) return parseFloat(m1[1]) * 1000
  // bengali style: ২১.৬ হাজার+
  const m2 = normalized.match(/([0-9]+(?:\.[0-9]+)?)\s*হাজার\+?/) // 21.6 হাজার+
  if (m2) return parseFloat(m2[1]) * 1000
  // plain number
  const m3 = normalized.match(/([0-9]+(?:\.[0-9]+)?)/)
  if (m3) return parseFloat(m3[1])
  return 0
}

function bengaliToEnglishDigits(s: string): string {
  const bn = "০১২৩৪৫৬৭৮৯";
  return s.replace(/[০-৯]/g, d => String(bn.indexOf(d)))
}

function stableHash(str: string): number {
  let h = 2166136261 >>> 0
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619) >>> 0
  }
  return h
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

  // Prefer free content over premium when scores tie at the same hierarchy level
  if (a.kind === "CONTENT" && b.kind === "CONTENT") {
    const aC = a.item as Content;
    const bC = b.item as Content;
    if (aC.isFree !== bC.isFree) return aC.isFree ? -1 : 1;
  }

  // For same hierarchy level, tie-breakers: Recency -> Popularity -> Type
  const getStartsAt = (m: MixedResult): number => {
    if (m.kind !== "CONTENT") return 0;
    const c = m.item as Content;
    return c.startsAt ? new Date(c.startsAt).getTime() : 0;
  };
  const recencyDelta = getStartsAt(b) - getStartsAt(a);
  if (recencyDelta !== 0) return recencyDelta;

  const pop = (m: MixedResult): number => {
    if (m.kind !== "CONTENT") return 0;
    const c = m.item as Content;
    return c.statsText ? parsePopularity(c.statsText) : 0;
  };
  const popDelta = pop(b) - pop(a);
  if (popDelta !== 0) return popDelta;

  const typePriority = (m: MixedResult): number => {
    if (m.kind !== "CONTENT") return 0;
    const c = m.item as Content;
    switch (c.type) {
      case "LIVE_CLASS": return 3;
      case "RECORDED_CLASS": return 2;
      case "ANIMATED_VIDEO": return 1;
      default: return 0;
    }
  };
  return typePriority(b) - typePriority(a);
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

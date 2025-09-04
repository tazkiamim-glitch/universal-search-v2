export const SEARCH_CONFIG = {
  // Fuzzy + ngram
  minTokenLengthForFuzzy: 5,
  fuzzyMaxEditDistance: 1,
  // Content title matching threshold
  minShouldMatchContent: 0.75,
  // Scoring weights
  boosts: {
    exactPhrase: 10,
    exactTerm: 8,
    prefix: 3,
    fuzzy: 1,
    recency: 2,
    breadcrumb: 8,
    subjectChapterTopicName: 10,
  },
} as const;

// Intent keywords (both EN and BN)
export const INTENT_KEYWORDS = {
  notes: ["notes", "note", "smart", "smart note", "class note", "pdf", "নোট", "পিডিএফ"],
  videos: ["video", "videos", "ভিডিও"],
  classes: ["class", "classes", "ক্লাস"],
  tests: ["test", "tests", "exam", "quiz", "mcq", "cq", "model", "model test", "পরীক্ষা"],
  live: ["live", "লাইভ"],
} as const;

export const CONTENT_TYPE_GROUPS = {
  notes: ["SMART_NOTE", "PDF_NOTES"],
  videos: ["ANIMATED_VIDEO", "RECORDED_CLASS", "STORY", "GUIDELINE_VIDEO"],
  classes: ["LIVE_CLASS", "RECORDED_CLASS"],
  tests: ["QUIZ", "CQ_EXAM", "MODEL_TEST", "LIVE_EXAM"],
  liveVideos: ["LIVE_CLASS", "RECORDED_CLASS"],
  liveTests: ["LIVE_EXAM"],
} as const;



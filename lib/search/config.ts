export const SEARCH_CONFIG = {
  // Fuzzy + ngram
  minTokenLengthForFuzzy: 5,
  fuzzyMaxEditDistance: 1,
  // Content title matching threshold
  minShouldMatchContent: 0.3,
  // Base Weights - The fundamental scoring values
  baseWeights: {
    exactTerm: 10.0,      // Direct text match (e.g., "photo" matches "photosynthesis")
    synonymTerm: 5.0,     // Indirect match via synonym/translation (e.g., "biology" matches "জীববিজ্ঞান")
  },
  // Field Weights - Multipliers that show importance of each field
  fieldWeights: {
    title: 1.0,           // Content Title (highest priority)
    topic: 0.8,           // Topic Matches (very high priority)
    chapter: 0.7,         // Chapter Matches (high priority)
    subject: 0.5,         // Subject Matches (medium priority)
    description: 0.3,     // Description Matches (lower priority)
    program: 0.2,         // Program name Matches (low priority)
    phase: 0.1,           // Phase name Matches (very low priority)
  },
  // Legacy weights for backward compatibility
  boosts: {
    exactPhrase: 10,
    title: 8,
    chapterTopic: 8,
    subject: 5,
    description: 2,
    exactTerm: 10.0,      // Updated to use base weight
    synonymTerm: 5.0,     // New: synonym weight
    prefix: 3,
    fuzzy: 1,
    recency: 2,
    breadcrumb: 8,
    subjectChapterTopicName: 10,
    popularity: 1,
    contentType: 0.5,
  },
} as const;

// Intent keywords (both EN and BN) - comprehensive list
export const INTENT_KEYWORDS = {
  notes: [
    "note", "notes", "pdf", "smart note", "class note", "hand note", "handnote", 
    "book", "ebook", "admission note", "admission notes",
    "নোট", "স্মার্ট নোট", "ক্লাস নোট", "পিডিএফ", "বই", "হ্যান্ডনোট", "ভর্তি নোট"
  ],
  videos: [
    "video", "videos", "animated", "animation", "lecture", "lesson", "recorded", 
    "ভিডিও", "লেকচার", "রেকর্ডেড", "অ্যানিমেটেড", "অ্যানিমেশন"
  ],
  classes: [
    "class", "classes", "live class", "recorded class", 
    "ক্লাস", "লাইভ ক্লাস", "রেকর্ডেড ক্লাস"
  ],
  tests: [
    "exam", "test", "quiz", "mcq", "cq", "model test", "live exam", "practice",
    "প্রশ্ন", "পরীক্ষা", "মডেল টেস্ট", "লাইভ এক্সাম", "এমসিকিউ", "সিকিউ", "কুইজ"
  ],
  live: ["live", "লাইভ"],
} as const;

export const CONTENT_TYPE_GROUPS = {
  notes: ["SMART_NOTE", "PDF_NOTES", "CLASS_NOTE", "ADMISSION_NOTE"],
  videos: ["ANIMATED_VIDEO", "RECORDED_CLASS", "LIVE_CLASS", "LIVE_REPLAY", "STORY", "GUIDELINE_VIDEO"],
  classes: ["LIVE_CLASS", "RECORDED_CLASS", "LIVE_REPLAY"],
  tests: ["QUIZ", "CQ_EXAM", "MODEL_TEST", "LIVE_EXAM"],
  liveVideos: ["LIVE_CLASS", "LIVE_REPLAY"],
  recordedVideos: ["RECORDED_CLASS"],
  animatedVideos: ["ANIMATED_VIDEO"],
  liveTests: ["LIVE_EXAM"],
} as const;



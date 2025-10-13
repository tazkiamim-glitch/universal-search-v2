export const SEARCH_CONFIG = {
  // Fuzzy + ngram
  minTokenLengthForFuzzy: 5,
  fuzzyMaxEditDistance: 1,
  // Content title matching threshold
  minShouldMatchContent: 0.3,
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



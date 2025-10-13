export type Class = {
  id: string;
  name: string;             // "Class 6", "Class 7"
  tokens: string[];         // normalized keywords
};

export type Program = {
  id: string;
  classId: string;
  name: string;             // "SSC Program", "HSC Program", "Admission Program"
  tokens: string[];
};

export type Phase = {
  id: string;
  programId: string;
  name: string;             // "Q1", "Q2", "Q3", "Q4" or "Phase 1", "Phase 2"
  quarter?: number;         // 1, 2, 3, 4
  tokens: string[];
};

export type Subject = {
  id: string;
  phaseId: string;
  name: string;             // "বাংলা", "Biology"
  paper?: string;           // "১ম পত্র", "২য় পত্র"
  tokens: string[];         // normalized keywords
};

export type Chapter = {
  id: string;
  subjectId: string;
  index?: number;           // chapter number
  name: string;             // "Chapter 5: Photosynthesis"
  tokens: string[];
};

export type Topic = {
  id: string;
  chapterId: string;
  index?: number;
  name: string;             // "Light Reaction"
  tokens: string[];
};

export type ContentType =
  | "LIVE_CLASS" | "LIVE_EXAM" | "MODEL_TEST" | "CQ_EXAM"
  | "ANIMATED_VIDEO" | "RECORDED_CLASS" | "PDF_NOTES" | "SMART_NOTE" | "QUIZ" | "HOMEWORK"
  | "STORY" | "GUIDELINE_VIDEO" | "CLASS_NOTE" | "ADMISSION_NOTE" | "LIVE_REPLAY";

export type Content = {
  id: string;
  topicId: string;
  type: ContentType;
  title: string;
  teacher?: string;         // teacher name
  description?: string;     // content description
  isFree: boolean;
  durationSec?: number;     // for async
  startsAt?: string;        // ISO for synchronous
  statsText?: string;       // optional stats, e.g., "১২.৫ হাজার+"
};

export type MixedResultType = "CLASS" | "PROGRAM" | "PHASE" | "SUBJECT" | "CHAPTER" | "TOPIC" | "CONTENT";

export type MixedResult = {
  kind: MixedResultType;
  score: number;
  item: Class | Program | Phase | Subject | Chapter | Topic | Content;
  debug?: {
    matchedTokens: string[];
    searchableString: string;
    titleMatches: number;
    searchableMatches: number;
    freeContentBoost: boolean;
    contentTypeBoost: number;
    recencyBoost: boolean;
  };
};

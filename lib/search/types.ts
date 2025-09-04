export type Subject = {
  id: string;
  name: string;             // "বাংলা", "Biology"
  paper?: string;           // "১ম পত্র", "২য় পত্র"
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
  | "STORY" | "GUIDELINE_VIDEO";

export type Content = {
  id: string;
  topicId: string;
  type: ContentType;
  title: string;
  isFree: boolean;
  durationSec?: number;     // for async
  startsAt?: string;        // ISO for synchronous
  statsText?: string;       // optional stats, e.g., "১২.৫ হাজার+"
};

export type MixedResultType = "SUBJECT" | "CHAPTER" | "TOPIC" | "CONTENT";

export type MixedResult = {
  kind: MixedResultType;
  score: number;
  item: Subject | Chapter | Topic | Content;
};



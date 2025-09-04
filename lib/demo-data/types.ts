export interface ProgramCourse {
  id: string;
  name: string;
}

export interface Subject {
  id: string;
  programCourseId: string;
  name: string;
  paper?: string;
  tokens: string[];
}

export interface Chapter {
  id: string;
  subjectId: string;
  index: number;
  name: string;
  tokens: string[];
}

export interface Topic {
  id: string;
  chapterId: string;
  index: number;
  name: string;
  tokens: string[];
}

export type ContentType =
  | "LIVE_CLASS"
  | "RECORDED_CLASS"
  | "ANIMATED_VIDEO"
  | "STORY"
  | "GUIDELINE_VIDEO"
  | "SMART_NOTE"
  | "CLASS_NOTE"
  | "PDF_NOTES"
  | "MCQ"
  | "CQ"
  | "MODEL_TEST"
  | "LIVE_EXAM"
  | "HOMEWORK";

export interface Content {
  id: string;
  topicId: string;
  type: ContentType;
  title: string;
  isFree: boolean;
  durationSec?: number;
  startsAt?: string; // ISO string
  teacher?: string;
  progressPct?: number; // 0-100
  language?: string;
  tags?: string[];
}

export interface Catalog {
  programCourses: ProgramCourse[];
  subjects: Subject[];
  chapters: Chapter[];
  topics: Topic[];
  contents: Content[];
}



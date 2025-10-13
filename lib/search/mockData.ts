import { Class, Program, Phase, Subject, Chapter, Topic, Content } from "./types";


// ===== CLASSES =====
export const classes: Class[] = [
  { 
    id: "class-6", 
    name: "Class 6", 
    tokens: ["class", "6", "six", "ষষ্ঠ", "৬"] 
  },
  { 
    id: "class-7", 
    name: "Class 7", 
    tokens: ["class", "7", "seven", "সপ্তম", "৭"] 
  },
];

// ===== PROGRAMS =====
export const programs: Program[] = [
  // Class 6 Programs
  { 
    id: "prog-6-ssc", 
    classId: "class-6", 
    name: "SSC Program", 
    tokens: ["ssc", "program", "প্রোগ্রাম"] 
  },
  { 
    id: "prog-6-foundation", 
    classId: "class-6", 
    name: "Foundation Program", 
    tokens: ["foundation", "basic", "মৌলিক"] 
  },
  
  // Class 7 Programs
  { 
    id: "prog-7-ssc", 
    classId: "class-7", 
    name: "SSC Program", 
    tokens: ["ssc", "program", "প্রোগ্রাম"] 
  },
  { 
    id: "prog-7-admission", 
    classId: "class-7", 
    name: "Admission Program", 
    tokens: ["admission", "ভর্তি", "প্রবেশ"] 
  },
];

// ===== PHASES =====
export const phases: Phase[] = [
  // Class 6 SSC Program Phases
  { 
    id: "phase-6-ssc-q1", 
    programId: "prog-6-ssc", 
    name: "Q1", 
    quarter: 1, 
    tokens: ["q1", "quarter", "1", "first", "প্রথম"] 
  },
  { 
    id: "phase-6-ssc-q2", 
    programId: "prog-6-ssc", 
    name: "Q2", 
    quarter: 2, 
    tokens: ["q2", "quarter", "2", "second", "দ্বিতীয়"] 
  },
  
  // Class 6 Foundation Program Phases
  { 
    id: "phase-6-foundation-p1", 
    programId: "prog-6-foundation", 
    name: "Phase 1", 
    tokens: ["phase", "1", "first", "প্রথম"] 
  },
  
  // Class 7 SSC Program Phases
  { 
    id: "phase-7-ssc-q1", 
    programId: "prog-7-ssc", 
    name: "Q1", 
    quarter: 1, 
    tokens: ["q1", "quarter", "1", "first", "প্রথম"] 
  },
  { 
    id: "phase-7-ssc-q2", 
    programId: "prog-7-ssc", 
    name: "Q2", 
    quarter: 2, 
    tokens: ["q2", "quarter", "2", "second", "দ্বিতীয়"] 
  },
  
  // Class 7 Admission Program Phases
  { 
    id: "phase-7-admission-p1", 
    programId: "prog-7-admission", 
    name: "Phase 1", 
    tokens: ["phase", "1", "first", "প্রথম"] 
  },
];

// ===== SUBJECTS =====
export const subjects: Subject[] = [
  // Class 6 SSC Q1 Subjects
  { 
    id: "sub-6-ssc-q1-bangla", 
    phaseId: "phase-6-ssc-q1", 
    name: "বাংলা", 
    tokens: ["বাংলা", "bangla", "bn"] 
  },
  { 
    id: "sub-6-ssc-q1-math", 
    phaseId: "phase-6-ssc-q1", 
    name: "গণিত", 
    tokens: ["গণিত", "math", "mathematics"] 
  },
  { 
    id: "sub-6-ssc-q1-english", 
    phaseId: "phase-6-ssc-q1", 
    name: "English", 
    tokens: ["english", "ইংরেজি", "eng"] 
  },
  { 
    id: "sub-6-ssc-q1-science", 
    phaseId: "phase-6-ssc-q1", 
    name: "বিজ্ঞান", 
    tokens: ["বিজ্ঞান", "science", "sci"] 
  },
  
  // Class 6 SSC Q2 Subjects
  { 
    id: "sub-6-ssc-q2-bangla", 
    phaseId: "phase-6-ssc-q2", 
    name: "বাংলা", 
    tokens: ["বাংলা", "bangla", "bn"] 
  },
  { 
    id: "sub-6-ssc-q2-math", 
    phaseId: "phase-6-ssc-q2", 
    name: "গণিত", 
    tokens: ["গণিত", "math", "mathematics"] 
  },
  
  // Class 6 Foundation Phase 1 Subjects
  { 
    id: "sub-6-foundation-p1-basic", 
    phaseId: "phase-6-foundation-p1", 
    name: "Basic Concepts", 
    tokens: ["basic", "concepts", "মৌলিক", "ধারণা"] 
  },
  
  // Class 7 SSC Q1 Subjects
  { 
    id: "sub-7-ssc-q1-bangla", 
    phaseId: "phase-7-ssc-q1", 
    name: "বাংলা",
    tokens: ["বাংলা", "bangla", "bn"] 
  },
  { 
    id: "sub-7-ssc-q1-math", 
    phaseId: "phase-7-ssc-q1", 
    name: "গণিত", 
    tokens: ["গণিত", "math", "mathematics"] 
  },
  { 
    id: "sub-7-ssc-q1-english", 
    phaseId: "phase-7-ssc-q1", 
    name: "English", 
    tokens: ["english", "ইংরেজি", "eng"] 
  },
  { 
    id: "sub-7-ssc-q1-science", 
    phaseId: "phase-7-ssc-q1", 
    name: "বিজ্ঞান", 
    tokens: ["বিজ্ঞান", "science", "sci"] 
  },
  
  // Class 7 SSC Q2 Subjects
  { 
    id: "sub-7-ssc-q2-bangla", 
    phaseId: "phase-7-ssc-q2", 
    name: "বাংলা",
    tokens: ["বাংলা", "bangla", "bn"] 
  },
  { 
    id: "sub-7-ssc-q2-math", 
    phaseId: "phase-7-ssc-q2", 
    name: "গণিত", 
    tokens: ["গণিত", "math", "mathematics"] 
  },
  
  // Class 7 Admission Phase 1 Subjects
  { 
    id: "sub-7-admission-p1-biology", 
    phaseId: "phase-7-admission-p1", 
    name: "জীববিজ্ঞান", 
    tokens: ["জীববিজ্ঞান", "biology", "bio"] 
  },
  { 
    id: "sub-7-admission-p1-physics", 
    phaseId: "phase-7-admission-p1", 
    name: "পদার্থবিজ্ঞান", 
    tokens: ["পদার্থবিজ্ঞান", "physics", "phy"] 
  },
  { 
    id: "sub-7-admission-p1-chemistry", 
    phaseId: "phase-7-admission-p1", 
    name: "রসায়ন", 
    tokens: ["রসায়ন", "chemistry", "chem"] 
  },
];

// ===== CHAPTERS =====
export const chapters: Chapter[] = [
  // Class 6 SSC Q1 Bangla Chapters
  { 
    id: "ch-6-ssc-q1-bangla-1", 
    subjectId: "sub-6-ssc-q1-bangla", 
    index: 1, 
    name: "অধ্যায় ১: ব্যাকরণ পরিচিতি", 
    tokens: ["ব্যাকরণ", "grammar", "পরিচিতি"] 
  },
  { 
    id: "ch-6-ssc-q1-bangla-2", 
    subjectId: "sub-6-ssc-q1-bangla", 
    index: 2, 
    name: "অধ্যায় ২: কবিতা ও গল্প", 
    tokens: ["কবিতা", "গল্প", "poetry", "story"] 
  },
  
  // Class 6 SSC Q1 Math Chapters
  { 
    id: "ch-6-ssc-q1-math-1", 
    subjectId: "sub-6-ssc-q1-math", 
    index: 1, 
    name: "অধ্যায় ১: সংখ্যা ও সংখ্যার ধারণা", 
    tokens: ["সংখ্যা", "number", "ধারণা", "concept"] 
  },
  { 
    id: "ch-6-ssc-q1-math-2", 
    subjectId: "sub-6-ssc-q1-math", 
    index: 2, 
    name: "অধ্যায় ২: ভগ্নাংশ", 
    tokens: ["ভগ্নাংশ", "fraction", "ভাগ"] 
  },
  
  // Class 6 SSC Q1 Science Chapters
  { 
    id: "ch-6-ssc-q1-science-1", 
    subjectId: "sub-6-ssc-q1-science", 
    index: 1, 
    name: "অধ্যায় ১: জীব ও জীবের পরিবেশ", 
    tokens: ["জীব", "environment", "পরিবেশ", "life"] 
  },
  { 
    id: "ch-6-ssc-q1-science-2", 
    subjectId: "sub-6-ssc-q1-science", 
    index: 2, 
    name: "অধ্যায় ২: পদার্থ ও শক্তি", 
    tokens: ["পদার্থ", "শক্তি", "matter", "energy"] 
  },
  
  // Class 7 SSC Q1 Bangla Chapters
  { 
    id: "ch-7-ssc-q1-bangla-1", 
    subjectId: "sub-7-ssc-q1-bangla", 
    index: 1, 
    name: "অধ্যায় ১: ব্যাকরণ ও ভাষা", 
    tokens: ["ব্যাকরণ", "ভাষা", "grammar", "language"] 
  },
  { 
    id: "ch-7-ssc-q1-bangla-2", 
    subjectId: "sub-7-ssc-q1-bangla", 
    index: 2, 
    name: "অধ্যায় ২: সাহিত্য পরিচিতি", 
    tokens: ["সাহিত্য", "literature", "পরিচিতি"] 
  },
  
  // Class 7 SSC Q1 Math Chapters
  { 
    id: "ch-7-ssc-q1-math-1", 
    subjectId: "sub-7-ssc-q1-math", 
    index: 1, 
    name: "অধ্যায় ১: বীজগণিতীয় রাশি", 
    tokens: ["বীজগণিত", "algebra", "রাশি", "expression"] 
  },
  { 
    id: "ch-7-ssc-q1-math-2", 
    subjectId: "sub-7-ssc-q1-math", 
    index: 2, 
    name: "অধ্যায় ২: সমীকরণ", 
    tokens: ["সমীকরণ", "equation", "সূত্র"] 
  },
  
  // Class 7 SSC Q1 Science Chapters
  { 
    id: "ch-7-ssc-q1-science-1", 
    subjectId: "sub-7-ssc-q1-science", 
    index: 1, 
    name: "অধ্যায় ১: কোষ ও জীব", 
    tokens: ["কোষ", "জীব", "cell", "organism"] 
  },
  { 
    id: "ch-7-ssc-q1-science-2", 
    subjectId: "sub-7-ssc-q1-science", 
    index: 2, 
    name: "অধ্যায় ২: আলোক সংশ্লেষণ", 
    tokens: ["আলোক", "সংশ্লেষণ", "photosynthesis", "light"] 
  },
  
  // Class 7 Admission Biology Chapters
  { 
    id: "ch-7-admission-bio-1", 
    subjectId: "sub-7-admission-p1-biology", 
    index: 1, 
    name: "অধ্যায় ১: জীববিজ্ঞান পরিচিতি", 
    tokens: ["জীববিজ্ঞান", "biology", "পরিচিতি"] 
  },
  { 
    id: "ch-7-admission-bio-2", 
    subjectId: "sub-7-admission-p1-biology", 
    index: 2, 
    name: "অধ্যায় ২: কোষ বিভাজন", 
    tokens: ["কোষ", "বিভাজন", "cell", "division"] 
  },
];

// ===== TOPICS =====
export const topics: Topic[] = [
  // Class 6 SSC Q1 Bangla Topics
  { 
    id: "tp-6-bangla-grammar", 
    chapterId: "ch-6-ssc-q1-bangla-1", 
    index: 1, 
    name: "বাক্যের অঙ্গ", 
    tokens: ["বাক্য", "অঙ্গ", "sentence", "parts"] 
  },
  { 
    id: "tp-6-bangla-poetry", 
    chapterId: "ch-6-ssc-q1-bangla-2", 
    index: 1, 
    name: "কবিতা বিশ্লেষণ", 
    tokens: ["কবিতা", "বিশ্লেষণ", "poetry", "analysis"] 
  },
  
  // Class 6 SSC Q1 Math Topics
  { 
    id: "tp-6-math-numbers", 
    chapterId: "ch-6-ssc-q1-math-1", 
    index: 1, 
    name: "প্রাকৃতিক সংখ্যা", 
    tokens: ["প্রাকৃতিক", "সংখ্যা", "natural", "number"] 
  },
  { 
    id: "tp-6-math-fractions", 
    chapterId: "ch-6-ssc-q1-math-2", 
    index: 1, 
    name: "ভগ্নাংশের যোগ", 
    tokens: ["ভগ্নাংশ", "যোগ", "fraction", "addition"] 
  },
  
  // Class 6 SSC Q1 Science Topics
  { 
    id: "tp-6-science-environment", 
    chapterId: "ch-6-ssc-q1-science-1", 
    index: 1, 
    name: "জীবের বাসস্থান", 
    tokens: ["জীব", "বাসস্থান", "habitat", "environment"] 
  },
  { 
    id: "tp-6-science-matter", 
    chapterId: "ch-6-ssc-q1-science-2", 
    index: 1, 
    name: "পদার্থের অবস্থা", 
    tokens: ["পদার্থ", "অবস্থা", "matter", "state"] 
  },
  
  // Class 7 SSC Q1 Bangla Topics
  { 
    id: "tp-7-bangla-grammar", 
    chapterId: "ch-7-ssc-q1-bangla-1", 
    index: 1, 
    name: "বাক্য গঠন", 
    tokens: ["বাক্য", "গঠন", "sentence", "structure"] 
  },
  { 
    id: "tp-7-bangla-literature", 
    chapterId: "ch-7-ssc-q1-bangla-2", 
    index: 1, 
    name: "সাহিত্যের প্রকার", 
    tokens: ["সাহিত্য", "প্রকার", "literature", "types"] 
  },
  
  // Class 7 SSC Q1 Math Topics
  { 
    id: "tp-7-math-algebra", 
    chapterId: "ch-7-ssc-q1-math-1", 
    index: 1, 
    name: "বীজগণিতীয় রাশি", 
    tokens: ["বীজগণিত", "রাশি", "algebra", "expression"] 
  },
  { 
    id: "tp-7-math-equation", 
    chapterId: "ch-7-ssc-q1-math-2", 
    index: 1, 
    name: "রৈখিক সমীকরণ", 
    tokens: ["রৈখিক", "সমীকরণ", "linear", "equation"] 
  },
  
  // Class 7 SSC Q1 Science Topics
  { 
    id: "tp-7-science-cell", 
    chapterId: "ch-7-ssc-q1-science-1", 
    index: 1, 
    name: "কোষের গঠন", 
    tokens: ["কোষ", "গঠন", "cell", "structure"] 
  },
  { 
    id: "tp-7-science-photosynthesis", 
    chapterId: "ch-7-ssc-q1-science-2", 
    index: 1, 
    name: "আলোক সংশ্লেষণ", 
    tokens: ["আলোক", "সংশ্লেষণ", "photosynthesis", "light"] 
  },
  
  // Class 7 Admission Biology Topics
  { 
    id: "tp-7-admission-bio-intro", 
    chapterId: "ch-7-admission-bio-1", 
    index: 1, 
    name: "জীববিজ্ঞান পরিচিতি", 
    tokens: ["জীববিজ্ঞান", "biology", "পরিচিতি"] 
  },
  { 
    id: "tp-7-admission-bio-mitosis", 
    chapterId: "ch-7-admission-bio-2", 
    index: 1, 
    name: "মাইটোসিস", 
    tokens: ["মাইটোসিস", "mitosis", "কোষ বিভাজন"] 
  },
];

// ===== CONTENTS =====
const now = Date.now();
const in1h = new Date(now + 60 * 60 * 1000).toISOString();
const in2h = new Date(now + 2 * 60 * 60 * 1000).toISOString();
const ago1h = new Date(now - 60 * 60 * 1000).toISOString();

export const contents: Content[] = [
  // Class 6 SSC Q1 Bangla Contents
  { 
    id: "cnt-6-bangla-grammar-live", 
    topicId: "tp-6-bangla-grammar", 
    type: "LIVE_CLASS", 
    title: "বাক্যের অঙ্গ - লাইভ ক্লাস", 
    teacher: "রফিক আহমেদ",
    description: "বাংলা ব্যাকরণের বাক্যের অঙ্গ নিয়ে বিস্তারিত আলোচনা",
    isFree: true, 
    startsAt: in1h, 
    statsText: "৫.২ হাজার+" 
  },
  { 
    id: "cnt-6-bangla-grammar-recorded", 
    topicId: "tp-6-bangla-grammar", 
    type: "RECORDED_CLASS", 
    title: "বাক্যের অঙ্গ - রেকর্ডেড ক্লাস", 
    teacher: "রফিক আহমেদ",
    description: "বাংলা ব্যাকরণের বাক্যের অঙ্গ সম্পূর্ণ রেকর্ডেড ক্লাস",
    isFree: false, 
    durationSec: 1800, 
    statsText: "৮.৭ হাজার+" 
  },
  { 
    id: "cnt-6-bangla-grammar-note", 
    topicId: "tp-6-bangla-grammar", 
    type: "SMART_NOTE", 
    title: "বাক্যের অঙ্গ - স্মার্ট নোট", 
    teacher: "রফিক আহমেদ",
    description: "বাংলা ব্যাকরণের বাক্যের অঙ্গ স্মার্ট নোট",
    isFree: false, 
    statsText: "১২.৩ হাজার+" 
  },
  { 
    id: "cnt-6-bangla-grammar-quiz", 
    topicId: "tp-6-bangla-grammar", 
    type: "QUIZ", 
    title: "বাক্যের অঙ্গ MCQ টেস্ট", 
    teacher: "রফিক আহমেদ",
    description: "বাংলা ব্যাকরণের বাক্যের অঙ্গ MCQ অনুশীলন",
    isFree: true, 
    statsText: "৬.৮ হাজার+" 
  },
  
  // Additional Grammar Content Types
  { 
    id: "cnt-6-bangla-grammar-animated", 
    topicId: "tp-6-bangla-grammar", 
    type: "ANIMATED_VIDEO", 
    title: "বাক্যের অঙ্গ অ্যানিমেশন", 
    teacher: "রফিক আহমেদ",
    description: "বাংলা ব্যাকরণের বাক্যের অঙ্গ অ্যানিমেটেড ভিডিও",
    isFree: true, 
    durationSec: 360, 
    statsText: "১৪.৫ হাজার+" 
  },
  { 
    id: "cnt-6-bangla-grammar-class-note", 
    topicId: "tp-6-bangla-grammar", 
    type: "CLASS_NOTE", 
    title: "বাক্যের অঙ্গ ক্লাস নোট", 
    teacher: "রফিক আহমেদ",
    description: "বাংলা ব্যাকরণের বাক্যের অঙ্গ ক্লাস নোট",
    isFree: true, 
    statsText: "১০.৭ হাজার+" 
  },
  { 
    id: "cnt-6-bangla-grammar-pdf", 
    topicId: "tp-6-bangla-grammar", 
    type: "PDF_NOTES", 
    title: "বাক্যের অঙ্গ PDF নোট", 
    teacher: "রফিক আহমেদ",
    description: "বাংলা ব্যাকরণের বাক্যের অঙ্গ বিস্তারিত PDF নোট",
    isFree: false, 
    statsText: "১৬.৯ হাজার+" 
  },
  { 
    id: "cnt-6-bangla-grammar-cq", 
    topicId: "tp-6-bangla-grammar", 
    type: "CQ_EXAM", 
    title: "বাক্যের অঙ্গ CQ পরীক্ষা", 
    teacher: "রফিক আহমেদ",
    description: "বাংলা ব্যাকরণের বাক্যের অঙ্গ সৃজনশীল প্রশ্ন",
    isFree: false, 
    statsText: "১৩.২ হাজার+" 
  },
  { 
    id: "cnt-6-bangla-grammar-model-test", 
    topicId: "tp-6-bangla-grammar", 
    type: "MODEL_TEST", 
    title: "বাক্যের অঙ্গ মডেল টেস্ট", 
    teacher: "রফিক আহমেদ",
    description: "বাংলা ব্যাকরণের বাক্যের অঙ্গ মডেল টেস্ট",
    isFree: false, 
    statsText: "১৫.৮ হাজার+" 
  },
  { 
    id: "cnt-6-bangla-grammar-live-exam", 
    topicId: "tp-6-bangla-grammar", 
    type: "LIVE_EXAM", 
    title: "বাক্যের অঙ্গ লাইভ এক্সাম", 
    teacher: "রফিক আহমেদ",
    description: "বাংলা ব্যাকরণের বাক্যের অঙ্গ লাইভ পরীক্ষা",
    isFree: false, 
    startsAt: in2h, 
    statsText: "১৯.৪ হাজার+" 
  },
  { 
    id: "cnt-6-bangla-grammar-story", 
    topicId: "tp-6-bangla-grammar", 
    type: "STORY", 
    title: "ব্যাকরণের গল্প", 
    teacher: "রফিক আহমেদ",
    description: "বাংলা ব্যাকরণ নিয়ে শিক্ষামূলক গল্প",
    isFree: true, 
    durationSec: 300, 
    statsText: "৫.৬ হাজার+" 
  },
  { 
    id: "cnt-6-bangla-grammar-guideline", 
    topicId: "tp-6-bangla-grammar", 
    type: "GUIDELINE_VIDEO", 
    title: "বাক্যের অঙ্গ গাইডলাইন", 
    teacher: "রফিক আহমেদ",
    description: "বাংলা ব্যাকরণের বাক্যের অঙ্গ শেখার গাইডলাইন",
    isFree: true, 
    durationSec: 320, 
    statsText: "৯.৩ হাজার+" 
  },
  { 
    id: "cnt-6-bangla-grammar-homework", 
    topicId: "tp-6-bangla-grammar", 
    type: "HOMEWORK", 
    title: "বাক্যের অঙ্গ হোমওয়ার্ক", 
    teacher: "রফিক আহমেদ",
    description: "বাংলা ব্যাকরণের বাক্যের অঙ্গ অনুশীলনী",
    isFree: true, 
    statsText: "৮.১ হাজার+" 
  },
  
  // Class 6 SSC Q1 Math Contents
  { 
    id: "cnt-6-math-numbers-live", 
    topicId: "tp-6-math-numbers", 
    type: "LIVE_CLASS", 
    title: "প্রাকৃতিক সংখ্যা - লাইভ ক্লাস", 
    teacher: "সালমা খাতুন",
    description: "প্রাকৃতিক সংখ্যার ধারণা ও প্রয়োগ",
    isFree: true, 
    startsAt: in2h, 
    statsText: "৭.১ হাজার+" 
  },
  { 
    id: "cnt-6-math-numbers-animated", 
    topicId: "tp-6-math-numbers", 
    type: "ANIMATED_VIDEO", 
    title: "প্রাকৃতিক সংখ্যা অ্যানিমেশন", 
    teacher: "সালমা খাতুন",
    description: "প্রাকৃতিক সংখ্যার অ্যানিমেটেড ভিডিও",
    isFree: true, 
    durationSec: 420, 
    statsText: "১৫.৬ হাজার+" 
  },
  { 
    id: "cnt-6-math-numbers-note", 
    topicId: "tp-6-math-numbers", 
    type: "CLASS_NOTE", 
    title: "প্রাকৃতিক সংখ্যা ক্লাস নোট", 
    teacher: "সালমা খাতুন",
    description: "প্রাকৃতিক সংখ্যার ক্লাস নোট",
    isFree: true, 
    statsText: "৯.৪ হাজার+" 
  },
  
  // Class 6 SSC Q1 Science Contents
  { 
    id: "cnt-6-science-environment-live", 
    topicId: "tp-6-science-environment", 
    type: "LIVE_CLASS", 
    title: "জীবের বাসস্থান - লাইভ ক্লাস", 
    teacher: "ড. মাহমুদ হাসান",
    description: "জীবের বাসস্থান ও পরিবেশ নিয়ে আলোচনা",
    isFree: true, 
    startsAt: in1h, 
    statsText: "৪.৯ হাজার+" 
  },
  { 
    id: "cnt-6-science-environment-recorded", 
    topicId: "tp-6-science-environment", 
    type: "RECORDED_CLASS", 
    title: "জীবের বাসস্থান - রেকর্ডেড ক্লাস", 
    teacher: "ড. মাহমুদ হাসান",
    description: "জীবের বাসস্থান সম্পূর্ণ রেকর্ডেড ক্লাস",
    isFree: false, 
    durationSec: 2100, 
    statsText: "১১.২ হাজার+" 
  },
  { 
    id: "cnt-6-science-environment-note", 
    topicId: "tp-6-science-environment", 
    type: "PDF_NOTES", 
    title: "জীবের বাসস্থান PDF নোট", 
    teacher: "ড. মাহমুদ হাসান",
    description: "জীবের বাসস্থান PDF নোট",
    isFree: true, 
    statsText: "১৩.৭ হাজার+" 
  },
  
  // Class 7 SSC Q1 Bangla Contents
  { 
    id: "cnt-7-bangla-grammar-live", 
    topicId: "tp-7-bangla-grammar", 
    type: "LIVE_CLASS", 
    title: "বাক্য গঠন - লাইভ ক্লাস", 
    teacher: "নাসির উদ্দিন",
    description: "বাংলা ব্যাকরণের বাক্য গঠন নিয়ে বিস্তারিত আলোচনা",
    isFree: true, 
    startsAt: in1h, 
    statsText: "৬.৩ হাজার+" 
  },
  { 
    id: "cnt-7-bangla-grammar-recorded", 
    topicId: "tp-7-bangla-grammar", 
    type: "RECORDED_CLASS", 
    title: "বাক্য গঠন - রেকর্ডেড ক্লাস", 
    teacher: "নাসির উদ্দিন",
    description: "বাংলা ব্যাকরণের বাক্য গঠন সম্পূর্ণ রেকর্ডেড ক্লাস",
    isFree: false, 
    durationSec: 2400, 
    statsText: "১০.৮ হাজার+" 
  },
  { 
    id: "cnt-7-bangla-grammar-note", 
    topicId: "tp-7-bangla-grammar", 
    type: "SMART_NOTE", 
    title: "বাক্য গঠন - স্মার্ট নোট", 
    teacher: "নাসির উদ্দিন",
    description: "বাংলা ব্যাকরণের বাক্য গঠন স্মার্ট নোট",
    isFree: false, 
    statsText: "১৪.৫ হাজার+" 
  },
  
  // Class 7 SSC Q1 Math Contents
  { 
    id: "cnt-7-math-algebra-live", 
    topicId: "tp-7-math-algebra", 
    type: "LIVE_CLASS", 
    title: "বীজগণিতীয় রাশি - লাইভ ক্লাস", 
    teacher: "রোকসানা পারভীন",
    description: "বীজগণিতীয় রাশির ধারণা ও প্রয়োগ",
    isFree: true, 
    startsAt: in2h, 
    statsText: "৮.২ হাজার+" 
  },
  { 
    id: "cnt-7-math-algebra-animated", 
    topicId: "tp-7-math-algebra", 
    type: "ANIMATED_VIDEO", 
    title: "বীজগণিতীয় রাশি অ্যানিমেশন", 
    teacher: "রোকসানা পারভীন",
    description: "বীজগণিতীয় রাশির অ্যানিমেটেড ভিডিও",
    isFree: true, 
    durationSec: 480, 
    statsText: "১৮.৯ হাজার+" 
  },
  { 
    id: "cnt-7-math-algebra-note", 
    topicId: "tp-7-math-algebra", 
    type: "CLASS_NOTE", 
    title: "বীজগণিতীয় রাশি ক্লাস নোট", 
    teacher: "রোকসানা পারভীন",
    description: "বীজগণিতীয় রাশির ক্লাস নোট",
    isFree: true, 
    statsText: "১১.৬ হাজার+" 
  },
  { 
    id: "cnt-7-math-algebra-quiz", 
    topicId: "tp-7-math-algebra", 
    type: "QUIZ", 
    title: "বীজগণিতীয় রাশি MCQ টেস্ট", 
    teacher: "রোকসানা পারভীন",
    description: "বীজগণিতীয় রাশির MCQ অনুশীলন",
    isFree: true, 
    statsText: "৭.৪ হাজার+" 
  },
  
  // Additional Algebra Content Types
  { 
    id: "cnt-7-math-algebra-recorded", 
    topicId: "tp-7-math-algebra", 
    type: "RECORDED_CLASS", 
    title: "বীজগণিতীয় রাশি রেকর্ডেড ক্লাস", 
    teacher: "রোকসানা পারভীন",
    description: "বীজগণিতীয় রাশির রেকর্ডেড ক্লাস ভিডিও",
    isFree: false, 
    durationSec: 2400, 
    statsText: "২৩.৭ হাজার+" 
  },
  { 
    id: "cnt-7-math-algebra-smart-note", 
    topicId: "tp-7-math-algebra", 
    type: "SMART_NOTE", 
    title: "বীজগণিতীয় রাশি স্মার্ট নোট", 
    teacher: "রোকসানা পারভীন",
    description: "বীজগণিতীয় রাশির স্মার্ট নোট",
    isFree: false, 
    statsText: "১৯.৪ হাজার+" 
  },
  { 
    id: "cnt-7-math-algebra-pdf", 
    topicId: "tp-7-math-algebra", 
    type: "PDF_NOTES", 
    title: "বীজগণিতীয় রাশি PDF নোট", 
    teacher: "রোকসানা পারভীন",
    description: "বীজগণিতীয় রাশির বিস্তারিত PDF নোট",
    isFree: false, 
    statsText: "২১.৮ হাজার+" 
  },
  { 
    id: "cnt-7-math-algebra-cq", 
    topicId: "tp-7-math-algebra", 
    type: "CQ_EXAM", 
    title: "বীজগণিতীয় রাশি CQ পরীক্ষা", 
    teacher: "রোকসানা পারভীন",
    description: "বীজগণিতীয় রাশির সৃজনশীল প্রশ্ন",
    isFree: false, 
    statsText: "১৬.৫ হাজার+" 
  },
  { 
    id: "cnt-7-math-algebra-model-test", 
    topicId: "tp-7-math-algebra", 
    type: "MODEL_TEST", 
    title: "বীজগণিতীয় রাশি মডেল টেস্ট", 
    teacher: "রোকসানা পারভীন",
    description: "বীজগণিতীয় রাশির মডেল টেস্ট",
    isFree: false, 
    statsText: "২০.১ হাজার+" 
  },
  { 
    id: "cnt-7-math-algebra-live-exam", 
    topicId: "tp-7-math-algebra", 
    type: "LIVE_EXAM", 
    title: "বীজগণিতীয় রাশি লাইভ এক্সাম", 
    teacher: "রোকসানা পারভীন",
    description: "বীজগণিতীয় রাশির লাইভ পরীক্ষা",
    isFree: false, 
    startsAt: in1h, 
    statsText: "২৪.৩ হাজার+" 
  },
  { 
    id: "cnt-7-math-algebra-story", 
    topicId: "tp-7-math-algebra", 
    type: "STORY", 
    title: "বীজগণিতের গল্প", 
    teacher: "রোকসানা পারভীন",
    description: "বীজগণিত নিয়ে শিক্ষামূলক গল্প",
    isFree: true, 
    durationSec: 420, 
    statsText: "৬.৭ হাজার+" 
  },
  { 
    id: "cnt-7-math-algebra-guideline", 
    topicId: "tp-7-math-algebra", 
    type: "GUIDELINE_VIDEO", 
    title: "বীজগণিতীয় রাশি গাইডলাইন", 
    teacher: "রোকসানা পারভীন",
    description: "বীজগণিতীয় রাশি শেখার গাইডলাইন",
    isFree: true, 
    durationSec: 360, 
    statsText: "১২.৯ হাজার+" 
  },
  { 
    id: "cnt-7-math-algebra-homework", 
    topicId: "tp-7-math-algebra", 
    type: "HOMEWORK", 
    title: "বীজগণিতীয় রাশি হোমওয়ার্ক", 
    teacher: "রোকসানা পারভীন",
    description: "বীজগণিতীয় রাশির অনুশীলনী",
    isFree: true, 
    statsText: "১৫.২ হাজার+" 
  },
  
  // Class 7 SSC Q1 Science Contents
  { 
    id: "cnt-7-science-cell-live", 
    topicId: "tp-7-science-cell", 
    type: "LIVE_CLASS", 
    title: "কোষের গঠন - লাইভ ক্লাস", 
    teacher: "ড. ফারহানা ইয়াসমিন",
    description: "কোষের গঠন ও কার্যাবলি নিয়ে আলোচনা",
    isFree: true, 
    startsAt: in1h, 
    statsText: "৫.৭ হাজার+" 
  },
  { 
    id: "cnt-7-science-cell-recorded", 
    topicId: "tp-7-science-cell", 
    type: "RECORDED_CLASS", 
    title: "কোষের গঠন - রেকর্ডেড ক্লাস", 
    teacher: "ড. ফারহানা ইয়াসমিন",
    description: "কোষের গঠন সম্পূর্ণ রেকর্ডেড ক্লাস",
    isFree: false, 
    durationSec: 2700, 
    statsText: "১২.১ হাজার+" 
  },
  { 
    id: "cnt-7-science-cell-note", 
    topicId: "tp-7-science-cell", 
    type: "PDF_NOTES", 
    title: "কোষের গঠন PDF নোট", 
    teacher: "ড. ফারহানা ইয়াসমিন",
    description: "কোষের গঠন PDF নোট",
    isFree: true, 
    statsText: "১৬.৩ হাজার+" 
  },
  { 
    id: "cnt-7-science-cell-quiz", 
    topicId: "tp-7-science-cell", 
    type: "QUIZ", 
    title: "কোষের গঠন MCQ টেস্ট", 
    teacher: "ড. ফারহানা ইয়াসমিন",
    description: "কোষের গঠন MCQ অনুশীলন",
    isFree: true, 
    statsText: "৯.৮ হাজার+" 
  },
  
  // Additional Cell Content Types
  { 
    id: "cnt-7-science-cell-animated", 
    topicId: "tp-7-science-cell", 
    type: "ANIMATED_VIDEO", 
    title: "কোষের গঠন অ্যানিমেশন", 
    teacher: "ড. ফারহানা ইয়াসমিন",
    description: "কোষের গঠনের অ্যানিমেটেড ভিডিও",
    isFree: true, 
    durationSec: 480, 
    statsText: "১৯.২ হাজার+" 
  },
  { 
    id: "cnt-7-science-cell-smart-note", 
    topicId: "tp-7-science-cell", 
    type: "SMART_NOTE", 
    title: "কোষের গঠন স্মার্ট নোট", 
    teacher: "ড. ফারহানা ইয়াসমিন",
    description: "কোষের গঠনের স্মার্ট নোট",
    isFree: false, 
    statsText: "১৭.৫ হাজার+" 
  },
  { 
    id: "cnt-7-science-cell-class-note", 
    topicId: "tp-7-science-cell", 
    type: "CLASS_NOTE", 
    title: "কোষের গঠন ক্লাস নোট", 
    teacher: "ড. ফারহানা ইয়াসমিন",
    description: "কোষের গঠনের ক্লাস নোট",
    isFree: true, 
    statsText: "১৩.৭ হাজার+" 
  },
  { 
    id: "cnt-7-science-cell-cq", 
    topicId: "tp-7-science-cell", 
    type: "CQ_EXAM", 
    title: "কোষের গঠন CQ পরীক্ষা", 
    teacher: "ড. ফারহানা ইয়াসমিন",
    description: "কোষের গঠনের সৃজনশীল প্রশ্ন",
    isFree: false, 
    statsText: "১৫.৪ হাজার+" 
  },
  { 
    id: "cnt-7-science-cell-model-test", 
    topicId: "tp-7-science-cell", 
    type: "MODEL_TEST", 
    title: "কোষের গঠন মডেল টেস্ট", 
    teacher: "ড. ফারহানা ইয়াসমিন",
    description: "কোষের গঠনের মডেল টেস্ট",
    isFree: false, 
    statsText: "১৮.৯ হাজার+" 
  },
  { 
    id: "cnt-7-science-cell-live-exam", 
    topicId: "tp-7-science-cell", 
    type: "LIVE_EXAM", 
    title: "কোষের গঠন লাইভ এক্সাম", 
    teacher: "ড. ফারহানা ইয়াসমিন",
    description: "কোষের গঠনের লাইভ পরীক্ষা",
    isFree: false, 
    startsAt: in2h, 
    statsText: "২১.৬ হাজার+" 
  },
  { 
    id: "cnt-7-science-cell-story", 
    topicId: "tp-7-science-cell", 
    type: "STORY", 
    title: "কোষের গল্প", 
    teacher: "ড. ফারহানা ইয়াসমিন",
    description: "কোষ নিয়ে শিক্ষামূলক গল্প",
    isFree: true, 
    durationSec: 360, 
    statsText: "৭.৩ হাজার+" 
  },
  { 
    id: "cnt-7-science-cell-guideline", 
    topicId: "tp-7-science-cell", 
    type: "GUIDELINE_VIDEO", 
    title: "কোষের গঠন গাইডলাইন", 
    teacher: "ড. ফারহানা ইয়াসমিন",
    description: "কোষের গঠন শেখার গাইডলাইন",
    isFree: true, 
    durationSec: 380, 
    statsText: "১১.৮ হাজার+" 
  },
  { 
    id: "cnt-7-science-cell-homework", 
    topicId: "tp-7-science-cell", 
    type: "HOMEWORK", 
    title: "কোষের গঠন হোমওয়ার্ক", 
    teacher: "ড. ফারহানা ইয়াসমিন",
    description: "কোষের গঠনের অনুশীলনী",
    isFree: true, 
    statsText: "১০.২ হাজার+" 
  },
  
  // Class 7 SSC Q1 Science Photosynthesis Contents
  { 
    id: "cnt-7-science-photosynthesis-live", 
    topicId: "tp-7-science-photosynthesis", 
    type: "LIVE_CLASS", 
    title: "আলোক সংশ্লেষণ - লাইভ ক্লাস", 
    teacher: "ড. ফারহানা ইয়াসমিন",
    description: "আলোক সংশ্লেষণের প্রক্রিয়া নিয়ে বিস্তারিত আলোচনা",
    isFree: true, 
    startsAt: in2h, 
    statsText: "৭.৫ হাজার+" 
  },
  { 
    id: "cnt-7-science-photosynthesis-animated", 
    topicId: "tp-7-science-photosynthesis", 
    type: "ANIMATED_VIDEO", 
    title: "আলোক সংশ্লেষণ অ্যানিমেশন", 
    teacher: "ড. ফারহানা ইয়াসমিন",
    description: "আলোক সংশ্লেষণের অ্যানিমেটেড ভিডিও",
    isFree: true, 
    durationSec: 540, 
    statsText: "২০.৪ হাজার+" 
  },
  { 
    id: "cnt-7-science-photosynthesis-note", 
    topicId: "tp-7-science-photosynthesis", 
    type: "SMART_NOTE", 
    title: "আলোক সংশ্লেষণ স্মার্ট নোট", 
    teacher: "ড. ফারহানা ইয়াসমিন",
    description: "আলোক সংশ্লেষণের স্মার্ট নোট",
    isFree: false, 
    statsText: "১৫.৭ হাজার+" 
  },
  { 
    id: "cnt-7-science-photosynthesis-quiz", 
    topicId: "tp-7-science-photosynthesis", 
    type: "QUIZ", 
    title: "আলোক সংশ্লেষণ MCQ টেস্ট", 
    teacher: "ড. ফারহানা ইয়াসমিন",
    description: "আলোক সংশ্লেষণের MCQ অনুশীলন",
    isFree: true, 
    statsText: "১১.২ হাজার+" 
  },
  
  // Additional Photosynthesis Content Types
  { 
    id: "cnt-7-science-photosynthesis-recorded", 
    topicId: "tp-7-science-photosynthesis", 
    type: "RECORDED_CLASS", 
    title: "আলোক সংশ্লেষণ রেকর্ডেড ক্লাস", 
    teacher: "ড. ফারহানা ইয়াসমিন",
    description: "আলোক সংশ্লেষণের রেকর্ডেড ক্লাস ভিডিও",
    isFree: false, 
    durationSec: 1800, 
    statsText: "২৫.৮ হাজার+" 
  },
  { 
    id: "cnt-7-science-photosynthesis-pdf", 
    topicId: "tp-7-science-photosynthesis", 
    type: "PDF_NOTES", 
    title: "আলোক সংশ্লেষণ PDF নোট", 
    teacher: "ড. ফারহানা ইয়াসমিন",
    description: "আলোক সংশ্লেষণের বিস্তারিত PDF নোট",
    isFree: false, 
    statsText: "১৮.৩ হাজার+" 
  },
  { 
    id: "cnt-7-science-photosynthesis-class-note", 
    topicId: "tp-7-science-photosynthesis", 
    type: "CLASS_NOTE", 
    title: "আলোক সংশ্লেষণ ক্লাস নোট", 
    teacher: "ড. ফারহানা ইয়াসমিন",
    description: "আলোক সংশ্লেষণের ক্লাস নোট",
    isFree: true, 
    statsText: "১২.৬ হাজার+" 
  },
  { 
    id: "cnt-7-science-photosynthesis-cq", 
    topicId: "tp-7-science-photosynthesis", 
    type: "CQ_EXAM", 
    title: "আলোক সংশ্লেষণ CQ পরীক্ষা", 
    teacher: "ড. ফারহানা ইয়াসমিন",
    description: "আলোক সংশ্লেষণের সৃজনশীল প্রশ্ন",
    isFree: false, 
    statsText: "১৪.৯ হাজার+" 
  },
  { 
    id: "cnt-7-science-photosynthesis-model-test", 
    topicId: "tp-7-science-photosynthesis", 
    type: "MODEL_TEST", 
    title: "আলোক সংশ্লেষণ মডেল টেস্ট", 
    teacher: "ড. ফারহানা ইয়াসমিন",
    description: "আলোক সংশ্লেষণের মডেল টেস্ট",
    isFree: false, 
    statsText: "১৬.৭ হাজার+" 
  },
  { 
    id: "cnt-7-science-photosynthesis-live-exam", 
    topicId: "tp-7-science-photosynthesis", 
    type: "LIVE_EXAM", 
    title: "আলোক সংশ্লেষণ লাইভ এক্সাম", 
    teacher: "ড. ফারহানা ইয়াসমিন",
    description: "আলোক সংশ্লেষণের লাইভ পরীক্ষা",
    isFree: false, 
    startsAt: in1h, 
    statsText: "২২.১ হাজার+" 
  },
  { 
    id: "cnt-7-science-photosynthesis-story", 
    topicId: "tp-7-science-photosynthesis", 
    type: "STORY", 
    title: "আলোক সংশ্লেষণের গল্প", 
    teacher: "ড. ফারহানা ইয়াসমিন",
    description: "আলোক সংশ্লেষণ নিয়ে শিক্ষামূলক গল্প",
    isFree: true, 
    durationSec: 300, 
    statsText: "৮.৪ হাজার+" 
  },
  { 
    id: "cnt-7-science-photosynthesis-guideline", 
    topicId: "tp-7-science-photosynthesis", 
    type: "GUIDELINE_VIDEO", 
    title: "আলোক সংশ্লেষণ গাইডলাইন", 
    teacher: "ড. ফারহানা ইয়াসমিন",
    description: "আলোক সংশ্লেষণ শেখার গাইডলাইন",
    isFree: true, 
    durationSec: 420, 
    statsText: "১৩.৫ হাজার+" 
  },
  { 
    id: "cnt-7-science-photosynthesis-homework", 
    topicId: "tp-7-science-photosynthesis", 
    type: "HOMEWORK", 
    title: "আলোক সংশ্লেষণ হোমওয়ার্ক", 
    teacher: "ড. ফারহানা ইয়াসমিন",
    description: "আলোক সংশ্লেষণের অনুশীলনী",
    isFree: true, 
    statsText: "৯.৮ হাজার+" 
  },
  
  // Class 7 Admission Biology Contents
  { 
    id: "cnt-7-admission-bio-intro-live", 
    topicId: "tp-7-admission-bio-intro", 
    type: "LIVE_CLASS", 
    title: "জীববিজ্ঞান পরিচিতি - লাইভ ক্লাস", 
    teacher: "প্রফেসর ড. রহমান",
    description: "জীববিজ্ঞানের মৌলিক ধারণা ও পরিচিতি",
    isFree: false, 
    startsAt: in1h, 
    statsText: "৩.৮ হাজার+" 
  },
  { 
    id: "cnt-7-admission-bio-intro-recorded", 
    topicId: "tp-7-admission-bio-intro", 
    type: "RECORDED_CLASS", 
    title: "জীববিজ্ঞান পরিচিতি - রেকর্ডেড ক্লাস", 
    teacher: "প্রফেসর ড. রহমান",
    description: "জীববিজ্ঞান পরিচিতি সম্পূর্ণ রেকর্ডেড ক্লাস",
    isFree: false, 
    durationSec: 3000, 
    statsText: "৬.৯ হাজার+" 
  },
  { 
    id: "cnt-7-admission-bio-intro-note", 
    topicId: "tp-7-admission-bio-intro", 
    type: "ADMISSION_NOTE", 
    title: "জীববিজ্ঞান পরিচিতি ভর্তি নোট", 
    teacher: "প্রফেসর ড. রহমান",
    description: "জীববিজ্ঞান পরিচিতি ভর্তি পরীক্ষার নোট",
    isFree: false, 
    statsText: "৪.২ হাজার+" 
  },
  { 
    id: "cnt-7-admission-bio-intro-model", 
    topicId: "tp-7-admission-bio-intro", 
    type: "MODEL_TEST", 
    title: "জীববিজ্ঞান পরিচিতি মডেল টেস্ট", 
    teacher: "প্রফেসর ড. রহমান",
    description: "জীববিজ্ঞান পরিচিতি মডেল টেস্ট",
    isFree: false, 
    startsAt: ago1h, 
    statsText: "২.৭ হাজার+" 
  },
  
  // Class 7 Admission Biology Mitosis Contents
  { 
    id: "cnt-7-admission-bio-mitosis-live", 
    topicId: "tp-7-admission-bio-mitosis", 
    type: "LIVE_CLASS", 
    title: "মাইটোসিস - লাইভ ক্লাস", 
    teacher: "প্রফেসর ড. রহমান",
    description: "কোষ বিভাজনের মাইটোসিস প্রক্রিয়া নিয়ে আলোচনা",
    isFree: false, 
    startsAt: in2h, 
    statsText: "৪.১ হাজার+" 
  },
  { 
    id: "cnt-7-admission-bio-mitosis-animated", 
    topicId: "tp-7-admission-bio-mitosis", 
    type: "ANIMATED_VIDEO", 
    title: "মাইটোসিস অ্যানিমেশন", 
    teacher: "প্রফেসর ড. রহমান",
    description: "মাইটোসিস প্রক্রিয়ার অ্যানিমেটেড ভিডিও",
    isFree: false, 
    durationSec: 600, 
    statsText: "৭.৩ হাজার+" 
  },
  { 
    id: "cnt-7-admission-bio-mitosis-note", 
    topicId: "tp-7-admission-bio-mitosis", 
    type: "ADMISSION_NOTE", 
    title: "মাইটোসিস ভর্তি নোট", 
    teacher: "প্রফেসর ড. রহমান",
    description: "মাইটোসিস ভর্তি পরীক্ষার নোট",
    isFree: false, 
    statsText: "৫.৬ হাজার+" 
  },
  { 
    id: "cnt-7-admission-bio-mitosis-cq", 
    topicId: "tp-7-admission-bio-mitosis", 
    type: "CQ_EXAM", 
    title: "মাইটোসিস CQ পরীক্ষা", 
    teacher: "প্রফেসর ড. রহমান",
    description: "মাইটোসিস সৃজনশীল প্রশ্ন পরীক্ষা",
    isFree: false, 
    startsAt: in1h, 
    statsText: "৩.৪ হাজার+" 
  },
];

export const catalog = { classes, programs, phases, subjects, chapters, topics, contents };

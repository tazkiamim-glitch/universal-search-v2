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

  // More Class 6 SSC Q1 Math (Numbers) to ensure 3-5 per group
  { 
    id: "cnt-6-math-numbers-recorded", 
    topicId: "tp-6-math-numbers", 
    type: "RECORDED_CLASS", 
    title: "প্রাকৃতিক সংখ্যা - রেকর্ডেড ক্লাস", 
    teacher: "সালমা খাতুন",
    description: "প্রাকৃতিক সংখ্যা ধারণার পূর্ণাঙ্গ রেকর্ডেড লেকচার",
    isFree: false, 
    durationSec: 2100, 
    statsText: "১২.১ হাজার+" 
  },
  { 
    id: "cnt-6-math-numbers-story", 
    topicId: "tp-6-math-numbers", 
    type: "STORY", 
    title: "প্রাকৃতিক সংখ্যার গল্প", 
    teacher: "সালমা খাতুন",
    description: "প্রাকৃতিক সংখ্যার ইতিহাস ও প্রয়োগ নিয়ে গল্প",
    isFree: true, 
    durationSec: 300, 
    statsText: "৬.২ হাজার+" 
  },
  { 
    id: "cnt-6-math-numbers-guideline", 
    topicId: "tp-6-math-numbers", 
    type: "GUIDELINE_VIDEO", 
    title: "প্রাকৃতিক সংখ্যা শেখার গাইডলাইন", 
    teacher: "সালমা খাতুন",
    description: "দ্রুত শেখার কৌশল ও টিপস",
    isFree: true, 
    durationSec: 360, 
    statsText: "৭.১ হাজার+" 
  },
  { 
    id: "cnt-6-math-numbers-pdf", 
    topicId: "tp-6-math-numbers", 
    type: "PDF_NOTES", 
    title: "প্রাকৃতিক সংখ্যা PDF নোট", 
    teacher: "সালমা খাতুন",
    description: "প্রাকৃতিক সংখ্যার সারসংক্ষেপ নোট",
    isFree: false, 
    statsText: "১০.৪ হাজার+" 
  },
  { 
    id: "cnt-6-math-numbers-smart", 
    topicId: "tp-6-math-numbers", 
    type: "SMART_NOTE", 
    title: "প্রাকৃতিক সংখ্যা স্মার্ট নোট", 
    teacher: "সালমা খাতুন",
    description: "চিত্রসহ স্মার্ট নোট",
    isFree: true, 
    statsText: "৮.৮ হাজার+" 
  },
  { 
    id: "cnt-6-math-numbers-quiz", 
    topicId: "tp-6-math-numbers", 
    type: "QUIZ", 
    title: "প্রাকৃতিক সংখ্যা MCQ টেস্ট", 
    teacher: "সালমা খাতুন",
    description: "প্রাকৃতিক সংখ্যার অনুশীলনী প্রশ্ন",
    isFree: true, 
    statsText: "৫.৯ হাজার+" 
  },
  { 
    id: "cnt-6-math-numbers-model", 
    topicId: "tp-6-math-numbers", 
    type: "MODEL_TEST", 
    title: "প্রাকৃতিক সংখ্যা মডেল টেস্ট", 
    teacher: "সালমা খাতুন",
    description: "পূর্ণাঙ্গ মডেল টেস্ট",
    isFree: false, 
    startsAt: in1h, 
    statsText: "৭.৭ হাজার+" 
  },
  { 
    id: "cnt-6-math-numbers-cq", 
    topicId: "tp-6-math-numbers", 
    type: "CQ_EXAM", 
    title: "প্রাকৃতিক সংখ্যা CQ পরীক্ষা", 
    teacher: "সালমা খাতুন",
    description: "সৃজনশীল প্রশ্নাবলী",
    isFree: false, 
    statsText: "৬.৪ হাজার+" 
  },
  { 
    id: "cnt-6-math-numbers-live-exam", 
    topicId: "tp-6-math-numbers", 
    type: "LIVE_EXAM", 
    title: "প্রাকৃতিক সংখ্যা লাইভ এক্সাম", 
    teacher: "সালমা খাতুন",
    description: "লাইভ পরীক্ষায় অংশগ্রহণ করুন",
    isFree: false, 
    startsAt: in2h, 
    statsText: "৯.১ হাজার+" 
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

  // More Class 6 Science (Environment) to ensure 3-5 per group
  { 
    id: "cnt-6-science-environment-animated", 
    topicId: "tp-6-science-environment", 
    type: "ANIMATED_VIDEO", 
    title: "জীবের বাসস্থান অ্যানিমেশন", 
    teacher: "ড. মাহমুদ হাসান",
    description: "বাসস্থান নিয়ে অ্যানিমেটেড ব্যাখ্যা",
    isFree: true, 
    durationSec: 420, 
    statsText: "১২.৮ হাজার+" 
  },
  { 
    id: "cnt-6-science-environment-story", 
    topicId: "tp-6-science-environment", 
    type: "STORY", 
    title: "বাসস্থানের গল্প", 
    teacher: "ড. মাহমুদ হাসান",
    description: "বাসস্থান ও পরিবেশ নিয়ে শিক্ষামূলক গল্প",
    isFree: true, 
    durationSec: 300, 
    statsText: "৬.৯ হাজার+" 
  },
  { 
    id: "cnt-6-science-environment-guideline", 
    topicId: "tp-6-science-environment", 
    type: "GUIDELINE_VIDEO", 
    title: "জীবের বাসস্থান শেখার গাইডলাইন", 
    teacher: "ড. মাহমুদ হাসান",
    description: "টপিকটি পড়ার কৌশল",
    isFree: true, 
    durationSec: 360, 
    statsText: "৭.৩ হাজার+" 
  },
  { 
    id: "cnt-6-science-environment-smart", 
    topicId: "tp-6-science-environment", 
    type: "SMART_NOTE", 
    title: "জীবের বাসস্থান স্মার্ট নোট", 
    teacher: "ড. মাহমুদ হাসান",
    description: "চিত্রসহ স্মার্ট নোট",
    isFree: false, 
    statsText: "১১.৫ হাজার+" 
  },
  { 
    id: "cnt-6-science-environment-class-note", 
    topicId: "tp-6-science-environment", 
    type: "CLASS_NOTE", 
    title: "জীবের বাসস্থান ক্লাস নোট", 
    teacher: "ড. মাহমুদ হাসান",
    description: "ক্লাসের নোট সংকলন",
    isFree: true, 
    statsText: "৯.১ হাজার+" 
  },
  { 
    id: "cnt-6-science-environment-quiz", 
    topicId: "tp-6-science-environment", 
    type: "QUIZ", 
    title: "জীবের বাসস্থান MCQ টেস্ট", 
    teacher: "ড. মাহমুদ হাসান",
    description: "দ্রুত অনুশীলনী",
    isFree: true, 
    statsText: "৮.৯ হাজার+" 
  },
  { 
    id: "cnt-6-science-environment-model", 
    topicId: "tp-6-science-environment", 
    type: "MODEL_TEST", 
    title: "জীবের বাসস্থান মডেল টেস্ট", 
    teacher: "ড. মাহমুদ হাসান",
    description: "সময় নির্ধারিত পরীক্ষা",
    isFree: false, 
    startsAt: in1h, 
    statsText: "১০.২ হাজার+" 
  },
  { 
    id: "cnt-6-science-environment-cq", 
    topicId: "tp-6-science-environment", 
    type: "CQ_EXAM", 
    title: "জীবের বাসস্থান CQ পরীক্ষা", 
    teacher: "ড. মাহমুদ হাসান",
    description: "সৃজনশীল প্রশ্ন সমাধান",
    isFree: false, 
    statsText: "৭.৬ হাজার+" 
  },
  { 
    id: "cnt-6-science-environment-live-exam", 
    topicId: "tp-6-science-environment", 
    type: "LIVE_EXAM", 
    title: "জীবের বাসস্থান লাইভ এক্সাম", 
    teacher: "ড. মাহমুদ হাসান",
    description: "লাইভ পরীক্ষায় অংশগ্রহণ করুন",
    isFree: false, 
    startsAt: in2h, 
    statsText: "১১.৮ হাজার+" 
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

  // More Class 7 Bangla (Grammar) to ensure 3-5 per group
  { 
    id: "cnt-7-bangla-grammar-animated", 
    topicId: "tp-7-bangla-grammar", 
    type: "ANIMATED_VIDEO", 
    title: "বাক্য গঠন অ্যানিমেশন", 
    teacher: "নাসির উদ্দিন",
    description: "অ্যানিমেটেড ব্যাখ্যা ও উদাহরণ",
    isFree: true, 
    durationSec: 420, 
    statsText: "১২.৭ হাজার+" 
  },
  { 
    id: "cnt-7-bangla-grammar-story", 
    topicId: "tp-7-bangla-grammar", 
    type: "STORY", 
    title: "বাক্য গঠনের গল্প", 
    teacher: "নাসির উদ্দিন",
    description: "মজার গল্পের মাধ্যমে শেখা",
    isFree: true, 
    durationSec: 300, 
    statsText: "৬.১ হাজার+" 
  },
  { 
    id: "cnt-7-bangla-grammar-guideline", 
    topicId: "tp-7-bangla-grammar", 
    type: "GUIDELINE_VIDEO", 
    title: "বাক্য গঠন শেখার গাইডলাইন", 
    teacher: "নাসির উদ্দিন",
    description: "দ্রুত শেখার টিপস",
    isFree: true, 
    durationSec: 360, 
    statsText: "৭.৫ হাজার+" 
  },
  { 
    id: "cnt-7-bangla-grammar-pdf", 
    topicId: "tp-7-bangla-grammar", 
    type: "PDF_NOTES", 
    title: "বাক্য গঠন PDF নোট", 
    teacher: "নাসির উদ্দিন",
    description: "সংক্ষিপ্ত নোট ও উদাহরণ",
    isFree: true, 
    statsText: "৯.৯ হাজার+" 
  },
  { 
    id: "cnt-7-bangla-grammar-class-note", 
    topicId: "tp-7-bangla-grammar", 
    type: "CLASS_NOTE", 
    title: "বাক্য গঠন ক্লাস নোট", 
    teacher: "নাসির উদ্দিন",
    description: "ক্লাসে ব্যবহৃত নোট",
    isFree: true, 
    statsText: "৮.৪ হাজার+" 
  },
  { 
    id: "cnt-7-bangla-grammar-quiz", 
    topicId: "tp-7-bangla-grammar", 
    type: "QUIZ", 
    title: "বাক্য গঠন MCQ টেস্ট", 
    teacher: "নাসির উদ্দিন",
    description: "দ্রুত অনুশীলনী",
    isFree: true, 
    statsText: "৭.৩ হাজার+" 
  },
  { 
    id: "cnt-7-bangla-grammar-model", 
    topicId: "tp-7-bangla-grammar", 
    type: "MODEL_TEST", 
    title: "বাক্য গঠন মডেল টেস্ট", 
    teacher: "নাসির উদ্দিন",
    description: "সময় নির্ধারিত পরীক্ষা",
    isFree: false, 
    startsAt: in2h, 
    statsText: "১০.৬ হাজার+" 
  },
  { 
    id: "cnt-7-bangla-grammar-cq", 
    topicId: "tp-7-bangla-grammar", 
    type: "CQ_EXAM", 
    title: "বাক্য গঠন CQ পরীক্ষা", 
    teacher: "নাসির উদ্দিন",
    description: "সৃজনশীল প্রশ্ন",
    isFree: false, 
    statsText: "৮.২ হাজার+" 
  },
  { 
    id: "cnt-7-bangla-grammar-live-exam", 
    topicId: "tp-7-bangla-grammar", 
    type: "LIVE_EXAM", 
    title: "বাক্য গঠন লাইভ এক্সাম", 
    teacher: "নাসির উদ্দিন",
    description: "লাইভ পরীক্ষায় অংশগ্রহণ করুন",
    isFree: false, 
    startsAt: in1h, 
    statsText: "১১.২ হাজার+" 
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
  
  // Additional premium Photosynthesis videos (to improve 30/70 mix)
  { 
    id: "cnt-7-science-photosynthesis-rec-advanced", 
    topicId: "tp-7-science-photosynthesis", 
    type: "RECORDED_CLASS", 
    title: "আলোক সংশ্লেষণ — উন্নত ধারণা (Recorded)", 
    teacher: "ড. ফারহানা ইয়াসমিন", 
    description: "Calvin Cycle, Photorespiration এবং নিয়ন্ত্রণ প্রক্রিয়া", 
    isFree: false, 
    durationSec: 2400, 
    statsText: "২৬.৩ হাজার+" 
  }, 
  { 
    id: "cnt-7-science-photosynthesis-replay", 
    topicId: "tp-7-science-photosynthesis", 
    type: "LIVE_REPLAY", 
    title: "আলোক সংশ্লেষণ লাইভ সেশন – রিপ্লে", 
    teacher: "ড. ফারহানা ইয়াসমিন", 
    description: "পূর্বের লাইভ ক্লাসের সম্পূর্ণ রিপ্লে", 
    isFree: false, 
    durationSec: 5400, 
    statsText: "১৭.৯ হাজার+" 
  }, 
  { 
    id: "cnt-7-science-photosynthesis-anim-pro", 
    topicId: "tp-7-science-photosynthesis", 
    type: "ANIMATED_VIDEO", 
    title: "Photosynthesis Pro – Full Animation", 
    teacher: "ড. ফারহানা ইয়াসমিন", 
    description: "Complete pathway visualization with energy flow", 
    isFree: false, 
    durationSec: 720, 
    statsText: "২১.১ হাজার+" 
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

  // More Admission Biology (Intro) to ensure 3-5 per group
  { 
    id: "cnt-7-admission-bio-intro-animated", 
    topicId: "tp-7-admission-bio-intro", 
    type: "ANIMATED_VIDEO", 
    title: "জীববিজ্ঞান পরিচিতি অ্যানিমেশন", 
    teacher: "প্রফেসর ড. রহমান",
    description: "অ্যানিমেটেড সংক্ষিপ্তসার",
    isFree: false, 
    durationSec: 480, 
    statsText: "৫.১ হাজার+" 
  },
  { 
    id: "cnt-7-admission-bio-intro-recorded-more", 
    topicId: "tp-7-admission-bio-intro", 
    type: "RECORDED_CLASS", 
    title: "জীববিজ্ঞান পরিচিতি - রেকর্ডেড ক্লাস (Advanced)", 
    teacher: "প্রফেসর ড. রহমান",
    description: "উন্নত ধারণা সহ রেকর্ডেড লেকচার",
    isFree: false, 
    durationSec: 2700, 
    statsText: "৬.৩ হাজার+" 
  },
  { 
    id: "cnt-7-admission-bio-intro-story", 
    topicId: "tp-7-admission-bio-intro", 
    type: "STORY", 
    title: "ভর্তি জীববিজ্ঞানের গল্প", 
    teacher: "প্রফেসর ড. রহমান",
    description: "মজার গল্পে মৌলিক ধারণা",
    isFree: true, 
    durationSec: 300, 
    statsText: "৩.৯ হাজার+" 
  },
  { 
    id: "cnt-7-admission-bio-intro-guideline", 
    topicId: "tp-7-admission-bio-intro", 
    type: "GUIDELINE_VIDEO", 
    title: "ভর্তি জীববিজ্ঞান শেখার গাইডলাইন", 
    teacher: "প্রফেসর ড. রহমান",
    description: "স্টাডি প্ল্যান ও টিপস",
    isFree: true, 
    durationSec: 360, 
    statsText: "৪.৪ হাজার+" 
  },
  { 
    id: "cnt-7-admission-bio-intro-pdf", 
    topicId: "tp-7-admission-bio-intro", 
    type: "PDF_NOTES", 
    title: "ভর্তি জীববিজ্ঞান PDF নোট", 
    teacher: "प्रফেসর ড. রহমান",
    description: "সংক্ষিপ্ত PDF নোট",
    isFree: false, 
    statsText: "৪.৭ হাজার+" 
  },
  { 
    id: "cnt-7-admission-bio-intro-smart", 
    topicId: "tp-7-admission-bio-intro", 
    type: "SMART_NOTE", 
    title: "ভর্তি জীববিজ্ঞান স্মার্ট নোট", 
    teacher: "প্রফেসর ড. রহমান",
    description: "চিত্রসহ স্মার্ট নোট",
    isFree: true, 
    statsText: "৪.৯ হাজার+" 
  },
  { 
    id: "cnt-7-admission-bio-intro-quiz", 
    topicId: "tp-7-admission-bio-intro", 
    type: "QUIZ", 
    title: "ভর্তি জীববিজ্ঞান MCQ টেস্ট", 
    teacher: "প্রফেসর ড. রহমান",
    description: "দ্রুত অনুশীলনী",
    isFree: false, 
    statsText: "৩.২ হাজার+" 
  },
  { 
    id: "cnt-7-admission-bio-intro-cq", 
    topicId: "tp-7-admission-bio-intro", 
    type: "CQ_EXAM", 
    title: "ভর্তি জীববিজ্ঞান CQ পরীক্ষা", 
    teacher: "প্রফেসর ড. রহমান",
    description: "সৃজনশীল প্রশ্ন",
    isFree: false, 
    statsText: "৩.৫ হাজার+" 
  },
  { 
    id: "cnt-7-admission-bio-intro-live-exam", 
    topicId: "tp-7-admission-bio-intro", 
    type: "LIVE_EXAM", 
    title: "ভর্তি জীববিজ্ঞান লাইভ এক্সাম", 
    teacher: "প্রফেসর ড. রহমান",
    description: "লাইভ পরীক্ষায় অংশগ্রহণ করুন",
    isFree: false, 
    startsAt: in2h, 
    statsText: "৩.৭ হাজার+" 
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

  // More Admission Biology (Mitosis) to ensure 3-5 per group
  { 
    id: "cnt-7-admission-bio-mitosis-recorded", 
    topicId: "tp-7-admission-bio-mitosis", 
    type: "RECORDED_CLASS", 
    title: "মাইটোসিস - রেকর্ডেড ক্লাস", 
    teacher: "প্রফেসর ড. রহমান",
    description: "সম্পূর্ণ রেকর্ডেড লেকচার",
    isFree: false, 
    durationSec: 2400, 
    statsText: "৫.৯ হাজার+" 
  },
  { 
    id: "cnt-7-admission-bio-mitosis-story", 
    topicId: "tp-7-admission-bio-mitosis", 
    type: "STORY", 
    title: "মাইটোসিসের গল্প", 
    teacher: "প্রফেসর ড. রহমান",
    description: "গল্পের মাধ্যমে মাইটোসিস",
    isFree: true, 
    durationSec: 300, 
    statsText: "৩.১ হাজার+" 
  },
  { 
    id: "cnt-7-admission-bio-mitosis-guideline", 
    topicId: "tp-7-admission-bio-mitosis", 
    type: "GUIDELINE_VIDEO", 
    title: "মাইটোসিস শেখার গাইডলাইন", 
    teacher: "প্রফেসর ড. রহমান",
    description: "স্টাডি টিপস",
    isFree: true, 
    durationSec: 360, 
    statsText: "৩.৪ হাজার+" 
  },
  { 
    id: "cnt-7-admission-bio-mitosis-pdf", 
    topicId: "tp-7-admission-bio-mitosis", 
    type: "PDF_NOTES", 
    title: "মাইটোসিস PDF নোট", 
    teacher: "প্রফেসর ড. রহমান",
    description: "সংক্ষিপ্ত PDF নোট",
    isFree: false, 
    statsText: "৩.৮ হাজার+" 
  },
  { 
    id: "cnt-7-admission-bio-mitosis-smart", 
    topicId: "tp-7-admission-bio-mitosis", 
    type: "SMART_NOTE", 
    title: "মাইটোসিস স্মার্ট নোট", 
    teacher: "প্রফেসর ড. রহমান",
    description: "চিত্রসহ স্মার্ট নোট",
    isFree: false, 
    statsText: "৪.১ হাজার+" 
  },
  { 
    id: "cnt-7-admission-bio-mitosis-class-note", 
    topicId: "tp-7-admission-bio-mitosis", 
    type: "CLASS_NOTE", 
    title: "মাইটোসিস ক্লাস নোট", 
    teacher: "প্রফেসর ড. রহমান",
    description: "ক্লাসের নোট",
    isFree: true, 
    statsText: "৩.৬ হাজার+" 
  },
  { 
    id: "cnt-7-admission-bio-mitosis-quiz", 
    topicId: "tp-7-admission-bio-mitosis", 
    type: "QUIZ", 
    title: "মাইটোসিস MCQ টেস্ট", 
    teacher: "প্রফেসর ড. রহমান",
    description: "দ্রুত অনুশীলনী",
    isFree: true, 
    statsText: "৩.৯ হাজার+" 
  },
  { 
    id: "cnt-7-admission-bio-mitosis-model", 
    topicId: "tp-7-admission-bio-mitosis", 
    type: "MODEL_TEST", 
    title: "মাইটোসিস মডেল টেস্ট", 
    teacher: "প্রফেসর ড. রহমান",
    description: "সময় নির্ধারিত পরীক্ষা",
    isFree: false, 
    startsAt: in2h, 
    statsText: "৪.২ হাজার+" 
  },
  { 
    id: "cnt-7-admission-bio-mitosis-live-exam", 
    topicId: "tp-7-admission-bio-mitosis", 
    type: "LIVE_EXAM", 
    title: "মাইটোসিস লাইভ এক্সাম", 
    teacher: "প্রফেসর ড. রহমান",
    description: "লাইভ পরীক্ষায় অংশগ্রহণ করুন",
    isFree: false, 
    startsAt: in1h, 
    statsText: "৪.৫ হাজার+" 
  },

  // ===== Class 6 Bangla Poetry =====
  { 
    id: "cnt-6-bangla-poetry-live", 
    topicId: "tp-6-bangla-poetry", 
    type: "LIVE_CLASS", 
    title: "কবিতা বিশ্লেষণ - লাইভ ক্লাস", 
    teacher: "রফিক আহমেদ",
    description: "কবিতার অলংকার ও ভাষার সৌন্দর্য বিশ্লেষণ",
    isFree: true, 
    startsAt: in2h, 
    statsText: "৫.১ হাজার+" 
  },
  { 
    id: "cnt-6-bangla-poetry-recorded", 
    topicId: "tp-6-bangla-poetry", 
    type: "RECORDED_CLASS", 
    title: "কবিতা বিশ্লেষণ - রেকর্ডেড ক্লাস", 
    teacher: "রফিক আহমেদ",
    description: "কবিতার গঠন, ছন্দ ও অলংকারের বিস্তারিত পাঠ",
    isFree: false, 
    durationSec: 2100, 
    statsText: "৮.৩ হাজার+" 
  },
  { 
    id: "cnt-6-bangla-poetry-animated", 
    topicId: "tp-6-bangla-poetry", 
    type: "ANIMATED_VIDEO", 
    title: "কবিতা বিশ্লেষণ অ্যানিমেশন", 
    teacher: "রফিক আহমেদ",
    description: "অ্যানিমেশনে কবিতার রূপক ও প্রতীক",
    isFree: true, 
    durationSec: 360, 
    statsText: "৬.৭ হাজার+" 
  },
  { 
    id: "cnt-6-bangla-poetry-guideline", 
    topicId: "tp-6-bangla-poetry", 
    type: "GUIDELINE_VIDEO", 
    title: "কবিতা শেখার গাইডলাইন", 
    teacher: "রফিক আহমেদ",
    description: "কবিতা পড়ার কৌশল ও টিপস",
    isFree: true, 
    durationSec: 300, 
    statsText: "৫.৯ হাজার+" 
  },
  { 
    id: "cnt-6-bangla-poetry-story", 
    topicId: "tp-6-bangla-poetry", 
    type: "STORY", 
    title: "কবিতার গল্প", 
    teacher: "রফিক আহমেদ",
    description: "কবিতার উৎস ও ইতিহাস নিয়ে গল্প",
    isFree: true, 
    durationSec: 300, 
    statsText: "৫.৩ হাজার+" 
  },
  { 
    id: "cnt-6-bangla-poetry-smart", 
    topicId: "tp-6-bangla-poetry", 
    type: "SMART_NOTE", 
    title: "কবিতা বিশ্লেষণ স্মার্ট নোট", 
    teacher: "রফিক আহমেদ",
    description: "মূল পয়েন্ট ও সারাংশ",
    isFree: false, 
    statsText: "৯.১ হাজার+" 
  },
  { 
    id: "cnt-6-bangla-poetry-class-note", 
    topicId: "tp-6-bangla-poetry", 
    type: "CLASS_NOTE", 
    title: "কবিতা বিশ্লেষণ ক্লাস নোট", 
    teacher: "রফিক আহমেদ",
    description: "ক্লাস নোট সংকলন",
    isFree: true, 
    statsText: "৭.২ হাজার+" 
  },
  { 
    id: "cnt-6-bangla-poetry-pdf", 
    topicId: "tp-6-bangla-poetry", 
    type: "PDF_NOTES", 
    title: "কবিতা বিশ্লেষণ PDF নোট", 
    teacher: "রফিক আহমেদ",
    description: "ডাউনলোডযোগ্য PDF",
    isFree: false, 
    statsText: "৮.6 হাজার+" 
  },
  { 
    id: "cnt-6-bangla-poetry-quiz", 
    topicId: "tp-6-bangla-poetry", 
    type: "QUIZ", 
    title: "কবিতা MCQ টেস্ট", 
    teacher: "রফিক আহমেদ",
    description: "দ্রুত অনুশীলনী প্রশ্ন",
    isFree: true, 
    statsText: "৬.১ হাজার+" 
  },
  { 
    id: "cnt-6-bangla-poetry-model", 
    topicId: "tp-6-bangla-poetry", 
    type: "MODEL_TEST", 
    title: "কবিতা মডেল টেস্ট", 
    teacher: "রফিক আহমেদ",
    description: "সময় নির্ধারিত পরীক্ষা",
    isFree: false, 
    startsAt: in1h, 
    statsText: "৬.৯ হাজার+" 
  },
  { 
    id: "cnt-6-bangla-poetry-cq", 
    topicId: "tp-6-bangla-poetry", 
    type: "CQ_EXAM", 
    title: "কবিতা CQ পরীক্ষা", 
    teacher: "রফিক আহমেদ",
    description: "সৃজনশীল প্রশ্ন",
    isFree: false, 
    statsText: "৫.৮ হাজার+" 
  },
  { 
    id: "cnt-6-bangla-poetry-live-exam", 
    topicId: "tp-6-bangla-poetry", 
    type: "LIVE_EXAM", 
    title: "কবিতা লাইভ এক্সাম", 
    teacher: "রফিক আহমেদ",
    description: "লাইভ পরীক্ষায় অংশগ্রহণ করুন",
    isFree: false, 
    startsAt: in2h, 
    statsText: "৭.১ হাজার+" 
  },

  // ===== Class 6 Math Fractions =====
  { 
    id: "cnt-6-math-fractions-live", 
    topicId: "tp-6-math-fractions", 
    type: "LIVE_CLASS", 
    title: "ভগ্নাংশের যোগ - লাইভ ক্লাস", 
    teacher: "সালমা খাতুন",
    description: "ভগ্নাংশের যোগ ও উদাহরণ",
    isFree: true, 
    startsAt: in1h, 
    statsText: "৬.৪ হাজার+" 
  },
  { 
    id: "cnt-6-math-fractions-recorded", 
    topicId: "tp-6-math-fractions", 
    type: "RECORDED_CLASS", 
    title: "ভগ্নাংশ - রেকর্ডেড ক্লাস", 
    teacher: "সালমা খাতুন",
    description: "ভগ্নাংশের ধারণা ও প্রয়োগ",
    isFree: false, 
    durationSec: 1800, 
    statsText: "৯.৭ হাজার+" 
  },
  { 
    id: "cnt-6-math-fractions-animated", 
    topicId: "tp-6-math-fractions", 
    type: "ANIMATED_VIDEO", 
    title: "ভগ্নাংশ অ্যানিমেশন", 
    teacher: "সালমা খাতুন",
    description: "চিত্রসহ ব্যাখ্যা",
    isFree: true, 
    durationSec: 420, 
    statsText: "১০.১ হাজার+" 
  },
  { 
    id: "cnt-6-math-fractions-guideline", 
    topicId: "tp-6-math-fractions", 
    type: "GUIDELINE_VIDEO", 
    title: "ভগ্নাংশ শেখার গাইডলাইন", 
    teacher: "সালমা খাতুন",
    description: "দ্রুত শেখার টিপস",
    isFree: true, 
    durationSec: 300, 
    statsText: "৭.৬ হাজার+" 
  },
  { 
    id: "cnt-6-math-fractions-class-note", 
    topicId: "tp-6-math-fractions", 
    type: "CLASS_NOTE", 
    title: "ভগ্নাংশ ক্লাস নোট", 
    teacher: "সালমা খাতুন",
    description: "ক্লাস নোট",
    isFree: true, 
    statsText: "৮.৩ হাজার+" 
  },
  { 
    id: "cnt-6-math-fractions-smart", 
    topicId: "tp-6-math-fractions", 
    type: "SMART_NOTE", 
    title: "ভগ্নাংশ স্মার্ট নোট", 
    teacher: "সালমা খাতুন",
    description: "সারসংক্ষেপ নোট",
    isFree: false, 
    statsText: "৮.৯ হাজার+" 
  },
  { 
    id: "cnt-6-math-fractions-pdf", 
    topicId: "tp-6-math-fractions", 
    type: "PDF_NOTES", 
    title: "ভগ্নাংশ PDF নোট", 
    teacher: "সালমা খাতুন",
    description: "ডাউনলোডযোগ্য নোট",
    isFree: false, 
    statsText: "৯.৩ হাজার+" 
  },
  { 
    id: "cnt-6-math-fractions-quiz", 
    topicId: "tp-6-math-fractions", 
    type: "QUIZ", 
    title: "ভগ্নাংশ MCQ টেস্ট", 
    teacher: "সালমা খাতুন",
    description: "অনুশীলনী প্রশ্ন",
    isFree: true, 
    statsText: "৬.২ হাজার+" 
  },
  { 
    id: "cnt-6-math-fractions-model", 
    topicId: "tp-6-math-fractions", 
    type: "MODEL_TEST", 
    title: "ভগ্নাংশ মডেল টেস্ট", 
    teacher: "সালমা খাতুন",
    description: "সময় নির্ধারিত পরীক্ষা",
    isFree: false, 
    startsAt: in2h, 
    statsText: "৭.১ হাজার+" 
  },
  { 
    id: "cnt-6-math-fractions-cq", 
    topicId: "tp-6-math-fractions", 
    type: "CQ_EXAM", 
    title: "ভগ্নাংশ CQ পরীক্ষা", 
    teacher: "সালমা খাতুন",
    description: "সৃজনশীল প্রশ্ন",
    isFree: false, 
    statsText: "৫.৯ হাজার+" 
  },
  { 
    id: "cnt-6-math-fractions-live-exam", 
    topicId: "tp-6-math-fractions", 
    type: "LIVE_EXAM", 
    title: "ভগ্নাংশ লাইভ এক্সাম", 
    teacher: "সালমা খাতুন",
    description: "লাইভ পরীক্ষা",
    isFree: false, 
    startsAt: in1h, 
    statsText: "৭.৯ হাজার+" 
  },

  // ===== Class 6 Science Matter =====
  { 
    id: "cnt-6-science-matter-live", 
    topicId: "tp-6-science-matter", 
    type: "LIVE_CLASS", 
    title: "পদার্থের অবস্থা - লাইভ ক্লাস", 
    teacher: "ড. মাহমুদ হাসান",
    description: "ঘন, তরল, বায়বীয় অবস্থা",
    isFree: true, 
    startsAt: in2h, 
    statsText: "৫.৪ হাজার+" 
  },
  { 
    id: "cnt-6-science-matter-recorded", 
    topicId: "tp-6-science-matter", 
    type: "RECORDED_CLASS", 
    title: "পদার্থের অবস্থা - রেকর্ডেড ক্লাস", 
    teacher: "ড. মাহমুদ হাসান",
    description: "অবস্থা পরিবর্তন ও উদাহরণ",
    isFree: false, 
    durationSec: 2000, 
    statsText: "৮.৬ হাজার+" 
  },
  { 
    id: "cnt-6-science-matter-animated", 
    topicId: "tp-6-science-matter", 
    type: "ANIMATED_VIDEO", 
    title: "পদার্থের অবস্থা অ্যানিমেশন", 
    teacher: "ড. মাহমুদ হাসান",
    description: "মলিকিউলার মডেল",
    isFree: true, 
    durationSec: 390, 
    statsText: "৯.২ হাজার+" 
  },
  { 
    id: "cnt-6-science-matter-guideline", 
    topicId: "tp-6-science-matter", 
    type: "GUIDELINE_VIDEO", 
    title: "পদার্থ শেখার গাইডলাইন", 
    teacher: "ড. মাহমুদ হাসান",
    description: "পড়ার কৌশল",
    isFree: true, 
    durationSec: 300, 
    statsText: "৬.৩ হাজার+" 
  },
  { 
    id: "cnt-6-science-matter-story", 
    topicId: "tp-6-science-matter", 
    type: "STORY", 
    title: "পদার্থের গল্প", 
    teacher: "ড. মাহমুদ হাসান",
    description: "দৈনন্দিন উদাহরণে পদার্থ",
    isFree: true, 
    durationSec: 300, 
    statsText: "৫.৭ হাজার+" 
  },
  { 
    id: "cnt-6-science-matter-class-note", 
    topicId: "tp-6-science-matter", 
    type: "CLASS_NOTE", 
    title: "পদার্থের অবস্থা ক্লাস নোট", 
    teacher: "ড. মাহমুদ হাসান",
    description: "ক্লাস নোট",
    isFree: true, 
    statsText: "৭.১ হাজার+" 
  },
  { 
    id: "cnt-6-science-matter-smart", 
    topicId: "tp-6-science-matter", 
    type: "SMART_NOTE", 
    title: "পদার্থের অবস্থা স্মার্ট নোট", 
    teacher: "ড. মাহমুদ হাসান",
    description: "সারসংক্ষেপ",
    isFree: false, 
    statsText: "৮.৪ হাজার+" 
  },
  { 
    id: "cnt-6-science-matter-pdf", 
    topicId: "tp-6-science-matter", 
    type: "PDF_NOTES", 
    title: "পদার্থের অবস্থা PDF নোট", 
    teacher: "ড. মাহমুদ হাসান",
    description: "ডাউনলোডযোগ্য",
    isFree: true, 
    statsText: "৯.৫ হাজার+" 
  },
  { 
    id: "cnt-6-science-matter-quiz", 
    topicId: "tp-6-science-matter", 
    type: "QUIZ", 
    title: "পদার্থের অবস্থা MCQ টেস্ট", 
    teacher: "ড. মাহমুদ হাসান",
    description: "অনুশীলনী",
    isFree: true, 
    statsText: "৬.৮ হাজার+" 
  },
  { 
    id: "cnt-6-science-matter-model", 
    topicId: "tp-6-science-matter", 
    type: "MODEL_TEST", 
    title: "পদার্থের অবস্থা মডেল টেস্ট", 
    teacher: "ড. মাহমুদ হাসান",
    description: "সময় নির্ধারিত",
    isFree: false, 
    startsAt: in1h, 
    statsText: "৭.৫ হাজার+" 
  },
  { 
    id: "cnt-6-science-matter-cq", 
    topicId: "tp-6-science-matter", 
    type: "CQ_EXAM", 
    title: "পদার্থের অবস্থা CQ পরীক্ষা", 
    teacher: "ড. মাহমুদ হাসান",
    description: "সৃজনশীল প্রশ্ন",
    isFree: false, 
    statsText: "৬.১ হাজার+" 
  },
  { 
    id: "cnt-6-science-matter-live-exam", 
    topicId: "tp-6-science-matter", 
    type: "LIVE_EXAM", 
    title: "পদার্থের অবস্থা লাইভ এক্সাম", 
    teacher: "ড. মাহমুদ হাসান",
    description: "লাইভ পরীক্ষা",
    isFree: false, 
    startsAt: in2h, 
    statsText: "৮.১ হাজার+" 
  },

  // ===== Class 7 Bangla Literature =====
  { 
    id: "cnt-7-bangla-literature-live", 
    topicId: "tp-7-bangla-literature", 
    type: "LIVE_CLASS", 
    title: "সাহিত্যের প্রকার - লাইভ ক্লাস", 
    teacher: "নাসির উদ্দিন",
    description: "কবিতা, গল্প, উপন্যাসের প্রকারভেদ",
    isFree: true, 
    startsAt: in1h, 
    statsText: "৫.৬ হাজার+" 
  },
  { 
    id: "cnt-7-bangla-literature-recorded", 
    topicId: "tp-7-bangla-literature", 
    type: "RECORDED_CLASS", 
    title: "সাহিত্য - রেকর্ডেড ক্লাস", 
    teacher: "নাসির উদ্দিন",
    description: "সাহিত্যের রীতি ও ধারার পাঠ",
    isFree: false, 
    durationSec: 2400, 
    statsText: "৯.২ হাজার+" 
  },
  { 
    id: "cnt-7-bangla-literature-animated", 
    topicId: "tp-7-bangla-literature", 
    type: "ANIMATED_VIDEO", 
    title: "সাহিত্য অ্যানিমেশন", 
    teacher: "নাসির উদ্দিন",
    description: "চিত্রসহ ব্যাখ্যা",
    isFree: true, 
    durationSec: 360, 
    statsText: "৭.৪ হাজার+" 
  },
  { 
    id: "cnt-7-bangla-literature-guideline", 
    topicId: "tp-7-bangla-literature", 
    type: "GUIDELINE_VIDEO", 
    title: "সাহিত্য শেখার গাইডলাইন", 
    teacher: "নাসির উদ্দিন",
    description: "দ্রুত শেখার টিপস",
    isFree: true, 
    durationSec: 300, 
    statsText: "৬.৩ হাজার+" 
  },
  { 
    id: "cnt-7-bangla-literature-story", 
    topicId: "tp-7-bangla-literature", 
    type: "STORY", 
    title: "সাহিত্যের গল্প", 
    teacher: "নাসির উদ্দিন",
    description: "সাহিত্যের ধারার গল্প",
    isFree: true, 
    durationSec: 300, 
    statsText: "৫.১ হাজার+" 
  },
  { 
    id: "cnt-7-bangla-literature-class-note", 
    topicId: "tp-7-bangla-literature", 
    type: "CLASS_NOTE", 
    title: "সাহিত্য ক্লাস নোট", 
    teacher: "নাসির উদ্দিন",
    description: "ক্লাস নোট",
    isFree: true, 
    statsText: "৮.১ হাজার+" 
  },
  { 
    id: "cnt-7-bangla-literature-smart", 
    topicId: "tp-7-bangla-literature", 
    type: "SMART_NOTE", 
    title: "সাহিত্য স্মার্ট নোট", 
    teacher: "নাসির উদ্দিন",
    description: "সারসংক্ষেপ",
    isFree: false, 
    statsText: "৮.৮ হাজার+" 
  },
  { 
    id: "cnt-7-bangla-literature-pdf", 
    topicId: "tp-7-bangla-literature", 
    type: "PDF_NOTES", 
    title: "সাহিত্য PDF নোট", 
    teacher: "নাসির উদ্দিন",
    description: "ডাউনলোডযোগ্য",
    isFree: true, 
    statsText: "৯.৪ হাজার+" 
  },
  { 
    id: "cnt-7-bangla-literature-quiz", 
    topicId: "tp-7-bangla-literature", 
    type: "QUIZ", 
    title: "সাহিত্য MCQ টেস্ট", 
    teacher: "নাসির উদ্দিন",
    description: "অনুশীলনী",
    isFree: true, 
    statsText: "৬.৯ হাজার+" 
  },
  { 
    id: "cnt-7-bangla-literature-model", 
    topicId: "tp-7-bangla-literature", 
    type: "MODEL_TEST", 
    title: "সাহিত্য মডেল টেস্ট", 
    teacher: "নাসির উদ্দিন",
    description: "সময় নির্ধারিত",
    isFree: false, 
    startsAt: in2h, 
    statsText: "৭.৭ হাজার+" 
  },
  { 
    id: "cnt-7-bangla-literature-cq", 
    topicId: "tp-7-bangla-literature", 
    type: "CQ_EXAM", 
    title: "সাহিত্য CQ পরীক্ষা", 
    teacher: "নাসির উদ্দিন",
    description: "সৃজনশীল প্রশ্ন",
    isFree: false, 
    statsText: "৭.১ হাজার+" 
  },
  { 
    id: "cnt-7-bangla-literature-live-exam", 
    topicId: "tp-7-bangla-literature", 
    type: "LIVE_EXAM", 
    title: "সাহিত্য লাইভ এক্সাম", 
    teacher: "নাসির উদ্দিন",
    description: "লাইভ পরীক্ষা",
    isFree: false, 
    startsAt: in1h, 
    statsText: "৮.০ হাজার+" 
  },

  // ===== Class 7 Math Equation =====
  { 
    id: "cnt-7-math-equation-live", 
    topicId: "tp-7-math-equation", 
    type: "LIVE_CLASS", 
    title: "রৈখিক সমীকরণ - লাইভ ক্লাস", 
    teacher: "রোকসানা পারভীন",
    description: "সমীকরণ সমাধানের কৌশল",
    isFree: true, 
    startsAt: in1h, 
    statsText: "৬.২ হাজার+" 
  },
  { 
    id: "cnt-7-math-equation-recorded", 
    topicId: "tp-7-math-equation", 
    type: "RECORDED_CLASS", 
    title: "রৈখিক সমীকরণ - রেকর্ডেড ক্লাস", 
    teacher: "রোকসানা পারভীন",
    description: "ধাপে ধাপে সমাধান",
    isFree: false, 
    durationSec: 2100, 
    statsText: "১০.১ হাজার+" 
  },
  { 
    id: "cnt-7-math-equation-animated", 
    topicId: "tp-7-math-equation", 
    type: "ANIMATED_VIDEO", 
    title: "রৈখিক সমীকরণ অ্যানিমেশন", 
    teacher: "রোকসানা পারভীন",
    description: "চিত্রসহ ব্যাখ্যা",
    isFree: true, 
    durationSec: 420, 
    statsText: "৯.৮ হাজার+" 
  },
  { 
    id: "cnt-7-math-equation-guideline", 
    topicId: "tp-7-math-equation", 
    type: "GUIDELINE_VIDEO", 
    title: "সমীকরণ শেখার গাইডলাইন", 
    teacher: "রোকসানা পারভীন",
    description: "দ্রুত শেখার টিপস",
    isFree: true, 
    durationSec: 300, 
    statsText: "৭.৪ হাজার+" 
  },
  { 
    id: "cnt-7-math-equation-story", 
    topicId: "tp-7-math-equation", 
    type: "STORY", 
    title: "সমীকরণের গল্প", 
    teacher: "রোকসানা পারভীন",
    description: "দৈনন্দিন জীবনে সমীকরণ",
    isFree: true, 
    durationSec: 300, 
    statsText: "৬.০ হাজার+" 
  },
  { 
    id: "cnt-7-math-equation-class-note", 
    topicId: "tp-7-math-equation", 
    type: "CLASS_NOTE", 
    title: "রৈখিক সমীকরণ ক্লাস নোট", 
    teacher: "রোকসানা পারভীন",
    description: "ক্লাস নোট",
    isFree: true, 
    statsText: "৮.৩ হাজার+" 
  },
  { 
    id: "cnt-7-math-equation-smart", 
    topicId: "tp-7-math-equation", 
    type: "SMART_NOTE", 
    title: "রৈখিক সমীকরণ স্মার্ট নোট", 
    teacher: "রোকসানা পারভীন",
    description: "সারসংক্ষেপ",
    isFree: false, 
    statsText: "৮.৯ হাজার+" 
  },
  { 
    id: "cnt-7-math-equation-pdf", 
    topicId: "tp-7-math-equation", 
    type: "PDF_NOTES", 
    title: "রৈখিক সমীকরণ PDF নোট", 
    teacher: "রোকসানা পারভীন",
    description: "ডাউনলোডযোগ্য",
    isFree: true, 
    statsText: "৯.৭ হাজার+" 
  },
  { 
    id: "cnt-7-math-equation-quiz", 
    topicId: "tp-7-math-equation", 
    type: "QUIZ", 
    title: "রৈখিক সমীকরণ MCQ টেস্ট", 
    teacher: "রোকসানা পারভীন",
    description: "অনুশীলনী",
    isFree: true, 
    statsText: "৬.৬ হাজার+" 
  },
  { 
    id: "cnt-7-math-equation-model", 
    topicId: "tp-7-math-equation", 
    type: "MODEL_TEST", 
    title: "রৈখিক সমীকরণ মডেল টেস্ট", 
    teacher: "রোকসানা পারভীন",
    description: "সময় নির্ধারিত",
    isFree: false, 
    startsAt: in2h, 
    statsText: "৭.৮ হাজার+" 
  },
  { 
    id: "cnt-7-math-equation-cq", 
    topicId: "tp-7-math-equation", 
    type: "CQ_EXAM", 
    title: "রৈখিক সমীকরণ CQ পরীক্ষা", 
    teacher: "রোকসানা পারভীন",
    description: "সৃজনশীল প্রশ্ন",
    isFree: false, 
    statsText: "৭.০ হাজার+" 
  },
  { 
    id: "cnt-7-math-equation-live-exam", 
    topicId: "tp-7-math-equation", 
    type: "LIVE_EXAM", 
    title: "রৈখিক সমীকরণ লাইভ এক্সাম", 
    teacher: "রোকসানা পারভীন",
    description: "লাইভ পরীক্ষা",
    isFree: false, 
    startsAt: in1h, 
    statsText: "৮.৫ হাজার+" 
  },
];

export const catalog = { classes, programs, phases, subjects, chapters, topics, contents };

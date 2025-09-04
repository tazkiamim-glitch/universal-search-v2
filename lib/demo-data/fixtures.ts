import type { ProgramCourse, Subject, Chapter, Topic, Content, Catalog } from "./types";

export const programCourses: ProgramCourse[] = [
  { id: "pc-9-2027", name: "Class 9 – Academic 2027" },
];

export const subjects: Subject[] = [
  // Bangla – paper aware
  {
    id: "sub-bn-1",
    programCourseId: "pc-9-2027",
    name: "বাংলা",
    paper: "১ম পত্র",
    tokens: ["বাংলা","bangla","১ম","প্রথম","1st","first","বাংলা ১ম","bangla 1st","বাংলা ১ম পত্র"],
  },
  {
    id: "sub-bn-2",
    programCourseId: "pc-9-2027",
    name: "বাংলা",
    paper: "২য় পত্র",
    tokens: ["বাংলা","bangla","২য়","দ্বিতীয়","2nd","second","বাংলা ২য়","bangla 2nd","বাংলা ২য় পত্র"],
  },
  // Others
  { id: "sub-math", programCourseId: "pc-9-2027", name: "গণিত", tokens: ["গণিত","math","algebra","বীজগণিত"] },
  { id: "sub-phy",  programCourseId: "pc-9-2027", name: "পদার্থবিজ্ঞান", tokens: ["পদার্থবিজ্ঞান","physics","নিউটন"] },
  { id: "sub-bio",  programCourseId: "pc-9-2027", name: "জীববিজ্ঞান", tokens: ["জীববিজ্ঞান","biology","photosynthesis","সালোকসংশ্লেষণ","আলোক"] },
];

export const chapters: Chapter[] = [
  // Bangla examples (so Subject/Chapter tabs can demo)
  { id: "ch-bn1-1", subjectId: "sub-bn-1", index: 1, name: "অধ্যায় ১: ব্যাকরণ পরিচিতি", tokens: ["ব্যাকরণ","grammar"] },
  { id: "ch-bn2-3", subjectId: "sub-bn-2", index: 3, name: "অধ্যায় ৩: প্রবন্ধ ও রচনা", tokens: ["প্রবন্ধ","রচনা","essay"] },

  // Math
  { id: "ch-math-7", subjectId: "sub-math", index: 7, name: "অধ্যায় ৭: বীজগণিতীয় রাশি (Algebraic Expressions)", tokens: ["algebra","বীজগণিত","রাশি"] },
  { id: "ch-math-9", subjectId: "sub-math", index: 9, name: "অধ্যায় ৯: দ্বিঘাত সমীকরণ", tokens: ["দ্বিঘাত","quadratic","equation"] },

  // Physics
  { id: "ch-phy-3", subjectId: "sub-phy", index: 3, name: "অধ্যায় ৩: গতি ও বল (Motion & Force)", tokens: ["motion","force","গতি","বল"] },
  { id: "ch-phy-5", subjectId: "sub-phy", index: 5, name: "অধ্যায় ৫: নিউটনের সূত্র", tokens: ["newton","laws","সূত্র"] },

  // Biology
  { id: "ch-bio-5", subjectId: "sub-bio", index: 5, name: "অধ্যায় ৫: আলোক সংশ্লেষণ (Photosynthesis)", tokens: ["photosynthesis","সালোকসংশ্লেষণ","আলোক"] },
  { id: "ch-bio-6", subjectId: "sub-bio", index: 6, name: "অধ্যায় ৬: শ্বসন", tokens: ["respiration","শ্বসন"] },
];

export const topics: Topic[] = [
  // Math
  { id: "tp-quad-roots", chapterId: "ch-math-9",  index: 1, name: "দ্বিঘাত সমীকরণের মূল (Quadratic Roots)", tokens: ["দ্বিঘাত","quadratic","roots"] },
  { id: "tp-alg-exp",   chapterId: "ch-math-7",  index: 2, name: "বীজগণিতীয় রাশির সরলীকরণ", tokens: ["algebra","simplify","রাশি"] },
  { id: "tp-all-in-one", chapterId: "ch-math-7", index: 9, name: "ডেমো: সব ধরনের কনটেন্ট (All-in-one)", tokens: ["demo","all","everything","সব","সকল","all in one"] },

  // Physics
  { id: "tp-newton-2",  chapterId: "ch-phy-5",   index: 1, name: "নিউটনের দ্বিতীয় সূত্র", tokens: ["newton","second","দ্বিতীয়"] },
  { id: "tp-motion",    chapterId: "ch-phy-3",   index: 2, name: "সমবেগ গতি", tokens: ["গতি","motion","uniform"] },

  // Biology
  { id: "tp-light",     chapterId: "ch-bio-5",   index: 1, name: "Light Reaction", tokens: ["light","reaction","আলোক"] },
  { id: "tp-dark",      chapterId: "ch-bio-5",   index: 2, name: "Dark Reaction",  tokens: ["dark","reaction"] },
  { id: "tp-bio-all",   chapterId: "ch-bio-5",   index: 9, name: "ডেমো: জীববিজ্ঞান — All-in-one", tokens: ["biology","জীববিজ্ঞান","all","demo","সব","all in one"] },

  // Bangla
  { id: "tp-grammar",   chapterId: "ch-bn1-1",   index: 1, name: "বাক্যের অঙ্গ", tokens: ["ব্যাকরণ","grammar","parts of speech"] },
  { id: "tp-essay",     chapterId: "ch-bn2-3",   index: 1, name: "প্রবন্ধ রচনার কৌশল", tokens: ["essay","প্রবন্ধ","রচনা"] },
];

const now = Date.now();
const in90m   = new Date(now + 90 * 60 * 1000).toISOString();
const in1day  = new Date(now + 24 * 60 * 60 * 1000).toISOString();
const ago2hr  = new Date(now - 2  * 60 * 60 * 1000).toISOString();

export const contents: Content[] = [
  // LIVE_CLASS
  { id: "cnt-live-newton",  topicId: "tp-newton-2", type: "LIVE_CLASS", title: "Live Q&A – Newton’s Second Law", isFree: true,  startsAt: in90m, teacher: "Mr. Rahim" },
  { id: "cnt-live-ps",      topicId: "tp-light",    type: "LIVE_CLASS", title: "Photosynthesis Q&A (Tonight 8:30PM)", isFree: true, startsAt: in1day, teacher: "Ms. Sumi" },
  { id: "cnt-live-all",     topicId: "tp-all-in-one", type: "LIVE_CLASS", title: "Live Class – All Content Types Overview", isFree: true, startsAt: in90m, teacher: "Mr. Rahim" },

  // LIVE_EXAM
  { id: "cnt-live-exam-phy", topicId: "tp-motion",   type: "LIVE_EXAM", title: "Live CQ Exam – Motion & Force", isFree: false, startsAt: in90m },
  { id: "cnt-live-exam-all", topicId: "tp-all-in-one", type: "LIVE_EXAM", title: "Live Exam – Demo Set", isFree: false, startsAt: in1day },

  // RECORDED_CLASS
  { id: "cnt-rec-newton",   topicId: "tp-newton-2", type: "RECORDED_CLASS", title: "Newton’s Laws — Full Class", isFree: false, durationSec: 3600, teacher: "Ms. Sumi", progressPct: 35 },
  { id: "cnt-rec-quad",     topicId: "tp-quad-roots", type: "RECORDED_CLASS", title: "Quadratic Roots — Step-by-step", isFree: true, durationSec: 2800 },
  { id: "cnt-rec-all",      topicId: "tp-all-in-one", type: "RECORDED_CLASS", title: "Recorded Class – All Types Walkthrough", isFree: false, durationSec: 2400, teacher: "Ms. Sumi", progressPct: 10 },

  // ANIMATED_VIDEO
  { id: "cnt-anim-ps",      topicId: "tp-light",    type: "ANIMATED_VIDEO", title: "Photosynthesis Explained (Animated)", isFree: true, durationSec: 600 },
  { id: "cnt-anim-alg",     topicId: "tp-alg-exp",  type: "ANIMATED_VIDEO", title: "Algebra Basics (বাংলায়)", isFree: true, durationSec: 720 },
  { id: "cnt-anim-all",     topicId: "tp-all-in-one", type: "ANIMATED_VIDEO", title: "Animated – Concept Sampler", isFree: true, durationSec: 540 },
  { id: "cnt-anim-bio-all", topicId: "tp-bio-all",   type: "ANIMATED_VIDEO", title: "Animated – Cell Basics (Biology)", isFree: true, durationSec: 660 },

  // STORY (shorts/motivation)
  { id: "cnt-story-study",  topicId: "tp-grammar",  type: "STORY", title: "2-minute Study Hack for Exams", isFree: true, durationSec: 120 },
  { id: "cnt-story-all",    topicId: "tp-all-in-one", type: "STORY", title: "Story – How to Use This Course", isFree: true, durationSec: 90 },
  { id: "cnt-story-bio-all",topicId: "tp-bio-all",   type: "STORY", title: "Story – Why Photosynthesis Matters", isFree: true, durationSec: 100 },

  // GUIDELINE_VIDEO
  { id: "cnt-guide-ssc",    topicId: "tp-essay",    type: "GUIDELINE_VIDEO", title: "SSC Exam Writing Tips — বাংলা", isFree: true, durationSec: 480 },
  { id: "cnt-guide-all",    topicId: "tp-all-in-one", type: "GUIDELINE_VIDEO", title: "Guideline – Picking the Right Resource", isFree: true, durationSec: 300 },
  { id: "cnt-guide-bio-all",topicId: "tp-bio-all",   type: "GUIDELINE_VIDEO", title: "Guideline – How to Study Biology", isFree: true, durationSec: 420 },

  // NOTES
  { id: "cnt-smart-alg",    topicId: "tp-alg-exp",  type: "SMART_NOTE",  title: "Algebraic Expressions — Smart Notes", isFree: false },
  { id: "cnt-class-quad",   topicId: "tp-quad-roots", type: "CLASS_NOTE", title: "Class Notes — Quadratic Roots", isFree: true },
  { id: "cnt-pdf-ps",       topicId: "tp-dark",     type: "PDF_NOTES",   title: "Photosynthesis Summary (PDF)", isFree: true },
  { id: "cnt-smart-all",    topicId: "tp-all-in-one", type: "SMART_NOTE",  title: "Smart Note – All Types Index", isFree: false },
  { id: "cnt-class-all",    topicId: "tp-all-in-one", type: "CLASS_NOTE", title: "Class Note – Demo Overview", isFree: true },
  { id: "cnt-pdf-all",      topicId: "tp-all-in-one", type: "PDF_NOTES",   title: "PDF – All Types Cheat Sheet", isFree: true },
  { id: "cnt-smart-bio-all",topicId: "tp-bio-all",   type: "SMART_NOTE",  title: "Smart Note – Biology Key Diagrams", isFree: false },
  { id: "cnt-class-bio-all",topicId: "tp-bio-all",   type: "CLASS_NOTE", title: "Class Note – Photosynthesis Overview", isFree: true },
  { id: "cnt-pdf-bio-all",  topicId: "tp-bio-all",   type: "PDF_NOTES",   title: "PDF – Biology Formula Sheet", isFree: true },

  // TESTS
  { id: "cnt-mcq-quad",     topicId: "tp-quad-roots", type: "MCQ", title: "MCQ Practice — Quadratic Roots (20Q · 30m)", isFree: true },
  { id: "cnt-cq-newton",    topicId: "tp-newton-2",   type: "CQ",  title: "CQ Exam — Newton’s Laws (30m)", isFree: false, startsAt: ago2hr },
  { id: "cnt-model-bio",    topicId: "tp-light",      type: "MODEL_TEST", title: "Admission Biology Model Test — 01 (Full)", isFree: false },
  { id: "cnt-mcq-all",      topicId: "tp-all-in-one", type: "MCQ", title: "MCQ – All Types Sampler (10Q · 15m)", isFree: true },
  { id: "cnt-cq-all",       topicId: "tp-all-in-one", type: "CQ",  title: "CQ – Mixed Structures (20m)", isFree: false },
  { id: "cnt-model-all",    topicId: "tp-all-in-one", type: "MODEL_TEST", title: "Model Test – Comprehensive Demo", isFree: false },
  { id: "cnt-mcq-bio-all",  topicId: "tp-bio-all",   type: "MCQ", title: "MCQ – Biology Basics (15Q · 20m)", isFree: true },
  { id: "cnt-cq-bio-all",   topicId: "tp-bio-all",   type: "CQ",  title: "CQ – Plant Physiology (30m)", isFree: false },
  { id: "cnt-model-bio-all",topicId: "tp-bio-all",   type: "MODEL_TEST", title: "Model Test – Biology Full Demo", isFree: false },

  // HOMEWORK (asynchronous)
  { id: "cnt-hw-ps",        topicId: "tp-dark",       type: "HOMEWORK", title: "Homework Set — Photosynthesis", isFree: true },
  { id: "cnt-hw-all",       topicId: "tp-all-in-one", type: "HOMEWORK", title: "Homework – All Types Practice", isFree: true },
  { id: "cnt-hw-bio-all",   topicId: "tp-bio-all",    type: "HOMEWORK", title: "Homework – Biology Labeling Practice", isFree: true },
  
  // Biology all-in-one live/recorded/exam
  { id: "cnt-live-bio-all",     topicId: "tp-bio-all", type: "LIVE_CLASS", title: "Live Class – Biology All-in-one", isFree: true, startsAt: in90m, teacher: "Dr. Khan" },
  { id: "cnt-live-exam-bio-all",topicId: "tp-bio-all", type: "LIVE_EXAM", title: "Live Exam – Biology Mix", isFree: false, startsAt: in1day },
  { id: "cnt-rec-bio-all",      topicId: "tp-bio-all", type: "RECORDED_CLASS", title: "Recorded Class – Biology Overview", isFree: false, durationSec: 2700, teacher: "Dr. Khan", progressPct: 60 },
];

export const catalog: Catalog = { programCourses, subjects, chapters, topics, contents };



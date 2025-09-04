import { Chapter, Content, ContentType, Subject, Topic } from "./types";

export const subjects: Subject[] = [
  {
    id: "sub-bn-1",
    name: "বাংলা",
    paper: "১ম পত্র",
    tokens: [
      "বাংলা","bangla",
      "১ম","1ম","প্রথম","1st","first",
      "পত্র",
      "বাংলা ১ম","bangla 1st","বাংলা ১ম পত্র"
    ],
  },
  {
    id: "sub-bn-2",
    name: "বাংলা",
    paper: "২য় পত্র",
    tokens: [
      "বাংলা","bangla",
      "২য়","2য়","দ্বিতীয়","2nd","second",
      "পত্র",
      "বাংলা ২য়","bangla 2nd","বাংলা ২য় পত্র"
    ],
  },
  { id: "sub-bio", name: "জীববিজ্ঞান", tokens: ["জীববিজ্ঞান", "biology"] },
  { id: "sub-math", name: "গণিত", tokens: ["গণিত", "math", "algebra", "বীজগণিত"] },
  { id: "sub-phy", name: "পদার্থবিজ্ঞান", tokens: ["পদার্থবিজ্ঞান", "physics"] },
];

export const chapters: Chapter[] = [
  { id: "ch-bio-5", subjectId: "sub-bio", index: 5, name: "অধ্যায় ৫: আলোক সংশ্লেষণ", tokens: ["photosynthesis", "সালোকসংশ্লেষণ", "আলোক"] },
  { id: "ch-phy-3", subjectId: "sub-phy", index: 3, name: "অধ্যায় ৩: গতি ও বল", tokens: ["motion", "force", "গতি", "বল"] },
  { id: "ch-math-7", subjectId: "sub-math", index: 7, name: "অধ্যায় ৭: বীজগণিতীয় রাশি", tokens: ["algebra", "বীজগণিত", "রাশি"] },
  { id: "ch-bn1-1", subjectId: "sub-bn-1", index: 1, name: "অধ্যায় ১: ব্যাকরণ পরিচিতি", tokens: ["ব্যাকরণ", "grammar"] },
];

export const topics: Topic[] = [
  { id: "tp-light", chapterId: "ch-bio-5", index: 1, name: "Light Reaction", tokens: ["light", "reaction", "আলোক"] },
  { id: "tp-newton2", chapterId: "ch-phy-3", index: 2, name: "নিউটনের দ্বিতীয় গতি-সুত্র", tokens: ["newton", "দ্বিতীয়", "গতি"] },
  { id: "tp-quad-roots", chapterId: "ch-math-7", index: 3, name: "দ্বিঘাত সমীকরণের মূল", tokens: ["quadratic", "roots", "দ্বিঘাত"] },
  { id: "tp-bio-all", chapterId: "ch-bio-5", index: 9, name: "Biology All-in-one Demo", tokens: ["biology", "জীববিজ্ঞান", "all", "demo"] },
  { id: "tp-bn-grammar", chapterId: "ch-bn1-1", index: 1, name: "বাক্যের অঙ্গ", tokens: ["ব্যাকরণ", "grammar"] },
];

const now = Date.now();
const in1h = new Date(now + 60 * 60 * 1000).toISOString();
const ago1h = new Date(now - 60 * 60 * 1000).toISOString();

export const contents: Content[] = [
  { id: "cnt-live-ps", topicId: "tp-light", type: "LIVE_CLASS", title: "Photosynthesis Q&A (আজ ৮:৩০pm)", isFree: true, startsAt: in1h, statsText: "১২.৫ হাজার+" },
  { id: "cnt-model-bio", topicId: "tp-light", type: "MODEL_TEST", title: "Admission Biology Model Test – 01", isFree: false, startsAt: ago1h },
  { id: "cnt-anim-ps", topicId: "tp-light", type: "ANIMATED_VIDEO", title: "Photosynthesis—মূল ধারণা", isFree: true, durationSec: 480, statsText: "৫.২ হাজার+" },
  { id: "cnt-rec-ps", topicId: "tp-light", type: "RECORDED_CLASS", title: "Photosynthesis—Full Recorded Class", isFree: false, durationSec: 2100 },
  { id: "cnt-pdf-ps", topicId: "tp-light", type: "PDF_NOTES", title: "Photosynthesis Summary Notes (PDF)", isFree: true },
  { id: "cnt-hw-ps", topicId: "tp-light", type: "HOMEWORK", title: "Photosynthesis—Homework Set", isFree: true },

  { id: "cnt-rec-newton", topicId: "tp-newton2", type: "RECORDED_CLASS", title: "Newton’s Laws—Full Class", isFree: false, durationSec: 2400 },
  { id: "cnt-cq-phy", topicId: "tp-newton2", type: "CQ_EXAM", title: "CQ Exam—Newton", isFree: false, startsAt: ago1h },
  { id: "cnt-live-newton", topicId: "tp-newton2", type: "LIVE_CLASS", title: "Live Q&A—Newton’s Second Law", isFree: true, startsAt: in1h },
  { id: "cnt-pdf-newton", topicId: "tp-newton2", type: "PDF_NOTES", title: "Newton’s Laws—Summary PDF", isFree: true },
  { id: "cnt-model-newton", topicId: "tp-newton2", type: "MODEL_TEST", title: "Model Test—Newton Focus", isFree: false, startsAt: in1h },

  { id: "cnt-quiz-quad", topicId: "tp-quad-roots", type: "QUIZ", title: "MCQ Practice—Quadratic Roots", isFree: true },
  { id: "cnt-smart-alg", topicId: "tp-quad-roots", type: "SMART_NOTE", title: "Algebraic Expressions—Smart Notes", isFree: false },
  { id: "cnt-rec-quad", topicId: "tp-quad-roots", type: "RECORDED_CLASS", title: "Quadratic Roots—Step-by-step", isFree: true, durationSec: 1800 },
  { id: "cnt-pdf-quad", topicId: "tp-quad-roots", type: "PDF_NOTES", title: "Quadratic Roots—Summary PDF", isFree: true },
  { id: "cnt-anim-alg", topicId: "tp-quad-roots", type: "ANIMATED_VIDEO", title: "Algebra Basics (বাংলায়)", isFree: true, durationSec: 600 },
  
  // Biology all-in-one: one item per type so 'biology all' returns something in every tab
  { id: "cnt-live-bio-all", topicId: "tp-bio-all", type: "LIVE_CLASS", title: "Live Class – Biology All-in-one", isFree: true, startsAt: in1h },
  { id: "cnt-live-exam-bio-all", topicId: "tp-bio-all", type: "LIVE_EXAM", title: "Live Exam – Biology Mix", isFree: false, startsAt: in1h },
  { id: "cnt-model-bio-all", topicId: "tp-bio-all", type: "MODEL_TEST", title: "Model Test – Biology Full Demo", isFree: false, startsAt: in1h },
  { id: "cnt-cq-bio-all", topicId: "tp-bio-all", type: "CQ_EXAM", title: "CQ Exam – Plant Physiology (30m)", isFree: false, startsAt: in1h },
  { id: "cnt-anim-bio-all", topicId: "tp-bio-all", type: "ANIMATED_VIDEO", title: "Biology Animated Sampler", isFree: true, durationSec: 660 },
  { id: "cnt-rec-bio-all", topicId: "tp-bio-all", type: "RECORDED_CLASS", title: "Recorded Class – Biology Overview", isFree: false, durationSec: 2700 },
  { id: "cnt-pdf-bio-all", topicId: "tp-bio-all", type: "PDF_NOTES", title: "Biology PDF Summary", isFree: true },
  { id: "cnt-smart-bio-all", topicId: "tp-bio-all", type: "SMART_NOTE", title: "Biology Smart Notes Index", isFree: false },
  { id: "cnt-quiz-bio-all", topicId: "tp-bio-all", type: "QUIZ", title: "Biology Quiz Sampler (15Q · 20m)", isFree: true },
  { id: "cnt-hw-bio-all", topicId: "tp-bio-all", type: "HOMEWORK", title: "Homework – Biology Labeling Practice", isFree: true },

  // Bangla ১ম পত্র demo contents
  { id: "cnt-story-bn-grammar", topicId: "tp-bn-grammar", type: "STORY", title: "2-minute Study Hack — বাংলা", isFree: true, durationSec: 120 },
  { id: "cnt-guide-bn-ssc", topicId: "tp-bn-grammar", type: "GUIDELINE_VIDEO", title: "SSC Exam Writing Tips — বাংলা", isFree: true, durationSec: 420 },
  { id: "cnt-pdf-bn-grammar", topicId: "tp-bn-grammar", type: "PDF_NOTES", title: "বাংলা ব্যাকরণ নোট (PDF)", isFree: true },
  { id: "cnt-live-bn-grammar", topicId: "tp-bn-grammar", type: "LIVE_CLASS", title: "Live Class — বাংলা ব্যাকরণ Q&A", isFree: true, startsAt: in1h },
];

export const catalog = { subjects, chapters, topics, contents };



import { Chapter, Content, ContentType, Subject, Topic } from "./types";
import { normalize } from "./normalize";

export const subjects: Subject[] = [
  { id: "sub-bn-1", name: "বাংলা", paper: "১ম পত্র", tokens: ["বাংলা", "bangla"] },
  { id: "sub-bn-2", name: "বাংলা", paper: "২য় পত্র", tokens: ["বাংলা", "bangla"] },
  { id: "sub-bio", name: "জীববিজ্ঞান", tokens: ["জীববিজ্ঞান", "biology"] },
  { id: "sub-math", name: "গণিত", tokens: ["গণিত", "math", "algebra", "বীজগণিত"] },
  { id: "sub-phy", name: "পদার্থবিজ্ঞান", tokens: ["পদার্থবিজ্ঞান", "physics"] },
];

export const chapters: Chapter[] = [
  { id: "ch-bio-5", subjectId: "sub-bio", index: 5, name: "অধ্যায় ৫: আলোক সংশ্লেষণ (Photosynthesis)", tokens: ["photosynthesis", "সালোকসংশ্লেষণ", "আলোক"] },
  { id: "ch-phy-3", subjectId: "sub-phy", index: 3, name: "অধ্যায় ৩: গতি ও বল (Motion & Force)", tokens: ["motion", "force", "গতি", "বল"] },
  { id: "ch-math-7", subjectId: "sub-math", index: 7, name: "অধ্যায় ৭: বীজগণিতীয় রাশি (Algebraic Expressions)", tokens: ["algebra", "বীজগণিত", "রাশি"] },
];

export const topics: Topic[] = [
  { id: "tp-light", chapterId: "ch-bio-5", index: 1, name: "Light Reaction", tokens: ["light", "reaction", "আলোক"] },
  { id: "tp-newton2", chapterId: "ch-phy-3", index: 2, name: "নিউটনের দ্বিতীয় গতি-সুত্র", tokens: ["newton", "দ্বিতীয়", "গতি"] },
  { id: "tp-quad-roots", chapterId: "ch-math-7", index: 3, name: "দ্বিঘাত সমীকরণের মূল", tokens: ["quadratic", "roots", "দ্বিঘাত"] },
  { id: "tp-bio-all", chapterId: "ch-bio-5", index: 99, name: "Biology All-in-one Demo", tokens: ["biology", "জীববিজ্ঞান", "all", "demo"] },
];

const now = Date.now();
const in1h = new Date(now + 60 * 60 * 1000).toISOString();
const ago1h = new Date(now - 60 * 60 * 1000).toISOString();

export const contents: Content[] = [
  { id: "cnt-live-ps", topicId: "tp-light", type: "LIVE_CLASS", title: "Photosynthesis Q&A (Tonight 8:30pm)", isFree: true, startsAt: in1h },
  { id: "cnt-model-bio", topicId: "tp-light", type: "MODEL_TEST", title: "Admission Biology Model Test – 01", isFree: false, startsAt: ago1h },
  { id: "cnt-anim-alg", topicId: "tp-quad-roots", type: "ANIMATED_VIDEO", title: "Algebra Basics (Bengali)", isFree: true, durationSec: 720 },
  { id: "cnt-rec-newton", topicId: "tp-newton2", type: "RECORDED_CLASS", title: "Newton’s Laws – Full Class", isFree: false, durationSec: 3600 },
  { id: "cnt-pdf-ps", topicId: "tp-light", type: "PDF_NOTES", title: "Photosynthesis Summary Notes (PDF)", isFree: true },
  { id: "cnt-quiz-quad", topicId: "tp-quad-roots", type: "QUIZ", title: "MCQ Practice – Quadratic Roots", isFree: true },
  { id: "cnt-smart-alg", topicId: "tp-quad-roots", type: "SMART_NOTE", title: "Algebraic Expressions – Smart Notes", isFree: false },
  { id: "cnt-hw-ps", topicId: "tp-light", type: "HOMEWORK", title: "Homework Set – Photosynthesis", isFree: true },

  // Biology all-in-one: one item for every supported content type
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
];

export const catalog = { subjects, chapters, topics, contents };



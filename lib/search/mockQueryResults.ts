import { Content } from "./types";

export type SearchResultItem = Content;

const now = Date.now();
const in30m = new Date(now + 30 * 60 * 1000).toISOString();

export const mockQueryResults = new Map<string, SearchResultItem[]>([
  [
    "Photosynthesis",
    [
      {
        id: "q-ps-anim-1",
        topicId: "tp-photosynthesis",
        type: "ANIMATED_VIDEO",
        title: "Photosynthesis Explained",
        isFree: true,
        durationSec: 540,
      },
      {
        id: "q-ps-anim-2",
        topicId: "tp-photosynthesis",
        type: "ANIMATED_VIDEO",
        title: "The Calvin Cycle",
        isFree: true,
        durationSec: 600,
      },
      {
        id: "q-ps-pdf-1",
        topicId: "tp-photosynthesis",
        type: "PDF_NOTES",
        title: "Photosynthesis Summary Notes",
        isFree: true,
      },
    ],
  ],
  [
    "Quadratic Roots",
    [
      {
        id: "q-qr-rec-1",
        topicId: "tp-quadratic-roots",
        type: "RECORDED_CLASS",
        title: "Mastering Quadratic Equations",
        isFree: false,
        durationSec: 2400,
      },
      {
        id: "q-qr-quiz-1",
        topicId: "tp-quadratic-roots",
        type: "QUIZ",
        title: "Quiz: Finding Roots",
        isFree: true,
      },
      {
        id: "q-qr-quiz-2",
        topicId: "tp-quadratic-roots",
        type: "QUIZ",
        title: "Quiz: The Discriminant",
        isFree: true,
      },
      {
        id: "q-qr-quiz-3",
        topicId: "tp-quadratic-roots",
        type: "QUIZ",
        title: "Quiz: Word Problems",
        isFree: true,
      },
    ],
  ],
  [
    "নিউটের গতি-সূত্র",
    [
      {
        id: "q-newton-live-1",
        topicId: "tp-newton-laws",
        type: "LIVE_CLASS",
        title: "Live Problem Solving: Newton's Laws",
        isFree: true,
        startsAt: in30m,
      },
      {
        id: "q-newton-smart-1",
        topicId: "tp-newton-laws",
        type: "SMART_NOTE",
        title: "Smart Notes: First Law",
        isFree: false,
      },
      {
        id: "q-newton-smart-2",
        topicId: "tp-newton-laws",
        type: "SMART_NOTE",
        title: "Smart Notes: F=ma",
        isFree: false,
      },
    ],
  ],
  // Support the variant used in trending seeds as well
  [
    "নিউটনের গতি-সূত্র",
    [
      {
        id: "q-newton-live-1b",
        topicId: "tp-newton-laws",
        type: "LIVE_CLASS",
        title: "Live Problem Solving: Newton's Laws",
        isFree: true,
        startsAt: in30m,
      },
      {
        id: "q-newton-smart-1b",
        topicId: "tp-newton-laws",
        type: "SMART_NOTE",
        title: "Smart Notes: First Law",
        isFree: false,
      },
      {
        id: "q-newton-smart-2b",
        topicId: "tp-newton-laws",
        type: "SMART_NOTE",
        title: "Smart Notes: F=ma",
        isFree: false,
      },
    ],
  ],
  [
    "বাংলা ১ম পত্র",
    [
      {
        id: "q-bn1-pdf-1",
        topicId: "tp-bangla-paper1",
        type: "PDF_NOTES",
        title: "Poem Analysis PDF",
        isFree: true,
      },
      {
        id: "q-bn1-pdf-2",
        topicId: "tp-bangla-paper1",
        type: "PDF_NOTES",
        title: "Short Story Summary PDF",
        isFree: true,
      },
      {
        id: "q-bn1-pdf-3",
        topicId: "tp-bangla-paper1",
        type: "PDF_NOTES",
        title: "Grammar Quick Reference PDF",
        isFree: true,
      },
      {
        id: "q-bn1-pdf-4",
        topicId: "tp-bangla-paper1",
        type: "PDF_NOTES",
        title: "Essay Writing Tips PDF",
        isFree: true,
      },
    ],
  ],
  [
    "Algebra",
    [
      {
        id: "q-alg-rec-1",
        topicId: "tp-algebra",
        type: "RECORDED_CLASS",
        title: "Algebra Basics",
        isFree: true,
        durationSec: 1800,
      },
      {
        id: "q-alg-rec-2",
        topicId: "tp-algebra",
        type: "RECORDED_CLASS",
        title: "Advanced Algebra Techniques",
        isFree: false,
        durationSec: 2100,
      },
      {
        id: "q-alg-cq-1",
        topicId: "tp-algebra",
        type: "CQ_EXAM",
        title: "CQ Exam - Polynomials",
        isFree: false,
      },
    ],
  ],

  // Subject Preview → Biology
  [
    "Biology Key Concepts",
    [
      { id: "q-bio-kc-anim-1", topicId: "tp-bio-all", type: "ANIMATED_VIDEO", title: "Biology Concepts Overview", isFree: true, durationSec: 540 },
      { id: "q-bio-kc-pdf-1", topicId: "tp-bio-all", type: "PDF_NOTES", title: "Key Concepts – Biology (PDF)", isFree: true },
      { id: "q-bio-kc-quiz-1", topicId: "tp-bio-all", type: "QUIZ", title: "Quiz – Biology Fundamentals", isFree: true },
      // Premium Biology Key Concepts Content
      { id: "q-bio-kc-prem-rec-1", topicId: "tp-bio-all", type: "RECORDED_CLASS", title: "Advanced Biology Key Concepts Masterclass", isFree: false, durationSec: 3600 },
      { id: "q-bio-kc-prem-smart-1", topicId: "tp-bio-all", type: "SMART_NOTE", title: "Biology Key Concepts - Smart Notes Pro", isFree: false },
      { id: "q-bio-kc-prem-model-1", topicId: "tp-bio-all", type: "MODEL_TEST", title: "Model Test - Biology Key Concepts (Premium)", isFree: false },
      { id: "q-bio-kc-prem-live-1", topicId: "tp-bio-all", type: "LIVE_CLASS", title: "Live Class - Biology Key Concepts Deep Dive", isFree: false, startsAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString() },
      { id: "q-bio-kc-prem-cq-1", topicId: "tp-bio-all", type: "CQ_EXAM", title: "CQ Exam - Biology Key Concepts (45m)", isFree: false },
      { id: "q-bio-kc-prem-guideline-1", topicId: "tp-bio-all", type: "GUIDELINE_VIDEO", title: "Biology Key Concepts - Step by Step Guide", isFree: false, durationSec: 1800 },
    ],
  ],
  [
    "Biology Problem Solving",
    [
      { id: "q-bio-ps-rec-1", topicId: "tp-bio-all", type: "RECORDED_CLASS", title: "Biology Problem Solving Session", isFree: true, durationSec: 1800 },
      { id: "q-bio-ps-smart-1", topicId: "tp-bio-all", type: "SMART_NOTE", title: "Problem Solving Tactics – Biology", isFree: false },
      { id: "q-bio-ps-model-1", topicId: "tp-bio-all", type: "MODEL_TEST", title: "Model Test – Biology Mixed", isFree: false },
    ],
  ],
  [
    "Biology Past Papers",
    [
      { id: "q-bio-pp-pdf-1", topicId: "tp-bio-all", type: "PDF_NOTES", title: "Biology Past Paper Set (PDF)", isFree: true },
      { id: "q-bio-pp-live-1", topicId: "tp-bio-all", type: "LIVE_CLASS", title: "Live Review – Past Paper Discussion", isFree: true, startsAt: in30m },
    ],
  ],
  [
    "Photosynthesis - Chapter 1",
    [
      { id: "q-bio-ph1-anim-1", topicId: "tp-light", type: "ANIMATED_VIDEO", title: "Photosynthesis – Light Reaction", isFree: true, durationSec: 600 },
      { id: "q-bio-ph1-rec-1", topicId: "tp-light", type: "RECORDED_CLASS", title: "Chapter 1 – Photosynthesis Full Class", isFree: false, durationSec: 2100 },
      { id: "q-bio-ph1-pdf-1", topicId: "tp-light", type: "PDF_NOTES", title: "Photosynthesis Summary (PDF)", isFree: true },
    ],
  ],
  [
    "Biology - Important Formulas",
    [
      { id: "q-bio-formula-pdf-1", topicId: "tp-bio-all", type: "PDF_NOTES", title: "Important Biology Formulas (PDF)", isFree: true },
      { id: "q-bio-formula-smart-1", topicId: "tp-bio-all", type: "SMART_NOTE", title: "Formula Sheet – Biology", isFree: false },
    ],
  ],
  [
    "Biology - Past Q",
    [
      { id: "q-bio-pastq-quiz-1", topicId: "tp-bio-all", type: "QUIZ", title: "Past Questions – Biology (15Q)", isFree: true },
      { id: "q-bio-pastq-rec-1", topicId: "tp-bio-all", type: "RECORDED_CLASS", title: "Past Questions – Solution Class", isFree: false, durationSec: 1900 },
    ],
  ],

  // Subject Preview → Math
  [
    "Algebra Fundamentals",
    [
      { id: "q-math-af-rec-1", topicId: "tp-quad-roots", type: "RECORDED_CLASS", title: "Algebra Fundamentals – Basics", isFree: true, durationSec: 1600 },
      { id: "q-math-af-quiz-1", topicId: "tp-quad-roots", type: "QUIZ", title: "Practice MCQ – Algebra", isFree: true },
    ],
  ],
  [
    "Geometry Theorems",
    [
      { id: "q-math-geo-pdf-1", topicId: "tp-quad-roots", type: "PDF_NOTES", title: "Geometry Theorems – Notes", isFree: true },
      { id: "q-math-geo-rec-1", topicId: "tp-quad-roots", type: "RECORDED_CLASS", title: "Important Theorems Explained", isFree: false, durationSec: 2000 },
    ],
  ],
  [
    "Calculus Basics",
    [
      { id: "q-math-cal-anim-1", topicId: "tp-quad-roots", type: "ANIMATED_VIDEO", title: "Calculus Basics – Intro", isFree: true, durationSec: 540 },
    ],
  ],
  [
    "Quadratic Equations",
    [
      { id: "q-math-quad-quiz-1", topicId: "tp-quad-roots", type: "QUIZ", title: "MCQ – Quadratic Equations", isFree: true },
      { id: "q-math-quad-rec-1", topicId: "tp-quad-roots", type: "RECORDED_CLASS", title: "Mastering Quadratics", isFree: false, durationSec: 2100 },
    ],
  ],
  [
    "Circle Properties",
    [
      { id: "q-math-circle-pdf-1", topicId: "tp-quad-roots", type: "PDF_NOTES", title: "Circle Properties – Summary", isFree: true },
    ],
  ],
  [
    "Differentiation Rules",
    [
      { id: "q-math-diff-smart-1", topicId: "tp-quad-roots", type: "SMART_NOTE", title: "Differentiation Rules – Smart Notes", isFree: false },
    ],
  ],

  // Subject Preview → Physics
  [
    "Mechanics",
    [
      { id: "q-phy-mech-rec-1", topicId: "tp-newton2", type: "RECORDED_CLASS", title: "Mechanics – Fundamentals", isFree: true, durationSec: 1800 },
    ],
  ],
  [
    "Optics",
    [
      { id: "q-phy-opt-anim-1", topicId: "tp-newton2", type: "ANIMATED_VIDEO", title: "Optics – Basics", isFree: true, durationSec: 500 },
    ],
  ],
  [
    "Electromagnetism",
    [
      { id: "q-phy-em-quiz-1", topicId: "tp-newton2", type: "QUIZ", title: "Practice – Electromagnetism", isFree: true },
    ],
  ],
  [
    "Newton's Laws",
    [
      { id: "q-phy-newton-live-2", topicId: "tp-newton2", type: "LIVE_CLASS", title: "Newton's Laws – Live Q&A", isFree: true, startsAt: in30m },
      { id: "q-phy-newton-pdf-1", topicId: "tp-newton2", type: "PDF_NOTES", title: "Newton's Laws – Summary PDF", isFree: true },
    ],
  ],
  [
    "Laws of Refraction",
    [
      { id: "q-phy-refraction-rec-1", topicId: "tp-newton2", type: "RECORDED_CLASS", title: "Laws of Refraction – Class", isFree: false, durationSec: 1950 },
    ],
  ],
  [
    "Ohm's Law",
    [
      { id: "q-phy-ohm-quiz-1", topicId: "tp-newton2", type: "QUIZ", title: "Ohm's Law – Practice MCQ", isFree: true },
    ],
  ],

  // Subject Preview → Bangla
  [
    "বাংলা ২য় পত্র",
    [
      { id: "q-bn2-pdf-1", topicId: "tp-bn-grammar", type: "PDF_NOTES", title: "বাংলা ২য় পত্র – নোট", isFree: true },
    ],
  ],
  [
    "কবিতা বিশ্লেষণ",
    [
      { id: "q-bn-kobita-story-1", topicId: "tp-bn-grammar", type: "STORY", title: "কবিতা বিশ্লেষণ – 2 মিনিট টিপস", isFree: true, durationSec: 120 },
    ],
  ],
  [
    "ব্যাকরণ",
    [
      { id: "q-bn-grammar-live-1", topicId: "tp-bn-grammar", type: "LIVE_CLASS", title: "ব্যাকরণ – Live Q&A", isFree: true, startsAt: in30m },
    ],
  ],
  [
    "রচনা",
    [
      { id: "q-bn-essay-pdf-1", topicId: "tp-bn-grammar", type: "PDF_NOTES", title: "রচনা – দ্রুত নির্দেশিকা", isFree: true },
    ],
  ],

  // Subject Preview → English (mapped to existing topics for demo)
  [
    "Grammar Rules",
    [
      { id: "q-en-grammar-smart-1", topicId: "tp-bio-all", type: "SMART_NOTE", title: "English Grammar – Rules Digest", isFree: false },
      { id: "q-en-grammar-pdf-1", topicId: "tp-bio-all", type: "PDF_NOTES", title: "Grammar Rules – Quick PDF", isFree: true },
    ],
  ],
  [
    "Literature Analysis",
    [
      { id: "q-en-lit-rec-1", topicId: "tp-bio-all", type: "RECORDED_CLASS", title: "Literature Analysis – Techniques", isFree: true, durationSec: 1500 },
    ],
  ],
  [
    "Vocabulary Building",
    [
      { id: "q-en-vocab-quiz-1", topicId: "tp-bio-all", type: "QUIZ", title: "Vocabulary Builder – 15Q", isFree: true },
    ],
  ],
  [
    "Tense",
    [
      { id: "q-en-tense-pdf-1", topicId: "tp-bio-all", type: "PDF_NOTES", title: "English Tense – Quick Guide", isFree: true },
    ],
  ],
  [
    "Voice Change",
    [
      { id: "q-en-voice-quiz-1", topicId: "tp-bio-all", type: "QUIZ", title: "Voice Change – Practice", isFree: true },
    ],
  ],
  [
    "Narration Practice",
    [
      { id: "q-en-narration-rec-1", topicId: "tp-bio-all", type: "RECORDED_CLASS", title: "Narration – Practice Session", isFree: false, durationSec: 1800 },
    ],
  ],
]);



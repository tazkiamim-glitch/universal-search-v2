"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mic, Search, Clock, Home, BookOpen, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
 

const rotatingPlaceholders = [
  "Photosynthesis",
  "Algebra",
  "English Grammar",
  "Newton's Laws",
  "বাংলা ব্যাকরণ",
]

const subjects = [
  { key: "biology", label: "📗 Biology", color: "bg-emerald-50 text-emerald-700 ring-emerald-100" },
  { key: "math", label: "🔢 Math", color: "bg-indigo-50 text-indigo-700 ring-indigo-100" },
  { key: "physics", label: "⚡ Physics", color: "bg-amber-50 text-amber-700 ring-amber-100" },
  { key: "chemistry", label: "🧪 Chemistry", color: "bg-blue-50 text-blue-700 ring-blue-100" },
  { key: "bangla", label: "✍️ Bangla", color: "bg-rose-50 text-rose-700 ring-rose-100" },
  { key: "english", label: "🗣 English", color: "bg-sky-50 text-sky-700 ring-sky-100" },
  { key: "history", label: "📚 History", color: "bg-purple-50 text-purple-700 ring-purple-100" },
  { key: "geography", label: "🌍 Geography", color: "bg-green-50 text-green-700 ring-green-100" },
] as const

type SubjectKey = typeof subjects[number]["key"]

const subjectContent: Record<SubjectKey, { popularChapters: string[]; trendingTopics: string[] }> = {
  biology: {
    popularChapters: [
      "Cell Biology & Structure", 
      "Photosynthesis Process", 
      "Human Digestive System", 
      "Genetics & Heredity", 
      "Ecosystem & Environment",
      "Plant Kingdom Classification",
      "Animal Kingdom Overview",
      "Human Respiratory System",
      "Evolution Theory",
      "Biotechnology Basics"
    ],
    trendingTopics: [
      "Photosynthesis - Chapter 1", 
      "Biology - Important Formulas", 
      "Biology - Past Questions",
      "Cell Division Process",
      "DNA Structure & Function",
      "Human Heart & Circulation",
      "Plant Life Cycle",
      "Food Chain & Web",
      "Genetic Disorders",
      "Environmental Pollution"
    ],
  },
  math: {
    popularChapters: [
      "Algebra Fundamentals", 
      "Geometry Theorems", 
      "Calculus Basics",
      "Trigonometry Functions",
      "Statistics & Probability",
      "Coordinate Geometry",
      "Number Theory",
      "Linear Equations",
      "Quadratic Functions",
      "Mathematical Induction"
    ],
    trendingTopics: [
      "Quadratic Equations", 
      "Circle Properties", 
      "Differentiation Rules",
      "Integration Techniques",
      "Triangle Congruency",
      "Binomial Theorem",
      "Permutation & Combination",
      "Arithmetic Progression",
      "Geometric Progression",
      "Complex Numbers"
    ],
  },
  physics: {
    popularChapters: [
      "Mechanics & Motion", 
      "Optics & Light", 
      "Electromagnetism",
      "Thermodynamics",
      "Wave Motion",
      "Atomic Physics",
      "Nuclear Physics",
      "Modern Physics",
      "Fluid Mechanics",
      "Sound & Acoustics"
    ],
    trendingTopics: [
      "Newton's Laws of Motion", 
      "Laws of Refraction", 
      "Ohm's Law & Circuits",
      "Gravitational Force",
      "Electromagnetic Induction",
      "Quantum Mechanics",
      "Relativity Theory",
      "Energy Conservation",
      "Momentum & Collision",
      "Simple Harmonic Motion"
    ],
  },
  bangla: {
    popularChapters: [
      "বাংলা ১ম পত্র - কবিতা", 
      "বাংলা ২য় পত্র - গদ্য",
      "বাংলা ব্যাকরণ - পদ প্রকরণ",
      "বাংলা সাহিত্যের ইতিহাস",
      "বাংলা রচনা লেখার নিয়ম",
      "বাংলা অনুবাদ",
      "বাংলা বানান ও উচ্চারণ",
      "বাংলা প্রবন্ধ রচনা",
      "বাংলা কবিতা বিশ্লেষণ",
      "বাংলা গল্প ও উপন্যাস"
    ],
    trendingTopics: [
      "কবিতা বিশ্লেষণ", 
      "ব্যাকরণ - কারক বিভক্তি", 
      "রচনা - বিজ্ঞান ও প্রযুক্তি",
      "গদ্য - রবীন্দ্রনাথ ঠাকুর",
      "নজরুল ইসলামের কবিতা",
      "বাংলা সাহিত্যের যুগ",
      "বাংলা ভাষার উৎপত্তি",
      "বাংলা প্রবাদ প্রবচন",
      "বাংলা বানান শুদ্ধি",
      "বাংলা অনুবাদ কৌশল"
    ],
  },
  english: {
    popularChapters: [
      "Grammar Rules & Tenses", 
      "Literature Analysis", 
      "Vocabulary Building",
      "Reading Comprehension",
      "Writing Skills",
      "Speaking & Pronunciation",
      "Essay Writing",
      "Letter Writing",
      "Report Writing",
      "Creative Writing"
    ],
    trendingTopics: [
      "Present Perfect Tense", 
      "Voice Change Rules", 
      "Narration Practice",
      "Conditional Sentences",
      "Preposition Usage",
      "Article Rules",
      "Word Formation",
      "Idioms & Phrases",
      "Synonyms & Antonyms",
      "Reading Comprehension Tips"
    ],
  },
  chemistry: {
    popularChapters: [
      "Atomic Structure & Bonding", 
      "Chemical Reactions", 
      "Acids & Bases",
      "Organic Chemistry Basics",
      "Inorganic Chemistry",
      "Chemical Equilibrium",
      "Thermochemistry",
      "Electrochemistry",
      "Chemical Kinetics",
      "Periodic Table & Properties"
    ],
    trendingTopics: [
      "Chemical Bonding", 
      "Acid-Base Reactions", 
      "Organic Compounds",
      "Chemical Formulas",
      "Balancing Equations",
      "Chemical Properties",
      "Laboratory Techniques",
      "Chemical Analysis",
      "Chemical Safety",
      "Chemistry in Daily Life"
    ],
  },
  history: {
    popularChapters: [
      "Ancient Civilizations", 
      "Medieval Period", 
      "Renaissance & Reformation",
      "Industrial Revolution",
      "World Wars",
      "Bangladesh Liberation War",
      "Mughal Empire",
      "British Colonial Period",
      "Independence Movements",
      "Modern World History"
    ],
    trendingTopics: [
      "Bangladesh History", 
      "World War II", 
      "Mughal Empire",
      "British Rule in India",
      "Liberation War 1971",
      "Ancient Egypt",
      "Roman Empire",
      "French Revolution",
      "American Independence",
      "Cold War Period"
    ],
  },
  geography: {
    popularChapters: [
      "Physical Geography", 
      "Human Geography", 
      "Climate & Weather",
      "Natural Resources",
      "Population Studies",
      "Economic Geography",
      "Environmental Geography",
      "Geographic Information Systems",
      "Bangladesh Geography",
      "World Geography"
    ],
    trendingTopics: [
      "Bangladesh Geography", 
      "Climate Change", 
      "Natural Disasters",
      "Population Distribution",
      "Economic Activities",
      "Environmental Issues",
      "Geographic Features",
      "Weather Patterns",
      "Natural Resources",
      "Human Settlement"
    ],
  },
}

const trending = [
  "Biology all",
  "Photosynthesis",
  "নিউটনের গতি-সূত্র",
  "Quadratic Roots",
  "বাংলা ১ম পত্র"
]

export default function PaidSearchPage() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [recent, setRecent] = useState<string[]>([])
  const [activeSubject, setActiveSubject] = useState<SubjectKey | null>(null)
  const [placeholderIdx, setPlaceholderIdx] = useState(0)

  // rotate placeholder
  useEffect(() => {
    const id = window.setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % rotatingPlaceholders.length)
    }, 2400)
    return () => window.clearInterval(id)
  }, [])

  // load recents
  useEffect(() => {
    try {
      const raw = localStorage.getItem("paid_recent_searches")
      if (raw) setRecent(JSON.parse(raw))
    } catch {}
  }, [])

  const persistRecent = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setRecent((prev) => {
      const next = [trimmed, ...prev.filter((x) => x !== trimmed)].slice(0, 8)
      try { localStorage.setItem("paid_recent_searches", JSON.stringify(next)) } catch {}
      return next
    })
  }

  const runSearch = (text: string) => {
    const q = text.trim()
    if (!q) return
    persistRecent(q)
    
    // Make "biology" search return same results as "biology all"
    const searchQuery = q.toLowerCase() === "biology" ? "biology all" : q
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  const handleSubjectSelect = (key: SubjectKey) => {
    setActiveSubject((prev) => (prev === key ? null : key))
    const displayName = subjects.find((s) => s.key === key)?.label.replace(/^\S+\s/, "") || key
    // For biology subject, set query to "Biology all" to match trending behavior
    const queryText = key === "biology" ? "Biology all" : displayName
    setQuery(queryText)
  }

  const subjectPreview = useMemo(() => {
    if (!activeSubject) return null
    return {
      popular: subjectContent[activeSubject].popularChapters,
      trending: subjectContent[activeSubject].trendingTopics,
    }
  }, [activeSubject])

  const clearRecent = () => {
    setRecent([])
    try { localStorage.removeItem("paid_recent_searches") } catch {}
  }

  return (
    <div className="mx-auto max-w-[480px]">
        {/* HERO */}
        <section className="px-4 pt-6 pb-4">
          <h1 className="text-2xl font-extrabold text-slate-900 text-center">আজ কী পড়তে চাও?</h1>
          <p className="mt-1 text-slate-500 text-center">তোমার বিষয় বা টপিক নিয়ে যা বলবে</p>

          <div className="mt-4">
            <div className="relative">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder=" "
                className="h-14 w-full rounded-full pr-24 pl-5 font-semibold shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-pink-500/60 bg-white"
              />
              {!query && (
                <div className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={rotatingPlaceholders[placeholderIdx]}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      Search {rotatingPlaceholders[placeholderIdx]}…
                    </motion.span>
                  </AnimatePresence>
                </div>
              )}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button aria-label="Mic" className="p-2 text-slate-500 hover:text-slate-700 rounded-full hover:bg-slate-50">
                  <Mic className="h-5 w-5" />
                </button>
                <button
                  aria-label="Search"
                  onClick={() => runSearch(query)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold shadow-sm active:scale-[.98]"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

      {/* SUBJECTS */}
      <section className="px-4 pb-2 mt-6">
        <h3 className="text-base md:text-lg font-bold text-slate-700 mb-3 flex items-center justify-center gap-2 text-center">
          <BookOpen className="h-4 w-4 text-slate-600" />
          <span>বিষয় বেছে নাও</span>
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          {subjects.map((s) => (
            <button
              key={s.key}
              onClick={() => handleSubjectSelect(s.key)}
              className={`text-sm font-semibold px-3 py-2 rounded-xl ring-2 ${s.color} ${activeSubject === s.key ? "ring-offset-2" : "ring-1"}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </section>

      {/* SUBJECT PREVIEW (inline) */}
      {subjectPreview && (
        <section className="px-4 space-y-6 mt-6 text-center">
          <div>
            <div className="mb-2 text-sm font-bold text-slate-700">Popular Chapters</div>
            <div className="flex flex-wrap justify-center gap-2">
              {subjectPreview.popular.slice(0,5).map((t) => (
                <button
                  key={t}
                  onClick={() => runSearch(t)}
                  className="px-4 py-2 text-sm bg-white rounded-full ring-1 ring-slate-300 shadow-sm"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 text-sm font-bold text-slate-700 flex items-center justify-center gap-1"><span>🔥</span> <span>Trending Topics</span></div>
            <div className="flex flex-wrap justify-center gap-2">
              {subjectPreview.trending.slice(0,5).map((t) => (
                <button
                  key={t}
                  onClick={() => runSearch(t)}
                  className="px-4 py-2 text-sm bg-white rounded-full ring-1 ring-slate-300 shadow-sm"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-100" />
        </section>
      )}

      {/* TRENDING */}
      {!activeSubject && (
        <section className="px-4 mt-6">
          <h3 className="text-base md:text-lg font-bold text-slate-700 mb-3 flex items-center justify-center gap-2 text-center">
            <Sparkles className="h-4 w-4 text-slate-600" />
            <span>জনপ্রিয় টপিক</span>
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {trending.map((t) => (
              <button
                key={t}
                onClick={() => runSearch(t)}
                className="px-4 py-2 text-sm bg-white rounded-full ring-1 ring-slate-200 shadow-sm"
              >
                {t}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* RECENT SEARCHES */}
      {recent.length > 0 && (
        <section className="px-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base md:text-lg font-bold text-slate-700 flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-600" />
              <span>Recent Searches</span>
            </h3>
            <button
              onClick={clearRecent}
              className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"
            >
              ✕ Clear
            </button>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {recent.map((t) => (
              <button
                key={t}
                onClick={() => runSearch(t)}
                className="px-4 py-2 text-sm bg-white rounded-full ring-1 ring-slate-200 shadow-sm"
              >
                {t}
              </button>
            ))}
          </div>
        </section>
      )}


    </div>
  )
}

"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mic, Search, Clock, Home, BookOpen, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import TopBar from "@/components/layout/TopBar"
 

const rotatingPlaceholders = [
  "Photosynthesis",
  "Algebra",
  "English Grammar",
  "Newton’s Laws",
  "বাংলা ব্যাকরণ",
]

const subjects = [
  { key: "biology", label: "📗 Biology", color: "bg-emerald-50 text-emerald-700 ring-emerald-100" },
  { key: "math", label: "🔢 Math", color: "bg-indigo-50 text-indigo-700 ring-indigo-100" },
  { key: "physics", label: "⚡ Physics", color: "bg-amber-50 text-amber-700 ring-amber-100" },
  { key: "bangla", label: "✍️ Bangla", color: "bg-rose-50 text-rose-700 ring-rose-100" },
  { key: "english", label: "🗣 English", color: "bg-sky-50 text-sky-700 ring-sky-100" },
] as const

type SubjectKey = typeof subjects[number]["key"]

const subjectContent: Record<SubjectKey, { popularChapters: string[]; trendingTopics: string[] }> = {
  biology: {
    popularChapters: ["Biology Key Concepts", "Biology Problem Solving", "Biology Past Papers"],
    trendingTopics: ["Photosynthesis - Chapter 1", "Biology - Important Formulas", "Biology - Past Q"],
  },
  math: {
    popularChapters: ["Algebra Fundamentals", "Geometry Theorems", "Calculus Basics"],
    trendingTopics: ["Quadratic Equations", "Circle Properties", "Differentiation Rules"],
  },
  physics: {
    popularChapters: ["Mechanics", "Optics", "Electromagnetism"],
    trendingTopics: ["Newton's Laws", "Laws of Refraction", "Ohm's Law"],
  },
  bangla: {
    popularChapters: ["বাংলা ১ম পত্র", "বাংলা ২য় পত্র"],
    trendingTopics: ["কবিতা বিশ্লেষণ", "ব্যাকরণ", "রচনা"],
  },
  english: {
    popularChapters: ["Grammar Rules", "Literature Analysis", "Vocabulary Building"],
    trendingTopics: ["Tense", "Voice Change", "Narration Practice"],
  },
}

const trending = ["Photosynthesis", "নিউটনের গতি-সূত্র", "Algebra", "বাংলা ১ম পত্র"]

export default function FreeSearchPage() {
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
      const raw = localStorage.getItem("free_recent_searches")
      if (raw) setRecent(JSON.parse(raw))
    } catch {}
  }, [])

  const persistRecent = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setRecent((prev) => {
      const next = [trimmed, ...prev.filter((x) => x !== trimmed)].slice(0, 8)
      try { localStorage.setItem("free_recent_searches", JSON.stringify(next)) } catch {}
      return next
    })
  }

  const runSearch = (text: string) => {
    const q = text.trim()
    if (!q) return
    persistRecent(q)
    router.push(`/search-results?q=${encodeURIComponent(q)}`)
  }

  const handleSubjectSelect = (key: SubjectKey) => {
    setActiveSubject((prev) => (prev === key ? null : key))
    const displayName = subjects.find((s) => s.key === key)?.label.replace(/^\S+\s/, "") || key
    setQuery(displayName)
  }

  const subjectPreview = useMemo(() => {
    if (!activeSubject) return null
    return {
      popular: subjectContent[activeSubject].popularChapters,
      trending: subjectContent[activeSubject].trendingTopics,
    }
  }, [activeSubject])

  // Removed chapter card; we will use bordered pills similar to subject chips

  return (
    <div className="mx-auto max-w-[480px] h-full flex flex-col">
      {/* HEADER */}
      <TopBar variant="home" />
      
      {/* SEARCH SECTION - Positioned above subjects */}
      <div className="px-4 pt-20 pb-4">
        {/* HERO */}
        <section className="py-4">
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
      </div>

      {/* SUBJECTS AND OTHER CONTENT */}
      <div className="px-4 pb-20">
        {/* SUBJECTS */}
        <section className="pb-2">
          <h3 className="text-base md:text-lg font-bold text-slate-700 mb-3 flex items-center justify-center gap-2 text-center">
            <BookOpen className="h-4 w-4 text-slate-600" />
            <span>Choose subject to explore</span>
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
          <section className="space-y-6 mt-6 text-center">
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
          <section className="mt-6">
            <h3 className="text-base md:text-lg font-bold text-slate-700 mb-3 flex items-center justify-center gap-2 text-center">
              <Sparkles className="h-4 w-4 text-slate-600" />
              <span>✨ Trending in Shikho</span>
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

        {/* RECENTS: removed per requirements */}
      </div>
    </div>
  )
}



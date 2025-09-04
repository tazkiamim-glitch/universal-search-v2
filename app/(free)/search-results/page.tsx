"use client"
import { useSearchParams, useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { catalog } from "@/lib/search/mockData"
import { mockQueryResults } from "@/lib/search/mockQueryResults"
import { tokenize } from "@/lib/search/normalize"
import { SubjectCard } from "@/components/search/cards/SubjectCard"
import SearchInput from "@/components/search/SearchInput"

type CardProps = {
  thumbnailUrl: string
  topicName: string
  chapterName: string
  duration?: string
  watchCount?: string
  cta: { label: string; variant: "primary" | "unlock" | "success" }
}

function ResultCard({ thumbnailUrl, topicName, chapterName, duration, watchCount, cta }: CardProps) {
  const isUnlock = cta.variant === "unlock"
  return (
    <div className="w-full flex gap-4 bg-slate-50 rounded-2xl p-4 ring-1 ring-slate-200/60 shadow-sm">
      {/* Bigger Thumbnail on the left */}
      <div className="w-32 h-20 shrink-0">
        <img
          src={thumbnailUrl}
          alt={`${topicName} thumbnail`}
          className="w-full h-full object-cover rounded-xl border"
        />
      </div>
      
      {/* Content area with clear hierarchy */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Topic Name - Main bold title */}
          <div className="font-bold text-slate-900 text-base leading-tight">
            {topicName}
          </div>
          
          {/* Chapter Name - Secondary line */}
          <div className="text-sm text-slate-600 truncate">
            {chapterName}
          </div>
          
          {/* Metadata - Duration and Watch Count grouped together */}
          <div className="flex items-center gap-3 text-xs text-slate-500">
            {duration && <span>{duration}</span>}
            {watchCount && (
              <div className="flex items-center gap-1">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="12" 
                  height="12" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-slate-400"
                >
                  <path d="M1 12s4-8 9-8 9 8 9 8-4 8-9 8-9-8-9-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <span>{watchCount}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="mt-3 flex justify-end">
          {isUnlock ? (
            <button className="px-4 py-2 text-sm font-semibold rounded-full bg-blue-400 text-blue-900 hover:bg-blue-500 transition-colors">
              Take Trial
            </button>
          ) : (
            <button className="px-4 py-2 text-sm font-semibold rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-colors">
              {cta.label}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function FreeResultsPage() {
  const params = useSearchParams()
  const router = useRouter()
  const q = (params?.get("q") ?? "").trim()
  const [activeTab, setActiveTab] = useState('All')

  const filterTabs = ['All', 'Videos', 'Notes', 'Tests', 'Chapter', 'Subject']

  const runSearch = (text: string) => {
    const query = (text || "").trim()
    if (!query) return
    router.push(`/search-results?q=${encodeURIComponent(query)}`)
  }

  // derive results using multiple strategies: direct title include, curated map, and hierarchical fallback
  const results = useMemo(() => {
    const trimmed = q.trim()
    if (!trimmed) return [] as (typeof catalog.contents[number] & { breadcrumb?: string })[]
    const lower = trimmed.toLowerCase()
    const subjectsById = new Map(catalog.subjects.map(s => [s.id, s]))
    const chaptersById = new Map(catalog.chapters.map(c => [c.id, c]))

    const addBreadcrumb = (c: typeof catalog.contents[number]) => {
      const topic = catalog.topics.find(t => t.id === c.topicId)
      const chapter = topic ? chaptersById.get(topic.chapterId) : undefined
      const subject = chapter ? subjectsById.get(chapter.subjectId) : undefined
      const chapterText = chapter?.index ? `Chapter ${chapter.index}` : (chapter?.name ?? "Chapter")
      const subjectText = subject?.name ?? "Subject"
      const breadcrumb = `${subjectText} → ${chapterText}`
      return { ...c, breadcrumb }
    }

    // 1) Direct include by content title
    const direct = catalog.contents
      .filter(c => (c.title + " ").toLowerCase().includes(lower))
      .map(addBreadcrumb)

    // 2) Curated map for common queries
    const curated = (mockQueryResults.get(trimmed) ?? [])
      .map(addBreadcrumb)

    // 3) Hierarchical fallback: topics -> chapters -> subjects
    const tokens = tokenize(trimmed).map(t => t.toLowerCase())
    let hierarchical: ReturnType<typeof addBreadcrumb>[] = []
    if (tokens.length > 0) {
      const topicMatches = catalog.topics.filter(t => {
        const hay = `${t.name} ${t.tokens.join(" ")}`.toLowerCase()
        return tokens.every(tok => hay.includes(tok))
      })
      if (topicMatches.length > 0) {
        const topicIds = new Set(topicMatches.map(t => t.id))
        hierarchical = catalog.contents.filter(c => topicIds.has(c.topicId)).map(addBreadcrumb)
      } else {
        const chapterMatches = catalog.chapters.filter(c => {
          const hay = `${c.name} ${c.tokens.join(" ")}`.toLowerCase()
          return tokens.every(tok => hay.includes(tok))
        })
        if (chapterMatches.length > 0) {
          const chapterIds = new Set(chapterMatches.map(c => c.id))
          const topicIds = new Set(catalog.topics.filter(t => chapterIds.has(t.chapterId)).map(t => t.id))
          hierarchical = catalog.contents.filter(c => topicIds.has(c.topicId)).map(addBreadcrumb)
        } else {
          const subjectMatches = catalog.subjects.filter(s => {
            const hay = `${s.name} ${s.paper ?? ""} ${s.tokens.join(" ")}`.toLowerCase()
            return tokens.every(tok => hay.includes(tok))
          })
          if (subjectMatches.length > 0) {
            const subjectIds = new Set(subjectMatches.map(s => s.id))
            const chapterIds = new Set(catalog.chapters.filter(c => subjectIds.has(c.subjectId)).map(c => c.id))
            const topicIds = new Set(catalog.topics.filter(t => chapterIds.has(t.chapterId)).map(t => t.id))
            hierarchical = catalog.contents.filter(c => topicIds.has(c.topicId)).map(addBreadcrumb)
          }
        }
      }
    }

    // 4) Special case: "biology all"
    const bioAll = lower === "biology all" ? catalog.contents.map(addBreadcrumb) : []

    // merge and dedupe by id
    const all = [...direct, ...curated, ...hierarchical, ...bioAll]
    const seen = new Set<string>()
    const merged = all.filter(it => (seen.has(it.id) ? false : (seen.add(it.id), true)))
    return merged
  }, [q])

  const intentTokens = useMemo(() => tokenize(q), [q])

  // intent classification to control sections visibility
  const intentInfo = useMemo(() => {
    const trimmed = q.trim()
    const tokens = tokenize(trimmed).map(t => t.toLowerCase())
    const includesAll = (hay: string) => tokens.every(tok => hay.includes(tok))

    // Debug logging
    console.log('Search query:', trimmed)
    console.log('Tokens:', tokens)
    console.log('All subjects:', catalog.subjects.map(s => ({ name: s.name, tokens: s.tokens })))

    // Find ALL matching subjects instead of just the first one
    const matchingSubjects = catalog.subjects.filter(s => {
      const searchString = `${s.name} ${s.paper ?? ""} ${s.tokens.join(" ")}`.toLowerCase()
      const matches = includesAll(searchString)
      console.log(`Subject ${s.name}: "${searchString}" matches: ${matches}`)
      return matches
    })
    
    console.log('Matching subjects:', matchingSubjects.map(s => s.name))
    
    if (matchingSubjects.length > 0) {
      return { kind: "subjects" as const, subjects: matchingSubjects }
    }

    const chapter = catalog.chapters.find(c => includesAll(`${c.name} ${c.tokens.join(" ")}`.toLowerCase())) || null
    if (chapter) {
      return { kind: "chapter" as const }
    }

    const topic = catalog.topics.find(t => includesAll(`${t.name} ${t.tokens.join(" ")}`.toLowerCase())) || null
    if (topic) {
      return { kind: "topic" as const }
    }

    return { kind: "other" as const }
  }, [q])

  const free = results.filter(r => r.isFree)
  const premium = results.filter(r => !r.isFree)

  const split = (items: typeof results) => ({
    videos: items.filter(r => ["LIVE_CLASS","RECORDED_CLASS","ANIMATED_VIDEO","GUIDELINE_VIDEO","STORY"].includes(r.type)),
    notes: items.filter(r => ["PDF_NOTES","SMART_NOTE"].includes(r.type)),
    tests: items.filter(r => ["QUIZ","MODEL_TEST","LIVE_EXAM","CQ_EXAM"].includes(r.type)),
  })

  const freeG = split(free)
  const premG = split(premium)

  const Section = ({ title, emoji, items, premium = false }: { title: string; emoji: string; items: ReturnType<typeof split>[keyof ReturnType<typeof split>]; premium?: boolean }) => (
    items.length > 0 ? (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="font-bold text-slate-800">{emoji} {title}</div>
          {items.length > 3 && <button className="text-sm text-pink-600">See all</button>}
        </div>
        <div className="space-y-3">
          {items.slice(0,3).map(it => {
            // Get topic and chapter information for the content
            const topic = catalog.topics.find(t => t.id === it.topicId)
            const chapter = topic ? catalog.chapters.find(c => c.id === topic.chapterId) : undefined
            const subject = chapter ? catalog.subjects.find(s => s.id === chapter.subjectId) : undefined
            
            // Determine thumbnail URL based on content type
            const getThumbnailUrl = (content: typeof it) => {
              switch (content.type) {
                case "LIVE_CLASS": return "/liveclass.webp"
                case "RECORDED_CLASS": return "/recordedclass.webp"
                case "ANIMATED_VIDEO": return "/animatedvideo.jpg"
                case "STORY": return "/placeholder.jpg"
                case "GUIDELINE_VIDEO": return "/placeholder.jpg"
                case "PDF_NOTES": return "/placeholder.jpg"
                case "SMART_NOTE": return "/placeholder.jpg"
                case "QUIZ": return "/mcq.jfif"
                case "MODEL_TEST": return "/mcq.jfif"
                case "LIVE_EXAM": return "/mcq.jfif"
                case "CQ_EXAM": return "/mcq.jfif"
                case "HOMEWORK": return "/placeholder.jpg"
                default: return "/placeholder.jpg"
              }
            }
            
            // Format duration
            const formatDuration = (sec: number) => {
              const m = Math.floor(sec / 60)
              const s = sec % 60
              return s ? `${m}m ${s}s` : `${m}m`
            }
            
            return (
              <ResultCard
                key={it.id}
                thumbnailUrl={getThumbnailUrl(it)}
                topicName={it.title}
                chapterName={topic?.name || chapter?.name || subject?.name || "Unknown Topic"}
                duration={it.durationSec ? formatDuration(it.durationSec) : undefined}
                watchCount={it.statsText || "1.2k views"}
                cta={{ 
                  label: it.type === "QUIZ" ? "Start" : 
                        it.type === "PDF_NOTES" ? "Read" : 
                        it.type === "LIVE_CLASS" ? "Join" : 
                        it.type === "MODEL_TEST" || it.type === "LIVE_EXAM" || it.type === "CQ_EXAM" ? "Start" :
                        "Watch", 
                  variant: premium ? "unlock" : "primary" 
                }}
              />
            )
          })}
        </div>
      </div>
    ) : null
  )

  return (
    <div className="mx-auto max-w-[480px]">
      {/* Sticky Header with Back Arrow, Title, and Search Icon */}
      <header className="sticky top-0 z-10 flex-shrink-0 flex items-center justify-between p-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-1 hover:bg-slate-100 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <h1 className="text-xl font-bold text-slate-800">
            {q ? `${q} Result${results.length !== 1 ? 's' : ''}` : 'Search Results'}
          </h1>
        </div>
        <button
          aria-label="Search"
          onClick={() => router.push("/")}
          className="p-1.5 rounded-full ring-1 ring-gray-300 text-gray-700 hover:bg-gray-50 active:scale-95 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
      </header>



      {/* Filter Tabs */}
      <div className="px-4 py-3 border-b border-slate-200">
        <div className="relative">
          {/* Left scroll arrow */}
          <button 
            onClick={() => {
              const container = document.getElementById('tabs-container');
              if (container) {
                container.scrollBy({ left: -100, behavior: 'smooth' });
              }
            }}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/95 rounded-full flex items-center justify-center z-10 shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          
          {/* Right scroll arrow */}
          <button 
            onClick={() => {
              const container = document.getElementById('tabs-container');
              if (container) {
                container.scrollBy({ left: 100, behavior: 'smooth' });
              }
            }}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/95 rounded-full flex items-center justify-center z-10 shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
          
          <div 
            id="tabs-container"
            className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-8"
          >
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-4 py-3 space-y-6">

      {/* Subject Intent: show all matching subject cards */}
      {(activeTab === 'All' || activeTab === 'Subject') && intentInfo.kind === "subjects" && intentInfo.subjects && (
        <section className="space-y-2">
          {intentInfo.subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} tokens={intentTokens} />
          ))}
        </section>
      )}

      {/* Free Content */}
      {(activeTab === 'All' || activeTab === 'Videos' || activeTab === 'Notes' || activeTab === 'Tests') && (
        <section className="space-y-4">
          <div className="text-slate-900 font-extrabold">🟢 ফ্রি কন্টেন্ট</div>
          {(activeTab === 'All' || activeTab === 'Videos') && <Section title="🎥 Videos" emoji="" items={freeG.videos} />}
          {(activeTab === 'All' || activeTab === 'Notes') && <Section title="📄 Notes & PDFs" emoji="" items={freeG.notes} />}
          {(activeTab === 'All' || activeTab === 'Tests') && <Section title="🧪 Tests & Quizzes" emoji="" items={freeG.tests} />}
        </section>
      )}

      {/* Premium Content */}
      {(activeTab === 'All' || activeTab === 'Videos' || activeTab === 'Notes' || activeTab === 'Tests') && (
        <section className="space-y-4">
          <div className="text-slate-900 font-extrabold">💎 প্রিমিয়াম কন্টেন্ট</div>
          <a 
            href="#" 
            className="inline-block text-pink-600 font-semibold text-sm hover:text-pink-700 transition-colors"
          >
            Take Free Trial to Unlock All content →
          </a>
          {(activeTab === 'All' || activeTab === 'Videos') && <Section title="🎥 Videos" emoji="" items={premG.videos} premium />}
          {(activeTab === 'All' || activeTab === 'Notes') && <Section title="📄 Notes & PDFs" emoji="" items={premG.notes} premium />}
          {(activeTab === 'All' || activeTab === 'Tests') && <Section title="🧪 Tests & Quizzes" emoji="" items={premG.tests} premium />}
        </section>
      )}

        {free.length === 0 && premium.length === 0 && (
          <div className="text-center text-slate-500 py-10">No results found.</div>
        )}
      </div>
    </div>
  )
}



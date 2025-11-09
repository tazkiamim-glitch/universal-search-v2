"use client"
import { useSearchParams, useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { catalog } from "@/lib/search/mockData"
import { searchAll } from "@/lib/search/score"
import { Content, MixedResult } from "@/lib/search/types"
import { SubjectCard } from "@/components/search/cards/SubjectCard"
import { tokenize, transliterateBnToLatin, highlight, normalize } from "@/lib/search/normalize"
import { CONTENT_TYPE_GROUPS } from "@/lib/search/config"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type SectionData = {
  title: string
  emoji: string
  items: Content[]
}

// Human-friendly label for content types used in debug UI
function contentTypeLabel(t: Content["type"]): string {
  switch (t) {
    case "LIVE_CLASS": return "লাইভ ক্লাস"
    case "LIVE_REPLAY": return "লাইভ রিপ্লে"
    case "LIVE_EXAM": return "লাইভ এক্সাম"
    case "MODEL_TEST": return "মডেল টেস্ট"
    case "CQ_EXAM": return "CQ এক্সাম"
    case "ANIMATED_VIDEO": return "ভিডিও লেসন"
    case "RECORDED_CLASS": return "রেকর্ডেড ক্লাস"
    case "STORY": return "স্টোরি"
    case "GUIDELINE_VIDEO": return "গাইডলাইন ভিডিও"
    case "PDF_NOTES": return "PDF নোট"
    case "SMART_NOTE": return "স্মার্ট নোট"
    case "CLASS_NOTE": return "ক্লাস নোট"
    case "ADMISSION_NOTE": return "ভর্তি নোট"
    case "QUIZ": return "কুইজ"
    case "HOMEWORK": return "হোমওয়ার্ক"
    default: return String(t).replace(/_/g, " ")
  }
}

// Pick N items prioritizing a 1 free : 3 premium mix (for N=4).
// If no free exists, fill all with premium.
function selectTopNWithOneFreeThreePremium(items: Content[], n: number = 4): Content[] {
  if (n <= 0 || items.length === 0) return []
  const freeItems = items.filter(i => i.isFree)
  const premiumItems = items.filter(i => !i.isFree)

  const result: Content[] = []
  const used = new Set<string>()

  // Prefer exactly one free if available
  if (freeItems.length > 0) {
    result.push(freeItems[0])
    used.add(freeItems[0].id)
  }

  // Add up to 3 premium
  for (const p of premiumItems) {
    if (result.length >= (freeItems.length > 0 ? 1 + 3 : n)) break
    if (!used.has(p.id)) {
      result.push(p)
      used.add(p.id)
    }
  }

  // If no free available, we need n premium (or as many as exist)
  if (freeItems.length === 0) {
    for (const p of premiumItems) {
      if (result.length >= n) break
      if (!used.has(p.id)) {
        result.push(p)
        used.add(p.id)
      }
    }
  }

  // If still short (e.g., not enough premium), fill from remaining items by original order
  for (const it of items) {
    if (result.length >= n) break
    if (!used.has(it.id)) {
      result.push(it)
      used.add(it.id)
    }
  }

  return result.slice(0, n)
}

function ResultCard({ item, premium = false }: { item: Content; premium?: boolean }) {
  const topic = catalog.topics.find(t => t.id === item.topicId)
  const chapter = topic ? catalog.chapters.find(c => c.id === topic.chapterId) : undefined
  const subject = chapter ? catalog.subjects.find(s => s.id === chapter.subjectId) : undefined

  const getThumbnailUrl = (content: Content) => {
    switch (content.type) {
      case "LIVE_CLASS": return "/liveclass.webp"
      case "LIVE_REPLAY": return "/liveclass.webp"
      case "RECORDED_CLASS": return "/recordedclass.webp"
      case "ANIMATED_VIDEO": return "/animatedvideo.jpg"
      case "STORY": return "/placeholder.jpg"
      case "GUIDELINE_VIDEO": return "/placeholder.jpg"
      case "PDF_NOTES": return "/placeholder.jpg"
      case "SMART_NOTE": return "/placeholder.jpg"
      case "CLASS_NOTE": return "/placeholder.jpg"
      case "ADMISSION_NOTE": return "/placeholder.jpg"
      case "QUIZ": return "/mcq.jfif"
      case "MODEL_TEST": return "/mcq.jfif"
      case "LIVE_EXAM": return "/mcq.jfif"
      case "CQ_EXAM": return "/mcq.jfif"
      case "HOMEWORK": return "/placeholder.jpg"
      default: return "/placeholder.jpg"
    }
  }

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return s ? `${m}m ${s}s` : `${m}m`
  }

  const getTypeLabel = (t: Content["type"]): string => contentTypeLabel(t)

  const getCtaLabel = (type: Content["type"]) => {
    switch (type) {
      case "QUIZ": return "Start"
      case "PDF_NOTES": case "SMART_NOTE": case "CLASS_NOTE": case "ADMISSION_NOTE": return "Read"
      case "LIVE_CLASS": case "LIVE_REPLAY": return "Join"
      case "MODEL_TEST": case "LIVE_EXAM": case "CQ_EXAM": return "Start"
      default: return "Watch"
    }
  }

  return (
    <div className="w-full flex gap-4 bg-slate-50 rounded-2xl p-4 ring-1 ring-slate-200/60 shadow-sm hover:shadow-md transition-shadow relative">
      <div className="w-32 h-20 shrink-0 relative">
        <img
          src={getThumbnailUrl(item)}
          alt={item.title}
          className="w-full h-full object-cover rounded-xl border"
        />
        {premium && (
          <div className="absolute top-1 right-1 bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            Premium
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div className="space-y-1">
          <div className="font-bold text-slate-900 text-base leading-tight line-clamp-2">
            {item.title}
          </div>
          
          <div className="text-sm text-slate-600 truncate">
            {topic?.name || chapter?.name || subject?.name || "Unknown Topic"}
          </div>
          
          {/* Teacher info */}
          {item.teacher && (
            <div className="text-xs text-slate-500">
              👨‍🏫 {item.teacher}
            </div>
          )}
          
          <div className="flex items-center gap-3 text-xs text-slate-500">
            {item.durationSec && <span>{formatDuration(item.durationSec)}</span>}
            {item.statsText && (
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
                <span>{item.statsText}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-2 flex justify-end">
          {premium ? (
            <button className="px-4 py-2 text-sm font-semibold rounded-full bg-blue-400 text-blue-900 hover:bg-blue-500 transition-colors">
              Take Trial
            </button>
          ) : (
            <button className="px-4 py-2 text-sm font-semibold rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-colors">
              {getCtaLabel(item.type)}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}


function Section({ 
  section, 
  showAll = false,
  onSeeAll,
  enforceRatio = false,
}: { 
  section: SectionData; 
  showAll?: boolean;
  onSeeAll?: () => void;
  enforceRatio?: boolean;
}) {
  if (section.items.length === 0) return null

  const displayItems = showAll 
    ? section.items 
    : (enforceRatio ? selectTopNWithOneFreeThreePremium(section.items, 4) : section.items.slice(0, 4))
  const showSeeAll = section.items.length > 4 && !showAll

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="font-bold text-slate-800">{section.emoji} {section.title}</div>
        {showSeeAll && onSeeAll && (
          <button onClick={onSeeAll} className="text-sm text-pink-600 font-semibold hover:text-pink-700">
            See all ({section.items.length})
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        {displayItems.map(item => (
          <ResultCard 
            key={item.id} 
            item={item} 
            premium={!item.isFree}
          />
        ))}
      </div>
    </div>
  )
}

export default function FreeResultsPage() {
  const params = useSearchParams()
  const router = useRouter()
  const q = (params?.get("q") ?? "").trim()
  const [activeTab, setActiveTab] = useState('All')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())

  const filterTabs = ['All', 'Videos', 'Notes', 'Tests', 'Program', 'Subject']

  // Search using the enhanced search logic
  const searchResults = useMemo(() => {
    if (!q) return { results: [], intent: null }
    return searchAll(q, catalog)
  }, [q])

  const { results, intent } = searchResults

  // Separate different result types
  const classResults = results.filter(r => r.kind === "CLASS")
  const programResults = results.filter(r => r.kind === "PROGRAM")
  const phaseResults = results.filter(r => r.kind === "PHASE")
  const subjectResults = results.filter(r => r.kind === "SUBJECT")
  const chapterResults = results.filter(r => r.kind === "CHAPTER")
  const topicResults = results.filter(r => r.kind === "TOPIC")
  const contentResults = results.filter(r => r.kind === "CONTENT").map(r => r.item as Content)

  // Group all content by type (free and premium mixed together)
  const videosAll = contentResults.filter(c => (CONTENT_TYPE_GROUPS.videos as readonly string[]).includes(c.type))
  const notesAll = contentResults.filter(c => (CONTENT_TYPE_GROUPS.notes as readonly string[]).includes(c.type))
  const testsAll = contentResults.filter(c => (CONTENT_TYPE_GROUPS.tests as readonly string[]).includes(c.type))



  // Helper: for display (All tab), pick exactly 4 with 1 free + 3 premium if possible
  function selectTopNWithOneFreeThreePremium(items: Content[], n: number = 4): Content[] {
    if (n <= 0 || items.length === 0) return []
    const freeItems = items.filter(i => i.isFree)
    const premiumItems = items.filter(i => !i.isFree)

    const result: Content[] = []
    const used = new Set<string>()

    // Prefer exactly one free if available
    if (freeItems.length > 0) {
      result.push(freeItems[0])
      used.add(freeItems[0].id)
    }

    // Add up to 3 premium
    for (const p of premiumItems) {
      if (result.length >= (freeItems.length > 0 ? 1 + 3 : n)) break
      if (!used.has(p.id)) {
        result.push(p)
        used.add(p.id)
      }
    }

    // If no free available, we need n premium (or as many as exist)
    if (freeItems.length === 0) {
      for (const p of premiumItems) {
        if (result.length >= n) break
        if (!used.has(p.id)) {
          result.push(p)
          used.add(p.id)
        }
      }
    }

    // If still short (e.g., not enough premium), fill from remaining items by original order
      for (const it of items) {
      if (result.length >= n) break
      if (!used.has(it.id)) {
        result.push(it)
        used.add(it.id)
      }
    }

    return result.slice(0, n)
  }

  // Use ranking order; ratio is enforced only for the top 4 display items in All tab
  const videos = videosAll
  const notes = notesAll
  const tests = testsAll

  // Create sections with dynamic ordering based on intent (content already sorted by search ranking)
  const createSections = () => {
    const sections: SectionData[] = [
      {
        title: "Videos",
        emoji: "🎥",
        items: videos // Already sorted by search ranking
      },
      {
        title: "Notes & PDFs",
        emoji: "📄",
        items: notes // Already sorted by search ranking
      },
      {
        title: "Tests & Quizzes",
        emoji: "🧪",
        items: tests // Already sorted by search ranking
      }
    ]

    // Dynamic reordering based on intent
    if (intent?.flags.notes) {
      return [sections[1], sections[0], sections[2]] // Notes first
    } else if (intent?.flags.tests) {
      return [sections[2], sections[0], sections[1]] // Tests first
    }

    return sections // Default: Videos, Notes, Tests
  }

  const sections = createSections()

  const handleSeeAll = (sectionKey: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev)
      if (next.has(sectionKey)) {
        next.delete(sectionKey)
      } else {
        next.add(sectionKey)
      }
      return next
    })
  }

  // Filter sections based on active tab
  const filterSectionsByTab = (sections: SectionData[]) => {
    if (activeTab === 'All') return sections
    if (activeTab === 'Videos') return sections.filter(s => s.title === 'Videos')
    if (activeTab === 'Notes') return sections.filter(s => s.title === 'Notes & PDFs')
    if (activeTab === 'Tests') return sections.filter(s => s.title === 'Tests & Quizzes')
    return []
  }

  const filteredSections = filterSectionsByTab(sections)

  // Helper to render hierarchy results
  const renderHierarchyResults = (results: MixedResult[], title: string, emoji: string) => {
    if (results.length === 0) return null
    
    return (
      <section className="space-y-3">
          <div className="font-bold text-slate-800">{emoji} {title}</div>
        <div className="space-y-2">
          {results.map((result, idx) => (
            <div key={`${result.kind}-${idx}`} className="p-3 bg-slate-50 rounded-lg border">
              <div className="font-semibold text-slate-900">
                {'name' in result.item ? result.item.name : result.item.title}
              </div>
              <div className="text-sm text-slate-600">Score: {result.score.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  const intentTokens = useMemo(() => tokenize(q), [q])
  const matchingSubjects = subjectResults.length > 0
    ? subjectResults.map(r => catalog.subjects.find(s => s.id === (r.item as any).id)!)
    : []

  return (
    <div className="mx-auto max-w-[480px] min-h-screen bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-4 flex-1">
          <button 
            onClick={() => router.back()}
            className="p-1 hover:bg-slate-100 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <h1 className="text-xl font-bold text-slate-800 truncate">
            {q ? `"${q}"` : 'Search Results'}
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
      <div className="sticky top-[73px] z-10 px-4 py-3 bg-white border-b border-slate-200">
        <div className="relative">
          <button 
            onClick={() => {
              document.getElementById('tabs-container')?.scrollBy({ left: -100, behavior: 'smooth' })
            }}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/95 rounded-full flex items-center justify-center z-10 shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          
          <button 
            onClick={() => {
              document.getElementById('tabs-container')?.scrollBy({ left: 100, behavior: 'smooth' })
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
      <div className="px-4 py-6 space-y-6">
        {/* Hierarchy Results */}
        {(activeTab === 'All' || activeTab === 'Program') && renderHierarchyResults(programResults, 'Programs', '📚')}
        {(activeTab === 'All' || activeTab === 'Subject') && renderHierarchyResults(subjectResults, 'Subjects', '📖')}

        {/* Content Sections */}
        {(activeTab === 'All' || activeTab === 'Videos' || activeTab === 'Notes' || activeTab === 'Tests') && (
          <section className="space-y-6">
            {filteredSections.map((section, idx) => (
              <Section 
                key={`section-${idx}`}
                section={section}
                showAll={expandedSections.has(`section-${idx}`)}
                onSeeAll={() => handleSeeAll(`section-${idx}`)}
                enforceRatio={activeTab === 'All'}
              />
          ))}
        </section>
      )}

        {/* No Results */}
        {results.length === 0 && (
          <div className="text-center py-16 space-y-4">
            <div className="text-6xl">🔍</div>
            <div className="text-slate-600">
              <div className="font-semibold text-lg">No results found</div>
              <div className="text-sm mt-1">Try searching for a different topic or subject</div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button - Search Logic Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <button className="fixed right-6 bottom-24 z-50 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 font-semibold text-sm flex items-center gap-2 group">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
            See Logic
          </button>
        </DialogTrigger>
        <DialogContent className="!max-w-5xl !sm:max-w-5xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden bg-gradient-to-br from-slate-50 to-slate-100">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent break-words">
              🔍 Search Algorithm Breakdown
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4 overflow-x-hidden">
            {/* Query Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-2xl">📝</span>
                Query Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Original Query:</span>
                  <span className="font-mono font-bold text-pink-600">{q}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Tokenized:</span>
                  <span className="font-mono text-sm text-slate-800">{tokenize(q).join(', ')}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Total Results:</span>
                  <span className="font-bold text-purple-600">{results.length}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Detected Intent:</span>
                  <span className="font-semibold text-blue-600">
                    {intent?.flags.notes ? 'Notes' : intent?.flags.videos ? 'Videos' : intent?.flags.tests ? 'Tests' : intent?.flags.classes ? 'Classes' : 'General'}
                  </span>
                </div>
              </div>
            </div>

            {/* Step 1: Tokenization */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-2xl">⚙️</span>
                Step 1: Tokenization & Normalization
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="font-semibold text-blue-900 mb-2">Process:</p>
                  <ul className="list-disc list-inside space-y-1 text-blue-800">
                    <li>Convert query to lowercase</li>
                    <li>Remove punctuation and special characters</li>
                    <li>Split into individual tokens (words)</li>
                    <li>Handle both Bengali and English characters</li>
                    <li>Remove stop words (common words like "the", "and", "ও")</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="font-semibold text-green-900 mb-2">Result:</p>
                  <div className="flex flex-wrap gap-2">
                    {tokenize(q).map((token, i) => (
                      <span key={i} className="px-3 py-1 bg-green-200 text-green-900 rounded-full font-mono text-xs">
                        {token}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Intent Detection */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Step 2: Intent Detection
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <p className="font-semibold text-purple-900 mb-2">Intent Keywords:</p>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="p-3 bg-white rounded-lg">
                      <p className="font-bold text-purple-700 mb-1">📹 Videos:</p>
                      <p className="text-xs text-slate-600">video, class, recorded, animated, লাইভ, ভিডিও</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <p className="font-bold text-purple-700 mb-1">📄 Notes:</p>
                      <p className="text-xs text-slate-600">note, pdf, smart note, নোট, পিডিএফ, বই</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <p className="font-bold text-purple-700 mb-1">🧪 Tests:</p>
                      <p className="text-xs text-slate-600">exam, test, quiz, mcq, পরীক্ষা, মডেল টেস্ট</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <p className="font-bold text-purple-700 mb-1">🎓 Classes:</p>
                      <p className="text-xs text-slate-600">class, live class, recorded, ক্লাস, লাইভ ক্লাস</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="font-semibold text-green-900 mb-2">Detected Intent:</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {intent?.flags.notes && (
                      <span className="px-4 py-2 bg-green-200 text-green-900 rounded-full font-bold">📄 Notes</span>
                    )}
                    {intent?.flags.videos && (
                      <span className="px-4 py-2 bg-blue-200 text-blue-900 rounded-full font-bold">🎥 Videos</span>
                    )}
                    {intent?.flags.tests && (
                      <span className="px-4 py-2 bg-purple-200 text-purple-900 rounded-full font-bold">🧪 Tests</span>
                    )}
                    {intent?.flags.classes && (
                      <span className="px-4 py-2 bg-yellow-200 text-yellow-900 rounded-full font-bold">🎓 Classes</span>
                    )}
                    {intent?.flags.live && (
                      <span className="px-4 py-2 bg-red-200 text-red-900 rounded-full font-bold">🔴 Live</span>
                    )}
                    {!intent?.flags.notes && !intent?.flags.videos && !intent?.flags.tests && !intent?.flags.classes && (
                      <span className="px-4 py-2 bg-gray-200 text-gray-900 rounded-full font-bold">🔍 General Search</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Matching */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-2xl">🔗</span>
                Step 3: Document-Level Match Type Analysis
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="font-semibold text-blue-900 mb-2">How Match Type Scoring Works:</p>
                  <p className="text-blue-800 mb-2">
                    A document is basically a content's all fields: Program name, Phase, Subject, Chapter, Topic, Content Title, Description, Teacher.
                  </p>
                  <p className="text-blue-800 mb-2">
                    We analyze the ENTIRE document (all fields combined) and count how many times the query appears in each match type:
                  </p>
                  <div className="bg-white rounded p-3 space-y-1 text-blue-900">
                    <div>📝 <strong>All Fields Combined:</strong> Program name, Phase, Subject, Chapter, Topic, Content Title, Description, Teacher</div>
                    <div>🔍 <strong>Count Occurrences:</strong> How many times "photosynthesis" appears across all fields</div>
                    <div>🎯 <strong>By Match Type:</strong> Exact phrase, direct token, synonym, partial, fuzzy</div>
                    <div>📊 <strong>Calculate Score:</strong> occurrences × boost value for each match type</div>
                  </div>
                  <p className="text-blue-800 mt-2">
                    Example: Query "photosynthesis" in document with "Photosynthesis Pro - Full Animation" + Bengali "আলোকসংশ্লেষণ":
                    <br/>
                    • Direct token "photosynthesis": 1 occurrence × 8.0 = 8.0
                    <br/>
                    • Bengali translation "আলোকসংশ্লেষণ": 1 occurrence × 5.0 = 5.0
                    <br/>
                    • "Pro" is NOT counted (not part of query)
                    <br/>
                    Total: 8.0 + 5.0 = 13.0
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4: Match Type Scoring (Base Score) */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Step 4: Base Score = Match Type Scoring
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                  <p className="font-semibold text-indigo-900 mb-2">Match Type = Base Score</p>
                  <p className="text-indigo-800 mb-3 text-xs">
                    The base score IS the match type scoring. Count occurrences across all document fields and multiply by boost values.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-white rounded">
                      <span className="text-indigo-800">🎯 Exact Phrase Match</span>
                      <span className="font-mono font-bold text-indigo-600">occurrences × 10.0</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded">
                      <span className="text-indigo-800">✅ Direct Full-Token Match</span>
                      <span className="font-mono font-bold text-blue-600">occurrences × 8.0</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded">
                      <span className="text-indigo-800">🔄 Synonym/Translation Match</span>
                      <span className="font-mono font-bold text-purple-600">occurrences × 5.0</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded">
                      <span className="text-indigo-800">🔤 Partial/Prefix Match</span>
                      <span className="font-mono font-bold text-green-600">occurrences × 3.0</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded">
                      <span className="text-indigo-800">⚡ Fuzzy/Typo Match</span>
                      <span className="font-mono font-bold text-orange-600">occurrences × 1.0</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <p className="font-semibold text-red-900 mb-3">Intent Detection & Boosting:</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-white rounded">
                      <span className="text-red-800">🎯 Intent Detected (Notes/Tests/Videos)</span>
                      <span className="font-mono font-bold text-red-600">boost: 100.0</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded">
                      <span className="text-red-800">📊 Default Content Type Boost</span>
                      <span className="font-mono font-bold text-orange-600">Videos {'>'} Notes {'>'} Tests</span>
                    </div>
                    <div className="text-xs text-red-700 mt-2">
                      If query contains intent keywords (e.g., "notes", "test", "video"), matching content_types get massive boost. Otherwise, apply default content_type ordering.
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <p className="font-semibold text-green-900 mb-3">Hard Filters:</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-white rounded">
                      <span className="text-green-800">🏫 Class Filter</span>
                      <span className="font-mono font-bold text-green-600">Must Match User's Class</span>
                    </div>
                    <div className="text-xs text-green-700 mt-2">
                      All queries include filter clause: <code className="bg-gray-100 px-1 rounded">term: &#123; "class_name.keyword": "Class 6" &#125;</code>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="font-semibold text-blue-900 mb-2">Query Structure:</p>
                  <div className="bg-slate-800 text-green-400 p-4 rounded font-mono text-xs overflow-x-auto break-words">
                    <pre>{`bool: {
  should: [
    match_phrase: { boost: 10.0 },
    match (operator: and): { boost: 8.0 },
    match_bool_prefix: { boost: 3.0 },
    match (fuzzy): { boost: 1.0 }
  ],
  filter: [
    { term: { "class_name.keyword": "Class 6" } }
  ]
}`}</pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5: Flat Response & Frontend Grouping */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-2xl">📦</span>
                Step 5: API Response & Frontend Grouping
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
                  <p className="font-semibold text-pink-900 mb-2">Elasticsearch Returns Flat List:</p>
                  <div className="bg-slate-800 text-green-400 p-4 rounded font-mono text-xs mt-3">
                    <pre>{`Response from Elasticsearch:
[
  { id: "1", title: "Video 1", content_type: "ANIMATED_VIDEO", ... },
  { id: "2", title: "Note 1", content_type: "SMART_NOTE", ... },
  { id: "3", title: "Video 2", content_type: "RECORDED_CLASS", ... },
  ...
]
// Pre-sorted by relevance score (highest first)
// No grouping, no sections
// Just a ranked, flat list`}</pre>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="font-semibold text-blue-900 mb-2">Frontend Grouping (Not Backend):</p>
                  <p className="text-blue-800 mb-2">Frontend receives the flat list and groups it into sections:</p>
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    <div className="p-3 bg-white rounded-lg text-center">
                      <p className="text-2xl mb-1">🎥</p>
                      <p className="font-bold text-blue-700">Videos</p>
                      <p className="text-xs text-slate-600 mt-1">{videos.length} items</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg text-center">
                      <p className="text-2xl mb-1">📄</p>
                      <p className="font-bold text-blue-700">Notes & PDFs</p>
                      <p className="text-xs text-slate-600 mt-1">{notes.length} items</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg text-center">
                      <p className="text-2xl mb-1">🧪</p>
                      <p className="font-bold text-blue-700">Tests</p>
                      <p className="text-xs text-slate-600 mt-1">{tests.length} items</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="font-semibold text-green-900 mb-2">Dynamic Section Ordering (Frontend):</p>
                  <p className="text-green-800">Frontend reorders sections based on detected intent:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-green-800 ml-2">
                    <li>If query contains "notes/pdf" → Notes section appears first</li>
                    <li>If query contains "test/exam" → Tests section appears first</li>
                    <li>Default order: Videos → Notes → Tests</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Individual Content Scores */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                Individual Content Scores & Ranking
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-4 bg-yellow-50 rounded-lg mb-4 border-l-4 border-yellow-500">
                  <p className="text-yellow-900 font-medium mb-2">
                    ⚠️ Note: Currently showing mock search results (pre-Elasticsearch implementation)
                  </p>
                  <p className="text-yellow-800 text-xs">
                    Once Elasticsearch is integrated with the Match Type Scoring model, this will show the actual Elasticsearch relevance scores instead of mock scoring.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg mb-4">
                  <p className="text-slate-700 font-medium">
                    Below are all content items sorted by their final score. Each item shows how it was scored and why it ranked where it did.
                  </p>
                </div>
                
                {/* Content Results with Scores */}
                <div className="space-y-3 max-h-[500px] overflow-y-auto overflow-x-hidden pr-2">
                  {results
                    .filter(r => r.kind === "CONTENT")
                    .map((result, index) => {
                      const content = result.item as Content
                      const debug = result.debug
                      const topic = catalog.topics.find(t => t.id === content.topicId)
                      const chapter = topic ? catalog.chapters.find(c => c.id === topic.chapterId) : undefined
                      
                      return (
                        <div key={content.id} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 border border-slate-200 overflow-hidden">
                          {/* Rank Badge */}
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            index === 0 ? 'bg-yellow-400 text-yellow-900' :
                            index === 1 ? 'bg-gray-300 text-gray-900' :
                            index === 2 ? 'bg-orange-400 text-orange-900' :
                            'bg-slate-200 text-slate-700'
                          }`}>
                            #{index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-slate-900 mb-1 break-words">{content.title}</h4>
                                <p className="text-xs text-slate-600 break-words">
                                  {topic?.name} • {chapter?.name} • {content.type.replace(/_/g, ' ')}
                                </p>
                              </div>
                              <div className="text-right flex-shrink-0 ml-2">
                                <div className="text-2xl font-bold text-purple-600">{result.score.toFixed(1)}</div>
                                <div className="text-xs text-slate-500">Total Score</div>
                              </div>
                            </div>
                            
                            {/* Free/Premium Badge */}
                            <div className="mb-3">
                              {content.isFree ? (
                                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                                  🟢 Free Content
                                </span>
                              ) : (
                                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                                  💎 Premium Content
                                </span>
                              )}
                            </div>

                            {/* Score Breakdown */}
                            {debug && debug.scores && (
                              <div className="mt-3 p-4 bg-white rounded-lg border border-slate-200 overflow-hidden">
                                <h4 className="font-bold text-slate-800 mb-3 break-words">Score Breakdown (Match Type Scoring):</h4>

                                {/* Match Type Calculation - Document-Level */}
                                <div className="text-sm border p-4 rounded-lg bg-slate-50 overflow-hidden">
                                  <p className="font-semibold text-slate-700 mb-3 text-base break-words">Match Type Analysis (Across All Fields)</p>
                                  <p className="text-xs text-slate-600 mb-3 italic break-words">
                                    Counts how many times the QUERY appears (not other words). 
                                    Example: "photosynthesis" → counts "photosynthesis" and its Bengali translation "আলোকসংশ্লেষণ", not "Pro" or other words.
                                  </p>
                                  
                                  {(() => {
                                    // Use match type counters from debug info
                                    const exactPhraseOccurrences = debug.exactPhraseMatches || 0;
                                    const directTokenOccurrences = debug.directTokenMatches || 0;
                                    const synonymOccurrences = debug.synonymMatches || 0;
                                    const partialOccurrences = debug.partialMatches || 0;
                                    const fuzzyOccurrences = debug.fuzzyMatches || 0;
                                    
                                    // Calculate scores
                                    const exactPhraseScore = exactPhraseOccurrences * 10.0;
                                    const directTokenScore = directTokenOccurrences * 8.0;
                                    const synonymScore = synonymOccurrences * 5.0;
                                    const partialScore = partialOccurrences * 3.0;
                                    const fuzzyScore = fuzzyOccurrences * 1.0;
                                    
                                    const totalMatchScore = exactPhraseScore + directTokenScore + synonymScore + partialScore + fuzzyScore;
                                    
                                    return (
                                      <>
                                        <div className="space-y-2">
                                          {/* Exact Phrase Match */}
                                          <div className="flex items-center gap-2">
                                            <span className="font-medium text-slate-600 flex-1 min-w-[200px]">🎯 Exact Phrase Match</span>
                                            <span className="text-slate-500 text-xs text-center whitespace-nowrap">{exactPhraseOccurrences} occurrence{exactPhraseOccurrences === 1 ? '' : 's'}</span>
                                            <span className="text-slate-500 text-xs text-center whitespace-nowrap">× 10.0</span>
                                            <span className="font-bold text-slate-800 text-right text-base whitespace-nowrap min-w-[60px] flex-shrink-0">{exactPhraseScore.toFixed(1)}</span>
                                          </div>
                                          
                                          {/* Direct Full-Token Match */}
                                          <div className="flex items-center gap-2">
                                            <span className="font-medium text-slate-600 flex-1 min-w-[200px]">✅ Direct Full-Token Match</span>
                                            <span className="text-slate-500 text-xs text-center whitespace-nowrap">{directTokenOccurrences} occurrence{directTokenOccurrences === 1 ? '' : 's'}</span>
                                            <span className="text-slate-500 text-xs text-center whitespace-nowrap">× 8.0</span>
                                            <span className="font-bold text-slate-800 text-right text-base whitespace-nowrap min-w-[60px] flex-shrink-0">{directTokenScore.toFixed(1)}</span>
                                          </div>
                                          
                                          {/* Synonym/Translation Match */}
                                          <div className="flex items-center gap-2">
                                            <span className="font-medium text-slate-600 flex-1 min-w-[200px]">🔄 Synonym/Translation Match</span>
                                            <span className="text-slate-500 text-xs text-center whitespace-nowrap">{synonymOccurrences} occurrence{synonymOccurrences === 1 ? '' : 's'}</span>
                                            <span className="text-slate-500 text-xs text-center whitespace-nowrap">× 5.0</span>
                                            <span className="font-bold text-slate-800 text-right text-base whitespace-nowrap min-w-[60px] flex-shrink-0">{synonymScore.toFixed(1)}</span>
                                          </div>
                                          
                                          {/* Partial/Prefix Match */}
                                          <div className="flex items-center gap-2">
                                            <span className="font-medium text-slate-600 flex-1 min-w-[200px]">🔤 Partial/Prefix Match</span>
                                            <span className="text-slate-500 text-xs text-center whitespace-nowrap">{partialOccurrences} occurrence{partialOccurrences === 1 ? '' : 's'}</span>
                                            <span className="text-slate-500 text-xs text-center whitespace-nowrap">× 3.0</span>
                                            <span className="font-bold text-slate-800 text-right text-base whitespace-nowrap min-w-[60px] flex-shrink-0">{partialScore.toFixed(1)}</span>
                                          </div>
                                          
                                          {/* Fuzzy/Typo Match */}
                                          <div className="flex items-center gap-2">
                                            <span className="font-medium text-slate-600 flex-1 min-w-[200px]">⚡ Fuzzy/Typo Match</span>
                                            <span className="text-slate-500 text-xs text-center whitespace-nowrap">{fuzzyOccurrences} occurrence{fuzzyOccurrences === 1 ? '' : 's'}</span>
                                            <span className="text-slate-500 text-xs text-center whitespace-nowrap">× 1.0</span>
                                            <span className="font-bold text-slate-800 text-right text-base whitespace-nowrap min-w-[60px] flex-shrink-0">{fuzzyScore.toFixed(1)}</span>
                                          </div>
                                        </div>
                                        
                                        {/* Subtotal - Match Type Score */}
                                        <div className="border-t my-3"></div>
                                        <div className="flex items-center gap-2">
                                          <span className="font-bold text-slate-800 flex-1 min-w-[200px]">Total Match Score (Base Score)</span>
                                          <span className="font-extrabold text-lg text-blue-600 text-right whitespace-nowrap min-w-[60px] flex-shrink-0">{totalMatchScore.toFixed(1)}</span>
                                        </div>
                                      </>
                                    );
                                  })()}
                                </div>

                                {/* Boosts Section */}
                                <div className="text-sm border p-3 rounded-lg bg-slate-50 mt-4">
                                  <p className="font-semibold text-slate-700 mb-2 text-base">Boosts</p>
                                  <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                      <span className="font-medium text-slate-600">Free Content Boost</span>
                                      <span className="font-bold text-green-600 text-right">{debug.freeContentBoost ? '+0.5' : '0'}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="font-medium text-slate-600">Content Type Boost</span>
                                      <span className="font-bold text-green-600 text-right">+{debug.contentTypeBoost.toFixed(1)}</span>
                                    </div>
                                  </div>
                                  <div className="border-t my-2"></div>
                                  <div className="flex justify-between items-center">
                                    <span className="font-bold text-slate-800">Total Boosts</span>
                                    <span className="font-extrabold text-lg text-green-600 text-right">
                                      {(debug.freeContentBoost ? 0.5 : 0) + debug.contentTypeBoost}
                                    </span>
                                  </div>
                                </div>

                                {/* Final Score */}
                                <div className="mt-4 text-center p-3 bg-blue-50 rounded-lg">
                                  <p className="text-sm font-semibold">
                                    Final Score = Match Type Score + Boosts = 
                                    <span className="text-xl font-bold text-blue-600"> {(result.score.toFixed(1))}</span>
                                  </p>
                                  <p className="text-xs text-slate-600 mt-1">
                                    (This is the ranking score used to sort results)
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Why This Rank */}
                            {debug && (
                              <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded border-l-4 border-purple-500">
                                <p className="text-xs font-semibold text-purple-900 mb-1">💡 Why this rank?</p>
                                <p className="text-xs text-slate-700">
                                  {index === 0 && "🏆 Highest score! "}
                                  {(debug.exactPhraseMatches ?? 0) > 0 && "🎯 Exact phrase match. "}
                                  {(debug.directTokenMatches ?? 0) > 0 && `✅ ${debug.directTokenMatches} direct token match${(debug.directTokenMatches ?? 0) > 1 ? 'es' : ''}. `}
                                  {(debug.synonymMatches ?? 0) > 0 && `🔄 ${debug.synonymMatches} synonym/translation match${(debug.synonymMatches ?? 0) > 1 ? 'es' : ''}. `}
                                  {(debug.partialMatches ?? 0) > 0 && `🔤 ${debug.partialMatches} partial/prefix match${(debug.partialMatches ?? 0) > 1 ? 'es' : ''}. `}
                                  {(debug.fuzzyMatches ?? 0) > 0 && `⚡ ${debug.fuzzyMatches} fuzzy match${(debug.fuzzyMatches ?? 0) > 1 ? 'es' : ''}. `}
                                  {debug.freeContentBoost && "Free content prioritized (+0.5 boost). "}
                                  {debug.contentTypeBoost > 0 && `Content type boost (+${debug.contentTypeBoost.toFixed(1)}). `}
                                  {debug.recencyBoost && "Recent content (+2). "}
                                  {(debug.exactPhraseMatches ?? 0) === 0 && (debug.directTokenMatches ?? 0) === 0 && (debug.synonymMatches ?? 0) === 0 && (debug.partialMatches ?? 0) === 0 && (debug.fuzzyMatches ?? 0) === 0 && "No matches found."}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>

            {/* Results Summary */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-6 shadow-lg text-white">
              <h3 className="font-bold text-xl mb-4">📈 Results Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                  <p className="text-sm opacity-90 mb-1">Total Matches</p>
                  <p className="text-3xl font-bold">{results.length}</p>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                  <p className="text-sm opacity-90 mb-1">Content Items</p>
                  <p className="text-3xl font-bold">{contentResults.length}</p>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                  <p className="text-sm opacity-90 mb-1">Free Content</p>
                  <p className="text-3xl font-bold">{contentResults.filter(c => c.isFree).length}</p>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                  <p className="text-sm opacity-90 mb-1">Premium Content</p>
                  <p className="text-3xl font-bold">{contentResults.filter(c => !c.isFree).length}</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

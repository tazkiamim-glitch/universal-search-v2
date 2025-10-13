"use client"
import { useSearchParams, useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { catalog } from "@/lib/search/mockData"
import { searchAll } from "@/lib/search/score"
import { Content, MixedResult } from "@/lib/search/types"
import { SubjectCard } from "@/components/search/cards/SubjectCard"
import { tokenize } from "@/lib/search/normalize"
import { CONTENT_TYPE_GROUPS } from "@/lib/search/config"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type SectionData = {
  title: string
  emoji: string
  items: Content[]
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
  onSeeAll 
}: { 
  section: SectionData; 
  showAll?: boolean;
  onSeeAll?: () => void;
}) {
  if (section.items.length === 0) return null

  const displayItems = showAll ? section.items : section.items.slice(0, 4)
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

  const filterTabs = ['All', 'Videos', 'Notes', 'Tests', 'Class', 'Program', 'Subject', 'Chapter', 'Topic']

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
  const videos = contentResults.filter(c => (CONTENT_TYPE_GROUPS.videos as readonly string[]).includes(c.type))
  const notes = contentResults.filter(c => (CONTENT_TYPE_GROUPS.notes as readonly string[]).includes(c.type))
  const tests = contentResults.filter(c => (CONTENT_TYPE_GROUPS.tests as readonly string[]).includes(c.type))



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
        {(activeTab === 'All' || activeTab === 'Class') && renderHierarchyResults(classResults, 'Classes', '🏫')}
        {(activeTab === 'All' || activeTab === 'Program') && renderHierarchyResults(programResults, 'Programs', '📚')}
        {(activeTab === 'All' || activeTab === 'Subject') && renderHierarchyResults(subjectResults, 'Subjects', '📖')}
        {(activeTab === 'All' || activeTab === 'Chapter') && renderHierarchyResults(chapterResults, 'Chapters', '📄')}
        {(activeTab === 'All' || activeTab === 'Topic') && renderHierarchyResults(topicResults, 'Topics', '🔍')}

        {/* Content Sections */}
        {(activeTab === 'All' || activeTab === 'Videos' || activeTab === 'Notes' || activeTab === 'Tests') && (
          <section className="space-y-6">
            {filteredSections.map((section, idx) => (
              <Section 
                key={`section-${idx}`}
                section={section}
                showAll={expandedSections.has(`section-${idx}`)}
                onSeeAll={() => handleSeeAll(`section-${idx}`)}
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              🔍 Search Algorithm Breakdown
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
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
                Step 3: Content Matching
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="font-semibold text-blue-900 mb-2">What is "Searchable Context"?</p>
                  <p className="text-blue-800 mb-2">
                    For each piece of content, we create a combined text string that includes:
                  </p>
                  <div className="bg-white rounded p-3 space-y-1 text-blue-900">
                    <div>📌 <strong>Content Title</strong> - The actual name of the video/note/test</div>
                    <div>📚 <strong>Topic Name</strong> - The specific topic (e.g., "Photosynthesis")</div>
                    <div>📖 <strong>Chapter Name</strong> - The chapter it belongs to (e.g., "Plant Biology")</div>
                    <div>🎓 <strong>Subject Name</strong> - The subject (e.g., "Biology")</div>
                  </div>
                  <p className="text-blue-800 mt-2">
                    This allows matching not just the title, but also the broader academic context!
                  </p>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <p className="font-semibold text-orange-900 mb-2">Matching Strategy:</p>
                  <ul className="list-disc list-inside space-y-1 text-orange-800">
                    <li><strong>Exact Title Match:</strong> Token appears in content title (Weight: 10)</li>
                    <li><strong>Searchable Context Match:</strong> Token in topic/chapter/subject (Weight: 8)</li>
                    <li><strong>Partial Match:</strong> Token partially matches words (Weight: 6)</li>
                    <li><strong>Fuzzy Match:</strong> Similar words with typo tolerance (Weight: 3)</li>
                  </ul>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="font-semibold text-yellow-900 mb-2">Minimum Match Threshold:</p>
                  <p className="text-yellow-800">Content must match at least 30% of query tokens to be included in results</p>
                </div>
              </div>
            </div>

            {/* Step 4: Scoring & Ranking */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Step 4: Scoring & Ranking
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                  <p className="font-semibold text-indigo-900 mb-3">Scoring Components:</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-white rounded">
                      <span className="text-indigo-800">Base Match Score</span>
                      <span className="font-mono font-bold text-indigo-600">0-100</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded">
                      <span className="text-indigo-800">Free Content Boost</span>
                      <span className="font-mono font-bold text-green-600">+5</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded">
                      <span className="text-indigo-800">Content Type Boost (Live Class)</span>
                      <span className="font-mono font-bold text-blue-600">+3</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded">
                      <span className="text-indigo-800">Content Type Boost (Recorded/Smart Note)</span>
                      <span className="font-mono font-bold text-blue-600">+2</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded">
                      <span className="text-indigo-800">Recency Boost (Recent content)</span>
                      <span className="font-mono font-bold text-purple-600">+2</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="font-semibold text-green-900 mb-2">Final Ranking:</p>
                  <p className="text-green-800">Results are sorted by total score (highest first), then by:</p>
                  <ol className="list-decimal list-inside mt-2 space-y-1 text-green-800 ml-2">
                    <li>Free content appears before premium content</li>
                    <li>Content type priority (Live {'>'} Recorded {'>'} Animated)</li>
                    <li>Recency (newer content ranked higher)</li>
                    <li>Popularity (views count as tie-breaker)</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Step 5: Grouping & Display */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-2xl">📦</span>
                Step 5: Grouping & Display
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
                  <p className="font-semibold text-pink-900 mb-2">Content Grouping:</p>
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    <div className="p-3 bg-white rounded-lg text-center">
                      <p className="text-2xl mb-1">🎥</p>
                      <p className="font-bold text-pink-700">Videos</p>
                      <p className="text-xs text-slate-600 mt-1">{videos.length} items</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg text-center">
                      <p className="text-2xl mb-1">📄</p>
                      <p className="font-bold text-pink-700">Notes & PDFs</p>
                      <p className="text-xs text-slate-600 mt-1">{notes.length} items</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg text-center">
                      <p className="text-2xl mb-1">🧪</p>
                      <p className="font-bold text-pink-700">Tests</p>
                      <p className="text-xs text-slate-600 mt-1">{tests.length} items</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="font-semibold text-blue-900 mb-2">Dynamic Section Ordering:</p>
                  <p className="text-blue-800">Section order changes based on detected intent:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-blue-800 ml-2">
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
                <div className="p-4 bg-slate-50 rounded-lg mb-4">
                  <p className="text-slate-700 font-medium">
                    Below are all content items sorted by their final score. Each item shows how it was scored and why it ranked where it did.
                  </p>
                </div>
                
                {/* Content Results with Scores */}
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {results
                    .filter(r => r.kind === "CONTENT")
                    .map((result, index) => {
                      const content = result.item as Content
                      const debug = result.debug
                      const topic = catalog.topics.find(t => t.id === content.topicId)
                      const chapter = topic ? catalog.chapters.find(c => c.id === topic.chapterId) : undefined
                      
                      return (
                        <div key={content.id} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 border border-slate-200">
                          {/* Rank Badge */}
                          <div className="flex items-start gap-3 mb-3">
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                              index === 0 ? 'bg-yellow-400 text-yellow-900' :
                              index === 1 ? 'bg-gray-300 text-gray-900' :
                              index === 2 ? 'bg-orange-400 text-orange-900' :
                              'bg-slate-200 text-slate-700'
                            }`}>
                              #{index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <div>
                                  <h4 className="font-bold text-slate-900 mb-1">{content.title}</h4>
                                  <p className="text-xs text-slate-600">
                                    {topic?.name} • {chapter?.name} • {content.type.replace(/_/g, ' ')}
                                  </p>
                                </div>
                                <div className="text-right">
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
                              {debug && (
                                <div className="space-y-2 mt-3 p-3 bg-white rounded-lg border border-slate-200">
                                  <p className="font-semibold text-slate-700 mb-2">Score Breakdown:</p>
                                  
                                  <div className="grid grid-cols-2 gap-2">
                                    {/* Matched Tokens */}
                                    <div className="col-span-2 p-2 bg-blue-50 rounded">
                                      <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs text-blue-900 font-medium">Matched Tokens:</span>
                                      </div>
                                      <div className="flex flex-wrap gap-1">
                                        {debug.matchedTokens && debug.matchedTokens.length > 0 ? (
                                          debug.matchedTokens.map((token: string, i: number) => (
                                            <span key={i} className="px-2 py-0.5 bg-blue-200 text-blue-900 rounded-full text-xs font-mono">
                                              {token}
                                            </span>
                                          ))
                                        ) : (
                                          <span className="text-xs text-blue-700">None</span>
                                        )}
                                      </div>
                                    </div>

                                    {/* Title Matches */}
                                    <div className="p-2 bg-purple-50 rounded">
                                      <div className="text-xs text-purple-900 font-medium">Title Matches</div>
                                      <div className="text-lg font-bold text-purple-700">{debug.titleMatches || 0}</div>
                                    </div>

                                    {/* Searchable Matches */}
                                    <div className="p-2 bg-indigo-50 rounded">
                                      <div className="text-xs text-indigo-900 font-medium">Searchable Matches</div>
                                      <div className="text-lg font-bold text-indigo-700">{debug.searchableMatches || 0}</div>
                                    </div>

                                    {/* Free Content Boost */}
                                    <div className={`p-2 rounded ${debug.freeContentBoost ? 'bg-green-50' : 'bg-gray-50'}`}>
                                      <div className={`text-xs font-medium ${debug.freeContentBoost ? 'text-green-900' : 'text-gray-600'}`}>
                                        Free Content Boost
                                      </div>
                                      <div className={`text-lg font-bold ${debug.freeContentBoost ? 'text-green-700' : 'text-gray-500'}`}>
                                        {debug.freeContentBoost ? '+5' : '0'}
                                      </div>
                                    </div>

                                    {/* Content Type Boost */}
                                    <div className="p-2 bg-yellow-50 rounded">
                                      <div className="text-xs text-yellow-900 font-medium">Content Type Boost</div>
                                      <div className="text-lg font-bold text-yellow-700">+{debug.contentTypeBoost || 0}</div>
                                    </div>

                                    {/* Recency Boost */}
                                    <div className={`p-2 rounded ${debug.recencyBoost ? 'bg-pink-50' : 'bg-gray-50'}`}>
                                      <div className={`text-xs font-medium ${debug.recencyBoost ? 'text-pink-900' : 'text-gray-600'}`}>
                                        Recency Boost
                                      </div>
                                      <div className={`text-lg font-bold ${debug.recencyBoost ? 'text-pink-700' : 'text-gray-500'}`}>
                                        {debug.recencyBoost ? '+2' : '0'}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Searchable Context */}
                                  <div className="mt-3 p-2 bg-slate-100 rounded">
                                    <div className="text-xs text-slate-700 font-medium mb-1">
                                      🔍 Searchable Context:
                                      <span className="ml-2 text-slate-500 font-normal">(Combined text used for matching)</span>
                                    </div>
                                    <div className="text-xs text-slate-600 break-words">
                                      <span className="font-semibold text-slate-700">Includes: </span>
                                      Title + Topic + Chapter + Subject
                                    </div>
                                    <div className="mt-2 p-2 bg-white rounded border border-slate-200">
                                      <div className="text-xs text-slate-600 font-mono break-all">
                                        {debug.searchableString || 'N/A'}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Why This Rank */}
                                  <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded border-l-4 border-purple-500">
                                    <p className="text-xs font-semibold text-purple-900 mb-1">💡 Why this rank?</p>
                                    <p className="text-xs text-slate-700">
                                      {index === 0 && "🏆 Highest score! "}
                                      {debug.titleMatches > 0 && `Strong title match (${debug.titleMatches} tokens). `}
                                      {debug.searchableMatches > 0 && `Found in topic/chapter context (${debug.searchableMatches} matches). `}
                                      {debug.freeContentBoost && "Free content prioritized (+5 boost). "}
                                      {debug.contentTypeBoost > 0 && `High-value content type (+${debug.contentTypeBoost}). `}
                                      {debug.recencyBoost && "Recent content (+2). "}
                                      {!debug.titleMatches && !debug.searchableMatches && "Matched through fuzzy/partial matching."}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
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

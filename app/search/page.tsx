"use client"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect, useCallback, useMemo } from "react"
import SearchEntryScreen from "@/components/search/SearchEntryScreen"
import SearchResultsScreen from "@/components/search/SearchResultsScreen"
import SearchSection from "@/components/search/SearchSection"
import SearchResultCard, { VideoResultCard } from "@/components/search/SearchResultCard"
import FloatingAIButton from "@/components/ui/FloatingAIButton"
import { Button } from "@/components/ui/button"
import { Bot } from "lucide-react"
import { Content, Subject, Chapter, Topic } from "@/lib/search/types"
import { mockQueryResults } from "@/lib/search/mockQueryResults"
import { VideoCard } from "@/components/search/cards/VideoCard"
import { ContentCard } from "@/components/search/cards/ContentCard"
import { TestCard } from "@/components/search/cards/TestCard"
import { NoteCard } from "@/components/search/cards/NoteCard"
import { TopicCard } from "@/components/search/cards/TopicCard"
import { catalog } from "@/lib/search/mockData"
import { tokenize } from "@/lib/search/normalize"

const RECENTS_KEY = "recentSearches"
const MAX_RECENTS = 8

const trendingSeeds = [
  "Biology all",
  "Photosynthesis",
  "নিউটনের গতি-সূত্র",
  "Quadratic Roots",
  "বাংলা ১ম পত্র",
  "Algebra",
]

const shortcuts = [
  "Biology videos",
  "গণিত notes",
  "Physics classes", 
  "Admission model test",
  "Photosynthesis quiz",
]

export default function Page() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams?.get("q") ?? ""
  
  const [searchState, setSearchState] = useState<{ query: string; results: Content[] }>({ query: initialQuery, results: [] })
  const [activeTab, setActiveTab] = useState("All")
  const [recents, setRecents] = useState<string[]>([])
  const [clickedItem, setClickedItem] = useState<string | null>(null)
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null)
  const router = useRouter()

  // Initialize recent searches
  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENTS_KEY)
      if (raw) setRecents(JSON.parse(raw))
    } catch {}
  }, [])

  const persistRecent = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return
    setRecents(prev => {
      const next = [searchQuery, ...prev.filter(x => x !== searchQuery)].slice(0, MAX_RECENTS)
      try { localStorage.setItem(RECENTS_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const findContentsByHierarchy = useCallback((query: string): Content[] => {
    const tokens = tokenize(query).map((t) => t.toLowerCase())
    if (!tokens.length) return []

    const topicMatches: Topic[] = catalog.topics.filter((t) => {
      const hay = `${t.name} ${t.tokens.join(" ")}`.toLowerCase()
      return tokens.every((tok) => hay.includes(tok))
    })
    if (topicMatches.length > 0) {
      const topicIds = new Set(topicMatches.map((t) => t.id))
      return catalog.contents.filter((c) => topicIds.has(c.topicId))
    }

    const chapterMatches: Chapter[] = catalog.chapters.filter((c) => {
      const hay = `${c.name} ${c.tokens.join(" ")}`.toLowerCase()
      return tokens.every((tok) => hay.includes(tok))
    })
    if (chapterMatches.length > 0) {
      const chapterIds = new Set(chapterMatches.map((c) => c.id))
      const topicIds = new Set(
        catalog.topics.filter((t) => chapterIds.has(t.chapterId)).map((t) => t.id)
      )
      return catalog.contents.filter((c) => topicIds.has(c.topicId))
    }

    const subjectMatches: Subject[] = catalog.subjects.filter((s) => {
      const hay = `${s.name} ${s.paper ?? ""} ${s.tokens.join(" ")}`.toLowerCase()
      return tokens.every((tok) => hay.includes(tok))
    })
    if (subjectMatches.length > 0) {
      const subjectIds = new Set(subjectMatches.map((s) => s.id))
      const chapterIds = new Set(
        catalog.chapters.filter((c) => subjectIds.has(c.subjectId)).map((c) => c.id)
      )
      const topicIds = new Set(
        catalog.topics.filter((t) => chapterIds.has(t.chapterId)).map((t) => t.id)
      )
      return catalog.contents.filter((c) => topicIds.has(c.topicId))
    }

    return []
  }, [])

  const handleSearch = useCallback((searchQuery: string) => {
    const trimmed = (searchQuery || "").trim()
    const isBioAll = trimmed.toLowerCase() === "biology all"
    const results = isBioAll
      ? catalog.contents
      : (mockQueryResults.get(trimmed) ?? findContentsByHierarchy(trimmed))
    setSearchState({ query: trimmed, results })
    persistRecent(trimmed)
    setActiveTab("All")
    try {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`)
    } catch {}
  }, [persistRecent, router, findContentsByHierarchy])

  const flashAndRun = useCallback((label: string) => {
    setClickedItem(label)
    setTimeout(() => setClickedItem(null), 220)
    handleSearch(label)
  }, [handleSearch])

  useEffect(() => {
    if (initialQuery.trim()) {
      // Populate results if the page was loaded with a query param
      const isBioAll = initialQuery.trim().toLowerCase() === "biology all"
      const results = isBioAll ? catalog.contents : (mockQueryResults.get(initialQuery.trim()) ?? [])
      setSearchState({ query: initialQuery.trim(), results })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showWelcome = searchState.query.trim().length === 0
  const isBiologyAll = searchState.query.trim().toLowerCase() === "biology all"

  const topicMatches = useMemo(() => {
    const tokens = tokenize(searchState.query)
    if (!tokens.length) return [] as { id: string; breadcrumb: string }[]
    const chaptersById = new Map(catalog.chapters.map(c => [c.id, c]))
    const subjectsById = new Map(catalog.subjects.map(s => [s.id, s]))
    const lowerTokens = tokens.map(t => t.toLowerCase())
    const matches = catalog.topics.filter(t => {
      const hay = `${t.name} ${t.tokens.join(" ")}`.toLowerCase()
      return lowerTokens.every(tok => hay.includes(tok))
    })
    return matches.map(t => {
      const ch = chaptersById.get(t.chapterId)
      const sub = ch ? subjectsById.get(ch.subjectId) : undefined
      const chapterText = ch?.index ? `Chapter ${ch.index}` : (ch?.name ?? "Chapter")
      const subjectText = sub?.name ?? "Subject"
      const breadcrumb = `${t.name} → ${subjectText} → ${chapterText}`
      return { id: t.id, breadcrumb }
    })
  }, [searchState.query])

  const renderItem = (item: Content) => {
    const videoTypes: Content["type"][] = ["LIVE_CLASS","RECORDED_CLASS","ANIMATED_VIDEO","GUIDELINE_VIDEO","STORY"]
    const testTypes: Content["type"][] = ["QUIZ","CQ_EXAM","MODEL_TEST","LIVE_EXAM"]
    if (videoTypes.includes(item.type)) {
      return <VideoCard key={item.id} item={item} />
    }
    if (testTypes.includes(item.type)) {
      return <TestCard key={item.id} item={item} />
    }
    return <ContentCard key={item.id} content={item} />
  }

  const subjects = useMemo(() => catalog.subjects, [])
  const selectedSubject = useMemo(() => subjects.find(s => s.id === selectedSubjectId) ?? null, [subjects, selectedSubjectId])
  const popularChapters = useMemo(() => {
    if (!selectedSubject) return [] as string[]
    return catalog.chapters
      .filter(c => c.subjectId === selectedSubject.id)
      .map(c => c.name)
  }, [selectedSubject])
  const trendingTopicsForSubject = useMemo(() => {
    if (!selectedSubject) return [] as string[]
    const chapterIds = new Set(catalog.chapters.filter(c => c.subjectId === selectedSubject.id).map(c => c.id))
    return catalog.topics
      .filter(t => chapterIds.has(t.chapterId))
      .map(t => t.name)
  }, [selectedSubject])

  const handleSubjectClick = useCallback((subjectId: string) => {
    setSelectedSubjectId(subjectId)
    const s = catalog.subjects.find(x => x.id === subjectId)
    const display = s ? (s.paper ? `${s.name} ${s.paper}` : s.name) : ""
    setSearchState(prev => ({ ...prev, query: display }))
  }, [])

  return (
    <div className="w-full">
          {showWelcome ? (
            <SearchEntryScreen
              query={searchState.query}
              onQueryChange={(q) => setSearchState((prev) => ({ ...prev, query: q }))}
              onSearch={handleSearch}
              recentSearches={recents}
              trendingSearches={trendingSeeds}
              quickShortcuts={shortcuts}
              clickedItem={clickedItem}
              subjects={subjects}
              onSubjectClick={handleSubjectClick}
              selectedSubjectId={selectedSubjectId}
              subjectPopularChapters={popularChapters}
              subjectTrendingTopics={trendingTopicsForSubject}
            />
          ) : (
            <SearchResultsScreen
              query={searchState.query}
              onQueryChange={(q) => setSearchState((prev) => ({ ...prev, query: q }))}
              onSearch={handleSearch}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            >
              {/* Render content based on active tab */}
              {activeTab === "All" && (
                <>
                  {topicMatches.length > 0 && (
                    <SearchSection title="TOPICS" icon="💡" onSeeAll={() => setActiveTab("Topics")} itemCount={topicMatches.length}>
                      <div className="space-y-3">
                        {topicMatches.slice(0,3).map(tm => (
                          <TopicCard
                            key={tm.id}
                            topic={catalog.topics.find(t => t.id === tm.id)!}
                            breadcrumb={tm.breadcrumb}
                            onOpen={() => router.push(`/topic/${tm.id}`)}
                          />
                        ))}
                      </div>
                    </SearchSection>
                  )}

                  {(() => {
                    const live = searchState.results.filter(r => r.type === "LIVE_CLASS")
                    const videos = searchState.results.filter(r => ["RECORDED_CLASS","ANIMATED_VIDEO","GUIDELINE_VIDEO","STORY"].includes(r.type))
                    const notes = searchState.results.filter(r => ["PDF_NOTES","SMART_NOTE"].includes(r.type))
                    const tests = searchState.results.filter(r => ["QUIZ","MODEL_TEST","LIVE_EXAM","CQ_EXAM"].includes(r.type))
                    return (
                      <>
                        {live.length > 0 && (
                          <SearchSection title="LIVE CLASSES" icon="🕒" onSeeAll={() => setActiveTab("Classes")} itemCount={live.length}>
                            <div className="space-y-3">
                              {live.slice(0,1).map(it => (
                                <VideoCard key={it.id} item={it} />
                              ))}
                            </div>
                          </SearchSection>
                        )}

                        {videos.length > 0 && (
                          <SearchSection title="VIDEO LESSONS" icon="🎬" onSeeAll={() => setActiveTab("Videos")} itemCount={videos.length}>
                            <div className="space-y-3">
                              {videos.slice(0,3).map(it => (
                                <VideoCard key={it.id} item={it} />
                              ))}
                            </div>
                          </SearchSection>
                        )}

                        {notes.length > 0 && (
                          <SearchSection title="NOTES & PDFs" icon="📄" onSeeAll={() => setActiveTab("Notes")} itemCount={notes.length}>
                            <div className="space-y-3">
                              {notes.slice(0,3).map(it => (
                                <NoteCard key={it.id} item={it} />
                              ))}
                            </div>
                          </SearchSection>
                        )}

                        {tests.length > 0 && (
                          <SearchSection title="QUIZ & TESTS" icon="🧪" onSeeAll={() => setActiveTab("Tests")} itemCount={tests.length}>
                            <div className="space-y-3">
                              {tests.slice(0,3).map(it => (
                                <TestCard key={it.id} item={it} />
                              ))}
                            </div>
                          </SearchSection>
                        )}

                        {topicMatches.length === 0 && live.length === 0 && videos.length === 0 && notes.length === 0 && tests.length === 0 && (
                          <div className="text-center py-8">
                            <p className="text-slate-500">No results found for '{searchState.query}'</p>
                          </div>
                        )}
                      </>
                    )
                  })()}
                </>
              )}

              {/* Videos Tab */}
              {activeTab === "Videos" && (
                <>
                  <SearchSection title="ANIMATED VIDEOS" icon="🎬" itemCount={1}>
                    <VideoResultCard
                      thumbnail="/animatedvideo.jpg"
                      title="Biology Animated Sampler"
                      subtitle="11m"
                      watchCount="8.3 হাজার"
                      buttonText="Watch"
                      buttonVariant="primary"
                      query={searchState.query}
                    />
                  </SearchSection>
                </>
              )}

              {/* Notes Tab */}
              {activeTab === "Notes" && (
                <>
                  <SearchSection title="SMART NOTES" icon="💬" itemCount={1}>
                    <div className="flex items-center gap-4 bg-white rounded-2xl p-3 ring-1 ring-slate-200/50 shadow-sm">
                      <div className="relative flex-shrink-0 w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center">
                        <div className="text-center">
                          <div className="px-2 py-1 bg-purple-500 text-white text-xs font-bold rounded-md">Smart Note</div>
                        </div>
                      </div>
                      <div className="flex-grow space-y-1">
                        <h4 className="font-bold text-slate-800">Biology Smart Notes Index</h4>
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p className="text-xs text-slate-500">1.2 হাজার</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-full text-sm">View</button>
                    </div>
                  </SearchSection>

                  <SearchSection title="PDF NOTES" icon="📄" itemCount={1}>
                    <div className="flex items-center gap-4 bg-white rounded-2xl p-3 ring-1 ring-slate-200/50 shadow-sm">
                      <div className="relative flex-shrink-0 w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center">
                        <div className="text-center text-blue-600">
                          <div className="px-2 py-0.5 bg-blue-100 text-xs font-bold rounded-md mb-1">PDF</div>
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                        </div>
                      </div>
                      <div className="flex-grow space-y-1">
                        <h4 className="font-bold text-slate-800">Biology PDF Summary</h4>
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p className="text-xs text-slate-500">856</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-full text-sm">Read</button>
                    </div>
                  </SearchSection>
                </>
              )}

                            {/* Classes Tab */}
              {activeTab === "Classes" && (
                <>
                  <SearchSection title="LIVE CLASSES" icon="🕒">
                <VideoResultCard
                  thumbnail="/liveclass.webp"
                  title="Live Class – Biology All-in-..."
                  subtitle="8/30/2025, 10:08:31 PM"
                  watchCount="2.5 হাজার"
                  badge="Live"
                  badgeColor="red"
                  buttonText="Join"
                  buttonVariant="success"
                  query={searchState.query}
                />
              </SearchSection>

              <SearchSection title="RECORDED CLASSES" icon="▶️">
                <VideoResultCard
                  thumbnail="/recordedclass.webp"
                  title="Recorded Class – Biology Ove..."
                  subtitle="45m"
                  watchCount="12.5 হাজার"
                  buttonText="Watch"
                  buttonVariant="primary"
                  query={searchState.query}
                />
              </SearchSection>
                </>
              )}

              {/* Tests Tab */}
              {activeTab === "Tests" && (
                <>
                  <SearchSection title="MCQ PRACTICE" icon="🧠">
                    <div className="flex items-center gap-4 bg-white rounded-2xl p-3 ring-1 ring-slate-200/50 shadow-sm">
                      <div className="relative flex-shrink-0 w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center">
                        <img 
                          src="/mcq.jfif" 
                          className="w-full h-full rounded-xl object-cover" 
                          alt="MCQ Practice"
                        />
                      </div>
                      <div className="flex-grow space-y-1">
                        <h4 className="font-bold text-slate-800">Biology Quiz Sampler (15Q - 20m)</h4>
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <p className="text-xs text-slate-500">3.4 হাজার অংশগ্রহণ</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-full text-sm">Start</button>
                    </div>
                  </SearchSection>

                  <SearchSection title="CQ / WRITTEN" icon="✍️">
                    <div className="flex items-center gap-4 bg-white rounded-2xl p-3 ring-1 ring-slate-200/50 shadow-sm">
                      <div className="relative flex-shrink-0 w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center">
                        <div className="px-2 py-1 bg-teal-100 text-teal-800 text-xs font-bold rounded-md">CQ</div>
                      </div>
                      <div className="flex-grow space-y-1">
                        <h4 className="font-bold text-slate-800">CQ Exam – Plant Physiology (30m)</h4>
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <p className="text-xs text-slate-500">1.8 হাজার অংশগ্রহণ</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-teal-600 text-white font-semibold rounded-full text-sm">Start</button>
                    </div>
                  </SearchSection>

                  <SearchSection title="MODEL TESTS / LIVE EXAMS" icon="📊">
                    <div className="flex items-center gap-4 bg-white rounded-2xl p-3 ring-1 ring-slate-200/50 shadow-sm">
                      <div className="relative flex-shrink-0 w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center">
                        <div className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-bold rounded-md">Model</div>
                      </div>
                      <div className="flex-grow space-y-1">
                        <h4 className="font-bold text-slate-800">Model Test – Biology Full Demo</h4>
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <p className="text-xs text-slate-500">5.2 হাজার অংশগ্রহণ</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-teal-600 text-white font-semibold rounded-full text-sm">Start</button>
                    </div>
                    <div className="flex items-center gap-4 bg-white rounded-2xl p-3 ring-1 ring-slate-200/50 shadow-sm">
                      <div className="relative flex-shrink-0 w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center">
                        <div className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-md">Live</div>
                      </div>
                      <div className="flex-grow space-y-1">
                        <h4 className="font-bold text-slate-800">Live Exam – Biology Mix</h4>
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <p className="text-xs text-slate-500">2.1 হাজার অংশগ্রহণ</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full text-sm">Join</button>
                    </div>
                  </SearchSection>
                </>
              )}

              {/* Topics Tab */}
              {activeTab === "Topics" && (
                <SearchSection title="TOPICS" icon="✨">
                  <SearchResultCard
                    icon="💡"
                    subtitle="জীববিজ্ঞান → অধ্যায় ৫: আলোক বিশ্লেষণ"
                    title="Biology All-in-one Demo"
                    query={searchState.query}
                  />
                </SearchSection>
              )}

              {/* Chapters Tab */}
              {activeTab === "Chapters" && (
                <div className="text-center py-8">
                  <p className="text-slate-500">No chapters found for this search.</p>
                </div>
              )}
            </SearchResultsScreen>
          )}
          
          {/* Floating AI Button - only show on search results screen */}
          {!showWelcome && <FloatingAIButton />}
    </div>
  )
}



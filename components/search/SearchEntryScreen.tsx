"use client"
import SearchInput from "./SearchInput"
import SearchChip from "./SearchChip"

interface SearchEntryScreenProps {
  query: string
  onQueryChange: (query: string) => void
  onSearch: (query: string) => void
  recentSearches: string[]
  trendingSearches: string[]
  quickShortcuts: string[]
  clickedItem?: string | null
  subjects?: { id: string; name: string; paper?: string }[]
  onSubjectClick?: (subjectId: string) => void
  selectedSubjectId?: string | null
  subjectPopularChapters?: string[]
  subjectTrendingTopics?: string[]
}

export default function SearchEntryScreen({
  query,
  onQueryChange,
  onSearch,
  recentSearches,
  trendingSearches,
  quickShortcuts,
  clickedItem,
  subjects = [],
  onSubjectClick,
  selectedSubjectId = null,
  subjectPopularChapters = [],
  subjectTrendingTopics = []
}: SearchEntryScreenProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleChipClick = (text: string) => {
    onSearch(text)
  }

  return (
    <div className="w-full p-4 space-y-8">
      {/* Search Input */}
      <form onSubmit={handleSubmit}>
        <SearchInput 
          value={query}
          onChange={onQueryChange}
          placeholder="খুঁজুন বিষয়, অধ্যায়, টপিক..."
        />
      </form>

      {/* Recent Searches Section */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold text-slate-500 uppercase">Recent Searches</h3>
        <div className="flex flex-wrap gap-2">
          {recentSearches.length === 0 ? (
            <div className="text-sm text-slate-500">Searches you make will appear here</div>
          ) : (
            recentSearches.map((search, index) => (
              <SearchChip
                key={`recent-${index}`}
                onClick={() => handleChipClick(search)}
                variant="recent"
                flash={clickedItem === search}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-slate-500"
                >
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span className="text-sm font-medium text-slate-700">{search}</span>
              </SearchChip>
            ))
          )}
        </div>
      </section>

      {/* Trending Section */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold text-slate-500 uppercase">জনপ্রিয় টপিক</h3>
        <div className="flex flex-wrap gap-2">
          {trendingSearches.map((trend, index) => (
            <SearchChip
              key={`trending-${index}`}
              onClick={() => handleChipClick(trend)}
              variant="trending"
              flash={clickedItem === trend}
            >
              <span>🔥</span>
              <span className="text-sm font-medium text-slate-700">{trend}</span>
            </SearchChip>
          ))}
        </div>
      </section>

      {/* Explore by Subject Section */}
      {subjects.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase">Explore by Subject</h3>
          <div className="flex overflow-x-auto gap-2 no-scrollbar pb-1">
            {subjects.map((s) => {
              const label = s.paper ? `${s.name} ${s.paper}` : s.name
              const isActive = selectedSubjectId === s.id
              return (
                <SearchChip
                  key={s.id}
                  onClick={() => onSubjectClick && onSubjectClick(s.id)}
                  variant="shortcut"
                >
                  <span className={`text-sm font-medium ${isActive ? "text-slate-900" : "text-slate-700"}`}>{label}</span>
                </SearchChip>
              )
            })}
          </div>

          {/* Subject Preview (Inline) */}
          {selectedSubjectId && (
            <div className="space-y-4">
              {/* Popular Chapters Carousel */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-600">Popular Chapters</div>
                <div className="flex overflow-x-auto gap-2 no-scrollbar pb-1">
                  {subjectPopularChapters.length === 0 ? (
                    <div className="text-sm text-slate-500">No chapters found.</div>
                  ) : (
                    subjectPopularChapters.map((ch, idx) => (
                      <SearchChip key={`ch-${idx}`} onClick={() => handleChipClick(ch)}>
                        <span className="text-sm font-medium text-slate-700">{ch}</span>
                      </SearchChip>
                    ))
                  )}
                </div>
              </div>

              {/* Trending Topics Carousel */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-600">Trending Topics</div>
                <div className="flex overflow-x-auto gap-2 no-scrollbar pb-1">
                  {subjectTrendingTopics.length === 0 ? (
                    <div className="text-sm text-slate-500">No topics found.</div>
                  ) : (
                    subjectTrendingTopics.map((tp, idx) => (
                      <SearchChip key={`tp-${idx}`} onClick={() => handleChipClick(tp)}>
                        <span className="text-sm font-medium text-slate-700">{tp}</span>
                      </SearchChip>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Quick Shortcuts Section */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold text-slate-500 uppercase">Quick Shortcuts</h3>
        <div className="flex flex-wrap gap-2">
          {quickShortcuts.map((shortcut, index) => (
            <SearchChip
              key={`shortcut-${index}`}
              onClick={() => handleChipClick(shortcut)}
              variant="shortcut"
              flash={clickedItem === shortcut}
            >
              <span className="text-sm font-medium text-slate-700">{shortcut}</span>
            </SearchChip>
          ))}
        </div>
      </section>
    </div>
  )
}

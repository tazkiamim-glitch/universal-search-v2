"use client"
import SearchInput from "./SearchInput"

interface SearchResultsScreenProps {
  query: string
  onQueryChange: (query: string) => void
  onSearch: (query: string) => void
  activeTab: string
  onTabChange: (tab: string) => void
  children: React.ReactNode
}

const tabs = [
  { key: "All", label: "All" },
  { key: "Videos", label: "Videos" },
  { key: "Notes", label: "Notes" },
  { key: "Classes", label: "Classes" },
  { key: "Tests", label: "Tests" },
  { key: "Topics", label: "Topics" },
  { key: "Chapters", label: "Chapters" },
]

export default function SearchResultsScreen({
  query,
  onQueryChange,
  onSearch,
  activeTab,
  onTabChange,
  children
}: SearchResultsScreenProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <div className="w-full h-full flex flex-col relative">
      {/* HEADER SECTION */}
      <div className="p-4 space-y-4 flex-shrink-0">
        {/* Search Input */}
        <form onSubmit={handleSubmit}>
          <SearchInput 
            value={query}
            onChange={onQueryChange}
            placeholder="খুঁজুন বিষয়, অধ্যায়, টপিক..."
          />
        </form>

        {/* Results Info & Filter Tabs */}
        <div>
          <p className="text-sm text-slate-600 mb-3">Showing results for <span className="font-bold">'{query}'</span></p>
          <div className="flex overflow-x-auto space-x-2 no-scrollbar pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap flex-shrink-0 transition-colors ${
                  activeTab === tab.key
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-50 text-slate-700 ring-1 ring-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT SECTIONS - This will be the scrollable area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {children}
      </div>
    </div>
  )
}

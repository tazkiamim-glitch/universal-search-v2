"use client"
import { useMemo, useState } from "react"
import { Home, BookOpen, Inbox, Search as SearchIcon, Bot } from "lucide-react"
import { catalog } from "@/lib/search/mockData"
import { Content } from "@/lib/search/types"
import { ContentCard } from "@/components/search/cards/ContentCard"

function SearchScreen() {
  const [active, setActive] = useState<string>("All")
  const tabs = ["All","Videos","Notes","Classes","Tests"]

  const results: Content[] = useMemo(() => catalog.contents, [])

  const filtered = useMemo(() => {
    switch (active) {
      case "Videos":
        return results.filter((c) => ["ANIMATED_VIDEO","RECORDED_CLASS","GUIDELINE_VIDEO","STORY"].includes(c.type))
      case "Notes":
        return results.filter((c) => ["PDF_NOTES","SMART_NOTE"].includes(c.type))
      case "Classes":
        return results.filter((c) => ["LIVE_CLASS","RECORDED_CLASS"].includes(c.type))
      case "Tests":
        return results.filter((c) => ["MODEL_TEST","CQ_EXAM","QUIZ","LIVE_EXAM"].includes(c.type))
      default:
        return results
    }
  }, [active, results])

  return (
    <div className="px-4 py-3">
      <div className="flex overflow-x-auto space-x-2 no-scrollbar pb-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap flex-shrink-0 transition-colors ${
              active === t ? "bg-slate-900 text-white shadow-sm" : "bg-slate-50 text-slate-700 ring-1 ring-slate-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3">
        {filtered.map((c) => (
          <ContentCard key={c.id} content={c} />
        ))}
      </div>
    </div>
  )
}

export default function AppShellDemo() {
  const [activeTab, setActiveTab] = useState<"home"|"courses"|"inbox"|"search"|"ai">("home")

  const NavItem = ({ id, label, Icon }: { id: typeof activeTab; label: string; Icon: any }) => {
    const active = activeTab === id
    return (
      <button
        onClick={() => setActiveTab(id)}
        className="flex flex-col items-center gap-1"
      >
        <Icon className={`h-6 w-6 ${active ? "text-pink-500" : "text-slate-500"}`} strokeWidth={2} />
        <span className={`text-xs font-bold ${active ? "text-pink-500" : "text-slate-500"}`}>{label}</span>
        <div className={`h-1 w-5 rounded-full mt-1 ${active ? "bg-pink-500" : "bg-transparent"}`} />
      </button>
    )
  }

  return (
    <div className="w-full max-w-md h-[896px] bg-white flex flex-col shadow-2xl rounded-3xl overflow-hidden relative mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="mx-auto max-w-[480px] flex items-center justify-between px-4 py-2">
          <div className="inline-flex items-center">
            <img src="/shikho_icon.png" alt="shikho" className="h-10 w-auto" />
          </div>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 rounded-lg bg-slate-100 text-sm font-semibold text-slate-800 inline-flex items-center">
              ক্লাস ১০ – SSC '26 বিজ্ঞান
              <svg className="ml-2 h-4 w-4 text-slate-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"/>
              </svg>
            </button>
            <img src="/profile.png" alt="Profile" className="w-8 h-8 rounded-full" />
          </div>
        </div>
      </header>

      {/* Main Scrollable Content */}
      <main className="flex-grow overflow-y-auto bg-slate-100">
        {activeTab === "home" && (
          <div className="px-4 pt-6 pb-24">
            <h1 className="text-xl font-extrabold text-slate-900">Welcome to the Homepage</h1>
            <p className="mt-1 text-slate-600">Select tabs below to explore.</p>
          </div>
        )}
        {activeTab === "courses" && (
          <div className="px-4 pt-6 pb-24">
            <h1 className="text-xl font-extrabold text-slate-900">Courses</h1>
            <p className="mt-1 text-slate-600">Course list goes here.</p>
          </div>
        )}
        {activeTab === "inbox" && (
          <div className="px-4 pt-6 pb-24">
            <h1 className="text-xl font-extrabold text-slate-900">Inbox</h1>
            <p className="mt-1 text-slate-600">Your messages will appear here.</p>
          </div>
        )}
        {activeTab === "ai" && (
          <div className="px-4 pt-6 pb-24">
            <h1 className="text-xl font-extrabold text-slate-900">Shikho AI</h1>
            <p className="mt-1 text-slate-600">AI assistant is coming soon.</p>
          </div>
        )}
        {activeTab === "search" && (
          <div className="pb-24">
            <SearchScreen />
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 w-full">
        <div className="px-1 py-2 flex items-center justify-around">
          <NavItem id="home" label="হোম" Icon={Home} />
          <NavItem id="courses" label="কোর্স" Icon={BookOpen} />
          <NavItem id="inbox" label="ইনবক্স" Icon={Inbox} />
          <NavItem id="search" label="সার্চ" Icon={SearchIcon} />
          <NavItem id="ai" label="শিখো AI" Icon={Bot} />
        </div>
      </nav>
    </div>
  )
}




"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"

type TopBarProps = {
  variant?: "home" | "inner"
  title?: string
}

export default function TopBar({ variant = "home", title }: TopBarProps) {
  const router = useRouter()

  if (variant === "inner") {
    return (
      <header className="flex-shrink-0 flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-1 hover:bg-slate-100 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <h1 className="text-xl font-bold text-slate-800">{title}</h1>
        </div>
        <button
          aria-label="Search"
          onClick={() => router.push("/search")}
          className="p-1.5 rounded-full ring-1 ring-gray-300 text-gray-700 hover:bg-gray-50 active:scale-95 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b border-slate-200">
      <div className="mx-auto max-w-[480px] flex items-center justify-between px-4 py-2">
        {/* Left: brand logo image */}
        <Link href="/" className="inline-flex items-center">
          <img src="/shikho_icon.png" alt="shikho" className="h-10 w-auto" />
        </Link>

        {/* Center: class selector with profile icon */}
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
  )
}



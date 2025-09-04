"use client"
import Link from "next/link"
import { Search } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

export default function SearchRow() {
  const [promptIndex, setPromptIndex] = useState(0)
  const prompts = useMemo(
    () => [
      "Search your thoughts...",
      "Find videos, notes, live classes...",
      "Stuck on Algebra? Type here!",
    ],
    [],
  )
  const colorClasses = useMemo(
    () => [
      "bg-gradient-to-r from-purple-500 to-pink-500",
      "bg-gradient-to-r from-sky-500 to-cyan-500",
      "bg-gradient-to-r from-emerald-500 to-teal-500",
      "bg-gradient-to-r from-amber-500 to-orange-500",
    ],
    [],
  )

  useEffect(() => {
    const id = setInterval(() => setPromptIndex((i) => (i + 1) % prompts.length), 4000)
    return () => clearInterval(id)
  }, [prompts.length])

  return (
    <div className="bg-white px-4 pt-4 pb-3">
      <Link href="/search" className="flex items-center justify-between w-full text-left p-3 rounded-xl ring-1 ring-slate-200">
        <span className="text-slate-400">{prompts[promptIndex]}</span>
        <div className="w-8 h-8 rounded-full ring-1 ring-slate-300 flex items-center justify-center">
          <Search className="h-5 w-5 text-slate-500" />
        </div>
      </Link>
    </div>
  )
}



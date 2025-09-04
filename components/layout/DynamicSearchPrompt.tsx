"use client"
import Link from "next/link"
import { Search } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"

type SearchPrompt = { text: string; color: string }

export default function DynamicSearchPrompt() {
  const prompts: SearchPrompt[] = useMemo(
    () => [
      { text: "Search your thoughts...", color: "text-blue-500" },
      { text: "Find live classes...", color: "text-green-500" },
      { text: "Look up notes for Physics...", color: "text-purple-500" },
      { text: 'Try "Photosynthesis Quiz"...', color: "text-orange-500" },
    ],
    [],
  )

  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<"in" | "out">("in")
  const intervalRef = useRef<number | null>(null)
  const durationMs = 350

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setPhase("out")
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % prompts.length)
        setPhase("in")
      }, durationMs)
    }, 4000)
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [prompts.length])

  const current = prompts[index]

  return (
    <div className="pt-0 pb-0">
      <Link href="/paid/search" className="flex items-center justify-between w-full text-left bg-white rounded-2xl shadow-sm border border-slate-200 px-4 py-3">
        <span
          className={
            `text-sm ${current.color} transition-all duration-300 ` +
            `${phase === "in" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`
          }
          key={index}
        >
          {current.text}
        </span>
        <div className="w-8 h-8 rounded-full ring-1 ring-slate-300 flex items-center justify-center">
          <Search className="h-5 w-5 text-slate-500" />
        </div>
      </Link>
    </div>
  )
}



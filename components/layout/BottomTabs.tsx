"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Inbox, Bot, Search } from "lucide-react"

const tabs = [
  { href: "/paid", label: "হোম", icon: Home },
  { href: "/courses", label: "কোর্স", icon: BookOpen },
  { href: "/paid/search", label: "সার্চ", icon: Search },
  { href: "/inbox", label: "ইনবক্স", icon: Inbox },
  { href: "/ai", label: "শিখো AI", icon: Bot },
]

export default function BottomTabs() {
  const pathname = usePathname()
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 bg-white border-t border-slate-200 w-full">
      <div className="px-1 py-2 flex items-center justify-around">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href} className="flex flex-col items-center gap-1">
              <Icon className={`h-6 w-6 ${active ? "text-pink-500" : "text-slate-500"}`} strokeWidth={2} />
              <span className={`text-xs font-bold ${active ? "text-pink-500" : "text-slate-500"}`}>{label}</span>
              <div className={`h-1 w-5 rounded-full mt-1 ${active ? "bg-pink-500" : "bg-transparent"}`}></div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}



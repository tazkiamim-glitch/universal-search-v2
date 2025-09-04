"use client"
import Link from "next/link"
import { Home, BookOpen, Inbox, Search, Bot } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

export default function FreeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const tabs = [
    { href: "/freehomepage", label: "Home", icon: Home },
    { href: "/courses", label: "Courses", icon: BookOpen },
    { href: "/", label: "Search", icon: Search },
    { href: "/inbox", label: "Inbox", icon: Inbox },
    { href: "/ai", label: "Shikho AI", icon: Bot },
  ]

  return (
    <div className="w-full max-w-md h-[85vh] bg-white flex flex-col shadow-2xl rounded-3xl overflow-hidden relative">
      {/* 
        THIS IS THE SCROLLABLE CONTENT AREA.
        `flex-grow` makes it fill the space, and `overflow-y-auto` makes IT scroll, not the whole page.
      */}
      <main className="flex-grow overflow-y-auto pb-24 no-scrollbar bg-slate-100">
        <div className="px-0 pt-2 pb-4">
          {children}
        </div>
      </main>
      
      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-slate-200">
        <div className="px-2 py-2 grid grid-cols-5">
          {tabs.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <button
                key={href}
                onClick={() => router.push(href)}
                className="flex flex-col items-center gap-1"
              >
                <Icon className={`h-6 w-6 ${active ? "text-pink-500" : "text-slate-500"}`} strokeWidth={2} />
                <span className={`text-xs font-bold ${active ? "text-pink-500" : "text-slate-500"}`}>{label}</span>
                <div className={`h-1 w-5 rounded-full mt-1 ${active ? "bg-pink-500" : "bg-transparent"}`}></div>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}



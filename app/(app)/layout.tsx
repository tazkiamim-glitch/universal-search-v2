"use client"
import TopBar from "@/components/layout/TopBar"
import BottomTabs from "@/components/layout/BottomTabs"

import React from "react"
import { usePathname } from "next/navigation"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isCoursesPage = pathname === "/courses"
  const isProgramPage = pathname.startsWith("/program/")
  
  return (
    <div className="w-full max-w-md h-screen bg-white flex flex-col shadow-2xl rounded-3xl overflow-hidden relative">
      {!isCoursesPage && !isProgramPage && <TopBar />}
      
      {/* 
        THIS IS THE SCROLLABLE CONTENT AREA.
        `flex-grow` makes it fill the space, and `overflow-y-auto` makes IT scroll, not the whole page.
      */}
      <main className="flex-grow overflow-y-auto pb-24 no-scrollbar bg-slate-100">
        <div className={isCoursesPage || isProgramPage ? "p-0" : "px-0 pt-2 pb-4"}>
          {children}
        </div>
      </main>
      
      <BottomTabs />

    </div>
  )
}



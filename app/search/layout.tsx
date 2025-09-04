"use client"
import TopBar from "@/components/layout/TopBar"
import BottomTabs from "@/components/layout/BottomTabs"
import React from "react"
import { usePathname } from "next/navigation"

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <div className="w-full max-w-md h-[896px] bg-white flex flex-col shadow-2xl rounded-3xl relative">
      <TopBar variant="inner" title="Search" />
      
      {/* 
        THIS IS THE SCROLLABLE CONTENT AREA.
        `flex-grow` makes it fill the space, and `overflow-y-auto` makes IT scroll, not the whole page.
      */}
      <main className="flex-grow overflow-y-auto pb-24 no-scrollbar">
        {children}
      </main>
      
      <BottomTabs />
    </div>
  )
}

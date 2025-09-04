"use client"
import SubjectGrid from "@/components/sections/SubjectGrid"
import { subjectsByProgram, myCourses } from "@/lib/mock/courses"
import TopBar from "@/components/layout/TopBar"
import { use } from "react"

export default function ProgramPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const subjects = subjectsByProgram[id] || []
  const course = myCourses.find(c => c.id === id)
  const title = course?.title || "কোর্স"
  
  return (
    <div className="flex flex-col h-full">
      <TopBar variant="inner" title={title} />
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 py-4 space-y-6">
          <div className="inline-flex items-center gap-2 text-sm">
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">কোয়ার্টার ৩</span>
            <span className="text-slate-500">জুলাই ২৫ – সেপ্টেম্বর ২৫</span>
          </div>
          <button className="w-full rounded-xl bg-blue-600 text-white py-3 shadow">
            কোয়ার্টারের সিলেবাস দেখো না →
          </button>
          <SubjectGrid subjects={subjects} />
        </div>
      </div>
    </div>
  )
}



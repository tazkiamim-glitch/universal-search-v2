"use client"
import MyCourses from "@/components/sections/MyCourses"
import TopBar from "@/components/layout/TopBar"

export default function CoursesPage() {
  return (
    <div className="flex flex-col h-full">
      <TopBar variant="inner" title="কোর্স" />
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <MyCourses />
        </div>
      </div>
    </div>
  )
}



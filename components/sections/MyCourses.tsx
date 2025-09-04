"use client"
import CourseBannerCard from "@/components/cards/CourseBannerCard"
import { myCourses } from "@/lib/mock/courses"

export default function MyCourses() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold text-slate-800">আমার কোর্স</h2>
      <div className="space-y-4">
        {myCourses.map((c) => (
          <CourseBannerCard
            key={c.id}
            title={c.title}
            badge={c.badge as any}
            cta={c.cta as any}
            image={c.banner}
          />
        ))}
      </div>
    </section>
  )
}



import HomeworkCard from "@/components/cards/HomeworkCard"
import { homework } from "@/lib/mock/home"

export default function Homework() {
  return (
    <section className="space-y-3">
      {/* Heading directly on page background */}
      <h2 className="text-xl font-semibold text-slate-800 tracking-tight">তোমার হোমওয়ার্ক</h2>
      {/* Only rows are cards (single layer) */}
      <div className="flex flex-col gap-4">
        {homework.map((h) => (
          <HomeworkCard key={h.id} title={h.title} countdown={h.countdown} />
        ))}
      </div>
    </section>
  )
}



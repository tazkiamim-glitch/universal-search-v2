import RoutineCard from "@/components/cards/RoutineCard"
import { todayRoutine } from "@/lib/mock/home"

export default function TodayRoutine() {
  return (
    <section className="space-y-3">
      {/* Heading directly on page background */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800 tracking-tight">আজকের রুটিন</h2>
          <p className="text-sm text-slate-600 mt-1">তোমার প্রতিদিনের রুটিন দেখে নাও</p>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[13px] font-semibold text-indigo-700 bg-indigo-50 ring-1 ring-indigo-100 shadow-sm"
        >
          রুটিন দেখো <span>→</span>
        </a>
      </div>
      {/* Only rows are cards (single layer) */}
      <div className="flex flex-col gap-4">
        {todayRoutine.map((r) => (
          <RoutineCard key={r.id} title={r.title} time={r.time} />
        ))}
      </div>
    </section>
  )
}



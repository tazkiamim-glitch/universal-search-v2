import { ChevronRight } from "lucide-react"

export default function HomeworkCard({ title, countdown }: { title: string; countdown: string }) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-4 flex items-center gap-4 ring-1 ring-slate-100">
      <div className="w-1.5 self-stretch bg-teal-500 rounded-full"></div>
      <div className="flex-grow space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-500"></span>
          <span className="text-xs font-semibold text-teal-600">অ্যানিমেটেড লেসনস</span>
        </div>
        <p className="font-bold text-slate-800 text-lg">{title}</p>
        <p className="text-sm text-slate-500">{countdown}</p>
      </div>
      <button className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-lg">
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
}



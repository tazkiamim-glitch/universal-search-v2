import StoryCard from "@/components/cards/StoryCard"
import { stories } from "@/lib/mock/home"

export default function Stories() {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-slate-800 tracking-tight">স্টোরিজ</h2>
      <div className="flex overflow-x-auto space-x-4 py-2">
        {stories.map((s) => (
          <StoryCard key={s.id} title={s.title} caption={s.caption} image={s.image} />
        ))}
      </div>
    </section>
  )
}



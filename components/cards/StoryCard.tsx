export default function StoryCard({ title, caption, image }: { title: string; caption: string; image: string }) {
  return (
    <div className="flex-shrink-0 w-40 space-y-2">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-60 object-cover rounded-2xl" />
        <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
          <span className="text-white text-lg">▶</span>
        </div>

      </div>
      <p className="text-sm font-semibold text-slate-700 line-clamp-2">{title} | {caption}</p>
    </div>
  )
}





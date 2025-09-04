import Link from "next/link"

type Props = {
  title: string
  badge?: { type: "green" | "orange"; text: string }
  cta: { text: string; action?: string; program?: string }
  onCTA?: () => void
  image?: string
}

export default function CourseBannerCard({ title, badge, cta, onCTA, image }: Props) {
  const badgeColors = {
    green: "bg-green-300/80 text-green-900",
    orange: "bg-yellow-300/80 text-yellow-900"
  }

  const badgeColor = badge ? badgeColors[badge.type] : ""

  const buttonContent = (
    <div className="relative w-full h-56 rounded-3xl shadow-lg overflow-hidden">
      {/* Background Image */}
      <img 
        src={image || "/placeholder.jpg"} 
        className="absolute inset-0 w-full h-full object-cover" 
        alt={`${title} Course Thumbnail`}
      />
      
      {/* Content Overlay */}
      <div className="relative z-10 p-4 flex flex-col h-full text-white">
        {badge && (
          <div className={`absolute top-4 left-4 px-4 py-1.5 ${badgeColor} text-sm font-semibold rounded-full backdrop-blur-sm`}>
            {badge.text}
          </div>
        )}
        
        <div className="mt-auto">
          <div className="w-full text-center py-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 font-semibold">
            {cta.text}
          </div>
        </div>
      </div>
    </div>
  )

  // If it's a "continue" action with a program, make it a link
  if (cta.action === "continue" && cta.program) {
    return (
      <Link href={`/program/${cta.program}`} className="block w-full">
        {buttonContent}
      </Link>
    )
  }

  // Otherwise, make it a button
  return (
    <button onClick={onCTA} className="block w-full">
      {buttonContent}
    </button>
  )
}



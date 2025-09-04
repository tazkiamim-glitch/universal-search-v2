"use client"
import HighlightText from "./HighlightText"

interface SearchResultCardProps {
  icon?: string
  title: string
  subtitle?: string
  description?: string
  watchCount?: string
  badge?: string
  badgeColor?: "red" | "blue" | "slate" | "purple"
  buttonText?: string
  buttonVariant?: "primary" | "success" | "secondary" | "warning"
  onButtonClick?: () => void
  children?: React.ReactNode
  query?: string
}

export default function SearchResultCard({
  icon,
  title,
  subtitle,
  description,
  watchCount,
  badge,
  badgeColor = "slate",
  buttonText,
  buttonVariant = "secondary",
  onButtonClick,
  children,
  query
}: SearchResultCardProps) {
  const badgeColors = {
    red: "bg-red-500 text-white",
    blue: "bg-blue-500 text-white", 
    slate: "bg-slate-800 text-white",
    purple: "bg-purple-500 text-white"
  }

  const buttonVariants = {
    primary: "px-4 py-2 border border-blue-600 text-blue-600 font-semibold rounded-full text-sm hover:bg-blue-50",
    success: "px-4 py-2 bg-green-600 text-white font-semibold rounded-full text-sm hover:bg-green-700",
    secondary: "px-4 py-2 bg-yellow-400 text-yellow-900 font-semibold rounded-full text-sm hover:bg-yellow-300",
    warning: "px-4 py-2 bg-yellow-400 text-yellow-900 font-semibold rounded-full text-sm hover:bg-yellow-300"
  } as const

  return (
    <div className="bg-white rounded-2xl p-4 ring-1 ring-slate-200/50 shadow-sm space-y-1">
      {icon && <div className="text-4xl">{icon}</div>}
      {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      <h4 className="font-bold text-slate-800">
        <HighlightText text={title} query={query || ""} />
      </h4>
      {description && <p className="text-xs text-slate-500">{description}</p>}
      {children}
    </div>
  )
}

// Specialized card for video content
export function VideoResultCard({
  thumbnail,
  title,
  subtitle,
  description,
  watchCount,
  badge,
  badgeColor = "red",
  buttonText,
  buttonVariant = "primary",
  onButtonClick,
  query
}: SearchResultCardProps & { thumbnail?: string }) {
  const badgeColors = {
    red: "bg-red-500 text-white",
    blue: "bg-blue-500 text-white", 
    slate: "bg-slate-800 text-white",
    purple: "bg-purple-500 text-white"
  }

  const buttonVariants = {
    primary: "px-4 py-2 border border-blue-600 text-blue-600 font-semibold rounded-full text-sm hover:bg-blue-50",
    success: "px-4 py-2 bg-green-600 text-white font-semibold rounded-full text-sm hover:bg-green-700",
    secondary: "px-4 py-2 bg-yellow-400 text-yellow-900 font-semibold rounded-full text-sm hover:bg-yellow-300",
    warning: "px-4 py-2 bg-yellow-400 text-yellow-900 font-semibold rounded-full text-sm hover:bg-yellow-300"
  } as const

  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl p-3 ring-1 ring-slate-200/50 shadow-sm">
      <div className="relative flex-shrink-0">
        <img 
          src={thumbnail || "https://via.placeholder.com/80x80"} 
          className="w-20 h-20 rounded-xl object-cover" 
          alt="Content Thumbnail"
        />
        {badge && (
          <span className={`absolute top-1 left-1 px-2 py-0.5 ${badgeColors[badgeColor]} text-xs font-bold rounded-md`}>
            {badge}
          </span>
        )}
      </div>
      <div className="flex-grow space-y-1">
        <h4 className="font-bold text-slate-800">
          <HighlightText text={title} query={query || ""} />
        </h4>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        {watchCount && (
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <p className="text-xs text-slate-500">{watchCount}</p>
          </div>
        )}
      </div>
      {buttonText && (
        <button 
          onClick={onButtonClick}
          className={buttonVariants[buttonVariant]}
        >
          {buttonText}
        </button>
      )}
    </div>
  )
}

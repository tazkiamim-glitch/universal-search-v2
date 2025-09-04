"use client"

interface SearchChipProps {
  children: React.ReactNode
  onClick: () => void
  variant?: "recent" | "trending" | "shortcut"
  flash?: boolean
}

export default function SearchChip({ 
  children, 
  onClick, 
  variant = "shortcut", 
  flash = false 
}: SearchChipProps) {
  const baseClasses = "flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full ring-1 ring-slate-200 hover:bg-slate-200 transition-colors"
  const flashClasses = flash ? "bg-amber-100" : ""
  
  return (
    <button 
      className={`${baseClasses} ${flashClasses}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

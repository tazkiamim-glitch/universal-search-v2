"use client"

interface SearchSectionProps {
  title: string
  icon?: string
  children: React.ReactNode
  onSeeAll?: () => void
  itemCount?: number
}

export default function SearchSection({ 
  title, 
  icon, 
  children, 
  onSeeAll,
  itemCount = 1
}: SearchSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {title}
        </h3>
        {onSeeAll && itemCount > 3 && (
          <button 
            onClick={onSeeAll}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            See all
          </button>
        )}
      </div>
      {children}
    </section>
  )
}

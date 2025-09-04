"use client"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit?: (e: React.FormEvent) => void
  placeholder?: string
}

export default function SearchInput({ 
  value, 
  onChange, 
  onSubmit, 
  placeholder = "খুঁজুন বিষয়, অধ্যায়, টপিক..." 
}: SearchInputProps) {
  return (
    <div className="relative">
      <svg 
        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.3-4.3"/>
      </svg>
      <input 
        type="text" 
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onSubmit={onSubmit}
        className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" 
      />
    </div>
  )
}

"use client"

interface HighlightTextProps {
  text: string
  query: string
  className?: string
}

export default function HighlightText({ text, query, className = "" }: HighlightTextProps) {
  if (!query.trim()) {
    return <span className={className}>{text}</span>
  }

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)

  return (
    <span className={className}>
      {parts.map((part, index) => 
        regex.test(part) ? (
          <span key={index} className="bg-yellow-200 px-1 rounded">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  )
}

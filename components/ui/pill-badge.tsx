import React from "react"

type Variant = "green" | "orange" | "purple"

const map: Record<Variant, string> = {
  green: "bg-green-100 text-green-700",
  orange: "bg-orange-100 text-orange-700",
  purple: "bg-[#6C5CE7] text-white",
}

export default function PillBadge({ variant = "green", children, className = "" }: { variant?: Variant; children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${map[variant]} ${className}`}> 
      {children}
    </span>
  )
}



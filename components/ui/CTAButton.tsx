import React from "react"

type Variant = "primary" | "light"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  iconRight?: React.ReactNode
  variant?: Variant
}

export default function CTAButton({ iconRight, className, children, variant = "primary", ...rest }: Props) {
  const base = "inline-flex items-center gap-2 rounded-full px-4 py-2 shadow"
  const primary = "bg-[#6C5CE7] text-white hover:brightness-95 active:brightness-90"
  const light = "bg-white text-slate-900 hover:bg-white"
  const style = `${base} ${variant === "primary" ? primary : light}`
  return (
    <button {...rest} className={`${style} ${className || ""}`}>
      <span className="text-sm font-medium">{children}</span>
      {iconRight}
    </button>
  )
}



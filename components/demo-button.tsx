"use client"

import { Button } from "@/components/ui/button"

interface DemoButtonProps {
  onClick: () => void
}

export function DemoButton({ onClick }: DemoButtonProps) {
  return (
    <div className="fixed top-4 right-4 z-50">
      <Button onClick={onClick} className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1" size="sm">
        View Light Reaction Results
      </Button>
    </div>
  )
}

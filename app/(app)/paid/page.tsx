import DynamicSearchPrompt from "@/components/layout/DynamicSearchPrompt"
import TodayRoutine from "@/components/sections/TodayRoutine"
import Homework from "@/components/sections/Homework"
import Stories from "@/components/sections/Stories"

export default function PaidHomePage() {
  return (
    <div className="px-4 pt-2 pb-4 space-y-4">
      <DynamicSearchPrompt />
      <TodayRoutine />
      <Homework />
      <Stories />
    </div>
  )
}



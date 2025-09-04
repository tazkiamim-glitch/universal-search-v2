"use client"
import { useRouter } from "next/navigation"
import { Home, BookOpen, Inbox, Search, Bot } from "lucide-react"

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="mx-auto max-w-[480px] px-4 py-6">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">Welcome to the Homepage</h1>
            <p className="text-slate-600">This is your dashboard where you can access all your learning materials and track your progress.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <button 
              onClick={() => router.push("/")} 
              className="rounded-2xl p-6 bg-pink-50 border border-pink-200 hover:bg-pink-100 transition-colors"
            >
              <div className="text-pink-600 mb-2">
                <Search className="h-8 w-8 mx-auto" />
              </div>
              <div className="font-bold text-slate-900">Search</div>
              <div className="text-xs text-slate-500">Find content</div>
            </button>
            
            <button 
              onClick={() => router.push("/courses")} 
              className="rounded-2xl p-6 bg-purple-50 border border-purple-200 hover:bg-purple-100 transition-colors"
            >
              <div className="text-purple-600 mb-2">
                <BookOpen className="h-8 w-8 mx-auto" />
              </div>
              <div className="font-bold text-slate-900">Courses</div>
              <div className="text-xs text-slate-500">Browse programs</div>
            </button>
            
            <button 
              onClick={() => router.push("/inbox")} 
              className="rounded-2xl p-6 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              <div className="text-blue-600 mb-2">
                <Inbox className="h-8 w-8 mx-auto" />
              </div>
              <div className="font-bold text-slate-900">Inbox</div>
              <div className="text-xs text-slate-500">Messages</div>
            </button>
            
            <button 
              onClick={() => router.push("/ai")} 
              className="rounded-2xl p-6 bg-green-50 border border-green-200 hover:bg-green-100 transition-colors"
            >
              <div className="text-green-600 mb-2">
                <Bot className="h-8 w-8 mx-auto" />
              </div>
              <div className="font-bold text-slate-900">Shikho AI</div>
              <div className="text-xs text-slate-500">AI Assistant</div>
            </button>
          </div>
        </div>
    </div>
  )
}

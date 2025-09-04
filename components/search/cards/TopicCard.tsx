"use client";
import { Topic } from "@/lib/search/types";
import { highlight } from "@/lib/search/normalize";

export function TopicCard({ topic, breadcrumb, tokens, onOpen }: { topic: Topic; breadcrumb: string; tokens?: string[]; onOpen?: () => void }) {
  return (
    <div
      role="listitem"
      className="border border-blue-100 rounded-lg p-3 bg-blue-50 text-card-foreground transition-shadow hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-200 cursor-pointer"
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen?.(); } }}
      tabIndex={0}
      aria-label={`Open ${topic.name}`}
    >
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 shrink-0 rounded-lg bg-purple-50 flex items-center justify-center text-lg">✨</div>
        <div className="min-w-0 flex-1">
          <div className="text-xs text-muted-foreground">{tokens ? highlight(breadcrumb, tokens) : breadcrumb}</div>
          <div className="font-medium mt-0.5">{tokens ? highlight(topic.name, tokens) : topic.name}</div>
        </div>
      </div>
    </div>
  );
}



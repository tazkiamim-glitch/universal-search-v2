"use client";
import { Content } from "@/lib/search/types";

function typeLabel(type: Content["type"]): string {
  switch (type) {
    case "LIVE_CLASS": return "Live Class";
    case "LIVE_EXAM": return "Live Exam";
    case "MODEL_TEST": return "Model Test";
    case "CQ_EXAM": return "CQ Exam";
    case "ANIMATED_VIDEO": return "Animated Video";
    case "RECORDED_CLASS": return "Recorded Class";
    case "PDF_NOTES": return "PDF";
    case "SMART_NOTE": return "Smart Note";
    case "QUIZ": return "Quiz";
    case "HOMEWORK": return "Homework";
  }
}

export function ContentCard({ content, compact }: { content: Content; compact?: boolean }) {
  const isSync = ["LIVE_CLASS","LIVE_EXAM","MODEL_TEST","CQ_EXAM"].includes(content.type);
  const timeOrDuration = isSync
    ? (content.startsAt ? relativeOrTime(content.startsAt) : undefined)
    : (content.durationSec ? formatDuration(content.durationSec) : undefined);
  const rightAction = getRightAction(content);
  const leftIcon = getLeftEmoji(content);

  return (
    <div role="listitem" className={`border border-blue-100 rounded-lg ${compact?"p-2":"p-3"} bg-blue-50 text-card-foreground`}>
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 shrink-0 rounded-lg bg-gray-50 flex items-center justify-center text-lg">{leftIcon}</div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{typeLabel(content.type)}</span>
            {timeOrDuration && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">{timeOrDuration}</span>
            )}
            {isSync && isLiveNow(content.startsAt) && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-600 text-white">Join Now</span>
            )}
            {content.statsText && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-600">{content.statsText}</span>
            )}
          </div>
          <div className="font-medium mt-1 truncate">{content.title}</div>
        </div>
        <div className="shrink-0">
          <span className={`text-xs px-2 py-1 rounded-full ${rightAction.className}`}>{rightAction.label}</span>
        </div>
      </div>
    </div>
  );
}

function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return s ? `${m}m ${s}s` : `${m}m`;
}

function isLiveNow(startsAt?: string): boolean {
  if (!startsAt) return false;
  const start = new Date(startsAt).getTime();
  const now = Date.now();
  const twoHours = 2 * 3600 * 1000;
  return Math.abs(now - start) <= twoHours;
}

function relativeOrTime(iso: string): string {
  const start = new Date(iso);
  const diffMs = start.getTime() - Date.now();
  const isToday = new Date().toDateString() === start.toDateString();
  if (diffMs > 0) {
    const m = Math.round(diffMs / 60000);
    const h = Math.floor(m / 60);
    const rem = m % 60;
    if (h > 0) return `Starts in ${h}h ${rem}m`;
    return `Starts in ${m}m`;
  }
  if (isToday) return `Today ${start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  return start.toLocaleString();
}

function getRightAction(content: Content): { label: string; className: string } {
  if (["LIVE_CLASS","LIVE_EXAM"].includes(content.type)) return { label: "Join", className: "bg-green-600 text-white" };
  if (["ANIMATED_VIDEO","RECORDED_CLASS"].includes(content.type)) return { label: "Watch", className: "bg-blue-600 text-white" };
  if (["PDF_NOTES","SMART_NOTE"].includes(content.type)) return content.isFree ? { label: "Free", className: "bg-emerald-500 text-white" } : { label: "Unlock", className: "bg-yellow-200 text-yellow-900" };
  if (["MODEL_TEST","CQ_EXAM","QUIZ"].includes(content.type)) return { label: "Start", className: "bg-indigo-600 text-white" };
  return content.isFree ? { label: "Free", className: "bg-emerald-500 text-white" } : { label: "Unlock", className: "bg-yellow-200 text-yellow-900" };
}

function getLeftEmoji(content: Content): string {
  switch (content.type) {
    case "LIVE_CLASS": return "⏱";
    case "RECORDED_CLASS": return "▶";
    case "ANIMATED_VIDEO": return "🎬";
    case "PDF_NOTES": return "📄";
    case "SMART_NOTE": return "🧠";
    case "MODEL_TEST": return "🧪";
    case "CQ_EXAM": return "📝";
    case "QUIZ": return "❓";
    case "LIVE_EXAM": return "📢";
    case "HOMEWORK": return "📚";
    default: return "📎";
  }
}



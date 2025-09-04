"use client";
import { Content } from "@/lib/search/types";
import { highlight } from "@/lib/search/normalize";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type Props = {
  item: Content;
  breadcrumb?: string;
  progressPct?: number;
  onPrimary?: () => void;
  onOpen?: () => void;
  tokens?: string[];
};

export function VideoCard({ item, breadcrumb, progressPct, onPrimary, onOpen, tokens }: Props) {
  const isLive = item.type === "LIVE_CLASS";
  const isRecorded = item.type === "RECORDED_CLASS";
  const isAnimated = item.type === "ANIMATED_VIDEO";
  const isGuideline = item.type === "GUIDELINE_VIDEO";
  const isStory = item.type === "STORY";
  const thumbnailSrc = isLive
    ? "/liveclass.webp"
    : isRecorded
    ? "/recordedclass.webp"
    : isAnimated
    ? "/animatedvideo.jpg"
    : "/placeholder.jpg";

  const timeOrDuration = isLive
    ? (item.startsAt ? relativeOrTime(item.startsAt) : undefined)
    : (item.durationSec ? formatDuration(item.durationSec) : undefined);

  const primary = getPrimaryAction(item);
  const badge = getTypeBadge(item);
  const showBadge = item.type === "LIVE_CLASS";

  return (
    <div
      role="listitem"
      className="w-full text-left border border-blue-100 rounded-xl p-3 bg-blue-50 text-card-foreground transition-shadow hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-200"
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen?.(); } }}
      tabIndex={0}
      aria-label={`Open ${item.title}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-24 shrink-0">
          <div className="relative">
            <AspectRatio ratio={16/9}>
              <img
                src={thumbnailSrc}
                alt={`${item.title} thumbnail`}
                className="h-full w-full object-cover rounded-md border"
              />
            </AspectRatio>
            {showBadge && (
              <span className={`absolute left-1 top-1 text-[11px] px-2 py-0.5 rounded-full ${badge.className}`}>{badge.label}</span>
            )}
            {/* Premium tag removed per request */}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold truncate" title={item.title}>{tokens ? highlight(item.title, tokens) : item.title}</div>
          <div className="mt-1 text-xs text-muted-foreground flex items-center gap-2 flex-wrap">
            {isLive && timeOrDuration && <span>{timeOrDuration}</span>}
            {!isLive && timeOrDuration && <span>{timeOrDuration}</span>}
            {breadcrumb && <span className="truncate">{tokens ? highlight(breadcrumb, tokens) : breadcrumb}</span>}
            {item.statsText && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-600">{item.statsText}</span>
            )}
            {progressPct != null && !isLive && (
              <span aria-label={`Watched ${progressPct}%`}>{`Watched ${progressPct}%`}</span>
            )}
          </div>
          {progressPct != null && !isLive && (
            <div className="mt-2 h-1.5 w-full bg-gray-100 rounded">
              <div className="h-1.5 bg-blue-500 rounded" style={{ width: `${Math.min(100, Math.max(0, progressPct))}%` }} />
            </div>
          )}
        </div>
        <div className="shrink-0 flex items-center gap-1">
          <button
            className={`h-9 px-3 rounded-full text-xs font-medium ${primary.className}`}
            onClick={(e) => { e.stopPropagation(); onPrimary?.(); }}
            aria-label={primary.aria}
          >
            {primary.label}
          </button>
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

function isLiveNow(startsAt?: string): boolean {
  if (!startsAt) return false;
  const start = new Date(startsAt).getTime();
  const now = Date.now();
  const twoHours = 2 * 3600 * 1000;
  return Math.abs(now - start) <= twoHours;
}

function getPrimaryAction(item: Content): { label: string; className: string; aria: string } {
  if (item.type === "LIVE_CLASS") {
    return isLiveNow(item.startsAt)
      ? { label: "Join", className: "bg-green-600 text-white", aria: "Join live class" }
      : { label: "Remind Me", className: "border bg-white", aria: "Set reminder for live class" };
  }
  if (item.type === "ANIMATED_VIDEO") return { label: "Watch", className: "bg-purple-600 text-white", aria: "Watch animated video" };
  if (item.type === "RECORDED_CLASS") return { label: "Watch", className: "bg-blue-600 text-white", aria: "Watch recorded class" };
  if (item.type === "GUIDELINE_VIDEO") return { label: "Watch", className: "bg-emerald-600 text-white", aria: "Watch guideline video" };
  if (item.type === "STORY") return { label: "Watch", className: "bg-rose-600 text-white", aria: "Watch story" };
  return { label: "Watch", className: "bg-blue-600 text-white", aria: "Watch video" };
}

function getTypeBadge(item: Content): { label: string; className: string } {
  switch (item.type) {
    case "LIVE_CLASS": return { label: "Live", className: "bg-red-600 text-white" };
    case "RECORDED_CLASS": return { label: "Recorded", className: "bg-blue-600 text-white" };
    case "ANIMATED_VIDEO": return { label: "Animated", className: "bg-violet-600 text-white" };
    case "STORY": return { label: "Story", className: "bg-rose-600 text-white" };
    case "GUIDELINE_VIDEO": return { label: "Guideline", className: "bg-emerald-600 text-white" };
    default: return { label: "Video", className: "bg-slate-600 text-white" };
  }
}

// Premium tag removed per request



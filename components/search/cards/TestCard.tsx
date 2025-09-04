"use client";
import { Content } from "@/lib/search/types";
import { highlight } from "@/lib/search/normalize";

type Props = {
  item: Content;
  breadcrumb?: string;
  questions?: number;
  timeLimitMin?: number;
  lastScoreText?: string;
  onPrimary?: () => void;
  onOpen?: () => void;
  tokens?: string[];
};

export function TestCard({ item, breadcrumb, questions, timeLimitMin, lastScoreText, onPrimary, onOpen, tokens }: Props) {
  const badge = getTypeBadge(item);
  const primary = getPrimaryAction(item);
  const meta: string[] = [];
  if (questions != null) meta.push(`${questions} questions`);
  if (timeLimitMin != null) meta.push(`${timeLimitMin}m timed`);
  if (breadcrumb) meta.push(breadcrumb);
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
        <div className="relative h-12 w-12 shrink-0 rounded-md border bg-white flex items-center justify-center text-lg">
          {item.type === "QUIZ" ? (
            <img src="/mcq.jfif" alt="MCQ" className="h-full w-full object-cover rounded-md" />
          ) : (
            <span>🧪</span>
          )}
          {item.type === "LIVE_EXAM" && (
            <span className={`absolute -top-1 -right-1 text-[11px] px-2 py-0.5 rounded-full ${badge.className}`}>{badge.label}</span>
          )}
          {/* Premium tag removed per request */}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold truncate" title={item.title}>{tokens ? highlight(item.title, tokens) : item.title}</div>
          <div className="mt-1 text-xs text-muted-foreground truncate">{tokens ? highlight(meta.join(" • "), tokens) : meta.join(" • ")}</div>
          {item.statsText && (
            <div className="mt-1 text-[11px] px-2 py-0.5 inline-flex rounded-full bg-gray-50 text-gray-600">{item.statsText}</div>
          )}
          {lastScoreText && (
            <div className="mt-1 text-[11px] px-2 py-0.5 inline-flex rounded-full bg-gray-100 text-gray-700">{lastScoreText}</div>
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

function getTypeBadge(item: Content): { label: string; className: string } {
  switch (item.type) {
    case "QUIZ": return { label: "MCQ", className: "bg-indigo-600 text-white" };
    case "CQ_EXAM": return { label: "CQ", className: "bg-teal-600 text-white" };
    case "MODEL_TEST": return { label: "Model", className: "bg-orange-500 text-white" };
    case "LIVE_EXAM": return { label: "Live", className: "bg-red-600 text-white" };
    default: return { label: "Test", className: "bg-slate-600 text-white" };
  }
}

function getPrimaryAction(item: Content): { label: string; className: string; aria: string } {
  if (item.type === "LIVE_EXAM") return { label: "Join", className: "bg-green-600 text-white", aria: "Join live exam" };
  if (item.type === "QUIZ") return { label: "Start", className: "bg-teal-600 text-white", aria: "Start quiz" };
  if (item.type === "CQ_EXAM") return { label: "Start", className: "bg-teal-600 text-white", aria: "Start CQ exam" };
  if (item.type === "MODEL_TEST") return { label: "Start", className: "bg-teal-600 text-white", aria: "Start model test" };
  return { label: "Start", className: "bg-indigo-600 text-white", aria: "Start test" };
}

// Premium tag removed per request



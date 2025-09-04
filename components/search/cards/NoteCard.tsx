"use client";
import { Content } from "@/lib/search/types";
import { highlight } from "@/lib/search/normalize";

type Props = {
  item: Content;
  breadcrumb?: string;
  pages?: number;
  updatedText?: string;
  progressPct?: number;
  onPrimary?: () => void;
  onOpen?: () => void;
  tokens?: string[];
};

export function NoteCard({ item, breadcrumb, pages, updatedText, progressPct, onPrimary, onOpen, tokens }: Props) {
  const badge = getTypeBadge(item);
  const primary = getPrimaryAction(item);
  const meta: string[] = [];
  if (breadcrumb) meta.push(breadcrumb);
  if (pages != null) meta.push(`${pages} pages`);
  if (!pages && updatedText) meta.push(`Updated: ${updatedText}`);

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
        <div className="relative h-16 w-12 shrink-0">
          <div className="h-full w-full rounded-md border bg-white flex items-center justify-center text-lg">📄</div>
          {/* Hide all badges for notes */}
          {pages != null && (
            <span className="absolute right-1 bottom-1 text-[10px] px-1.5 py-0.5 rounded bg-black/70 text-white">{pages}p</span>
          )}
          {/* Premium tag removed per request */}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold truncate" title={item.title}>{tokens ? highlight(item.title, tokens) : item.title}</div>
          <div className="mt-1 text-xs text-muted-foreground truncate">{tokens ? highlight(meta.join(" • "), tokens) : meta.join(" • ")}</div>
          {item.statsText && (
            <div className="mt-1 text-[11px] px-2 py-0.5 inline-flex rounded-full bg-gray-50 text-gray-600">{item.statsText}</div>
          )}
          {progressPct != null && (
            <div className="mt-2 inline-flex items-center gap-2">
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">Read {progressPct}%</span>
              <div className="h-1.5 w-24 bg-gray-100 rounded">
                <div className="h-1.5 bg-blue-500 rounded" style={{ width: `${Math.min(100, Math.max(0, progressPct))}%` }} />
              </div>
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

// Download icon/button removed per request

function getTypeBadge(item: Content): { label: string; className: string } {
  switch (item.type) {
    case "SMART_NOTE": return { label: "Smart Note", className: "bg-purple-600 text-white" };
    case "HOMEWORK": return { label: "Practice", className: "bg-emerald-600 text-white" };
    case "PDF_NOTES": return { label: "PDF", className: "bg-indigo-600 text-white" };
    default: return { label: "Note", className: "bg-slate-600 text-white" };
  }
}

function getPrimaryAction(item: Content): { label: string; className: string; aria: string } {
  if (item.type === "SMART_NOTE") return { label: "View", className: "bg-purple-600 text-white", aria: "View smart note" };
  if (item.type === "PDF_NOTES") return { label: "Read", className: "bg-blue-600 text-white", aria: "Read PDF note" };
  if (item.type === "HOMEWORK") return { label: "Practice", className: "bg-emerald-600 text-white", aria: "Practice homework" };
  return { label: "View", className: "bg-purple-600 text-white", aria: "View note" };
}

// Premium tag removed per request



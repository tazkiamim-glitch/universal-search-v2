"use client";
import { Subject } from "@/lib/search/types";
import { highlight } from "@/lib/search/normalize";

export function SubjectCard({ subject, tokens, children }: { subject: Subject; tokens?: string[]; children?: React.ReactNode }) {
  const title = `${subject.name}${subject.paper ? ` ${subject.paper}` : ""}`;
  const matchCount = tokens ? tokens.filter(t => subject.tokens.map(x => x.toLowerCase()).includes(t.toLowerCase())).length : 0;
  return (
    <div role="listitem" className="border rounded-lg p-3 bg-slate-50 text-card-foreground">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 shrink-0 rounded-lg bg-blue-50 flex items-center justify-center text-lg">📘</div>
        <div className="min-w-0 flex-1">
          <div className="font-medium">{tokens ? highlight(title, tokens) : title}</div>
          <div className="text-sm text-slate-500 mt-1">All Chapters</div>
          {children}
        </div>
        {tokens && matchCount > 0 && (
          <div className="shrink-0 text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{matchCount} matches</div>
        )}
      </div>
    </div>
  );
}



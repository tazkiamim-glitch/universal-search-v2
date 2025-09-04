"use client";
import { chapters, subjects } from "@/lib/search/mockData";
import { Content, Topic } from "@/lib/search/types";
import { highlight } from "@/lib/search/normalize";
import { ContentCard } from "@/components/search/cards/ContentCard";

export function TopicBlock({ topic, contents, tokens }: { topic: Topic; contents: Content[]; tokens?: string[] }) {
  const ch = chapters.find(c => c.id === topic.chapterId);
  const subj = ch ? subjects.find(s => s.id === ch.subjectId) : undefined;
  const breadcrumb = [subj?.name, ch?.name, topic.name].filter(Boolean).join(" → ");

  const syncTypes: Content["type"][] = ["LIVE_CLASS","LIVE_EXAM","MODEL_TEST","CQ_EXAM"];

  const sync = contents.filter(c => syncTypes.includes(c.type));
  const async = contents.filter(c => !syncTypes.includes(c.type));

  return (
    <div role="listitem" className="border rounded-xl p-3 bg-card text-card-foreground shadow-sm">
      <div className="text-xs text-muted-foreground">{tokens ? highlight(breadcrumb, tokens) : breadcrumb}</div>
      <div className="font-semibold mt-0.5 mb-2">{tokens ? highlight(topic.name, tokens) : topic.name}</div>

      {sync.length > 0 && (
        <div>
          <div className="text-[11px] uppercase tracking-wide text-teal-700 mb-1">সিঙ্ক্রোনাস</div>
          <div className="space-y-2">
            {sync.map(c => <ContentCard key={c.id} content={c} compact />)}
          </div>
        </div>
      )}

      {async.length > 0 && (
        <div className="mt-3">
          <div className="text-[11px] uppercase tracking-wide text-teal-700 mb-1">অ্যাসিঙ্ক</div>
          <div className="space-y-2">
            {async.map(c => <ContentCard key={c.id} content={c} compact />)}
          </div>
        </div>
      )}
    </div>
  );
}



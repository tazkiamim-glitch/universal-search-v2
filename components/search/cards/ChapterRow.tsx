"use client";
import { chapters, subjects, topics } from "@/lib/search/mockData";
import { Chapter } from "@/lib/search/types";
import { highlight } from "@/lib/search/normalize";

export function ChapterRow({ chapter, tokens }: { chapter: Chapter; tokens?: string[] }) {
  const subject = subjects.find(s => s.id === chapter.subjectId);
  const subjectName = subject ? `${subject.name}${subject.paper ? ` ${subject.paper}` : ""}` : "";
  const topicCount = topics.filter(t => t.chapterId === chapter.id).length;
  return (
    <div role="listitem" className="border rounded-lg p-3 bg-card text-card-foreground">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 shrink-0 rounded-lg bg-amber-50 flex items-center justify-center text-lg">📝</div>
        <div className="min-w-0 flex-1">
          <div className="text-xs text-muted-foreground">{tokens ? highlight(subjectName, tokens) : subjectName}</div>
          <div className="font-medium mt-0.5">{tokens ? highlight(chapter.name, tokens) : chapter.name}</div>
        </div>
        <div className="shrink-0 text-xs text-blue-600">{topicCount} topics</div>
      </div>
    </div>
  );
}



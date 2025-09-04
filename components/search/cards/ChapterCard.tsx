"use client";
import { Chapter, Subject } from "@/lib/search/types";

export function ChapterCard({ chapter, subjectName }: { chapter: Chapter; subjectName: string }) {
  return (
    <div role="listitem" className="border rounded-lg p-3 bg-card text-card-foreground">
      <div className="text-xs text-muted-foreground">{subjectName}</div>
      <div className="font-medium">{chapter.name}</div>
    </div>
  );
}



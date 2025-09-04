"use client";
import { useEffect, useMemo, useState } from "react";
import { catalog, subjects, chapters, topics, contents } from "@/lib/search/mockData";
import { tokenize, highlight } from "@/lib/search/normalize";
import { Chapter, Content, Subject, Topic, ContentType } from "@/lib/search/types";
import { SubjectCard } from "@/components/search/cards/SubjectCard";
import { ChapterRow } from "./cards/ChapterRow";
import { ContentCard } from "@/components/search/cards/ContentCard";
import { searchAll } from "@/lib/search/score";

const tabs = [
  { key: "all", label: "All" },
  { key: "videos", label: "Videos" },
  { key: "notes", label: "Notes" },
  { key: "classes", label: "Classes" },
  { key: "tests", label: "Tests" },
  { key: "topics", label: "Topics" },
  { key: "chapters", label: "Chapters" },
  { key: "subjects", label: "Subjects" },
] as const;
type Tab = typeof tabs[number]["key"];

type FlatRow =
  | { kind: "heading"; text: string }
  | { kind: "subject"; item: Subject }
  | { kind: "chapter"; item: Chapter }
  | { kind: "topic"; item: Topic }
  | { kind: "content"; item: Content };

export function SearchExpanded({ q: initialQ }: { q: string }) {
  const [q, setQ] = useState(initialQ ?? "");
  const [debouncedQ, setDebouncedQ] = useState(q);
  const [activeTab, setActiveTab] = useState<Tab>("all");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q), 250);
    return () => clearTimeout(t);
  }, [q]);

  const tokens = useMemo(() => tokenize(debouncedQ), [debouncedQ]);
  const searchOut = useMemo(() => searchAll(debouncedQ, catalog), [debouncedQ]);
  const results = searchOut.results;
  const intentTokens = useMemo(() => searchOut.intent.tokens, [searchOut]);

  const subjectIntent = useMemo(() => tokens.some(t =>
    subjects.some(s => s.tokens.map(x => x.toLowerCase()).includes(t))
  ), [tokens]);

  const rows = useMemo(() => buildFlatRows(results, { subjectIntent }), [results, subjectIntent]);
  const filtered = rows.filter(r => passesTab(r, activeTab, subjectIntent));

  return (
    <div className="mx-auto w-full max-w-[480px] px-3 pb-24">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur pt-4">
        <div className="text-sm text-muted-foreground">“{debouncedQ}” এর ফলাফল · {results.length}</div>
        <input
          aria-label="Search"
          placeholder="🔍 খুঁজুন বিষয়, অধ্যায়, টপিক…"
          className="w-full mt-2 border rounded px-3 py-2"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-3 py-1 rounded-full text-sm ${activeTab===t.key?"bg-black text-white font-semibold underline":"bg-gray-100"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div role="list" className="mt-4 space-y-4">
        {filtered.map((row, idx) => {
          if (row.kind === "heading") {
            return <div key={`h-${idx}`} className="text-xs uppercase tracking-wide text-blue-600 mt-2 mb-1">{row.text}</div>;
          }
          if (row.kind === "subject") {
            return <SubjectCard key={`s-${row.item.id}`} subject={row.item} tokens={intentTokens} />;
          }
          if (row.kind === "chapter") {
            return <ChapterRow key={`c-${row.item.id}`} chapter={row.item} tokens={intentTokens} />;
          }
          if (row.kind === "topic") {
            const breadcrumb = buildBreadcrumb(row.item);
            return <div key={`t-${row.item.id}`} className="border rounded-lg p-3 bg-card text-card-foreground">
              <div className="text-xs text-muted-foreground">{highlight(breadcrumb, intentTokens)}</div>
              <div className="font-medium">{highlight(row.item.name, intentTokens)}</div>
            </div>;
          }
          if (row.kind === "content") {
            return <ContentCard key={`cnt-${row.item.id}`} content={row.item} />;
          }
          return null;
        })}
      </div>

      <div className="fixed bottom-4 inset-x-0 px-4">
        <div className="max-w-[480px] mx-auto">
          <div className="rounded-xl shadow-lg bg-white border p-3 flex items-center justify-between">
            <div className="text-sm">কিছু খুঁজে পাচ্ছো না? শিখো AI-কে বলো—এই টপিকটা বুঝিয়ে দিক</div>
            <button className="px-3 py-1 rounded bg-purple-600 text-white text-sm">Explain with AI</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function buildFlatRows(results: ReturnType<typeof searchAll>["results"], opts: { subjectIntent: boolean }): FlatRow[] {
  const rows: FlatRow[] = [];
  const seen: { [K in "SUBJECT"|"CHAPTER"|"TOPIC"|"CONTENT"]?: boolean } = {};
  const addedTopic = new Set<string>();

  const ensureHeading = (text: string, key: keyof typeof seen) => {
    if (!seen[key]) { rows.push({ kind: "heading", text }); seen[key] = true; }
  };

  // enforce priority order while walking once: SUBJECTS -> CHAPTERS -> TOPICS -> CONTENT
  const byKind = {
    SUBJECT: results.filter(r => r.kind === "SUBJECT"),
    CHAPTER: results.filter(r => r.kind === "CHAPTER"),
    TOPIC: results.filter(r => r.kind === "TOPIC"),
    CONTENT: results.filter(r => r.kind === "CONTENT"),
  } as const;

  const sequence = [byKind.SUBJECT, byKind.CHAPTER, byKind.TOPIC, byKind.CONTENT] as const;

  for (const bucket of sequence) for (const r of bucket) {
    if (r.kind === "SUBJECT") {
      if (!opts.subjectIntent) continue;
      ensureHeading("Subjects", "SUBJECT");
      rows.push({ kind: "subject", item: r.item as Subject });
      continue;
    }
    if (r.kind === "CHAPTER") {
      ensureHeading("Chapters", "CHAPTER");
      rows.push({ kind: "chapter", item: r.item as Chapter });
      continue;
    }
    if (r.kind === "TOPIC") {
      const tp = r.item as Topic;
      if (!addedTopic.has(tp.id)) {
        ensureHeading("Topics", "TOPIC");
        rows.push({ kind: "topic", item: tp });
        // append all contents for topic
        const all = contentsForTopic(tp.id);
        if (all.length) {
          ensureHeading("Contents", "CONTENT");
          all.forEach(c => rows.push({ kind: "content", item: c }));
        }
        addedTopic.add(tp.id);
      }
      continue;
    }
    if (r.kind === "CONTENT") {
      const cnt = r.item as Content;
      const tp = topics.find(t => t.id === cnt.topicId);
      if (tp && !addedTopic.has(tp.id)) {
        ensureHeading("Topics", "TOPIC");
        rows.push({ kind: "topic", item: tp });
        const all = contentsForTopic(tp.id);
        if (all.length) {
          ensureHeading("Contents", "CONTENT");
          all.forEach(c => rows.push({ kind: "content", item: c }));
        }
        addedTopic.add(tp.id);
      }
      continue;
    }
  }
  return rows;
}

function passesTab(row: FlatRow, tab: Tab, subjectIntent: boolean): boolean {
  if (tab === "all" || row.kind === "heading") return true;
  if (tab === "subjects") return subjectIntent && row.kind === "subject";
  if (tab === "chapters") return row.kind === "chapter";
  if (tab === "topics") return row.kind === "topic";
  if (tab === "videos") return row.kind === "content" && (["ANIMATED_VIDEO","RECORDED_CLASS"] as ContentType[]).includes(row.item.type);
  if (tab === "notes") return row.kind === "content" && (["PDF_NOTES","SMART_NOTE"] as ContentType[]).includes(row.item.type);
  if (tab === "classes") return row.kind === "content" && (["LIVE_CLASS","RECORDED_CLASS"] as ContentType[]).includes(row.item.type);
  if (tab === "tests") return row.kind === "content" && (["MODEL_TEST","LIVE_EXAM","CQ_EXAM","QUIZ"] as ContentType[]).includes(row.item.type);
  return false;
}

function contentsForTopic(topicId: string): Content[] {
  const sync: ContentType[] = ["LIVE_CLASS","LIVE_EXAM","MODEL_TEST","CQ_EXAM"];
  const async: ContentType[] = ["ANIMATED_VIDEO","RECORDED_CLASS","PDF_NOTES","SMART_NOTE","QUIZ","HOMEWORK"];
  const all = contents.filter(c => c.topicId === topicId);
  const syncList = all.filter(c => sync.includes(c.type)).sort((a, b) => (new Date(b.startsAt ?? 0).getTime()) - (new Date(a.startsAt ?? 0).getTime()));
  const asyncList = all.filter(c => async.includes(c.type));
  return [...syncList, ...asyncList];
}

function buildBreadcrumb(tp: Topic): string {
  const ch = chapters.find(c => c.id === tp.chapterId);
  const subj = ch ? subjects.find(s => s.id === ch.subjectId) : undefined;
  return [subj?.name ?? "", ch?.name ?? ""].filter(Boolean).join(" → ");
}



"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { catalog, subjects, chapters, topics, contents } from "@/lib/search/mockData";
import { tokenize, highlight } from "@/lib/search/normalize";
import { Chapter, Content, Subject, Topic, ContentType } from "@/lib/search/types";
import { searchAll } from "@/lib/search/score";
import { IconSearch } from "@/components/ui/IconSearch";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { SubjectCard } from "@/components/search/cards/SubjectCard";
import { ChapterRow } from "@/components/search/cards/ChapterRow";
import { ContentCard } from "@/components/search/cards/ContentCard";
import { VideoCard } from "@/components/search/cards/VideoCard";
import { NoteCard } from "@/components/search/cards/NoteCard";
import { TestCard } from "@/components/search/cards/TestCard";

type Props = { initialQuery: string };

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

const RECENTS_KEY = "recentSearches";
const MAX_RECENTS = 8;

const trendingSeeds = [
  "Biology all",
  "Photosynthesis",
  "নিউটনের গতি-সুত্র",
  "Quadratic Roots",
  "বাংলা ১ম পত্র",
  "Algebra",
];

const shortcuts = [
  "Biology videos",
  "গণিত notes",
  "Physics classes",
  "Admission model test",
  "Photosynthesis quiz",
];

export default function SearchScreen({ initialQuery }: Props) {
  const [q, setQ] = useState(initialQuery ?? "");
  const [debouncedQ, setDebouncedQ] = useState(q);
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [recents, setRecents] = useState<string[]>([]);
  const [clicked, setClicked] = useState<string | null>(null);

  // debounce for typing; chips will override for immediate run
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q), 300);
    return () => clearTimeout(t);
  }, [q]);

  // init recents
  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENTS_KEY);
      if (raw) setRecents(JSON.parse(raw));
    } catch {}
  }, []);

  // search engine
  const tokens = useMemo(() => tokenize(debouncedQ), [debouncedQ]);
  const searchOut = useMemo(() => searchAll(debouncedQ, catalog), [debouncedQ]);
  const results = searchOut.results;
  const subjectIntent = useMemo(() => (searchOut.intent.inferredSubjectId != null) || searchOut.intent.subjectCandidateIds.length > 0, [searchOut]);
  const rows = useMemo(() => buildFlatRows(results, { subjectIntent }), [results, subjectIntent]);

  useEffect(() => {
    if (!debouncedQ.trim()) return;
    try {
      // Debug: surface detected intent and filters
      console.debug("search.intent", {
        q: debouncedQ,
        tokens: searchOut.intent.tokens,
        flags: searchOut.intent.flags,
        subjectCandidateIds: searchOut.intent.subjectCandidateIds,
        allowedContentTypes: searchOut.intent.allowedContentTypes,
      });
    } catch {}
  }, [debouncedQ, searchOut.intent]);
  const filtered = rows.filter(r => passesTab(r, activeTab, subjectIntent));

  // Structural tab lists
  const subjectList = useMemo(() => results.filter(r => r.kind === "SUBJECT").map(r => r.item as Subject), [results]);
  const chapterList = useMemo(() => results.filter(r => r.kind === "CHAPTER").map(r => r.item as Chapter), [results]);
  const topicList = useMemo(() => results.filter(r => r.kind === "TOPIC").map(r => r.item as Topic), [results]);

  // Videos tab derived groups
  const videoGroups = useMemo(() => buildVideoGroups(results), [results]);
  const totalVideos = videoGroups.live.length + videoGroups.recorded.length + videoGroups.animated.length + videoGroups.stories.length + videoGroups.guides.length;

  // Notes tab derived groups
  const noteGroups = useMemo(() => buildNoteGroups(results), [results]);
  const totalNotes = noteGroups.smart.length + noteGroups.classNotes.length + noteGroups.pdf.length + noteGroups.practice.length;

  // Tests tab derived groups
  const testGroups = useMemo(() => buildTestGroups(results), [results]);
  const totalTests = testGroups.mcq.length + testGroups.cq.length + testGroups.model.length + testGroups.live.length;

  const persistRecent = useCallback((query: string) => {
    if (!query.trim()) return;
    setRecents(prev => {
      const next = [query, ...prev.filter(x => x !== query)].slice(0, MAX_RECENTS);
      try { localStorage.setItem(RECENTS_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const runSearch = useCallback((query: string) => {
    setQ(query);
    setDebouncedQ(query); // immediate run (skip debounce)
    persistRecent(query);
    setActiveTab("all");
  }, [persistRecent]);

  const flashAndRun = useCallback((label: string) => {
    setClicked(label);
    setTimeout(() => setClicked(current => (current === label ? null : current)), 220);
    runSearch(label);
  }, [runSearch]);

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    runSearch(q);
  }, [q, runSearch]);

  const isLoading = q !== debouncedQ;
  const showEmptyState = debouncedQ.trim().length > 0 && filtered.length === 0 && !isLoading;
  const showWelcome = debouncedQ.trim().length === 0;

  return (
    <>
    <div className="w-full relative">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur p-4">
        {/* Header search input */}
        <form onSubmit={onSubmit} className="w-full">
          <div className="flex items-center gap-2 rounded-xl border bg-white shadow-sm px-3 py-2">
            <IconSearch className="w-5 h-5 text-muted-foreground" />
            <input
              aria-label="Search"
              placeholder="খুঁজুন বিষয়, অধ্যায়, টপিক…"
              className="flex-1 outline-none bg-transparent text-base"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </form>

        {/* Query summary */}
        {!showWelcome && (
          <div className="mt-2 text-sm text-muted-foreground">Showing results for ‘{debouncedQ}’</div>
        )}

        {/* Tabs for results view */}
        {!showWelcome && (
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
        )}

        {/* Loading skeleton under tabs */}
        {!showWelcome && isLoading && (
          <div className="mt-2 space-y-2">
            <div className="flex gap-2">
              <Skeleton className="h-7 w-16 rounded-full" />
              <Skeleton className="h-7 w-20 rounded-full" />
              <Skeleton className="h-7 w-24 rounded-full" />
            </div>
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
        )}
      </div>

      {/* Welcome sections */}
      {showWelcome && (
        <div className="mt-4 space-y-8">
          <Section title="Recent Searches">
            <ChipRow>
              {recents.length === 0 ? (
                <Muted>Searches you make will appear here</Muted>
              ) : (
                recents.map((r, idx) => (
                  <Chip key={`r-${idx}`} onClick={() => flashAndRun(r)} variant="recent" flash={clicked===r}>⏱ {r}</Chip>
                ))
              )}
            </ChipRow>
          </Section>

          <Section title="Trending">
            <ChipRow>
              {trendingSeeds.map((t, idx) => (
                <Chip key={`t-${idx}`} onClick={() => flashAndRun(t)} variant="trending" flash={clicked===t}>🔥 {t}</Chip>
              ))}
            </ChipRow>
          </Section>

          <Section title="Quick Shortcuts">
            <ChipRow>
              {shortcuts.map((s, idx) => (
                <Chip key={`s-${idx}`} onClick={() => flashAndRun(s)} flash={clicked===s}>{s}</Chip>
              ))}
            </ChipRow>
          </Section>
        </div>
      )}

      {/* Empty state */}
      {showEmptyState && (
        <div className="mt-10 text-center">
          <div className="text-3xl mb-2">🧐</div>
          <div className="text-base font-medium text-foreground">Couldn’t find anything for ‘{debouncedQ}’.</div>
          <div className="text-sm text-muted-foreground mt-1">Try a popular topic instead.</div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {trendingSeeds.slice(0, 6).map((t, idx) => (
              <Chip key={`empty-${idx}`} onClick={() => flashAndRun(t)} variant="trending" flash={clicked===t}>🔥 {t}</Chip>
            ))}
          </div>
        </div>
      )}

      {/* All tab segmented results (max 3 per section + See all) */}
      {!showWelcome && !showEmptyState && activeTab === "all" && (
        <div className="mt-4">
          {/* Subjects */}
          {subjectList.length > 0 && (
            <div className="mt-5">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">📘 Subjects</div>
                <button className="text-xs text-blue-600" onClick={() => setActiveTab("subjects")} aria-label="See all subjects">See all</button>
              </div>
              <div className="space-y-3">
                {subjectList.slice(0,3).map(s => (
                  <SubjectCard key={s.id} subject={s} tokens={searchOut.intent.tokens} />
                ))}
              </div>
            </div>
          )}

          {/* Chapters */}
          {chapterList.length > 0 && (
            <div className="mt-5">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">📝 Chapters</div>
                <button className="text-xs text-blue-600" onClick={() => setActiveTab("chapters")} aria-label="See all chapters">See all</button>
              </div>
              <div className="space-y-3">
                {chapterList.slice(0,3).map(c => (
                  <ChapterRow key={c.id} chapter={c} tokens={searchOut.intent.tokens} />
                ))}
              </div>
            </div>
          )}

          {/* Topics */}
          {topicList.length > 0 && (
            <div className="mt-5">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">✨ Topics</div>
                <button className="text-xs text-blue-600" onClick={() => setActiveTab("topics")} aria-label="See all topics">See all</button>
              </div>
              <div className="space-y-3">
                {topicList.slice(0,3).map(t => {
                  const breadcrumb = buildBreadcrumb(t);
                  return (
                    <div key={t.id} className="border rounded-lg p-3 bg-card text-card-foreground">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 shrink-0 rounded-lg bg-purple-50 flex items-center justify-center text-lg">✨</div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-muted-foreground">{highlight(breadcrumb, searchOut.intent.tokens)}</div>
                          <div className="font-medium mt-0.5">{highlight(t.name, searchOut.intent.tokens)}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Live Classes */}
          {videoGroups.live.length > 0 && (
            <div className="mt-5">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">⏱ Live Classes</div>
                <button className="text-xs text-blue-600" onClick={() => setActiveTab("videos")} aria-label="See all live classes">See all</button>
              </div>
              <div className="space-y-3">
                {videoGroups.live.slice(0,3).map(v => (
                  <VideoCard key={v.id} item={v} breadcrumb={breadcrumbFor(v)} tokens={tokens} onOpen={() => {}} onPrimary={() => {}} />
                ))}
              </div>
            </div>
          )}

          {/* Recorded Classes */}
          {videoGroups.recorded.length > 0 && (
            <div className="mt-5">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">▶ Recorded Classes</div>
                <button className="text-xs text-blue-600" onClick={() => setActiveTab("videos")} aria-label="See all recorded classes">See all</button>
              </div>
              <div className="space-y-3">
                {videoGroups.recorded.slice(0,3).map(v => (
                  <VideoCard key={v.id} item={v} breadcrumb={breadcrumbFor(v)} tokens={tokens} onOpen={() => {}} onPrimary={() => {}} />
                ))}
              </div>
            </div>
          )}

          {/* Animated Videos */}
          {videoGroups.animated.length > 0 && (
            <div className="mt-5">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">🎬 Animated Videos</div>
                <button className="text-xs text-blue-600" onClick={() => setActiveTab("videos")} aria-label="See all animated videos">See all</button>
              </div>
              <div className="space-y-3">
                {videoGroups.animated.slice(0,3).map(v => (
                  <VideoCard key={v.id} item={v} breadcrumb={breadcrumbFor(v)} tokens={tokens} onOpen={() => {}} onPrimary={() => {}} />
                ))}
              </div>
            </div>
          )}

          {/* Stories */}
          {videoGroups.stories.length > 0 && (
            <div className="mt-5">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">🎥 Stories</div>
                <button className="text-xs text-blue-600" onClick={() => setActiveTab("videos")} aria-label="See all stories">See all</button>
              </div>
              <div className="space-y-3">
                {videoGroups.stories.slice(0,3).map(v => (
                  <VideoCard key={v.id} item={v} breadcrumb={breadcrumbFor(v)} tokens={tokens} onOpen={() => {}} onPrimary={() => {}} />
                ))}
              </div>
            </div>
          )}

          {/* Guideline Videos */}
          {videoGroups.guides.length > 0 && (
            <div className="mt-5">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">📘 Guideline Videos</div>
                <button className="text-xs text-blue-600" onClick={() => setActiveTab("videos")} aria-label="See all guideline videos">See all</button>
              </div>
              <div className="space-y-3">
                {videoGroups.guides.slice(0,3).map(v => (
                  <VideoCard key={v.id} item={v} breadcrumb={breadcrumbFor(v)} tokens={tokens} onOpen={() => {}} onPrimary={() => {}} />
                ))}
              </div>
            </div>
          )}

          {/* Notes: Smart, Class, PDF */}
          {noteGroups.smart.length > 0 && (
            <div className="mt-5">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">🧠 Smart Notes</div>
                <button className="text-xs text-blue-600" onClick={() => setActiveTab("notes")} aria-label="See all smart notes">See all</button>
              </div>
              <div className="space-y-3">
                {noteGroups.smart.slice(0,3).map(n => (
                  <NoteCard key={n.id} item={n} breadcrumb={breadcrumbFor(n)} tokens={tokens} onOpen={() => {}} onPrimary={() => {}} />
                ))}
              </div>
            </div>
          )}
          {noteGroups.classNotes.length > 0 && (
            <div className="mt-5">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">📘 Class Notes</div>
                <button className="text-xs text-blue-600" onClick={() => setActiveTab("notes")} aria-label="See all class notes">See all</button>
              </div>
              <div className="space-y-3">
                {noteGroups.classNotes.slice(0,3).map(n => (
                  <NoteCard key={n.id} item={n} breadcrumb={breadcrumbFor(n)} tokens={tokens} onOpen={() => {}} onPrimary={() => {}} />
                ))}
              </div>
            </div>
          )}
          {noteGroups.pdf.length > 0 && (
            <div className="mt-5">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">📄 PDF Notes</div>
                <button className="text-xs text-blue-600" onClick={() => setActiveTab("notes")} aria-label="See all PDF notes">See all</button>
              </div>
              <div className="space-y-3">
                {noteGroups.pdf.slice(0,3).map(n => (
                  <NoteCard key={n.id} item={n} breadcrumb={breadcrumbFor(n)} tokens={tokens} onOpen={() => {}} onPrimary={() => {}} />
                ))}
              </div>
            </div>
          )}

          {/* Tests: MCQ, CQ, Model/Live */}
          {testGroups.mcq.length > 0 && (
            <div className="mt-5">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">📝 MCQ Practice</div>
                <button className="text-xs text-blue-600" onClick={() => setActiveTab("tests")} aria-label="See all MCQ practice">See all</button>
              </div>
              <div className="space-y-3">
                {testGroups.mcq.slice(0,3).map(t => (
                  <TestCard key={t.id} item={t} breadcrumb={breadcrumbFor(t)} tokens={tokens} onOpen={() => {}} onPrimary={() => {}} />
                ))}
              </div>
            </div>
          )}
          {testGroups.cq.length > 0 && (
            <div className="mt-5">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">✍ CQ / Written</div>
                <button className="text-xs text-blue-600" onClick={() => setActiveTab("tests")} aria-label="See all CQ exams">See all</button>
              </div>
              <div className="space-y-3">
                {testGroups.cq.slice(0,3).map(t => (
                  <TestCard key={t.id} item={t} breadcrumb={breadcrumbFor(t)} tokens={tokens} onOpen={() => {}} onPrimary={() => {}} />
                ))}
              </div>
            </div>
          )}
          {(testGroups.model.length > 0 || testGroups.live.length > 0) && (
            <div className="mt-5">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">📚 Model Tests / ⏱ Live Exams</div>
                <button className="text-xs text-blue-600" onClick={() => setActiveTab("tests")} aria-label="See all tests">See all</button>
              </div>
              <div className="space-y-3">
                {testGroups.model.slice(0,3).map(t => (
                  <TestCard key={t.id} item={t} breadcrumb={breadcrumbFor(t)} tokens={tokens} onOpen={() => {}} onPrimary={() => {}} />
                ))}
                {testGroups.live.slice(0,3).map(t => (
                  <TestCard key={t.id} item={t} breadcrumb={breadcrumbFor(t)} tokens={tokens} onOpen={() => {}} onPrimary={() => {}} />
                ))}
              </div>
            </div>
          )}

          {/* Global empty state for All tab */}
          {(subjectList.length + chapterList.length + topicList.length + videoGroups.live.length + videoGroups.recorded.length + videoGroups.animated.length + videoGroups.stories.length + videoGroups.guides.length + noteGroups.smart.length + noteGroups.classNotes.length + noteGroups.pdf.length + testGroups.mcq.length + testGroups.cq.length + testGroups.model.length + testGroups.live.length === 0) && (
            <div className="mt-10 text-center">
              <div className="text-3xl mb-2">🔎</div>
              <div className="text-base font-medium text-foreground">No results for ‘{debouncedQ}’.</div>
              <div className="text-sm text-muted-foreground mt-1">Try a trending topic:</div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {trendingSeeds.slice(0, 6).map((t, idx) => (
                  <Chip key={`all-empty-${idx}`} onClick={() => flashAndRun(t)} variant="trending" flash={clicked===t}>🔥 {t}</Chip>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Videos tab */}
      {!showWelcome && !showEmptyState && activeTab === "videos" && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>Showing videos for ‘{debouncedQ}’</div>
            <div>{totalVideos} videos</div>
          </div>

          {/* Loading skeletons for videos */}
          {isLoading && (
            <div className="mt-4 space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={`vid-skel-${i}`} className="border rounded-xl p-3">
                  <div className="flex items-start gap-3">
                    <div className="w-24 shrink-0">
                      <Skeleton className="w-full h-[54px] rounded-md" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Skeleton className="h-4 w-2/3" />
                      <div className="mt-2 flex gap-2">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                    <div className="shrink-0">
                      <Skeleton className="h-9 w-20 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Live */}
          {!isLoading && videoGroups.live.length > 0 && (
            <div className="mt-6">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">⏱ Live Classes</div>
                <button className="text-xs text-blue-600" aria-label="See all live classes">See all</button>
              </div>
              <div className="space-y-3">
                {videoGroups.live.map(v => (
                  <VideoCard key={v.id} item={v} breadcrumb={breadcrumbFor(v)} onOpen={() => {}} onPrimary={() => {}} />
                ))}
              </div>
            </div>
          )}

          {/* Recorded */}
          {!isLoading && videoGroups.recorded.length > 0 && (
            <div className="mt-6">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">▶ Recorded Classes</div>
                <button className="text-xs text-blue-600" aria-label="See all recorded classes">See all</button>
              </div>
              <div className="space-y-3">
                {videoGroups.recorded.map(v => (
                  <VideoCard key={v.id} item={v} breadcrumb={breadcrumbFor(v)} onOpen={() => {}} onPrimary={() => {}} />
                ))}
              </div>
            </div>
          )}

          {/* Animated */}
          {!isLoading && videoGroups.animated.length > 0 && (
            <div className="mt-6">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">🎬 Animated Videos</div>
                <button className="text-xs text-blue-600" aria-label="See all animated videos">See all</button>
              </div>
              <div className="space-y-3">
                {videoGroups.animated.map(v => (
                  <VideoCard key={v.id} item={v} breadcrumb={breadcrumbFor(v)} onOpen={() => {}} onPrimary={() => {}} />
                ))}
              </div>
            </div>
          )}

          {/* Stories */}
          {!isLoading && videoGroups.stories.length > 0 && (
            <div className="mt-6">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">🎥 Stories</div>
                <button className="text-xs text-blue-600" aria-label="See all stories">See all</button>
              </div>
              <div className="space-y-3">
                {videoGroups.stories.map(v => (
                  <VideoCard key={v.id} item={v} breadcrumb={breadcrumbFor(v)} onOpen={() => {}} onPrimary={() => {}} />
                ))}
              </div>
            </div>
          )}

          {/* Guideline */}
          {!isLoading && videoGroups.guides.length > 0 && (
            <div className="mt-6">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">📘 Guideline Videos</div>
                <button className="text-xs text-blue-600" aria-label="See all guideline videos">See all</button>
              </div>
              <div className="space-y-3">
                {videoGroups.guides.map(v => (
                  <VideoCard key={v.id} item={v} breadcrumb={breadcrumbFor(v)} onOpen={() => {}} onPrimary={() => {}} />
                ))}
              </div>
            </div>
          )}

          {/* Videos empty state */}
          {!isLoading && totalVideos === 0 && (
            <div className="mt-10 text-center">
              <div className="text-3xl mb-2">📺</div>
              <div className="text-base font-medium text-foreground">No videos for ‘{debouncedQ}’.</div>
              <div className="text-sm text-muted-foreground mt-1">Try a related topic:</div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {trendingSeeds.slice(0, 6).map((t, idx) => (
                  <Chip key={`videos-empty-${idx}`} onClick={() => flashAndRun(`${t} videos`)} variant="trending" flash={clicked===t}>🔥 {t}</Chip>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Subjects tab */}
      {!showWelcome && !showEmptyState && activeTab === "subjects" && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>Showing subjects for ‘{debouncedQ}’</div>
            <div>{subjectList.length} results</div>
          </div>
          {subjectList.length === 0 ? (
            <div className="mt-10 text-center">
              <div className="text-3xl mb-2">📘</div>
              <div className="text-base font-medium text-foreground">No subjects for ‘{debouncedQ}’.</div>
              <div className="text-sm text-muted-foreground mt-1">Try a related topic:</div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {trendingSeeds.slice(0, 6).map((t, idx) => (
                  <Chip key={`subs-empty-${idx}`} onClick={() => flashAndRun(t)} variant="trending" flash={clicked===t}>🔥 {t}</Chip>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {subjectList.map(s => (
                <SubjectCard key={s.id} subject={s} tokens={tokens} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Chapters tab */}
      {!showWelcome && !showEmptyState && activeTab === "chapters" && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>Showing chapters for ‘{debouncedQ}’</div>
            <div>{chapterList.length} results</div>
          </div>
          {chapterList.length === 0 ? (
            <div className="mt-10 text-center">
              <div className="text-3xl mb-2">📝</div>
              <div className="text-base font-medium text-foreground">No chapters for ‘{debouncedQ}’.</div>
              <div className="text-sm text-muted-foreground mt-1">Try a related topic:</div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {trendingSeeds.slice(0, 6).map((t, idx) => (
                  <Chip key={`chap-empty-${idx}`} onClick={() => flashAndRun(t)} variant="trending" flash={clicked===t}>🔥 {t}</Chip>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {chapterList.map(c => (
                <ChapterRow key={c.id} chapter={c} tokens={tokens} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Topics tab */}
      {!showWelcome && !showEmptyState && activeTab === "topics" && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>Showing topics for ‘{debouncedQ}’</div>
            <div>{topicList.length} results</div>
          </div>
          {topicList.length === 0 ? (
            <div className="mt-10 text-center">
              <div className="text-3xl mb-2">✨</div>
              <div className="text-base font-medium text-foreground">No topics for ‘{debouncedQ}’.</div>
              <div className="text-sm text-muted-foreground mt-1">Try a related topic:</div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {trendingSeeds.slice(0, 6).map((t, idx) => (
                  <Chip key={`topic-empty-${idx}`} onClick={() => flashAndRun(t)} variant="trending" flash={clicked===t}>🔥 {t}</Chip>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {topicList.map(t => {
                const breadcrumb = buildBreadcrumb(t);
                return (
                  <div key={t.id} className="border rounded-lg p-3 bg-card text-card-foreground">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 shrink-0 rounded-lg bg-purple-50 flex items-center justify-center text-lg">✨</div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs text-muted-foreground">{highlight(breadcrumb, tokens)}</div>
                        <div className="font-medium mt-0.5">{highlight(t.name, tokens)}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Notes tab */}
      {!showWelcome && !showEmptyState && activeTab === "notes" && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>Showing notes for ‘{debouncedQ}’</div>
            <div>{totalNotes} results</div>
          </div>

          {/* Skeletons */}
          {isLoading && (
            <div className="mt-4 space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={`note-skel-${i}`} className="border rounded-xl p-3">
                  <div className="flex items-start gap-3">
                    <div className="h-16 w-12 rounded-md border" />
                    <div className="min-w-0 flex-1">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-3 w-40 mt-2" />
                    </div>
                    <div className="shrink-0"><Skeleton className="h-9 w-20 rounded-full" /></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && noteGroups.smart.length > 0 && (
            <div className="mt-6">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">🧠 Smart Notes</div>
                <button className="text-xs text-blue-600" aria-label="See all smart notes">See all</button>
              </div>
              <div className="space-y-3">
                {noteGroups.smart.map(n => (
                  <NoteCard key={n.id} item={n} breadcrumb={breadcrumbFor(n)} onOpen={() => {}} onPrimary={() => {}} />
                ))}
              </div>
            </div>
          )}

          {!isLoading && noteGroups.classNotes.length > 0 && (
            <div className="mt-6">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">📘 Class Notes</div>
                <button className="text-xs text-blue-600" aria-label="See all class notes">See all</button>
              </div>
              <div className="space-y-3">
                {noteGroups.classNotes.map(n => (
                  <NoteCard key={n.id} item={n} breadcrumb={breadcrumbFor(n)} onOpen={() => {}} onPrimary={() => {}} />
                ))}
              </div>
            </div>
          )}

          {!isLoading && noteGroups.pdf.length > 0 && (
            <div className="mt-6">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">📄 PDF Notes</div>
                <button className="text-xs text-blue-600" aria-label="See all PDF notes">See all</button>
              </div>
              <div className="space-y-3">
                {noteGroups.pdf.map(n => (
                  <NoteCard key={n.id} item={n} breadcrumb={breadcrumbFor(n)} onOpen={() => {}} onPrimary={() => {}} />
                ))}
              </div>
            </div>
          )}

          {!isLoading && noteGroups.practice.length > 0 && (
            <div className="mt-6">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">✅ Practice Sheets</div>
                <button className="text-xs text-blue-600" aria-label="See all practice sheets">See all</button>
              </div>
              <div className="space-y-3">
                {noteGroups.practice.map(n => (
                  <NoteCard key={n.id} item={n} breadcrumb={breadcrumbFor(n)} onOpen={() => {}} onPrimary={() => {}} />
                ))}
              </div>
            </div>
          )}

          {!isLoading && totalNotes === 0 && (
            <div className="mt-10 text-center">
              <div className="text-3xl mb-2">📘</div>
              <div className="text-base font-medium text-foreground">No notes found for ‘{debouncedQ}’.</div>
              <div className="text-sm text-muted-foreground mt-1">Try:</div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {trendingSeeds.slice(0, 6).map((t, idx) => (
                  <Chip key={`notes-empty-${idx}`} onClick={() => flashAndRun(`${t} notes`)} variant="trending" flash={clicked===t}>🔥 {t}</Chip>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tests tab */}
      {!showWelcome && !showEmptyState && activeTab === "tests" && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>Showing tests for ‘{debouncedQ}’</div>
            <div>{totalTests} results</div>
          </div>

          {isLoading && (
            <div className="mt-4 space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={`test-skel-${i}`} className="border rounded-xl p-3">
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-md border" />
                    <div className="min-w-0 flex-1">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-3 w-40 mt-2" />
                    </div>
                    <div className="shrink-0"><Skeleton className="h-9 w-20 rounded-full" /></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && testGroups.mcq.length > 0 && (
            <div className="mt-6">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">📝 MCQ Practice</div>
                <button className="text-xs text-blue-600" aria-label="See all MCQ practice">See all</button>
              </div>
              <div className="space-y-3">
                {testGroups.mcq.map(t => (
                  <TestCard key={t.id} item={t} breadcrumb={breadcrumbFor(t)} onOpen={() => {}} onPrimary={() => {}} />
                ))}
              </div>
            </div>
          )}

          {!isLoading && testGroups.cq.length > 0 && (
            <div className="mt-6">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">✍ CQ / Written</div>
                <button className="text-xs text-blue-600" aria-label="See all CQ exams">See all</button>
              </div>
              <div className="space-y-3">
                {testGroups.cq.map(t => (
                  <TestCard key={t.id} item={t} breadcrumb={breadcrumbFor(t)} onOpen={() => {}} onPrimary={() => {}} />
                ))}
              </div>
            </div>
          )}

          {!isLoading && testGroups.model.length > 0 && (
            <div className="mt-6">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">📚 Model Tests</div>
                <button className="text-xs text-blue-600" aria-label="See all model tests">See all</button>
              </div>
              <div className="space-y-3">
                {testGroups.model.map(t => (
                  <TestCard key={t.id} item={t} breadcrumb={breadcrumbFor(t)} onOpen={() => {}} onPrimary={() => {}} />
                ))}
              </div>
            </div>
          )}

          {!isLoading && testGroups.live.length > 0 && (
            <div className="mt-6">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">⏱ Live Exams</div>
                <button className="text-xs text-blue-600" aria-label="See all live exams">See all</button>
              </div>
              <div className="space-y-3">
                {testGroups.live.map(t => (
                  <TestCard key={t.id} item={t} breadcrumb={breadcrumbFor(t)} onOpen={() => {}} onPrimary={() => {}} />
                ))}
              </div>
            </div>
          )}

          {!isLoading && totalTests === 0 && (
            <div className="mt-10 text-center">
              <div className="text-3xl mb-2">🧪</div>
              <div className="text-base font-medium text-foreground">No tests for ‘{debouncedQ}’.</div>
              <div className="text-sm text-muted-foreground mt-1">Try a related assessment:</div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {trendingSeeds.slice(0, 6).map((t, idx) => (
                  <Chip key={`tests-empty-${idx}`} onClick={() => flashAndRun(`${t} model test`)} variant="trending" flash={clicked===t}>🔥 {t}</Chip>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Classes tab */}
      {!showWelcome && !showEmptyState && activeTab === "classes" && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>Showing classes for ‘{debouncedQ}’</div>
            <div>{videoGroups.live.length + videoGroups.recorded.length} results</div>
          </div>

          {isLoading && (
            <div className="mt-4 space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={`class-skel-${i}`} className="border rounded-xl p-3">
                  <div className="flex items-start gap-3">
                    <div className="w-24 shrink-0"><Skeleton className="w-full h-[54px] rounded-md" /></div>
                    <div className="min-w-0 flex-1">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-3 w-40 mt-2" />
                    </div>
                    <div className="shrink-0"><Skeleton className="h-9 w-20 rounded-full" /></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && videoGroups.live.length > 0 && (
            <div className="mt-6">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">⏱ Live Classes</div>
                <button className="text-xs text-blue-600" aria-label="See all live classes">See all</button>
              </div>
              <div className="space-y-3">
                {videoGroups.live.map(v => (
                  <VideoCard key={v.id} item={v} breadcrumb={breadcrumbFor(v)} onOpen={() => {}} onPrimary={() => {}} />
                ))}
              </div>
            </div>
          )}

          {!isLoading && videoGroups.recorded.length > 0 && (
            <div className="mt-6">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">▶ Recorded Classes</div>
                <button className="text-xs text-blue-600" aria-label="See all recorded classes">See all</button>
              </div>
              <div className="space-y-3">
                {videoGroups.recorded.map(v => (
                  <VideoCard key={v.id} item={v} breadcrumb={breadcrumbFor(v)} onOpen={() => {}} onPrimary={() => {}} />
                ))}
              </div>
            </div>
          )}

          {!isLoading && (videoGroups.live.length + videoGroups.recorded.length === 0) && (
            <div className="mt-10 text-center">
              <div className="text-3xl mb-2">🎓</div>
              <div className="text-base font-medium text-foreground">No classes for ‘{debouncedQ}’ right now.</div>
              <div className="text-sm text-muted-foreground mt-1">Try:</div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {trendingSeeds.slice(0, 6).map((t, idx) => (
                  <Chip key={`classes-empty-${idx}`} onClick={() => flashAndRun(`${t} class`)} variant="trending" flash={clicked===t}>🔥 {t}</Chip>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>

    </>
  );
}

function buildFlatRows(results: ReturnType<typeof searchAll>["results"], opts: { subjectIntent: boolean }): FlatRow[] {
  const rows: FlatRow[] = [];
  const seen: { [K in "SUBJECT"|"CHAPTER"|"TOPIC"]?: boolean } = {};

  const ensureHeading = (text: string, key?: keyof typeof seen) => {
    if (!key) { rows.push({ kind: "heading", text }); return; }
    if (!seen[key]) { rows.push({ kind: "heading", text }); seen[key] = true; }
  };

  const subjectsBucket = results.filter(r => r.kind === "SUBJECT");
  const chaptersBucket = results.filter(r => r.kind === "CHAPTER");
  const topicsBucket = results.filter(r => r.kind === "TOPIC");
  const contentsBucket = results.filter(r => r.kind === "CONTENT").map(r => r.item as Content);

  if (opts.subjectIntent && subjectsBucket.length) {
    ensureHeading("📘 Subjects", "SUBJECT");
    subjectsBucket.forEach(r => rows.push({ kind: "subject", item: r.item as Subject }));
  }

  if (opts.subjectIntent && chaptersBucket.length) {
    ensureHeading("📝 Chapters", "CHAPTER");
    chaptersBucket.forEach(r => rows.push({ kind: "chapter", item: r.item as Chapter }));
  }

  if (opts.subjectIntent && topicsBucket.length) {
    ensureHeading("✨ Topics", "TOPIC");
    topicsBucket.forEach(r => rows.push({ kind: "topic", item: r.item as Topic }));
  }

  if (contentsBucket.length) {
    const live = contentsBucket.filter(c => ["LIVE_CLASS"].includes(c.type));
    if (live.length) {
      ensureHeading("⏱ Live Classes");
      live.forEach(c => rows.push({ kind: "content", item: c }));
    }
    const recorded = contentsBucket.filter(c => ["RECORDED_CLASS"].includes(c.type));
    if (recorded.length) {
      ensureHeading("▶ Recorded Classes");
      recorded.forEach(c => rows.push({ kind: "content", item: c }));
    }
    const notes = contentsBucket.filter(c => ["PDF_NOTES","SMART_NOTE"].includes(c.type));
    if (notes.length) {
      ensureHeading("📄 Notes");
      notes.forEach(c => rows.push({ kind: "content", item: c }));
    }
    const tests = contentsBucket.filter(c => ["MODEL_TEST","CQ_EXAM","QUIZ","LIVE_EXAM"].includes(c.type));
    if (tests.length) {
      ensureHeading("🧪 Tests");
      tests.forEach(c => rows.push({ kind: "content", item: c }));
    }
    const guideline = contentsBucket.filter(c => ["ANIMATED_VIDEO"].includes(c.type));
    if (guideline.length) {
      ensureHeading("🎥 Guideline Videos");
      guideline.forEach(c => rows.push({ kind: "content", item: c }));
    }
  }
  return rows;
}

function passesTab(row: FlatRow, tab: Tab, subjectIntent: boolean): boolean {
  if (tab === "all" || row.kind === "heading") return true;
  if (tab === "subjects") return subjectIntent && row.kind === "subject";
  if (tab === "chapters") return row.kind === "chapter";
  if (tab === "topics") return row.kind === "topic";
  if (tab === "videos") return row.kind === "content" && (["LIVE_CLASS","RECORDED_CLASS","ANIMATED_VIDEO"] as ContentType[]).includes(row.item.type);
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

function breadcrumbFor(content: Content): string {
  const tp = topics.find(t => t.id === content.topicId);
  if (!tp) return "";
  const ch = chapters.find(c => c.id === tp.chapterId);
  const subj = ch ? subjects.find(s => s.id === ch.subjectId) : undefined;
  return [subj?.name ?? "", ch?.name ?? ""].filter(Boolean).join(" → ");
}

function buildVideoGroups(results: ReturnType<typeof searchAll>): {
  live: Content[];
  recorded: Content[];
  animated: Content[];
  stories: Content[];
  guides: Content[];
} {
  const all = results.filter(r => r.kind === "CONTENT").map(r => r.item as Content);
  return {
    live: all.filter(c => ["LIVE_CLASS","LIVE_EXAM"].includes(c.type)),
    recorded: all.filter(c => ["RECORDED_CLASS"].includes(c.type)),
    animated: all.filter(c => ["ANIMATED_VIDEO"].includes(c.type)),
    stories: all.filter(c => c.type === "STORY"),
    guides: all.filter(c => c.type === "GUIDELINE_VIDEO"),
  };
}

function buildNoteGroups(results: ReturnType<typeof searchAll>): {
  smart: Content[];
  classNotes: Content[];
  pdf: Content[];
  practice: Content[];
} {
  const all = results.filter(r => r.kind === "CONTENT").map(r => r.item as Content);
  return {
    smart: all.filter(c => c.type === "SMART_NOTE"),
    classNotes: all.filter(c => false), // no dedicated class note type in mock
    pdf: all.filter(c => c.type === "PDF_NOTES"),
    practice: all.filter(c => c.type === "HOMEWORK"),
  };
}

function buildTestGroups(results: ReturnType<typeof searchAll>): {
  mcq: Content[];
  cq: Content[];
  model: Content[];
  live: Content[];
} {
  const all = results.filter(r => r.kind === "CONTENT").map(r => r.item as Content);
  return {
    mcq: all.filter(c => c.type === "QUIZ"),
    cq: all.filter(c => c.type === "CQ_EXAM"),
    model: all.filter(c => c.type === "MODEL_TEST"),
    live: all.filter(c => c.type === "LIVE_EXAM"),
  };
}

function suggestionsFor(q: string): string[] {
  const base = [
    "Spelling ঠিক আছে কি?",
    "বাংলা/English শব্দ আলাদা করে চেষ্টা করুন",
    "Subject দিয়ে শুরু করুন যেমন Biology",
  ];
  const related = subjects
    .map(s => s.name)
    .filter(n => n.toLowerCase().includes(q.toLowerCase()))
    .slice(0, 3);
  return [...base, ...related];
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 mb-2">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{title}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function ChipRow({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-2">{children}</div>;
}

function Chip({ onClick, children, variant = "default", flash = false }: { onClick: () => void; children: React.ReactNode; variant?: "default"|"trending"|"recent"; flash?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={
        `px-3 py-1 rounded-full text-sm border border-gray-200 transition-colors ${
          variant === "trending" ? "shadow-sm" : ""
        } ${flash ? "bg-amber-100" : "bg-white hover:bg-gray-100"}`
      }
    >
      {children}
    </button>
  );
}

function Muted({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-muted-foreground">{children}</div>;
}



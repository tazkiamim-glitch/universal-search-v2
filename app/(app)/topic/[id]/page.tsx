import { catalog } from "@/lib/search/mockData";
import { VideoCard } from "@/components/search/cards/VideoCard";
import { NoteCard } from "@/components/search/cards/NoteCard";
import { TestCard } from "@/components/search/cards/TestCard";

export default function TopicPage({ params }: { params: { id: string } }) {
  const topic = catalog.topics.find((t) => t.id === params.id);
  if (!topic) {
    return (
      <div className="p-4">
        <h1 className="text-lg font-semibold">Topic not found</h1>
        <p className="text-sm text-muted-foreground">The topic you are looking for does not exist.</p>
      </div>
    );
  }

  const chapter = catalog.chapters.find((c) => c.id === topic.chapterId);
  const subject = chapter ? catalog.subjects.find((s) => s.id === chapter.subjectId) : undefined;
  const breadcrumb = [subject?.name, chapter?.index ? `Chapter ${chapter.index}` : chapter?.name, topic.name]
    .filter(Boolean)
    .join(" → ");

  const items = catalog.contents.filter((c) => c.topicId === topic.id);

  return (
    <div className="w-full p-4 space-y-4">
      <div>
        <div className="text-xs text-muted-foreground">{breadcrumb}</div>
        <h1 className="text-xl font-bold mt-1">{topic.name}</h1>
      </div>

      <div className="space-y-3" role="list">
        {items.map((it) => {
          if (["LIVE_CLASS","RECORDED_CLASS","ANIMATED_VIDEO","GUIDELINE_VIDEO","STORY"].includes(it.type)) {
            return <VideoCard key={it.id} item={it} />;
          }
          if (["QUIZ","MODEL_TEST","LIVE_EXAM","CQ_EXAM"].includes(it.type)) {
            return <TestCard key={it.id} item={it} />;
          }
          if (["PDF_NOTES","SMART_NOTE","HOMEWORK"].includes(it.type)) {
            return <NoteCard key={it.id} item={it} />;
          }
          return null;
        })}
      </div>
    </div>
  );
}



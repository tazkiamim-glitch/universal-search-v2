import { catalog } from "./fixtures";
import type { Subject, Topic, Chapter, Content } from "./types";

const bnDigits = ["০","১","২","৩","৪","৫","৬","৭","৮","৯"] as const;
const enDigits = ["0","1","2","3","4","5","6","7","8","9"] as const;

export function toBnDigit(input: number | string): string {
  const s = String(input);
  return s.replace(/[0-9]/g, (d) => bnDigits[Number(d)]);
}

export function toEnDigit(input: string): string {
  return input.replace(/[০-৯]/g, (d) => String(enDigits[bnDigits.indexOf(d as any)]));
}

export function subjectDisplayName(subject: Subject): string {
  return subject.paper ? `${subject.name} ${subject.paper}` : subject.name;
}

export function breadcrumb(topicId: string): string | null {
  const topic: Topic | undefined = catalog.topics.find(t => t.id === topicId);
  if (!topic) return null;
  const chapter: Chapter | undefined = catalog.chapters.find(c => c.id === topic.chapterId);
  if (!chapter) return null;
  const subject: Subject | undefined = catalog.subjects.find(s => s.id === chapter.subjectId);
  if (!subject) return null;
  return `${subjectDisplayName(subject)} › ${chapter.name} › ${topic.name}`;
}

export function attachContentBreadcrumb<T extends Content>(content: T): T & { breadcrumb: string | null } {
  return { ...content, breadcrumb: breadcrumb(content.topicId) };
}

export function attachBreadcrumbs(contents: Content[]): Array<Content & { breadcrumb: string | null }> {
  return contents.map(attachContentBreadcrumb);
}



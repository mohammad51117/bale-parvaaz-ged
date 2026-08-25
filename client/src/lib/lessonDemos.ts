import { bookData } from "@/lib/bookData";

type BookPage = { page: number; title: string; section: string; kind: string; hasVisual: boolean; content: string; wordCount: number };

export type DemoLesson = {
  id: string;
  subject: string;
  shortSubject: string;
  title: string;
  chapter: string;
  focus: string;
  sourcePage: number;
  sourceImage: string;
  accent: string;
};

export const demoLessons: readonly DemoLesson[] = [
  {
    id: "math-foundations",
    subject: "Mathematical Reasoning",
    shortSubject: "Math Reasoning",
    title: "Read the GED math blueprint before you calculate",
    chapter: "Chapter 1 · Mathematical Reasoning",
    focus: "Identify the four content areas, the two testing modes, and the time-management habits that shape every practice set.",
    sourcePage: 9,
    sourceImage: "/manus-storage/math_24a9d65b.jpg",
    accent: "#C36B3D",
  },
  {
    id: "language-argument",
    subject: "Reasoning Through Language Arts",
    shortSubject: "Language Arts",
    title: "Read for the writer’s claim and evidence",
    chapter: "RLA · Reading and reasoning",
    focus: "Use the source page to notice how a strong reader separates the central claim from the details that support it.",
    sourcePage: 295,
    sourceImage: "/manus-storage/language_fa621779.jpg",
    accent: "#496D72",
  },
  {
    id: "social-civics",
    subject: "Social Studies",
    shortSubject: "Social Studies",
    title: "Trace how the Constitution distributes power",
    chapter: "Civics and Government",
    focus: "Study the source page as a civics map: identify the constitutional idea, the level of government involved, and the evidence used to support it.",
    sourcePage: 107,
    sourceImage: "/manus-storage/social_04b1068a.jpg",
    accent: "#8A6B42",
  },
  {
    id: "science-evidence",
    subject: "Science",
    shortSubject: "Science",
    title: "Turn a scientific page into evidence",
    chapter: "Science · Reading data and explanations",
    focus: "Read the source page in order: question, evidence, relationship, and conclusion. Keep every visual beside the text it explains.",
    sourcePage: 208,
    sourceImage: "/manus-storage/science_1c0d433a.jpg",
    accent: "#5C7399",
  },
];

export function getDemoLesson(id: string) {
  return demoLessons.find((lesson) => lesson.id === id);
}

export function getLessonSourcePage(lesson: DemoLesson) {
  return (bookData.pages as readonly BookPage[]).find((page) => page.page === lesson.sourcePage);
}

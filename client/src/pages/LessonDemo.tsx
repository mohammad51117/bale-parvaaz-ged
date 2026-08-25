import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, FileText, Image as ImageIcon } from "lucide-react";
import { Link, useLocation, useRoute } from "wouter";
import { demoLessons } from "@/lib/lessonDemos";
import { getSocialStudiesLesson, socialStudiesLessons } from "@/lib/socialStudiesLessons";

type ReaderLesson = {
  id: string;
  subject: string;
  shortSubject: string;
  title: string;
  chapter: string;
  sourceStart: number;
  sourceEnd: number;
  sourceImage: string;
  focus: string;
  studyText?: string;
  practiceLabel?: string;
  accent: string;
};

const allReaderLessons: ReaderLesson[] = [
  ...demoLessons.map((lesson) => ({ ...lesson, sourceStart: lesson.sourcePage, sourceEnd: lesson.sourcePage })),
  ...socialStudiesLessons.map((lesson) => ({ ...lesson, sourceStart: lesson.sourcePages[0], sourceEnd: lesson.sourcePages[1] })),
];

export default function LessonDemo() {
  const [, params] = useRoute("/lesson/:lessonId");
  const [, setLocation] = useLocation();
  const lesson = allReaderLessons.find((item) => item.id === params?.lessonId) || allReaderLessons[0];
  const socialLesson = getSocialStudiesLesson(lesson.id);
  const currentIndex = allReaderLessons.findIndex((item) => item.id === lesson.id);
  const nextLesson = allReaderLessons[currentIndex + 1];
  const isChapterLesson = Boolean(socialLesson);
  const pageLabel = lesson.sourceStart === lesson.sourceEnd ? `Source folio ${lesson.sourceStart}` : `Source folios ${lesson.sourceStart}–${lesson.sourceEnd}`;
  const practiceSubject = lesson.subject.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <div className="app-shell lesson-shell"><main className="main-canvas">
      <header className="topbar"><Link href="/" className="topbar-back"><ArrowLeft size={17} /> Study desk</Link><div className="breadcrumb"><span>Lessons</span><span className="slash">/</span><strong>{lesson.shortSubject}</strong></div><div className="topbar-actions"><span className="folio-label">{isChapterLesson ? "SOCIAL STUDIES CHAPTER" : `DEMO LESSON ${currentIndex + 1} / 4`}</span></div></header>
      <div className="content-wrap">
        <section className="lesson-hero" style={{ borderTopColor: lesson.accent }}><div className="eyebrow"><BookOpen size={15} /> {isChapterLesson ? "MCGRAW HILL SOURCE LESSON" : "SOURCE-GROUNDED LESSON"}</div><div className="lesson-hero-grid"><div><span className="lesson-subject-chip" style={{ color: lesson.accent }}>{lesson.shortSubject}</span><h1>{lesson.title}</h1><p className="lesson-lede">{lesson.focus}</p><div className="lesson-meta"><span>{lesson.chapter}</span><span><FileText size={14} /> {pageLabel}</span></div></div><div className="lesson-intent"><span className="eyebrow">HOW TO STUDY THIS CHAPTER</span><strong>Read the source first.</strong><p>Use the complete folio to notice the author’s structure, evidence, and any map, table, graph, quotation, or other visual context.</p></div></div></section>
        <section className="lesson-source-section" aria-labelledby="lesson-source-title"><div className="section-heading"><div><div className="eyebrow"><ImageIcon size={14} /> COMPLETE SOURCE PAGE</div><h2 id="lesson-source-title">The original folio stays intact.</h2></div><span className="lesson-source-label">McGraw Hill Education · {pageLabel}</span></div><p className="section-intro">This durable page image is bundled with the app. Visual material remains in the same source context instead of being separated into a missing attachment.</p><figure className="lesson-folio-figure"><div className="lesson-folio-frame"><img src={lesson.sourceImage} alt={`${lesson.subject} ${pageLabel}`} /></div><figcaption><span>MCGRAW HILL EDUCATION / GED SOCIAL STUDIES</span><span>FOLIO {lesson.sourceStart}{lesson.sourceEnd !== lesson.sourceStart ? `–${lesson.sourceEnd}` : ""}</span></figcaption></figure></section>
        <section className="lesson-notes-grid"><article className="lesson-notes-card"><div className="eyebrow">LESSON NOTES</div><h2>{isChapterLesson ? "Read the chapter as evidence." : "Make the page answerable."}</h2><p>{lesson.studyText || lesson.focus}</p><div className="lesson-reading-steps"><div><span>01</span><strong>Notice</strong><p>What is the page asking you to understand?</p></div><div><span>02</span><strong>Connect</strong><p>Which words, data, or visual details carry the idea?</p></div><div><span>03</span><strong>Explain</strong><p>Say the reasoning aloud before you practice.</p></div></div></article><aside className="lesson-practice-card"><div className="eyebrow">NEXT STEP</div><CheckCircle2 size={25} style={{ color: lesson.accent }} /><h3>{isChapterLesson ? "Practice this chapter." : "Ready for a short practice pass?"}</h3><p>{isChapterLesson ? "Continue with the linked McGraw Hill question set for this Social Studies chapter." : "This demo lesson is connected to the existing question library for the same GED section."}</p><button className="button-primary" onClick={() => setLocation(`/subject/${practiceSubject}`)}>{lesson.practiceLabel || `Open ${lesson.shortSubject} practice`} <ArrowRight size={16} /></button></aside></section>
        <nav className="lesson-next-nav" aria-label="Lesson navigation"><Link href="/"><ArrowLeft size={15} /> Back to all lessons</Link>{nextLesson ? <Link href={`/lesson/${nextLesson.id}`}>Next lesson: {nextLesson.shortSubject}<ArrowRight size={15} /></Link> : <span>Lesson library complete</span>}</nav>
      </div><footer className="site-footer"><span>Bale Parvaaz GED</span><span>Lessons built around the source book.</span><span>Teacher Momeni · {pageLabel}</span></footer>
    </main></div>
  );
}

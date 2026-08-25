import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, FileText, Image as ImageIcon } from "lucide-react";
import { Link, useLocation, useRoute } from "wouter";
import { demoLessons, getDemoLesson, getLessonSourcePage } from "@/lib/lessonDemos";

export default function LessonDemo() {
  const [, params] = useRoute("/lesson/:lessonId");
  const [, setLocation] = useLocation();
  const lesson = getDemoLesson(params?.lessonId || "") || demoLessons[0];
  const sourcePage = getLessonSourcePage(lesson);
  const currentIndex = demoLessons.findIndex((item) => item.id === lesson.id);
  const nextLesson = demoLessons[currentIndex + 1];

  return (
    <div className="app-shell lesson-shell">
      <main className="main-canvas">
        <header className="topbar">
          <Link href="/" className="topbar-back"><ArrowLeft size={17} /> Study desk</Link>
          <div className="breadcrumb"><span>Lessons</span><span className="slash">/</span><strong>{lesson.shortSubject}</strong></div>
          <div className="topbar-actions"><span className="folio-label">DEMO LESSON {currentIndex + 1} / {demoLessons.length}</span></div>
        </header>

        <div className="content-wrap">
          <section className="lesson-hero" style={{ borderTopColor: lesson.accent }}>
            <div className="eyebrow"><BookOpen size={15} /> SOURCE-GROUNDED LESSON</div>
            <div className="lesson-hero-grid">
              <div>
                <span className="lesson-subject-chip" style={{ color: lesson.accent }}>{lesson.shortSubject}</span>
                <h1>{lesson.title}</h1>
                <p className="lesson-lede">{lesson.focus}</p>
                <div className="lesson-meta"><span>{lesson.chapter}</span><span><FileText size={14} /> Source folio {lesson.sourcePage}</span></div>
              </div>
              <div className="lesson-intent"><span className="eyebrow">HOW TO USE THIS PAGE</span><strong>Read the page first.</strong><p>Then return to the lesson notes and explain the idea in your own words before opening practice.</p></div>
            </div>
          </section>

          <section className="lesson-source-section" aria-labelledby="lesson-source-title">
            <div className="section-heading"><div><div className="eyebrow"><ImageIcon size={14} /> COMPLETE SOURCE PAGE</div><h2 id="lesson-source-title">The original folio stays intact.</h2></div><span className="lesson-source-label">{sourcePage?.title || "Source page"} · {lesson.sourcePage}</span></div>
            <p className="section-intro">Tables, maps, figures, and page layout remain together in the durable source image below. Nothing is loaded from the teacher’s computer.</p>
            <figure className="lesson-folio-figure"><div className="lesson-folio-frame"><img src={lesson.sourceImage} alt={`${lesson.subject} source folio ${lesson.sourcePage}`} /></div><figcaption><span>MCGRAW HILL / GED PREPARATION</span><span>FOLIO {String(lesson.sourcePage).padStart(3, "0")}</span></figcaption></figure>
          </section>

          <section className="lesson-notes-grid">
            <article className="lesson-notes-card"><div className="eyebrow">LESSON NOTES</div><h2>Make the page answerable.</h2><p>{lesson.focus}</p><div className="lesson-reading-steps"><div><span>01</span><strong>Notice</strong><p>What is the page asking you to understand?</p></div><div><span>02</span><strong>Connect</strong><p>Which words, data, or visual details carry the idea?</p></div><div><span>03</span><strong>Explain</strong><p>Say the reasoning aloud before you practice.</p></div></div></article>
            <aside className="lesson-practice-card"><div className="eyebrow">NEXT STEP</div><CheckCircle2 size={25} style={{ color: lesson.accent }} /><h3>Ready for a short practice pass?</h3><p>This demo lesson is connected to the existing question library for the same GED section.</p><button className="button-primary" onClick={() => setLocation(`/subject/${lesson.subject.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`)}>Open {lesson.shortSubject} practice <ArrowRight size={16} /></button></aside>
          </section>

          <nav className="lesson-next-nav" aria-label="Demo lesson navigation"><Link href="/"><ArrowLeft size={15} /> Back to all lessons</Link>{nextLesson ? <Link href={`/lesson/${nextLesson.id}`}>Next demo: {nextLesson.shortSubject}<ArrowRight size={15} /></Link> : <span>Four-subject demo complete</span>}</nav>
        </div>
        <footer className="site-footer"><span>Bale Parvaaz GED</span><span>Lessons built around the book, not around the noise.</span><span>Teacher Momeni · source folio {lesson.sourcePage}</span></footer>
      </main>
    </div>
  );
}

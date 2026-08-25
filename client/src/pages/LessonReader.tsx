/* Atlas Study Hall: focused lesson room where students learn a title, prove it with one practice question, and save completion. */
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, CircleHelp, Clock3, Lightbulb, RotateCcw, Target } from "lucide-react";
import { Link, useLocation, useRoute } from "wouter";
import { studyMap } from "@/lib/studyMap";
import { studyLessonContentById } from "@/lib/studyLessonContent";
import { sourceLessonContentById } from "@/lib/sourceLessonContent";

const COMPLETION_KEY = "bale-parvaaz-lesson-complete";

function getCompleted(): string[] {
  try {
    const value = JSON.parse(localStorage.getItem(COMPLETION_KEY) || "[]");
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch { return []; }
}

export default function LessonReader() {
  const [, params] = useRoute<{ lessonId: string }>("/lesson/:lessonId");
  const [, setLocation] = useLocation();
  const lessonId = params?.lessonId || "";
  const genericContent = studyLessonContentById[lessonId];
  const sourceContent = sourceLessonContentById[lessonId];
  const content = sourceContent ? { lesson: sourceContent.lessonSummary, keyMove: sourceContent.focusPoints.join(" "), workedExample: sourceContent.sourceExcerpt, question: sourceContent.question, choices: sourceContent.choices, answer: sourceContent.answer, explanation: sourceContent.explanation, finishRule: sourceContent.finishRule, sourcePage: sourceContent.sourcePage } : genericContent ? { ...genericContent, sourcePage: null } : null;
  const location = useMemo(() => {
    for (const subject of studyMap) for (const chapter of subject.chapters) {
      const lessonIndex = chapter.lessons.findIndex((lesson) => lesson.id === lessonId);
      if (lessonIndex >= 0) return { subject, chapter, lesson: chapter.lessons[lessonIndex], lessonIndex };
    }
    return null;
  }, [lessonId]);
  const flatLessons = useMemo(() => studyMap.flatMap((subject) => subject.chapters.flatMap((chapter) => chapter.lessons.map((lesson) => ({ subject, chapter, lesson })))), []);
  const currentIndex = flatLessons.findIndex((item) => item.lesson.id === lessonId);
  const previous = currentIndex > 0 ? flatLessons[currentIndex - 1] : null;
  const next = currentIndex >= 0 && currentIndex < flatLessons.length - 1 ? flatLessons[currentIndex + 1] : null;
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [completed, setCompleted] = useState(() => getCompleted().includes(lessonId));

  useEffect(() => { setSelected(null); setChecked(false); setCompleted(getCompleted().includes(lessonId)); }, [lessonId]);

  if (!location || !content) return <div className="lesson-reader-empty"><CircleHelp size={22} /><h1>Lesson not found</h1><p>Return to the Study Map and choose a lesson path.</p><Link href="/study-map" className="back-link"><ArrowLeft size={16} /> Study Map</Link></div>;
  const { subject, chapter, lesson } = location;
  const isCorrect = selected === content.answer;
  const canComplete = checked && isCorrect;
  const saveCompletion = () => {
    if (!canComplete) return;
    const nextCompleted = Array.from(new Set([...getCompleted(), lessonId]));
    localStorage.setItem(COMPLETION_KEY, JSON.stringify(nextCompleted));
    setCompleted(true);
  };
  const resetLesson = () => { setSelected(null); setChecked(false); };

  return <div className="lesson-reader-shell">
    <header className="lesson-reader-header"><div className="subject-brand"><img className="brand-logo" src="/manus-storage/teacher-momeni-logo_2d3d1795.png" alt="Teacher Momeni logo" /><div><strong>Bale Parvaaz</strong><small>GED / TEACHER MOMENI</small></div></div><Link href="/study-map" className="back-link"><ArrowLeft size={16} /> Study Map</Link></header>
    <main className="lesson-reader-main">
      <div className="lesson-reader-kicker"><Link href="/study-map">Study Map</Link><span>/</span><span>{subject.shortName}</span><span>/</span><strong>Lesson</strong></div>
      <section className="lesson-reader-hero"><div><div className="eyebrow" style={{ color: subject.color }}><BookOpen size={15} /> {subject.shortName} · CHAPTER {chapter.number}</div><h1>{lesson.title}</h1><p>Learn the idea, use the key move, then prove your understanding with one focused practice question.</p><div className="lesson-reader-meta"><span><Clock3 size={14} /> {lesson.time}</span><span><Target size={14} /> {completed ? "Completed" : "In progress"}</span><span>{chapter.title}</span>{content.sourcePage ? <span>Source folio {content.sourcePage}</span> : null}</div></div><div className={`lesson-status-card ${completed ? "complete" : ""}`}><span>{completed ? "LESSON COMPLETE" : "YOUR NEXT STOP"}</span><strong>{completed ? <CheckCircle2 size={26} /> : `${String(chapter.number).padStart(2, "0")}`}</strong><small>{completed ? "A saved mark on your mastery path." : "Read with purpose, then practise."}</small></div></section>
      <section className="lesson-source-strip"><span className="eyebrow">SOURCE READING</span><p>{content.workedExample || "This lesson is built from the Study Map title and its chapter guidance."}</p><small>{content.sourcePage ? `McGraw Hill 4th edition · source folio ${content.sourcePage}` : "Title-based study guidance"}</small></section><section className="lesson-learning-grid"><article className="lesson-learning-card lesson-learning-wide"><div className="lesson-card-heading"><span className="lesson-card-icon"><Lightbulb size={17} /></span><div><span className="eyebrow">THE LESSON</span><h2>What you are learning</h2></div></div><p>{content.lesson}</p><div className="lesson-key-move"><strong>Key move</strong><span>{content.keyMove}</span></div></article><article className="lesson-learning-card"><div className="lesson-card-heading"><span className="lesson-card-icon"><BookOpen size={17} /></span><div><span className="eyebrow">SEE IT WORK</span><h2>Worked example</h2></div></div><p>{content.workedExample}</p></article></section>
      <section className="lesson-practice-card"><div className="lesson-practice-heading"><div><div className="eyebrow"><CircleHelp size={15} /> PROVE YOUR UNDERSTANDING</div><h2>{content.question}</h2></div><span className="lesson-practice-label">1 focused question</span></div><div className="lesson-choice-list">{content.choices.map((choice, index) => <button key={choice} className={`lesson-choice ${selected === index ? "selected" : ""} ${checked && index === content.answer ? "correct" : ""} ${checked && selected === index && !isCorrect ? "incorrect" : ""}`} onClick={() => { setSelected(index); setChecked(false); }}><span>{String.fromCharCode(65 + index)}</span><strong>{choice}</strong>{checked && index === content.answer ? <Check size={18} /> : null}</button>)}</div><div className="lesson-practice-actions"><button className="button-primary" disabled={selected === null} onClick={() => setChecked(true)}>Check answer <Check size={16} /></button>{checked ? <button className="button-secondary" onClick={resetLesson}><RotateCcw size={15} /> Try again</button> : null}</div>{checked ? <div className={`lesson-feedback ${isCorrect ? "success" : "retry"}`}><strong>{isCorrect ? "That is correct." : "Not quite yet."}</strong><p>{content.explanation}</p></div> : null}</section>
      <section className="lesson-finish"><div><div className="eyebrow">FINISH THIS LESSON</div><h2>{completed ? "You have marked this lesson complete." : "Ready to put it on your map?"}</h2><p>{content.finishRule}</p></div><button className="button-primary" disabled={!canComplete && !completed} onClick={saveCompletion}>{completed ? <><CheckCircle2 size={16} /> Completed</> : <><Check size={16} /> Finish lesson</>}</button></section>
      <nav className="lesson-next-nav" aria-label="Lesson navigation"><div>{previous ? <Link href={`/lesson/${previous.lesson.id}`}><ArrowLeft size={15} /><span><small>PREVIOUS</small><strong>{previous.lesson.title}</strong></span></Link> : <span />}</div><div>{next ? <Link href={`/lesson/${next.lesson.id}`}><span><small>NEXT LESSON</small><strong>{next.lesson.title}</strong></span><ArrowRight size={15} /></Link> : <Link href="/study-map"><span><small>ROADMAP</small><strong>Return to Study Map</strong></span><ArrowRight size={15} /></Link>}</div></nav>
    </main>
  </div>;
}

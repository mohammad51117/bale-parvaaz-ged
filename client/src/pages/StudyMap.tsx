/* Atlas Study Hall: a student-facing mastery roadmap that turns the full GED course outline into a calm, actionable path. */
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Clock3, Compass, Crosshair, FileCheck2, Lightbulb, MapPinned, Target } from "lucide-react";
import { Link } from "wouter";
import { studyMap, type StudyChapter, type StudySubject } from "@/lib/studyMap";

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function ChapterCard({ chapter, selected, onSelect }: { chapter: StudyChapter; selected: boolean; onSelect: () => void }) {
  return <button className={`study-chapter-card ${selected ? "selected" : ""}`} onClick={onSelect} aria-pressed={selected}>
    <span className="study-chapter-number">{String(chapter.number).padStart(2, "0")}</span>
    <span className="study-chapter-card-main"><span className="study-chapter-kicker">CHAPTER {chapter.number} · {chapter.time}</span><strong>{chapter.title}</strong><span>{chapter.lessons.length} lesson{chapter.lessons.length === 1 ? "" : "s"} · {chapter.practice}</span></span>
    <ArrowRight size={17} />
  </button>;
}

function GuideBlock({ icon, label, text }: { icon: React.ReactNode; label: string; text: string }) {
  return <div className="study-guide-block"><div className="study-guide-icon">{icon}</div><div><span>{label}</span><p>{text}</p></div></div>;
}

export default function StudyMap() {
  const [subjectName, setSubjectName] = useState(studyMap[0]?.name || "");
  const [selectedChapterId, setSelectedChapterId] = useState(studyMap[0]?.chapters[0]?.id || "");
  const subject = studyMap.find((item) => item.name === subjectName) || studyMap[0];
  const chapters = subject?.chapters || [];
  const selectedChapter = chapters.find((chapter) => chapter.id === selectedChapterId) || chapters[0];
  const totals = useMemo(() => ({ chapters: studyMap.reduce((sum, item) => sum + item.chapters.length, 0), lessons: studyMap.reduce((sum, item) => sum + item.chapters.reduce((inner, chapter) => inner + chapter.lessons.length, 0), 0) }), []);

  const chooseSubject = (next: StudySubject) => {
    setSubjectName(next.name);
    setSelectedChapterId(next.chapters[0]?.id || "");
  };

  return <div className="study-map-shell">
    <header className="study-map-header"><div className="subject-brand"><img className="brand-logo" src="/manus-storage/teacher-momeni-logo_2d3d1795.png" alt="Teacher Momeni logo" /><div><strong>Bale Parvaaz</strong><small>GED / TEACHER MOMENI</small></div></div><Link href="/" className="back-link"><ArrowLeft size={16} /> Study desk</Link></header>
    <main className="study-map-main">
      <div className="study-map-kicker"><span>STUDY DESK</span><span>/</span><strong>STUDY MAP</strong></div>
      <section className="study-map-hero"><div><div className="eyebrow"><MapPinned size={15} /> YOUR MASTERY ROADMAP</div><h1>Know what to learn next.</h1><p>Move through every GED subject in a clear sequence. Each chapter gives you a realistic time target, a way to study, a definition of mastery, and a practice routine you can repeat.</p><div className="study-map-hero-note"><Compass size={16} /><span>{formatNumber(totals.chapters)} chapters · {formatNumber(totals.lessons)} lesson titles · built from your complete course outline</span></div></div><div className="study-map-hero-card"><span>THE FINISH LINE</span><strong>Learn → practise → prove it.</strong><small>Do not move on until you can explain the skill and use it on a new GED-style question.</small></div></section>
      <section className="study-map-subjects" aria-label="GED subjects"><div className="study-map-subjects-heading"><div><div className="eyebrow">THE FOUR SECTIONS</div><h2>Choose your route.</h2></div><span>Each route opens a complete chapter-by-chapter plan.</span></div><div className="study-map-subject-tabs">{studyMap.map((item) => <button key={item.name} className={subject?.name === item.name ? "active" : ""} onClick={() => chooseSubject(item)}><i style={{ backgroundColor: item.color }} /><span>{item.shortName}</span><strong>{item.chapters.length}</strong><small>chapters</small></button>)}</div></section>
      {subject && selectedChapter && <section className="study-map-workspace"><div className="study-map-route"><div className="study-map-route-heading"><div><div className="eyebrow" style={{ color: subject.color }}>{subject.shortName} ROUTE</div><h2>{subject.name}</h2><p>{subject.chapters.length} chapters · {subject.chapters.reduce((sum, chapter) => sum + chapter.lessons.length, 0)} lesson titles</p></div><Link href={`/subject/${subject.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`} className="study-map-practice-link">Open question library <ArrowRight size={15} /></Link></div><div className="study-chapter-list">{chapters.map((chapter) => <ChapterCard key={chapter.id} chapter={chapter} selected={chapter.id === selectedChapter.id} onSelect={() => setSelectedChapterId(chapter.id)} />)}</div></div><aside className="study-map-detail"><div className="study-detail-top"><span className="study-detail-number">{String(selectedChapter.number).padStart(2, "0")}</span><div><div className="eyebrow">CHAPTER {selectedChapter.number} · {selectedChapter.time}</div><h2>{selectedChapter.title}</h2></div></div><div className="study-guide-grid"><GuideBlock icon={<Clock3 size={17} />} label="TIME TO MASTER" text={selectedChapter.time} /><GuideBlock icon={<Lightbulb size={17} />} label="HOW TO STUDY" text={selectedChapter.study} /><GuideBlock icon={<Target size={17} />} label="HOW TO MASTER IT" text={selectedChapter.mastery} /><GuideBlock icon={<FileCheck2 size={17} />} label="HOW TO PRACTICE" text={selectedChapter.practice} /></div><div className="study-lessons"><div className="study-lessons-heading"><div><span className="eyebrow">LESSON PATH</span><h3>Titles inside this chapter</h3></div><span>{selectedChapter.lessons.length} stops</span></div>{selectedChapter.lessons.length ? <div className="study-lesson-list">{selectedChapter.lessons.map((lesson, index) => <div className="study-lesson" key={lesson.id}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{lesson.title}</strong><small>{lesson.time} · {lesson.practice}</small></div><CheckCircle2 size={16} /></div>)}</div> : <div className="study-lesson-empty"><Crosshair size={18} /><span>This chapter is a focused checkpoint. Use the mastery standard above, then open the question library for practice.</span></div>}</div></aside></section>}
    </main>
  </div>;
}

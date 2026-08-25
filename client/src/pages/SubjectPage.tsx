/* Atlas Study Hall: subject index pages use an editorial folio list, generous whitespace, ink-blue hierarchy, and saffron actions. */
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, BookOpen, Search, Table2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { questionGroups } from "@/lib/questionGroups";
import { interactiveQuestions } from "@/lib/interactiveQuestions";
import { supplementalEconomicsGroups, supplementalEconomicsQuestions } from "@/lib/supplementalEconomics";

type Group = { id: string; section: string; questionStart: number; questionEnd: number; rangeLabel: string; contextType: string; marker: string; context: string; sourcePages: readonly number[]; visualPage?: number | null; questions: readonly { number: number; text: string }[] };
type InteractiveQuestion = { number: number; groupId: string; topic: string; reference: string };

const subjects: Record<string, string> = {
  math: "Mathematical Reasoning",
  "language-arts": "Reasoning Through Language Arts",
  "social-studies": "Social Studies",
  science: "Science",
};
const partOrder: Record<string, string[]> = {
  "Mathematical Reasoning": ["Number Operations and Number Sense", "Measurement and Geometry", "Data Analysis, Statistics, and Probability", "Algebra, Functions, and Patterns"],
  "Social Studies": ["Civics and Government", "U.S. History", "World History", "Geography", "Economics"],
  Science: ["Physical Science", "Life Science", "Earth and Space Science", "Scientific Reasoning"],
  "Reasoning Through Language Arts": ["Reading for Meaning", "Language and Vocabulary", "Grammar and Mechanics", "Essay Writing"],
};

export default function SubjectPage() {
  const [location, setLocation] = useLocation();
  const slug = location.split("/")[2] || "math";
  const subject = subjects[slug] || subjects.math;
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("All parts");
  const baseGroups = questionGroups.groups as readonly Group[];
  const addedGroups = supplementalEconomicsGroups as readonly Group[];
  const groups = [...baseGroups, ...addedGroups] as readonly Group[];
  const baseQuestions = interactiveQuestions.questions as readonly InteractiveQuestion[];
  const addedQuestions = supplementalEconomicsQuestions as readonly InteractiveQuestion[];
  const questions = [...baseQuestions, ...addedQuestions] as readonly InteractiveQuestion[];
  const topicMap = useMemo(() => new Map(questions.map((question) => [`${question.groupId}-${question.number}`, question])), [questions]);
  const topicForGroup = (group: Group) => {
    const topics = Array.from(new Set(group.questions.map((question) => topicMap.get(`${group.id}-${question.number}`)?.topic).filter((value): value is string => Boolean(value))));
    return topics.length === 1 ? topics[0] : topics.length > 1 ? "Mixed parts" : "General practice";
  };
  const topicOptions = useMemo(() => ["All parts", ...Array.from(new Set(groups.filter((group) => group.section === subject).map(topicForGroup)))], [groups, subject, topicMap]);
  const subjectGroups = useMemo(() => groups.filter((group) => group.section === subject && (topic === "All parts" || topicForGroup(group) === topic) && (`${group.rangeLabel} ${group.context} ${group.marker} ${topicForGroup(group)}`).toLowerCase().includes(query.toLowerCase().trim())), [groups, subject, query, topic, topicMap]);
  const groupedSections = useMemo(() => {
    const byTopic = new Map<string, Group[]>();
    subjectGroups.forEach((group) => {
      const key = topicForGroup(group);
      byTopic.set(key, [...(byTopic.get(key) || []), group]);
    });
    const ordered = partOrder[subject] || [];
    const keys = [...ordered.filter((key) => byTopic.has(key)), ...Array.from(byTopic.keys()).filter((key) => !ordered.includes(key))];
    return keys.map((key) => ({ topic: key, groups: byTopic.get(key) || [] }));
  }, [subjectGroups, subject, topicMap]);
  const openReader = (group: Group) => setLocation(`/reader/${group.id}`);

  return <div className="subject-page-shell">
    <header className="subject-page-header"><div className="subject-brand"><span className="brand-mark">✶</span><div><strong>Bale Parvaaz</strong><small>GED / TEACHER MOMENI</small></div></div><Link href="/" className="back-link"><ArrowLeft size={16} /> Study desk</Link></header>
    <main className="subject-page-main">
      <div className="subject-crumb"><span>QUESTION LIBRARY</span><span>/</span><strong>{subject}</strong></div>
      <section className="subject-hero"><div><div className="eyebrow"><BookOpen size={14} /> DEDICATED SUBJECT INDEX</div><h1>{subject}</h1><p>Choose a question set to open its own focused reader view. Every shared passage, table, map, graph, chart, or figure stays above the questions it supports.</p><div className="reference-line">1,001 GED Practice Questions For Dummies · {subject} library</div></div><div className="subject-summary"><strong>{subjectGroups.length}</strong><span>question sets</span><small>{subjectGroups.reduce((sum, group) => sum + group.questions.length, 0)} linked questions</small></div></section>
      <div className="subject-tools"><div className="subject-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${subject} question sets or parts…`} aria-label={`Search ${subject} question sets`} /></div><select className="topic-select" value={topic} onChange={(event) => setTopic(event.target.value)} aria-label={`Filter ${subject} by part`}>{topicOptions.map((option) => <option key={option}>{option}</option>)}</select><span className="subject-tool-note">Reader stays inside the app <ArrowUpRight size={14} /></span></div>
      <nav className="subject-tabs" aria-label="GED subjects">{Object.entries(subjects).map(([key, label]) => <Link key={key} href={`/subject/${key}`} onClick={() => setTopic("All parts")} className={label === subject ? "active" : ""}>{label}</Link>)}</nav>
      <section className="subject-list" aria-label={`${subject} question sets`}>{groupedSections.map((section) => <section className="part-section" key={section.topic}><header className="part-section-header"><div><div className="eyebrow">{subject} <span className="part-arrow">→</span> PART</div><h2>{section.topic}</h2></div><span>{section.groups.length} sets · {section.groups.reduce((sum, group) => sum + group.questions.length, 0)} questions</span></header>{section.groups.map((group, index) => <article className="subject-set-row" key={group.id}><div className="set-index">{String(index + 1).padStart(2, "0")}</div><div className="set-main"><div className="set-kicker"><span className={`context-type ${group.contextType}`}>{group.contextType}</span><span>Source folio {group.sourcePages[0]}</span></div><div className="set-topic">{subject} <span>→</span> {section.topic}</div><h3>{group.rangeLabel}</h3><p>{group.marker}</p><small>{group.questions.length} linked questions{group.visualPage ? " · actual source visual included" : " · converted source context included"}</small></div><button className="open-reader-button" onClick={() => openReader(group)}>Open reader <ArrowUpRight size={17} /></button></article>)}</section>)}{subjectGroups.length === 0 && <div className="subject-empty"><Table2 size={20} /><strong>No question sets match that search.</strong><span>Try a broader phrase or clear the search field.</span></div>}</section>
    </main>
  </div>;
}

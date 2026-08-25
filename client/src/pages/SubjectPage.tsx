/* Atlas Study Hall: subject index pages use an editorial folio list, generous whitespace, ink-blue hierarchy, and saffron actions. */
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, BookOpen, Search, Table2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { questionGroups } from "@/lib/questionGroups";

type Group = typeof questionGroups.groups[number];

const subjects: Record<string, string> = {
  math: "Mathematical Reasoning",
  "language-arts": "Reasoning Through Language Arts",
  "social-studies": "Social Studies",
  science: "Science",
};
const slugFor = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function SubjectPage() {
  const [location, setLocation] = useLocation();
  const slug = location.split("/")[2] || "math";
  const subject = subjects[slug] || subjects.math;
  const [query, setQuery] = useState("");
  const groups = questionGroups.groups as readonly Group[];
  const subjectGroups = useMemo(() => groups.filter((group) => group.section === subject && (`${group.rangeLabel} ${group.context} ${group.marker}`).toLowerCase().includes(query.toLowerCase().trim())), [groups, subject, query]);
  const openReader = (group: Group) => setLocation(`/reader/${group.id}`);

  return <div className="subject-page-shell">
    <header className="subject-page-header">
      <div className="subject-brand"><span className="brand-mark">✶</span><div><strong>Bale Parvaaz</strong><small>GED / TEACHER MOMENI</small></div></div>
      <Link href="/" className="back-link"><ArrowLeft size={16} /> Study desk</Link>
    </header>
    <main className="subject-page-main">
      <div className="subject-crumb"><span>QUESTION LIBRARY</span><span>/</span><strong>{subject}</strong></div>
      <section className="subject-hero"><div><div className="eyebrow"><BookOpen size={14} /> DEDICATED SUBJECT INDEX</div><h1>{subject}</h1><p>Choose a question set to open its own focused reader view. Every shared passage, table, map, graph, chart, or figure stays above the questions it supports.</p></div><div className="subject-summary"><strong>{subjectGroups.length}</strong><span>question sets</span><small>{subjectGroups.reduce((sum, group) => sum + group.questions.length, 0)} linked questions</small></div></section>
      <div className="subject-tools"><div className="subject-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${subject} question sets…`} aria-label={`Search ${subject} question sets`} /></div><span className="subject-tool-note">Reader stays inside the app <ArrowUpRight size={14} /></span></div>
      <nav className="subject-tabs" aria-label="GED subjects">{Object.entries(subjects).map(([key, label]) => <Link key={key} href={`/subject/${key}`} className={label === subject ? "active" : ""}>{label}</Link>)}</nav>
      <section className="subject-list" aria-label={`${subject} question sets`}>{subjectGroups.map((group, index) => <article className="subject-set-row" key={group.id}><div className="set-index">{String(index + 1).padStart(2, "0")}</div><div className="set-main"><div className="set-kicker"><span className={`context-type ${group.contextType}`}>{group.contextType}</span><span>Source folio {group.sourcePages[0]}</span></div><h2>{group.rangeLabel}</h2><p>{group.marker}</p><small>{group.questions.length} linked questions{group.visualPage ? " · actual source visual included" : " · converted source context included"}</small></div><button className="open-reader-button" onClick={() => openReader(group)}>Open reader <ArrowUpRight size={17} /></button></article>)}{subjectGroups.length === 0 && <div className="subject-empty"><Table2 size={20} /><strong>No question sets match that search.</strong><span>Try a broader phrase or clear the search field.</span></div>}</section>
    </main>
  </div>;
}

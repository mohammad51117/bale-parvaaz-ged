/* Atlas Study Hall: subject index pages use an editorial folio list, generous whitespace, ink-blue hierarchy, and saffron actions. */
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, BookOpen, Search, Table2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { questionGroups } from "@/lib/questionGroups";
import { interactiveQuestions } from "@/lib/interactiveQuestions";
import { supplementalEconomicsGroups, supplementalEconomicsQuestions } from "@/lib/supplementalEconomics";
import { supplementalMcGrawHillGroups, supplementalMcGrawHillQuestions } from "@/lib/supplementalMcGrawHill";
import { supplementalBatterySocialStudiesGroups, supplementalBatterySocialStudiesQuestions } from "@/lib/supplementalBatterySocialStudies";
import { supplementalKaplanSocialStudiesGroups, supplementalKaplanSocialStudiesQuestions } from "@/lib/supplementalKaplanSocialStudies";
import { getInitialWorkbookFilter, getWorkbookSource, matchesWorkbook, persistWorkbookFilter, type WorkbookFilter, workbookFilterOptions } from "@/lib/workbookSources";

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
  const [workbookFilter, setWorkbookFilter] = useState<WorkbookFilter>(getInitialWorkbookFilter);
  const baseGroups = questionGroups.groups as readonly Group[];
  const addedGroups = [...supplementalEconomicsGroups, ...supplementalMcGrawHillGroups, ...supplementalBatterySocialStudiesGroups, ...supplementalKaplanSocialStudiesGroups] as readonly Group[];
  const groups = [...baseGroups, ...addedGroups] as readonly Group[];
  const baseQuestions = interactiveQuestions.questions as readonly InteractiveQuestion[];
  const addedQuestions = [...supplementalEconomicsQuestions, ...supplementalMcGrawHillQuestions, ...supplementalBatterySocialStudiesQuestions, ...supplementalKaplanSocialStudiesQuestions] as readonly InteractiveQuestion[];
  const questions = [...baseQuestions, ...addedQuestions] as readonly InteractiveQuestion[];
  const topicMap = useMemo(() => new Map(questions.map((question) => [`${question.groupId}-${question.number}`, question])), [questions]);
  const topicForGroup = (group: Group) => {
    const topics = Array.from(new Set(group.questions.map((question) => topicMap.get(`${group.id}-${question.number}`)?.topic).filter((value): value is string => Boolean(value))));
    return topics.length === 1 ? topics[0] : topics.length > 1 ? "Mixed parts" : "General practice";
  };
  const topicOptions = useMemo(() => ["All parts", ...Array.from(new Set(groups.filter((group) => group.section === subject).map(topicForGroup)))], [groups, subject, topicMap]);
  const subjectGroups = useMemo(() => groups.filter((group) => group.section === subject && matchesWorkbook(group.id, workbookFilter) && (topic === "All parts" || topicForGroup(group) === topic) && (`${group.rangeLabel} ${group.context} ${group.marker} ${topicForGroup(group)}`).toLowerCase().includes(query.toLowerCase().trim())), [groups, subject, query, topic, topicMap, workbookFilter]);
  const workbookCounts = useMemo(() => workbookFilterOptions.map((option) => ({ ...option, count: groups.filter((group) => group.section === subject && matchesWorkbook(group.id, option.value)).length })), [groups, subject]);
  const activeWorkbookOption = workbookFilterOptions.find((option) => option.value === workbookFilter) || workbookFilterOptions[0];
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
  const updateWorkbookFilter = (value: string) => {
    const next = value === "main" || value === "economics" || value === "mcgraw" || value === "battery" || value === "kaplan" ? value : "all";
    setWorkbookFilter(next);
    persistWorkbookFilter(next);
  };
  const openReader = (group: Group) => setLocation(`/reader/${group.id}`);
  const sourceForGroup = (group: Group) => getWorkbookSource(group.id);

  return <div className="subject-page-shell route-with-spine">
    <aside className="route-spine" aria-label="Workbook orientation"><span className="brand-mark brand-mark-wing" aria-hidden="true"><BookOpen size={22} strokeWidth={2.4} /></span><strong>Bale Parvaaz</strong><span className="route-spine-section">{subject}</span><i className="route-spine-rule" /><span className="route-spine-folio">CATALOG<br />FOLIO</span></aside>
    <header className="subject-page-header"><div className="subject-brand"><span className="brand-mark brand-mark-wing" aria-hidden="true"><BookOpen size={21} strokeWidth={2.2} /></span><div><strong>Bale Parvaaz</strong><small>GED / TEACHER MOMENI</small></div></div><Link href="/" className="back-link"><ArrowLeft size={16} /> Study desk</Link></header>
    <main className="subject-page-main">
      <div className="subject-crumb"><span>QUESTION LIBRARY</span><span>/</span><strong>{subject}</strong></div>
      <section className="subject-hero"><div><div className="eyebrow"><BookOpen size={14} /> DEDICATED SUBJECT INDEX</div><h1>{subject}</h1><p>Choose a question set to open its own focused reader view. Every shared passage, table, map, graph, chart, or figure stays above the questions it supports.</p><div className="reference-line">{subject} library · {activeWorkbookOption.shortLabel} · source labels remain visible on every set</div></div><div className="subject-summary"><strong>{subjectGroups.length}</strong><span>question sets</span><small>{subjectGroups.reduce((sum, group) => sum + group.questions.length, 0)} linked questions</small></div></section>
      <div className="subject-tools"><div className="subject-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${subject} question sets or parts…`} aria-label={`Search ${subject} question sets`} /></div><label className="workbook-filter-control"><span>WORKBOOK SOURCE</span><select className="topic-select" value={workbookFilter} onChange={(event) => updateWorkbookFilter(event.target.value)} aria-label={`Filter ${subject} by workbook`}>{workbookCounts.map((option) => <option key={option.value} value={option.value}>{option.shortLabel} · {option.count} sets</option>)}</select></label><select className="topic-select" value={topic} onChange={(event) => setTopic(event.target.value)} aria-label={`Filter ${subject} by part`}>{topicOptions.map((option) => <option key={option}>{option}</option>)}</select><span className="subject-tool-note">Reader stays inside the app <ArrowUpRight size={14} /></span></div>
      <nav className="subject-tabs" aria-label="GED subjects">{Object.entries(subjects).map(([key, label]) => <Link key={key} href={`/subject/${key}`} onClick={() => setTopic("All parts")} className={label === subject ? "active" : ""}>{label}</Link>)}</nav>
      <div className="subject-folio-rule" aria-label="Subject folio progress"><span>CATALOG FOLIO · {subjectGroups.length} SETS IN VIEW</span><i><b style={{ width: `${subjectGroups.length ? 100 : 0}%` }} /></i><em>{activeWorkbookOption.shortLabel}</em></div>
      <section className="subject-list" aria-label={`${subject} question sets`}>{groupedSections.map((section) => <section className="part-section" key={section.topic}><header className="part-section-header"><div><div className="eyebrow">{subject} <span className="part-arrow">→</span> PART</div><h2>{section.topic}</h2></div><span>{section.groups.length} sets · {section.groups.reduce((sum, group) => sum + group.questions.length, 0)} questions</span></header>{section.groups.map((group, index) => <article className="subject-set-row" key={group.id}><div className="set-index">{String(index + 1).padStart(2, "0")}</div><div className="set-main"><div className="set-kicker"><span className={`context-type ${group.contextType}`}>{group.contextType}</span><span>{sourceForGroup(group).pageLabel} {group.sourcePages[0]}–{group.sourcePages[1]}</span></div><div className="set-workbook">{sourceForGroup(group).shortTitle}</div><div className="set-topic">{subject} <span>→</span> {section.topic}</div><h3>{group.rangeLabel}</h3><p>{group.marker}</p><small>{group.questions.length} linked questions{group.visualPage ? " · actual source visual included" : " · converted source context included"}</small></div><button className="open-reader-button" onClick={() => openReader(group)}>Open reader <ArrowUpRight size={17} /></button></article>)}</section>)}{subjectGroups.length === 0 && <div className="subject-empty"><Table2 size={20} /><strong>No question sets match these filters.</strong><span>{workbookFilter !== "all" ? `There are no ${activeWorkbookOption.shortLabel.toLowerCase()} sets in ${subject} with this search or part filter.` : "Try a broader phrase, choose All workbooks, or clear the part filter."}</span><button className="clear-library-filters" onClick={() => { setQuery(""); setTopic("All parts"); updateWorkbookFilter("all"); }}>Clear filters</button></div>}</section>
    </main>
  </div>;
}

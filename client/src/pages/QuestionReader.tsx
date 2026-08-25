/* Atlas Study Hall: the standalone reader is a calm source-first folio with context, provenance, and questions in one focused window. */
import { useMemo, useState } from "react";
import { ArrowLeft, Bookmark, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { Link, useLocation } from "wouter";
import { questionGroups } from "@/lib/questionGroups";
import { visualAssets } from "@/lib/visualAssets";

type Group = typeof questionGroups.groups[number];
const visualTypes = new Set(["map", "graph", "chart", "figure", "table"]);

export default function QuestionReader() {
  const [location] = useLocation();
  const groupId = decodeURIComponent(location.split("/").pop() || "");
  const groups = questionGroups.groups as readonly Group[];
  const groupIndex = Math.max(0, groups.findIndex((item) => item.id === groupId));
  const group = groups[groupIndex] || groups[0];
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const contextText = group.context && !group.context.startsWith("The shared source material") ? group.context : "";
  const previous = groups[groupIndex - 1];
  const next = groups[groupIndex + 1];
  const subjectSlug = useMemo(() => group.section.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""), [group.section]);
  const visualUrl = group.visualPage ? visualAssets[group.visualPage] : undefined;
  const toggleBookmark = (number: number) => setBookmarked((items) => items.includes(number) ? items.filter((item) => item !== number) : [...items, number]);

  return <div className="reader-page-shell">
    <header className="reader-page-header"><div className="subject-brand"><span className="brand-mark">✶</span><div><strong>Bale Parvaaz</strong><small>GED / TEACHER MOMENI</small></div></div><div className="reader-header-actions"><Link href={`/subject/${subjectSlug}`} className="back-link"><ArrowLeft size={16} /> Subject index</Link><span className="reader-window-label">STANDALONE READER</span></div></header>
    <main className="reader-page-main">
      <div className="reader-page-kicker"><span>{group.section}</span><span>/</span><strong>{group.rangeLabel}</strong></div>
      <div className="reader-page-nav"><Link href={previous ? `/reader/${previous.id}` : `/subject/${subjectSlug}`} className={!previous ? "disabled" : ""}><ChevronLeft size={17} /> Previous set</Link><span>Set {groupIndex + 1} of {groups.length}</span><Link href={next ? `/reader/${next.id}` : `/subject/${subjectSlug}`} className={!next ? "disabled" : ""}>Next set <ChevronRight size={17} /></Link></div>
      <section className={`standalone-context ${group.contextType}`}><div className="standalone-context-copy"><div className="eyebrow">SHARED SOURCE CONTEXT · {group.contextType}</div><h1>{group.rangeLabel}</h1><h2>{group.marker}</h2>{contextText && <pre>{contextText}</pre>}<div className="standalone-provenance"><span><FileText size={14} /> Source folio {group.sourcePages[0]}–{group.sourcePages[1]}</span><span>{group.questions.length} linked questions</span></div></div>{visualTypes.has(group.contextType) && visualUrl && <figure className="standalone-visual"><img src={visualUrl} alt={`Original ${group.contextType} for ${group.rangeLabel}, source folio ${group.visualPage}`} /><figcaption>Original source folio {group.visualPage}. Keep this visual in view while answering.</figcaption></figure>}</section>
      <section className="standalone-questions"><div className="eyebrow">ANSWER FROM THE SOURCE</div><h2>Questions {group.questionStart}–{group.questionEnd}</h2><div className="standalone-question-list">{group.questions.map((question) => <article className="standalone-question" key={question.number}><div className="standalone-number">{String(question.number).padStart(3, "0")}</div><div className="standalone-question-body"><div className="eyebrow">QUESTION {question.number}</div><pre>{question.text}</pre></div><button className={`standalone-bookmark ${bookmarked.includes(question.number) ? "saved" : ""}`} onClick={() => toggleBookmark(question.number)} aria-label={`Bookmark question ${question.number}`}><Bookmark size={18} fill={bookmarked.includes(question.number) ? "currentColor" : "none"} /></button></article>)}</div></section>
    </main>
  </div>;
}

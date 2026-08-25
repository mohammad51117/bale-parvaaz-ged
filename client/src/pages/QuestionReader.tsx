/* Atlas Study Hall: a focused practice folio with real answer controls, quiet feedback, and source-first context. */
import { useMemo, useState } from "react";
import { ArrowLeft, BookOpen, Bookmark, Check, CheckCircle2, ChevronLeft, ChevronRight, CircleX, FileText, RotateCcw } from "lucide-react";
import { Link, useLocation } from "wouter";
import { questionGroups } from "@/lib/questionGroups";
import { interactiveQuestions } from "@/lib/interactiveQuestions";
import { visualAssets } from "@/lib/visualAssets";
import { supplementalEconomicsGroups, supplementalEconomicsQuestions } from "@/lib/supplementalEconomics";
import { supplementalMcGrawHillGroups, supplementalMcGrawHillQuestions } from "@/lib/supplementalMcGrawHill";
import { supplementalBatterySocialStudiesGroups, supplementalBatterySocialStudiesQuestions } from "@/lib/supplementalBatterySocialStudies";
import { supplementalKaplanSocialStudiesGroups, supplementalKaplanSocialStudiesQuestions } from "@/lib/supplementalKaplanSocialStudies";
import { supplementalKaplanSocialStudiesPretestGroups, supplementalKaplanSocialStudiesPretestQuestions } from "@/lib/supplementalKaplanSocialStudiesPretest";
import { supplementalPrincetonSocialStudiesTest2Groups, supplementalPrincetonSocialStudiesTest2Questions } from "@/lib/supplementalPrincetonSocialStudiesTest2";
import { supplementalEconomicsVisuals } from "@/lib/supplementalEconomicsVisuals";
import { supplementalMcGrawHillVisuals } from "@/lib/supplementalMcGrawHillVisuals";
import { supplementalBatterySocialStudiesVisuals } from "@/lib/supplementalBatterySocialStudiesVisuals";
import { supplementalKaplanSocialStudiesVisuals } from "@/lib/supplementalKaplanSocialStudiesVisuals";
import { supplementalKaplanSocialStudiesPretestVisuals } from "@/lib/supplementalKaplanSocialStudiesPretestVisuals";
import { supplementalPrincetonSocialStudiesTest2Visuals } from "@/lib/supplementalPrincetonSocialStudiesTest2Visuals";
import { getWorkbookSource } from "@/lib/workbookSources";

type Group = { id: string; section: string; questionStart: number; questionEnd: number; rangeLabel: string; contextType: string; marker: string; context: string; sourcePages: readonly number[]; visualPage?: number | null; questions: readonly { number: number; text: string }[] };
type InteractiveQuestion = { number: number; groupId: string; section: string; topic: string; reference: string; prompt: string; choices: readonly { label: string; text: string }[]; correctLabel: string | null; answerLine: string; explanation: string; sourcePage: number };
const visualTypes = new Set(["map", "graph", "chart", "figure", "table", "diagram", "passage"]);

function normalizeAnswer(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\band\b/g, " ").replace(/\s+/g, " ").trim();
}

function PracticeQuestion({ question, selected, response, submitted, onSelect, onResponse, onCheck, onReset, bookmarked, onBookmark }: {
  question: InteractiveQuestion;
  selected?: string;
  response?: string;
  submitted: boolean;
  onSelect: (label: string) => void;
  onResponse: (value: string) => void;
  onCheck: () => void;
  onReset: () => void;
  bookmarked: boolean;
  onBookmark: () => void;
}) {
  const hasChoices = question.choices.length > 0;
  const isEssay = !hasChoices && question.prompt.length > 1000;
  const isCorrect = isEssay ? submitted : hasChoices ? selected === question.correctLabel : normalizeAnswer(response || "") === normalizeAnswer(question.answerLine);
  return <article className={`practice-question ${submitted ? (isCorrect ? "is-correct" : "is-incorrect") : ""}`}>
    <div className="practice-question-head"><div className="practice-question-id"><div className="practice-number">{String(question.number).padStart(3, "0")}</div><button className={`standalone-bookmark ${bookmarked ? "saved" : ""}`} onClick={onBookmark} aria-label={`Bookmark question ${question.number}`}><Bookmark size={18} fill={bookmarked ? "currentColor" : "none"} /></button></div><div><div className="eyebrow">QUESTION {question.number}</div><span className="practice-question-meta">{hasChoices ? "Select one answer" : isEssay ? "Write a response, then compare with the rubric" : "Complete the response"}</span></div></div>
    <div className="practice-prompt">{question.prompt}</div>
    {hasChoices ? <div className="choice-list" role="radiogroup" aria-label={`Answer choices for question ${question.number}`}>{question.choices.map((choice) => <button key={choice.label} className={`choice-option ${selected === choice.label ? "selected" : ""} ${submitted && choice.label === question.correctLabel ? "correct-option" : ""} ${submitted && selected === choice.label && choice.label !== question.correctLabel ? "incorrect-option" : ""}`} onClick={() => !submitted && onSelect(choice.label)} role="radio" aria-checked={selected === choice.label}><span className="choice-letter">{choice.label}</span><span>{choice.text || "[Source formatting retained]"}</span>{submitted && choice.label === question.correctLabel && <Check size={16} />}{submitted && selected === choice.label && choice.label !== question.correctLabel && <CircleX size={16} />}</button>)}</div> : <div className="fill-answer"><label htmlFor={`answer-${question.number}`}>{isEssay ? "Your response" : "Your answer"}</label>{isEssay ? <textarea id={`answer-${question.number}`} value={response || ""} onChange={(event) => !submitted && onResponse(event.target.value)} placeholder="Write your response here…" disabled={submitted} rows={7} /> : <input id={`answer-${question.number}`} value={response || ""} onChange={(event) => !submitted && onResponse(event.target.value)} placeholder={question.answerLine.includes(",") ? "Type answers in order, separated by commas…" : "Type your answer here…"} disabled={submitted} />}</div>}
    <div className="practice-actions">{!submitted ? <button className="check-answer" onClick={onCheck} disabled={hasChoices ? !selected : !response?.trim()}><CheckCircle2 size={16} /> Check answer</button> : <button className="reset-answer" onClick={onReset}><RotateCcw size={15} /> Try again</button>}<span className="answer-status">{submitted ? (isEssay ? "Response recorded" : isCorrect ? "Correct" : "Review the answer") : "Not submitted"}</span></div>
    {submitted && <div className={`answer-feedback ${isCorrect ? "correct" : "incorrect"}`}><div className="feedback-title">{isEssay ? <><CheckCircle2 size={17} /> Response recorded</> : isCorrect ? <><CheckCircle2 size={17} /> Correct answer</> : <><CircleX size={17} /> Keep studying this one</>}</div><p><strong>{isEssay ? "Reference rubric:" : "Answer key:"}</strong> {question.answerLine || question.correctLabel || "See the source explanation."}</p>{question.explanation && <details open><summary>Book explanation</summary><pre>{question.explanation}</pre></details>}</div>}
  </article>;
}

export default function QuestionReader() {
  const [location, setLocation] = useLocation();
  const groupId = decodeURIComponent(location.split("/").pop() || "");
  const groups = [...(questionGroups.groups as readonly Group[]), ...(supplementalEconomicsGroups as readonly Group[]), ...(supplementalMcGrawHillGroups as readonly Group[]), ...(supplementalBatterySocialStudiesGroups as readonly Group[]), ...(supplementalKaplanSocialStudiesGroups as readonly Group[]), ...(supplementalKaplanSocialStudiesPretestGroups as readonly Group[]), ...(supplementalPrincetonSocialStudiesTest2Groups as readonly Group[])];
  const groupIndex = Math.max(0, groups.findIndex((item) => item.id === groupId));
  const group = groups[groupIndex] || groups[0];
  const allInteractiveQuestions = [...(interactiveQuestions.questions as readonly InteractiveQuestion[]), ...(supplementalEconomicsQuestions as readonly InteractiveQuestion[]), ...(supplementalMcGrawHillQuestions as readonly InteractiveQuestion[]), ...(supplementalBatterySocialStudiesQuestions as readonly InteractiveQuestion[]), ...(supplementalKaplanSocialStudiesQuestions as readonly InteractiveQuestion[]), ...(supplementalKaplanSocialStudiesPretestQuestions as readonly InteractiveQuestion[]), ...(supplementalPrincetonSocialStudiesTest2Questions as readonly InteractiveQuestion[])];
  const questionMap = useMemo(() => new Map(allInteractiveQuestions.map((question) => [`${question.groupId}-${question.number}`, question])), [allInteractiveQuestions]);
  const activeQuestions = group.questions.map((question) => questionMap.get(`${group.id}-${question.number}`)).filter(Boolean) as InteractiveQuestion[];
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const contextText = group.context && !group.context.startsWith("The shared source material") ? group.context : "";
  const previous = groups[groupIndex - 1];
  const next = groups[groupIndex + 1];
  const subjectSlug = useMemo(() => group.section.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""), [group.section]);
  const topic = activeQuestions[0]?.topic || "General practice";
  const workbookSource = getWorkbookSource(group.id);
  const reference = workbookSource.title;
  const allVisualAssets = { ...visualAssets, ...supplementalEconomicsVisuals, ...supplementalMcGrawHillVisuals, ...supplementalBatterySocialStudiesVisuals, ...supplementalKaplanSocialStudiesVisuals, ...supplementalKaplanSocialStudiesPretestVisuals, ...supplementalPrincetonSocialStudiesTest2Visuals };
  const visualUrl = group.visualPage ? allVisualAssets[group.visualPage] : undefined;
  const visualSourceLabel = group.visualPage && group.visualPage >= 6000 ? group.visualPage - 6000 : group.visualPage && group.visualPage >= 4000 ? group.visualPage - 4000 : group.visualPage && group.visualPage >= 3000 ? group.visualPage - 3000 : group.visualPage && group.visualPage >= 2000 ? group.visualPage - 2000 : group.visualPage && group.visualPage >= 1000 ? group.visualPage - 1000 : group.visualPage;
  const answeredCount = activeQuestions.filter((question) => submitted[question.number]).length;
  const toggleBookmark = (number: number) => setBookmarked((items) => items.includes(number) ? items.filter((item) => item !== number) : [...items, number]);

  return <div className="reader-page-shell route-with-spine">
    <aside className="route-spine" aria-label="Workbook orientation"><span className="brand-mark brand-mark-wing" aria-hidden="true"><BookOpen size={22} strokeWidth={2.4} /></span><strong>Bale Parvaaz</strong><span className="route-spine-section">{group.section}</span><i className="route-spine-rule" /><span className="route-spine-folio">SET {String(groupIndex + 1).padStart(3, "0")}<br />OF {groups.length}</span></aside>
    <header className="reader-page-header"><div className="subject-brand"><span className="brand-mark brand-mark-wing" aria-hidden="true"><BookOpen size={21} strokeWidth={2.2} /></span><div><strong>Bale Parvaaz</strong><small>GED / TEACHER MOMENI</small></div></div><div className="reader-header-actions"><Link href={`/subject/${subjectSlug}`} className="back-link"><ArrowLeft size={16} /> Subject index</Link><span className="reader-window-label">IN-APP PRACTICE READER</span></div></header>
    <main className="reader-page-main">
      <div className="reader-page-kicker"><span>{reference}</span><span>/</span><strong>{group.section}</strong><span>/</span><strong>{topic}</strong><span>/</span><strong>{group.rangeLabel}</strong></div>
      <div className="reader-page-nav"><Link href={previous ? `/reader/${previous.id}` : `/subject/${subjectSlug}`} className={!previous ? "disabled" : ""}><ChevronLeft size={17} /> Previous set</Link><span>Set {groupIndex + 1} of {groups.length}</span><Link href={next ? `/reader/${next.id}` : `/subject/${subjectSlug}`} className={!next ? "disabled" : ""}>Next set <ChevronRight size={17} /></Link></div>
      <div className="reader-context-layout"><section className={`standalone-context ${group.contextType}`}><div className="standalone-context-copy"><div className="eyebrow source-context-eyebrow"><span>SHARED SOURCE CONTEXT</span><i>· {group.contextType}</i></div><div className="reader-topic-label">{group.section} <span>→</span> {topic}</div><h1>{group.rangeLabel}</h1><h2>{group.marker}</h2>{contextText && <pre>{contextText}</pre>}<div className="standalone-provenance"><span><FileText size={14} /> {workbookSource.pageLabel} {group.sourcePages[0]}–{group.sourcePages[1]}</span><span className="reader-source-book">{workbookSource.shortTitle}</span><span>{group.questions.length} linked questions</span></div></div>{visualTypes.has(group.contextType) && visualUrl && <figure className="standalone-visual"><img src={visualUrl} alt={`Original ${group.contextType} for ${group.rangeLabel}, ${workbookSource.pageLabel} ${visualSourceLabel}`} /><figcaption>Original {workbookSource.pageLabel} {visualSourceLabel}. Keep this visual in view while answering.</figcaption></figure>}</section><aside className="reader-margin-notes" aria-label="Study margin notes"><div className="margin-note"><span>NOTE 01</span><strong>Source folio</strong><p>{workbookSource.pageLabel} {group.sourcePages[0]}–{group.sourcePages[1]}</p></div><div className="margin-note"><span>NOTE 02</span><strong>Read as a set</strong><p>{group.questions.length} linked question{group.questions.length === 1 ? "" : "s"} share this context.</p></div><div className="margin-note margin-note-action"><span>NEXT ACTION</span><strong>Mark your place</strong><p>Check each answer, then use the folio rule to turn to the next set.</p></div></aside></div>
      <section className="practice-session"><div className="practice-session-top"><div><div className="eyebrow">ANSWER FROM THE SOURCE · {topic}</div><h2>Questions {group.questionStart}–{group.questionEnd}</h2></div><div className="practice-progress"><span>{answeredCount} / {activeQuestions.length} checked</span><i><b style={{ width: `${activeQuestions.length ? (answeredCount / activeQuestions.length) * 100 : 0}%` }} /></i></div></div><div className="standalone-question-list">{activeQuestions.map((question) => <PracticeQuestion key={question.number} question={question} selected={selected[question.number]} response={responses[question.number]} submitted={Boolean(submitted[question.number])} onSelect={(label) => setSelected((items) => ({ ...items, [question.number]: label }))} onResponse={(value) => setResponses((items) => ({ ...items, [question.number]: value }))} onCheck={() => setSubmitted((items) => ({ ...items, [question.number]: true }))} onReset={() => { setSubmitted((items) => ({ ...items, [question.number]: false })); setSelected((items) => ({ ...items, [question.number]: "" })); setResponses((items) => ({ ...items, [question.number]: "" })); }} bookmarked={bookmarked.includes(question.number)} onBookmark={() => toggleBookmark(question.number)} />)}</div></section>
    </main>
  </div>;
}

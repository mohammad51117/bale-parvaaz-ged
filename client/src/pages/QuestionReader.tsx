/* Atlas Study Hall: a focused practice folio with real answer controls, quiet feedback, and source-first context. */
import { useMemo, useRef, useState } from "react";
import { ArrowLeft, BookOpen, Bookmark, Check, CheckCircle2, ChevronLeft, ChevronRight, CircleX, FileText, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
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
import { getSupplementalSocialStudiesSourcePage } from "@/lib/supplementalSocialStudiesSourcePages";
import { brandLogoAlt, brandLogoUrl } from "@/lib/branding";
import { publicGedSourcePageAsset, publicGedVisualAsset } from "@/lib/publicAssetUrls";
import { usePersistentStudyLibrary } from "@/lib/persistentLibrary";
import { pinchSourceZoom, sourcePageViewportClass, stepSourceZoom } from "@/lib/sourceZoom";
import { mergeSourceVisuals } from "@/lib/sourceVisuals";

type Group = { id: string; section: string; questionStart: number; questionEnd: number; rangeLabel: string; contextType: string; marker: string; context: string; sourcePages: readonly number[]; visualPage?: number | null; questions: readonly { number: number; text: string }[] };
type InteractiveQuestion = { number: number; groupId: string; section: string; topic: string; reference: string; prompt: string; choices: readonly { label: string; text: string }[]; correctLabel: string | null; answerLine: string; explanation: string; sourcePage: number };
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
  const { data: persistentLibrary } = usePersistentStudyLibrary();
  const groupId = decodeURIComponent(location.split("/").pop() || "");
  const bundledGroups = [...(questionGroups.groups as readonly Group[]), ...(supplementalEconomicsGroups as readonly Group[]), ...(supplementalMcGrawHillGroups as readonly Group[]), ...(supplementalBatterySocialStudiesGroups as readonly Group[]), ...(supplementalKaplanSocialStudiesGroups as readonly Group[]), ...(supplementalKaplanSocialStudiesPretestGroups as readonly Group[]), ...(supplementalPrincetonSocialStudiesTest2Groups as readonly Group[])];
  const groups = (persistentLibrary?.groups.length ? persistentLibrary.groups : bundledGroups) as readonly Group[];
  const groupIndex = Math.max(0, groups.findIndex((item) => item.id === groupId));
  const group = groups[groupIndex] || groups[0];
  const bundledQuestions = [...(interactiveQuestions.questions as readonly InteractiveQuestion[]), ...(supplementalEconomicsQuestions as readonly InteractiveQuestion[]), ...(supplementalMcGrawHillQuestions as readonly InteractiveQuestion[]), ...(supplementalBatterySocialStudiesQuestions as readonly InteractiveQuestion[]), ...(supplementalKaplanSocialStudiesQuestions as readonly InteractiveQuestion[]), ...(supplementalKaplanSocialStudiesPretestQuestions as readonly InteractiveQuestion[]), ...(supplementalPrincetonSocialStudiesTest2Questions as readonly InteractiveQuestion[])];
  const allInteractiveQuestions = (persistentLibrary?.questions.length ? persistentLibrary.questions : bundledQuestions) as readonly InteractiveQuestion[];
  const questionMap = useMemo(() => new Map(allInteractiveQuestions.map((question) => [`${question.groupId}-${question.number}`, question])), [allInteractiveQuestions]);
  const activeQuestions = group.questions.map((question) => questionMap.get(`${group.id}-${question.number}`)).filter(Boolean) as InteractiveQuestion[];
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const [sourceZoom, setSourceZoom] = useState(1);
  const touchPoints = useRef(new Map<number, { x: number; y: number }>());
  const pinchStart = useRef<{ distance: number; zoom: number } | null>(null);
  const contextText = group.context && !group.context.startsWith("The shared source material") ? group.context : "";
  const previous = groups[groupIndex - 1];
  const next = groups[groupIndex + 1];
  const subjectSlug = useMemo(() => group.section.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""), [group.section]);
  const topic = activeQuestions[0]?.topic || "General practice";
  const bundledWorkbookSource = getWorkbookSource(group.id);
  const workbookSource = persistentLibrary?.sourcesById[bundledWorkbookSource.id] ?? bundledWorkbookSource;
  const reference = workbookSource.title;
  const allVisualAssets = { ...visualAssets, ...supplementalEconomicsVisuals, ...supplementalMcGrawHillVisuals, ...supplementalBatterySocialStudiesVisuals, ...supplementalKaplanSocialStudiesVisuals, ...supplementalKaplanSocialStudiesPretestVisuals, ...supplementalPrincetonSocialStudiesTest2Visuals };
  const sourcePageNumbers = group.sourcePages.length > 1 ? Array.from({ length: Math.max(...group.sourcePages) - Math.min(...group.sourcePages) + 1 }, (_, index) => Math.min(...group.sourcePages) + index) : [...group.sourcePages];
  const sourcePageVisuals = sourcePageNumbers.map((page) => {
    const persistentUrl = persistentLibrary?.sourcePageUrls[`${workbookSource.id}:${page}`];
    const fallbackUrl = getSupplementalSocialStudiesSourcePage(group.id, page);
    const url = persistentUrl || fallbackUrl || publicGedSourcePageAsset(workbookSource.id, page);
    return url ? { page, url } : null;
  }).filter((item): item is { page: number; url: string } => Boolean(item));
  const legacyVisualUrl = group.visualPage
    ? publicGedVisualAsset(group.visualPage, allVisualAssets[group.visualPage] || "")
    : undefined;
  const visualSourceLabel = group.visualPage ? group.visualPage >= 6000 ? group.visualPage - 6000 : group.visualPage >= 4000 ? group.visualPage - 4000 : group.visualPage >= 3000 ? group.visualPage - 3000 : group.visualPage >= 2000 ? group.visualPage - 2000 : group.visualPage >= 1000 ? group.visualPage - 1000 : group.visualPage : group.sourcePages[0];
  const sourceVisuals = mergeSourceVisuals(sourcePageVisuals, legacyVisualUrl ? { page: visualSourceLabel, url: legacyVisualUrl } : undefined);
  const answeredCount = activeQuestions.filter((question) => submitted[question.number]).length;
  const toggleBookmark = (number: number) => setBookmarked((items) => items.includes(number) ? items.filter((item) => item !== number) : [...items, number]);
  const handleZoomKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, action: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  };
  const touchDistance = (points: { x: number; y: number }[]) => points.length < 2 ? 0 : Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y);
  const handleSourcePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "touch") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    touchPoints.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (touchPoints.current.size === 2) {
      pinchStart.current = { distance: touchDistance(Array.from(touchPoints.current.values())), zoom: sourceZoom };
    }
  };
  const handleSourcePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "touch" || !touchPoints.current.has(event.pointerId)) return;
    touchPoints.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (touchPoints.current.size === 2 && pinchStart.current) {
      setSourceZoom(pinchSourceZoom(pinchStart.current.zoom, pinchStart.current.distance, touchDistance(Array.from(touchPoints.current.values()))));
    }
  };
  const handleSourcePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "touch") return;
    touchPoints.current.delete(event.pointerId);
    if (touchPoints.current.size < 2) pinchStart.current = null;
  };

  return <div className="reader-page-shell">
    <header className="reader-page-header"><Link href="/" className="subject-brand dashboard-brand-link" aria-label="Go to study dashboard" title="Go to study dashboard"><span className="brand-mark brand-mark-photo"><img src={brandLogoUrl} alt={brandLogoAlt} /></span><div><strong>Bale Parvaaz</strong><small>GED / TEACHER MOMENI</small></div></Link><div className="reader-header-actions"><Link href={`/subject/${subjectSlug}`} className="back-link"><ArrowLeft size={16} /> Subject index</Link><span className="reader-window-label">IN-APP PRACTICE READER</span></div></header>
    <main className="reader-page-main">
      <div className="reader-page-kicker"><span>{reference}</span><span>/</span><strong>{group.section}</strong><span>/</span><strong>{topic}</strong><span>/</span><strong>{group.rangeLabel}</strong></div>
      <div className="reader-page-nav"><Link href={previous ? `/reader/${previous.id}` : `/subject/${subjectSlug}`} className={!previous ? "disabled" : ""}><ChevronLeft size={17} /> Previous set</Link><span>Set {groupIndex + 1} of {groups.length}</span><Link href={next ? `/reader/${next.id}` : `/subject/${subjectSlug}`} className={!next ? "disabled" : ""}>Next set <ChevronRight size={17} /></Link></div>
      <div className="reader-context-layout"><section className={`standalone-context ${group.contextType}`}><div className="standalone-context-copy"><div className="eyebrow source-context-eyebrow"><span>SHARED SOURCE CONTEXT</span><i>· {group.contextType}</i></div><div className="reader-topic-label">{group.section} <span>→</span> {topic}</div><h1>{group.rangeLabel}</h1><h2>{group.marker}</h2>{contextText && <pre>{contextText}</pre>}<div className="standalone-provenance"><span><FileText size={14} /> {workbookSource.pageLabel} {group.sourcePages[0]}–{group.sourcePages[1]}</span><span className="reader-source-book">{workbookSource.shortTitle}</span><span>{group.questions.length} linked questions</span></div></div>{sourceVisuals.length > 0 && <div className="standalone-source-pages" aria-label={`Original ${workbookSource.pageLabel}s for ${group.rangeLabel}`}><div className="source-page-toolbar"><span>Original source pages</span><div className="source-zoom-controls" aria-label="Source page zoom controls"><button type="button" onClick={() => setSourceZoom((value) => stepSourceZoom(value, -1))} onKeyDown={(event) => handleZoomKeyDown(event, () => setSourceZoom((value) => stepSourceZoom(value, -1)))} disabled={sourceZoom <= 1} aria-label="Zoom out"><ZoomOut size={15} /></button><span aria-live="polite">{Math.round(sourceZoom * 100)}%</span><button type="button" onClick={() => setSourceZoom((value) => stepSourceZoom(value, 1))} onKeyDown={(event) => handleZoomKeyDown(event, () => setSourceZoom((value) => stepSourceZoom(value, 1)))} disabled={sourceZoom >= 2.5} aria-label="Zoom in"><ZoomIn size={15} /></button><button type="button" onClick={() => setSourceZoom(1)} onKeyDown={(event) => handleZoomKeyDown(event, () => setSourceZoom(1))} disabled={sourceZoom === 1} aria-label="Fit source page to width" title="Fit source page to width"><RotateCcw size={14} /></button></div></div>{sourceVisuals.map(({ page, url }) => <figure className="standalone-visual source-page-visual" key={page}><div className={sourcePageViewportClass(sourceZoom)} onPointerDown={handleSourcePointerDown} onPointerMove={handleSourcePointerMove} onPointerUp={handleSourcePointerEnd} onPointerCancel={handleSourcePointerEnd}><img className="source-page-image" style={{ width: `${sourceZoom * 100}%` }} src={url} alt={`Original ${group.contextType} source page ${page} for ${group.rangeLabel}`} /></div><figcaption>Original {workbookSource.pageLabel} {page}. Keep this page in view while answering.</figcaption></figure>)}</div>}</section></div><aside className="reader-margin-notes reader-margin-notes-bottom" aria-label="Study margin notes"><div className="margin-note"><span>NOTE 01</span><strong>Source folio</strong><p>{workbookSource.pageLabel} {group.sourcePages[0]}–{group.sourcePages[1]}</p></div><div className="margin-note"><span>NOTE 02</span><strong>Read as a set</strong><p>{group.questions.length} linked question{group.questions.length === 1 ? "" : "s"} share this context.</p></div><div className="margin-note margin-note-action"><span>NEXT ACTION</span><strong>Mark your place</strong><p>Check each answer, then use the folio rule to turn to the next set.</p></div></aside>
      <section className="practice-session"><div className="practice-session-top"><div><div className="eyebrow">ANSWER FROM THE SOURCE · {topic}</div><h2>Questions {group.questionStart}–{group.questionEnd}</h2></div><div className="practice-progress"><span>{answeredCount} / {activeQuestions.length} checked</span><i><b style={{ width: `${activeQuestions.length ? (answeredCount / activeQuestions.length) * 100 : 0}%` }} /></i></div></div><div className="standalone-question-list">{activeQuestions.map((question) => <PracticeQuestion key={question.number} question={question} selected={selected[question.number]} response={responses[question.number]} submitted={Boolean(submitted[question.number])} onSelect={(label) => setSelected((items) => ({ ...items, [question.number]: label }))} onResponse={(value) => setResponses((items) => ({ ...items, [question.number]: value }))} onCheck={() => setSubmitted((items) => ({ ...items, [question.number]: true }))} onReset={() => { setSubmitted((items) => ({ ...items, [question.number]: false })); setSelected((items) => ({ ...items, [question.number]: "" })); setResponses((items) => ({ ...items, [question.number]: "" })); }} bookmarked={bookmarked.includes(question.number)} onBookmark={() => toggleBookmark(question.number)} />)}</div></section>
    </main>
  </div>;
}

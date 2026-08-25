/* Atlas Study Hall: page-faithful editorial study reader with a book-spine rail, parchment surfaces, ink-blue hierarchy, and Parvaaz saffron progress accents. */
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  FileText,
  Filter,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Search,
  Sparkles,
  Table2,
  X,
} from "lucide-react";
import { bookData } from "@/lib/bookData";
import { questionGroups } from "@/lib/questionGroups";
import { visualAssets } from "@/lib/visualAssets";
import { supplementalEconomicsGroups } from "@/lib/supplementalEconomics";
import { supplementalEconomicsQuestions } from "@/lib/supplementalEconomics";
import { supplementalEconomicsVisuals } from "@/lib/supplementalEconomicsVisuals";
import { supplementalMcGrawHillGroups, supplementalMcGrawHillQuestions } from "@/lib/supplementalMcGrawHill";
import { supplementalMcGrawHillVisuals } from "@/lib/supplementalMcGrawHillVisuals";
import { getInitialWorkbookFilter, getWorkbookSource, matchesWorkbook, persistWorkbookFilter, type WorkbookFilter, workbookFilterOptions } from "@/lib/workbookSources";
import { demoLessons } from "@/lib/lessonDemos";
import { socialStudiesLessons } from "@/lib/socialStudiesLessons";
import { completeSocialLessons } from "@/lib/completeSocialLessons";
import { useLocation } from "wouter";

type PageRecord = { page: number; title: string; section: string; kind: string; hasVisual: boolean; content: string; wordCount: number };
type QuestionGroup = { id: string; section: string; questionStart: number; questionEnd: number; rangeLabel: string; contextType: string; marker: string; context: string; sourcePages: readonly number[]; visualPage?: number | null; questions: readonly { number: number; text: string }[] };

const subjectColors: Record<string, string> = {
  "Mathematical Reasoning": "#C36B3D",
  "Reasoning Through Language Arts": "#496D72",
  "Social Studies": "#8A6B42",
  Science: "#5C7399",
};

const openingPages = [
  "/manus-storage/page-01_ded85030.jpg",
  "/manus-storage/page-02_03bca7f4.jpg",
  "/manus-storage/page-03_7ca5a70e.jpg",
  "/manus-storage/page-04_8b9f1476.jpg",
  "/manus-storage/page-05_20410d7d.jpg",
];

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export default function Home() {
  const [, setLocation] = useLocation();
  const pages = bookData.pages as readonly PageRecord[];
  const groups = [...questionGroups.groups, ...supplementalEconomicsGroups, ...supplementalMcGrawHillGroups] as readonly QuestionGroup[];
  const sectionQuestionCounts = useMemo(() => bookData.subjects.map((item) => ({
    ...item,
    questionCount: groups.filter((group) => group.section === item.name).reduce((sum, group) => sum + group.questions.length, 0),
  })), [groups]);
  const totalQuestionCount = sectionQuestionCounts.reduce((sum, item) => sum + item.questionCount, 0);
  const requestedGroup = new URLSearchParams(window.location.search).get("group");
  const initialGroup = requestedGroup && groups.some((group) => group.id === requestedGroup) ? requestedGroup : groups[0]?.id ?? "";
  const initialActivePage = groups.find((group) => group.id === initialGroup)?.sourcePages[0] ?? 6;
  const [activePage, setActivePage] = useState(initialActivePage);
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("All subjects");
  const [kind, setKind] = useState("All page types");
  const [workbookFilter, setWorkbookFilter] = useState<WorkbookFilter>(getInitialWorkbookFilter);
  const [mobileRail, setMobileRail] = useState(false);
  const [bookmarked, setBookmarked] = useState<number[]>([6]);
  const [showOpening, setShowOpening] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState(initialGroup);

  const allVisualAssets = { ...visualAssets, ...supplementalEconomicsVisuals, ...supplementalMcGrawHillVisuals };
  const currentPage = pages.find((page) => page.page === activePage) ?? pages[0];
  const activeGroup = groups.find((group) => group.id === activeGroupId) ?? groups[0];
  const activeContextText = activeGroup?.context && !activeGroup.context.startsWith("The shared source material") ? activeGroup.context : "";

  const activeSubject = currentPage?.section.split(" · ")[0] ?? "Mathematical Reasoning";

  const filteredGroups = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    return groups.filter((group) => {
      const subjectMatch = subject === "All subjects" || group.section === subject;
      const workbookMatch = matchesWorkbook(group.id, workbookFilter);
      const searchMatch = !normalized || `${group.marker} ${group.context} ${group.questions.map((item) => item.text).join(" ")}`.toLowerCase().includes(normalized);
      return subjectMatch && workbookMatch && searchMatch;
    });
  }, [groups, query, subject, workbookFilter]);

  const workbookCounts = useMemo(() => workbookFilterOptions.map((option) => {
    const matchingGroups = groups.filter((group) => matchesWorkbook(group.id, option.value));
    return { ...option, count: matchingGroups.length, questionCount: matchingGroups.reduce((sum, group) => sum + group.questions.length, 0) };
  }), [groups]);
  const activeWorkbookOption = workbookFilterOptions.find((option) => option.value === workbookFilter) || workbookFilterOptions[0];
  const isSupplementWorkbook = workbookFilter === "economics" || workbookFilter === "mcgraw";
  const visibleActiveGroup = filteredGroups.find((group) => group.id === activeGroupId) ?? filteredGroups[0];
  const visibleActiveWorkbookSource = visibleActiveGroup ? getWorkbookSource(visibleActiveGroup.id) : null;
  const filteredQuestionCount = filteredGroups.reduce((sum, group) => sum + group.questions.length, 0);
  const activeWorkbookCount = workbookCounts.find((option) => option.value === workbookFilter) || workbookCounts[0];

  const filteredPages = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (isSupplementWorkbook) return [];
    return pages.filter((page) => {
      const subjectMatch = subject === "All subjects" || page.section.startsWith(subject);
      const kindMatch = kind === "All page types" || page.kind === kind;
      const searchMatch = !normalized || `${page.content} ${page.section}`.toLowerCase().includes(normalized);
      return subjectMatch && kindMatch && searchMatch;
    }).slice(0, 120);
  }, [kind, pages, query, subject, workbookFilter]);

  const updateWorkbookFilter = (value: string) => {
    const next = value === "main" || value === "economics" || value === "mcgraw" ? value : "all";
    setWorkbookFilter(next);
    persistWorkbookFilter(next);
  };
  const completedBySubject = (name: string) => Math.round((bookData.subjects.find((item) => item.name === name)?.pages ?? 0) * 0.22);
  const toggleBookmark = (page: number) => setBookmarked((current) => current.includes(page) ? current.filter((item) => item !== page) : [...current, page]);
  const goToPage = (page: number) => {
    if (page >= 6 && page <= 683) setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-shell">
      <aside className={`book-rail ${mobileRail ? "book-rail-open" : ""}`}>
        <div className="rail-brand">
          <img className="brand-logo" src="/manus-storage/teacher-momeni-logo_2d3d1795.png" alt="Teacher Momeni logo" />
          <div>
            <div className="brand-name">Bale Parvaaz</div>
            <div className="brand-subtitle">GED / Teacher Momeni</div>
          </div>
          <button className="rail-close" onClick={() => setMobileRail(false)} aria-label="Close navigation"><X size={18} /></button>
        </div>
        <div className="rail-rule" />
        <nav className="rail-nav" aria-label="Study navigation">
          <button className="rail-link active" onClick={() => { setSubject("All subjects"); setShowOpening(false); }}><LayoutDashboard size={17} /><span>Study desk</span><span className="rail-key">⌘ 1</span></button>
          <button className={`rail-link ${showOpening ? "active" : ""}`} onClick={() => setShowOpening(true)}><BookOpen size={17} /><span>Opening pages</span><span className="rail-count">05</span></button>
          <div className="rail-section-label">Lessons</div>
          {demoLessons.map((lesson) => (
            <button key={lesson.id} className="rail-link subject-link lesson-rail-link" onClick={() => { setMobileRail(false); setLocation(`/lesson/${lesson.id}`); }}>
              <BookOpen size={15} style={{ color: lesson.accent }} />
              <span>{lesson.shortSubject}</span>
              <span className="rail-count">01</span>
            </button>
          ))}
          <div className="rail-link lesson-rail-summary"><BookOpen size={15} style={{ color: subjectColors["Social Studies"] }} /><span>McGraw Hill lessons</span><span className="rail-count">{completeSocialLessons.length}</span></div>
          <div className="lesson-rail-sublist">{socialStudiesLessons.map((lesson) => <button key={lesson.id} className="rail-link lesson-rail-subitem" onClick={() => { setMobileRail(false); setLocation(`/lesson/${lesson.id}`); }}><span className="lesson-rail-line" style={{ backgroundColor: lesson.accent }} /><span>{lesson.shortSubject}</span><span className="rail-count">01</span></button>)}</div>
          <div className="rail-section-label">The four sections</div>
          {bookData.subjects.map((item) => (
            <button key={item.name} className={`rail-link subject-link ${subject === item.name ? "active" : ""}`} onClick={() => { setLocation(`/subject/${item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`); }}>
              <span className="subject-dot" style={{ backgroundColor: subjectColors[item.name] }} />
              <span>{item.name.replace("Reasoning Through ", "").replace("Mathematical ", "Math ")}</span>
              <span className="rail-count">{formatNumber(sectionQuestionCounts.find((section) => section.name === item.name)?.questionCount ?? 0)}</span>
            </button>
          ))}
        </nav>
        <div className="rail-bottom">
          <div className="rail-mini-note"><Sparkles size={15} /><span>Keep going. Your next page is waiting.</span></div>
          <div className="rail-user"><div className="avatar">TM</div><div><strong>Teacher Momeni</strong><span>Personal study desk</span></div><ChevronDown size={15} /></div>
        </div>
      </aside>

      <main className="main-canvas">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileRail(true)} aria-label="Open navigation"><Menu size={20} /></button>
          <div className="breadcrumb"><span>Study desk</span><span className="slash">/</span><span>{showOpening ? "Opening pages" : activeSubject}</span><span className="slash">/</span><strong>{showOpening ? "Pages 01–05" : `Page ${String(activePage).padStart(3, "0")}`}</strong></div>
          <div className="topbar-actions"><button className="topbar-icon" aria-label="Bookmarks"><Bookmark size={17} /><span>{bookmarked.length}</span></button><div className="topbar-divider" /><span className="folio-label">Folio 2026</span></div>
        </header>

        <div className="content-wrap">
          {showOpening ? (
            <section className="opening-view">
              <div className="eyebrow"><BookOpen size={15} /> PRESERVED SOURCE OPENING</div>
              <div className="opening-heading-row"><div><h1>The first five pages, kept intact.</h1><p className="lede">A quiet landing place before the practice begins. These opening pages remain as source-page previews so the original context is never lost.</p></div><button className="button-secondary" onClick={() => { setShowOpening(false); setActivePage(6); }}>Begin conversion <ArrowRight size={16} /></button></div>
              <div className="opening-grid">{openingPages.map((src, index) => <figure className="source-page" key={src}><div className="source-page-frame"><img src={src} alt={`Preserved source page ${index + 1}`} /></div><figcaption><span>PAGE {String(index + 1).padStart(2, "0")}</span><span>Source preserved</span></figcaption></figure>)}</div>
              <div className="opening-footer-note"><CircleHelp size={16} /><span>Pages 06 onward are converted into searchable, page-by-page study content. Visual-heavy pages are marked with a visual cue in the reader.</span></div>
            </section>
          ) : (
            <>
              <section className="desk-hero">
                <div className="hero-copy"><div className="eyebrow"><GraduationCap size={15} /> YOUR GED PRACTICE DESK</div><h1>Pick up where your pencil left off.</h1><p>One question closer to test day. Browse the original book page by page, or jump straight into a section that needs your attention.</p><div className="hero-actions"><button className="button-primary" onClick={() => goToPage(activePage)}><BookOpen size={17} /> Continue reading</button><button className="button-text" onClick={() => setShowOpening(true)}>View the opening <ArrowRight size={16} /></button></div></div><div className="hero-art"><img src="/manus-storage/parvaaz-hero_e37cae69.jpg" alt="Open GED workbook and pencil on a warm study desk" /><div className="hero-art-caption"><span>QUESTION BANK / {formatNumber(totalQuestionCount)} QUESTIONS</span><strong>Page-faithful practice, made navigable.</strong></div></div>
              </section>

              <section className="stats-row" aria-label="Study progress"><div className="stat-card stat-card-primary"><div className="stat-label">BOOK CONVERSION</div><div className="stat-value">{formatNumber(pages.length)} <small>pages</small></div><div className="stat-progress"><span style={{ width: `${Math.round((activePage / 683) * 100)}%` }} /></div><div className="stat-foot"><span>Current folio {activePage} of 683</span><strong>{Math.round((activePage / 683) * 100)}%</strong></div></div><div className="stat-card"><div className="stat-label">BOOKMARKED</div><div className="stat-value">{String(bookmarked.length).padStart(2, "0")} <small>pages</small></div><div className="stat-foot"><span>Saved for a second pass</span><Bookmark size={16} /></div></div><div className="stat-card"><div className="stat-label">QUESTION BANK</div><div className="stat-value">{formatNumber(totalQuestionCount)} <small>questions</small></div><div className="stat-foot"><span>{activeWorkbookCount?.shortLabel || "All sources"}</span><strong>{formatNumber(filteredGroups.length)} sets</strong></div></div></section>

              <section className="lesson-dashboard" aria-labelledby="lesson-dashboard-title"><div className="section-dashboard-heading"><div><div className="eyebrow"><BookOpen size={14} /> LESSONS</div><h2 id="lesson-dashboard-title">Start with one clear lesson.</h2></div><p>One carefully grounded demo from the source book for each GED section.</p></div><div className="lesson-dashboard-grid">{demoLessons.map((lesson) => <button key={lesson.id} className="lesson-dashboard-card" onClick={() => setLocation(`/lesson/${lesson.id}`)}><span className="lesson-card-top"><span className="section-dashboard-dot" style={{ backgroundColor: lesson.accent }} /><span className="lesson-count">01 LESSON</span></span><span className="section-dashboard-name">{lesson.shortSubject}</span><strong>{lesson.title}</strong><span className="lesson-card-source">Source folio {lesson.sourcePage} · PDF page preserved</span><ArrowRight size={16} /></button>)}</div></section>

              <section className="section-dashboard" aria-labelledby="section-dashboard-title"><div className="section-dashboard-heading"><div><div className="eyebrow">THE FOUR SECTIONS</div><h2 id="section-dashboard-title">Choose a subject, then study by label.</h2></div><p>All counts include the main book and both supplemental workbooks.</p></div><div className="section-dashboard-grid">{sectionQuestionCounts.map((item) => { const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); return <button key={item.name} className="section-dashboard-card" onClick={() => setLocation(`/subject/${slug}`)}><span className="section-dashboard-dot" style={{ backgroundColor: subjectColors[item.name] }} /><span className="section-dashboard-name">{item.name.replace("Reasoning Through ", "").replace("Mathematical ", "Math ")}</span><strong>{formatNumber(item.questionCount)}</strong><span className="section-dashboard-label">questions across all books</span><ArrowRight size={16} /></button>; })}</div></section>

              <section className="workspace-grid home-question-browser"><div className="reading-column"><div className="section-heading"><div><div className="eyebrow">QUESTION-FIRST CONVERSION</div><h2>Study by question set.</h2></div><div className="section-heading-tools"><label className="workbook-filter-control"><span>WORKBOOK SOURCE</span><select value={workbookFilter} onChange={(event) => updateWorkbookFilter(event.target.value)} aria-label="Filter question sets by workbook">{workbookCounts.map((option) => <option key={option.value} value={option.value}>{option.shortLabel} · {option.count} sets</option>)}</select></label><span className="result-count">{formatNumber(filteredQuestionCount)} questions · {filteredGroups.length} sets · {filteredPages.length} pages</span></div></div><p className="section-intro">When a passage, table, map, graph, or figure introduces a range, it stays attached to every question it supports.</p><div className="group-list">{filteredGroups.slice(0, 80).map((group) => <button key={group.id} className={`group-card ${activeGroupId === group.id ? "selected" : ""}`} onClick={() => setLocation(`/reader/${group.id}`)}><div className="group-card-top"><span className={`context-type ${group.contextType}`}>{group.contextType}</span><span className="group-source">pp. {group.sourcePages[0]}–{group.sourcePages[1]}</span></div><strong>{group.rangeLabel}</strong><span className="group-section">{group.section} · {group.questions.length} linked {group.questions.length === 1 ? "question" : "questions"}</span><span className="group-workbook">{getWorkbookSource(group.id).shortTitle} · {getWorkbookSource(group.id).pageLabel} {group.sourcePages[0]}–{group.sourcePages[1]}</span><span className="group-snippet">{group.context || group.marker}</span><span className="group-open"><ArrowRight size={15} /></span></button>)}</div><div className="search-controls"><div className="search-field"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the book by phrase, topic, or page…" aria-label="Search the book" />{query && <button onClick={() => setQuery("")} aria-label="Clear search"><X size={15} /></button>}</div><select value={subject} onChange={(event) => setSubject(event.target.value)} aria-label="Filter by subject"><option>All subjects</option>{bookData.subjects.map((item) => <option key={item.name}>{item.name}</option>)}</select><select value={kind} onChange={(event) => setKind(event.target.value)} aria-label="Filter by page type"><option>All page types</option><option value="question">Questions</option><option value="visual">Visual pages</option><option value="explanation">Explanations</option><option value="reading">Reading</option></select><button className="filter-button" aria-label="Filters"><Filter size={16} /></button></div><div className="index-divider"><span>{isSupplementWorkbook ? "Supplement question sets" : "Main-book converted source pages"}</span><span>{isSupplementWorkbook ? "Original scanned workbook visuals stay with each reader" : "Use this index for exact folio navigation"}</span></div><div className="page-list">{filteredPages.map((page, index) => { const previous = filteredPages[index - 1]; const landmark = !previous || previous.section !== page.section; return <div key={page.page}>{landmark && <div className="index-landmark"><span className="landmark-rule" /><span>{page.section}</span><span className="landmark-note">source folio {String(page.page).padStart(3, "0")}</span></div>}<button className={`page-row ${activePage === page.page ? "selected" : ""}`} onClick={() => goToPage(page.page)}><span className="page-folio">{String(page.page).padStart(3, "0")}</span><span className="page-row-main"><strong>{page.title || page.section}</strong><span>{page.section} · {page.wordCount} words {page.hasVisual ? "· visual source material" : "· converted text"}</span></span><span className={`kind-pill ${page.kind}`}>{page.hasVisual && <Table2 size={13} />}{page.kind === "question" ? "Question" : page.kind === "visual" ? "Visual" : page.kind === "explanation" ? "Answer" : "Reading"}</span><span className="page-row-arrow"><ArrowRight size={16} /></span></button></div>})}{filteredPages.length === 0 && <div className="empty-state"><Search size={22} /><strong>{isSupplementWorkbook ? "This supplement is organized as question sets." : "No pages match that search."}</strong><span>{isSupplementWorkbook ? "Open a supplemental question set above to keep its scanned source context and answers together." : "Try a broader phrase or clear one of the filters."}</span></div>}</div></div>

                <aside className="context-column"><div className="context-card question-set-card"><div className="context-card-top"><span className="eyebrow">SHARED CONTEXT</span><span className={`context-type ${visibleActiveGroup?.contextType}`}>{visibleActiveGroup?.contextType}</span></div><div className="context-range">{visibleActiveGroup?.rangeLabel}</div><div className="context-workbook">{visibleActiveWorkbookSource?.shortTitle} · {visibleActiveWorkbookSource?.pageLabel} {visibleActiveGroup?.sourcePages[0]}–{visibleActiveGroup?.sourcePages[1]}</div><h3>{visibleActiveGroup?.marker}</h3>{visibleActiveGroup?.context && !visibleActiveGroup.context.startsWith("The shared source material") && <div className="shared-context-copy">{visibleActiveGroup.context}</div>}{visibleActiveGroup?.visualPage && allVisualAssets[visibleActiveGroup.visualPage] && <img className="source-visual-image" src={allVisualAssets[visibleActiveGroup.visualPage]} alt={`Original ${visibleActiveGroup.contextType} for ${visibleActiveGroup.rangeLabel}, source folio ${visibleActiveGroup.visualPage}`} />}<div className="context-pages"><FileText size={14} /> {visibleActiveWorkbookSource?.pageLabel} {visibleActiveGroup?.sourcePages[0]}–{visibleActiveGroup?.sourcePages[1]}</div><button className="read-button" onClick={() => visibleActiveGroup && setLocation(`/reader/${visibleActiveGroup.id}`)}>Open question set <ArrowRight size={16} /></button></div><div className="context-card reading-card"><div className="context-card-top"><span className="eyebrow">{isSupplementWorkbook ? "SUPPLEMENT MODE" : "NOW READING"}</span>{!isSupplementWorkbook && <button onClick={() => toggleBookmark(activePage)} className={`bookmark-button ${bookmarked.includes(activePage) ? "saved" : ""}`} aria-label="Toggle bookmark"><Bookmark size={17} fill={bookmarked.includes(activePage) ? "currentColor" : "none"} /></button>}</div><div className="context-folio">{isSupplementWorkbook ? "Q" : String(activePage).padStart(3, "0")}</div><h3>{isSupplementWorkbook ? activeWorkbookOption.shortLabel : currentPage?.section}</h3><p>{isSupplementWorkbook ? "Choose a question set above to keep its scanned source context and answers together." : currentPage?.title || "Converted source page"}</p><button className="read-button" onClick={() => isSupplementWorkbook ? visibleActiveGroup && setLocation(`/reader/${visibleActiveGroup.id}`) : goToPage(activePage)}>{isSupplementWorkbook ? "Open selected set" : "Open reader"} <ArrowRight size={16} /></button></div><div className="context-card subject-card"><div className="context-card-top"><span className="eyebrow">SECTION MAP</span><MapIcon /></div>{bookData.subjects.map((item) => <button key={item.name} className="subject-progress" onClick={() => { setLocation(`/subject/${item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`); }}><span className="subject-progress-dot" style={{ backgroundColor: subjectColors[item.name] }} /><span className="subject-progress-name">{item.name}</span><span className="subject-progress-value">{completedBySubject(item.name)}%</span><span className="mini-progress"><i style={{ width: `${completedBySubject(item.name)}%`, backgroundColor: subjectColors[item.name] }} /></span></button>)}</div><div className="context-card tip-card"><div className="tip-icon"><Sparkles size={16} /></div><div><div className="eyebrow">STUDY NOTE</div><p>When you miss a question, bookmark the page before checking the explanation. Your second pass becomes the real lesson.</p></div></div></aside></section>

              <section className="reader-panel home-question-browser" id="question-reader">
                <div className="reader-topline">
                  <div>
                    <div className="eyebrow"><CircleHelp size={14} /> QUESTION SET READER</div>
                    <h2 className="question-reader-title">{activeGroup?.rangeLabel} <span>{activeGroup?.section}</span></h2>
                  </div>
                  <div className="reader-nav">
                    <button onClick={() => { const index = Math.max(0, groups.findIndex((group) => group.id === activeGroupId) - 1); const next = groups[index]; if (next) { setActiveGroupId(next.id); setActivePage(next.sourcePages[0] ?? 6); } }} aria-label="Previous question set"><ArrowLeft size={16} /></button>
                    <span>{groups.findIndex((group) => group.id === activeGroupId) + 1} / {groups.length}</span>
                    <button onClick={() => { const index = Math.min(groups.length - 1, groups.findIndex((group) => group.id === activeGroupId) + 1); const next = groups[index]; if (next) { setActiveGroupId(next.id); setActivePage(next.sourcePages[0] ?? 6); } }} aria-label="Next question set"><ArrowRight size={16} /></button>
                  </div>
                </div>
                <div className="folio-line"><span style={{ width: `${Math.round((activePage / 683) * 100)}%` }} /></div>
                <div className="group-reader">
                  <div className={`group-context-panel ${activeGroup?.contextType}`}>
                    <div className="eyebrow">{activeGroup?.contextType} · {activeGroup?.rangeLabel}</div>
                    <h3>{activeGroup?.marker}</h3>
                    {activeContextText && <pre>{activeContextText}</pre>}{activeGroup?.visualPage && allVisualAssets[activeGroup.visualPage] && <img className="source-visual-image reader-visual-image" src={allVisualAssets[activeGroup.visualPage]} alt={`Original ${activeGroup.contextType} for ${activeGroup.rangeLabel}, source folio ${activeGroup.visualPage}`} />}
                    <div className="group-context-foot"><span>Source pages {activeGroup?.sourcePages[0]}–{activeGroup?.sourcePages[1]}</span><span>{activeGroup?.questions.length} linked questions</span></div>
                  </div>
                  <div className="group-questions">
                    {activeGroup?.questions.map((question) => <article className="question-card" key={question.number}>
                      <div className="question-number">{String(question.number).padStart(3, "0")}</div>
                      <div><div className="eyebrow">QUESTION {question.number}</div><pre>{question.text}</pre></div>
                      <button className="question-bookmark" onClick={() => toggleBookmark(question.number)} aria-label={`Bookmark question ${question.number}`}><Bookmark size={16} fill={bookmarked.includes(question.number) ? "currentColor" : "none"} /></button>
                    </article>)}
                  </div>
                </div>
                <div className="reader-topline folio-reader-line">
                  <div className="eyebrow"><FileText size={14} /> SOURCE PAGE READER</div>
                  <div className="reader-nav"><button onClick={() => goToPage(activePage - 1)} disabled={activePage <= 6} aria-label="Previous page"><ArrowLeft size={16} /></button><span>Page {activePage} / 683</span><button onClick={() => goToPage(activePage + 1)} disabled={activePage >= 683} aria-label="Next page"><ArrowRight size={16} /></button></div>
                </div>
                <div className="reader-content">
                  <div className="reader-meta"><span className="reader-page-number">{String(activePage).padStart(3, "0")}</span><div><h2>{currentPage?.title || currentPage?.section}</h2><p>{currentPage?.section} · Source page {activePage} · {currentPage?.wordCount} words</p></div><div className="reader-badges"><span className={`kind-pill ${currentPage?.kind}`}>{currentPage?.hasVisual && <Table2 size={13} />}{currentPage?.kind === "visual" ? "Visual included" : currentPage?.kind === "question" ? "Practice question" : currentPage?.kind === "explanation" ? "Answer explanation" : "Source text"}</span></div></div>
                  <div className="reader-paper"><div className="paper-margin">{currentPage?.hasVisual ? <><Table2 size={16} /><span>VISUAL PAGE</span></> : <><BookOpen size={16} /><span>FOLIO {activePage}</span></>}</div><pre>{currentPage?.content}</pre></div>
                </div>
              </section>
            </>
          )}
        </div>
        <footer className="site-footer"><span>Bale Parvaaz GED</span><span>Built around the book, not around the noise.</span><span>Teacher Momeni · {formatNumber(pages.length)} converted pages</span></footer>
      </main>
    </div>
  );
}

function MapIcon() { return <span className="map-icon"><span /><span /><span /></span>; }

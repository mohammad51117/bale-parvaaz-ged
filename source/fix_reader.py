from pathlib import Path
path = Path('/home/ubuntu/bale-parvaaz-ged/client/src/pages/Home.tsx')
text = path.read_text()
start = text.index('              <section className="reader-panel" id="question-reader">')
end = text.index('            </>\n          )}', start)
replacement = '''              <section className="reader-panel" id="question-reader">
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
                    <pre>{activeGroup?.context || "Visual source material accompanies this question set on the source folio. Keep this context in view as you work through the linked questions."}</pre>
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
'''
path.write_text(text[:start] + replacement + text[end:])
print('reader section repaired')

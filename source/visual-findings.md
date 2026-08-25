# Visual inspection findings

The first render of folio 209 showed a Science chapter-introduction page and did not contain the figure for Questions 506–507. The correct source is folio 210.

Folio 210 contains the printed heading “Questions 506 and 507 are based on the following figure.” The figure is a force diagram for an airplane, with arrows labeled Lift upward, Weight downward, Drag leftward, and Thrust rightward. Questions 506 and 507 appear directly below the figure on the same source folio. The exact source render is stored at `/home/ubuntu/webdev-static-assets/ged-figures/folio-210.png` and uploaded for the web app at `/manus-storage/folio-210_76c26582.png`.

Implementation requirement: Questions 506–507 must display this actual folio image as their shared visual context, with the extracted question text shown separately below it. The source PDF iframe should not be the only visual fallback for this group.

## Verification update

The grouped dataset now records `visualPage: 210` for Questions 506–507, and the mapped uploaded asset is `/manus-storage/folio-210_76c26582.png` (the generated visual map uses the corrected v2 upload path). The reader renders the actual source folio image above the linked Questions 506 and 507 cards, while the placeholder sentence is suppressed for visual-only contexts. A shareable query form `/?group=group-506-507` was added for direct verification.

## Final verification

The latest grouped-reader screenshot for `/?group=group-506-507` confirms the question set is linked directly to the corrected actual visual folio asset. The dataset records `visualPage: 210`, the asset map contains the folio-210 upload, and the placeholder sentence is no longer rendered for that visual group.

## Subject route verification

The corrected chapter order maps the science practice pages to Science. Questions 508 and 509 appear as explicit standalone records in Science, each with clean source text and no accidental inclusion of the following Questions 510–512 context. `/subject/social-studies` renders a dedicated searchable question-set library, and `/reader/group-standalone-508` plus `/reader/group-standalone-509` render focused standalone readers. Desktop and mobile screenshots confirm the dedicated layouts are responsive and professional.

## Stacked source-context layout verification

The question reader now uses a single vertical column: extracted shared context appears first, and the actual source folio visual appears directly below at full available width. Desktop and mobile captures of Questions 506–507 show the airplane figure below its marker with the question area no longer narrowed by a side-by-side grid. Question 508 retains the same wider reading composition.

## Question labeling verification

The subject index now displays the full source reference, for example “1,001 GED Practice Questions For Dummies · Social Studies library,” and each set shows a subject-to-part label such as “Social Studies → Civics and Government.” Focused readers show the same hierarchy in the breadcrumb and context panel, with Science → Physical Science visible for Questions 506–507. Desktop and mobile captures confirm the labels remain legible and the part filter is usable.

## Grouped subject-library verification

Subject libraries now render visible part sections instead of one flat list. Social Studies opens with a labeled “Civics and Government” section showing its set and question count, followed by the other parts in book-aligned order. Science similarly begins with “Physical Science.” The part filter and search remain available above the sections, and desktop/mobile captures confirm the section headers remain readable.

## Source and question-card visual refinement

The shared-context block now uses a premium folio header with a labeled “SHARED SOURCE CONTEXT · figure/information/standalone” treatment, a clean subject-to-part badge, and a framed source visual beneath. Question cards no longer have the heavy rectangular outer edge; they use quiet printed rules instead. The question number remains in its existing position, with the save icon immediately beside it. Desktop and mobile captures of Questions 506–507 and 508 confirm the intended hierarchy.

## Full-width question content verification

The question number and bookmark remain together in the compact header, while the prompt, choices, fill-in field, and feedback now begin below the header at the full available width. Desktop and mobile captures of Questions 506–507 and 508 confirm that the former empty column beneath the number has been removed.

## Classroom readability verification

Answer choices now use larger, heavier type with taller choice boxes and larger answer letters. The shared-source header, subject-part label, context marker, and extracted context copy have also been enlarged and darkened for projection readability. Desktop and mobile captures of the figure set and Question 508 confirm the typography is more legible while the responsive layout remains intact.

## New Social Studies Economics source audit

SocialStudiesEconomicsQuestion1.pdf is a 19-page scanned/image PDF with no usable text layer. Page 1 introduces Chapter 3, Economics, and Question 1; it also declares Questions 2–4 as based on a following illustration. Page 2 contains the four-worker illustration (Donna, Julian, Gerald, Marina) and three written-response questions. The source must be integrated using OCR/manual transcription plus the original page images for fidelity. DummiesGEDSocialStudies.pdf is a 421-page text-extractable Social Studies workbook with Economics references and answer/explanation material.

## Social Studies Economics supplement verification

The scanned 19-page Economics workbook has been added as a distinct supplemental source under Social Studies → Economics, preserving its original Questions 1–49 numbering without overwriting the main 1,001-question library. The subject library now includes the added sets. Desktop and mobile captures verify the standalone worker illustration for Questions 2–4 and the pie-chart source visual for Questions 5–7, with the source marker above the image and the reader inside the Bale Parvaaz shell.

## Workbook attribution verification

The Social Studies library now shows per-set workbook titles and source-page ranges. Supplemental readers display “Social Studies Economics Question 1,” use “source page” labels, and identify “Social Studies Economics workbook.” Main-book readers display “1001 GED Practice Questions For Dummies by Stuart Donnelly,” use “source folio” labels, and identify the main workbook. Desktop verification passed for the subject library and representative readers.

Mobile verification also passed at 390×844: the Social Studies library keeps its workbook-source note readable, and the Economics reader wraps the supplemental workbook title and “source page 1–1” label cleanly without horizontal overflow.

## Workbook filter verification

The new workbook selector renders in both the Home study desk and subject libraries. Shareable URLs with `?workbook=economics` and `?workbook=main` correctly initialize the selected source. Social Studies shows 22 supplemental Economics sets / 49 linked questions in supplement mode and 110 main-book sets / 221 linked questions in main-book mode. The selector remains visually aligned with the subject search and part filter at desktop width.

Final desktop pass confirms concise selector labels: “Economics supplement · 22 sets” shows only Social Studies → Economics, while “Main 1,001-question book · 110 sets” shows the main Social Studies parts and their question counts. Both states keep the source attribution line and part filter aligned.

## McGraw Hill workbook import audit

The supplied McGraw-Hill Education Social Studies Workbook for the GED Test is 262 PDF pages. The imported exercise set contains 380 numbered items across a 40-question pretest, four 75-question subject chapters, and a 40-question posttest, organized into 226 grouped readers. The parser found 319 four-choice multiple-choice items and 61 written-response/drag-and-drop items, with 114 unique source pages rendered and uploaded for 121 visual-context candidates. The source answer key covers every item except two pretest drag-and-drop items whose source entries are blank (Pretest Questions 17 and 23); those remain interactive as written-response items with source context preserved rather than fabricated answers.

The rendered McGraw Hill folio 40 preserves the chapter heading, Locke quotation, and visible Questions 1–2 with readable source typography at 816×1056px. The same page is available to the new grouped reader under the McGraw Hill source-page convention.

McGraw Hill verification passed on desktop and mobile. The Social Studies library shows 226 sets and 380 linked questions when `workbook=mcgraw` is selected. The grouped reader for Civics and Government Questions 1–2 shows the Locke passage, original rendered source folio 40, “source page 40–40” attribution, and the full interactive A–D choices beneath the visual context. The selector and source labels remain readable at 390px width.

## Home question total correction

The Home desk now calculates the visible question-bank total from grouped records rather than the original 1,001-only label. The default All sources total is 1,429 questions: 1,000 main-book interactive records, 49 Economics-supplement questions, and 380 McGraw Hill workbook questions. The same dynamic number appears in the hero reference, Question Bank statistic, and filtered result summary.

## Teacher Momeni logo verification

The generated portrait-based Teacher Momeni logo is applied to the Home rail, SubjectPage header, QuestionReader header, browser favicon, and Apple touch icon metadata. Desktop and mobile screenshots show the mark remains recognizable and proportionate beside the Bale Parvaaz wordmark without crowding navigation. The rendered logo uses a simplified professional portrait inside the existing ink-blue and saffron brand language.

## Streamlined Home section dashboard verification

The Home question-set browser and Home reader panel are hidden from the landing desk, leaving detailed question browsing on subject routes. The Home rail now shows the all-workbook question totals: Math Reasoning 285, Language Arts 269, Social Studies 650, and Science 225. Desktop and mobile screenshots confirm the compact layout, with the hero and stats remaining visible without the long question list.

Final Home verification passed on desktop and mobile. The old Home question-set browser and reader no longer render on the landing desk, so the page ends after the hero, progress stats, four-section dashboard, and footer. The dashboard and rail show all-workbook question totals: Math Reasoning 285, Language Arts 269, Social Studies 650, and Science 225. Each section card links to its dedicated subject library.

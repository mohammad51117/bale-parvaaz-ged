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

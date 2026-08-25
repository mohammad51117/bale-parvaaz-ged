# Workbook source attribution

## Workbook-level filters

- [x] Inspect workbook registry and current Home/SubjectPage dataset composition.
- [x] Add main-book and supplemental-workbook filters to the study desk and subject libraries.
- [x] Add responsive styling, counts, persistence, and clear empty states for filtered results.
- [x] Verify main-book-only and supplemental-only browsing on desktop and mobile.
- [x] Run type check, production build, and save a checkpoint.

- [x] Define stable metadata for each workbook and its source-page numbering.
- [x] Attach workbook IDs, titles, and source-page ranges to all question groups and records.
- [x] Show workbook attribution in subject-library cards and section headings.
- [x] Show workbook title and exact source pages in standalone readers.
- [x] Keep the original 1,001-question book distinct from the supplemental Economics workbook.
- [x] Verify attribution on representative main-book and supplemental readers, desktop and mobile.
- [x] Run type check, production build, screenshots, and checkpoint the source-label update.

## McGraw Hill Social Studies workbook

- [x] Inspect the supplied PDF page count, text layer, question numbering, and answer-key structure.
- [x] Extract question groups, prompts, choices, written-response items, answer keys, and explanations.
- [x] Preserve relevant workbook visuals and upload them as webdev assets.
- [x] Add the workbook to the source registry, question groups, interactive questions, and filter options.
- [x] Verify the new Social Studies workbook library and representative readers on desktop and mobile.
- [x] Run type check, production build, and save a checkpoint.

## Home question totals correction

- [x] Audit Home statistics and calculate the total imported question count by workbook.
- [x] Replace static Home question totals with dynamic source-aware values.
- [x] Verify All sources, main-book, Economics supplement, and McGraw Hill states on desktop and mobile.
- [x] Run type check, production build, and save a checkpoint.

## Teacher Momeni app logo

- [x] Define the portrait-based logo treatment and required app icon sizes.
- [x] Generate a polished logo asset from the supplied portrait.
- [x] Apply the logo to the app shell, browser metadata, and favicon.
- [x] Verify the logo at desktop and mobile header sizes.
- [x] Run type check, production build, and save a checkpoint.

## Streamlined Home section dashboard

- [x] Audit the Home question-set list and calculate section totals across all imported workbooks.
- [x] Remove the long question-set list from Home while preserving subject-page navigation.
- [x] Replace static rail counts with dynamic all-workbook question totals for the four GED sections.
- [x] Verify the shortened Home layout and counts on desktop and mobile.
- [x] Run type check, production build, and save a checkpoint.

## Student Study Map roadmap

- [x] Review the supplied course titles and define subject/chapter/lesson roadmap structure.
- [x] Generate structured study guidance for every supplied title: time, method, mastery, and practice.
- [x] Add a Study Map route under the Study Desk with subject and chapter navigation.
- [x] Design attractive roadmap cards and detail panels for desktop and mobile students.
- [x] Verify all subject titles are covered and the roadmap remains usable on narrow screens.
- [x] Run type check, production build, and save a checkpoint.

## Title-based lesson pathway

- [x] Audit the existing Study Map titles and lesson IDs.
- [x] Generate lesson explanations and lesson-specific practice directly from the titles.
- [x] Add lesson reader routes with study, mastery, and practice steps.
- [x] Add saved completion states and subject/chapter progress.
- [x] Verify the four-section entry, lesson flow, and responsive presentation.
- [x] Run type check, production build, and save a checkpoint.

Source constraint: do not use the PDF in the user’s local folder for lesson content.

## Source-grounded McGraw Hill lesson pathway

- [x] Inspect the uploaded McGraw Hill 4th-edition PDF and align its lesson sections with the Study Map titles.
- [x] Extract source-grounded lesson explanations, worked examples, practice questions, answer keys, and source-page labels.
- [x] Bundle extracted lesson data and any needed visuals into durable app content/assets.
- [x] Connect the lesson reader and completion flow to the extracted source content.
- [x] Verify the published app does not reference the user’s local Windows folder.
- [x] Run type check, production build, and save a checkpoint.

Source requirement: the uploaded McGraw Hill PDF is authoritative; local-folder access must not be required after publication.

## Complete McGraw Hill lesson pages

- [x] Map each Study Map lesson to its complete McGraw Hill source-page range.
- [x] Render and bundle all lesson source pages as durable app assets.
- [x] Replace shortened lesson excerpts with full page-sequence source viewing.
- [x] Keep lesson practice and completion controls below the complete source content.
- [x] Verify page order, attribution, full content coverage, and classroom readability.
- [x] Run type check, production build, and save a checkpoint.

## McGraw Hill PDF viewer repair

- [x] Diagnose why the embedded PDF folio is not loading in the lesson reader.
- [x] Add a client-side PDF rendering dependency and worker configuration.
- [x] Replace the iframe with an in-app canvas page renderer and fallback state.
- [x] Verify source folios load and remain readable on desktop and mobile.
- [x] Run type check, production build, and save a checkpoint.

## Lesson source-page pipeline consistency

- [x] Compare the working question visual pipeline with the lesson viewer.
- [x] Render and upload the lesson source-page images.
- [x] Replace the lesson PDF.js viewer with durable source-page images.
- [x] Remove the inconsistent lesson PDF dependency and verify page navigation.
- [x] Run type check, production build, and save a checkpoint.

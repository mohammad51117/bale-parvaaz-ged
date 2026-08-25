# Social Studies question import

- [x] Inspect the provided PDF pages and determine question/answer coverage.
- [x] Extract all Social Studies questions, choices, correct answers, and explanations.
- [x] Normalize the extracted content into the project’s question-group and interactive-question formats.
- [x] Add the new Social Studies source and question data without changing backend code.
- [x] Verify counts, navigation, answer checking, and responsive presentation.
- [x] Save a checkpoint so the published project includes the update.

## Kaplan Social Studies import

- [x] Inspect the Kaplan PDF page count, scan quality, and question/answer sections.
- [x] Extract and verify all Kaplan prompts, choices, answer keys, and explanations.
- [x] Prepare any required source-page visuals outside the project and upload them.
- [x] Add Kaplan question groups, interactive records, source registry entries, and reader visuals.
- [x] Verify source counts, navigation, answer checking, and responsive presentation.
- [x] Save a checkpoint so the published Kaplan update is live.

## Kaplan Social Studies pretest import

- [x] Inspect the pretest PDF page count, scan quality, and question/answer sections.
- [x] Extract and verify all pretest prompts, choices, answer keys, and explanations.
- [x] Prepare any required pretest source-page visuals outside the project and upload them.
- [x] Add pretest question groups, interactive records, source registry entries, and reader visuals.
- [x] Verify source counts, navigation, answer checking, and responsive presentation.
- [x] Save a checkpoint so the published pretest update is live.

## Princeton Social Studies Test 2 import

- [x] Inspect the Princeton PDF page count, scan quality, and question/answer sections.
- [x] Extract and verify all Princeton prompts, choices, answer keys, and explanations.
- [x] Prepare any required Princeton source-page visuals outside the project and upload them.
- [x] Add Princeton question groups, interactive records, source registry entries, and reader visuals.
- [x] Verify source counts, navigation, answer checking, and responsive presentation.
- [x] Save a checkpoint so the published Princeton update is live.

## Restore original subject and reader layout

- [x] Inspect the current logo references and route-shell markup.
- [x] Restore the original photo-based Bale Parvaaz logo on the affected routes.
- [x] Remove the route sidebar from the Subject Index and reader pages.
- [x] Move reader margin notes below or outside the source/PDF layout so the source page keeps its width.
- [x] Verify subject index and reader desktop/mobile layouts and navigation.
- [x] Save a checkpoint so the restored interface is live.

## Portrait logo restoration

- [x] Inspect current route branding and existing logo references.
- [x] Prepare the supplied portrait as a polished logo asset.
- [x] Apply the portrait logo consistently to the study desk, subject index, and reader.
- [x] Verify crop, contrast, legibility, and responsive behavior.
- [x] Save a checkpoint so the logo update is live.

## Remove unwanted logo mark

- [x] Inspect the portrait logo treatment and identify the unwanted cross-like mark.
- [x] Create a clean portrait-only logo asset with no decorative cross or accent.
- [x] Replace the shared logo reference and verify all route placements.
- [x] Check desktop and mobile logo rendering.
- [x] Save a checkpoint so the corrected logo is live.

## Preview startup recovery

- [x] Inspect current development-server and browser error status.
- [x] Resolve any startup, import, or stale-service issue.
- [x] Restart the development service if needed.
- [x] Verify the preview loads and the main routes render.
- [x] Report the confirmed preview status and any remaining limitation.

## Logo sidebar toggle

- [x] Inspect the study-desk sidebar state and logo markup.
- [x] Make the logo a keyboard-accessible sidebar toggle.
- [x] Add collapsed-state styling and a way to reopen the sidebar.
- [x] Verify expanded and collapsed desktop/mobile behavior.
- [x] Save a checkpoint so the toggle is live.

## Universal Social Studies PDF folios

- [x] Audit every imported Social Studies question group for source-page metadata and existing visual coverage.
- [x] Locate the original PDFs and identify the correct PDF page span for each text-only question group.
- [x] Render and upload missing original source-page images outside the project directory.
- [x] Add universal source-page references to all Social Studies question groups and source registries.
- [x] Update the question reader so every group displays its original source folio when available.
- [x] Verify text-only, table/map, and multi-page groups on desktop and mobile.
- [x] Save a checkpoint so the complete source-page coverage is live.

## Supabase persistence migration

- [x] Inspect Supabase project `rmglelcdiumvwpiurtjj` and confirm current tables and migrations.
- [x] Upgrade the static site to the full-stack database-enabled template.
- [x] Design and apply Supabase tables for books, workbook sources, groups, questions, source pages, and branding assets.
- [x] Migrate all existing static study-library records into Supabase without losing answer keys or source metadata.
- [x] Wire the frontend to persistent backend reads with a safe fallback during migration.
- [x] Verify database counts, representative reader routes, and asset URLs.
- [x] Save a checkpoint so the Supabase-backed version is live.

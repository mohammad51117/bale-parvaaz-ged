# Bale Parvaaz GED — Bolt Reproduction Brief

## Purpose

Reproduce the existing Bale Parvaaz GED study application as a calm, editorial, page-faithful GED practice desk. Preserve the existing question content and source-page provenance. Do not invent questions, answers, ratings, reviews, testimonials, or replacement workbook content.

## Visual direction: Atlas Study Hall

The visual language is a warm contemporary reading room influenced by archival atlas books and independent magazines. Use parchment rather than pure white, ink blue for navigation and headings, Parvaaz Saffron `#E5A23A` for active actions and progress, muted green for correct answers, and muted terracotta for incorrect answers.

Use Fraunces for display titles and chapter labels. Use DM Sans for controls, metadata, question copy, and body text. Desktop H1 is approximately 52–64px with tight leading; section headings are 28–36px; body copy is 16px with generous line height; metadata is 11–12px, uppercase, and letter-spaced.

The main layout has a persistent dark ink-blue left rail that feels like a book spine. The rail contains the Bale Parvaaz GED wordmark, Teacher Momeni identity, Study desk navigation, Opening pages navigation, and four subject links with counts: Mathematical Reasoning, Language Arts, Social Studies, and Science. On mobile, replace the rail with a compact top bar.

The main canvas is an asymmetric parchment reading surface. The home page has a breadcrumb at the top, a large hero headline reading “Pick up where your pencil left off.”, supporting copy “One question closer to test day.”, a saffron Continue reading button, a View the opening link, and a warm study-desk image on the right with the caption “Page-faithful practice, made navigable.”

Below the hero, show three editorial summary panels: Book conversion with page progress, Bookmarked with saved-page count, and Question bank with total question count. Below that, show the four subject cards. Use thin ink-like rules, subtle paper grain, restrained shadows, small uppercase margin-note labels, folio progress lines, and short transitions under 240ms. Respect reduced-motion preferences.

## Application screens and behavior

The Study desk home screen resumes the learner at the last visited source page. Continue reading opens the page reader at the saved folio. View the opening opens a clearly labeled preserved opening section containing the first five source-page images.

The opening section displays the first five pages as a page-by-page visual gallery. These pages must remain separate from the converted question stream. Each image needs a loading state, an alt description, an error state, and a retry or fallback message.

The page reader displays page number, section, topic, source workbook, source-page label, word count, page title, page text, and any source visual. It includes previous and next page controls, a folio progress line, and a source-page image when the page has a diagram, chart, map, table, or other visual. Keep the source image beside or above the extracted text so visual meaning is not lost.

The practice area groups related questions beneath their original source context. Show the source workbook and page provenance visibly. Each question displays its number, reference or topic metadata, prompt, answer choices, bookmark control, and answer feedback. Selecting an option gives immediate visual feedback. A Check answer action reveals correct/incorrect state and explanation. A Reset answer action clears the response. Fill-in-the-blank questions use an input or textarea with the same feedback treatment.

Correct answers use muted green accents and an explanation panel. Incorrect answers use muted terracotta accents and an explanation panel. Answer states must be keyboard accessible and must not depend on color alone. Bookmarks persist per user or locally when authentication is unavailable.

The library supports search, subject filtering, page-type filtering, and workbook filtering. Filters remain visible and reversible. Preserve the learner’s current page while filtering. The workbook selector must include All workbooks, the main book, Economics, McGraw Hill, Battery, Kaplan, Kaplan Pretest, and Princeton.

## Existing content that must be preserved

The repository already contains structured page data and question modules. Bolt should reuse those modules and the existing Supabase rows rather than regenerate or summarize them. The current app represents approximately 683 converted pages and a question bank of approximately 1,582 questions across the main book and supplemental sources. The main source is a 1,001-question book conversion; the displayed total also includes supplemental workbooks and practice tests.

The exact current workbook catalog is:

| Key | Exact title | Supabase source ID | Media needed |
|---|---|---|---|
| main | 1001 GED Practice Questions For Dummies by Stuart Donnelly | `main-1001` | Main book source pages, including the five opening pages and visual folios |
| economics | Social Studies Economics Question 1 | `social-studies-economics` | Scanned Economics workbook pages and visual pages |
| mcgraw | McGraw-Hill Education Social Studies Workbook for the GED Test | `mcgraw-social-studies` | McGraw-Hill workbook pages and visual pages |
| battery | Battery Social Studies Practice Test 2 | `battery-social-studies-2` | PDF or exported page images for Practice Test 2 |
| kaplan | Kaplan Social Studies Practice Test | `kaplan-social-studies` | PDF or exported page images for Kaplan Practice Test |
| kaplan-pretest | Kaplan Social Studies Pretest | `kaplan-social-studies-pretest` | PDF or exported page images for Kaplan Pretest |
| princeton | Princeton Social Studies Test 2 | `princeton-social-studies-test-2` | PDF or exported page images for Princeton Test 2 |

The Princeton workbook exists in the current frontend workbook catalog and should be included even if its source row is not yet present in the connected Supabase table. Add its source row before importing Princeton assets.

## Supabase data model

The current frontend reads these REST tables using `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`: `ged_books`, `ged_workbook_sources`, `ged_question_groups`, `ged_questions`, `ged_assets`, and `ged_branding`.

The `ged_assets` table currently stores metadata such as `asset_type`, `source_id`, `page_number`, `url`, and `alt_text`. The current URLs point to `/manus-storage/...`, which only works in the original Manus environment. Bolt cannot serve those paths.

Create a Supabase Storage bucket named `ged-assets` and upload the media using stable paths such as `main/opening/page-01.jpg`, `main/folios/folio-010.jpg`, `economics/page-001.jpg`, `mcgraw/page-001.jpg`, `battery/page-001.jpg`, `kaplan/page-001.jpg`, `kaplan-pretest/page-001.jpg`, and `princeton/page-001.jpg`. Make the bucket public only if the source material is legally permitted to be public; otherwise use signed URLs through a server-side endpoint.

After upload, replace every `/manus-storage/...` value in `ged_assets.url` with the matching Supabase Storage URL. Also replace the hardcoded opening-page and hero-image references in `client/src/pages/Home.tsx` with Supabase-backed URLs or a centralized asset resolver. Add image `onError` handling and a visible missing-asset state instead of showing broken images.

## Upload checklist

Upload the following original source files or page-image sets to Supabase Storage:

1. The complete **1001 GED Practice Questions For Dummies by Stuart Donnelly** source book, including its first five opening pages and every page containing a diagram, map, table, chart, or visual.
2. The complete **Social Studies Economics workbook** scan, including all pages referenced by its question groups and all visual pages.
3. The complete **McGraw-Hill Education Social Studies Workbook for the GED Test** scan, including all referenced pages and visual pages.
4. **Battery Social Studies Practice Test 2**, preferably the original PDF plus rendered page images if the app displays individual pages.
5. **Kaplan Social Studies Practice Test**, preferably the original PDF plus rendered page images.
6. **Kaplan Social Studies Pretest**, preferably the original PDF plus rendered page images.
7. **Princeton Social Studies Test 2**, preferably the original PDF plus rendered page images.
8. The app’s hero image and any brand/logo image used by the home page.

If the app should display only individual pages, upload page images as JPG or WebP and store their public or signed URLs in `ged_assets`. Keep original PDFs as archival files in a separate folder such as `original-pdfs/`; do not make the browser depend on a PDF path if the reader is designed around page images.

## Acceptance checks

The Bolt version is ready when the home page loads without broken images, the five opening pages render, the page reader can move between folios, every workbook filter returns its corresponding questions, source visuals load beside their context, answer checking and reset work, and the browser console shows no 404 responses for `/manus-storage/` paths. Verify that every `ged_assets.url` points either to Supabase Storage or to an approved signed-URL endpoint.

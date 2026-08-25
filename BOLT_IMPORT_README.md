# Bale Parvaaz GED — Bolt Import Guide

This archive contains the Bale Parvaaz GED study app source code and the Supabase migration assets needed to run it in Bolt. It does not contain private Supabase credentials.

## Import

Import the ZIP into Bolt or open the included repository source. If Bolt asks for a framework, use the existing React + Vite + Express configuration. Keep the `main` branch and allow Bolt to install dependencies from `package.json`.

## Environment variables

Add these browser-safe variables in Bolt’s Environment Variables or Secrets panel:

```env
VITE_SUPABASE_URL=https://rmglelcdiumvwpiurtjj.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<your Supabase publishable or legacy anon key>
```

The URL is the project origin only; do not append `/rest/v1/`. Never place a private Supabase Secret or legacy service-role key in a `VITE_` variable or frontend source.

## Supabase content

The project’s public `ged-assets` bucket contains the uploaded logo, source PDFs, opening-page images, and migrated source-page images. The app expects these public paths:

- `branding/bale-parvaaz-logo.png`
- `books/*.pdf`
- `pages/main/opening/page-01.jpg` through `page-05.jpg`
- `pages/main/*.jpg`
- `pages/economics/*.jpg`
- `pages/mcgraw/*.jpg`
- `pages/battery/*.jpg`
- `pages/kaplan/*.jpg`
- `pages/kaplan-pretest/*.jpg`
- `pages/princeton/*.jpg`

The Supabase database must contain the GED tables and rows used by `client/src/lib/persistentLibrary.ts`: `ged_books`, `ged_workbook_sources`, `ged_question_groups`, `ged_questions`, `ged_assets`, and `ged_branding`. The migration SQL is in `source/supabase_ged_library_migration.sql`.

## Start and verify

Run the project with the existing scripts:

```bash
pnpm install
pnpm check
pnpm test
pnpm dev
```

Verify the Home dashboard, Opening pages, a standard question reader, and a McGraw-Hill visual question. The image URLs should resolve to `https://rmglelcdiumvwpiurtjj.supabase.co/storage/v1/object/public/ged-assets/...` rather than `/manus-storage/...`.

## Included implementation changes

The archive includes a Supabase public-asset resolver, Supabase-backed branding, Supabase-aware opening-page and hero image paths, persistent source-page URL precedence, and a Storage credential validation test. The original editorial appearance and question-bank content remain intact.

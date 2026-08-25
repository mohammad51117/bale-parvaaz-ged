# Bale Parvaaz GED — Design Direction

## Three directions considered

### Theme Name: Atlas Study Hall
Very Brief Intro: A warm editorial study room that combines paper texture, ink-blue navigation, and saffron progress markers. It makes a large book feel navigable, calm, and human.
Probability: 0.07

### Theme Name: Signal Sprint
Very Brief Intro: A kinetic exam-prep console with sharp data panels, high-contrast progress signals, and brisk motion. It treats practice as a focused training loop.
Probability: 0.03

### Theme Name: Library Night
Very Brief Intro: A quiet dark-mode reading environment with brass accents, deep navy surfaces, and literary pacing. It prioritizes long-session comfort and concentration.
Probability: 0.08

## Chosen approach: Atlas Study Hall

### Design Movement
Contemporary editorialism: a digital reading room influenced by independent magazines, archival atlas books, and modern learning tools.

### Core Principles
1. **Orient before engaging.** Every screen should tell the learner where they are in the book, subject, chapter, and page sequence.
2. **Make study feel tactile.** Use warm paper surfaces, ink-like dividers, subtle grain, and restrained shadows instead of sterile cards.
3. **Turn content into momentum.** Progress, streaks, recent activity, and next actions should be visible without overpowering the questions.
4. **Respect the source.** Text, tables, diagrams, and maps must remain legible and traceable to their original page context.

### Color Philosophy
The foundation is parchment, not white: a warm reading surface that lowers glare and makes the app feel like a trusted workbook. Ink blue is the organizing color for navigation and headings; it communicates confidence and structure. Saffron is reserved for action and progress, giving the learner a small, optimistic spark. A muted green marks correct answers and completion without turning the interface into a gamified arcade.

### Layout Paradigm
A persistent left rail behaves like a book spine: it holds the atlas mark, subject navigation, and progress. The main canvas is asymmetric, with a wide reading column and a narrow context column for page metadata, notes, and next actions. On mobile, the spine becomes a compact top bar and the context column becomes a bottom drawer.

### Signature Elements
- A **book-spine rail** with vertical chapter rhythm and active saffron marker.
- **Margin notes** styled as small ink annotations for page provenance, question type, and study tips.
- A **folio progress line** that runs through question navigation like a printed page rule.

### Interaction Philosophy
Interactions should feel like turning pages or placing a bookmark: immediate, tactile, and low drama. Selecting an answer gives fast feedback; revealing an explanation feels like unfolding a margin note. Search and filters stay visible and reversible so learners never lose their place.

### Animation
Use short, confident transitions under 240ms. Rail items slide by a few pixels on hover, page changes crossfade with a subtle horizontal folio shift, and answer feedback expands from the selected option rather than popping from nowhere. Respect reduced-motion preferences and keep keyboard shortcuts instant.

### Typography System
Use **Fraunces** for display titles and chapter labels, with **DM Sans** for interface text, question copy, metadata, and controls. H1 is 52–64px on desktop with tight leading; section headings are 28–36px; body copy is 16px/1.55; labels and metadata are 11–12px in uppercase with tracking. Math and quoted passages should use a slightly wider measure and generous line-height.

### Brand Essence
A page-by-page GED practice companion for learners who want a calmer, clearer path through a demanding book — structured, warm, and focused. Personality: **steady, encouraging, exacting**.

### Brand Voice
Headlines sound like a confident tutor: direct, warm, and specific. CTAs invite the next useful action rather than shouting. Microcopy names the learner’s context and never uses empty filler.

Example lines:
- “Pick up where your pencil left off.”
- “One question closer to test day.”

### Wordmark & Logo
The mark is a bold, text-free symbol: an open book whose center fold becomes a rising wing, expressing both study and parvaaz (flight). It should work as a small saffron-and-ink icon in the rail and favicon, with the wordmark set separately in Fraunces.

### Signature Brand Color
**Parvaaz Saffron — #E5A23A**, used sparingly for active folios, progress, and decisive actions.

## Implementation reminders

- Keep the first five source pages available as a clearly labeled preserved opening section; do not silently merge them into the converted question stream.
- Convert pages 6 onward into structured page records so the learner can browse by source page, subject, chapter, and question.
- Preserve original page text and add semantic structure around it; do not invent answer content or testimonials.
- For visually dense pages, use source-page image previews alongside extracted text so diagrams, maps, charts, and tables remain faithful.

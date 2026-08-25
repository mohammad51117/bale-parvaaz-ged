import { writeFile } from 'node:fs/promises';

const [{ bookData }, { questionGroups }, { interactiveQuestions }, { workbookSources }, { brandLogoUrl, brandLogoAlt },   { supplementalEconomicsGroups: economicsGroups, supplementalEconomicsQuestions: economicsQuestions },
  { supplementalMcGrawHillGroups: mcgrawGroups, supplementalMcGrawHillQuestions: mcgrawQuestions },
  { supplementalBatterySocialStudiesGroups: batteryGroups, supplementalBatterySocialStudiesQuestions: batteryQuestions }, { supplementalKaplanSocialStudiesGroups: kaplanGroups, supplementalKaplanSocialStudiesQuestions: kaplanQuestions }, { supplementalKaplanSocialStudiesPretestGroups: kaplanPretestGroups, supplementalKaplanSocialStudiesPretestQuestions: kaplanPretestQuestions }, { supplementalPrincetonSocialStudiesTest2Groups: princetonGroups, supplementalPrincetonSocialStudiesTest2Questions: princetonQuestions }, { supplementalSocialStudiesSourcePages }, { visualAssets }] = await Promise.all([
  import('../client/src/lib/bookData.ts'),
  import('../client/src/lib/questionGroups.ts'),
  import('../client/src/lib/interactiveQuestions.ts'),
  import('../client/src/lib/workbookSources.ts'),
  import('../client/src/lib/branding.ts'),
  import('../client/src/lib/supplementalEconomics.ts'),
  import('../client/src/lib/supplementalMcGrawHill.ts'),
  import('../client/src/lib/supplementalBatterySocialStudies.ts'),
  import('../client/src/lib/supplementalKaplanSocialStudies.ts'),
  import('../client/src/lib/supplementalKaplanSocialStudiesPretest.ts'),
  import('../client/src/lib/supplementalPrincetonSocialStudiesTest2.ts'),
  import('../client/src/lib/supplementalSocialStudiesSourcePages.ts'),
  import('../client/src/lib/visualAssets.ts'),
]);

const pdfAssets = [
  { id: 'asset-book-battery-pdf', bookId: 'book-battery-social-studies-2', assetType: 'book_pdf', url: '/manus-storage/BatterySocialStudies(Test&Answers)_9e4978ff.pdf', altText: 'Battery Social Studies Practice Test 2 PDF' },
  { id: 'asset-book-kaplan-pdf', bookId: 'book-kaplan-social-studies', assetType: 'book_pdf', url: '/manus-storage/KaplanSocialStudies(PracticeTest&Answers)_72851475.pdf', altText: 'Kaplan Social Studies Practice Test PDF' },
  { id: 'asset-book-kaplan-pretest-pdf', bookId: 'book-kaplan-social-studies-pretest', assetType: 'book_pdf', url: '/manus-storage/KaplanSocialStudies(Pretest&Answers)_354bab77.pdf', altText: 'Kaplan Social Studies Pretest PDF' },
  { id: 'asset-book-princeton-pdf', bookId: 'book-princeton-social-studies-test-2', assetType: 'book_pdf', url: '/manus-storage/PrincetonSocialStudies(Test2&Answers)_c9d0cb4e.pdf', altText: 'Princeton Social Studies Test 2 PDF' },
  { id: 'asset-book-steck-vaughn-pdf', bookId: 'book-steck-vaughn-social-studies', assetType: 'book_pdf', url: '/manus-storage/Work_Book_Steck_vaughn_Social_Studies_Test_Prepartion_For_the_2014_e1b52cd3.pdf', altText: 'Steck-Vaughn Social Studies Test Preparation PDF' },
];

const sourceKeyForGroup = (id) => {
  if (id.startsWith('econ-supp-')) return 'economics';
  if (id.startsWith('mcgraw-')) return 'mcgraw';
  if (id.startsWith('battery-ss-')) return 'battery';
  if (id.startsWith('kaplan-pretest-ss-')) return 'kaplan-pretest';
  if (id.startsWith('kaplan-ss-')) return 'kaplan';
  if (id.startsWith('princeton-ss-')) return 'princeton';
  return 'main';
};

const bookIdForSource = (key) => ({
  main: 'book-main-1001',
  economics: 'book-social-studies-economics',
  mcgraw: 'book-mcgraw-social-studies',
  battery: 'book-battery-social-studies-2',
  kaplan: 'book-kaplan-social-studies',
  'kaplan-pretest': 'book-kaplan-social-studies-pretest',
  princeton: 'book-princeton-social-studies-test-2',
})[key];

const sqlString = (value) => `'${String(value ?? '').replaceAll('\\', '\\\\').replaceAll("'", "''")}'`;
const sqlJson = (value) => `convert_from(decode(${sqlString(Buffer.from(JSON.stringify(value ?? null), 'utf8').toString('base64'))}, 'base64'), 'UTF8')::jsonb`;
const sqlIntArray = (value) => `ARRAY[${(value ?? []).map(Number).filter(Number.isFinite).join(',')}]::integer[]`;
const rows = { books: [], sources: [], groups: [], questions: [], assets: [], branding: [] };

rows.books.push({ id: 'book-main-1001', title: bookData.title, edition: bookData.edition, sourcePages: bookData.sourcePages, metadata: { subjects: bookData.subjects, preservedOpeningPages: bookData.preservedOpeningPages, pageCount: bookData.pages.length } });
rows.books.push({ id: 'book-steck-vaughn-social-studies', title: 'Steck-Vaughn Social Studies Test Preparation', edition: '2014 workbook PDF', sourcePages: 199, metadata: { workbookKey: 'steck-vaughn', importedAs: 'book_asset' } });
for (const [key, source] of Object.entries(workbookSources)) {
  if (key !== 'main') rows.books.push({ id: bookIdForSource(key), title: source.title, edition: source.note, sourcePages: null, metadata: { workbookKey: key } });
  rows.sources.push({ id: source.id, bookId: bookIdForSource(key), title: source.title, shortTitle: source.shortTitle, pageLabel: source.pageLabel, note: source.note, metadata: { workbookKey: key } });
}

const mainQuestionsByGroup = new Map();
for (const question of interactiveQuestions.questions) {
  const list = mainQuestionsByGroup.get(question.groupId) ?? [];
  list.push(question);
  mainQuestionsByGroup.set(question.groupId, list);
}
const addGroups = (groups, questions) => {
  const questionMap = new Map(questions.map((question) => [`${question.groupId}:${question.number}`, question]));
  for (const group of groups) {
    const sourceKey = sourceKeyForGroup(group.id);
    rows.groups.push({ id: group.id, sourceId: workbookSources[sourceKey].id, section: group.section, topic: group.topic, questionStart: group.questionStart, questionEnd: group.questionEnd, rangeLabel: group.rangeLabel, contextType: group.contextType, marker: group.marker, context: group.context, sourcePages: group.sourcePages, visualPage: group.visualPage ?? null, metadata: {} });
    for (const preview of group.questions) {
      const question = questionMap.get(`${group.id}:${preview.number}`);
      if (!question) continue;
      rows.questions.push({ id: question.id ?? `${group.id}-${question.number}`, groupId: group.id, number: question.number, section: question.section, topic: question.topic, reference: question.reference, prompt: question.prompt, choices: question.choices ?? [], correctLabel: question.correctLabel, answerLine: question.answerLine, explanation: question.explanation, sourcePage: question.sourcePage ?? preview.sourcePage ?? group.sourcePages?.[0] ?? null, metadata: {} });
    }
  }
};
addGroups(questionGroups.groups, interactiveQuestions.questions);
addGroups(economicsGroups, economicsQuestions);
addGroups(mcgrawGroups, mcgrawQuestions);
addGroups(batteryGroups, batteryQuestions);
addGroups(kaplanGroups, kaplanQuestions);
addGroups(kaplanPretestGroups, kaplanPretestQuestions);
addGroups(princetonGroups, princetonQuestions);

for (const [page, url] of Object.entries(visualAssets)) rows.assets.push({ id: `asset-main-folio-${page}`, assetType: 'source_page', bookId: 'book-main-1001', sourceId: workbookSources.main.id, pageNumber: Number(page), url, altText: `Original main book source page ${page}` });
for (const [key, pages] of Object.entries(supplementalSocialStudiesSourcePages)) {
  const sourceId = workbookSources[key].id;
  for (const [page, url] of Object.entries(pages)) rows.assets.push({ id: `asset-${key}-pdf-page-${page}`, assetType: 'source_page', bookId: bookIdForSource(key), sourceId, pageNumber: Number(page), url, altText: `Original ${workbookSources[key].shortTitle} PDF page ${page}` });
}
rows.assets.push(...pdfAssets);
rows.branding.push({ key: 'logo_url', value: brandLogoUrl, metadata: { altText: brandLogoAlt, assetType: 'brand_logo' } });
rows.branding.push({ key: 'logo_alt', value: brandLogoAlt, metadata: { assetType: 'brand_logo' } });

const statements = [];
const upsert = (table, columns, values, conflict = 'id') => {
  if (!values.length) return;
  statements.push(`insert into public.${table} (${columns.join(', ')}) values\n${values.map((value) => `  (${value.join(', ')})`).join(',\n')}\non conflict (${conflict}) do update set ${columns.filter((column) => column !== conflict).map((column) => `${column} = excluded.${column}`).join(', ')};`);
};
upsert('ged_books', ['id', 'title', 'edition', 'source_pages', 'metadata'], rows.books.map((row) => [sqlString(row.id), sqlString(row.title), sqlString(row.edition), row.sourcePages == null ? 'null' : String(row.sourcePages), sqlJson(row.metadata)]));
upsert('ged_workbook_sources', ['id', 'book_id', 'title', 'short_title', 'page_label', 'note', 'metadata'], rows.sources.map((row) => [sqlString(row.id), sqlString(row.bookId), sqlString(row.title), sqlString(row.shortTitle), sqlString(row.pageLabel), sqlString(row.note), sqlJson(row.metadata)]));
upsert('ged_question_groups', ['id', 'source_id', 'section', 'topic', 'question_start', 'question_end', 'range_label', 'context_type', 'marker', 'context', 'source_pages', 'visual_page', 'metadata'], rows.groups.map((row) => [sqlString(row.id), sqlString(row.sourceId), sqlString(row.section), sqlString(row.topic), String(row.questionStart), String(row.questionEnd), sqlString(row.rangeLabel), sqlString(row.contextType), sqlString(row.marker), sqlString(row.context), sqlIntArray(row.sourcePages), row.visualPage == null ? 'null' : String(row.visualPage), sqlJson(row.metadata)]));
upsert('ged_questions', ['id', 'group_id', 'number', 'section', 'topic', 'reference', 'prompt', 'choices', 'correct_label', 'answer_line', 'explanation', 'source_page', 'metadata'], rows.questions.map((row) => [sqlString(row.id), sqlString(row.groupId), String(row.number), sqlString(row.section), sqlString(row.topic), sqlString(row.reference), sqlString(row.prompt), sqlJson(row.choices), sqlString(row.correctLabel), sqlString(row.answerLine), sqlString(row.explanation), row.sourcePage == null ? 'null' : String(row.sourcePage), sqlJson(row.metadata)]));
upsert('ged_assets', ['id', 'asset_type', 'book_id', 'source_id', 'page_number', 'url', 'alt_text', 'metadata'], rows.assets.map((row) => [sqlString(row.id), sqlString(row.assetType), row.bookId ? sqlString(row.bookId) : 'null', row.sourceId ? sqlString(row.sourceId) : 'null', row.pageNumber == null ? 'null' : String(row.pageNumber), sqlString(row.url), sqlString(row.altText), sqlJson(row.metadata)]));
upsert('ged_branding', ['key', 'value', 'metadata'], rows.branding.map((row) => [sqlString(row.key), sqlString(row.value), sqlJson(row.metadata)]), 'key');

const summary = Object.fromEntries(Object.entries(rows).map(([key, value]) => [key, value.length]));
statements.unshift(`-- Bale Parvaaz GED seed generated from the current verified study library.\n-- Counts: ${JSON.stringify(summary)}\nbegin;`);
statements.push('commit;');
await writeFile('/tmp/supabase_ged_seed.sql', statements.join('\n\n'));
await writeFile('/tmp/supabase_ged_seed_summary.json', JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary));

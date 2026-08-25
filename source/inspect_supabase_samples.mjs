const imports = await Promise.all([
  import('../client/src/lib/bookData.ts'),
  import('../client/src/lib/questionGroups.ts'),
  import('../client/src/lib/interactiveQuestions.ts'),
  import('../client/src/lib/supplementalBatterySocialStudies.ts'),
  import('../client/src/lib/supplementalSocialStudiesSourcePages.ts'),
  import('../client/src/lib/visualAssets.ts'),
]);
const [book, groups, questions, battery, sourcePages, assets] = imports;
console.log(JSON.stringify({
  book: { page: book.bookData.pages[0], opening: book.bookData.preservedOpeningPages?.[0] },
  group: groups.questionGroups.groups[0],
  question: questions.interactiveQuestions.questions[0],
  supplementalGroup: battery.supplementalBatterySocialStudiesGroups[0],
  supplementalQuestion: battery.supplementalBatterySocialStudiesQuestions[0],
  sourcePage: Object.entries(sourcePages.supplementalSocialStudiesSourcePages)[0],
  visualAsset: Object.entries(assets.visualAssets)[0],
}, null, 2));

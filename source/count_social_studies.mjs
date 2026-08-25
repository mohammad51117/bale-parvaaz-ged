const [
  { questionGroups },
  { interactiveQuestions },
  { supplementalEconomicsGroups, supplementalEconomicsQuestions },
  { supplementalMcGrawHillGroups, supplementalMcGrawHillQuestions },
  { supplementalBatterySocialStudiesGroups, supplementalBatterySocialStudiesQuestions },
  { supplementalKaplanSocialStudiesGroups, supplementalKaplanSocialStudiesQuestions },
  { supplementalKaplanSocialStudiesPretestGroups, supplementalKaplanSocialStudiesPretestQuestions },
  { supplementalPrincetonSocialStudiesTest2Groups, supplementalPrincetonSocialStudiesTest2Questions },
] = await Promise.all([
  import('../client/src/lib/questionGroups.ts'),
  import('../client/src/lib/interactiveQuestions.ts'),
  import('../client/src/lib/supplementalEconomics.ts'),
  import('../client/src/lib/supplementalMcGrawHill.ts'),
  import('../client/src/lib/supplementalBatterySocialStudies.ts'),
  import('../client/src/lib/supplementalKaplanSocialStudies.ts'),
  import('../client/src/lib/supplementalKaplanSocialStudiesPretest.ts'),
  import('../client/src/lib/supplementalPrincetonSocialStudiesTest2.ts'),
]);

const sets = [
  ['main-social-studies', questionGroups.groups, interactiveQuestions.questions],
  ['economics', supplementalEconomicsGroups, supplementalEconomicsQuestions],
  ['mcgraw', supplementalMcGrawHillGroups, supplementalMcGrawHillQuestions],
  ['battery', supplementalBatterySocialStudiesGroups, supplementalBatterySocialStudiesQuestions],
  ['kaplan', supplementalKaplanSocialStudiesGroups, supplementalKaplanSocialStudiesQuestions],
  ['kaplan-pretest', supplementalKaplanSocialStudiesPretestGroups, supplementalKaplanSocialStudiesPretestQuestions],
  ['princeton', supplementalPrincetonSocialStudiesTest2Groups, supplementalPrincetonSocialStudiesTest2Questions],
];
const result = sets.map(([source, groups, questions]) => ({ source, groups: groups.filter((group) => group.section === 'Social Studies').length, questions: questions.filter((question) => question.section === 'Social Studies').length }));
console.log(JSON.stringify({ sources: result, totalGroups: result.reduce((sum, row) => sum + row.groups, 0), totalQuestions: result.reduce((sum, row) => sum + row.questions, 0) }, null, 2));

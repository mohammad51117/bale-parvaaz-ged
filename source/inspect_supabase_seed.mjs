const modules = {
  bookData: await import('../client/src/lib/bookData.ts'),
  questionGroups: await import('../client/src/lib/questionGroups.ts'),
  interactiveQuestions: await import('../client/src/lib/interactiveQuestions.ts'),
  workbookSources: await import('../client/src/lib/workbookSources.ts'),
  branding: await import('../client/src/lib/branding.ts'),
  battery: await import('../client/src/lib/supplementalBatterySocialStudies.ts'),
  kaplan: await import('../client/src/lib/supplementalKaplanSocialStudies.ts'),
  kaplanPretest: await import('../client/src/lib/supplementalKaplanSocialStudiesPretest.ts'),
  princeton: await import('../client/src/lib/supplementalPrincetonSocialStudiesTest2.ts'),
  sourcePages: await import('../client/src/lib/supplementalSocialStudiesSourcePages.ts'),
};

for (const [name, module] of Object.entries(modules)) {
  console.log(name, Object.fromEntries(Object.entries(module).map(([key, value]) => [key, {
    type: Array.isArray(value) ? 'array' : typeof value,
    keys: value && typeof value === 'object' && !Array.isArray(value) ? Object.keys(value).slice(0, 12) : undefined,
    length: Array.isArray(value) ? value.length : undefined,
  }])));
}

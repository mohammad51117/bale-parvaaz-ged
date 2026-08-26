export type SourceVisual = { page: number; url: string };

export function mergeSourceVisuals(
  sourcePageVisuals: readonly SourceVisual[],
  legacyVisual: SourceVisual | undefined,
): SourceVisual[] {
  if (!legacyVisual) return [...sourcePageVisuals];
  const samePageIndex = sourcePageVisuals.findIndex(({ page }) => page === legacyVisual.page);
  if (samePageIndex >= 0) {
    return sourcePageVisuals.map((visual, index) => index === samePageIndex ? legacyVisual : visual);
  }
  return [...sourcePageVisuals, legacyVisual];
}

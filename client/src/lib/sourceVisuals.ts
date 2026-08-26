export type SourceVisual = { page: number; url: string };

export function mergeSourceVisuals(
  sourcePageVisuals: readonly SourceVisual[],
  legacyVisual: SourceVisual | undefined,
): SourceVisual[] {
  if (!legacyVisual || sourcePageVisuals.some(({ url }) => url === legacyVisual.url)) {
    return [...sourcePageVisuals];
  }
  return [...sourcePageVisuals, legacyVisual];
}

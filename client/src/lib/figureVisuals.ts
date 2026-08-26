export type CorrectedFigureVisual = { page: number; path: string };

/**
 * The grouped-question parser stores the context marker page, but several
 * main-book figure pages are printed on the immediately following physical
 * PDF page. Keep these corrections explicit so ordinary source-page mappings
 * stay unchanged and future source audits can trace the exception.
 */
export const correctedMainFigureVisuals: Record<string, CorrectedFigureVisual> = {
  "group-227-228": { page: 82, path: "visuals/main/figure-082.jpg" },
  "group-276-277": { page: 104, path: "visuals/main/figure-104.jpg" },
  "group-325-329": { page: 128, path: "visuals/main/figure-128.jpg" },
  "group-335-338": { page: 132, path: "visuals/main/figure-132.jpg" },
};

/* Atlas Study Hall: every question set carries visible provenance so teachers can distinguish the main book from supplemental workbooks. */
export type WorkbookSource = {
  id: string;
  title: string;
  shortTitle: string;
  pageLabel: string;
  note: string;
};

export type WorkbookKey = "main" | "economics";
export type WorkbookFilter = "all" | WorkbookKey;

export const workbookSources: Record<string, WorkbookSource> = {
  main: {
    id: "main-1001",
    title: "1001 GED Practice Questions For Dummies by Stuart Donnelly",
    shortTitle: "1001 GED Practice Questions For Dummies",
    pageLabel: "source folio",
    note: "Main 1,001-question book conversion",
  },
  economics: {
    id: "social-studies-economics",
    title: "Social Studies Economics Question 1",
    shortTitle: "Social Studies Economics workbook",
    pageLabel: "source page",
    note: "Supplemental scanned Economics workbook",
  },
};

export const workbookFilterOptions: readonly { value: WorkbookFilter; label: string; shortLabel: string }[] = [
  { value: "all", label: "All workbooks", shortLabel: "All sources" },
  { value: "main", label: workbookSources.main.shortTitle, shortLabel: "Main 1,001-question book" },
  { value: "economics", label: workbookSources.economics.shortTitle, shortLabel: "Economics supplement" },
];

export function getWorkbookKey(groupId: string): WorkbookKey {
  return groupId.startsWith("econ-supp-") ? "economics" : "main";
}

export function getWorkbookSource(groupId: string): WorkbookSource {
  return workbookSources[getWorkbookKey(groupId)];
}

export function isWorkbookFilter(value: string | null): value is WorkbookFilter {
  return value === "all" || value === "main" || value === "economics";
}

export function getInitialWorkbookFilter(): WorkbookFilter {
  const urlFilter = new URLSearchParams(window.location.search).get("workbook");
  const savedFilter = window.localStorage.getItem("bale-parvaaz-workbook-filter");
  if (isWorkbookFilter(urlFilter)) return urlFilter;
  return isWorkbookFilter(savedFilter) ? savedFilter : "all";
}

export function persistWorkbookFilter(filter: WorkbookFilter): void {
  window.localStorage.setItem("bale-parvaaz-workbook-filter", filter);
  const url = new URL(window.location.href);
  if (filter === "all") url.searchParams.delete("workbook");
  else url.searchParams.set("workbook", filter);
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

export function matchesWorkbook(groupId: string, filter: WorkbookFilter): boolean {
  return filter === "all" || getWorkbookKey(groupId) === filter;
}

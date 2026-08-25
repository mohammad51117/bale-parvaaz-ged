/* Atlas Study Hall: every question set carries visible provenance so teachers can distinguish the main book from supplemental workbooks. */
export type WorkbookSource = {
  id: string;
  title: string;
  shortTitle: string;
  pageLabel: string;
  note: string;
};

export type WorkbookKey = "main" | "economics" | "mcgraw" | "battery" | "kaplan" | "kaplan-pretest" | "princeton";
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
  mcgraw: {
    id: "mcgraw-social-studies",
    title: "McGraw-Hill Education Social Studies Workbook for the GED Test",
    shortTitle: "McGraw Hill Social Studies workbook",
    pageLabel: "source page",
    note: "Supplemental McGraw Hill Social Studies workbook",
  },
  battery: {
    id: "battery-social-studies-2",
    title: "Battery Social Studies Practice Test 2",
    shortTitle: "Battery Social Studies Test 2",
    pageLabel: "PDF page",
    note: "Supplemental scanned Social Studies practice test",
  },
  kaplan: {
    id: "kaplan-social-studies",
    title: "Kaplan Social Studies Practice Test",
    shortTitle: "Kaplan Social Studies Test",
    pageLabel: "PDF page",
    note: "Supplemental scanned Social Studies practice test",
  },
  "kaplan-pretest": {
    id: "kaplan-social-studies-pretest",
    title: "Kaplan Social Studies Pretest",
    shortTitle: "Kaplan Social Studies Pretest",
    pageLabel: "PDF page",
    note: "Supplemental scanned Social Studies pretest",
  },
  princeton: {
    id: "princeton-social-studies-test-2",
    title: "Princeton Social Studies Test 2",
    shortTitle: "Princeton Social Studies Test 2",
    pageLabel: "PDF page",
    note: "Supplemental scanned Social Studies test",
  },
};

export const workbookFilterOptions: readonly { value: WorkbookFilter; label: string; shortLabel: string }[] = [
  { value: "all", label: "All workbooks", shortLabel: "All sources" },
  { value: "main", label: workbookSources.main.shortTitle, shortLabel: "Main 1,001-question book" },
  { value: "economics", label: workbookSources.economics.shortTitle, shortLabel: "Economics supplement" },
  { value: "mcgraw", label: workbookSources.mcgraw.shortTitle, shortLabel: "McGraw Hill supplement" },
  { value: "battery", label: workbookSources.battery.shortTitle, shortLabel: "Battery Social Studies Test 2" },
  { value: "kaplan", label: workbookSources.kaplan.shortTitle, shortLabel: "Kaplan Social Studies Test" },
  { value: "kaplan-pretest", label: workbookSources["kaplan-pretest"].shortTitle, shortLabel: "Kaplan Social Studies Pretest" },
  { value: "princeton", label: workbookSources.princeton.shortTitle, shortLabel: "Princeton Social Studies Test 2" },
];

export function getWorkbookKey(groupId: string): WorkbookKey {
  if (groupId.startsWith("econ-supp-")) return "economics";
  if (groupId.startsWith("mcgraw-")) return "mcgraw";
  if (groupId.startsWith("battery-ss-")) return "battery";
  if (groupId.startsWith("kaplan-pretest-ss-")) return "kaplan-pretest";
  if (groupId.startsWith("princeton-ss-")) return "princeton";
  if (groupId.startsWith("kaplan-ss-")) return "kaplan";
  return "main";
}

export function getWorkbookSource(groupId: string): WorkbookSource {
  return workbookSources[getWorkbookKey(groupId)];
}

export function isWorkbookFilter(value: string | null): value is WorkbookFilter {
  return value === "all" || value === "main" || value === "economics" || value === "mcgraw" || value === "battery" || value === "kaplan" || value === "kaplan-pretest" || value === "princeton";
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

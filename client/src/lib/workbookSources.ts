/* Atlas Study Hall: every question set carries visible provenance so teachers can distinguish the main book from supplemental workbooks. */
export type WorkbookSource = {
  id: string;
  title: string;
  shortTitle: string;
  pageLabel: string;
  note: string;
};

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

export function getWorkbookSource(groupId: string): WorkbookSource {
  return groupId.startsWith("econ-supp-") ? workbookSources.economics : workbookSources.main;
}

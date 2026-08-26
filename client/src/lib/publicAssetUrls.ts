const configuredSupabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.replace(/\/+$/, "");

export const publicGedAssetsBase = configuredSupabaseUrl
  ? `${configuredSupabaseUrl}/storage/v1/object/public/ged-assets`
  : "";

export function publicGedAsset(path: string, fallback: string) {
  return publicGedAssetsBase ? `${publicGedAssetsBase}/${path.replace(/^\/+/, "")}` : fallback;
}

export function publicGedPageAsset(folder: string, page: number, fallback: string, width = 3) {
  const pageLabel = String(page).padStart(width, "0");
  return publicGedAsset(`pages/${folder}/page-${pageLabel}.jpg`, fallback);
}

export function publicGedSourcePageAsset(sourceId: string, page: number, fallback = "") {
  const folderBySource: Record<string, string> = {
    "main-1001": "main",
    "social-studies-economics": "economics",
    "mcgraw-social-studies": "mcgraw",
    "battery-social-studies-2": "battery",
    "kaplan-social-studies": "kaplan",
    "kaplan-social-studies-pretest": "kaplan-pretest",
    "princeton-social-studies-test-2": "princeton",
  };
  const folder = folderBySource[sourceId];
  return folder ? publicGedPageAsset(folder, page, fallback) : fallback;
}

export function publicGedVisualAsset(assetId: number, fallback: string) {
  const workbook = assetId >= 6000
    ? "princeton"
    : assetId >= 5000
      ? "kaplan-pretest"
      : assetId >= 4000
        ? "kaplan"
        : assetId >= 3000
          ? "battery"
          : assetId >= 2000
            ? "mcgraw"
            : assetId >= 1000
              ? "economics"
              : "main";
  const page = assetId >= 1000 ? assetId % 1000 : assetId;
  return publicGedPageAsset(workbook, page, fallback);
}

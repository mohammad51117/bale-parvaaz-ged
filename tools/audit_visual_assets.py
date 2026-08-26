"""Audit every visual question group against its trusted source asset.

The report checks that each group has a visual mapping, that the mapped legacy
source and public Supabase object are available, that the public bytes match the
trusted source bytes, and that all downloaded objects are valid JPEGs. The one
known main-book exception is Question 323: its legacy visual entry is the
preceding context page, so the public page-125 object is compared with a
physical-PDF page-126 render instead.
"""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
import tempfile
from io import BytesIO
from pathlib import Path

import requests
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
LIB = ROOT / "client/src/lib"
PREVIEW = "https://3000-i8z0iv5f1il85edhgdzo5-e1dd3efb.us3.manus.computer"
SUPABASE = "https://rmglelcdiumvwpiurtjj.supabase.co/storage/v1/object/public/ged-assets"
MAIN_PDF = Path("/home/ubuntu/upload/1001-GED-Practice-Questions-For-Dummies-by-Stuart-Donnelly.pdf")
MAPS = {
    "main-1001": ("main", "visualAssets.ts", "questionGroups.ts"),
    "social-studies-economics": ("economics", "supplementalEconomicsVisuals.ts", "supplementalEconomics.ts"),
    "mcgraw-social-studies": ("mcgraw", "supplementalMcGrawHillVisuals.ts", "supplementalMcGrawHill.ts"),
    "battery-social-studies-2": ("battery", "supplementalBatterySocialStudiesVisuals.ts", "supplementalBatterySocialStudies.ts"),
    "kaplan-social-studies": ("kaplan", "supplementalKaplanSocialStudiesVisuals.ts", "supplementalKaplanSocialStudies.ts"),
    "kaplan-social-studies-pretest": ("kaplan-pretest", "supplementalKaplanSocialStudiesPretestVisuals.ts", "supplementalKaplanSocialStudiesPretest.ts"),
    "princeton-social-studies-test-2": ("princeton", "supplementalPrincetonSocialStudiesTest2Visuals.ts", "supplementalPrincetonSocialStudiesTest2.ts"),
}


def parse_map(path: Path) -> dict[int, str]:
    text = path.read_text()
    return {int(key): value for key, value in re.findall(r'''["']?(\d+)["']?\s*:\s*["']([^"']+)["']''', text)}


def parse_groups(source_id: str, path: Path) -> list[dict]:
    text = path.read_text()
    if source_id == "main-1001":
        start = text.index("{", text.index("export const questionGroups"))
        end = text.rindex("} as const;") + 1
        obj = json.loads(text[start:end])
        return [
            {"id": g["id"], "visualPage": g.get("visualPage"), "contextType": g.get("contextType"), "sourcePages": g.get("sourcePages", [])}
            for g in obj["groups"] if g.get("visualPage") is not None
        ]
    ids = re.findall(r'(?:"id"|\bid)\s*:\s*"([^"]+)"', text)
    pages = re.findall(r'"?visualPage"?\s*:\s*(\d+|null)', text)
    return [{"id": ids[i], "visualPage": int(page)} for i, page in enumerate(pages) if page != "null" and i < len(ids)]


def jpeg_metadata(data: bytes) -> dict:
    with Image.open(BytesIO(data)) as image:
        image.verify()
        return {"format": image.format, "width": image.width, "height": image.height}


def main() -> None:
    report = {"generatedBy": str(Path(__file__).relative_to(ROOT)), "workbooks": {}, "exceptions": {"group-323-324": "The legacy folio-125 image is an intro page; page-125 is compared with physical PDF page 126, which contains the actual graph."}}
    session = requests.Session()
    for source_id, (folder, visual_file, group_file) in MAPS.items():
        visual_map = parse_map(LIB / visual_file)
        groups = parse_groups(source_id, LIB / group_file)
        rows = []
        for group in groups:
            asset_id = group["visualPage"]
            public_path = f"pages/{folder}/page-{asset_id % 1000:03d}.jpg"
            public_url = f"{SUPABASE}/{public_path}"
            legacy_path = visual_map.get(asset_id)
            source_kind = "legacy-manus-asset"
            expected = None
            if source_id == "main-1001" and asset_id == 125:
                source_kind = "physical-pdf-page-126"
                with tempfile.TemporaryDirectory(prefix="q323-audit-") as temp_dir:
                    prefix = Path(temp_dir) / "page-126"
                    subprocess.run(["pdftoppm", "-f", "126", "-l", "126", "-r", "125", "-jpeg", "-jpegopt", "quality=90", "-singlefile", str(MAIN_PDF), str(prefix)], check=True, stdout=subprocess.DEVNULL)
                    expected = Path(f"{prefix}.jpg").read_bytes()
            else:
                legacy = session.get(f"{PREVIEW}{legacy_path}", allow_redirects=True, timeout=60)
                legacy.raise_for_status()
                expected = legacy.content
            public = session.get(public_url, timeout=60)
            public.raise_for_status()
            public_meta = jpeg_metadata(public.content)
            expected_meta = jpeg_metadata(expected)
            rows.append({
                "groupId": group["id"],
                "contextType": group.get("contextType"),
                "visualPage": asset_id,
                "publicPath": public_path,
                "sourceKind": source_kind,
                "publicStatus": public.status_code,
                "publicBytes": len(public.content),
                "expectedBytes": len(expected),
                "sha256": hashlib.sha256(public.content).hexdigest(),
                "exactByteMatch": public.content == expected,
                "publicImage": public_meta,
                "expectedImage": expected_meta,
            })
        report["workbooks"][source_id] = {"visualGroupCount": len(groups), "visualAssetCount": len(visual_map), "allGroupsHaveAssets": all(r["visualPage"] in visual_map for r in groups), "allPublicObjectsMatchTrustedSources": all(r["exactByteMatch"] for r in rows), "rows": rows}
    report["totals"] = {"workbooks": len(report["workbooks"]), "visualGroups": sum(v["visualGroupCount"] for v in report["workbooks"].values()), "visualAssets": sum(v["visualAssetCount"] for v in report["workbooks"].values()), "allPass": all(v["allGroupsHaveAssets"] and v["allPublicObjectsMatchTrustedSources"] for v in report["workbooks"].values())}
    output = ROOT / "docs/visual-asset-audit-report.json"
    output.write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps({"output": str(output), "totals": report["totals"], "workbooks": {k: {"groups": v["visualGroupCount"], "assets": v["visualAssetCount"], "pass": v["allGroupsHaveAssets"] and v["allPublicObjectsMatchTrustedSources"]} for k, v in report["workbooks"].items()}}, indent=2))


if __name__ == "__main__":
    main()

from __future__ import annotations

import json
import re
from pathlib import Path

root = Path("source/mcgraw-hill")
data = json.loads((root / "content.json").read_text())

header = "/* Atlas Study Hall: McGraw-Hill Education Social Studies Workbook for the GED Test, imported from the supplied workbook PDF. */\n"
module = header + "export const supplementalMcGrawHillGroups = " + json.dumps(data["groups"], ensure_ascii=False, separators=(",", ":")) + " as const;\n\n"
module += "export const supplementalMcGrawHillQuestions = " + json.dumps(data["questions"], ensure_ascii=False, separators=(",", ":")) + " as const;\n"
(root.parent.parent / "client/src/lib/supplementalMcGrawHill.ts").write_text(module)

assets = {}
for line in (root / "uploaded_assets.txt").read_text().splitlines():
    match = re.search(r"\[SUCCESS\].*?/folio-(\d+)\.jpg -> (\S+)$", line)
    if match:
        assets[2000 + int(match.group(1))] = match.group(2)
visual_module = header + "export const supplementalMcGrawHillVisuals: Record<number, string> = " + json.dumps(dict(sorted(assets.items())), ensure_ascii=False, separators=(",", ":")) + ";\n"
(root.parent.parent / "client/src/lib/supplementalMcGrawHillVisuals.ts").write_text(visual_module)
print(json.dumps({"groups": len(data["groups"]), "questions": len(data["questions"]), "visuals": len(assets)}, indent=2))

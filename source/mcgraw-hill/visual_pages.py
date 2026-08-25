from __future__ import annotations

import json
from pathlib import Path

data = json.loads(Path("source/mcgraw-hill/content.json").read_text())
visual_pages = sorted({group["sourcePages"][0] for group in data["groups"] if group["visualPage"] is not None})
Path("source/mcgraw-hill/visual_pages.txt").write_text("\n".join(str(page) for page in visual_pages) + "\n")
print(f"{len(visual_pages)} unique visual source pages")
print(visual_pages)

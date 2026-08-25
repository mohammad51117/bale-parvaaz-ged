from __future__ import annotations

import json
from pathlib import Path


def read_export(path: str, export_name: str):
    source = Path(path).read_text()
    prefix = f"export const {export_name} = "
    start = source.index(prefix) + len(prefix)
    next_export = source.find("\nexport const ", start)
    end = next_export if next_export >= 0 else len(source)
    payload = source[start:end].strip()
    if payload.endswith(";"):
        payload = payload[:-1].rstrip()
    if payload.endswith(" as const"):
        payload = payload[:-len(" as const")].rstrip()
    return json.loads(payload)

main_groups = read_export("client/src/lib/questionGroups.ts", "questionGroups")["groups"]
economics_groups = read_export("client/src/lib/supplementalEconomics.ts", "supplementalEconomicsGroups")
mcgraw_groups = read_export("client/src/lib/supplementalMcGrawHill.ts", "supplementalMcGrawHillGroups")
for label, groups in [("main", main_groups), ("economics", economics_groups), ("mcgraw", mcgraw_groups)]:
    print(label, "groups", len(groups), "questions", sum(len(group["questions"]) for group in groups))
print("all groups", sum(len(groups) for groups in (main_groups, economics_groups, mcgraw_groups)))
print("all questions", sum(sum(len(group["questions"]) for group in groups) for groups in (main_groups, economics_groups, mcgraw_groups)))

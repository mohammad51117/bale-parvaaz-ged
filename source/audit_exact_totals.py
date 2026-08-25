from __future__ import annotations

import json
from pathlib import Path


def read_single_object(path: str, export_name: str):
    source = Path(path).read_text()
    prefix = f"export const {export_name} = "
    start = source.index(prefix) + len(prefix)
    payload = source[start:source.rfind("}") + 1].strip()
    return json.loads(payload)


def read_array(path: str, export_name: str):
    source = Path(path).read_text()
    prefix = f"export const {export_name} = "
    start = source.index(prefix) + len(prefix)
    next_export = source.find("\nexport const ", start)
    end = next_export if next_export >= 0 else len(source)
    payload = source[start:end].strip().rstrip(";").strip()
    if payload.endswith(" as const"):
        payload = payload[:-len(" as const")].rstrip()
    return json.loads(payload)

main_q = read_single_object("client/src/lib/interactiveQuestions.ts", "interactiveQuestions")["questions"]
main_g = read_single_object("client/src/lib/questionGroups.ts", "questionGroups")["groups"]
econ_g = read_array("client/src/lib/supplementalEconomics.ts", "supplementalEconomicsGroups")
mcg_g = read_array("client/src/lib/supplementalMcGrawHill.ts", "supplementalMcGrawHillGroups")
print("main interactive records", len(main_q))
print("main grouped linked questions", sum(len(group["questions"]) for group in main_g))
print("economics grouped questions", sum(len(group["questions"]) for group in econ_g))
print("mcgraw grouped questions", sum(len(group["questions"]) for group in mcg_g))
print("combined grouped questions", sum(sum(len(group["questions"]) for group in groups) for groups in (main_g, econ_g, mcg_g)))

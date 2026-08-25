from __future__ import annotations

import json
import re
from pathlib import Path

text = Path("source/mcgraw-hill/extracted.txt").read_text()
pages = text.split("\f")

range_re = re.compile(r"Questions?\s+(\d+)\s*[–-]\s*(\d+)\s+are based on the following\s+(.+?)(?:\.|$)", re.I)
single_re = re.compile(r"Question\s+(\d+)\s+is based on the following\s+(.+?)(?:\.|$)", re.I)
q_re = re.compile(r"^\s*(\d+)\.\s+(.+)$")
chapter_re = re.compile(r"^\s*CHAPTER\s+(\d+)\s+(.+)$", re.I)
end_re = re.compile(r"THIS IS THE END OF CHAPTER\s+(\d+):?\s*(.*)$", re.I)

records = []
for page_index, page in enumerate(pages, start=1):
    lines = page.splitlines()
    for line_index, line in enumerate(lines):
        clean = line.strip()
        match = range_re.search(clean) or single_re.search(clean)
        if match:
            start, end = (int(match.group(1)), int(match.group(2))) if match.re is range_re else (int(match.group(1)), int(match.group(1)))
            context = match.group(3) if match.re is range_re else match.group(2)
            records.append({"page": page_index, "line": line_index, "start": start, "end": end, "marker": clean, "context": context.strip()})

question_lines = []
for page_index, page in enumerate(pages, start=1):
    for line_index, line in enumerate(page.splitlines()):
        match = q_re.match(line)
        if match:
            question_lines.append({"page": page_index, "line": line_index, "number": int(match.group(1)), "text": match.group(2).strip()})

chapters = []
for page_index, page in enumerate(pages, start=1):
    for line_index, line in enumerate(page.splitlines()):
        for regex in (chapter_re, end_re):
            match = regex.search(line.strip())
            if match:
                chapters.append({"page": page_index, "line": line_index, "kind": "chapter" if regex is chapter_re else "end", "number": int(match.group(1)), "title": match.group(2).strip()})

Path("source/mcgraw-hill/structure.json").write_text(json.dumps({"page_count": len(pages), "groups": records, "question_lines": question_lines, "chapters": chapters}, indent=2))
print(json.dumps({"page_count": len(pages), "group_count": len(records), "question_line_count": len(question_lines), "chapters": chapters}, indent=2))

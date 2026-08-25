from __future__ import annotations

import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path("source/mcgraw-hill")
text = (ROOT / "extracted.txt").read_text()
pages = text.split("\f")
if pages and not pages[-1].strip():
    pages = pages[:-1]

section_specs = [
    ("pretest", "Social Studies", 13, 34, 40),
    ("civics", "Social Studies", 40, 91, 75),
    ("us-history", "Social Studies", 92, 134, 75),
    ("economics", "Social Studies", 135, 167, 75),
    ("geography", "Social Studies", 168, 202, 75),
    ("posttest", "Social Studies", 229, 250, 40),
]

question_start_re = re.compile(r"^\s*(\d{1,3})\.\s+(.+)$")
choice_re = re.compile(r"^\s*([A-D])\.\s+(.+)$")
group_re = re.compile(r"^\s*(Questions?\s+\d+\s*(?:[–-]\s*\d+)?\s+(?:are|is)\s+based on the following\s+.+)$", re.I)
end_re = re.compile(r"THIS IS THE END OF (?:CHAPTER|THE SOCIAL STUDIES)\s+\d*:?\s*(.*)$", re.I)
answer_start_re = re.compile(r"^\s*(\d{1,3})(?:\.)?\s*(.*)$")
answer_label_re = re.compile(r"^\s*([A-D])(?:\.|\s)\s*(.*)$", re.I)


def norm(line: str) -> str:
    line = line.replace("\ufb01", "fi").replace("\ufb02", "fl")
    line = re.sub(r"\s+", " ", line.replace("\f", " ")).strip()
    return line


def section_rows(start_page: int, end_page: int):
    rows = []
    for page_number in range(start_page, end_page + 1):
        for line_number, line in enumerate(pages[page_number - 1].splitlines()):
            rows.append({"page": page_number, "line": line_number, "text": line, "clean": norm(line)})
    return rows


def trim_at_end(rows):
    for index, row in enumerate(rows):
        if end_re.search(row["clean"]):
            return rows[:index]
    return rows


def context_type(marker: str) -> str:
    lower = marker.lower()
    for key in ("map", "graph", "chart", "table", "diagram", "timeline", "illustration", "passage", "quotation", "quote", "text", "information"):
        if key in lower:
            return "passage" if key in {"passage", "quotation", "quote", "text"} else key
    return "standalone"


def question_records(section_id: str, start_page: int, end_page: int, expected_count: int):
    rows = trim_at_end(section_rows(start_page, end_page))
    q_positions = []
    heading_positions = []
    for index, row in enumerate(rows):
        q_match = question_start_re.match(row["text"])
        if q_match:
            q_positions.append((index, int(q_match.group(1))))
        g_match = group_re.match(row["text"])
        if g_match:
            heading_positions.append((index, g_match.group(1)))

    # Keep only the first sequential pass of each exercise question number.
    selected = []
    expected = 1
    for position, number in q_positions:
        if number == expected:
            selected.append((position, number))
            expected += 1
            if expected > expected_count:
                break
    if len(selected) != expected_count:
        # A few source lines can begin with a number inside a visual/table; fall back to
        # the first occurrence of each expected number in order.
        selected = []
        for number in range(1, expected_count + 1):
            match = next(((position, found) for position, found in q_positions if found == number and position > (selected[-1][0] if selected else -1)), None)
            if match:
                selected.append(match)

    headings = []
    for position, marker in heading_positions:
        range_match = re.search(r"Questions?\s+(\d+)\s*(?:[–-]\s*(\d+))?", marker, re.I)
        if not range_match:
            continue
        start = int(range_match.group(1))
        end = int(range_match.group(2) or start)
        headings.append({"position": position, "start": start, "end": end, "marker": marker, "contextType": context_type(marker)})

    q_by_number = {}
    for selected_index, (position, number) in enumerate(selected):
        next_q = selected[selected_index + 1][0] if selected_index + 1 < len(selected) else len(rows)
        next_heading = next((heading["position"] for heading in headings if position < heading["position"] < next_q), next_q)
        block = rows[position:next_heading]
        first = question_start_re.match(block[0]["text"])
        prompt_lines = [first.group(2)] if first else []
        choices: list[dict[str, str]] = []
        active_choice: dict[str, str] | None = None
        for row in block[1:]:
            line = row["clean"]
            if not line:
                continue
            if line.startswith("Questions ") or line.startswith("Question ") and "based on the following" in line:
                continue
            choice_match = choice_re.match(row["text"])
            if choice_match:
                active_choice = {"label": choice_match.group(1).upper(), "text": norm(choice_match.group(2))}
                choices.append(active_choice)
                continue
            if active_choice is not None and not line.startswith("—"):
                active_choice["text"] = norm(active_choice["text"] + " " + line)
            elif not choices:
                prompt_lines.append(line)

        prompt = norm(" ".join(prompt_lines))
        q_by_number[number] = {
            "number": number,
            "page": rows[position]["page"],
            "prompt": prompt,
            "choices": choices,
        }

    groups = []
    covered = set()
    for group_index, heading in enumerate(headings):
        effective_end = heading["end"]
        for later_heading in headings[group_index + 1:]:
            if later_heading["start"] <= effective_end:
                effective_end = min(effective_end, later_heading["start"] - 1)
            else:
                break
        numbers = [number for number in range(heading["start"], effective_end + 1) if number in q_by_number]
        if not numbers:
            continue
        covered.update(numbers)
        first_q = next((position for position, number in selected if number == numbers[0]), None)
        next_heading_position = headings[group_index + 1]["position"] if group_index + 1 < len(headings) else len(rows)
        context_lines = [row["clean"] for row in rows[heading["position"] + 1: first_q or next_heading_position] if row["clean"] and not row["clean"].isdigit()]
        context_text = norm(" ".join(context_lines))
        last_page = max(q_by_number[number]["page"] for number in numbers)
        groups.append({
            "id": f"mcgraw-{section_id}-{heading['start']}-{heading['end']}",
            "section": "Social Studies",
            "topic": {"pretest": "Social Studies Pretest", "civics": "Civics and Government", "us-history": "U.S. History", "economics": "Economics", "geography": "Geography and the World", "posttest": "Mixed Social Studies"}[section_id],
            "questionStart": heading["start"],
            "questionEnd": heading["end"],
            "rangeLabel": f"McGraw Hill workbook · Questions {heading['start']}–{heading['end']}" if heading["start"] != heading["end"] else f"McGraw Hill workbook · Question {heading['start']}",
            "contextType": heading["contextType"],
            "marker": heading["marker"],
            "context": context_text,
            "sourcePages": [rows[heading["position"]]["page"], last_page],
            "visualPage": 2000 + rows[heading["position"]]["page"] if heading["contextType"] != "standalone" else None,
            "questions": [{"number": number, "text": q_by_number[number]["prompt"]} for number in numbers],
        })

    for number in sorted(set(q_by_number) - covered):
        question = q_by_number[number]
        groups.append({
            "id": f"mcgraw-{section_id}-{number}",
            "section": "Social Studies",
            "topic": {"pretest": "Social Studies Pretest", "civics": "Civics and Government", "us-history": "U.S. History", "economics": "Economics", "geography": "Geography and the World", "posttest": "Mixed Social Studies"}[section_id],
            "questionStart": number,
            "questionEnd": number,
            "rangeLabel": f"McGraw Hill workbook · Question {number}",
            "contextType": "standalone",
            "marker": question["prompt"],
            "context": "",
            "sourcePages": [question["page"], question["page"]],
            "visualPage": None,
            "questions": [{"number": number, "text": question["prompt"]}],
        })

    groups.sort(key=lambda group: group["questionStart"])
    return rows, q_by_number, groups


def answer_rows(start_page: int, end_page: int):
    rows = []
    for page_number in range(start_page, end_page + 1):
        for line_number, line in enumerate(pages[page_number - 1].splitlines()):
            rows.append({"page": page_number, "line": line_number, "text": line, "clean": norm(line)})
    return rows


def parse_answer_blocks(rows, max_number: int):
    entries = []
    positions = []
    for index, row in enumerate(rows):
        match = answer_start_re.match(row["text"])
        if match and 1 <= int(match.group(1)) <= max_number:
            positions.append((index, int(match.group(1)), match.group(2).strip()))
    expected = 1
    selected = []
    for position, number, first in positions:
        if number == expected:
            selected.append((position, number, first))
            expected += 1
            if expected > max_number:
                break
    for index, (position, number, first) in enumerate(selected):
        end = selected[index + 1][0] if index + 1 < len(selected) else len(rows)
        body = [first] + [row["clean"] for row in rows[position + 1:end] if row["clean"] and not row["clean"].isdigit()]
        body = [line for line in body if not line.lower().startswith(("chapter ", "answers and explanations", "evaluation chart"))]
        full = norm(" ".join(body))
        label_match = answer_label_re.match(full)
        correct_label = label_match.group(1).upper() if label_match else None
        if label_match:
            answer_line = f"{correct_label}. {label_match.group(2).strip()}" if label_match.group(2).strip() else correct_label
            explanation = full
        else:
            split_match = re.search(r"\s+(?=(?:The|A|An|This|If|According|Because|Only|It|In|There|From|When|As|For)\b)", full[1:])
            if split_match:
                split_at = split_match.start() + 1
                answer_line = full[:split_at].strip()
                explanation = full[split_at:].strip()
            else:
                answer_line = full
                explanation = full
        entries.append({"number": number, "answerLine": answer_line, "correctLabel": correct_label, "explanation": explanation})
    return entries

all_groups = []
all_questions = []
all_answers = {}
section_counts = {}
for section_id, section_name, start_page, end_page, expected_count in section_specs:
    rows, raw_questions, groups = question_records(section_id, start_page, end_page, expected_count)
    answers = []
    if section_id == "pretest":
        answers = parse_answer_blocks(answer_rows(34, 39), expected_count)
    elif section_id in {"civics", "us-history", "economics", "geography"}:
        chapter_number = {"civics": 1, "us-history": 2, "economics": 3, "geography": 4}[section_id]
        answer_text = answer_rows(203, 228)
        # isolate chapter answer heading to next chapter heading
        chapter_marker = re.compile(rf"^Chapter\s+{chapter_number}:\s+", re.I)
        next_marker = re.compile(rf"^Chapter\s+{chapter_number + 1}:\s+", re.I)
        start = next((i for i, row in enumerate(answer_text) if chapter_marker.match(row["clean"])), 0)
        end = next((i for i, row in enumerate(answer_text[start + 1:], start + 1) if next_marker.match(row["clean"])), len(answer_text))
        answers = parse_answer_blocks(answer_text[start:end], expected_count)
    else:
        answers = parse_answer_blocks(answer_rows(250, 254), expected_count)
    answer_map = {answer["number"]: answer for answer in answers}
    for group in groups:
        for item in group["questions"]:
            question = raw_questions[item["number"]]
            answer = answer_map.get(item["number"], {})
            all_questions.append({
                "number": item["number"],
                "groupId": group["id"],
                "section": "Social Studies",
                "topic": group["topic"],
                "reference": "McGraw-Hill Education Social Studies Workbook for the GED Test",
                "prompt": question["prompt"],
                "choices": question["choices"],
                "correctLabel": answer.get("correctLabel"),
                "answerLine": answer.get("answerLine", ""),
                "explanation": answer.get("explanation", ""),
                "sourcePage": question["page"],
            })
    all_groups.extend(groups)
    all_answers[section_id] = {"count": len(answers), "numbers": [answer["number"] for answer in answers]}
    section_counts[section_id] = {"questions": len(raw_questions), "groups": len(groups), "answers": len(answers), "expected": expected_count}

output = {"groups": all_groups, "questions": all_questions, "sectionCounts": section_counts, "answerAudit": all_answers}
(ROOT / "content.json").write_text(json.dumps(output, ensure_ascii=False, indent=2))
print(json.dumps({"pages": len(pages), "groups": len(all_groups), "questions": len(all_questions), "sections": section_counts, "answerAudit": all_answers}, indent=2))

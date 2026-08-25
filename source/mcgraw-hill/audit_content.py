from __future__ import annotations

import json
from collections import Counter
from pathlib import Path

data = json.loads(Path("source/mcgraw-hill/content.json").read_text())
questions = data["questions"]
groups = data["groups"]
print("questions", len(questions), "groups", len(groups))
print("topics", Counter(group["topic"] for group in groups))
print("context types", Counter(group["contextType"] for group in groups))
print("choice counts", Counter(len(question["choices"]) for question in questions))
print("correct labels", Counter(question["correctLabel"] or "written" for question in questions))
print("empty prompts", [question["number"] for question in questions if not question["prompt"]][:20])
print("empty answer lines", len([question for question in questions if not question["answerLine"]]))
print("duplicate topic-number", [(key, count) for key, count in Counter((q["topic"], q["number"]) for q in questions).items() if count > 1])
print("groups with missing linked questions", [group["id"] for group in groups if not group["questions"]])
print("groups with context", sum(bool(group["context"]) for group in groups), "visual candidates", sum(group["visualPage"] is not None for group in groups))
for topic in sorted(set(q["topic"] for q in questions)):
    subset = [q for q in questions if q["topic"] == topic]
    print(topic, "count", len(subset), "mc", sum(bool(q["choices"]) for q in subset), "written", sum(not bool(q["choices"]) for q in subset), "keyed", sum(bool(q["answerLine"]) for q in subset))
print("samples")
for topic, number in [("Social Studies Pretest", 1), ("Civics and Government", 1), ("U.S. History", 1), ("Economics", 1), ("Geography and the World", 1), ("Mixed Social Studies", 1), ("Civics and Government", 17), ("Geography and the World", 37)]:
    found = next((q for q in questions if q["topic"] == topic and q["number"] == number), None)
    print(json.dumps(found, ensure_ascii=False))

from pathlib import Path
import json
import re

SOURCE = Path('/home/ubuntu/bale-parvaaz-ged/source/book.txt')
OUT = Path('/home/ubuntu/bale-parvaaz-ged/client/src/lib/bookData.ts')

text = SOURCE.read_text(errors='ignore')
raw_pages = text.split('\f')

chapter_names = {
    1: 'Mathematical Reasoning',
    2: 'Reasoning Through Language Arts',
    3: 'Social Studies',
    4: 'Science',
}

def clean_page(raw: str) -> str:
    lines = []
    for line in raw.replace('\x0c', '').splitlines():
        line = re.sub(r'\s+$', '', line)
        if line.strip():
            lines.append(line)
    return '\n'.join(lines).strip()

def detect_section(page_num: int, content: str):
    if page_num <= 7:
        return 'Opening'
    if 8 <= page_num <= 107:
        return 'Mathematical Reasoning'
    if 108 <= page_num <= 208:
        return 'Reasoning Through Language Arts'
    if 209 <= page_num <= 295:
        return 'Social Studies'
    if 296 <= page_num <= 433:
        return 'Science'
    if 434 <= page_num <= 435:
        return 'Answer Key & Explanations'
    if 436 <= page_num <= 520:
        return 'Mathematical Reasoning · Explanations'
    if 521 <= page_num <= 566:
        return 'Reasoning Through Language Arts · Explanations'
    if 567 <= page_num <= 615:
        return 'Social Studies · Explanations'
    if 616 <= page_num <= 682:
        return 'Science · Explanations'
    return 'Closing'

def detect_kind(content: str):
    low = content.lower()
    if any(word in low for word in ['map', 'figure', 'graph', 'chart', 'table', 'diagram']):
        return 'visual'
    if re.search(r'\(A\).*\(B\).*\(C\).*\(D\)', content, re.S):
        return 'question'
    if 'answer:' in low or 'the correct answer' in low:
        return 'explanation'
    return 'reading'

records = []
for page_num, raw in enumerate(raw_pages[1:], start=1):
    content = clean_page(raw)
    if not content:
        continue
    section = detect_section(page_num, content)
    title = content.splitlines()[0][:120]
    records.append({
        'page': page_num,
        'title': title,
        'section': section,
        'kind': detect_kind(content),
        'hasVisual': detect_kind(content) == 'visual',
        'content': content,
        'wordCount': len(content.split()),
    })

subjects = []
for name in ['Mathematical Reasoning', 'Reasoning Through Language Arts', 'Social Studies', 'Science']:
    pages = [p for p in records if p['section'].startswith(name)]
    subjects.append({
        'name': name,
        'pages': len(pages),
        'firstPage': pages[0]['page'] if pages else None,
        'lastPage': pages[-1]['page'] if pages else None,
        'visualPages': sum(1 for p in pages if p['hasVisual']),
    })

payload = {
    'title': '1001 GED Practice Questions For Dummies',
    'edition': 'Study conversion for Bale Parvaaz GED',
    'sourcePages': 683,
    'preservedOpeningPages': list(range(1, 6)),
    'subjects': subjects,
    'pages': records,
}

OUT.write_text('export const bookData = ' + json.dumps(payload, ensure_ascii=False, indent=2) + ' as const;\n')
print(f'Wrote {len(records)} page records to {OUT}')
print('Subjects:', subjects)
print('Visual pages:', sum(1 for p in records if p['hasVisual']))

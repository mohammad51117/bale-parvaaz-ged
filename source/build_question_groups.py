from pathlib import Path
import json
import re

SOURCE = Path('/home/ubuntu/bale-parvaaz-ged/source/book.txt')
OUT = Path('/home/ubuntu/bale-parvaaz-ged/client/src/lib/questionGroups.ts')
raw_pages = SOURCE.read_text(errors='ignore').split('\f')

# Build one global source stream while retaining exact PDF page positions.
page_starts = {}
parts = []
position = 0
for page_num in range(1, len(raw_pages)):
    page_starts[page_num] = position
    page = raw_pages[page_num].replace('\x0c', '')
    parts.append(page)
    position += len(page) + 1
full_text = '\f'.join(parts)

# The book uses both “Questions 1 through 3...” and “Use ... for Questions 1–3...”.
marker_re = re.compile(r'Questions?\s+(\d+)\s+(?:through|to|and|-)\s+(\d+)', re.I)
question_re = re.compile(r'(?m)^\s*(\d{1,3})\.\s+')

def page_at(global_offset):
    current = 1
    for page_num, start in page_starts.items():
        if start <= global_offset:
            current = page_num
        else:
            break
    return current

def section_for(page):
    if page <= 107: return 'Mathematical Reasoning'
    if page <= 208: return 'Reasoning Through Language Arts'
    if page <= 295: return 'Social Studies'
    return 'Science'

def clean(value):
    value = value.replace('\f', '\n')
    value = re.sub(r'\n{3,}', '\n\n', value)
    return value.strip()

markers = []
for match in marker_re.finditer(full_text):
    start, end = int(match.group(1)), int(match.group(2))
    page_num = page_at(match.start())
    if not (8 <= page_num <= 433) or end <= start or end > 1001:
        continue
    line_end = full_text.find('\n', match.start())
    marker_text = full_text[match.start(): line_end if line_end >= 0 else match.end()].strip()
    markers.append({'offset': match.start(), 'page': page_num, 'start': start, 'end': end, 'marker': marker_text})

# De-duplicate markers if extraction repeats a range instruction on the same source folio.
unique_markers = {}
for marker in markers:
    unique_markers[(marker['start'], marker['end'], marker['page'])] = marker
markers = sorted(unique_markers.values(), key=lambda item: item['offset'])

groups = []
for index, marker in enumerate(markers):
    segment_end = markers[index + 1]['offset'] if index + 1 < len(markers) else page_starts.get(434, len(full_text))
    segment = full_text[marker['offset']:segment_end]
    after_marker = segment[len(full_text[marker['offset']:marker['offset'] + len(marker['marker'])]):]
    first_question = question_re.search(after_marker)
    context = clean(after_marker[:first_question.start()] if first_question else after_marker[:3500])

    question_matches = list(question_re.finditer(after_marker))
    questions = []
    for q_index, q_match in enumerate(question_matches):
        number = int(q_match.group(1))
        if number < marker['start'] or number > marker['end']:
            continue
        block_end = question_matches[q_index + 1].start() if q_index + 1 < len(question_matches) else len(after_marker)
        block = clean(after_marker[q_match.start():block_end])
        questions.append({'number': number, 'text': block, 'sourcePage': page_at(marker['offset'] + q_match.start())})

    # If extraction placed a numbered question after a non-question numeric line, make a second pass
    # using the exact expected sequence. This keeps ranges complete even with awkward indentation.
    found = {item['number'] for item in questions}
    if len(found) < marker['end'] - marker['start'] + 1:
        for number in range(marker['start'], marker['end'] + 1):
            if number in found:
                continue
            fallback = re.search(rf'(?m)^\s*{number}\.\s+', after_marker)
            fallback_text = after_marker
            fallback_offset = marker['offset']
            if not fallback:
                # Some source layouts begin the next context before the final question of the previous range.
                fallback_text = full_text[marker['offset'] + len(marker['marker']):]
                fallback = re.search(rf'(?m)^\s*{number}\.\s+', fallback_text)
                fallback_offset = marker['offset'] + len(marker['marker'])
            if fallback:
                following = re.search(r'(?m)^\s*\d{1,3}\.\s+', fallback_text[fallback.end():])
                end_pos = fallback.end() + following.start() if following else len(fallback_text)
                questions.append({'number': number, 'text': clean(fallback_text[fallback.start():end_pos]), 'sourcePage': page_at(fallback_offset + fallback.start())})
    questions = list({item['number']: item for item in questions}.values())
    questions.sort(key=lambda item: item['number'])
    if not questions:
        continue
    lower = (marker['marker'] + ' ' + context).lower()
    if 'passage' in lower or 'quote' in lower:
        context_type = 'passage'
    elif 'table' in lower:
        context_type = 'table'
    elif 'map' in lower:
        context_type = 'map'
    elif 'graph' in lower:
        context_type = 'graph'
    elif 'chart' in lower:
        context_type = 'chart'
    elif 'figure' in lower or 'image' in lower or 'diagram' in lower:
        context_type = 'figure'
    else:
        context_type = 'information'
    end_page = max([item['sourcePage'] for item in questions], default=marker['page'])
    if not context:
        context = f"The shared source material for this set appears on source folio {marker['page']}. Keep that visual context in view while answering the linked questions."
    groups.append({
        'id': f'group-{marker["start"]}-{marker["end"]}',
        'section': section_for(marker['page']),
        'questionStart': marker['start'],
        'questionEnd': marker['end'],
        'rangeLabel': f'Questions {marker["start"]}–{marker["end"]}',
        'contextType': context_type,
        'marker': marker['marker'],
        'context': context,
        'sourcePages': [marker['page'], end_page],
        'questions': questions,
    })

# Keep the first occurrence of each question range; the answer section is excluded by page cutoff.
unique_groups = {}
for group in groups:
    unique_groups[(group['questionStart'], group['questionEnd'])] = group
groups = sorted(unique_groups.values(), key=lambda item: item['questionStart'])

payload = {'sourcePages': 683, 'groupCount': len(groups), 'groups': groups}
OUT.write_text('export const questionGroups = ' + json.dumps(payload, ensure_ascii=False, indent=2) + ' as const;\n')
print('groups=', len(groups))
for group in groups[:20]:
    print(group['rangeLabel'], group['contextType'], group['sourcePages'], len(group['questions']))

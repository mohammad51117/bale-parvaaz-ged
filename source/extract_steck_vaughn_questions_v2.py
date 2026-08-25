import json
from pathlib import Path
from openai import OpenAI

root = Path('/tmp/steck-vaughn-ocr/full-text')
def pages(start, end):
    return ''.join(f'\n===== PDF PAGE {n} =====\n{(root / f"page-{n:03d}.txt").read_text(errors="replace")}' for n in range(start, end + 1))

lesson_pages = pages(14, 155)
answer_pages = pages(156, 191)

schema = {
    'type': 'object',
    'properties': {
        'source_title': {'type': 'string'},
        'question_count': {'type': 'integer'},
        'questions': {'type': 'array', 'items': {
            'type': 'object',
            'properties': {
                'id': {'type': 'string'},
                'subject': {'type': 'string', 'enum': ['Geography and the World', 'United States History', 'Civics and Government', 'Economics']},
                'unit': {'type': 'integer'},
                'lesson': {'type': 'string'},
                'pdf_page': {'type': 'integer'},
                'source_pages': {'type': 'array', 'items': {'type': 'integer'}},
                'source_kind': {'type': 'string', 'enum': ['passage', 'table', 'chart', 'graph', 'map', 'figure', 'poster', 'cartoon', 'flowchart', 'globe', 'mixed', 'none']},
                'context': {'type': 'string'},
                'prompt': {'type': 'string'},
                'choices': {'type': 'array', 'items': {'type': 'string'}},
                'response_type': {'type': 'string', 'enum': ['multiple-choice', 'short-answer', 'classification', 'ordering', 'map-label', 'hotspot']},
                'correct_label': {'type': 'string'},
                'correct_answer': {'type': 'string'},
                'explanation': {'type': 'string'},
                'needs_original_visual': {'type': 'boolean'},
                'needs_review': {'type': 'boolean'}
            },
            'required': ['id', 'subject', 'unit', 'lesson', 'pdf_page', 'source_pages', 'source_kind', 'context', 'prompt', 'choices', 'response_type', 'correct_label', 'correct_answer', 'explanation', 'needs_original_visual', 'needs_review'],
            'additionalProperties': False
        }}
    },
    'required': ['source_title', 'question_count', 'questions'],
    'additionalProperties': False
}

system = '''You are extracting a complete, high-quality question bank from a scanned Steck-Vaughn Social Studies workbook. The input is split into LESSON PAGES and ANSWER-KEY PAGES. Extract every answerable Social Studies practice item from the lesson pages that has a matching answer/rationale in the answer-key pages. This includes lesson drills, source-set questions, fill-in, classification, map/graph/table tasks, and unit-review questions. Do not include instruction-only prose, tips, directions, copyright, or index entries.\n\nThe answer key is arranged by lesson and page range, and its entries may have OCR-corrupted numbers and labels. Match answer-key entries to lesson questions by lesson, page range, question number, prompt topic, and answer rationale. If OCR makes a minor character uncertain, repair only obvious errors using surrounding text. Never invent a missing prompt. If a question is answerable but some OCR detail remains uncertain, include it and set needs_review=true. Use empty string for correct_label on non-multiple-choice items. For multiple-choice items, choices must be normalized in A/B/C/D order and correct_label must be the official letter. For non-multiple-choice items, put the expected input sequence/value in correct_answer and choose the best response_type. Keep source passages concise but sufficient to understand the question. Mark needs_original_visual=true when the prompt depends on a map, chart, graph, table, figure, poster, cartoon, flowchart, or globe; otherwise false.\n\nImportant: return the actual extracted questions, not a summary. The source contains four units: Geography and the World (unit 1), United States History (unit 2), Civics and Government (unit 3), and Economics (unit 4). Use the exact subject names from the schema. IDs must be unique and stable, such as steck-vaughn-ss-u1-l3-p27-q11. question_count must equal the number of returned questions. JSON only.'''

prompt = f'''LESSON PAGES (PDF pages 14–155):\n{lesson_pages}\n\nANSWER-KEY PAGES (PDF pages 156–191):\n{answer_pages}'''

client = OpenAI()
resp = client.chat.completions.create(
    model='gemini-3.1-pro-preview',
    messages=[{'role': 'system', 'content': system}, {'role': 'user', 'content': prompt}],
    response_format={'type': 'json_schema', 'json_schema': {'name': 'steck_vaughn_social_studies_questions_v2', 'strict': True, 'schema': schema}},
    max_tokens=120000,
)
content = resp.choices[0].message.content
if not content:
    raise RuntimeError(f'No structured content returned: {resp.choices[0].finish_reason}')
data = json.loads(content)
data['question_count'] = len(data['questions'])
out = Path('/tmp/steck-vaughn-ocr/steck_vaughn_questions_v2.json')
out.write_text(json.dumps(data, ensure_ascii=False, indent=2))
print(json.dumps({'output': str(out), 'question_count': data['question_count'], 'finish_reason': resp.choices[0].finish_reason, 'usage': getattr(resp, 'usage', None).model_dump() if getattr(resp, 'usage', None) else None}))

import json
import os
from pathlib import Path
from openai import OpenAI

ocr_path = Path('/tmp/steck-vaughn-ocr/all-pages.txt')
out_path = Path('/tmp/steck-vaughn-ocr/steck_vaughn_questions.json')
ocr = ocr_path.read_text(errors='replace')

schema = {
    'type': 'object',
    'properties': {
        'source_title': {'type': 'string'},
        'question_count': {'type': 'integer'},
        'questions': {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'string'},
                    'subject': {'type': 'string', 'enum': ['Geography and the World', 'United States History', 'Civics and Government', 'Economics']},
                    'unit': {'type': 'integer'},
                    'lesson': {'type': 'string'},
                    'source_pages': {'type': 'array', 'items': {'type': 'integer'}},
                    'source_kind': {'type': 'string', 'enum': ['passage', 'table', 'chart', 'graph', 'map', 'figure', 'poster', 'cartoon', 'flowchart', 'globe', 'mixed', 'none']},
                    'context': {'type': 'string'},
                    'prompt': {'type': 'string'},
                    'choices': {'type': 'array', 'items': {'type': 'string'}},
                    'response_type': {'type': 'string', 'enum': ['multiple-choice', 'short-answer', 'classification', 'ordering', 'map-label', 'hotspot']},
                    'correct_label': {'type': 'string'},
                    'correct_answer': {'type': 'string'},
                    'explanation': {'type': 'string'},
                    'needs_original_visual': {'type': 'boolean'}
                },
                'required': ['id', 'subject', 'unit', 'lesson', 'source_pages', 'source_kind', 'context', 'prompt', 'choices', 'response_type', 'correct_label', 'correct_answer', 'explanation', 'needs_original_visual'],
                'additionalProperties': False
            }
        }
    },
    'required': ['source_title', 'question_count', 'questions'],
    'additionalProperties': False
}

system = '''You are a meticulous educational-content archivist. Extract the graded Social Studies practice questions from the supplied OCR of the Steck-Vaughn Test Preparation for the 2014 GED Test: Social Studies book. The OCR includes instructional prose, questions, and later answer-key pages. Return JSON only using the provided schema.\n\nScope: include every numbered, answerable practice question from the four Social Studies units that has an official answer-key entry. Include lesson drills, source-set questions, and unit-review questions; exclude directions, tips, worked examples without answer-key entries, copyright, and index-only entries. The book is image-based and the OCR is noisy: reconstruct obvious OCR errors from context, but never invent a question. Preserve question wording and all visible answer choices as closely as possible.\n\nPair each question to its official answer and rationale from the answer-key section. Use the printed/PDF page number where the prompt or source visual appears, not the answer-key page. For technology-enhanced items, encode the visible task as a short-answer, classification, ordering, map-label, or hotspot response, and put the expected response in correct_answer. For multiple-choice items, choices must be in A/B/C/D order and correct_label must be the letter. Put a concise rationale in explanation. If a source visual is present or necessary to answer, set needs_original_visual=true and source_kind accordingly; otherwise false. Use the exact four subject names in the enum. IDs should be stable and unique, such as steck-vaughn-ss-u1-l1-q01. Deduplicate only exact repeats caused by OCR page duplication. Do not include questions from other subjects.''' 

client = OpenAI()
resp = client.chat.completions.create(
    model='gpt-5-mini',
    messages=[
        {'role': 'system', 'content': system},
        {'role': 'user', 'content': 'Here is the complete page-marked OCR transcript:\n\n' + ocr}
    ],
    response_format={
        'type': 'json_schema',
        'json_schema': {
            'name': 'steck_vaughn_social_studies_questions',
            'strict': True,
            'schema': schema
        }
    },
    max_completion_tokens=100000
)
content = resp.choices[0].message.content
if not content:
    raise RuntimeError(f'No structured content returned: {resp.choices[0].finish_reason}')
data = json.loads(content)
if data['question_count'] != len(data['questions']):
    data['question_count'] = len(data['questions'])
out_path.write_text(json.dumps(data, ensure_ascii=False, indent=2))
print(json.dumps({'output': str(out_path), 'question_count': data['question_count'], 'finish_reason': resp.choices[0].finish_reason, 'usage': getattr(resp, 'usage', None).model_dump() if getattr(resp, 'usage', None) else None}))

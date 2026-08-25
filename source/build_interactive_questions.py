from pathlib import Path
import json
import re

PROJECT = Path('/home/ubuntu/bale-parvaaz-ged')
SOURCE = PROJECT / 'source/book.txt'
GROUPS = PROJECT / 'client/src/lib/questionGroups.ts'
OUT = PROJECT / 'client/src/lib/interactiveQuestions.ts'

source_text = SOURCE.read_text(errors='ignore')
groups_payload = json.loads(re.search(r'= (\{.*\}) as const;', GROUPS.read_text(), re.S).group(1))

answer_start = source_text.rfind('Chapter 5\nThe Answers')
answers_text = source_text[answer_start:] if answer_start >= 0 else ''
candidate_matches = list(re.finditer(r'(?m)^\s*(\d{1,3})\.\s+(.+)$', answers_text))
# The explanation text can itself contain lines such as “1. Hence…”. Keep only the first
# monotonically increasing answer entry for each question number.
answer_matches = []
expected = 1
for match in candidate_matches:
    number = int(match.group(1))
    if number == expected:
        answer_matches.append(match)
        expected += 1
    if expected > 1001:
        break
answer_map = {}
for index, match in enumerate(answer_matches):
    number = int(match.group(1))
    end = answer_matches[index + 1].start() if index + 1 < len(answer_matches) else len(answers_text)
    block = answers_text[match.start():end].replace('\f', '\n')
    block = re.sub(r'\n{3,}', '\n\n', block).strip()
    first_line = match.group(2).strip()
    answer_map[number] = {'answerLine': first_line, 'explanation': block}


def clean(value):
    value = value.replace('\f', '\n')
    value = re.sub(r'\n{3,}', '\n\n', value)
    return value.strip()


def parse_question(raw):
    raw = clean(raw)
    raw = re.sub(r'^\s*\d{1,3}\.\s*', '', raw, count=1)
    markers = list(re.finditer(r'(?m)^\s*\(([A-D])\)\s*', raw))
    if not markers:
        return {'prompt': raw, 'choices': []}
    prompt = raw[:markers[0].start()].strip()
    choices = []
    for index, marker in enumerate(markers):
        end = markers[index + 1].start() if index + 1 < len(markers) else len(raw)
        text = clean(raw[marker.end():end])
        choices.append({'label': marker.group(1), 'text': text})
    return {'prompt': prompt, 'choices': choices}

questions = []
for group in groups_payload['groups']:
    for question in group['questions']:
        parsed = parse_question(question['text'])
        answer = answer_map.get(question['number'], {'answerLine': '', 'explanation': ''})
        letter_match = re.match(r'([A-D])(?:\.|\s|$)', answer['answerLine'], re.I)
        correct_label = letter_match.group(1).upper() if letter_match else None
        questions.append({
            'number': question['number'],
            'groupId': group['id'],
            'section': group['section'],
            'prompt': parsed['prompt'],
            'choices': parsed['choices'],
            'correctLabel': correct_label,
            'answerLine': answer['answerLine'],
            'explanation': answer['explanation'],
            'sourcePage': question['sourcePage'],
        })

payload = {
    'questionCount': len(questions),
    'answerCount': sum(1 for question in questions if question['answerLine']),
    'choiceQuestionCount': sum(1 for question in questions if question['choices']),
    'questions': questions,
}
OUT.write_text('export const interactiveQuestions = ' + json.dumps(payload, ensure_ascii=False, indent=2) + ' as const;\n')
print('questions=', payload['questionCount'])
print('answer_count=', payload['answerCount'])
print('choice_question_count=', payload['choiceQuestionCount'])
for number in (506, 507, 508, 509):
    item = next(question for question in questions if question['number'] == number)
    print(number, 'choices=', len(item['choices']), 'correct=', item['correctLabel'], 'answer=', item['answerLine'])

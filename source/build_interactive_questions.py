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


def classify_topic(section, prompt, context, answer_line):
    text = f"{prompt} {context} {answer_line}".lower()
    if section == 'Mathematical Reasoning':
        if any(word in text for word in ['probability', 'mean ', 'median', 'mode', 'range', 'standard deviation', 'sample', 'percentile', 'odds', 'random', 'coin', 'die ', 'dice', 'data set', 'histogram', 'scatterplot']):
            return 'Data Analysis, Statistics, and Probability'
        if any(word in text for word in ['triangle', 'angle', 'circle', 'perimeter', 'area', 'volume', 'geometry', 'slope', 'coordinate', 'distance', 'parallel', 'congruent', 'radius', 'diameter', 'polygon', 'measurement']):
            return 'Measurement and Geometry'
        if any(word in text for word in ['equation', 'function', 'variable', 'expression', 'factor', 'quadratic', 'polynomial', 'sequence', 'pattern', 'inequality', 'linear', 'exponent', 'radical', 'solve for', 'system of']):
            return 'Algebra, Functions, and Patterns'
        return 'Number Operations and Number Sense'
    if section == 'Social Studies':
        if any(word in text for word in ['constitution', 'congress', 'president', 'supreme court', 'government', 'federal', 'amendment', 'citizen', 'election', 'democracy', 'republic', 'rights', 'liberty', 'law', 'voting', 'political']):
            return 'Civics and Government'
        if any(word in text for word in ['supply', 'demand', 'market', 'capitalism', 'socialism', 'economy', 'economic', 'trade', 'tax', 'inflation', 'unemployment', 'consumer', 'production', 'scarcity', 'wage']):
            return 'Economics'
        if any(word in text for word in ['map', 'latitude', 'longitude', 'climate', 'region', 'population', 'geography', 'river', 'mountain', 'landform', 'migration', 'resource']):
            return 'Geography'
        if any(word in text for word in ['world war', 'rome', 'greece', 'china', 'europe', 'africa', 'asia', 'revolution', 'empire', 'civilization', 'hitler', 'stalin', 'cold war', 'berlin wall']):
            return 'World History'
        return 'U.S. History'
    if section == 'Science':
        if any(word in text for word in ['cell', 'organ', 'plant', 'animal', 'ecosystem', 'species', 'dna', 'bacteria', 'evolution', 'photosynthesis', 'heredity', 'population', 'body', 'genetic']):
            return 'Life Science'
        if any(word in text for word in ['earth', 'rock', 'weather', 'climate', 'planet', 'star', 'moon', 'solar', 'galaxy', 'geology', 'fossil', 'space', 'atmosphere']):
            return 'Earth and Space Science'
        if any(word in text for word in ['experiment', 'hypothesis', 'variable', 'evidence', 'data', 'scientific method', 'investigation', 'claim', 'trial']):
            return 'Scientific Reasoning'
        return 'Physical Science'
    if any(word in text for word in ['essay', 'argument', 'write about', 'your response', 'compose', 'position']):
        return 'Essay Writing'
    if any(word in text for word in ['grammar', 'sentence', 'punctuation', 'verb', 'pronoun', 'modifier', 'comma', 'apostrophe', 'spelling', 'mechanics']):
        return 'Grammar and Mechanics'
    if any(word in text for word in ['meaning', 'passage', 'according to', 'excerpt', 'author', 'theme', 'main idea', 'inference', 'evidence', 'purpose', 'tone', 'character']):
        return 'Reading for Meaning'
    return 'Language and Vocabulary'


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
        topic = classify_topic(group['section'], parsed['prompt'], group.get('context', ''), answer['answerLine'])
        letter_match = re.match(r'([A-D])(?:\.|\s|$)', answer['answerLine'], re.I)
        correct_label = letter_match.group(1).upper() if letter_match else None
        questions.append({
            'number': question['number'],
            'groupId': group['id'],
            'section': group['section'],
            'topic': topic,
            'reference': '1,001 GED Practice Questions For Dummies',
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

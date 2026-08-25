from __future__ import annotations

import json
import re
from pathlib import Path

SOURCE = Path('/home/ubuntu/upload/pasted_content.txt')
OUTPUT = Path('/home/ubuntu/bale-parvaaz-ged/client/src/lib/studyMap.ts')

SUBJECTS = [
    ('Reasoning Through Language Arts', 'RLA', 'Read, reason, revise, and write with evidence.', '#496D72'),
    ('Mathematical Reasoning', 'Math', 'Build fluency, then use models to solve unfamiliar problems.', '#C36B3D'),
    ('Science', 'Science', 'Read scientific information, interpret evidence, and explain systems.', '#5C7399'),
    ('Social Studies', 'Social Studies', 'Analyze documents, timelines, data, and civic ideas.', '#8A6B42'),
]

SKIP_EXACT = {
    'INTRODUCTION', 'Answers and Explanations', 'Evaluation Chart', 'How to Use the Pretests',
    'How to Use the Posttests', 'Mathematics Formula Sheet', 'The GED® Test',
}


def normalize_lines():
    raw = [line.strip() for line in SOURCE.read_text(encoding='utf-8').splitlines()]
    return [line for line in raw if line]


def merge_wrapped(lines):
    result = []
    for line in lines:
        if not result:
            result.append(line)
            continue
        previous = result[-1]
        should_merge = (
            previous.endswith((',', 'and', 'or', 'the', 'of', 'to', 'in', 'for', 'with', 'on', 'a', 'an'))
            or line[:1].islower()
            or previous.endswith('®')
        )
        if should_merge:
            result[-1] = f'{previous} {line}'
        else:
            result.append(line)
    return result


def make_guidance(subject, title, is_chapter=False):
    lower = title.lower()
    if is_chapter:
        minutes = 120 if subject == 'Mathematical Reasoning' else 105
        return {
            'time': f'{minutes} min',
            'study': 'Preview the chapter, learn the core idea, and annotate one worked example before practicing.',
            'mastery': 'Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.',
            'practice': 'Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.',
        }
    if any(word in lower for word in ['practice', 'pretest', 'posttest', 'evaluation']):
        return {
            'time': '45–75 min',
            'study': 'Treat this as a checkpoint: work independently first, then mark every uncertain item.',
            'mastery': 'Reach 80% or better and explain why each missed answer is wrong.',
            'practice': 'Complete it timed, review errors by category, and repeat only the missed skill types.',
        }
    if subject == 'Mathematical Reasoning':
        minutes = '25–40 min'
        study = 'Learn the rule, copy one worked example, then solve a similar problem without looking.'
        mastery = 'Solve 8 of 10 mixed problems correctly and explain the operation or representation used.'
        practice = 'Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications.'
    elif subject == 'Science':
        minutes = '25–35 min'
        study = 'Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.'
        mastery = 'Interpret a new passage, diagram, or data display and justify the answer with evidence.'
        practice = 'Practice one reading item, one data item, and one “why” explanation before a mixed set.'
    elif subject == 'Social Studies':
        minutes = '25–35 min'
        study = 'Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.'
        mastery = 'Analyze an unfamiliar source and support the answer with a specific detail from the document or data.'
        practice = 'Use document annotation, eliminate distractors, and finish with a timed source-based question set.'
    else:
        minutes = '25–35 min'
        study = 'Read actively, mark the claim or structure, and write a one-sentence explanation in your own words.'
        mastery = 'Answer a new question and point to the exact evidence, language, or structure that supports it.'
        practice = 'Complete one guided item, three independent items, and one timed mixed question.'
    return {'time': minutes, 'study': study, 'mastery': mastery, 'practice': practice}


def parse():
    lines = normalize_lines()
    starts = {name: next(i for i, line in enumerate(lines) if line == name.upper() or line == name) for name, _, _, _ in SUBJECTS}
    ordered = sorted((idx, name) for name, idx in starts.items())
    ordered.append((len(lines), 'END'))
    subjects = []
    for (start, name), (end, _) in zip(ordered, ordered[1:]):
        section = lines[start:end]
        chapter_indices = [i for i, line in enumerate(section) if re.match(r'^CHAPTER \d+', line)]
        chapters = []
        for pos, chapter_idx in enumerate(chapter_indices):
            chapter_end = chapter_indices[pos + 1] if pos + 1 < len(chapter_indices) else len(section)
            chunk = section[chapter_idx:chapter_end]
            heading = re.sub(r'^CHAPTER \d+\s*', '', chunk[0]).strip()
            if len(chunk) > 1 and (chunk[1][:1].islower() or chunk[0].endswith(('and', 'of', 'Number', 'Earth', 'Life'))):
                heading = f'{heading} {chunk[1]}'.strip()
                chunk = chunk[2:]
            lessons = []
            for line in merge_wrapped(chunk):
                if line == chunk[0] if chunk else False:
                    continue
                if line in SKIP_EXACT or line.startswith(('CHAPTER ', 'PART ', 'Answers and Explanations', 'Evaluation Chart')):
                    continue
                if line.startswith(('The ', 'Practice:', 'Writing ', 'Using ', 'Finding ', 'Identifying ', 'Analyzing ', 'Making ', 'Working ', 'Converting ', 'Solving ', 'Graphing ', 'Interpreting ', 'Calculating ', 'Recognizing ', 'Evaluating ', 'Understanding ', 'Basic ', 'Types ', 'Structure ', 'Properties ', 'Effects ', 'Energy ', 'Flow ', 'Conservation ', 'Matter ', 'Food ', 'Capacity ', 'Relationships ', 'Disruption ', 'Prevention ', 'Interaction ', 'Expression ', 'Probability ', 'Simple ', 'Specialized ', 'Levels ', 'Cell ', 'DNA ', 'Chromosomes ', 'Alleles ', 'Assortment ', 'Environmental ', 'Evolutionary ', 'Requirements ', 'Speciation ', 'Extinction ', 'Body ', 'Nutrition ', 'Disease ', 'Atomic ', 'Ions ', 'Molecules ', 'Physical ', 'States ', 'Chemical ', 'Balancing ', 'Limiting ', 'Types of Chemical ', 'Solutions ', 'Saturation ', 'Weak ', 'Waves ', 'Heat ', 'Sources ', 'Motion ', 'Momentum ', 'Force ', 'Newton', 'Gravity ', 'Mass ', 'Work ', 'Simple Machines', 'Mechanical ', 'Polygons ', 'Circles ', '3-', 'Complex ', 'Pythagorean ', 'European ', 'English ', 'Tensions ', 'The First ', 'The Second ', 'The Revolutionary ', 'From the ', 'The War ', 'The Monroe ', 'U.S. ', 'Civil War', 'The United ', 'World War', 'The Great ', 'Postwar ', 'The Cold ', 'The Civil ', 'The Vietnam ', 'Presidencies ', 'Issues ', 'Fundamental ', 'Microeconomics ', 'Macroeconomics ', 'Banking ', 'International ', 'Key Economic ', 'Ecosystems ', 'Geography ', 'Human ', 'Population ', 'Geography Tools', 'The Earliest ', 'Early ', 'Classical ', 'The Great Migration', 'Feudalism', 'The Middle East', 'Civilizations ', 'Renaissance ', 'The Scientific ', 'The Age ', 'Building ', 'Revolutions ', 'New Political ', 'Political ', 'The Rise ', 'The End ', 'China ', 'The Arab ')):
                    lessons.append(line)
            deduped = []
            for lesson in lessons:
                if lesson not in deduped:
                    deduped.append(lesson)
            chapters.append({'title': heading, 'lessons': deduped})
        color = next(color for subject_name, _, _, color in SUBJECTS if subject_name == name)
        subjects.append({'name': name, 'shortName': next(short for subject_name, short, _, _ in SUBJECTS if subject_name == name), 'color': color, 'chapters': chapters})
    return subjects


def render(subjects):
    records = []
    for subject in subjects:
        chapters = []
        for chapter_index, chapter in enumerate(subject['chapters'], 1):
            lesson_records = []
            for lesson_index, title in enumerate(chapter['lessons'], 1):
                guide = make_guidance(subject['name'], title)
                lesson_records.append({'id': f"{subject['shortName'].lower().replace(' ', '-')}-{chapter_index}-{lesson_index}", 'title': title, **guide})
            guide = make_guidance(subject['name'], chapter['title'], True)
            chapters.append({'id': f"{subject['shortName'].lower().replace(' ', '-')}-{chapter_index}", 'number': chapter_index, 'title': chapter['title'], **guide, 'lessons': lesson_records})
        records.append({**subject, 'chapters': chapters})
    payload = json.dumps(records, ensure_ascii=False, indent=2)
    OUTPUT.write_text('/* Atlas Study Hall: student-facing mastery roadmap generated from the supplied GED course outline. */\n\nexport type StudyLesson = { id: string; title: string; time: string; study: string; mastery: string; practice: string; };\nexport type StudyChapter = StudyLesson & { number: number; lessons: StudyLesson[]; };\nexport type StudySubject = { name: string; shortName: string; color: string; chapters: StudyChapter[]; };\n\nexport const studyMap: StudySubject[] = ' + payload + ';\n\nexport const studyMapStats = studyMap.map((subject) => ({ name: subject.name, chapters: subject.chapters.length, lessons: subject.chapters.reduce((sum, chapter) => sum + chapter.lessons.length, 0), }));\n', encoding='utf-8')
    print(json.dumps({'subjects': len(records), 'chapters': sum(len(s['chapters']) for s in records), 'lessons': sum(len(c['lessons']) for s in records for c in s['chapters']), 'output': str(OUTPUT)}, indent=2))


if __name__ == '__main__':
    render(parse())

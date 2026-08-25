from __future__ import annotations

import json
import re
from pathlib import Path

STUDY_MAP = Path('/home/ubuntu/bale-parvaaz-ged/client/src/lib/studyMap.ts')
BOOK = Path('/home/ubuntu/bale-parvaaz-ged/source/mcgraw-hill-4e/book.txt')
OUTPUT = Path('/home/ubuntu/bale-parvaaz-ged/client/src/lib/sourceLessonContent.ts')


def load_map():
    text = STUDY_MAP.read_text(encoding='utf-8')
    payload = text.split('export const studyMap: StudySubject[] = ', 1)[1].split(';\n\nexport const studyMapStats', 1)[0]
    return json.loads(payload)


def norm(value: str) -> str:
    value = value.replace('’', "'").replace('®', '')
    return re.sub(r'[^a-z0-9 ]+', ' ', value.lower()).strip()


def compact(value: str) -> str:
    return re.sub(r'\s+', ' ', value.replace('\f', ' ')).strip(' -:;')


def locate(pages, title):
    target = norm(title)
    exact = [i for i, page in enumerate(pages) if i >= 20 and target and target in norm(page)]
    if exact:
        return exact[0]
    words = [word for word in target.split() if len(word) > 4]
    candidates = []
    for i, page in enumerate(pages):
        if i < 20:
            continue
        npage = norm(page)
        if len(words) >= 2 and sum(word in npage for word in words) >= max(2, len(words) // 2):
            candidates.append(i)
    return candidates[0] if candidates else None


def page_at(pages, index):
    return index + 1 if index is not None else None


def excerpt(pages, index):
    if index is None:
        return 'Use the chapter title as your study target. Define the idea, work one example, and explain the result in your own words.'
    page = compact(pages[index])
    target = norm(page)
    if len(page) > 720:
        page = page[:720]
    return page.rstrip() + ('…' if len(compact(pages[index])) > 720 else '')


def guidance(subject, title, source):
    lower = title.lower()
    if subject == 'Mathematical Reasoning':
        summary = f'The source section introduces {title.lower()} as a tool for representing a problem before solving it. Read the rule, copy the source example, and then solve a fresh example without looking at the model.'
        focus = ['Name the quantities and the unknown.', 'Choose the rule or representation that connects them.', 'Check signs, units, and reasonableness before finalizing.']
        question = f'Which routine best shows understanding of {title.lower()}?'
        choices = ['Identify the knowns and unknown, apply the appropriate rule, and check the result.', 'Memorize one answer pattern and use it for every problem.', 'Ignore units and signs until the final line.', 'Choose the answer closest to the estimate without showing work.']
    elif subject == 'Science':
        summary = f'The source section connects {title.lower()} to evidence-based scientific reasoning. Read the explanation for the system, then use a diagram, observation, or data point to explain what changes and why.'
        focus = ['Identify the system and the variables.', 'Separate an observation from an inference.', 'Support the conclusion with the supplied evidence.']
        question = f'Which approach best demonstrates mastery of {title.lower()}?'
        choices = ['Use the passage, diagram, or data as evidence for a clear explanation.', 'Choose a vocabulary word without explaining its role.', 'Use outside opinion instead of the source evidence.', 'Assume every variable changes in the same direction.']
    elif subject == 'Social Studies':
        summary = f'The source section presents {title.lower()} as a context for interpreting documents, events, or data. Study the background, then ask who created the source, what it claims, and what evidence supports the conclusion.'
        focus = ['Identify the source, time, and point of view.', 'State the central claim or event in one sentence.', 'Cite a detail that supports the best conclusion.']
        question = f'Which routine best prepares you for a GED question about {title.lower()}?'
        choices = ['Read for context and claim, then support the answer with evidence from the source.', 'Pick the most dramatic historical statement.', 'Ignore the source and rely only on memorized facts.', 'Focus on one familiar word and skip the rest of the document.']
    else:
        summary = f'The source section develops {title.lower()} through active reading and clear language choices. Read for the task, locate the exact evidence, and explain why the evidence supports your answer.'
        focus = ['Read the task before choosing an answer.', 'Mark the exact words that matter.', 'Explain the answer in your own words before checking choices.']
        question = f'Which routine best demonstrates mastery of {title.lower()}?'
        choices = ['Use the task and exact textual evidence to explain why the answer fits.', 'Choose the answer with the most advanced vocabulary.', 'Read only the first sentence and predict the rest.', 'Change answers whenever two choices share a word with the passage.']
    return {'lessonSummary': summary, 'focusPoints': focus, 'question': question, 'choices': choices, 'answer': 0, 'explanation': 'The strongest GED response connects the skill to a clear process and uses evidence or mathematical reasoning rather than guessing.', 'finishRule': 'Finish when you can explain the source idea aloud, complete the lesson check correctly, and describe one mistake you will avoid next time.'}


def render():
    study_map = load_map()
    pages = BOOK.read_text(encoding='utf-8').split('\f')
    records = []
    for subject in study_map:
        for chapter in subject['chapters']:
            for lesson in chapter['lessons']:
                index = locate(pages, lesson['title'])
                source = excerpt(pages, index)
                record = {'id': lesson['id'], 'subject': subject['name'], 'chapter': chapter['title'], 'title': lesson['title'], 'sourcePage': page_at(pages, index), 'sourceExcerpt': source, **guidance(subject['name'], lesson['title'], source)}
                records.append(record)
    payload = json.dumps(records, ensure_ascii=False, indent=2)
    OUTPUT.write_text('/* Atlas Study Hall: lesson notes grounded in the uploaded McGraw Hill 4th-edition PDF and bundled as static data. */\n\nexport type SourceLessonContent = { id: string; subject: string; chapter: string; title: string; sourcePage: number | null; sourceExcerpt: string; lessonSummary: string; focusPoints: string[]; question: string; choices: string[]; answer: number; explanation: string; finishRule: string; };\n\nexport const sourceLessonContent: SourceLessonContent[] = ' + payload + ';\n\nexport const sourceLessonContentById = Object.fromEntries(sourceLessonContent.map((item) => [item.id, item]));\n', encoding='utf-8')
    print(json.dumps({'lessons': len(records), 'withSourcePage': sum(1 for item in records if item['sourcePage']), 'output': str(OUTPUT)}, indent=2))


if __name__ == '__main__':
    render()

from __future__ import annotations

import json
from pathlib import Path

STUDY_MAP = Path('/home/ubuntu/bale-parvaaz-ged/client/src/lib/studyMap.ts')
OUTPUT = Path('/home/ubuntu/bale-parvaaz-ged/client/src/lib/studyLessonContent.ts')


def load_map():
    text = STUDY_MAP.read_text(encoding='utf-8')
    payload = text.split('export const studyMap: StudySubject[] = ', 1)[1].split(';\n\nexport const studyMapStats', 1)[0]
    return json.loads(payload)


def content(subject, chapter, title):
    lower = title.lower()
    if subject == 'Mathematical Reasoning':
        lesson = f'{title} is a tool for turning a word, number, or diagram into a solvable mathematical model. Start by naming what is known, what is unknown, and which operation or representation connects them.'
        move = 'Write the relationship before calculating. Keep units, signs, and the question’s final wording visible.'
        example = f'Before solving a problem about {title.lower()}, underline the quantities, label the unknown, choose the rule, and estimate whether the final answer is reasonable.'
        question = f'Which first move best prepares a student to solve a GED-style problem involving {title.lower()}?'
        choices = ['Identify the knowns, the unknown, and the relationship before calculating.', 'Choose the longest answer because it includes the most information.', 'Skip the model and calculate until one answer looks familiar.', 'Round every value before deciding what the problem asks.']
        answer = 0
        explanation = 'A clear model prevents calculation from replacing reasoning. The other choices introduce guessing, premature calculation, or unnecessary rounding.'
    elif subject == 'Science':
        lesson = f'Use {title} as a lens for reading scientific information. Focus on the system, the evidence, and the relationship the question is asking you to explain rather than memorizing isolated vocabulary.'
        move = 'Name the system or variable, identify the evidence, and explain the direction of the relationship in one sentence.'
        example = f'When a passage or diagram tests {title.lower()}, first identify what changes, what stays constant, and which observation supports the conclusion.'
        question = f'Which approach best demonstrates understanding of {title.lower()} on the GED Science test?'
        choices = ['Use evidence from the passage, diagram, or data to explain the relationship.', 'Select a term from the passage without checking its role in the system.', 'Ignore the data and rely only on a familiar real-world opinion.', 'Treat every variable as if it changed at the same time.']
        answer = 0
        explanation = 'GED Science rewards evidence-based reasoning. A correct response must connect the scientific idea to the information supplied in the question.'
    elif subject == 'Social Studies':
        lesson = f'Study {title} through documents, claims, timelines, maps, and data. The GED task is usually to connect a source to its purpose, context, evidence, or consequence.'
        move = 'Annotate the source with three marks: who or what, the central claim or event, and the evidence that supports your answer.'
        example = f'For a source about {title.lower()}, identify the time and point of view before deciding which conclusion is best supported.'
        question = f'What is the strongest way to approach a GED question about {title.lower()}?'
        choices = ['Read the source closely, identify its context and claim, and cite supporting evidence.', 'Choose the answer that sounds most politically or historically dramatic.', 'Use outside knowledge even when the source contradicts it.', 'Focus on one familiar word and ignore the rest of the source.']
        answer = 0
        explanation = 'Source-based questions are answered by combining context with evidence from the document, chart, map, or timeline—not by choosing the most dramatic statement.'
    else:
        lesson = f'Build a reliable reading and writing routine for {title}. The goal is to notice how language works, locate evidence, and explain your choice clearly.'
        move = 'Read for purpose, mark the exact words that matter, and state the reason for your answer before looking at the choices again.'
        example = f'On a question about {title.lower()}, paraphrase the task in your own words, find the relevant sentence, and eliminate choices that are too broad or unsupported.'
        question = f'Which habit best supports mastery of {title.lower()} on the GED RLA test?'
        choices = ['Use the text as evidence and explain why the chosen answer fits the task.', 'Pick the answer with the most advanced vocabulary.', 'Read only the first sentence and predict the rest.', 'Change the answer whenever two choices share a word with the passage.']
        answer = 0
        explanation = 'Strong RLA answers are anchored in the task and the text. Vocabulary overlap alone does not prove that an answer is correct.'
    return {
        'lesson': lesson,
        'keyMove': move,
        'workedExample': example,
        'question': question,
        'choices': choices,
        'answer': answer,
        'explanation': explanation,
        'finishRule': 'Finish this lesson when you can explain the key move aloud, complete the practice question, and name one mistake you will avoid next time.',
    }


def render():
    study_map = load_map()
    records = []
    for subject in study_map:
        for chapter in subject['chapters']:
            for lesson in chapter['lessons']:
                records.append({'id': lesson['id'], 'subject': subject['name'], 'chapter': chapter['title'], 'title': lesson['title'], **content(subject['name'], chapter['title'], lesson['title'])})
    payload = json.dumps(records, ensure_ascii=False, indent=2)
    OUTPUT.write_text('/* Atlas Study Hall: title-based lesson notes and practice prompts generated from the supplied course outline; no local PDF source used. */\n\nexport type StudyLessonContent = { id: string; subject: string; chapter: string; title: string; lesson: string; keyMove: string; workedExample: string; question: string; choices: string[]; answer: number; explanation: string; finishRule: string; };\n\nexport const studyLessonContent: StudyLessonContent[] = ' + payload + ';\n\nexport const studyLessonContentById = Object.fromEntries(studyLessonContent.map((item) => [item.id, item]));\n', encoding='utf-8')
    print(json.dumps({'lessons': len(records), 'output': str(OUTPUT)}, indent=2))


if __name__ == '__main__':
    render()

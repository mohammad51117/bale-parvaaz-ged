from pathlib import Path
import subprocess

pdf = Path('/home/ubuntu/upload/MC_Graw_Hill_Education_Preparation_for_thr_GED_test_4th_edition.pdf')
text = subprocess.check_output(['pdftotext', '-layout', str(pdf), '-'], text=True, errors='ignore')
pages = text.split('\f')
needles = {
    'civics': 'CHAPTER 1',
    'history': 'CHAPTER 2',
    'economics': 'CHAPTER 3',
    'geography': 'CHAPTER 4',
}
for key, needle in needles.items():
    matches = []
    for index, page in enumerate(pages, start=1):
        normalized = ' '.join(page.replace('\n', ' ').split()).lower()
        if needle.lower() in normalized and ('civics' in normalized or 'history' in normalized or 'economics' in normalized or 'geography' in normalized):
            matches.append((index, ' '.join(page.strip().split())[:240]))
    print(f'[{key}]')
    for item in matches[:8]:
        print(item)

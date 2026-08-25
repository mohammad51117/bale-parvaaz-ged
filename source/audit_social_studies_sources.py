from pathlib import Path
import re
import subprocess

FILES = [
    Path('/home/ubuntu/upload/SocialStudiesEconomicsQuestion1.pdf'),
    Path('/home/ubuntu/upload/DummiesGEDSocialStudies.pdf'),
]
for pdf in FILES:
    txt = Path('/tmp') / f'{pdf.stem}.txt'
    subprocess.run(['pdftotext', '-layout', str(pdf), str(txt)], check=True)
    text = txt.read_text(errors='ignore')
    pages = subprocess.check_output(['pdfinfo', str(pdf)], text=True)
    page_count = re.search(r'^Pages:\s+(\d+)', pages, re.M).group(1)
    questions = re.findall(r'(?m)^\s*(\d{1,3})[.)]\s+', text)
    ranges = re.findall(r'(?i)(?:questions?|items?)\s+(\d{1,4})\s*(?:to|[-–])\s*(\d{1,4})', text)
    print(f'\n=== {pdf.name} | pages={page_count} | chars={len(text):,} ===')
    print('question markers:', len(questions), 'first:', questions[:12], 'last:', questions[-12:])
    print('ranges:', ranges[:20])
    for marker in ('Answer Key', 'Answers and Explanations', 'Answers', 'Economics'):
        hits = [m.start() for m in re.finditer(re.escape(marker), text, re.I)]
        print(marker, 'hits:', len(hits), 'first_offsets:', hits[:5])
    print('sample question lines:')
    for line in text.splitlines():
        if re.match(r'\s*\d{1,3}[.)]\s+', line):
            print(line[:180])
            if sum(1 for _ in []) > 10:
                break

from __future__ import annotations

import json
import subprocess
from pathlib import Path

PDF = Path('/home/ubuntu/upload/MC_Graw_Hill_Education_Preparation_for_thr_GED_test_4th_edition.pdf')
DATA = Path('/home/ubuntu/bale-parvaaz-ged/client/src/lib/sourceLessonContent.ts')
OUT = Path('/home/ubuntu/webdev-static-assets/mcgraw-hill-4e-lessons')


def main():
    text = DATA.read_text(encoding='utf-8')
    payload = text.split('export const sourceLessonContent: SourceLessonContent[] = ', 1)[1].split(';\n\nexport const sourceLessonContentById', 1)[0]
    records = json.loads(payload)
    pages = sorted({record['sourcePage'] for record in records if record.get('sourcePage')})
    OUT.mkdir(parents=True, exist_ok=True)
    rendered = []
    for page in pages:
        output = OUT / f'folio-{page:04d}.jpg'
        if not output.exists():
            subprocess.run(['pdftoppm', '-f', str(page), '-l', str(page), '-jpeg', '-r', '120', '-scale-to-x', '1200', '-scale-to-y', '-1', '-singlefile', str(PDF), str(output.with_suffix(''))], check=True)
        rendered.append({'page': page, 'path': str(output), 'bytes': output.stat().st_size})
    print(json.dumps({'mappedLessons': len(records), 'uniquePages': len(pages), 'rendered': len(rendered), 'totalBytes': sum(item['bytes'] for item in rendered), 'output': str(OUT)}, indent=2))


if __name__ == '__main__':
    main()

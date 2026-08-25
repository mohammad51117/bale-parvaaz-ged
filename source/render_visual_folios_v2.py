from pathlib import Path
import json
import re
import subprocess

project = Path('/home/ubuntu/bale-parvaaz-ged')
data_text = (project / 'client/src/lib/questionGroups.ts').read_text()
payload = json.loads(re.search(r'= (\{.*\}) as const;', data_text, re.S).group(1))
folios = sorted({g['visualPage'] for g in payload['groups'] if g.get('visualPage')})
out = Path('/home/ubuntu/webdev-static-assets/ged-visual-folios-v2')
out.mkdir(parents=True, exist_ok=True)
pdf = Path('/home/ubuntu/upload/1001-GED-Practice-Questions-For-Dummies-by-Stuart-Donnelly.pdf')
for page in folios:
    target = out / f'folio-{page}'
    subprocess.run(['pdftoppm', '-f', str(page), '-l', str(page), '-jpeg', '-r', '125', '-singlefile', str(pdf), str(target)], check=True, stdout=subprocess.DEVNULL)
print(f'rendered {len(folios)} actual visual folios')
print(folios)

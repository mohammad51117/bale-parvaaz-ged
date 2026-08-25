from __future__ import annotations

import re
from pathlib import Path

LOG = Path('/home/ubuntu/bale-parvaaz-ged/source/mcgraw-hill-4e/upload.log')
OUT = Path('/home/ubuntu/bale-parvaaz-ged/client/src/lib/sourceMcGrawHillLessonVisuals.ts')

matches = {}
for line in LOG.read_text(encoding='utf-8').splitlines():
    match = re.search(r'folio-(\d+)\.jpg -> (/.+\.jpg)$', line)
    if match:
        matches[int(match.group(1))] = match.group(2)

entries = ',\n'.join(f'  {page}: "{url}"' for page, url in sorted(matches.items()))
OUT.write_text('/* Atlas Study Hall: durable page-image registry for complete McGraw Hill lesson folios. */\n\nexport const sourceMcGrawHillLessonVisuals: Record<number, string> = {\n' + entries + '\n};\n', encoding='utf-8')
print({'visuals': len(matches), 'output': str(OUT)})

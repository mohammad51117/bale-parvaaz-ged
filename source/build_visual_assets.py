from pathlib import Path
import re

log = Path('/home/ubuntu/bale-parvaaz-ged/source/visual-upload-v2.log').read_text()
items = {}
for line in log.splitlines():
    match = re.search(r'folio-(\d+)\.jpg -> (\/manus-storage\/[^\s]+)', line)
    if match:
        items[int(match.group(1))] = match.group(2)

out = Path('/home/ubuntu/bale-parvaaz-ged/client/src/lib/visualAssets.ts')
out.write_text('export const visualAssets: Record<number, string> = ' + repr(dict(sorted(items.items()))) + ';\n')
print(f'wrote {len(items)} visual asset mappings')

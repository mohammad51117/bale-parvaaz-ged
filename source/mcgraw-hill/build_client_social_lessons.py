from pathlib import Path
import json, re

root = Path('/home/ubuntu/bale-parvaaz-ged')
records = json.loads((root/'source/mcgraw-hill/complete_social_lessons.json').read_text())
log = (Path('/tmp/upload-all-social-pages.log')).read_text()
urls = {}
for line in log.splitlines():
    m = re.search(r'page-(\d+)\.jpg -> (\S+)', line)
    if m: urls[int(m.group(1))] = m.group(2)
for record in records:
    record['sourceImages'] = [urls[p] for p in range(record['sourcePages'][0], record['sourcePages'][1]+1) if p in urls]
    record['accent'] = {'Civics and Government':'#8A6B42','U.S. History':'#9B7650','Economics':'#A06A3B','Geography and the World':'#6F7D55'}[record['chapter']]
    record['practiceSubject'] = 'social-studies'
Path(root/'client/src/lib/completeSocialLessons.ts').write_text('export const completeSocialLessons = '+json.dumps(records, ensure_ascii=False, indent=2)+' as const;\n')
print(f'lessons={len(records)} pages={len(urls)}')
print('missing page urls', [p for p in range(939,1126) if p not in urls])

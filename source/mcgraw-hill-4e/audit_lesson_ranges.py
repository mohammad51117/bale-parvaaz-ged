import json, re
from pathlib import Path
study = Path('client/src/lib/studyMap.ts').read_text()
book = Path('source/mcgraw-hill-4e/book.txt').read_text()
payload = study.split('export const studyMap: StudySubject[] = ',1)[1].split(';\n\nexport const studyMapStats',1)[0]
data=json.loads(payload)
pages=book.split('\f')
def norm(s): return re.sub(r'[^a-z0-9 ]+',' ',s.replace('’',"'").lower()).strip()
rows=[]
for s in data:
 for c in s['chapters']:
  for l in c['lessons']:
   target=norm(l['title']); found=None
   for i,p in enumerate(pages):
    if i<20: continue
    if target and target in norm(p): found=i+1; break
   rows.append((l['id'],l['title'],found))
starts=[r[2] for r in rows if r[2]]
ranges=[]
for idx,row in enumerate(rows):
 start=row[2]
 if not start: continue
 nxt=next((r[2] for r in rows[idx+1:] if r[2] and r[2]>start), None)
 end=(nxt-1) if nxt else start
 ranges.append((row[0],start,end))
covered=sorted({p for _,a,b in ranges for p in range(a,b+1)})
print(json.dumps({'lessons':len(rows),'mapped':len(starts),'rangeCount':len(ranges),'uniquePages':len(covered),'minPage':min(covered),'maxPage':max(covered),'uncoveredGaps':[(a,b) for a,b in zip(covered,covered[1:]) if b>a+1][:20]},indent=2))
print('sample',ranges[:5])

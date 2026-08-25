from pathlib import Path
import re

text = Path('/home/ubuntu/bale-parvaaz-ged/source/book.txt').read_text(errors='ignore')
pages = text.split('\f')
practice = '\n'.join(pages[8:434])
starts = []
for match in re.finditer(r'(?m)^\s*(\d{1,3})\.\s+', practice):
    number = int(match.group(1))
    if 1 <= number <= 1001:
        starts.append(number)
seen = []
for number in starts:
    if number not in seen:
        seen.append(number)
missing = [number for number in range(1, 1002) if number not in seen]
extra = [number for number in seen if number > 1001]
print('unique extracted question starts=', len(seen))
print('first=', seen[:12], 'last=', seen[-12:])
print('missing=', missing)
print('508 and 509 present=', 508 in seen, 509 in seen)

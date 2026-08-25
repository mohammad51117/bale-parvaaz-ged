from pathlib import Path
import json, re

root=Path('/home/ubuntu/bale-parvaaz-ged')
log=Path('/tmp/upload-all-social-pages.log').read_text()
urls={int(m.group(1)):m.group(2) for m in re.finditer(r'page-(\d+)\.jpg -> (\S+)', log)}
accents={'Civics and Government':'#8A6B42','U.S. History':'#9B7650','Economics':'#A06A3B','Geography and the World':'#6F7D55'}
records=json.loads((root/'source/mcgraw-hill/complete_social_lessons.json').read_text())

def clean(raw, title):
    text=raw.replace('\x0c','\n')
    # Keep the teaching passage under the lesson heading, not the previous page's tail.
    heading_pattern = re.compile(r'(?m)^\s*' + r'\s+'.join(re.escape(part) for part in title.split()) + r'\s*$', re.I)
    match = heading_pattern.search(text)
    if match: text=text[match.end():]
    # Exercise blocks are practice content, not lesson explanation. They have their own question reader.
    cut=re.search(r'\n\s*(?:EXERCISE|PRACTICE:|Answers (?:are|begin) on page)', text, re.I)
    if cut: text=text[:cut.start()]
    paragraphs=[]
    for block in re.split(r'\n\s*\n+', text):
        lines=[re.sub(r'\s+',' ',line).strip() for line in block.splitlines()]
        value=' '.join(x for x in lines if x)
        value=re.sub(r'\s+([,.;:!?])', r'\1', value)
        value=re.sub(r'([([{])\s+', r'\1', value)
        if value and not re.fullmatch(r'[A-Z0-9 .·—–-]{1,80}', value): paragraphs.append(value)
    result='\n\n'.join(paragraphs).strip()
    result=re.sub(r'\b(?:CHAPTER|Chapter)\s+\d+\b\s*', '', result)
    result=re.sub(r'^(?:Directions?:|Write your answers?.*?\.)\s*', '', result, flags=re.I)
    return result

for record in records:
    record['teachingText']=clean(record['text'], record['title'])
    record['sourceImages']=[urls[p] for p in range(record['sourcePages'][0], record['sourcePages'][1]+1) if p in urls]
    record['accent']=accents[record['chapter']]
    record.pop('text',None)
    # Avoid an empty lesson caused by a heading split across pages.
    if not record['teachingText']:
        record['teachingText']=f"Study the source folio for {record['title']} and use the linked practice questions to apply the chapter idea."
out=root/'source/mcgraw-hill/complete_social_lessons_clean.json'
out.write_text(json.dumps(records,ensure_ascii=False,indent=2))
client=root/'client/src/lib/completeSocialLessons.ts'
client.write_text('export const completeSocialLessons = '+json.dumps(records,ensure_ascii=False,indent=2)+' as const;\n')
print('lessons',len(records),'empty',sum(not r['teachingText'] for r in records),'chars',sum(len(r['teachingText']) for r in records))

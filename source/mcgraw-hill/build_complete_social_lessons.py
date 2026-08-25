from pathlib import Path
import json, re, subprocess

pdf = Path('/home/ubuntu/upload/MC_Graw_Hill_Education_Preparation_for_thr_GED_test_4th_edition.pdf')
out = Path('/home/ubuntu/bale-parvaaz-ged/source/mcgraw-hill/complete_social_lessons.json')
raw = subprocess.check_output(['pdftotext', '-layout', str(pdf), '-'], text=True, errors='ignore')
pages = raw.split('\f')
chapters = [
  ('Civics and Government', 939, 980, ['Types of Historical and Modern Governments','Basic Principles of American Constitutional Democracy','Structure and Design of the U.S. Federal Government','The Legislative Branch','The Executive Branch','The President’s Cabinet','The Judicial Branch','Amending the Constitution','The Bill of Rights','Citizens’ Rights and Civic Responsibilities','Political Parties','The Election Process','Interest Groups','Civic Participation','Contemporary Public Policy']),
  ('U.S. History', 981, 1047, ['European Exploration of the Americas','The English Colony in Virginia','English Colonies in New England and Maryland','The Thirteen Colonies Take Shape','Tensions Rise Between the Colonies and Great Britain','The First Continental Congress and the Beginning of the Revolutionary War','The Second Continental Congress and the Declaration of Independence','The Revolutionary War','The Constitution','The Monroe Doctrine','Manifest Destiny','Civil War and Reconstruction','The United States Becomes a Major Industrial Nation','The United States Becomes a World Power','World War I','World War II','Postwar America','The Cold War','The Civil Rights Movement and the Women’s Movement','The Great Society, the Vietnam War, and Watergate','Presidencies in the Late 20th and Early 21st Centuries','Issues Facing the United States at the Start of the 21st Century']),
  ('Economics', 1048, 1068, ['Fundamental Economic Concepts','Microeconomics and Macroeconomics','Microeconomics','Macroeconomics','Banking and Credit','The Role of Government in the National Economy','International Trade']),
  ('Geography and the World', 1069, 1125, ['Ecosystems','Geography and the Development of Human Societies','Human Changes to the Environment','Human Migration','Population Trends and Issues','Geography Tools and Skills','The Earliest Civilizations','Early China','Early India','Classical Greece','The Great Migration and the Middle Ages','The Middle East and Africa','Civilizations in the Americas','Renaissance and Reformation in Europe','The Age of Exploration','Building Empires','Revolutions in Britain and France','World War I and the Russian Revolution','The Rise of Fascism','World War II','The End of European Dominance and the Formation of the European Union','The End of the Soviet Union','China Today','The Arab World']),
]

def norm(s): return re.sub(r'[^a-z0-9]+', ' ', s.lower()).strip()
page_text = {i: p for i,p in enumerate(pages, start=1)}
records=[]
for chapter, start, end, headings in chapters:
    found=[]
    for heading in headings:
        needle=norm(heading)
        best=None
        for p in range(start,end+1):
            n=norm(page_text[p])
            if needle in n:
                best=p; break
            # tolerate headings split by line breaks and minor punctuation
            words=needle.split()[:5]
            if len(words)>=4 and ' '.join(words) in n:
                best=p; break
        if best is not None:
            found.append((best, heading))
    found.sort()
    for i,(p,heading) in enumerate(found):
        next_p=found[i+1][0] if i+1<len(found) else end+1
        end_page = max(p, next_p - 1)
        text='\n\n'.join(page_text.get(x,'') for x in range(p, end_page + 1)).strip()
        text=re.sub(r'\n{3,}','\n\n',text)
        records.append({'id':'social-'+re.sub(r'[^a-z0-9]+','-',heading.lower()).strip('-'), 'chapter':chapter, 'title':heading, 'sourcePages':[p,end_page], 'text':text})
print('records',len(records))
for r in records: print(r['chapter'], r['sourcePages'], r['title'])
out.write_text(json.dumps(records, ensure_ascii=False, indent=2))
client_out = Path('/home/ubuntu/bale-parvaaz-ged/client/src/lib/completeSocialLessons.ts')
client_out.write_text('export const completeSocialLessons = ' + json.dumps(records, ensure_ascii=False, indent=2) + ' as const;\n')

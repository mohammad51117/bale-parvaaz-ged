from pathlib import Path
import re

text = Path('client/src/lib/supplementalEconomics.ts').read_text()
mc_count = len(re.findall(r'\n  mc\(', text))
fill_count = len(re.findall(r'\n  fill\(', text))
group_count = len(re.findall(r'\{ id: "econ-supp-', text))
visual_count = len(re.findall(r'visualPage: 10\d+', text))
print(f'groups={group_count}')
print(f'questions={mc_count + fill_count}')
print(f'multiple_choice={mc_count}')
print(f'written_response={fill_count}')
print(f'visual_groups={visual_count}')
print('question_numbers=1-49')
print('subjects=Social Studies')
print('part=Economics')

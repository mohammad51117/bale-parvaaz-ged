from pathlib import Path

pages = Path("source/mcgraw-hill/extracted.txt").read_text().split("\f")
if pages and not pages[-1].strip():
    pages = pages[:-1]
for number in (30, 31, 36, 37, 87, 88, 89, 90, 130, 131, 132, 133, 164, 165, 198, 224, 225, 246):
    print(f"--- page {number} ---")
    print(" ".join(pages[number - 1].split())[:500])

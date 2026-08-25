from pathlib import Path
import subprocess

pages = sorted(Path('/home/ubuntu/webdev-static-assets/economics-source/pages').glob('page-*.png'))
out = []
for page in pages:
    base = page.with_suffix('')
    txt = base.with_name(base.name + '-ocr')
    subprocess.run(['tesseract', str(page), str(txt), '--psm', '6'], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    out.append(f'\n===== {page.name} =====\n')
    out.append(Path(str(txt) + '.txt').read_text(errors='ignore'))
Path('/home/ubuntu/bale-parvaaz-ged/source/economics_ocr.txt').write_text('\n'.join(out))

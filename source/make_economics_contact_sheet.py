from pathlib import Path
from PIL import Image, ImageOps, ImageDraw

files = sorted(Path('/home/ubuntu/webdev-static-assets/economics-source/pages').glob('page-*.png'))
thumb_w, thumb_h = 280, 396
cols = 4
rows = (len(files) + cols - 1) // cols
sheet = Image.new('RGB', (cols * thumb_w, rows * (thumb_h + 28)), '#e9e2d5')
draw = ImageDraw.Draw(sheet)
for idx, path in enumerate(files):
    image = Image.open(path).convert('RGB')
    image.thumbnail((thumb_w - 18, thumb_h - 18))
    canvas = Image.new('RGB', (thumb_w, thumb_h), 'white')
    x = (thumb_w - image.width) // 2
    y = (thumb_h - image.height) // 2
    canvas.paste(image, (x, y))
    left = (idx % cols) * thumb_w
    top = (idx // cols) * (thumb_h + 28)
    sheet.paste(canvas, (left, top))
    draw.text((left + 10, top + thumb_h + 7), path.stem, fill='#34545e')
sheet.save('/home/ubuntu/webdev-static-assets/economics-source/contact-sheet.jpg', quality=88)

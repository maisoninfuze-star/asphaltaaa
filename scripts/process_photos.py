#!/usr/bin/env python3
"""Crop phone UI from the supplied screenshots and place all real photos with
clean names + correct EXIF orientation. Outputs to public/assets/projects/."""
import pathlib
from PIL import Image, ImageOps

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "public/assets/projects"
OUT.mkdir(parents=True, exist_ok=True)

# Clean photos (no phone UI) — copy as-is (fix orientation, re-encode clean).
CLEAN = {
    "84EC775F-21C5-4147-80FD-E6056011C860.jpeg": "driveway-blue-house.jpg",
    "C8D49511-F4E7-47F0-9E11-5428C2FBE580.jpeg": "driveway-brick-houses.jpg",
    "25913DD8-ADB4-4C87-96BC-B08BEC804169.jpeg": "driveway-faded-worker.jpg",
    "66EF359A-7B68-465F-A06F-1BD034BE83CD.jpeg": "before-after-after.jpg",
    "89A4E30C-792F-4C00-8C22-376A750C780A.jpeg": "before-after-before.jpg",
}

# Screenshots → (output name, crop box (left, top, right, bottom)) removing phone UI.
CROP = {
    "158C355B-CFA6-4469-94ED-B263586C40C3.jpeg": ("project-white-house.jpg", (0, 520, 955, 1528)),
    "68091C5C-861C-4354-AEF8-BD06EDE0C111.jpeg": ("process-spray-estate.jpg", (0, 565, 955, 1482)),
    "9C4946B3-5722-4B7C-8727-8AF9711C3758.jpeg": ("process-blowers.jpg", (0, 628, 955, 1378)),
    "DF102E82-F61E-4700-9CCC-65EB2D3E7911.jpeg": ("warning-peeling.jpg", (0, 140, 955, 1948)),
}

def save(img, name):
    dest = OUT / name
    img = img.convert("RGB")
    img.save(dest, "JPEG", quality=92, optimize=True)
    print(f"  {name}: {img.width}x{img.height}")

print("Clean photos:")
for src, name in CLEAN.items():
    p = ROOT / src
    if not p.exists():
        print(f"  MISSING {src}"); continue
    save(ImageOps.exif_transpose(Image.open(p)), name)

print("Cropped screenshots:")
for src, (name, box) in CROP.items():
    p = ROOT / src
    if not p.exists():
        print(f"  MISSING {src}"); continue
    img = ImageOps.exif_transpose(Image.open(p))
    save(img.crop(box), name)

print("Done ->", OUT)

#!/usr/bin/env python3
"""Build the primary Meta ad (9:16): faded → dry prep → spray → sealed → CTA.
Captions + crops baked in PIL (fast, French-safe); ffmpeg only assembles.
Usage: build_ad.py <vo_mp3_url>"""
import os, sys, subprocess, tempfile, textwrap, urllib.request, pathlib
from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
FF = str(ROOT / "node_modules/ffmpeg-static/ffmpeg")
PROJ = ROOT / "public/assets/projects"
OUT = ROOT / "public/assets/ads"; OUT.mkdir(parents=True, exist_ok=True)
W, H, FPS = 720, 1280, 30
FONTP = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
WORK = pathlib.Path(tempfile.mkdtemp())

vo_url = sys.argv[1]
vo = WORK / "vo.mp3"
urllib.request.urlretrieve(vo_url, vo)

logo = Image.open(ROOT / "public/assets/brand/logo.png").convert("RGBA")

def cover(img, w, h):
    r = max(w / img.width, h / img.height)
    img = img.resize((round(img.width * r), round(img.height * r)), Image.LANCZOS)
    x = (img.width - w) // 2; y = (img.height - h) // 2
    return img.crop((x, y, x + w, y + h))

def wrap(draw, text, font, maxw):
    lines = []
    for para in text.split("\n"):
        cur = ""
        for word in para.split():
            t = (cur + " " + word).strip()
            if draw.textlength(t, font=font) <= maxw:
                cur = t
            else:
                lines.append(cur); cur = word
        lines.append(cur)
    return lines

def draw_caption(base, text, size=46):
    """Bottom gradient + centered caption + small top logo, onto an RGBA base."""
    d = ImageDraw.Draw(base)
    # gradient
    grad = Image.new("L", (1, H))
    for y in range(H):
        a = 0 if y < H * 0.62 else int(200 * (y - H * 0.62) / (H * 0.38))
        grad.putpixel((0, y), min(a, 200))
    shade = Image.new("RGBA", (W, H), (8, 8, 10, 255))
    shade.putalpha(grad.resize((W, H)))
    base.alpha_composite(shade)
    # caption text
    font = ImageFont.truetype(FONTP, size)
    lines = wrap(d, text, font, W - 90)
    lh = size + 12
    total = lh * len(lines)
    y = int(H * 0.74) - total // 2
    for ln in lines:
        tw = d.textlength(ln, font=font)
        x = (W - tw) / 2
        d.text((x, y), ln, font=font, fill=(255, 255, 255, 255),
               stroke_width=4, stroke_fill=(0, 0, 0, 220))
        y += lh
    # small logo top-center
    lw = 120
    lg = logo.resize((lw, round(lw * logo.height / logo.width)), Image.LANCZOS)
    base.alpha_composite(lg, ((W - lw) // 2, 46))
    return base

def still_beat(imgpath, text, name):
    base = cover(Image.open(imgpath).convert("RGBA"), W, H)
    base = draw_caption(base, text)
    jpg = WORK / f"{name}.jpg"; base.convert("RGB").save(jpg, "JPEG", quality=90)
    out = WORK / f"{name}.mp4"
    subprocess.run([FF, "-y", "-loop", "1", "-i", str(jpg), "-t", "4", "-r", str(FPS),
                    "-c:v", "libx264", "-preset", "veryfast", "-pix_fmt", "yuv420p",
                    "-an", str(out)], check=True, capture_output=True)
    return out

def video_beat(vidpath, text, name):
    # caption overlay PNG
    ov = draw_caption(Image.new("RGBA", (W, H), (0, 0, 0, 0)), text)
    ovp = WORK / f"{name}_ov.png"; ov.save(ovp)
    out = WORK / f"{name}.mp4"
    subprocess.run([FF, "-y", "-i", str(vidpath), "-i", str(ovp), "-t", "4", "-r", str(FPS),
                    "-filter_complex",
                    f"[0:v]scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H}[v];[v][1:v]overlay=0:0",
                    "-c:v", "libx264", "-preset", "veryfast", "-pix_fmt", "yuv420p",
                    "-an", str(out)], check=True, capture_output=True)
    return out

def end_card(name):
    base = Image.new("RGBA", (W, H), (11, 11, 13, 255))
    lw = 440
    lg = logo.resize((lw, round(lw * logo.height / logo.width)), Image.LANCZOS)
    base.alpha_composite(lg, ((W - lw) // 2, int(H * 0.26)))
    d = ImageDraw.Draw(base)
    f1 = ImageFont.truetype(FONTP, 50); f2 = ImageFont.truetype(FONTP, 38)
    for txt, font, yy, col in [("ENVOYEZ UNE PHOTO", f1, 0.66, (245, 245, 240)),
                                ("SOUMISSION GRATUITE", f2, 0.73, (245, 197, 24))]:
        tw = d.textlength(txt, font=font)
        d.text(((W - tw) / 2, H * yy), txt, font=font, fill=col, stroke_width=3, stroke_fill=(0, 0, 0, 200))
    jpg = WORK / f"{name}.jpg"; base.convert("RGB").save(jpg, "JPEG", quality=92)
    out = WORK / f"{name}.mp4"
    subprocess.run([FF, "-y", "-loop", "1", "-i", str(jpg), "-t", "3", "-r", str(FPS),
                    "-c:v", "libx264", "-preset", "veryfast", "-pix_fmt", "yuv420p",
                    "-an", str(out)], check=True, capture_output=True)
    return out

beats = [
    still_beat(PROJ / "before-after-before.jpg", "Votre entrée est\ndevenue grise ?", "b1"),
    video_beat(PROJ / "video/process-blowers.mp4", "Préparation à sec\nsans eau", "b2"),
    video_beat(PROJ / "video/process-spray.mp4", "Scellant pulvérisé\nsous pression", "b3"),
    still_beat(PROJ / "before-after-after.jpg", "Une transformation\nqui se voit.", "b4"),
    end_card("b5"),
]

lst = WORK / "list.txt"
lst.write_text("".join(f"file '{b}'\n" for b in beats))
silent = WORK / "silent.mp4"
subprocess.run([FF, "-y", "-f", "concat", "-safe", "0", "-i", str(lst), "-c", "copy", str(silent)],
               check=True, capture_output=True)

final = OUT / "ad-transformation-9x16.mp4"
subprocess.run([FF, "-y", "-i", str(silent), "-i", str(vo),
                "-map", "0:v", "-map", "1:a", "-c:v", "libx264", "-preset", "veryfast",
                "-pix_fmt", "yuv420p", "-crf", "23", "-c:a", "aac", "-b:a", "160k",
                "-movflags", "+faststart", str(final)], check=True, capture_output=True)
subprocess.run([FF, "-y", "-i", str(final), "-frames:v", "1", str(OUT / "ad-poster.jpg")],
               check=True, capture_output=True)
print("OK", final, final.stat().st_size // 1024, "KB")
PY = None

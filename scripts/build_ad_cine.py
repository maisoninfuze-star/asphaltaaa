#!/usr/bin/env python3
"""Assemble the CINEMATIC (fully-AI) Meta ad (9:16, 1080x1920) from the generated
cine beats: faded → dry prep → repair → spray → sealed → CTA. Crossfades + captions
+ ElevenLabs French VO. Usage: build_ad_cine.py <vo_mp3_url>"""
import sys, subprocess, tempfile, urllib.request, pathlib
from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
FF = str(ROOT / "node_modules/ffmpeg-static/ffmpeg")
CINE = ROOT / "public/assets/ads/cine"
OUT = ROOT / "public/assets/ads"; OUT.mkdir(parents=True, exist_ok=True)
W, H, FPS = 1080, 1920, 30
DUR, END, XF = 3.2, 3.0, 0.5
FONTP = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
WORK = pathlib.Path(tempfile.mkdtemp())
vo = WORK / "vo.mp3"; urllib.request.urlretrieve(sys.argv[1], vo)
logo = Image.open(ROOT / "public/assets/brand/logo.png").convert("RGBA")

def wrap(d, text, font, maxw):
    out = []
    for para in text.split("\n"):
        cur = ""
        for w in para.split():
            t = (cur + " " + w).strip()
            if cur and d.textlength(t, font=font) > maxw:
                out.append(cur); cur = w
            else:
                cur = t
        out.append(cur)
    return out

def caption_layer(text, size=64):
    base = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(base)
    grad = Image.new("L", (1, H))
    for y in range(H):
        grad.putpixel((0, y), 0 if y < H * 0.6 else min(int(205 * (y - H * 0.6) / (H * 0.4)), 205))
    shade = Image.new("RGBA", (W, H), (8, 8, 10, 255)); shade.putalpha(grad.resize((W, H)))
    base.alpha_composite(shade)
    font = ImageFont.truetype(FONTP, size); lines = wrap(d, text, font, W - 140); lh = size + 16
    y = int(H * 0.74) - lh * len(lines) // 2
    for ln in lines:
        d.text(((W - d.textlength(ln, font=font)) / 2, y), ln, font=font, fill=(255, 255, 255, 255),
               stroke_width=5, stroke_fill=(0, 0, 0, 220)); y += lh
    lw = 170; lg = logo.resize((lw, round(lw * logo.height / logo.width)), Image.LANCZOS)
    base.alpha_composite(lg, ((W - lw) // 2, 64))
    return base

def clip_beat(vid, text, name, dur):
    ov = WORK / f"{name}.png"; caption_layer(text).save(ov)
    out = WORK / f"{name}.mp4"
    subprocess.run([FF, "-y", "-i", str(vid), "-i", str(ov), "-t", str(dur), "-r", str(FPS),
                    "-filter_complex",
                    f"[0:v]scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},setsar=1[b];[b][1:v]overlay=0:0[v]",
                    "-map", "[v]", "-c:v", "libx264", "-preset", "veryfast", "-pix_fmt", "yuv420p",
                    "-an", str(out)], check=True, capture_output=True)
    return out

def end_card(name):
    base = Image.new("RGBA", (W, H), (11, 11, 13, 255))
    lw = 640; lg = logo.resize((lw, round(lw * logo.height / logo.width)), Image.LANCZOS)
    base.alpha_composite(lg, ((W - lw) // 2, int(H * 0.24)))
    d = ImageDraw.Draw(base)
    for txt, sz, yy, col in [("ENVOYEZ UNE PHOTO", 72, 0.64, (245, 245, 240)),
                              ("SOUMISSION GRATUITE", 54, 0.72, (245, 197, 24))]:
        f = ImageFont.truetype(FONTP, sz)
        d.text(((W - d.textlength(txt, font=f)) / 2, H * yy), txt, font=f, fill=col, stroke_width=3, stroke_fill=(0, 0, 0, 200))
    jpg = WORK / f"{name}.jpg"; base.convert("RGB").save(jpg, "JPEG", quality=92)
    out = WORK / f"{name}.mp4"
    subprocess.run([FF, "-y", "-loop", "1", "-i", str(jpg), "-t", str(END), "-r", str(FPS),
                    "-vf", f"scale={W}:{H},setsar=1", "-c:v", "libx264", "-preset", "veryfast",
                    "-pix_fmt", "yuv420p", "-an", str(out)], check=True, capture_output=True)
    return out

BEATS = [
    ("faded", "Votre entrée est\ndevenue grise ?"),
    ("cleaning", "Préparation à sec\nsans eau"),
    ("repair", "Réparation des fissures\net des trous"),
    ("spray", "Scellant pulvérisé\nsous pression"),
    ("sealed", "Une transformation\nqui se voit."),
]
beats, durs = [], []
for i, (nm, cap) in enumerate(BEATS):
    beats.append(clip_beat(CINE / f"{nm}.mp4", cap, f"b{i}", DUR)); durs.append(DUR)
beats.append(end_card("bend")); durs.append(END)

inputs = []
for b in beats: inputs += ["-i", str(b)]
acc, last, parts = durs[0], "0:v", []
for i in range(1, len(beats)):
    off = acc - XF; outl = f"x{i}"
    parts.append(f"[{last}][{i}:v]xfade=transition=fade:duration={XF}:offset={off:.2f}[{outl}]")
    last = outl; acc += durs[i] - XF
silent = WORK / "silent.mp4"
subprocess.run([FF, "-y", *inputs, "-filter_complex", ";".join(parts), "-map", f"[{last}]",
                "-r", str(FPS), "-c:v", "libx264", "-preset", "veryfast", "-pix_fmt", "yuv420p", str(silent)],
               check=True, capture_output=True)
final = OUT / "ad-cinematic-9x16.mp4"
subprocess.run([FF, "-y", "-i", str(silent), "-i", str(vo), "-map", "0:v", "-map", "1:a",
                "-c:v", "libx264", "-preset", "veryfast", "-pix_fmt", "yuv420p", "-crf", "22",
                "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", str(final)], check=True, capture_output=True)
subprocess.run([FF, "-y", "-i", str(final), "-frames:v", "1", str(OUT / "ad-cinematic-poster.jpg")], check=True, capture_output=True)
print("OK", final, final.stat().st_size // 1024, "KB")

#!/usr/bin/env python3
"""Build the primary Meta ad (9:16, 1080x1920): faded → dry prep → spray → sealed → CTA.
Real motion footage throughout + crossfades. Captions baked in PIL (French-safe).
Usage: build_ad.py <vo_mp3_url>"""
import os, sys, subprocess, tempfile, urllib.request, pathlib
from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
FF = str(ROOT / "node_modules/ffmpeg-static/ffmpeg")
PROJ = ROOT / "public/assets/projects"
OUT = ROOT / "public/assets/ads"; OUT.mkdir(parents=True, exist_ok=True)
W, H, FPS = 1080, 1920, 30
DUR, XF = 4.0, 0.5           # per-beat seconds, crossfade seconds
FONTP = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
WORK = pathlib.Path(tempfile.mkdtemp())

vo = WORK / "vo.mp3"; urllib.request.urlretrieve(sys.argv[1], vo)
logo = Image.open(ROOT / "public/assets/brand/logo.png").convert("RGBA")

def wrap(draw, text, font, maxw):
    out = []
    for para in text.split("\n"):
        cur = ""
        for w in para.split():
            t = (cur + " " + w).strip()
            if cur and draw.textlength(t, font=font) > maxw:
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
    font = ImageFont.truetype(FONTP, size)
    lines = wrap(d, text, font, W - 140); lh = size + 16
    y = int(H * 0.74) - lh * len(lines) // 2
    for ln in lines:
        x = (W - d.textlength(ln, font=font)) / 2
        d.text((x, y), ln, font=font, fill=(255, 255, 255, 255), stroke_width=5, stroke_fill=(0, 0, 0, 220)); y += lh
    lw = 170; lg = logo.resize((lw, round(lw * logo.height / logo.width)), Image.LANCZOS)
    base.alpha_composite(lg, ((W - lw) // 2, 64))
    return base

def enc(vf_inputs, filt, out, dur):
    subprocess.run([FF, "-y", *vf_inputs, "-t", str(dur), "-r", str(FPS), "-filter_complex", filt,
                    "-map", "[v]", "-c:v", "libx264", "-preset", "veryfast", "-pix_fmt", "yuv420p",
                    "-an", str(out)], check=True, capture_output=True)

def video_beat(vid, text, name):
    ov = WORK / f"{name}.png"; caption_layer(text).save(ov)
    out = WORK / f"{name}.mp4"
    enc(["-i", str(vid), "-i", str(ov)],
        f"[0:v]scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},setsar=1[b];[b][1:v]overlay=0:0[v]",
        out, DUR)
    return out

def still_beat(img, text, name):
    ov = WORK / f"{name}.png"; caption_layer(text).save(ov)
    out = WORK / f"{name}.mp4"
    enc(["-loop", "1", "-i", str(img), "-i", str(ov)],
        f"[0:v]scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},setsar=1[b];[b][1:v]overlay=0:0[v]",
        out, DUR)
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
    enc(["-loop", "1", "-i", str(jpg)], f"[0:v]scale={W}:{H},setsar=1[v]", out, 3.0)
    return out

V = PROJ / "video"
def pick(*names):  # first existing clip
    for n in names:
        if (V / n).exists(): return V / n
    return V / names[-1]

beats = [
    video_beat(pick("real-before.mp4"), "Votre entrée est\ndevenue grise ?", "b1")
        if (V / "real-before.mp4").exists() else still_beat(PROJ / "before-after-before.jpg", "Votre entrée est\ndevenue grise ?", "b1"),
    video_beat(V / "process-blowers.mp4", "Préparation à sec\nsans eau", "b2"),
    video_beat(V / "process-spray.mp4", "Scellant pulvérisé\nsous pression", "b3"),
    video_beat(pick("real-after.mp4"), "Une transformation\nqui se voit.", "b4")
        if (V / "real-after.mp4").exists() else still_beat(PROJ / "before-after-after.jpg", "Une transformation\nqui se voit.", "b4"),
    end_card("b5"),
]

# Crossfade chain
durs = [DUR, DUR, DUR, DUR, 3.0]
inputs = []
for b in beats: inputs += ["-i", str(b)]
acc = durs[0]
last = "0:v"
parts = []
for i in range(1, len(beats)):
    off = acc - XF
    outl = f"x{i}"
    parts.append(f"[{last}][{i}:v]xfade=transition=fade:duration={XF}:offset={off:.2f}[{outl}]")
    last = outl
    acc += durs[i] - XF
filt = ";".join(parts)
finlabel = last
silent = WORK / "silent.mp4"
subprocess.run([FF, "-y", *inputs, "-filter_complex", filt, "-map", f"[{finlabel}]",
                "-r", str(FPS), "-c:v", "libx264", "-preset", "veryfast", "-pix_fmt", "yuv420p", str(silent)],
               check=True, capture_output=True)

final = OUT / "ad-transformation-9x16.mp4"
subprocess.run([FF, "-y", "-i", str(silent), "-i", str(vo), "-map", "0:v", "-map", "1:a",
                "-c:v", "libx264", "-preset", "veryfast", "-pix_fmt", "yuv420p", "-crf", "22",
                "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", str(final)], check=True, capture_output=True)
subprocess.run([FF, "-y", "-i", str(final), "-frames:v", "1", str(OUT / "ad-poster.jpg")], check=True, capture_output=True)
print("OK", final, final.stat().st_size // 1024, "KB")

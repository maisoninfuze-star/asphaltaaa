#!/usr/bin/env python3
"""Turn the REAL project photos into cinematic motion clips via Kling i2v
(data-URI input = fully grounded in the real photo, minimal 'AI look')."""
import base64, json, os, sys, time, subprocess, urllib.request, pathlib
import concurrent.futures as cf

FAL = os.environ["FAL_KEY"].strip()
ROOT = pathlib.Path(__file__).resolve().parent.parent
VID = ROOT / "public/assets/projects/video"; VID.mkdir(parents=True, exist_ok=True)
FF = str(ROOT / "node_modules/ffmpeg-static/ffmpeg")
H = {"Authorization": f"Key {FAL}", "Content-Type": "application/json"}

def post(u, b): return json.load(urllib.request.urlopen(urllib.request.Request(u, data=json.dumps(b).encode(), headers=H, method="POST"), timeout=240))
def get(u): return json.load(urllib.request.urlopen(urllib.request.Request(u, headers={"Authorization": f"Key {FAL}"}), timeout=180))
def durl(p): return "data:image/jpeg;base64," + base64.b64encode(pathlib.Path(p).read_bytes()).decode()

JOBS = [
    ("real-before", "public/assets/projects/before-after-before.jpg",
     "Very slow subtle cinematic push forward over the faded grey aging asphalt driveway, "
     "gentle realistic handheld feel, documentary, natural light, no warping, no morphing"),
    ("real-after", "public/assets/projects/before-after-after.jpg",
     "Very slow subtle push forward over the freshly sealed deep-black asphalt driveway, gentle "
     "light reflection drifting on the wet-look finish, realistic documentary, no warping"),
    ("real-white-house", "public/assets/projects/project-white-house.jpg",
     "Slow subtle cinematic push toward the white house with the newly sealed dark driveway, "
     "gentle realistic motion, natural daylight, documentary, no warping, no morphing"),
    ("real-brick", "public/assets/projects/driveway-brick-houses.jpg",
     "Slow subtle push up the freshly sealed black asphalt driveway between the brick houses, "
     "realistic documentary footage, gentle handheld, no warping"),
]

def gen(job):
    name, path, motion = job
    try:
        model = "fal-ai/kling-video/v1.6/standard/image-to-video"
        sub = post(f"https://queue.fal.run/{model}", {
            "prompt": motion, "image_url": durl(path), "duration": "5",
            "negative_prompt": "warping, morphing, distortion, text, blur, jitter, extra objects, cartoon, painting",
            "cfg_scale": 0.5,
        })
        su, ru = sub["status_url"], sub["response_url"]
        for _ in range(120):
            time.sleep(6)
            if get(su).get("status") == "COMPLETED": break
        else: return f"{name}: timeout"
        raw = VID / f"{name}-raw.mp4"
        raw.write_bytes(urllib.request.urlopen(get(ru)["video"]["url"], timeout=300).read())
        web = VID / f"{name}.mp4"
        subprocess.run([FF, "-y", "-i", str(raw), "-c:v", "libx264", "-preset", "veryfast",
                        "-pix_fmt", "yuv420p", "-crf", "24", "-an", "-movflags", "+faststart", str(web)],
                       check=True, capture_output=True)
        raw.unlink(missing_ok=True)
        return f"{name}: OK ({web.stat().st_size//1024} KB)"
    except Exception as e:
        return f"{name}: ERR {e}"

with cf.ThreadPoolExecutor(max_workers=4) as ex:
    for m in ex.map(gen, JOBS): print(m)

#!/usr/bin/env python3
"""HD-upscale the real project photos (fal esrgan) and generate cinematic videos
from the best ones (fal Kling i2v). Real photos → subtle, realistic motion only.
Outputs HD jpgs to public/assets/projects/ and mp4s to public/assets/projects/video/."""
import base64, json, os, sys, time, subprocess, urllib.request, pathlib
import concurrent.futures as cf
from io import BytesIO
from PIL import Image

FAL = os.environ.get("FAL_KEY", "").strip()
if not FAL or FAL == "<set>":
    print("FAL_KEY missing", file=sys.stderr); sys.exit(1)

ROOT = pathlib.Path(__file__).resolve().parent.parent
PROJ = ROOT / "public/assets/projects"
VID = PROJ / "video"
VID.mkdir(parents=True, exist_ok=True)
FFMPEG = str(ROOT / "node_modules/ffmpeg-static/ffmpeg")
H = {"Authorization": f"Key {FAL}", "Content-Type": "application/json"}

def post(url, body):
    req = urllib.request.Request(url, data=json.dumps(body).encode(), headers=H, method="POST")
    with urllib.request.urlopen(req, timeout=240) as r:
        return json.load(r)

def get(url):
    req = urllib.request.Request(url, headers={"Authorization": f"Key {FAL}"})
    with urllib.request.urlopen(req, timeout=180) as r:
        return json.load(r)

def data_uri(path):
    return "data:image/jpeg;base64," + base64.b64encode(pathlib.Path(path).read_bytes()).decode()

def upscale(name):
    """esrgan 2x → save HD jpg (capped 2600px), return the fal-hosted URL for i2v."""
    src = PROJ / name
    try:
        r = post("https://fal.run/fal-ai/esrgan", {"image_url": data_uri(src), "scale": 2})
        url = r["image"]["url"]
        raw = urllib.request.urlopen(url, timeout=240).read()
        im = Image.open(BytesIO(raw)).convert("RGB")
        if im.width > 2600:
            im = im.resize((2600, round(2600 * im.height / im.width)), Image.LANCZOS)
        im.save(src, "JPEG", quality=88, optimize=True)
        return name, url, f"{im.width}x{im.height}"
    except Exception as e:
        return name, None, f"ERR {e}"

PHOTOS = [
    "driveway-blue-house.jpg", "driveway-brick-houses.jpg", "driveway-faded-worker.jpg",
    "before-after-after.jpg", "before-after-before.jpg", "project-white-house.jpg",
    "process-spray-estate.jpg", "process-blowers.jpg", "warning-peeling.jpg",
]

# (output video name, source photo, motion prompt) — subtle realistic motion only.
VIDEOS = [
    ("hero-driveway", "driveway-blue-house.jpg",
     "Very slow subtle cinematic forward push over the freshly sealed jet-black asphalt driveway "
     "in front of the house, gentle drift, leaves and grass shifting slightly in the breeze, "
     "realistic documentary footage, stable, no warping, no morphing"),
    ("process-blowers", "process-blowers.jpg",
     "Subtle realistic motion: fine dust drifting in the sunlight as two workers clean the surface "
     "with a backpack blower and broom, gentle handheld feel, documentary, no warping"),
    ("process-spray", "process-spray-estate.jpg",
     "Subtle realistic motion: workers applying sealant on a large driveway, gentle spray mist and "
     "clouds drifting slowly, calm stable footage, documentary, no warping, no morphing"),
]

def make_video(job, urls):
    name, photo, motion = job
    img_url = urls.get(photo)
    if not img_url:
        return f"VID {name}: no upscaled url"
    try:
        model = "fal-ai/kling-video/v1.6/standard/image-to-video"
        sub = post(f"https://queue.fal.run/{model}", {
            "prompt": motion, "image_url": img_url, "duration": "5",
            "negative_prompt": "warping, morphing, distortion, text, blur, jitter, extra limbs",
            "cfg_scale": 0.5,
        })
        su, ru = sub["status_url"], sub["response_url"]
        for _ in range(120):
            time.sleep(6)
            if get(su).get("status") == "COMPLETED":
                break
        else:
            return f"VID {name}: timeout"
        vurl = get(ru)["video"]["url"]
        raw = VID / f"{name}-raw.mp4"
        raw.write_bytes(urllib.request.urlopen(vurl, timeout=300).read())
        web = VID / f"{name}.mp4"
        subprocess.run([FFMPEG, "-y", "-i", str(raw), "-vf", "scale='min(1920,iw)':-2",
                        "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p", "-crf", "25",
                        "-preset", "slow", "-an", "-movflags", "+faststart", str(web)],
                       check=True, capture_output=True)
        raw.unlink(missing_ok=True)
        return f"VID {name}: OK ({web.stat().st_size//1024} KB)"
    except Exception as e:
        return f"VID {name}: ERR {e}"

def main():
    print("Upscaling to HD…")
    urls = {}
    with cf.ThreadPoolExecutor(max_workers=5) as ex:
        for name, url, info in ex.map(upscale, PHOTOS):
            print(f"  {name}: {info}")
            if url:
                urls[name] = url
    print("Generating videos…")
    with cf.ThreadPoolExecutor(max_workers=3) as ex:
        for msg in ex.map(lambda j: make_video(j, urls), VIDEOS):
            print(" ", msg)
    print("Done.")

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Generate scellant-division visuals via fal.ai (Flux images + one Kling hero video).
Saves to public/assets/generated/scellant/. Stdlib only. All assets are replaceable placeholders."""
import json, os, sys, time, subprocess, urllib.request, pathlib
import concurrent.futures as cf

FAL_KEY = os.environ.get("FAL_KEY", "").strip()
if not FAL_KEY or FAL_KEY == "<set>":
    print("FAL_KEY missing", file=sys.stderr); sys.exit(1)

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "public/assets/generated/scellant"
OUT.mkdir(parents=True, exist_ok=True)
FFMPEG = str(ROOT / "node_modules/ffmpeg-static/ffmpeg")
H = {"Authorization": f"Key {FAL_KEY}", "Content-Type": "application/json"}

STYLE = ("cinematic editorial photograph, industrial luxury, moody dramatic light, deep shadows, "
         "high dynamic range, ultra sharp, photorealistic, no text, no watermark")

# Flux still images: (name, aspect, prompt)
IMAGES = [
    ("hero-montreal", "16:9",
     "Freshly sealcoated residential asphalt driveway with a deep glossy jet-black wet-look finish "
     "in front of a Montreal suburban home on the South Shore, clean crisp edges, low evening sun. " + STYLE),
    ("hero-quebec", "16:9",
     "Freshly sealcoated asphalt driveway with deep glossy black finish in front of an elegant home "
     "in the Quebec City region, mature trees, golden hour, pristine surface. " + STYLE),
    ("hero-rimouski", "16:9",
     "Freshly sealcoated asphalt driveway deep glossy black finish at a coastal Bas-Saint-Laurent "
     "property near Rimouski, soft maritime light, clean crisp edges. " + STYLE),
    ("ba-faded", "16:10",
     "Old faded grey weathered asphalt driveway, sun-bleached surface, fine hairline cracks, dull, "
     "worn, before maintenance, overcast flat documentary light. " + STYLE),
    ("ba-sealed", "16:10",
     "The same driveway freshly sealcoated with a deep uniform jet-black glossy finish, crisp clean "
     "edges, rich saturated black, after maintenance, warm evening light, documentary. " + STYLE),
    ("tx-cleaning", "4:5",
     "High pressure washing preparation of an asphalt driveway before sealcoating, water spray arc, "
     "clean wet surface, backlit droplets, professional. " + STYLE),
    ("tx-application", "4:5",
     "Worker applying black asphalt sealant with a squeegee applicator on a driveway, glossy wet "
     "sealant spreading in a smooth band, close detail, dramatic side light. " + STYLE),
    ("tx-protected", "4:5",
     "Finished sealcoated asphalt driveway, flawless deep black protective finish, water beading on "
     "the surface, crisp painted edge line, premium residential, evening light. " + STYLE),
]

# Kling i2v hero video, generated from a freshly-rendered frame
VIDEO = {
    "name": "hero",
    "frame": ("Slow cinematic ground-level shot of black asphalt sealant being applied and spreading "
              "into a deep glossy uniform finish on a residential driveway at golden dusk, wet sheen, "
              "clean edge line, premium. " + STYLE),
    "motion": ("Slow smooth cinematic push forward across the freshly sealed glossy black asphalt "
               "surface, subtle wet sheen and reflections drifting, calm restorative motion, no cuts, no warping"),
}

def post(url, body):
    req = urllib.request.Request(url, data=json.dumps(body).encode(), headers=H, method="POST")
    with urllib.request.urlopen(req, timeout=180) as r:
        return json.load(r)

def get(url):
    req = urllib.request.Request(url, headers={"Authorization": f"Key {FAL_KEY}"})
    with urllib.request.urlopen(req, timeout=180) as r:
        return json.load(r)

def download(url, dest):
    with urllib.request.urlopen(url, timeout=300) as r:
        dest.write_bytes(r.read())

def gen_image(job):
    name, ar, prompt = job
    try:
        r = post("https://fal.run/fal-ai/flux-pro/v1.1-ultra", {
            "prompt": prompt, "aspect_ratio": ar, "num_images": 1,
            "output_format": "jpeg", "enable_safety_checker": True,
        })
        download(r["images"][0]["url"], OUT / f"{name}.jpg")
        return f"IMG  {name} OK"
    except Exception as e:
        return f"IMG  {name} ERR {e}"

def gen_video(v):
    try:
        flux = post("https://fal.run/fal-ai/flux-pro/v1.1-ultra", {
            "prompt": v["frame"], "aspect_ratio": "16:9", "num_images": 1,
            "output_format": "jpeg", "enable_safety_checker": True,
        })
        image_url = flux["images"][0]["url"]
        download(image_url, OUT / f"{v['name']}-poster.jpg")
        model = "fal-ai/kling-video/v1.6/standard/image-to-video"
        sub = post(f"https://queue.fal.run/{model}", {
            "prompt": v["motion"], "image_url": image_url, "duration": "5",
            "negative_prompt": "blur, distortion, warping, morphing, text, people, jitter", "cfg_scale": 0.5,
        })
        status_url, response_url = sub["status_url"], sub["response_url"]
        for _ in range(120):
            time.sleep(6)
            s = get(status_url).get("status")
            if s == "COMPLETED": break
            if s in ("FAILED", "ERROR"): return f"VID  {v['name']} FAILED"
        else:
            return f"VID  {v['name']} timeout"
        raw = OUT / f"{v['name']}-raw.mp4"
        download(get(response_url)["video"]["url"], raw)
        web = OUT / f"{v['name']}.mp4"
        subprocess.run([FFMPEG, "-y", "-i", str(raw), "-vf", "scale='min(1920,iw)':-2",
                        "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p", "-crf", "25",
                        "-preset", "slow", "-an", "-movflags", "+faststart", str(web)],
                       check=True, capture_output=True)
        raw.unlink(missing_ok=True)
        return f"VID  {v['name']} OK ({web.stat().st_size//1024} KB)"
    except Exception as e:
        return f"VID  {v['name']} ERR {e}"

def main():
    print(f"Generating {len(IMAGES)} images + 1 hero video -> {OUT}")
    with cf.ThreadPoolExecutor(max_workers=6) as ex:
        futs = [ex.submit(gen_image, j) for j in IMAGES]
        futs.append(ex.submit(gen_video, VIDEO))
        for f in cf.as_completed(futs):
            print(f.result())

if __name__ == "__main__":
    main()

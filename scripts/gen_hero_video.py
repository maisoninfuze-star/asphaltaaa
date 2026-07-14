#!/usr/bin/env python3
"""Generate a cinematic hero video via fal.ai.
1. Flux Pro Ultra renders a golden-hour aerial frame (keeps the hosted URL).
2. Kling image-to-video animates it into a slow drone push.
Saves public/assets/generated/hero.mp4 (+ hero-poster.jpg). Stdlib only."""
import json, os, sys, time, urllib.request, urllib.error, pathlib

FAL_KEY = os.environ.get("FAL_KEY", "").strip()
if not FAL_KEY or FAL_KEY == "<set>":
    print("FAL_KEY missing", file=sys.stderr); sys.exit(1)

OUT = pathlib.Path(__file__).resolve().parent.parent / "public/assets/generated"
OUT.mkdir(parents=True, exist_ok=True)
H = {"Authorization": f"Key {FAL_KEY}", "Content-Type": "application/json"}

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

STYLE = ("cinematic editorial photograph, industrial luxury, moody dramatic golden "
         "hour light, deep shadows, high dynamic range, ultra sharp, photorealistic, "
         "no text, no watermark")

def main():
    # 1. Render the hero frame, keep the hosted URL for i2v.
    print("→ Rendering hero frame (Flux Pro Ultra)…")
    flux = post("https://fal.run/fal-ai/flux-pro/v1.1-ultra", {
        "prompt": ("Aerial drone shot descending slowly over a freshly paved jet-black "
                   "asphalt driveway curving through an upscale green property at golden "
                   "dusk, crisp new surface glistening, gravel edges, long shadows, "
                   "sun flare low on the horizon. " + STYLE),
        "aspect_ratio": "16:9",
        "num_images": 1,
        "output_format": "jpeg",
        "enable_safety_checker": True,
    })
    image_url = flux["images"][0]["url"]
    print("  frame:", image_url)
    download(image_url, OUT / "hero-poster.jpg")
    print("  saved hero-poster.jpg")

    # 2. Animate → Kling image-to-video (queue + poll).
    model = "fal-ai/kling-video/v1.6/standard/image-to-video"
    print(f"→ Animating (Kling i2v)… this takes a few minutes")
    sub = post(f"https://queue.fal.run/{model}", {
        "prompt": ("Slow smooth cinematic aerial drone push forward and gentle descent "
                   "over the freshly paved asphalt driveway, subtle light rays and lens "
                   "flare, grass swaying softly, stable professional footage, no cuts"),
        "image_url": image_url,
        "duration": "5",
        "negative_prompt": "blur, distortion, warping, morphing, text, people, cars, jitter",
        "cfg_scale": 0.5,
    })
    status_url = sub["status_url"]
    response_url = sub["response_url"]
    print("  request:", sub.get("request_id"))

    for i in range(120):  # up to ~12 min
        time.sleep(6)
        st = get(status_url)
        s = st.get("status")
        print(f"  [{i*6:>3}s] {s}")
        if s == "COMPLETED":
            break
        if s in ("FAILED", "ERROR"):
            print("  FAILED:", json.dumps(st)[:400], file=sys.stderr); sys.exit(2)
    else:
        print("  timed out", file=sys.stderr); sys.exit(3)

    res = get(response_url)
    video_url = res["video"]["url"]
    print("  video:", video_url)
    download(video_url, OUT / "hero.mp4")
    size = (OUT / "hero.mp4").stat().st_size
    print(f"✓ saved hero.mp4 ({size//1024} KB)")

if __name__ == "__main__":
    main()

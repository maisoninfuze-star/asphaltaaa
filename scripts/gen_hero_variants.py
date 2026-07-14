#!/usr/bin/env python3
"""Generate ALTERNATIVE cinematic hero videos via fal.ai (Flux frame -> Kling i2v),
then transcode each to a web-optimized mp4. Variants run concurrently.
Outputs: public/assets/generated/hero-<key>.mp4 + hero-<key>.jpg (poster)."""
import json, os, sys, time, subprocess, urllib.request, pathlib
import concurrent.futures as cf

FAL_KEY = os.environ.get("FAL_KEY", "").strip()
if not FAL_KEY or FAL_KEY == "<set>":
    print("FAL_KEY missing", file=sys.stderr); sys.exit(1)

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "public/assets/generated"
OUT.mkdir(parents=True, exist_ok=True)
FFMPEG = str(ROOT / "node_modules/ffmpeg-static/ffmpeg")
H = {"Authorization": f"Key {FAL_KEY}", "Content-Type": "application/json"}

STYLE = ("cinematic editorial photograph, industrial luxury, moody dramatic light, "
         "deep shadows, high dynamic range, ultra sharp, photorealistic, no text, no watermark")

VARIANTS = [
    {
        "key": "alt1",
        "frame": ("Ground-level cinematic shot of a road paver laying steaming hot jet-black "
                  "asphalt at golden dusk, heat haze rising off the fresh glossy mat, a steel "
                  "drum roller following behind, worker silhouette with a rake, warm rim light, "
                  "industrial machinery detail. " + STYLE),
        "motion": ("Slow smooth cinematic push forward alongside the paver as it lays hot asphalt, "
                   "heat haze shimmering, steam drifting, roller moving behind, stable professional "
                   "footage, no cuts, no morphing"),
    },
    {
        "key": "alt2",
        "frame": ("High aerial drone shot rising and pulling back to reveal a large upscale estate "
                  "with a freshly paved jet-black asphalt driveway winding through manicured green "
                  "grounds and mature trees at golden hour, long shadows, pristine crisp surface. "
                  + STYLE),
        "motion": ("Slow cinematic aerial drone rising and pulling back to reveal the full estate "
                   "and winding driveway, smooth stable ascent, gentle parallax, no cuts, no warping"),
    },
]

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

def gen(v):
    key = v["key"]
    tag = f"[{key}]"
    try:
        flux = post("https://fal.run/fal-ai/flux-pro/v1.1-ultra", {
            "prompt": v["frame"], "aspect_ratio": "16:9", "num_images": 1,
            "output_format": "jpeg", "enable_safety_checker": True,
        })
        image_url = flux["images"][0]["url"]
        download(image_url, OUT / f"hero-{key}.jpg")
        print(f"{tag} frame ready, animating…")

        model = "fal-ai/kling-video/v1.6/standard/image-to-video"
        sub = post(f"https://queue.fal.run/{model}", {
            "prompt": v["motion"], "image_url": image_url, "duration": "5",
            "negative_prompt": "blur, distortion, warping, morphing, text, jitter, cars",
            "cfg_scale": 0.5,
        })
        status_url, response_url = sub["status_url"], sub["response_url"]
        for i in range(120):
            time.sleep(6)
            s = get(status_url).get("status")
            if s == "COMPLETED":
                break
            if s in ("FAILED", "ERROR"):
                return f"{tag} FAILED animation"
        else:
            return f"{tag} timed out"

        video_url = get(response_url)["video"]["url"]
        raw = OUT / f"hero-{key}-raw.mp4"
        download(video_url, raw)

        web = OUT / f"hero-{key}.mp4"
        subprocess.run([
            FFMPEG, "-y", "-i", str(raw),
            "-vf", "scale='min(1920,iw)':-2",
            "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
            "-crf", "25", "-preset", "slow", "-an", "-movflags", "+faststart",
            str(web),
        ], check=True, capture_output=True)
        raw.unlink(missing_ok=True)
        kb = web.stat().st_size // 1024
        return f"{tag} OK  hero-{key}.mp4 ({kb} KB)"
    except Exception as e:
        return f"{tag} ERROR {e}"

def main():
    print(f"Generating {len(VARIANTS)} hero variants…")
    with cf.ThreadPoolExecutor(max_workers=len(VARIANTS)) as ex:
        for msg in ex.map(gen, VARIANTS):
            print(msg)

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Generate a fully-cinematic (AI) ad beat set: premium 9:16 images (Flux Pro Ultra)
→ animated (Kling i2v) → transcoded clips. Saves to public/assets/ads/cine/."""
import base64, json, os, sys, time, subprocess, urllib.request, pathlib
import concurrent.futures as cf

FAL = os.environ["FAL_KEY"].strip()
ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "public/assets/ads/cine"; OUT.mkdir(parents=True, exist_ok=True)
FF = str(ROOT / "node_modules/ffmpeg-static/ffmpeg")
H = {"Authorization": f"Key {FAL}", "Content-Type": "application/json"}

def post(u, b): return json.load(urllib.request.urlopen(urllib.request.Request(u, data=json.dumps(b).encode(), headers=H, method="POST"), timeout=240))
def get(u): return json.load(urllib.request.urlopen(urllib.request.Request(u, headers={"Authorization": f"Key {FAL}"}), timeout=180))
def dl(u, p): p.write_bytes(urllib.request.urlopen(u, timeout=300).read())

STYLE = ("cinematic advertising photography, dramatic natural light, shallow depth of field, "
         "ultra sharp, photorealistic, premium, film grain, no text, no watermark, no people faces close up")

BEATS = [
    ("faded",
     "A residential asphalt driveway faded to dull grey with fine cracks, in front of a tidy "
     "Québec suburban home, soft moody overcast morning light. " + STYLE,
     "Very slow cinematic push forward over the faded cracked grey driveway, gentle, moody, realistic, no warping"),
    ("cleaning",
     "A worker in dark uniform using a professional backpack blower to clear dust off a residential "
     "asphalt driveway, fine dust drifting in warm backlight. " + STYLE,
     "Slow cinematic motion, dust drifting in the light as the worker clears the driveway, dynamic, realistic, no warping"),
    ("repair",
     "Extreme close-up of glossy black rubberized crack sealant filling a crack in a residential "
     "asphalt driveway, applicator tool, dramatic low side light, macro. " + STYLE,
     "Slow macro push along the freshly filled black crack line, glossy sealant setting, subtle, realistic, no warping"),
    ("spray",
     "A worker spray-applying black asphalt sealant under pressure onto a residential driveway, fine "
     "mist, freshly wet glossy black surface, golden hour rim light. " + STYLE,
     "Slow cinematic push as sealant is sprayed in a fine mist over the glossy black surface, golden light, realistic, no warping"),
    ("sealed",
     "A freshly sealed residential asphalt driveway with a deep glossy jet-black wet-look finish in "
     "front of an elegant home at dusk, warm window lights, pristine crisp edges. " + STYLE,
     "Slow cinematic aerial-style push over the flawless sealed black driveway at dusk, warm lights, premium, realistic, no warping"),
]

def gen(beat):
    name, frame, motion = beat
    try:
        flux = post("https://fal.run/fal-ai/flux-pro/v1.1-ultra", {
            "prompt": frame, "aspect_ratio": "9:16", "num_images": 1,
            "output_format": "jpeg", "enable_safety_checker": True})
        url = flux["images"][0]["url"]
        dl(url, OUT / f"{name}.jpg")
        model = "fal-ai/kling-video/v1.6/standard/image-to-video"
        sub = post(f"https://queue.fal.run/{model}", {
            "prompt": motion, "image_url": url, "duration": "5",
            "negative_prompt": "warping, morphing, distortion, text, blur, jitter, cartoon, painting, extra limbs",
            "cfg_scale": 0.5})
        su, ru = sub["status_url"], sub["response_url"]
        for _ in range(120):
            time.sleep(6)
            if get(su).get("status") == "COMPLETED": break
        else: return f"{name}: timeout"
        raw = OUT / f"{name}-raw.mp4"; dl(get(ru)["video"]["url"], raw)
        web = OUT / f"{name}.mp4"
        subprocess.run([FF, "-y", "-i", str(raw), "-c:v", "libx264", "-preset", "veryfast",
                        "-pix_fmt", "yuv420p", "-crf", "23", "-an", "-movflags", "+faststart", str(web)],
                       check=True, capture_output=True)
        raw.unlink(missing_ok=True)
        return f"{name}: OK ({web.stat().st_size//1024} KB)"
    except Exception as e:
        return f"{name}: ERR {e}"

with cf.ThreadPoolExecutor(max_workers=5) as ex:
    for m in ex.map(gen, BEATS): print(m)

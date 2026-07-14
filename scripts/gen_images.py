#!/usr/bin/env python3
"""Generate cinematic asphalt/construction imagery via fal.ai (Flux Pro Ultra).
Reads FAL_KEY from env. Saves to public/assets/generated/.
Runs generations concurrently. Stdlib only."""
import json, os, sys, urllib.request, urllib.error, pathlib, concurrent.futures as cf

FAL_KEY = os.environ.get("FAL_KEY", "").strip()
if not FAL_KEY or FAL_KEY == "<set>":
    print("FAL_KEY missing", file=sys.stderr); sys.exit(1)

OUT = pathlib.Path(__file__).resolve().parent.parent / "public/assets/generated"
OUT.mkdir(parents=True, exist_ok=True)

MODEL = "fal-ai/flux-pro/v1.1-ultra"

# Consistent art direction appended to every prompt.
STYLE = ("cinematic editorial photograph, industrial luxury, moody dramatic "
         "directional light, deep shadows, high dynamic range, ultra sharp, "
         "photorealistic, shot on 35mm, muted palette with subtle warm highlights, "
         "no text, no watermark, no people faces close up")

JOBS = [
    # name, aspect_ratio, prompt
    ("hero-aerial", "21:9",
     "Aerial drone shot at golden dusk of a freshly paved jet-black asphalt driveway "
     "curving through a large upscale property, crisp new surface glistening, "
     "surrounding green landscape and gravel edges, long shadows"),
    ("story-paver", "16:9",
     "Close cinematic shot of a road paving machine laying steaming hot black asphalt "
     "at dusk, heat haze rising, glossy fresh mat, industrial machinery, sparks of warm light"),
    ("svc-excavation", "4:5",
     "Yellow hydraulic excavator digging and grading raw earth on a construction site, "
     "fresh soil, tracks, overcast dramatic sky, heavy equipment detail"),
    ("svc-pavage", "4:5",
     "Hot asphalt being laid by a paver, steaming black surface, worker silhouette with rake, "
     "compaction roller in background, industrial dusk light"),
    ("svc-fondation", "4:5",
     "Compacted crushed stone gravel base layer for a driveway, plate compactor, "
     "textured aggregate close up, construction site, moody light"),
    ("svc-scellant", "4:5",
     "Freshly sealcoated asphalt driveway, deep glossy jet-black wet-look finish, "
     "clean crisp edges, luxury home, low evening sun reflection"),
    ("svc-reparations", "4:5",
     "Crack filling and pothole repair on asphalt, hot rubberized sealant line on black pavement, "
     "detail macro, industrial tools, dramatic side light"),
    ("svc-lavage", "4:5",
     "High pressure washing of a paver-stone and concrete surface, water spray arc, "
     "clean vs dirty contrast, backlit droplets, cinematic"),
    ("proj-residential", "16:10",
     "Elegant residential asphalt driveway newly paved in front of a modern Quebec home, "
     "clean black surface, landscaped, evening ambient light, architectural"),
    ("proj-commercial", "16:10",
     "Large freshly paved and line-painted commercial parking lot, crisp white and yellow "
     "parking lines on black asphalt, aerial perspective, dusk, empty and pristine"),
    ("ba-before", "16:10",
     "Old cracked deteriorated asphalt driveway with potholes, faded grey surface, weeds in cracks, "
     "worn edges, overcast flat light, documentary"),
    ("ba-after", "16:10",
     "The same driveway newly repaved with smooth flawless jet-black asphalt, crisp clean edges, "
     "sealed glossy finish, warm evening light, documentary"),
    ("equip-roller", "3:2",
     "Heavy steel drum road roller compactor on fresh asphalt, industrial machine portrait, "
     "yellow and black, dramatic studio-like site lighting, dusk"),
    ("equip-excavator", "3:2",
     "Yellow tracked excavator portrait on a dirt site, powerful hydraulic arm, "
     "dramatic low angle, moody industrial sky"),
]

def gen(job):
    name, ar, prompt = job
    body = json.dumps({
        "prompt": f"{prompt}. {STYLE}",
        "aspect_ratio": ar,
        "num_images": 1,
        "output_format": "jpeg",
        "enable_safety_checker": True,
    }).encode()
    req = urllib.request.Request(
        f"https://fal.run/{MODEL}",
        data=body,
        headers={"Authorization": f"Key {FAL_KEY}", "Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            data = json.load(r)
        url = data["images"][0]["url"]
        img = urllib.request.urlopen(url, timeout=180).read()
        dest = OUT / f"{name}.jpg"
        dest.write_bytes(img)
        return name, len(img), None
    except urllib.error.HTTPError as e:
        return name, 0, f"HTTP {e.code}: {e.read()[:200]}"
    except Exception as e:
        return name, 0, str(e)

def main():
    only = sys.argv[1:]
    jobs = [j for j in JOBS if not only or j[0] in only]
    print(f"Generating {len(jobs)} images -> {OUT}")
    with cf.ThreadPoolExecutor(max_workers=6) as ex:
        for name, size, err in ex.map(gen, jobs):
            print(f"{'OK ' if not err else 'ERR'} {name:18} {size//1024 if size else 0:>5} KB  {err or ''}")

if __name__ == "__main__":
    main()

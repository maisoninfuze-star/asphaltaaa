"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { projectStages } from "@/lib/site";

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const map = (v: number, a: number, b: number) => clamp((v - a) / (b - a));

export function ScrollStory() {
  const root = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const trench = useRef<HTMLDivElement>(null);
  const stone = useRef<HTMLDivElement>(null);
  const binder = useRef<HTMLDivElement>(null);
  const asphalt = useRef<HTMLDivElement>(null);
  const lanes = useRef<HTMLDivElement>(null);
  const paver = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const sub = useRef<HTMLSpanElement>(null);
  const railFill = useRef<HTMLDivElement>(null);
  const dots = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Reveal a finished state, no scroll animation.
      if (asphalt.current) asphalt.current.style.clipPath = "inset(0 0 0 0)";
      if (stone.current) stone.current.style.height = "100%";
      if (lanes.current) lanes.current.style.opacity = "1";
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Sync ScrollTrigger with Lenis (already running globally, but ensure update).
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    const onScroll = () => ScrollTrigger.update();
    lenis?.on("scroll", onScroll);

    let lastIdx = -1;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current!,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;

          // Rail
          if (railFill.current) railFill.current.style.height = `${p * 100}%`;

          // Active stage
          const idx = Math.min(6, Math.floor(p * 7));
          if (idx !== lastIdx) {
            lastIdx = idx;
            const s = projectStages[idx];
            if (num.current) num.current.textContent = s.n;
            if (label.current) label.current.textContent = s.label;
            if (sub.current) sub.current.textContent = s.sub;
            dots.current.forEach((d, i) => {
              if (d) d.style.opacity = i <= idx ? "1" : "0.25";
            });
          }

          // Layer builds
          if (trench.current)
            trench.current.style.opacity = `${map(p, 0.05, 0.16)}`;
          if (stone.current)
            stone.current.style.height = `${map(p, 0.2, 0.38) * 100}%`;
          if (binder.current)
            binder.current.style.opacity = `${map(p, 0.38, 0.5)}`;

          const sweep = map(p, 0.46, 0.72);
          if (asphalt.current)
            asphalt.current.style.clipPath = `inset(0 ${(1 - sweep) * 100}% 0 0)`;
          if (paver.current) {
            const active = p > 0.44 && p < 0.76;
            paver.current.style.opacity = active ? "1" : "0";
            paver.current.style.left = `${sweep * 100}%`;
          }
          if (lanes.current) lanes.current.style.opacity = `${map(p, 0.8, 0.92)}`;

          // Final aerial pull-back
          const pull = map(p, 0.9, 1);
          if (scene.current) {
            scene.current.style.transform = `perspective(1200px) rotateX(${
              (1 - pull) * 8 + 6
            }deg) scale(${1 - pull * 0.08})`;
          }
        },
      });
    }, root);

    ScrollTrigger.refresh();

    return () => {
      lenis?.off("scroll", onScroll);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} className="relative h-[560vh] bg-asphalt">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* Section heading */}
        <div className="container-x relative z-20 pt-24 lg:pt-28">
          <p className="eyebrow mb-4">Le chantier, couche par couche</p>
          <h2 className="display max-w-3xl text-3xl leading-[0.95] text-warm sm:text-4xl lg:text-5xl">
            Un projet complet, exécuté dans l&apos;ordre — sans raccourci.
          </h2>
        </div>

        {/* Stage rail (desktop) */}
        <div className="pointer-events-none absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 lg:left-12 lg:block">
          <div className="relative flex flex-col gap-4">
            <div className="absolute left-[3px] top-1 h-full w-px bg-warm/15">
              <div
                ref={railFill}
                className="w-full bg-hivis"
                style={{ height: "0%" }}
              />
            </div>
            {projectStages.map((s, i) => (
              <div
                key={s.key}
                ref={(el) => {
                  dots.current[i] = el;
                }}
                style={{ opacity: i === 0 ? 1 : 0.25 }}
                className="flex items-center gap-3 transition-opacity duration-300"
              >
                <span className="h-[7px] w-[7px] rounded-full bg-hivis" />
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-concrete-light">
                  {s.n} {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* The build scene */}
        <div className="relative flex flex-1 items-center justify-center">
          <div
            ref={scene}
            className="relative mx-auto aspect-[16/7] w-[86%] max-w-5xl origin-bottom"
            style={{ transform: "perspective(1200px) rotateX(14deg)" }}
          >
            {/* Subgrade (earth) */}
            <div className="absolute inset-0 overflow-hidden rounded-sm">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, #2a2118 0%, #1c1712 60%, #14100c 100%)",
                }}
              />
              {/* Excavated trench */}
              <div
                ref={trench}
                className="absolute inset-x-[6%] bottom-0 top-[34%] rounded-t-sm"
                style={{
                  opacity: 0,
                  background:
                    "linear-gradient(180deg, #0e0b08, #070605)",
                  boxShadow: "inset 0 8px 24px rgba(0,0,0,0.7)",
                }}
              />
              {/* Stone base 0-3/4 */}
              <div className="absolute inset-x-[6%] bottom-0 top-[34%] overflow-hidden rounded-t-sm">
                <div
                  ref={stone}
                  className="tex-asphalt absolute inset-x-0 bottom-0"
                  style={{
                    height: "0%",
                    background:
                      "linear-gradient(180deg, #6b6862 0%, #4a4843 100%)",
                  }}
                />
              </div>
              {/* Binder course */}
              <div
                ref={binder}
                className="absolute inset-x-[6%] top-[30%] h-[7%]"
                style={{ opacity: 0, background: "#2a2a2c" }}
              />
              {/* Asphalt surface (sweeps in) */}
              <div
                ref={asphalt}
                className="tex-asphalt absolute inset-x-[6%] top-[26%] h-[8%]"
                style={{
                  clipPath: "inset(0 100% 0 0)",
                  background:
                    "linear-gradient(180deg, #17171a 0%, #0d0d0f 100%)",
                }}
              >
                {/* Lane lines */}
                <div
                  ref={lanes}
                  className="absolute left-0 right-0 top-1/2 flex -translate-y-1/2 justify-between px-4"
                  style={{ opacity: 0 }}
                >
                  {Array.from({ length: 14 }).map((_, i) => (
                    <span key={i} className="h-[3px] w-6 bg-hivis/90" />
                  ))}
                </div>
              </div>
              {/* Paver / roller marker */}
              <div
                ref={paver}
                className="absolute top-[16%] z-10 -translate-x-1/2"
                style={{ left: "0%", opacity: 0 }}
              >
                <Roller />
              </div>
            </div>

            {/* Surface sheen */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-sm"
              style={{
                background:
                  "linear-gradient(180deg, rgba(245,197,24,0.06), transparent 30%)",
              }}
            />
          </div>
        </div>

        {/* Giant stage caption */}
        <div className="container-x relative z-20 flex items-end justify-between pb-16 lg:pb-20">
          <div>
            <span
              ref={num}
              className="font-mono text-sm tracking-[0.2em] text-hivis"
            >
              01
            </span>
            <span
              ref={label}
              className="display mt-1 block text-4xl text-warm sm:text-5xl lg:text-6xl"
            >
              Terrain brut
            </span>
            <span
              ref={sub}
              className="mt-2 block font-mono text-xs uppercase tracking-[0.18em] text-concrete"
            >
              Analyse &amp; marquage
            </span>
          </div>
          <span className="hidden font-mono text-xs text-concrete sm:block">
            07 étapes
          </span>
        </div>
      </div>
    </section>
  );
}

function Roller() {
  return (
    <svg width="72" height="52" viewBox="0 0 72 52" fill="none" aria-hidden>
      <rect x="26" y="8" width="30" height="16" rx="2" fill="#f5c518" />
      <rect x="30" y="2" width="16" height="10" rx="1.5" fill="#1b1b1f" />
      <rect x="18" y="26" width="42" height="10" rx="2" fill="#2a2a2c" />
      <circle cx="26" cy="42" r="9" fill="#0d0d0f" stroke="#3a3b40" strokeWidth="2" />
      <circle cx="52" cy="42" r="9" fill="#0d0d0f" stroke="#3a3b40" strokeWidth="2" />
      <rect x="8" y="38" width="12" height="10" rx="5" fill="#4a4843" />
    </svg>
  );
}

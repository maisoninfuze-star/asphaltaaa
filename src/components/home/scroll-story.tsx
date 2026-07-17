"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";
import { projectStages } from "@/lib/site";

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const map = (v: number, a: number, b: number) => clamp((v - a) / (b - a));

/**
 * Residential build story — a driveway is excavated, based, paved and sealed in
 * front of a house as you scroll. Pinned GSAP scrub; reduced-motion users get the
 * finished state with no animation.
 */
export function ScrollStory() {
  const root = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const trench = useRef<HTMLDivElement>(null);
  const stone = useRef<HTMLDivElement>(null);
  const asphalt = useRef<HTMLDivElement>(null);
  const sheen = useRef<HTMLDivElement>(null);
  const roller = useRef<HTMLDivElement>(null);
  const car = useRef<HTMLDivElement>(null);
  const glow = useRef<SVGGElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const sub = useRef<HTMLSpanElement>(null);
  const railFill = useRef<HTMLDivElement>(null);
  const dots = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (asphalt.current) asphalt.current.style.clipPath = "inset(0 0 0 0)";
      if (stone.current) stone.current.style.height = "100%";
      if (sheen.current) sheen.current.style.opacity = "1";
      if (glow.current) glow.current.style.opacity = "1";
      if (car.current) car.current.style.opacity = "1";
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
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
          if (railFill.current) railFill.current.style.height = `${p * 100}%`;

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

          // Excavation → stone base → paving sweep → seal
          if (trench.current) trench.current.style.opacity = `${map(p, 0.05, 0.16)}`;
          if (stone.current) stone.current.style.height = `${map(p, 0.2, 0.38) * 100}%`;

          const sweep = map(p, 0.46, 0.72); // house (top) → street (bottom)
          if (asphalt.current)
            asphalt.current.style.clipPath = `inset(0 0 ${(1 - sweep) * 100}% 0)`;
          if (roller.current) {
            const active = p > 0.44 && p < 0.78;
            roller.current.style.opacity = active ? "1" : "0";
            roller.current.style.top = `${40 + sweep * 56}%`;
            roller.current.style.transform = `translate(-50%,-50%) scale(${0.62 + sweep * 0.5})`;
          }

          // Finish: sealed sheen, warm windows, parked car
          const done = map(p, 0.82, 0.96);
          if (sheen.current) sheen.current.style.opacity = `${done}`;
          if (glow.current) glow.current.style.opacity = `${done}`;
          if (car.current) {
            car.current.style.opacity = `${map(p, 0.86, 0.97)}`;
            car.current.style.transform = `translate(-50%,-50%) scale(${0.9 + done * 0.1})`;
          }

          const pull = map(p, 0.9, 1);
          if (scene.current) scene.current.style.transform = `scale(${1 - pull * 0.05})`;
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
        <div className="container-x relative z-20 pt-24 lg:pt-28">
          <p className="eyebrow mb-4">Votre entrée, couche par couche</p>
          <h2 className="display max-w-3xl text-3xl leading-[0.95] text-warm sm:text-4xl lg:text-5xl">
            De la première pelletée à votre entrée de cour finie.
          </h2>
        </div>

        {/* Stage rail (desktop) */}
        <div className="pointer-events-none absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 lg:left-12 lg:block">
          <div className="relative flex flex-col gap-4">
            <div className="absolute left-[3px] top-1 h-full w-px bg-warm/15">
              <div ref={railFill} className="w-full bg-hivis" style={{ height: "0%" }} />
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

        {/* The residential build scene */}
        <div className="relative flex flex-1 items-center justify-center px-4">
          <div ref={scene} className="relative mx-auto aspect-[16/10] w-[92%] max-w-4xl origin-bottom overflow-hidden rounded-sm [contain:layout_paint] [will-change:transform]">
            {/* Dusk sky */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#2b3450 0%, #4a3a3a 38%, #6b4a2e 50%, #241a12 100%)" }} />
            <div aria-hidden className="absolute inset-x-0 top-[30%] h-40" style={{ background: "radial-gradient(70% 120% at 50% 10%, rgba(245,197,24,0.28), transparent 70%)" }} />

            {/* Lawn */}
            <div className="absolute inset-x-0 bottom-0 top-[46%]" style={{ background: "linear-gradient(180deg,#2b3d22 0%, #17210f 100%)" }} />

            {/* House */}
            <div className="absolute left-1/2 top-[9%] w-[46%] max-w-[22rem] -translate-x-1/2">
              <House glowRef={glow} />
            </div>

            {/* Driveway (trapezoid: narrow at the garage, wide at the street) */}
            <div className="absolute inset-0" style={{ clipPath: "polygon(42% 44%, 58% 44%, 85% 100%, 15% 100%)" }}>
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#2a2118 0%, #14100c 100%)" }} />
              <div ref={trench} className="absolute inset-0" style={{ opacity: 0, background: "linear-gradient(180deg,#0e0b08,#070605)", boxShadow: "inset 0 10px 30px rgba(0,0,0,0.7)" }} />
              <div className="absolute inset-0 overflow-hidden">
                <div ref={stone} className="absolute inset-x-0 bottom-0" style={{ height: "0%", background: "linear-gradient(180deg,#6b6862 0%, #4a4843 100%)" }} />
              </div>
              <div ref={asphalt} className="absolute inset-0" style={{ clipPath: "inset(0 0 100% 0)", background: "linear-gradient(180deg,#17171a 0%, #0b0b0d 100%)" }} />
              <div ref={sheen} className="pointer-events-none absolute inset-0" style={{ opacity: 0, background: "linear-gradient(160deg, rgba(245,197,24,0.14), transparent 42%)" }} />
            </div>

            {/* Roller travelling down the driveway */}
            <div ref={roller} className="absolute left-1/2 top-[45%] z-10" style={{ opacity: 0, transform: "translate(-50%,-50%)" }}>
              <Roller />
            </div>

            {/* Parked car at the finish */}
            <div ref={car} className="absolute left-1/2 top-[38%] z-10" style={{ opacity: 0, transform: "translate(-50%,-50%)" }}>
              <Car />
            </div>
          </div>
        </div>

        {/* Giant stage caption */}
        <div className="container-x relative z-20 flex items-end justify-between pb-16 lg:pb-20">
          <div>
            <span ref={num} className="font-mono text-sm tracking-[0.2em] text-hivis">01</span>
            <span ref={label} className="display mt-1 block text-4xl text-warm sm:text-5xl lg:text-6xl">Terrain brut</span>
            <span ref={sub} className="mt-2 block font-mono text-xs uppercase tracking-[0.18em] text-concrete">Analyse &amp; marquage</span>
          </div>
          <span className="hidden font-mono text-xs text-concrete sm:block">07 étapes</span>
        </div>
      </div>
    </section>
  );
}

function House({ glowRef }: { glowRef: React.Ref<SVGGElement> }) {
  return (
    <svg viewBox="0 0 240 150" className="h-auto w-full" aria-hidden>
      {/* body */}
      <rect x="34" y="66" width="172" height="80" fill="#2b2732" stroke="#4a4654" strokeWidth="1.5" />
      {/* roof */}
      <path d="M20 68 120 20 220 68Z" fill="#1c1a24" stroke="#4a4654" strokeWidth="1.5" />
      {/* garage door (faces the driveway) */}
      <rect x="92" y="92" width="56" height="54" fill="#14131a" stroke="#4a4654" strokeWidth="1.5" />
      {[100, 110, 120, 130].map((y) => (
        <line key={y} x1="92" y1={y} x2="148" y2={y} stroke="#33313c" strokeWidth="1" />
      ))}
      {/* warm window / door glow (fades in at the finish) */}
      <g ref={glowRef} style={{ opacity: 0 }}>
        <rect x="48" y="84" width="26" height="26" fill="#f5c518" opacity="0.85" />
        <rect x="166" y="84" width="26" height="26" fill="#f5c518" opacity="0.85" />
        <rect x="112" y="104" width="16" height="42" fill="#f5c518" opacity="0.6" />
      </g>
    </svg>
  );
}

function Roller() {
  return (
    <svg width="70" height="50" viewBox="0 0 72 52" fill="none" aria-hidden>
      <rect x="26" y="8" width="30" height="16" rx="2" fill="#f5c518" />
      <rect x="30" y="2" width="16" height="10" rx="1.5" fill="#1b1b1f" />
      <rect x="18" y="26" width="42" height="10" rx="2" fill="#2a2a2c" />
      <circle cx="26" cy="42" r="9" fill="#0d0d0f" stroke="#3a3b40" strokeWidth="2" />
      <circle cx="52" cy="42" r="9" fill="#0d0d0f" stroke="#3a3b40" strokeWidth="2" />
      <rect x="8" y="38" width="12" height="10" rx="5" fill="#4a4843" />
    </svg>
  );
}

function Car() {
  return (
    <svg width="88" height="44" viewBox="0 0 88 44" fill="none" aria-hidden>
      <path d="M8 30 14 18h18l8-8h14l6 8h10l4 12Z" fill="#e9e5db" />
      <path d="M20 20h14l4-6H26Z" fill="#3a3b40" />
      <path d="M42 14h10l4 6H42Z" fill="#3a3b40" />
      <rect x="6" y="28" width="76" height="6" rx="3" fill="#c9c6bf" />
      <circle cx="24" cy="36" r="7" fill="#0d0d0f" stroke="#3a3b40" strokeWidth="2" />
      <circle cx="64" cy="36" r="7" fill="#0d0d0f" stroke="#3a3b40" strokeWidth="2" />
    </svg>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";
import { projects } from "@/lib/site";
import { projectImg } from "@/lib/images";

/**
 * Pinned horizontal scroll gallery (desktop). The vertical scroll drives a
 * horizontal track. Falls back to a vertical grid on small screens and for
 * reduced-motion users.
 */
export function HorizontalProjects() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  // Decide whether to run the pinned horizontal experience.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(mq.matches && !reduce);
  }, []);

  // Set up GSAP only after the horizontal DOM (refs) is mounted.
  useEffect(() => {
    if (!enabled || !root.current || !track.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    const onScroll = () => ScrollTrigger.update();
    lenis?.on("scroll", onScroll);

    const ctx = gsap.context(() => {
      const el = track.current;
      if (!el) return;
      const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);

      ScrollTrigger.create({
        trigger: root.current!,
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(el, { x: -distance() * self.progress });
        },
      });
    }, root);

    ScrollTrigger.refresh();
    return () => {
      lenis?.off("scroll", onScroll);
      ctx.revert();
    };
  }, [enabled]);

  if (!enabled) {
    // Vertical fallback (mobile / reduced motion) — rendered by the page grid.
    return <VerticalFallback />;
  }

  return (
    <section ref={root} className="relative overflow-hidden bg-asphalt">
      <div className="flex h-[100svh] flex-col justify-center">
        <div className="container-x mb-8 flex items-end justify-between">
          <p className="label-mono">Faites défiler →</p>
          <p className="label-mono">
            {String(projects.length).padStart(2, "0")} projets
          </p>
        </div>
        <div ref={track} className="flex items-stretch gap-6 pl-6 will-change-transform lg:pl-12">
          {projects.map((p, i) => (
            <article
              key={p.slug}
              data-cursor="Projet"
              className="group relative h-[62vh] w-[78vw] shrink-0 overflow-hidden border border-warm/12 sm:w-[60vw] lg:w-[42vw]"
            >
              <Image
                src={projectImg[p.slug]}
                alt={p.title}
                fill
                sizes="45vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(11,11,13,0.1) 0%, rgba(11,11,13,0.15) 45%, rgba(11,11,13,0.9) 100%)",
                }}
              />
              <div className="absolute left-5 top-5 flex gap-2">
                <span className="bg-hivis px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-asphalt">
                  {p.category}
                </span>
                <span className="border border-warm/20 bg-asphalt/50 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-warm/80 backdrop-blur-sm">
                  {p.year}
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-7">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-hivis">
                  {String(i + 1).padStart(2, "0")} — {p.location} · {p.surface}
                </span>
                <h3 className="display mt-2 text-3xl text-warm lg:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-md text-sm text-concrete-light">
                  {p.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.services.map((sv) => (
                    <span
                      key={sv}
                      className="border border-warm/15 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-warm/70"
                    >
                      {sv}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
          <div className="w-6 shrink-0 lg:w-12" aria-hidden />
        </div>
      </div>
    </section>
  );
}

function VerticalFallback() {
  return (
    <section className="bg-asphalt py-12">
      <div className="container-x grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.slug}
            className="group relative aspect-[16/11] overflow-hidden border border-warm/12"
          >
            <Image
              src={projectImg[p.slug]}
              alt={p.title}
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(11,11,13,0.1), rgba(11,11,13,0.9))",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-hivis">
                {p.location} · {p.surface}
              </span>
              <h3 className="display mt-1 text-2xl text-warm">{p.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

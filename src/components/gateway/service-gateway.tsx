"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

type PanelKey = "asphalte" | "scellant";

const panels: {
  key: PanelKey;
  option: string;
  title: string[];
  line: string;
  cta: string;
  href: string;
  poster: string;
  video: string;
}[] = [
  {
    key: "asphalte",
    option: "Option 01",
    title: ["Pavage", "et asphalte"],
    line: "Du terrain brut jusqu'à la surface finie.",
    cta: "Découvrir le pavage",
    href: "/asphalte",
    poster: "/assets/generated/hero-alt1.jpg",
    video: "/assets/generated/hero-alt1.mp4",
  },
  {
    key: "scellant",
    option: "Option 02",
    title: ["Scellant", "d'asphalte"],
    line: "Protéger, restaurer et prolonger la vie de votre asphalte.",
    cta: "Choisir ma région",
    href: "/scellant",
    poster: "/assets/generated/scellant/ba-sealed.jpg",
    video: "/assets/generated/scellant/hero.mp4",
  },
];

export function ServiceGateway() {
  const [hover, setHover] = useState<PanelKey | null>(null);
  const reduce = useReducedMotion();

  return (
    <main
      id="contenu"
      className="relative flex h-[100svh] flex-col overflow-hidden bg-asphalt lg:flex-row"
    >
      {/* Intro overlay — brand + question */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex flex-col items-center px-6 pt-[max(1.5rem,env(safe-area-inset-top))] text-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <Logo className="h-8 w-auto lg:h-10" />
          <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-hivis sm:text-xs">
            Deux expertises. Une même précision.
          </p>
          <h1 className="display mt-3 text-warm text-2xl leading-[0.95] sm:text-3xl lg:text-4xl [text-shadow:0_2px_24px_rgba(0,0,0,0.6)]">
            Quel service recherchez-vous&nbsp;?
          </h1>
        </motion.div>
      </div>

      {panels.map((p, i) => {
        const grow = reduce ? 1 : hover === p.key ? 1.4 : hover ? 0.72 : 1;
        return (
          <motion.section
            key={p.key}
            animate={{ flexGrow: grow }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ flexBasis: 0 }}
            className="group relative min-h-[50svh] flex-1 overflow-hidden lg:min-h-0"
            onMouseEnter={() => setHover(p.key)}
            onMouseLeave={() => setHover(null)}
          >
            <Link
              href={p.href}
              onFocus={() => setHover(p.key)}
              onBlur={() => setHover(null)}
              className="absolute inset-0 z-20 flex flex-col justify-end p-6 pb-10 sm:p-10 lg:p-14"
              aria-label={p.cta}
            >
              {/* Media */}
              <div className="absolute inset-0 -z-10">
                <Image
                  src={p.poster}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className={cn(
                    "object-cover transition-transform duration-[1.6s] ease-out",
                    hover === p.key && !reduce ? "scale-105" : "scale-100"
                  )}
                />
                {!reduce && (
                  <video
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster={p.poster}
                    ref={(el) => {
                      if (!el) return;
                      if (hover === p.key) el.play().catch(() => {});
                      else el.pause();
                    }}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
                      hover === p.key ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <source src={p.video} type="video/mp4" />
                  </video>
                )}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(11,11,13,0.55) 0%, rgba(11,11,13,0.15) 45%, rgba(11,11,13,0.9) 100%)",
                  }}
                />
              </div>

              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-hivis">
                {p.option}
              </span>
              <h2 className="display mt-3 text-warm text-[10.5vw] leading-[0.86] sm:text-6xl lg:text-[4.2vw]">
                {p.title[0]}
                <br />
                {p.title[1]}
              </h2>
              <p className="mt-4 max-w-xs text-sm text-warm-2 sm:text-base">
                {p.line}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 border-b border-hivis/40 pb-1 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-warm transition-colors group-hover:text-hivis">
                {p.cta}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </motion.section>
        );
      })}

      {/* Precision road-marking divider (horizontal on mobile, vertical on desktop) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-px -translate-y-1/2 lg:hidden"
        style={{
          background:
            "repeating-linear-gradient(to right, var(--color-hivis) 0 14px, transparent 14px 30px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-px -translate-x-1/2 lg:block"
        style={{
          background:
            "repeating-linear-gradient(to bottom, var(--color-hivis) 0 14px, transparent 14px 30px)",
        }}
      />
    </main>
  );
}

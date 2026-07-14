"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/lib/site";

const line = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 1, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-asphalt tex-asphalt grain">
      {/* Ambient light + moving hazard beam */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 70% 0%, rgba(245,197,24,0.10), transparent 55%), radial-gradient(90% 70% at 20% 100%, rgba(255,255,255,0.05), transparent 60%)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-1/4 top-0 h-full w-1/2 opacity-[0.06] tex-hazard"
        initial={{ x: 120 }}
        animate={{ x: 0 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] as const }}
        style={{ transform: "skewX(-12deg)" }}
      />

      <div className="container-x relative z-10 pb-14 pt-32 lg:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="eyebrow mb-8 flex items-center gap-3"
        >
          <span className="inline-block h-px w-10 bg-hivis" />
          Excavation · Pavage · Entretien — {site.regions[0]}
        </motion.p>

        <h1 className="display text-warm text-[15vw] leading-[0.85] sm:text-[12vw] lg:text-[9.5vw]">
          {["Bâtir des", "fondations", "qui durent."].map((t, i) => (
            <span key={i} className="line-mask">
              <motion.span
                custom={i}
                variants={line}
                initial="hidden"
                animate="show"
                className="block"
              >
                {i === 1 ? (
                  <span className="text-hivis">{t}</span>
                ) : (
                  t
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9 }}
            className="max-w-xl text-lg text-concrete-light lg:text-xl"
          >
            Nous prenons en charge votre projet du terrain brut jusqu&apos;à la
            surface finie. Une équipe rapide, minutieuse et humaine — la
            précision AAA, couche après couche.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.9 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Link
              href="/soumission"
              className="group inline-flex items-center gap-2 bg-hivis px-8 py-5 font-mono text-xs uppercase tracking-[0.18em] text-asphalt transition-colors hover:bg-warm"
            >
              Soumission gratuite
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform group-hover:translate-x-1">
                <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
              </svg>
            </Link>
            <Link
              href="/services"
              className="border border-warm/25 px-8 py-5 font-mono text-xs uppercase tracking-[0.18em] text-warm transition-colors hover:border-hivis hover:text-hivis"
            >
              Nos services
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="container-x relative z-10 flex items-center justify-between border-t border-warm/10 py-5"
      >
        <span className="label-mono">Défilez — un chantier, du début à la fin</span>
        <motion.span
          aria-hidden
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="font-mono text-hivis"
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}

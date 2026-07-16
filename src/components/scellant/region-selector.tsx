"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { scellantLocations } from "@/lib/content/scellant-locations";

/** Scellant region-selection experience. Remembers the choice locally (non-invasive). */
export function RegionSelector() {
  useEffect(() => {
    // Remember last region for future visits (never auto-redirects the gateway).
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a[data-region]") as HTMLAnchorElement | null;
      if (a?.dataset.region) {
        try {
          localStorage.setItem("aaa-scellant-region", a.dataset.region);
        } catch {}
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <section className="relative min-h-[100svh] bg-asphalt tex-asphalt px-6 pb-20 pt-28 lg:pt-36">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow mb-5">Scellant d&apos;asphalte</p>
          <h1 className="display max-w-4xl text-warm text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">
            Dans quelle région avez-vous besoin de nos services&nbsp;?
          </h1>
          <p className="mt-6 max-w-xl text-concrete-light">
            Choisissez votre secteur pour une expérience adaptée à votre région.
            Vous pourrez changer de région à tout moment.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {scellantLocations.map((loc, i) => (
            <motion.div
              key={loc.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/scellant/${loc.slug}`}
                data-region={loc.slug}
                data-cursor="Choisir"
                className="group relative flex h-full min-h-[26rem] flex-col justify-end overflow-hidden border border-warm/12 p-7"
              >
                <Image
                  src={loc.heroMedia.poster}
                  alt={`Scellant d'asphalte — ${loc.name}`}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(11,11,13,0.25) 0%, rgba(11,11,13,0.4) 45%, rgba(11,11,13,0.92) 100%)",
                  }}
                />
                <div className="relative z-10">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-hivis">
                    0{i + 1} — Région
                  </span>
                  <h2 className="display mt-2 text-3xl text-warm">{loc.name}</h2>
                  <p className="mt-1 text-sm text-concrete-light">{loc.regionLabel}</p>
                  <span className="mt-5 inline-flex items-center gap-2 border-b border-hivis/40 pb-1 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-warm transition-colors group-hover:text-hivis">
                    Voir cette région
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 border-t border-warm/10 pt-8">
          <Link
            href="/asphalte"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-concrete transition-colors hover:text-hivis"
          >
            Besoin d&apos;un asphaltage complet ? Voir la division →
          </Link>
        </div>
      </div>
    </section>
  );
}

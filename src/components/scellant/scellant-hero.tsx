"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { ScellantLocation } from "@/lib/content/scellant-locations";

export function ScellantHero({ location }: { location: ScellantLocation }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [allowVideo, setAllowVideo] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    setAllowVideo(!reduce && conn?.saveData !== true);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!allowVideo || !v) return;
    v.muted = true;
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { threshold: 0.15 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [allowVideo]);

  return (
    <section className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-asphalt">
      <div className="absolute inset-0 z-0">
        <Image
          src={location.heroMedia.poster}
          alt={`Scellant d'asphalte — ${location.regionLabel}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {allowVideo && location.heroMedia.video && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={location.heroMedia.poster}
            onCanPlay={() => setReady(true)}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
            style={{ opacity: ready ? 1 : 0 }}
          >
            <source src={location.heroMedia.video} type="video/mp4" />
          </video>
        )}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,11,13,0.5) 0%, rgba(11,11,13,0.2) 35%, rgba(11,11,13,0.95) 100%)",
          }}
        />
      </div>

      <div className="container-x relative z-10 pb-14 pt-32 lg:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="eyebrow mb-6 flex items-center gap-3"
        >
          <span className="inline-block h-px w-10 bg-hivis" />
          Scellant &amp; entretien — {location.name}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="display max-w-4xl text-warm text-[clamp(2.2rem,7vw,5rem)] leading-[0.92] [text-shadow:0_2px_40px_rgba(0,0,0,0.5)]"
        >
          {location.heroTitle}
        </motion.h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-xl text-lg text-warm-2"
          >
            {location.heroDescription}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Link
              href={`/scellant/${location.slug}/soumission`}
              className="bg-hivis px-8 py-5 font-mono text-xs uppercase tracking-[0.18em] text-asphalt transition-colors hover:bg-warm"
            >
              Obtenir une soumission gratuite
            </Link>
            <Link
              href={`/scellant/${location.slug}/realisations`}
              className="border border-warm/30 bg-asphalt/20 px-8 py-5 font-mono text-xs uppercase tracking-[0.18em] text-warm backdrop-blur-sm transition-colors hover:border-hivis hover:text-hivis"
            >
              Voir nos réalisations
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

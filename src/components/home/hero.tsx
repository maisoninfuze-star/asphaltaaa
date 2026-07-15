"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/lib/site";
import { img } from "@/lib/images";
import { Magnetic } from "@/components/motion/magnetic";

const line = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 1, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [allowVideo, setAllowVideo] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Respect data-saver (falls back to the poster image).
    const conn = (navigator as unknown as { connection?: { saveData?: boolean } })
      .connection;
    const saveData = conn?.saveData === true;
    setAllowVideo(!reduce && !saveData);
  }, []);

  // Reliable mobile autoplay: keep it muted, and play only while the hero is
  // on screen (starts it on iOS/Android, resumes when scrolled back, saves battery).
  useEffect(() => {
    const v = videoRef.current;
    if (!allowVideo || !v) return;
    v.muted = true;
    const tryPlay = () => v.play().catch(() => {});
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else v.pause();
      },
      { threshold: 0.15 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [allowVideo]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.9]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-asphalt"
    >
      {/* Cinematic aerial background with parallax.
          Image is the always-present base (instant paint, SEO, reduced-motion);
          the fal.ai drone video fades in on top once it can play. */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0 will-change-transform">
        <Image
          src={img.heroPoster}
          alt="Chantier de pavage d'asphalte Asphalte AAA au coucher du soleil"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {allowVideo && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={(e) => {
              setVideoReady(true);
              e.currentTarget.play().catch(() => {});
            }}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
            style={{ opacity: videoReady ? 1 : 0 }}
          >
            <source src={img.heroVideo} type="video/mp4" />
          </video>
        )}
      </motion.div>
      <motion.div
        aria-hidden
        style={{
          opacity: overlayOpacity,
          background:
            "linear-gradient(180deg, rgba(11,11,13,0.55) 0%, rgba(11,11,13,0.2) 35%, rgba(11,11,13,0.95) 100%)",
        }}
        className="absolute inset-0 z-0"
      />
      {/* Grain + hazard accent */}
      <div className="grain absolute inset-0 z-0" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-1/4 top-0 h-full w-1/3 opacity-[0.05] tex-hazard"
        initial={{ x: 120 }}
        animate={{ x: 0 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] as const }}
        style={{ transform: "skewX(-12deg)" }}
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-x relative z-10 pb-14 pt-32 lg:pb-20"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="eyebrow mb-8 flex items-center gap-3"
        >
          <span className="inline-block h-px w-10 bg-hivis" />
          Excavation · Pavage · Entretien — {site.regions[0]}
        </motion.p>

        <h1 className="display text-warm text-[clamp(2.5rem,12.5vw,8.5rem)] leading-[0.85] [text-shadow:0_2px_40px_rgba(0,0,0,0.5)]">
          {["Bâtir des", "fondations", "qui durent."].map((t, i) => (
            <span key={i} className="line-mask">
              <motion.span
                custom={i}
                variants={line}
                initial="hidden"
                animate="show"
                className="block"
              >
                {i === 1 ? <span className="text-hivis">{t}</span> : t}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9 }}
            className="max-w-xl text-lg text-warm-2 lg:text-xl"
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
            <Magnetic>
              <Link
                href="/soumission"
                className="group inline-flex items-center gap-2 bg-hivis px-8 py-5 font-mono text-xs uppercase tracking-[0.18em] text-asphalt transition-colors hover:bg-warm"
              >
                Soumission gratuite
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform group-hover:translate-x-1">
                  <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                </svg>
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link
                href="/services"
                className="border border-warm/30 bg-asphalt/20 px-8 py-5 font-mono text-xs uppercase tracking-[0.18em] text-warm backdrop-blur-sm transition-colors hover:border-hivis hover:text-hivis"
              >
                Nos services
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="container-x relative z-10 flex items-center justify-between border-t border-warm/15 py-5"
      >
        <span className="label-mono text-warm/70">
          Défilez — un chantier, du début à la fin
        </span>
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

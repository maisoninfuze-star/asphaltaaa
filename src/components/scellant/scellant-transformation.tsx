"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { scellantTransformation } from "@/lib/content/scellant-shared";

/**
 * Sticky-scroll transformation — the surface crossfades through six stages as
 * you scroll (fluid, restorative animation language). Content is visible by
 * default; motion enhances it. Reduced-motion users simply see the last stage.
 */
export function ScellantTransformation() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const n = scellantTransformation.length;

  return (
    <section
      ref={ref}
      className="relative bg-asphalt"
      style={{ height: `${n * 90}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="container-x">
          <p className="eyebrow mb-5">La transformation</p>
          <h2 className="display max-w-3xl text-warm text-3xl leading-[0.95] sm:text-4xl lg:text-5xl">
            Une transformation visible. Une protection pensée pour durer.
          </h2>
        </div>

        <div className="container-x relative mt-10 aspect-[16/9] max-h-[52svh] w-full overflow-hidden border border-warm/12">
          {scellantTransformation.map((stage, i) => (
            <Stage key={stage.n} i={i} n={n} progress={scrollYProgress} stage={stage} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Stage({
  i,
  n,
  progress,
  stage,
}: {
  i: number;
  n: number;
  progress: MotionValue<number>;
  stage: (typeof scellantTransformation)[number];
}) {
  // Function-form transforms (no keyframe offset arrays → no monotonic
  // constraints and no WAAPI edge cases at the first/last stage).
  const center = (i + 0.5) / n;
  const half = 0.5 / n;
  const opacity = useTransform(progress, (p) => {
    if (i === 0 && p <= center) return 1;
    if (i === n - 1 && p >= center) return 1;
    return Math.max(0, Math.min(1, 1 - Math.abs(p - center) / half));
  });
  const scale = useTransform(progress, (p) => {
    const d = Math.max(-1, Math.min(1, (p - center) / (1 / n)));
    return 1 + 0.06 * Math.abs(d);
  });

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image src={stage.image} alt={stage.label} fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(11,11,13,0.1), rgba(11,11,13,0.85))" }}
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 sm:p-8">
        <div>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-hivis">
            {stage.n} / 0{n}
          </span>
          <h3 className="display mt-1 text-2xl text-warm sm:text-3xl">{stage.label}</h3>
          <p className="text-sm text-concrete-light">{stage.sub}</p>
        </div>
      </div>
    </motion.div>
  );
}

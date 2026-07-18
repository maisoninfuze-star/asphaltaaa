"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";

const items = [
  "Excavation",
  "Nivellement",
  "Fondation 0-¾",
  "Pavage à chaud",
  "Resurfaçage",
  "Réparations",
  "Scellant",
  "Réparation des fissures",
  "Drainage",
];

/**
 * Scroll-velocity marquee: base auto-scroll, but scroll speed and direction
 * modulate it — scrolling down accelerates it, up reverses. Studio-Freight idiom.
 */
export function Marquee({ baseVelocity = -2.4 }: { baseVelocity?: number }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const dir = useRef(1);
  useAnimationFrame((_, delta) => {
    let moveBy = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    moveBy += dir.current * moveBy * f;
    baseX.set(baseX.get() + moveBy);
  });

  const row = (
    <span className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((t, i) => (
        <span key={i} className="flex items-center gap-10">
          <span className="font-display text-lg uppercase tracking-tight text-warm/80">
            {t}
          </span>
          <span className="text-hivis">✦</span>
        </span>
      ))}
    </span>
  );

  return (
    <div className="relative flex overflow-hidden border-y border-warm/10 bg-asphalt-2 py-5">
      <motion.div style={{ x }} className="flex whitespace-nowrap will-change-transform">
        {row}
        {row}
        {row}
        {row}
      </motion.div>
    </div>
  );
}

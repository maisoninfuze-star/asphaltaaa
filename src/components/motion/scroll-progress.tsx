"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin hi-vis reading-progress bar fixed to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="scroll-progress fixed inset-x-0 top-0 z-[70] h-[2px] bg-hivis"
      aria-hidden
    />
  );
}

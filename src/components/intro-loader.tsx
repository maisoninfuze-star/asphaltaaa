"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * First-visit brand curtain: the AAA mark draws in, a hi-vis rule sweeps,
 * then the panel wipes up to reveal the page. Once per session; skipped for
 * reduced-motion users (page shows immediately).
 */
export function IntroLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("aaa-intro");
    if (reduce || seen) return;
    setShow(true);
    document.documentElement.style.overflow = "hidden";
    sessionStorage.setItem("aaa-intro", "1");
    const t = setTimeout(() => {
      setShow(false);
      document.documentElement.style.overflow = "";
    }, 1900);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-asphalt tex-asphalt"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
        >
          <motion.svg
            width="64"
            height="52"
            viewBox="0 0 34 28"
            fill="none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.path
              d="M9 26 17 2l8 24"
              stroke="var(--color-hivis)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            />
            <motion.path
              d="M2 26h30"
              stroke="var(--color-warm)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            />
            <motion.path
              d="M13 17h8"
              stroke="var(--color-warm)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            />
          </motion.svg>

          <div className="mt-6 overflow-hidden">
            <motion.p
              className="font-mono text-xs uppercase tracking-[0.5em] text-hivis"
              initial={{ y: "120%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            >
              Asphalte&nbsp;AAA
            </motion.p>
          </div>

          <motion.div
            className="mt-6 h-px bg-hivis"
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

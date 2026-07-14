"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Signature custom cursor — a hi-vis ring that lags behind a precise dot and
 * grows over interactive elements, optionally showing a contextual label
 * (add data-cursor="Voir" to any element). Fine-pointer only; hidden for
 * touch and reduced-motion users, who keep the native cursor.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.body.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement)?.closest?.(
        "a, button, [role='slider'], [data-cursor]"
      ) as HTMLElement | null;
      if (el) {
        setHovering(true);
        setLabel(el.getAttribute("data-cursor") || "");
      } else {
        setHovering(false);
        setLabel("");
      }
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", dn);
    window.addEventListener("pointerup", up);
    return () => {
      document.body.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", dn);
      window.removeEventListener("pointerup", up);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block" aria-hidden>
      {/* Precise dot */}
      <motion.div
        style={{ x, y }}
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-hivis"
        animate={{ opacity: hovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      {/* Lagging ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute flex items-center justify-center rounded-full border border-hivis"
        animate={{
          width: hovering ? 68 : 30,
          height: hovering ? 68 : 30,
          marginLeft: hovering ? -34 : -15,
          marginTop: hovering ? -34 : -15,
          backgroundColor: hovering ? "rgba(245,197,24,0.12)" : "rgba(245,197,24,0)",
          scale: down ? 0.82 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        {label && (
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-hivis">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  );
}

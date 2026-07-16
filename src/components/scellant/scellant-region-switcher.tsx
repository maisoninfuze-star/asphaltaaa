"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scellantLocations } from "@/lib/content/scellant-locations";
import { cn } from "@/lib/utils";

/** Region dropdown for the scellant header ("Scellant — {Region}" + Changer de région). */
export function ScellantRegionSwitcher({ activeSlug }: { activeSlug: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = scellantLocations.find((l) => l.slug === activeSlug);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 border border-warm/20 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-warm transition-colors hover:border-hivis hover:text-hivis"
      >
        <span className="text-hivis">Scellant</span>
        <span className="text-warm/40">—</span>
        {active?.name ?? "Région"}
        <span className={cn("transition-transform", open && "rotate-180")}>▾</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            role="menu"
            className="absolute left-0 top-full z-50 mt-2 w-56 border border-warm/15 bg-asphalt-2/95 backdrop-blur-md"
          >
            {scellantLocations.map((l) => (
              <Link
                key={l.slug}
                href={`/scellant/${l.slug}`}
                role="menuitem"
                className={cn(
                  "block border-b border-warm/8 px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] transition-colors hover:bg-hivis hover:text-asphalt",
                  l.slug === activeSlug ? "text-hivis" : "text-warm/80"
                )}
              >
                {l.name}
                <span className="mt-0.5 block text-[0.58rem] normal-case tracking-normal text-concrete">
                  {l.regionLabel}
                </span>
              </Link>
            ))}
            <Link
              href="/scellant"
              role="menuitem"
              className="block px-4 py-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-warm/60 transition-colors hover:text-hivis"
            >
              Changer de région →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

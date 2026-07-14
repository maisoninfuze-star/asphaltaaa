"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function FaqAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="flex flex-col divide-y divide-warm/10 border-y border-warm/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center gap-6 py-7 text-left"
            >
              <span className="font-mono text-xs text-hivis">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "flex-1 font-display text-lg uppercase tracking-tight transition-colors lg:text-2xl",
                  isOpen ? "text-hivis" : "text-warm group-hover:text-warm-2"
                )}
              >
                {item.q}
              </span>
              <span
                className={cn(
                  "shrink-0 text-2xl text-hivis transition-transform duration-300",
                  isOpen && "rotate-45"
                )}
                aria-hidden
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-8 pl-12 text-concrete-light">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

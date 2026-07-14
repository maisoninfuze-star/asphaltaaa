"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/site";

function useCountUp(target: number, run: boolean, dur = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, dur]);
  return v;
}

function parse(value: string) {
  const num = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");
  return { num, suffix };
}

function Stat({ value, label, run }: { value: string; label: string; run: boolean }) {
  const { num, suffix } = parse(value);
  const n = useCountUp(num, run);
  return (
    <div className="group relative p-8 lg:p-10">
      <div className="display text-5xl text-warm lg:text-7xl">
        {num > 0 ? n : ""}
        <span className="text-hivis">{suffix}</span>
      </div>
      <div className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-concrete-light">
        {label}
      </div>
    </div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => e[0].isIntersecting && (setRun(true), io.disconnect()),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-asphalt">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-px overflow-hidden border-y border-warm/10 bg-warm/10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-asphalt">
              <Stat value={s.value} label={s.label} run={run} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

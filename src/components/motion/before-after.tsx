"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Draggable before/after comparison slider. Keyboard + pointer accessible. */
export function BeforeAfter({
  before,
  after,
  beforeLabel = "Avant",
  afterLabel = "Après",
  className,
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => dragging.current && setFromClientX(e.clientX);
    const up = () => (dragging.current = false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [setFromClientX]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative select-none overflow-hidden bg-asphalt-2 touch-none",
        className
      )}
      onPointerDown={(e) => {
        dragging.current = true;
        setFromClientX(e.clientX);
      }}
    >
      {/* After (base) */}
      <Image src={after} alt={afterLabel} fill sizes="(max-width:768px) 100vw, 60vw" className="object-cover" />
      <span className="absolute right-4 top-4 z-10 bg-hivis px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-asphalt">
        {afterLabel}
      </span>

      {/* Before (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image src={before} alt={beforeLabel} fill sizes="(max-width:768px) 100vw, 60vw" className="object-cover" />
        <span className="absolute left-4 top-4 z-10 border border-warm/40 bg-asphalt/70 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-warm">
          {beforeLabel}
        </span>
      </div>

      {/* Handle */}
      <div
        role="slider"
        aria-label="Comparer avant et après"
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
          if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
        }}
        className="absolute inset-y-0 z-20 -ml-px w-0.5 cursor-ew-resize bg-hivis"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-hivis text-asphalt shadow-lg">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path d="M7 4 3 9l4 5M11 4l4 5-4 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
          </svg>
        </span>
      </div>
    </div>
  );
}

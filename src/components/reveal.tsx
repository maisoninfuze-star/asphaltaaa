"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Lightweight scroll-reveal — IntersectionObserver toggles [data-inview],
 * CSS in globals.css handles the transition. No JS animation cost per frame.
 */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.setAttribute("data-inview", "true");
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** Word-by-word masked headline reveal. */
export function RevealText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.setAttribute("data-inview", "true");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");
  return (
    <span ref={ref} className={cn("group", className)} data-inview="false">
      {words.map((w, i) => (
        <span key={i} className="line-mask inline-block align-top">
          <span
            className="inline-block translate-y-full opacity-0 transition-[transform,opacity] duration-[900ms] [transition-timing-function:var(--ease-out-expo)] group-data-[inview=true]:translate-y-0 group-data-[inview=true]:opacity-100"
            style={{ transitionDelay: `${i * 55}ms` }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </span>
  );
}

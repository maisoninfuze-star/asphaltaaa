"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Image inside a clipped frame that parallax-drifts as the frame scrolls
 * through the viewport. The inner layer is oversized so drift never reveals edges.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  strength = 12,
  priority = false,
  sizes = "100vw",
  overlay = true,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  strength?: number; // percent drift
  priority?: boolean;
  sizes?: string;
  overlay?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${strength}%`, `${strength}%`]
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={{ y }}
        className="absolute inset-x-0 -top-[18%] h-[136%] will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-cover", imgClassName)}
        />
      </motion.div>
      {overlay && (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,11,13,0.15) 0%, rgba(11,11,13,0.05) 40%, rgba(11,11,13,0.75) 100%)",
          }}
        />
      )}
    </div>
  );
}

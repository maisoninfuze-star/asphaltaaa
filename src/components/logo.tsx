import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Real Asphalte AAA logo. Default "lockup" = gold crown emblem + wordmark
 * (compact, legible at small sizes). "full" = the complete vertical lockup image.
 */
export function Logo({
  className,
  variant = "lockup",
}: {
  className?: string;
  variant?: "lockup" | "emblem" | "full";
}) {
  if (variant === "full") {
    return (
      <Image
        src="/assets/brand/logo.png"
        alt="Asphalte AAA"
        width={220}
        height={206}
        className={cn("h-auto w-auto", className)}
      />
    );
  }

  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/assets/brand/logo-emblem.png"
        alt=""
        width={82}
        height={52}
        priority
        className="h-full w-auto"
      />
      {variant === "lockup" && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-sm font-extrabold uppercase tracking-tight text-warm">
            Asphalte
          </span>
          <span className="font-mono text-[0.6rem] tracking-[0.42em] text-hivis">
            AAA
          </span>
        </span>
      )}
    </span>
  );
}

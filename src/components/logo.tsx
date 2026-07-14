import { cn } from "@/lib/utils";

/** Industrial wordmark: chevron "roller" mark + AAA. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 34 28"
        className="h-full w-auto"
        fill="none"
        aria-hidden
      >
        <path d="M9 26 17 2l8 24" stroke="var(--color-hivis)" strokeWidth="3" strokeLinejoin="miter" />
        <path d="M2 26h30" stroke="var(--color-warm)" strokeWidth="3" />
        <path d="M13 17h8" stroke="var(--color-warm)" strokeWidth="3" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-sm font-extrabold uppercase tracking-tight text-warm">
          Asphalte
        </span>
        <span className="font-mono text-[0.6rem] tracking-[0.42em] text-hivis">
          AAA
        </span>
      </span>
    </span>
  );
}

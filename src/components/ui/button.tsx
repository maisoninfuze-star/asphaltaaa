import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-300 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-hivis text-asphalt px-7 py-4 hover:bg-warm",
  outline:
    "border border-warm/25 text-warm px-7 py-4 hover:border-hivis hover:text-hivis",
  ghost: "text-warm px-2 py-2 hover:text-hivis",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  href,
  variant = "primary",
  className,
  children,
  ...rest
}: CommonProps & { href: string } & React.ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], className)}
      {...rest}
    >
      <span>{children}</span>
      {variant === "primary" && <Arrow />}
    </Link>
  );
}

export function ButtonEl({
  variant = "primary",
  className,
  children,
  withArrow,
  ...rest
}: CommonProps & { withArrow?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      <span>{children}</span>
      {(withArrow ?? variant === "primary") && <Arrow />}
    </button>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="transition-transform duration-300 group-hover:translate-x-1"
      aria-hidden
    >
      <path
        d="M1 7h11M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  );
}

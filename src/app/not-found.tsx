import Link from "next/link";
import { nav } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] flex-col items-center justify-center overflow-hidden bg-asphalt tex-asphalt grain px-6 text-center">
      <p className="eyebrow mb-6">Erreur 404</p>
      <h1 className="display text-warm text-[26vw] leading-none sm:text-[12rem]">
        4<span className="text-hivis">0</span>4
      </h1>
      <p className="mt-4 max-w-md text-concrete-light">
        Cette page n&apos;existe pas — ou elle a été repavée. Reprenons du solide.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="bg-hivis px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-asphalt transition-colors hover:bg-warm"
        >
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/soumission"
          className="border border-warm/25 px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-warm transition-colors hover:border-hivis hover:text-hivis"
        >
          Soumission
        </Link>
      </div>
      <nav className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2">
        {nav.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-warm/50 hover:text-hivis"
          >
            {n.label}
          </Link>
        ))}
      </nav>
    </section>
  );
}

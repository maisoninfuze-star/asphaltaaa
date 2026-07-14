import Link from "next/link";
import { nav, services, site } from "@/lib/site";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  const year = 2025;
  return (
    <footer className="relative overflow-hidden border-t border-warm/10 bg-asphalt-2">
      {/* Big CTA band */}
      <div className="relative border-b border-warm/10">
        <div className="container-x grid gap-10 py-16 lg:grid-cols-[1.4fr_1fr] lg:py-24">
          <div>
            <p className="eyebrow mb-6">Prêt à commencer ?</p>
            <h2 className="display text-[13vw] leading-[0.86] text-warm sm:text-6xl lg:text-7xl">
              Bâtissons une
              <br />
              surface qui dure.
            </h2>
          </div>
          <div className="flex flex-col justify-end gap-4">
            <p className="max-w-sm text-concrete-light">
              Soumission gratuite, détaillée et sans surprise. On répond
              rapidement — souvent la journée même.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/soumission"
                className="bg-hivis px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-asphalt transition-colors hover:bg-warm"
              >
                Demander une soumission
              </Link>
              <a
                href={site.phoneHref}
                className="border border-warm/25 px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-warm transition-colors hover:border-hivis hover:text-hivis"
              >
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="container-x grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-5">
          <Logo className="h-9 w-auto" />
          <p className="max-w-xs text-sm text-concrete">
            Service d&apos;asphalte complet — de l&apos;excavation à la surface
            finie. La précision AAA.
          </p>
          <p className="label-mono">NEQ {site.neq}</p>
        </div>

        <nav className="flex flex-col gap-3" aria-label="Navigation pied de page">
          <p className="label-mono mb-1">Navigation</p>
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="w-fit text-sm text-warm/70 transition-colors hover:text-hivis"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <p className="label-mono mb-1">Services</p>
          {services.slice(0, 6).map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="w-fit text-sm text-warm/70 transition-colors hover:text-hivis"
            >
              {s.title}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <p className="label-mono mb-1">Contact</p>
          <a href={site.phoneHref} className="w-fit text-sm text-warm/70 hover:text-hivis">
            {site.phone}
          </a>
          <a href={site.emailHref} className="w-fit text-sm text-warm/70 hover:text-hivis">
            {site.email}
          </a>
          <div className="mt-2 text-sm text-concrete">
            {site.hours.map((h) => (
              <div key={h.d} className="flex justify-between gap-4">
                <span>{h.d}</span>
                <span className="text-warm/60">{h.h}</span>
              </div>
            ))}
          </div>
          <a
            href={site.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 w-fit font-mono text-xs uppercase tracking-[0.18em] text-warm/70 hover:text-hivis"
          >
            Facebook ↗
          </a>
        </div>
      </div>

      {/* Hazard strip */}
      <div className="tex-hazard h-2 opacity-80" aria-hidden />

      <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-concrete sm:flex-row">
        <p>
          © {year} {site.name}. Tous droits réservés.
        </p>
        <div className="flex gap-6">
          <Link href="/confidentialite" className="hover:text-warm">
            Confidentialité
          </Link>
          <Link href="/conditions" className="hover:text-warm">
            Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}

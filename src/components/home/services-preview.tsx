import Link from "next/link";
import { services } from "@/lib/site";
import { Reveal } from "@/components/reveal";

export function ServicesPreview() {
  return (
    <section className="relative bg-asphalt-2 py-24 lg:py-36">
      <div className="container-x">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-5">Ce qu&apos;on fait</p>
            <h2 className="display max-w-2xl text-warm text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">
              Un service complet, pas juste du scellant.
            </h2>
          </div>
          <Link
            href="/services"
            className="group flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-hivis"
          >
            Tous les services
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid gap-px overflow-hidden border border-warm/10 bg-warm/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal
              key={s.slug}
              delay={(i % 3) * 70}
              className="bg-asphalt"
            >
              <Link
                href={`/services/${s.slug}`}
                className="group relative flex min-h-[15rem] flex-col justify-between overflow-hidden p-8 transition-colors duration-500 hover:bg-asphalt-3"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "rgba(245,197,24,0.14)" }}
                />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-concrete">
                    {String(i + 1).padStart(2, "0")} · {s.category}
                  </span>
                  {s.verified && (
                    <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-hivis/80">
                      Offert
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="display mb-2 text-2xl text-warm transition-colors group-hover:text-hivis">
                    {s.title}
                  </h3>
                  <p className="text-sm text-concrete-light">{s.short}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-warm/60 transition-colors group-hover:text-hivis">
                  Détails
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

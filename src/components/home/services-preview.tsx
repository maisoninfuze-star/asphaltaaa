import Link from "next/link";
import Image from "next/image";
import { services } from "@/lib/site";
import { serviceImg } from "@/lib/images";
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
                className="group relative flex min-h-[16rem] flex-col justify-between overflow-hidden p-8"
              >
                {/* Image reveals on hover */}
                <div className="absolute inset-0 -z-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <Image
                    src={serviceImg[s.slug]}
                    alt=""
                    fill
                    sizes="(max-width:640px) 100vw, 33vw"
                    className="scale-105 object-cover transition-transform duration-[1.2s] group-hover:scale-100"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(11,11,13,0.55), rgba(11,11,13,0.92))",
                    }}
                  />
                </div>
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-concrete transition-colors group-hover:text-warm/70">
                    {String(i + 1).padStart(2, "0")} · {s.category}
                  </span>
                  {s.verified && (
                    <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-hivis/80">
                      Offert
                    </span>
                  )}
                </div>
                <div className="relative z-10">
                  <h3 className="display mb-2 text-2xl text-warm transition-colors group-hover:text-hivis">
                    {s.title}
                  </h3>
                  <p className="text-sm text-concrete-light">{s.short}</p>
                </div>
                <span className="relative z-10 mt-6 inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-warm/60 transition-colors group-hover:text-hivis">
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

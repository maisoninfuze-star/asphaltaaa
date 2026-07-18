import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { scellantLocations, getScellantLocation } from "@/lib/content/scellant-locations";
import { scellantServices, serviceComparison } from "@/lib/content/scellant-shared";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

export function generateStaticParams() {
  return scellantLocations.map((l) => ({ location: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }): Promise<Metadata> {
  const { location } = await params;
  const loc = getScellantLocation(location);
  if (!loc) return {};
  return {
    title: `Services de scellant — ${loc.name}`,
    description: `Scellant d'asphalte, réparation des fissures, nettoyage à sec et entretien à ${loc.name}.`,
    alternates: { canonical: `https://asphalteaaa.com/scellant/${loc.slug}/services` },
  };
}

export default async function ScellantServicesPage({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params;
  const loc = getScellantLocation(location);
  if (!loc) notFound();
  return (
    <>
      <PageHeader
        eyebrow={`Scellant — ${loc.name}`}
        index="Services"
        title="Protéger et entretenir votre asphalte."
        intro="Du nettoyage à l'application, chaque étape vise un fini uniforme et une protection qui dure."
      />

      <section className="bg-asphalt pb-8">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {scellantServices.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 70}>
              <article className="group relative flex min-h-[22rem] flex-col justify-end overflow-hidden border border-warm/12 p-7">
                <Image src={s.image} alt="" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover opacity-70 transition-transform duration-[1.2s] group-hover:scale-105" />
                <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,11,13,0.4), rgba(11,11,13,0.94))" }} />
                <div className="relative z-10">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-hivis">{String(i + 1).padStart(2, "0")}</span>
                    {s.verified && <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-hivis/70">Offert</span>}
                  </div>
                  <h2 className="display text-2xl text-warm">{s.title}</h2>
                  <p className="mt-2 text-sm text-concrete-light">{s.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-warm/10 bg-asphalt-2 py-20 lg:py-28">
        <div className="container-x">
          <p className="eyebrow mb-5">Entretien ou pavage&nbsp;?</p>
          <h2 className="display max-w-3xl text-warm text-3xl leading-[0.95] sm:text-4xl">
            Le bon service selon l&apos;état de votre surface.
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {[serviceComparison.scellant, serviceComparison.asphalte].map((c, idx) => (
              <div key={c.title} className={`flex flex-col border p-8 ${idx === 0 ? "border-hivis/40 bg-hivis/[0.04]" : "border-warm/15"}`}>
                <h3 className="display text-2xl text-warm">{c.title}</h3>
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {c.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-concrete-light">
                      <span className={idx === 0 ? "text-hivis" : "text-concrete"}>—</span>{p}
                    </li>
                  ))}
                </ul>
                <Link href={idx === 0 ? `/scellant/${loc.slug}/soumission` : "/asphalte"} className={`mt-8 w-fit px-6 py-3 font-mono text-[0.66rem] uppercase tracking-[0.16em] transition-colors ${idx === 0 ? "bg-hivis text-asphalt hover:bg-warm" : "border border-warm/30 text-warm hover:border-hivis hover:text-hivis"}`}>
                  {c.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

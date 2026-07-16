import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { scellantLocations, getScellantLocation } from "@/lib/content/scellant-locations";
import { scellantImg } from "@/lib/content/scellant-shared";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { BeforeAfter } from "@/components/motion/before-after";

export function generateStaticParams() {
  return scellantLocations.map((l) => ({ location: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }): Promise<Metadata> {
  const { location } = await params;
  const loc = getScellantLocation(location);
  if (!loc) return {};
  return {
    title: `Réalisations — Scellant ${loc.name}`,
    description: `Exemples de scellant et d'entretien d'asphalte à ${loc.name}.`,
    alternates: { canonical: `https://asphalteaaa.com/scellant/${loc.slug}/realisations` },
  };
}

export default async function ScellantRealisationsPage({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params;
  const loc = getScellantLocation(location);
  if (!loc) notFound();
  return (
    <>
      <PageHeader
        eyebrow={`Scellant — ${loc.name}`}
        index="Réalisations"
        title="Le fini fait la différence."
        intro="Un aperçu du travail de scellant et d'entretien. Vos vraies photos de projets seront ajoutées prochainement."
      />

      <section className="bg-asphalt pb-12">
        <div className="container-x grid gap-6 sm:grid-cols-2">
          {loc.gallery.map((g, i) => (
            <Reveal key={i} delay={(i % 2) * 80}>
              <article className="group relative aspect-[16/11] overflow-hidden border border-warm/12">
                <ImageReveal src={g.image} alt={g.title} sizes="(max-width:768px) 100vw, 50vw" className="h-full w-full" />
                <div className="absolute left-4 top-4 z-10 flex gap-2">
                  <span className="bg-hivis px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-asphalt">{g.service}</span>
                  {g.placeholder && <span className="border border-warm/25 bg-asphalt/60 px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-warm/70 backdrop-blur-sm">Exemple</span>}
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-asphalt/90 to-transparent p-5">
                  <h2 className="display text-lg text-warm">{g.title}</h2>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-warm/10 bg-asphalt py-16 lg:py-24">
        <div className="container-x">
          <p className="eyebrow mb-5">Avant / Après</p>
          <h2 className="display mb-10 max-w-2xl text-warm text-3xl leading-[0.95] sm:text-4xl lg:text-5xl">Glissez pour voir la transformation.</h2>
          <BeforeAfter before={scellantImg.baFaded} after={scellantImg.baSealed} className="aspect-[16/9] w-full border border-warm/15" />
        </div>
      </section>

      <section className="border-t border-warm/10 bg-asphalt-2 py-16 lg:py-20">
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="display max-w-xl text-3xl text-warm lg:text-4xl">Votre entrée pourrait être la prochaine.</h2>
          <Link href={`/scellant/${loc.slug}/soumission`} className="bg-hivis px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-asphalt transition-colors hover:bg-warm">
            Demander une soumission
          </Link>
        </div>
      </section>
    </>
  );
}

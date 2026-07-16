import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { scellantLocations, getScellantLocation } from "@/lib/content/scellant-locations";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return scellantLocations.map((l) => ({ location: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }): Promise<Metadata> {
  const { location } = await params;
  const loc = getScellantLocation(location);
  if (!loc) return {};
  return {
    title: `Contact — Scellant ${loc.name}`,
    description: `Contactez Asphalte AAA pour le scellant et l'entretien de votre asphalte à ${loc.name}.`,
    alternates: { canonical: `https://asphalteaaa.com/scellant/${loc.slug}/contact` },
  };
}

export default async function ScellantContactPage({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params;
  const loc = getScellantLocation(location);
  if (!loc) notFound();
  return (
    <>
      <PageHeader
        eyebrow={`Scellant — ${loc.name}`}
        index="Contact"
        title="Parlons de votre asphalte."
        intro={`On dessert ${loc.regionLabel}. Écrivez-nous ou appelez — on répond rapidement.`}
      />
      <section className="bg-asphalt pb-24 lg:pb-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-8">
            <div>
              <p className="label-mono mb-2">Téléphone</p>
              <a href={site.phoneHref} className="font-display text-3xl uppercase tracking-tight text-warm hover:text-hivis">{loc.phone}</a>
            </div>
            <div>
              <p className="label-mono mb-2">Courriel</p>
              <a href={site.emailHref} className="text-warm/80 hover:text-hivis">{loc.email}</a>
            </div>
            <div>
              <p className="label-mono mb-2">Heures</p>
              {site.hours.map((h) => (
                <div key={h.d} className="flex max-w-xs justify-between gap-4 text-sm text-concrete-light">
                  <span>{h.d}</span><span className="text-warm/60">{h.h}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="label-mono mb-2">Secteurs desservis</p>
              <p className="max-w-sm text-sm text-concrete-light">{loc.municipalities.join(" · ")}</p>
              <p className="mt-2 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-concrete">{loc.municipalitiesNote}</p>
            </div>
          </div>
          <div>
            <ContactForm division="scellant" region={loc.name} />
          </div>
        </div>
      </section>
    </>
  );
}

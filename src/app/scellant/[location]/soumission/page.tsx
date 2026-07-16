import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { scellantLocations, getScellantLocation } from "@/lib/content/scellant-locations";
import { PageHeader } from "@/components/page-header";
import { ScellantQuoteForm } from "@/components/scellant/scellant-quote-form";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return scellantLocations.map((l) => ({ location: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }): Promise<Metadata> {
  const { location } = await params;
  const loc = getScellantLocation(location);
  if (!loc) return {};
  return {
    title: `Soumission — Scellant ${loc.name}`,
    description: `Obtenez une soumission gratuite pour le scellant et l'entretien de votre asphalte à ${loc.name}.`,
    alternates: { canonical: `https://asphalteaaa.com/scellant/${loc.slug}/soumission` },
  };
}

export default async function ScellantSoumissionPage({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params;
  const loc = getScellantLocation(location);
  if (!loc) notFound();
  return (
    <>
      <PageHeader
        eyebrow="Soumission gratuite"
        index="Scellant"
        title="Votre soumission, en quelques étapes."
        intro={`Quelques questions rapides. On revient avec un prix clair pour votre projet de scellant à ${loc.name} — souvent la journée même.`}
      />
      <section className="bg-asphalt pb-24 lg:pb-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div className="lg:pt-4">
            <p className="max-w-sm text-concrete-light">
              Vous préférez parler à quelqu&apos;un ? Appelez-nous directement.
            </p>
            <a href={site.phoneHref} className="mt-4 block font-display text-3xl uppercase tracking-tight text-warm hover:text-hivis">
              {loc.phone}
            </a>
            <ul className="mt-8 space-y-3">
              {["Soumission gratuite et sans engagement", "Réponse rapide, souvent la journée même", "Prix clair, sans surprise"].map((t, i) => (
                <li key={t} className="flex items-start gap-3 text-concrete-light">
                  <span className="font-mono text-xs text-hivis">0{i + 1}</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <ScellantQuoteForm location={loc} />
        </div>
      </section>
    </>
  );
}

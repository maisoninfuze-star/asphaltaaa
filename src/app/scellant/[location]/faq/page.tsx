import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { scellantLocations, getScellantLocation } from "@/lib/content/scellant-locations";
import { PageHeader } from "@/components/page-header";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";

export function generateStaticParams() {
  return scellantLocations.map((l) => ({ location: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }): Promise<Metadata> {
  const { location } = await params;
  const loc = getScellantLocation(location);
  if (!loc) return {};
  return {
    title: `FAQ — Scellant ${loc.name}`,
    description: `Réponses aux questions fréquentes sur le scellant et l'entretien d'asphalte à ${loc.name}.`,
    alternates: { canonical: `https://asphalteaaa.com/scellant/${loc.slug}/faq` },
  };
}

export default async function ScellantFaqPage({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params;
  const loc = getScellantLocation(location);
  if (!loc) notFound();
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: loc.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <JsonLd data={faqLd} />
      <PageHeader eyebrow={`Scellant — ${loc.name}`} index="FAQ" title="Questions fréquentes." intro="Tout ce qu'il faut savoir avant de faire sceller votre asphalte." />
      <section className="bg-asphalt pb-24 lg:pb-32">
        <div className="container-x max-w-4xl">
          <FaqAccordion items={loc.faqs} />
          <div className="mt-12 border-t border-warm/10 pt-8">
            <p className="text-concrete-light">Une autre question ?</p>
            <Link href={`/scellant/${loc.slug}/contact`} className="mt-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-hivis hover:underline">
              Contactez-nous →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

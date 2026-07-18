import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { scellantLocations, getScellantLocation } from "@/lib/content/scellant-locations";
import { scellantImg, scellantBenefits } from "@/lib/content/scellant-shared";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return scellantLocations.map((l) => ({ location: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }): Promise<Metadata> {
  const { location } = await params;
  const loc = getScellantLocation(location);
  if (!loc) return {};
  return {
    title: `À propos — Scellant ${loc.name}`,
    description: `Asphalte AAA, division scellant à ${loc.name} : protéger, restaurer et prolonger la vie de votre asphalte.`,
    alternates: { canonical: `https://asphalteaaa.com/scellant/${loc.slug}/a-propos` },
  };
}

export default async function ScellantAboutPage({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params;
  const loc = getScellantLocation(location);
  if (!loc) notFound();
  return (
    <>
      <PageHeader
        eyebrow={`Scellant — ${loc.name}`}
        index="À propos"
        title="La précision AAA, appliquée en surface."
        intro="Le scellant est une division d'Asphalte AAA. Même exigence, même souci du détail — appliqués à la protection et à l'entretien de votre asphalte."
      />

      <section className="bg-asphalt pb-8">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden border border-warm/12">
              <Image src={scellantImg.regionHero(loc.slug)} alt={`Scellant d'asphalte — ${loc.regionLabel}`} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
          <div>
            <h2 className="display text-warm text-3xl leading-[0.95] sm:text-4xl">Une équipe locale, un travail soigné.</h2>
            <p className="mt-6 text-concrete-light">
              À {loc.name}, on protège et on ravive les surfaces d&apos;asphalte encore saines : nettoyage,
              préparation minutieuse et application uniforme du scellant. Pour les surfaces endommagées en
              profondeur, notre division{" "}
              <Link href="/asphalte" className="text-hivis hover:underline">pavage et réparation</Link>{" "}
              prend le relais — de l&apos;excavation à la surface finie.
            </p>
            <p className="mt-4 text-concrete-light">{loc.serviceAreaDescription}</p>
            <p className="mt-6 label-mono">NEQ {site.neq}</p>
          </div>
        </div>
      </section>

      <section className="bg-asphalt py-20 lg:py-28">
        <div className="container-x grid gap-px overflow-hidden border border-warm/10 bg-warm/10 sm:grid-cols-2 lg:grid-cols-4">
          {scellantBenefits.map((b, i) => (
            <Reveal key={b.title} delay={(i % 4) * 60} className="bg-asphalt-2">
              <div className="flex min-h-[12rem] flex-col justify-between p-7">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-hivis">0{i + 1}</span>
                <div>
                  <h3 className="display mb-2 text-lg text-warm">{b.title}</h3>
                  <p className="text-sm text-concrete-light">{b.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-warm/10 bg-asphalt-2 py-16 lg:py-20">
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="display max-w-xl text-3xl text-warm lg:text-4xl">Prêt à protéger votre asphalte&nbsp;?</h2>
          <Link href={`/scellant/${loc.slug}/soumission`} className="bg-hivis px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-asphalt transition-colors hover:bg-warm">
            Demander une soumission
          </Link>
        </div>
      </section>
    </>
  );
}

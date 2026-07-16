import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { BeforeAfter } from "@/components/motion/before-after";
import { HorizontalProjects } from "@/components/realisations/horizontal-projects";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Un aperçu de nos projets d'asphalte : entrées résidentielles, stationnements commerciaux, resurfaçage et réparations partout au Québec.",
};

export default function RealisationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Réalisations"
        index="/ 04"
        title="Du travail dont on est fiers."
        intro="Quelques projets récents. Les photos avant/après seront ajoutées prochainement — demandez-nous des références dans votre secteur."
      />

      <HorizontalProjects />

      <section className="border-t border-warm/10 bg-asphalt py-16 lg:py-24">
        <div className="container-x">
          <p className="eyebrow mb-5">Avant / Après</p>
          <h2 className="display mb-10 max-w-2xl text-warm text-3xl leading-[0.95] sm:text-4xl lg:text-5xl">
            Glissez pour voir la transformation.
          </h2>
          <BeforeAfter
            before={img.baBefore}
            after={img.baAfter}
            className="aspect-[16/9] w-full border border-warm/15"
          />
        </div>
      </section>

      <section className="border-t border-warm/10 bg-asphalt-2 py-16 lg:py-20">
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="display max-w-xl text-3xl text-warm lg:text-4xl">
            Votre projet pourrait être le prochain.
          </h2>
          <Link
            href="/asphalte/soumission"
            className="bg-hivis px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-asphalt transition-colors hover:bg-warm"
          >
            Demander une soumission
          </Link>
        </div>
      </section>
    </>
  );
}

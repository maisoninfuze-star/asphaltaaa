import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/site";
import { projectImg } from "@/lib/images";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { BeforeAfter } from "@/components/motion/before-after";
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

      <section className="border-t border-warm/10 bg-asphalt py-12 lg:py-16">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 80}>
              <article className="group flex h-full flex-col overflow-hidden border border-warm/10 bg-asphalt-2">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ImageReveal
                    src={projectImg[p.slug]}
                    alt={p.title}
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="h-full w-full"
                  />
                  <div className="absolute left-4 top-4 z-10 flex gap-2">
                    <span className="bg-hivis px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-asphalt">
                      {p.category}
                    </span>
                    <span className="border border-warm/20 bg-asphalt/50 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-warm/80 backdrop-blur-sm">
                      {p.year}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h2 className="display text-2xl text-warm transition-colors group-hover:text-hivis">
                    {p.title}
                  </h2>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-concrete">
                    {p.location} · {p.surface}
                  </p>
                  <p className="mt-4 flex-1 text-concrete-light">{p.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.services.map((sv) => (
                      <span
                        key={sv}
                        className="border border-warm/15 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-warm/70"
                      >
                        {sv}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

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
            href="/soumission"
            className="bg-hivis px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-asphalt transition-colors hover:bg-warm"
          >
            Demander une soumission
          </Link>
        </div>
      </section>
    </>
  );
}

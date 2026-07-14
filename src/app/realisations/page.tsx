import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/site";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

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
                {/* Placeholder visual — before/after slot */}
                <div className="relative aspect-[16/10] overflow-hidden bg-asphalt tex-asphalt">
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-70"
                    style={{
                      background:
                        "linear-gradient(135deg, #1b1b1f 0%, #0d0d0f 60%), radial-gradient(60% 60% at 30% 20%, rgba(245,197,24,0.10), transparent)",
                    }}
                  />
                  <div className="absolute left-4 top-4 flex gap-2">
                    <span className="bg-hivis px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-asphalt">
                      {p.category}
                    </span>
                    <span className="border border-warm/20 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-warm/70">
                      {p.year}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-concrete">
                    Photo à venir
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

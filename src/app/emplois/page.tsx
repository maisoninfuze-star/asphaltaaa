import type { Metadata } from "next";
import { jobs, site } from "@/lib/site";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Emplois",
  description:
    "Rejoignez l'équipe Asphalte AAA. Postes en pavage, excavation et manœuvre. Travail saisonnier, équipe humaine, sur la Rive-Sud et partout au Québec.",
};

const perks = [
  "Salaire compétitif selon l'expérience",
  "Équipe humaine et respectueuse",
  "Équipement bien entretenu",
  "Possibilité d'avancement",
];

export default function EmploisPage() {
  const subject = encodeURIComponent("Candidature — Asphalte AAA");
  return (
    <>
      <PageHeader
        eyebrow="Emplois"
        index="/ 05"
        title="Bâtissez avec nous."
        intro="On cherche des gens fiables, minutieux et fiers de leur travail. Si vous aimez voir un chantier bien fait, on veut vous parler."
      />

      <section className="border-t border-warm/10 bg-asphalt py-12 lg:py-16">
        <div className="container-x flex flex-col divide-y divide-warm/10 border-y border-warm/10">
          {jobs.map((j) => (
            <Reveal
              key={j.slug}
              className="group grid gap-4 py-8 md:grid-cols-[1fr_auto] md:items-center"
            >
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-hivis">
                    {j.type}
                  </span>
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-concrete">
                    {j.location}
                  </span>
                </div>
                <h2 className="display text-2xl text-warm transition-colors group-hover:text-hivis lg:text-3xl">
                  {j.title}
                </h2>
                <p className="mt-2 max-w-xl text-concrete-light">{j.blurb}</p>
              </div>
              <a
                href={`${site.emailHref}?subject=${subject}%20(${encodeURIComponent(j.title)})`}
                className="w-fit border border-warm/25 px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] text-warm transition-colors hover:border-hivis hover:text-hivis"
              >
                Postuler
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-warm/10 bg-asphalt-2 py-16 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="eyebrow mb-6">Pourquoi nous</p>
            <h2 className="display text-3xl text-warm lg:text-4xl">
              Une équipe qui prend soin de son monde.
            </h2>
          </div>
          <ul className="flex flex-col divide-y divide-warm/10 border-y border-warm/10">
            {perks.map((p, i) => (
              <li key={p} className="flex items-center gap-4 py-4">
                <span className="font-mono text-xs text-hivis">
                  0{i + 1}
                </span>
                <span className="text-warm-2">{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="container-x mt-10">
          <p className="text-concrete-light">
            Aucun poste ne correspond ? Envoyez quand même votre candidature à{" "}
            <a href={site.emailHref} className="text-hivis underline-offset-4 hover:underline">
              {site.email}
            </a>
            . On garde les bons profils en tête.
          </p>
        </div>
      </section>
    </>
  );
}

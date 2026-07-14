import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Zones desservies au Québec",
  description:
    "Asphalte AAA dessert la Rive-Sud de Montréal, Québec, Chicoutimi, Rimouski, Thetford Mines et les municipalités avoisinantes.",
};

const detail: Record<string, string> = {
  "Rive-Sud de Montréal":
    "Notre secteur d'attache. Brossard, Longueuil, Saint-Hubert, La Prairie et les environs.",
  "Québec": "La Capitale-Nationale et sa périphérie.",
  "Chicoutimi": "Le Saguenay–Lac-Saint-Jean, pour des surfaces qui encaissent l'hiver.",
  "Rimouski": "Le Bas-Saint-Laurent, entrées résidentielles et surfaces commerciales.",
  "Thetford Mines": "Chaudière-Appalaches et municipalités avoisinantes.",
};

export default function ZonesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Zones desservies"
        index="/ 03"
        title="On se déplace partout au Québec."
        intro={`Cinq grandes régions ${site.regionsNote}. Votre secteur n'est pas listé ? Écrivez-nous — on trouve souvent une solution.`}
      />

      <section className="border-t border-warm/10 bg-asphalt">
        <div className="container-x flex flex-col divide-y divide-warm/10">
          {site.regions.map((r, i) => (
            <Reveal
              key={r}
              className="group grid gap-4 py-10 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10"
            >
              <span className="font-mono text-sm text-hivis">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="display text-3xl text-warm transition-colors group-hover:text-hivis lg:text-4xl">
                  {r}
                </h2>
                <p className="mt-2 max-w-xl text-concrete-light">
                  {detail[r] ?? "Service d'asphalte complet disponible."}
                </p>
              </div>
              <Link
                href="/soumission"
                className="w-fit font-mono text-xs uppercase tracking-[0.18em] text-warm/60 transition-colors group-hover:text-hivis"
              >
                Soumission →
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-warm/10 bg-asphalt-2 py-16 lg:py-20">
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="max-w-xl text-lg text-concrete-light">
            Hors zone ? Contactez-nous quand même — selon l&apos;ampleur du
            projet, on se déplace.
          </p>
          <a
            href={site.phoneHref}
            className="bg-hivis px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-asphalt transition-colors hover:bg-warm"
          >
            {site.phone}
          </a>
        </div>
      </section>
    </>
  );
}

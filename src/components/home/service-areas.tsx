import Link from "next/link";
import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";

export function ServiceAreas() {
  return (
    <section className="relative overflow-hidden bg-asphalt-2 py-24 lg:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <p className="eyebrow mb-5">Zones desservies</p>
          <h2 className="display text-warm text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">
            On se déplace
            <br />
            dans tout le Québec.
          </h2>
          <p className="mt-6 max-w-md text-concrete-light">
            De la Rive-Sud de Montréal jusqu&apos;au Bas-Saint-Laurent — on
            couvre {site.regions.length} grandes régions {site.regionsNote}.
            Votre secteur n&apos;est pas listé ? Écrivez-nous, on trouve une
            solution.
          </p>
          <Link
            href="/zones"
            className="mt-8 inline-flex items-center gap-2 border border-warm/25 px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] text-warm transition-colors hover:border-hivis hover:text-hivis"
          >
            Voir les zones
          </Link>
        </div>

        <div className="flex flex-col divide-y divide-warm/10 border-y border-warm/10">
          {site.regions.map((r, i) => (
            <Reveal
              key={r}
              delay={i * 60}
              className="group flex items-center justify-between py-6"
            >
              <div className="flex items-baseline gap-5">
                <span className="font-mono text-xs text-hivis">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="display text-2xl text-warm transition-colors group-hover:text-hivis lg:text-3xl">
                  {r}
                </span>
              </div>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-concrete opacity-0 transition-opacity group-hover:opacity-100">
                Disponible
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

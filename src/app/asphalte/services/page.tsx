import type { Metadata } from "next";
import Link from "next/link";
import { services, process } from "@/lib/site";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Pavage et réparation d'asphalte",
  description:
    "Excavation, nivellement, fondation de pierre, pavage d'asphalte, resurfaçage, réparation des fissures et des trous. De la pose à la réparation, un travail propre et durable.",
};

const categories = ["Terrassement", "Installation", "Réparation", "Entretien"] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pose et pavage"
        index="/ 01"
        title="Du terrain brut à la surface finie."
        intro="De l'excavation à la pose d'une nouvelle couche d'asphalte, en passant par la réparation des fissures et des trous, Asphalte AAA prend en charge chaque étape avec la même rigueur. Pour l'entretien et le scellant d'une surface déjà en place, voyez notre division entretien et protection."
      />

      {categories.map((cat) => {
        const list = services.filter((s) => s.category === cat);
        if (!list.length) return null;
        return (
          <section key={cat} className="border-t border-warm/10 bg-asphalt py-16 lg:py-24">
            <div className="container-x">
              <div className="mb-10 flex items-baseline gap-4">
                <h2 className="display text-2xl text-warm lg:text-3xl">{cat}</h2>
                <span className="font-mono text-xs text-concrete">
                  {String(list.length).padStart(2, "0")} services
                </span>
              </div>
              <div className="grid gap-px overflow-hidden border border-warm/10 bg-warm/10 md:grid-cols-2">
                {list.map((s) => (
                  <Reveal key={s.slug} className="bg-asphalt">
                    <Link
                      href={`/asphalte/services/${s.slug}`}
                      className="group flex h-full flex-col justify-between gap-8 p-8 transition-colors duration-500 hover:bg-asphalt-2 lg:p-10"
                    >
                      <div>
                        <div className="mb-4 flex items-center justify-between">
                          <span className="label-mono">{s.category}</span>
                          {s.verified && (
                            <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-hivis/80">
                              Offert
                            </span>
                          )}
                        </div>
                        <h3 className="display text-2xl text-warm transition-colors group-hover:text-hivis lg:text-3xl">
                          {s.title}
                        </h3>
                        <p className="mt-3 max-w-md text-concrete-light">{s.desc}</p>
                      </div>
                      <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-warm/60 transition-colors group-hover:text-hivis">
                        En savoir plus
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Process recap */}
      <section className="border-t border-warm/10 bg-asphalt-2 py-16 lg:py-24">
        <div className="container-x">
          <p className="eyebrow mb-6">Notre méthode</p>
          <div className="grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {process.map((p) => (
              <div key={p.n} className="flex gap-4 border-t border-warm/10 py-4">
                <span className="font-mono text-xs text-hivis">{p.n}</span>
                <div>
                  <h3 className="font-display text-base uppercase tracking-tight text-warm">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-concrete">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

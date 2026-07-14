import type { Metadata } from "next";
import { site, stats } from "@/lib/site";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Asphalte AAA : une équipe rapide, minutieuse et humaine. On prend en charge votre projet du terrain brut à la surface finie, sur la Rive-Sud de Montréal et partout au Québec.",
};

const values = [
  {
    t: "La précision, pas les raccourcis",
    d: "Une base solide, un drainage pensé, la bonne épaisseur. On fait les choses dans l'ordre parce que c'est ce qui dure.",
  },
  {
    t: "Le respect du client",
    d: "Des soumissions claires, des délais tenus, un chantier propre. Vous savez toujours où en est votre projet.",
  },
  {
    t: "La fierté du métier",
    d: "On reprend souvent des projets laissés en plan par d'autres — et on les termine comme s'ils étaient les nôtres.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="À propos"
        index="/ 02"
        title="La précision AAA."
        intro="Votre entrée mérite un service à la hauteur de votre investissement. Chez Asphalte AAA, on croit que chaque propriété mérite une apparence soignée et une surface qui dure."
      />

      <section className="border-t border-warm/10 bg-asphalt py-16 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="eyebrow mb-6">Notre histoire</p>
            <div className="space-y-6 text-lg text-concrete-light">
              <p>
                Asphalte AAA est né d&apos;une conviction simple : protéger,
                embellir et prolonger la vie des surfaces extérieures, en faisant
                le travail correctement.
              </p>
              <p>
                On a commencé par le scellant et le lavage à pression. Aujourd&apos;hui,
                on prend en charge le service complet — excavation, fondation,
                pavage, réparations et entretien — du terrain brut jusqu&apos;à la
                surface finie.
              </p>
              <p>
                Une équipe rapide, travaillante et surtout humaine, qui traite
                chaque projet avec le même soin, qu&apos;il s&apos;agisse d&apos;une
                entrée résidentielle ou d&apos;un stationnement commercial.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-px self-start overflow-hidden border border-warm/10 bg-warm/10">
            {stats.map((s) => (
              <div key={s.label} className="bg-asphalt p-8">
                <div className="display text-4xl text-warm lg:text-5xl">
                  {s.value}
                </div>
                <div className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-concrete-light">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-warm/10 bg-asphalt-2 py-16 lg:py-24">
        <div className="container-x">
          <p className="eyebrow mb-10">Nos valeurs</p>
          <div className="grid gap-px overflow-hidden border border-warm/10 bg-warm/10 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 80} className="bg-asphalt p-8 lg:p-10">
                <span className="font-mono text-xs text-hivis">
                  0{i + 1}
                </span>
                <h3 className="display mt-6 text-xl text-warm">{v.t}</h3>
                <p className="mt-3 text-concrete-light">{v.d}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 font-mono text-xs text-concrete">
            NEQ {site.neq} · {site.regions.join(" · ")} {site.regionsNote}
          </p>
        </div>
      </section>
    </>
  );
}

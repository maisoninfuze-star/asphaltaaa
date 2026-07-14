import { Reveal, RevealText } from "@/components/reveal";

const pillars = [
  {
    n: "01",
    t: "Le service complet",
    d: "Excavation, fondation, pavage, réparation, scellant. Un seul interlocuteur du premier coup de pelle à la dernière ligne.",
  },
  {
    n: "02",
    t: "La bonne façon",
    d: "Une base solide, un drainage pensé, une épaisseur respectée. Ce qui tient dans le temps se joue sous la surface.",
  },
  {
    n: "03",
    t: "Une équipe humaine",
    d: "Rapides, minutieux, honnêtes. On reprend même les projets laissés en plan par d'autres — et on les termine avec fierté.",
  },
];

export function Manifesto() {
  return (
    <section className="relative overflow-hidden bg-asphalt py-24 lg:py-36">
      <div className="container-x">
        <p className="eyebrow mb-10">Notre engagement</p>
        <h2 className="display max-w-5xl text-warm text-[9vw] leading-[0.92] sm:text-6xl lg:text-[5rem]">
          <RevealText text="Votre surface mérite un travail à la hauteur de votre investissement." />
        </h2>

        <div className="mt-20 grid gap-px overflow-hidden border border-warm/10 bg-warm/10 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal
              key={p.n}
              delay={i * 90}
              className="group bg-asphalt p-8 transition-colors duration-500 hover:bg-asphalt-2 lg:p-10"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-xs tracking-[0.2em] text-hivis">
                  {p.n}
                </span>
                <span className="h-2 w-2 bg-hivis transition-transform duration-500 group-hover:rotate-45" />
              </div>
              <h3 className="display mb-4 text-2xl text-warm">{p.t}</h3>
              <p className="text-concrete-light">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

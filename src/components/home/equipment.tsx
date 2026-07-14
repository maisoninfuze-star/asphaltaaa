import { equipment } from "@/lib/images";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal } from "@/components/reveal";

export function Equipment() {
  return (
    <section className="relative overflow-hidden border-t border-warm/10 bg-asphalt-2 py-24 lg:py-36">
      <div className="container-x">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-5">Notre équipement</p>
            <h2 className="display max-w-2xl text-warm text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">
              La bonne machine pour chaque couche.
            </h2>
          </div>
          <p className="max-w-xs text-concrete-light">
            De l&apos;excavatrice au rouleau compresseur, on arrive équipés pour
            faire le travail correctement, du premier au dernier passage.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {equipment.map((e, i) => (
            <Reveal key={e.name} delay={i * 90}>
              <article className="group relative overflow-hidden border border-warm/12">
                <ParallaxImage
                  src={e.image}
                  alt={e.name}
                  strength={10}
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="aspect-[3/4]"
                />
                <div className="absolute inset-x-0 bottom-0 z-10 p-6">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-hivis">
                    {e.role}
                  </p>
                  <h3 className="display mt-2 text-2xl text-warm">{e.name}</h3>
                  <p className="mt-1 text-sm text-concrete-light">{e.spec}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

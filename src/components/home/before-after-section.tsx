import { BeforeAfter } from "@/components/motion/before-after";
import { Reveal } from "@/components/reveal";
import { img } from "@/lib/images";

export function BeforeAfterSection() {
  return (
    <section className="relative overflow-hidden border-t border-warm/10 bg-asphalt py-24 lg:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="eyebrow mb-5">Avant / Après</p>
          <h2 className="display text-warm text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">
            La différence,
            <br />
            glissez pour voir.
          </h2>
          <p className="mt-6 max-w-md text-concrete-light">
            D&apos;une surface fissurée et affaissée à un fini lisse, étanche et
            durable. Faites glisser la poignée pour comparer une vraie
            transformation.
          </p>
          <p className="mt-6 font-mono text-xs text-concrete">
            ← Glissez la poignée →
          </p>
        </div>

        <Reveal>
          <BeforeAfter
            before={img.baBefore}
            after={img.baAfter}
            className="aspect-[16/10] w-full border border-warm/15"
          />
        </Reveal>
      </div>
    </section>
  );
}

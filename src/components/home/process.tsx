import { process } from "@/lib/site";
import { Reveal } from "@/components/reveal";

export function Process() {
  return (
    <section className="relative overflow-hidden bg-asphalt py-24 lg:py-36">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="eyebrow mb-5">Notre méthode</p>
            <h2 className="display text-warm text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">
              Neuf étapes,
              <br />
              zéro raccourci.
            </h2>
            <p className="mt-6 max-w-md text-concrete-light">
              Chaque projet suit le même ordre rigoureux. C&apos;est cette
              discipline qui fait la différence entre une surface qui paraît
              bien et une surface qui dure des années.
            </p>
          </div>

          <ol className="relative">
            {process.map((step, i) => (
              <Reveal
                key={step.n}
                as="li"
                delay={(i % 2) * 60}
                className="group grid grid-cols-[auto_1fr] gap-6 border-t border-warm/10 py-6 last:border-b"
              >
                <span className="font-mono text-sm tabular-nums text-hivis">
                  {step.n}
                </span>
                <div>
                  <h3 className="display text-xl text-warm transition-colors group-hover:text-hivis lg:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-concrete-light">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

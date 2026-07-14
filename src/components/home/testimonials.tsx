import { testimonials, site } from "@/lib/site";
import { Reveal } from "@/components/reveal";

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-asphalt py-24 lg:py-36">
      <div className="container-x">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-5">Ce qu&apos;on dit de nous</p>
            <h2 className="display text-warm text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">
              Des clients qui
              <br />
              recommandent.
            </h2>
          </div>
          <a
            href={site.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-hivis"
          >
            Avis sur Facebook ↗
          </a>
        </div>

        <div className="grid gap-px overflow-hidden border border-warm/10 bg-warm/10 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.author}
              delay={i * 90}
              className="flex flex-col justify-between gap-10 bg-asphalt p-8 lg:p-10"
            >
              <div>
                <div className="mb-6 flex gap-1 text-hivis" aria-label="5 étoiles sur 5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s}>★</span>
                  ))}
                </div>
                <blockquote className="text-lg leading-relaxed text-warm-2">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="flex items-center justify-between border-t border-warm/10 pt-5">
                <span className="font-display text-sm uppercase tracking-tight text-warm">
                  {t.author}
                </span>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-concrete">
                  {t.source}
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

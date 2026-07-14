import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, site } from "@/lib/site";
import { serviceImg } from "@/lib/images";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { ParallaxImage } from "@/components/motion/parallax-image";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.desc,
  };
}

const benefits: Record<string, string[]> = {
  default: [
    "Évaluation honnête et soumission détaillée sans surprise",
    "Matériaux de qualité et épaisseurs respectées",
    "Équipe minutieuse, chantier propre",
    "Travail garanti",
  ],
};

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();

  const idx = services.findIndex((x) => x.slug === slug);
  const next = services[(idx + 1) % services.length];
  const list = benefits[slug] ?? benefits.default;

  return (
    <>
      <PageHeader
        eyebrow={s.category}
        index={`/ ${String(idx + 1).padStart(2, "0")}`}
        title={s.title}
        intro={s.desc}
      />

      <ParallaxImage
        src={serviceImg[slug]}
        alt={s.title}
        priority
        strength={12}
        sizes="100vw"
        imgClassName="object-[50%_32%]"
        className="aspect-[16/9] w-full border-y border-warm/10 sm:aspect-[2/1] lg:aspect-[21/8]"
      />

      <section className="border-t border-warm/10 bg-asphalt py-16 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="eyebrow mb-6">Pourquoi nous confier ce travail</p>
            <div className="flex flex-col divide-y divide-warm/10 border-y border-warm/10">
              {list.map((b, i) => (
                <Reveal
                  key={i}
                  className="flex items-start gap-5 py-5"
                  delay={i * 50}
                >
                  <span className="mt-1 font-mono text-xs text-hivis">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg text-warm-2">{b}</p>
                </Reveal>
              ))}
            </div>

            <p className="mt-10 max-w-xl text-concrete-light">
              {s.short} On planifie chaque intervention selon l&apos;état de
              votre surface, l&apos;accès au site et la météo, pour un résultat
              qui tient dans le temps.
            </p>
          </div>

          {/* Sticky CTA card */}
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="border border-warm/15 bg-asphalt-2 p-8">
              <p className="label-mono mb-3">Soumission gratuite</p>
              <h2 className="display text-2xl text-warm">
                Un projet de {s.title.toLowerCase()} ?
              </h2>
              <p className="mt-3 text-sm text-concrete-light">
                Décrivez-nous votre besoin — on vous répond rapidement, souvent
                la journée même.
              </p>
              <Link
                href="/soumission"
                className="mt-6 flex w-full items-center justify-center gap-2 bg-hivis px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] text-asphalt transition-colors hover:bg-warm"
              >
                Demander une soumission
              </Link>
              <a
                href={site.phoneHref}
                className="mt-3 flex w-full items-center justify-center gap-2 border border-warm/25 px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] text-warm transition-colors hover:border-hivis hover:text-hivis"
              >
                {site.phone}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Next service */}
      <section className="border-t border-warm/10 bg-asphalt-2">
        <Link
          href={`/services/${next.slug}`}
          className="group container-x flex items-center justify-between py-12"
        >
          <div>
            <span className="label-mono">Service suivant</span>
            <p className="display mt-2 text-3xl text-warm transition-colors group-hover:text-hivis lg:text-4xl">
              {next.title}
            </p>
          </div>
          <span className="font-mono text-2xl text-hivis transition-transform group-hover:translate-x-2">
            →
          </span>
        </Link>
      </section>
    </>
  );
}

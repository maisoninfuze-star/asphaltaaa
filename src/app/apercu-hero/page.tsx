import type { Metadata } from "next";
import { heroVariants } from "@/lib/images";

export const metadata: Metadata = {
  title: "Aperçu — options de héros vidéo",
  robots: { index: false, follow: false },
};

/** Temporary internal page to compare the fal.ai hero video options. */
export default function HeroPreviewPage() {
  const entries = Object.entries(heroVariants);
  return (
    <div className="bg-asphalt pb-32 pt-28">
      <div className="container-x">
        <p className="eyebrow mb-4">Aperçu interne</p>
        <h1 className="display text-warm text-4xl lg:text-6xl">
          Trois options de héros vidéo
        </h1>
        <p className="mt-5 max-w-xl text-concrete-light">
          Générées avec fal.ai (Flux → Kling). Regardez chaque option en
          mouvement, puis dites-moi laquelle garder (clé indiquée sous chaque
          vidéo). Cette page est temporaire.
        </p>

        <div className="mt-14 space-y-16">
          {entries.map(([key, v], i) => (
            <section key={key}>
              <div className="mb-4 flex items-baseline justify-between border-b border-warm/10 pb-3">
                <h2 className="display text-2xl text-warm">
                  <span className="mr-3 font-mono text-sm text-hivis">
                    0{i + 1}
                  </span>
                  {v.label}
                </h2>
                <code className="font-mono text-xs text-hivis">
                  activeHero = &quot;{key}&quot;
                </code>
              </div>
              <div className="relative aspect-video w-full overflow-hidden border border-warm/12 bg-asphalt-2">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={v.poster}
                  className="h-full w-full object-cover"
                >
                  <source src={v.video} type="video/mp4" />
                </video>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

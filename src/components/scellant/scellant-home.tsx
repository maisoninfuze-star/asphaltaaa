import Link from "next/link";
import Image from "next/image";
import type { ScellantLocation } from "@/lib/content/scellant-locations";
import {
  scellantServices,
  scellantBenefits,
  scellantProcess,
  serviceComparison,
  scellantImg,
} from "@/lib/content/scellant-shared";
import { Reveal } from "@/components/reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { BeforeAfter } from "@/components/motion/before-after";
import { FaqAccordion } from "@/components/faq-accordion";
import { ScellantHero } from "@/components/scellant/scellant-hero";
import { ScellantTransformation } from "@/components/scellant/scellant-transformation";

const trust = [
  "Soumission gratuite",
  "Service résidentiel",
  "Service commercial",
  "Équipe locale",
  "Préparation professionnelle",
  "Réponse rapide",
];

export function ScellantHome({ location }: { location: ScellantLocation }) {
  const soumission = `/scellant/${location.slug}/soumission`;
  return (
    <>
      <ScellantHero location={location} />

      {/* Trust bar */}
      <section className="border-y border-warm/10 bg-asphalt-2">
        <div className="container-x flex flex-wrap items-center gap-x-8 gap-y-3 py-5">
          {trust.map((t) => (
            <span key={t} className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-warm/70">
              <span className="text-hivis">✦</span>
              {t}
            </span>
          ))}
        </div>
      </section>

      <ScellantTransformation />

      {/* Services */}
      <section className="border-t border-warm/10 bg-asphalt py-24 lg:py-32">
        <div className="container-x">
          <p className="eyebrow mb-5">Nos services</p>
          <h2 className="display max-w-3xl text-warm text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">
            Protéger et entretenir votre asphalte.
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden border border-warm/10 bg-warm/10 sm:grid-cols-2 lg:grid-cols-3">
            {scellantServices.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 70} className="bg-asphalt">
                <article className="group relative flex min-h-[16rem] flex-col justify-between overflow-hidden p-8">
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                    <Image src={s.image} alt="" fill sizes="(max-width:640px) 100vw, 33vw" className="scale-105 object-cover transition-transform duration-[1.2s] group-hover:scale-100" />
                    <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,11,13,0.55), rgba(11,11,13,0.92))" }} />
                  </div>
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-concrete group-hover:text-warm/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.verified && (
                      <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-hivis/80">Offert</span>
                    )}
                  </div>
                  <div className="relative z-10">
                    <h3 className="display mb-2 text-2xl text-warm transition-colors group-hover:text-hivis">{s.title}</h3>
                    <p className="text-sm text-concrete-light">{s.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Which service? (comparison) */}
      <section className="border-t border-warm/10 bg-asphalt-2 py-24 lg:py-32">
        <div className="container-x">
          <p className="eyebrow mb-5">Quel service choisir ?</p>
          <h2 className="display max-w-3xl text-warm text-3xl leading-[0.95] sm:text-4xl lg:text-5xl">
            Votre asphalte est encore solide, mais son apparence se dégrade ?
          </h2>
          <p className="mt-6 max-w-2xl text-concrete-light">
            Le scellant protège et ravive une surface saine, sans refaire toute la surface. Si votre asphalte est
            endommagé en profondeur, une nouvelle couche d'asphalte peut être recommandée. Voici comment choisir.
          </p>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {[serviceComparison.scellant, serviceComparison.asphalte].map((c, idx) => (
              <div key={c.title} className={`flex flex-col border p-8 ${idx === 0 ? "border-hivis/40 bg-hivis/[0.04]" : "border-warm/15"}`}>
                <h3 className="display text-2xl text-warm">{c.title}</h3>
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {c.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-concrete-light">
                      <span className={idx === 0 ? "text-hivis" : "text-concrete"}>—</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  href={idx === 0 ? soumission : c.href}
                  className={`mt-8 w-fit px-6 py-3 font-mono text-[0.66rem] uppercase tracking-[0.16em] transition-colors ${
                    idx === 0 ? "bg-hivis text-asphalt hover:bg-warm" : "border border-warm/30 text-warm hover:border-hivis hover:text-hivis"
                  }`}
                >
                  {c.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-8 font-mono text-xs text-concrete">
            Vous ne savez pas quel service choisir ?{" "}
            <Link href={soumission} className="text-hivis hover:underline">Écrivez-nous, on vous guide →</Link>
          </p>
        </div>
      </section>

      {/* Why maintain (benefits) */}
      <section className="border-t border-warm/10 bg-asphalt py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow mb-5">Pourquoi entretenir</p>
            <h2 className="display text-warm text-3xl leading-[0.95] sm:text-4xl lg:text-5xl">
              Un asphalte entretenu vieillit mieux.
            </h2>
            <p className="mt-6 max-w-md text-concrete-light">
              L&apos;apparence, la protection préventive et la préservation de la surface : un entretien régulier
              aide votre asphalte à mieux traverser le sel, les UV et les hivers québécois.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden border border-warm/10 bg-warm/10 sm:grid-cols-2">
            {scellantBenefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 2) * 70} className="bg-asphalt-2">
                <div className="flex min-h-[12rem] flex-col justify-between p-7">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-hivis">0{i + 1}</span>
                  <div>
                    <h3 className="display mb-2 text-xl text-warm">{b.title}</h3>
                    <p className="text-sm text-concrete-light">{b.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Educational warning — cheap DIY products (NOT an AAA project) */}
      <section className="border-t border-warm/10 bg-asphalt py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow mb-5">À savoir</p>
            <h2 className="display text-warm text-3xl leading-[0.95] sm:text-4xl lg:text-5xl">
              Pourquoi éviter les produits bon marché appliqués soi-même&nbsp;?
            </h2>
            <p className="mt-6 max-w-lg text-concrete-light">
              Certains scellants vendus en magasin peuvent former une couche
              fragile qui décolle rapidement lorsqu&apos;ils sont mal choisis ou
              mal appliqués. Une préparation adaptée, un produit professionnel et
              une application uniforme font toute la différence.
            </p>
          </div>
          <Reveal>
            <figure className="relative overflow-hidden border border-warm/15">
              <div className="relative aspect-[4/3]">
                <Image src={scellantImg.peeling} alt="Exemple d'un scellant bon marché qui décolle de la surface" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
              </div>
              <figcaption className="border-t border-warm/10 bg-asphalt-2 px-4 py-3 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-concrete">
                Exemple de détérioration — pas un projet Asphalte AAA
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Before / after */}
      <section className="border-t border-warm/10 bg-asphalt-2 py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow mb-5">Avant / Après</p>
            <h2 className="display text-warm text-4xl leading-[0.95] sm:text-5xl">
              Une entrée qui retrouve sa protection.
            </h2>
            <p className="mt-6 max-w-md text-concrete-light">
              Glissez pour comparer une surface vieillissante avec le résultat
              obtenu après la préparation, les réparations nécessaires et
              l&apos;application uniforme du scellant.
            </p>
            <p className="mt-6 font-mono text-xs text-concrete">← Glissez la poignée →</p>
          </div>
          <Reveal>
            <BeforeAfter before={scellantImg.baFaded} after={scellantImg.baSealed} beforeLabel="Avant — Surface vieillissante" afterLabel="Après — Surface protégée" className="aspect-[4/5] w-full max-w-md border border-warm/15" />
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-warm/10 bg-asphalt py-24 lg:py-32">
        <div className="container-x">
          <p className="eyebrow mb-5">Notre processus</p>
          <h2 className="display max-w-3xl text-warm text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">
            Simple, propre, sans surprise.
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden border border-warm/10 bg-warm/10 sm:grid-cols-2 lg:grid-cols-4">
            {scellantProcess.map((step, i) => (
              <Reveal key={step.n} delay={(i % 4) * 60} className="bg-asphalt">
                <div className="flex min-h-[12rem] flex-col justify-between p-7">
                  <span className="font-mono text-sm text-hivis">{step.n}</span>
                  <div>
                    <h3 className="display mb-2 text-lg text-warm">{step.title}</h3>
                    <p className="text-sm text-concrete-light">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects gallery */}
      <section className="border-t border-warm/10 bg-asphalt-2 py-24 lg:py-32">
        <div className="container-x">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-5">Réalisations — {location.name}</p>
              <h2 className="display text-warm text-4xl leading-[0.95] sm:text-5xl">Notre travail parle.</h2>
            </div>
            <Link href={`/scellant/${location.slug}/realisations`} className="font-mono text-xs uppercase tracking-[0.16em] text-hivis">
              Toutes les réalisations →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {location.gallery.map((g, i) => (
              <Reveal key={i} delay={(i % 2) * 80}>
                <article className="group relative aspect-[16/11] overflow-hidden border border-warm/12">
                  <ImageReveal src={g.image} alt={g.title} sizes="(max-width:768px) 100vw, 50vw" className="h-full w-full" />
                  <div className="absolute left-4 top-4 z-10 flex gap-2">
                    <span className="bg-hivis px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-asphalt">{g.service}</span>
                    {g.placeholder && (
                      <span className="border border-warm/25 bg-asphalt/60 px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-warm/70 backdrop-blur-sm">Exemple</span>
                    )}
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-asphalt/90 to-transparent p-5">
                    <h3 className="display text-lg text-warm">{g.title}</h3>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-concrete">
            Photos d&apos;illustration — vos vraies réalisations seront ajoutées.
          </p>
        </div>
      </section>

      {/* Reviews */}
      <section className="border-t border-warm/10 bg-asphalt py-24 lg:py-32">
        <div className="container-x">
          <p className="eyebrow mb-5">Avis clients</p>
          <h2 className="display max-w-3xl text-warm text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">
            Ce que les clients en disent.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {location.testimonials.map((t, i) => (
              <Reveal key={i} delay={(i % 3) * 80}>
                <figure className="flex h-full flex-col justify-between border border-warm/12 bg-asphalt-2 p-7">
                  <div className="mb-6 flex gap-1 text-hivis" aria-hidden>{"★★★★★"}</div>
                  <blockquote className="flex-1 text-warm-2">“{t.quote}”</blockquote>
                  <figcaption className="mt-6 border-t border-warm/10 pt-4">
                    <p className="font-display text-lg uppercase tracking-tight text-warm">{t.author}</p>
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-concrete">{t.source}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Local service map / municipalities */}
      <section className="border-t border-warm/10 bg-asphalt-2 py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow mb-5">Zone desservie</p>
            <h2 className="display text-warm text-3xl leading-[0.95] sm:text-4xl lg:text-5xl">
              Au service de {location.regionLabel}.
            </h2>
            <p className="mt-6 max-w-md text-concrete-light">{location.serviceAreaDescription}</p>
            <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-concrete">{location.municipalitiesNote}</p>
            <Link href={`/scellant/${location.slug}/contact`} className="mt-8 inline-flex w-fit items-center gap-2 border border-warm/30 px-6 py-3 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-warm transition-colors hover:border-hivis hover:text-hivis">
              Confirmer mon secteur →
            </Link>
          </div>
          <Reveal>
            <div className="relative overflow-hidden border border-warm/12">
              <div className="relative aspect-[4/3] w-full">
                <Image src={location.cityPhoto} alt={`${location.name} — ${location.regionLabel}`} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,11,13,0.15), rgba(11,11,13,0.85))" }} />
                <span className="absolute left-4 top-4 bg-hivis px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-asphalt">{location.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-px overflow-hidden border-t border-warm/10 bg-warm/10 sm:grid-cols-3">
                {location.municipalities.map((m) => (
                  <div key={m} className="bg-asphalt px-4 py-4 text-center">
                    <span className="text-sm text-warm/80">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-warm/10 bg-asphalt py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[0.6fr_1.4fr]">
          <div>
            <p className="eyebrow mb-5">Questions fréquentes</p>
            <h2 className="display text-warm text-4xl leading-[0.95] sm:text-5xl">On répond.</h2>
          </div>
          <FaqAccordion items={location.faqs} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-warm/10 bg-asphalt py-24 lg:py-32">
        <div className="container-x text-center">
          <p className="eyebrow mb-6">Soumission gratuite</p>
          <h2 className="display mx-auto max-w-4xl text-warm text-[clamp(2rem,6vw,4.5rem)] leading-[0.9]">
            Prêt à redonner vie à votre asphalte&nbsp;?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-concrete-light">
            Service de scellant à {location.name}. On revient rapidement avec un prix clair.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href={soumission} className="bg-hivis px-8 py-5 font-mono text-xs uppercase tracking-[0.18em] text-asphalt transition-colors hover:bg-warm">
              Demander ma soumission — {location.name}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

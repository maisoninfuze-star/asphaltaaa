import { SiteFooter } from "@/components/site-footer";
import { scellantNav, scellantServiceLinks } from "@/lib/content/navigation";

/** Scellant division footer — location-aware links. */
export function ScellantFooter({ slug }: { slug: string }) {
  return (
    <SiteFooter
      homeHref={`/scellant/${slug}`}
      navItems={scellantNav(slug)}
      serviceLinks={scellantServiceLinks(slug)}
      serviceLabel="Entretien"
      ctaHref={`/scellant/${slug}/soumission`}
      ctaTitle={["Redonnez vie", "à votre asphalte."]}
      tagline="Scellant, réparation des fissures et entretien d'asphalte — protéger, restaurer, prolonger. Une division d'Asphalte AAA."
    />
  );
}

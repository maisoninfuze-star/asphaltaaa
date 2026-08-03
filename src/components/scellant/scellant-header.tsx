import { SiteHeader } from "@/components/site-header";
import { scellantNavPrimary, scellantNavMore } from "@/lib/content/navigation";
import { ScellantRegionSwitcher } from "@/components/scellant/scellant-region-switcher";

/**
 * Scellant division header — region-aware, with a switch back to paving.
 * Nav is split (primary inline + "Plus" dropdown) and the region name lives
 * only in the switcher (no duplicate context label), so the bar stays clean.
 */
export function ScellantHeader({ slug, name }: { slug: string; name: string }) {
  return (
    <SiteHeader
      homeHref={`/scellant/${slug}`}
      navItems={scellantNavPrimary(slug)}
      moreItems={scellantNavMore(slug)}
      ctaHref={`/scellant/${slug}/soumission`}
      ctaLabel="Soumission"
      switchLabel="Besoin d'un pavage ?"
      switchHref="/asphalte"
      regionSwitcher={<ScellantRegionSwitcher activeSlug={slug} />}
    />
  );
}

import { SiteHeader } from "@/components/site-header";
import { scellantNav } from "@/lib/content/navigation";
import { ScellantRegionSwitcher } from "@/components/scellant/scellant-region-switcher";

/** Scellant division header — region-aware, with a switch back to paving. */
export function ScellantHeader({ slug, name }: { slug: string; name: string }) {
  return (
    <SiteHeader
      homeHref={`/scellant/${slug}`}
      navItems={scellantNav(slug)}
      ctaHref={`/scellant/${slug}/soumission`}
      ctaLabel="Soumission"
      switchLabel="Besoin d'un pavage ?"
      switchHref="/asphalte"
      contextLabel={`Scellant — ${name}`}
      regionSwitcher={<ScellantRegionSwitcher activeSlug={slug} />}
    />
  );
}

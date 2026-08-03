import type { HeaderNavItem } from "@/components/site-header";

/** Scellant division nav, scoped to the active location. */
export function scellantNav(slug: string): HeaderNavItem[] {
  return [...scellantNavPrimary(slug), ...scellantNavMore(slug)];
}

/** Primary nav shown inline in the scellant header. */
export function scellantNavPrimary(slug: string): HeaderNavItem[] {
  const base = `/scellant/${slug}`;
  return [
    { label: "Accueil", href: base },
    { label: "Services", href: `${base}/services` },
    { label: "Réalisations", href: `${base}/realisations` },
  ];
}

/** Secondary nav collapsed into the "Plus" dropdown. */
export function scellantNavMore(slug: string): HeaderNavItem[] {
  const base = `/scellant/${slug}`;
  return [
    { label: "À propos", href: `${base}/a-propos` },
    { label: "FAQ", href: `${base}/faq` },
    { label: "Contact", href: `${base}/contact` },
  ];
}

export function scellantServiceLinks(slug: string): HeaderNavItem[] {
  const base = `/scellant/${slug}`;
  return [
    { label: "Application de scellant", href: `${base}/services` },
    { label: "Réparation des fissures", href: `${base}/services` },
    { label: "Réparation des trous", href: `${base}/services` },
    { label: "Nettoyage à sec", href: `${base}/services` },
    { label: "Protection des surfaces", href: `${base}/services` },
  ];
}

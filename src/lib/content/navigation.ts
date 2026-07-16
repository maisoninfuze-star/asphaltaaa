import type { HeaderNavItem } from "@/components/site-header";

/** Scellant division nav, scoped to the active location. */
export function scellantNav(slug: string): HeaderNavItem[] {
  const base = `/scellant/${slug}`;
  return [
    { label: "Accueil", href: base },
    { label: "Services", href: `${base}/services` },
    { label: "Réalisations", href: `${base}/realisations` },
    { label: "À propos", href: `${base}/a-propos` },
    { label: "FAQ", href: `${base}/faq` },
    { label: "Contact", href: `${base}/contact` },
  ];
}

export function scellantServiceLinks(slug: string): HeaderNavItem[] {
  const base = `/scellant/${slug}`;
  return [
    { label: "Scellant d'asphalte", href: `${base}/services` },
    { label: "Lavage à pression", href: `${base}/services` },
    { label: "Préparation de surface", href: `${base}/services` },
    { label: "Entretien résidentiel", href: `${base}/services` },
    { label: "Entretien commercial", href: `${base}/services` },
  ];
}

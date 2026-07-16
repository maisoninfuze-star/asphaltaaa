import { site } from "@/lib/site";
import type { ScellantLocation } from "@/lib/content/scellant-locations";

const BASE = "https://asphalteaaa.com";

/**
 * Structured data for a scellant location — LocalBusiness + Service + Breadcrumb
 * + FAQPage. Only accurate fields: real central contact, region as areaServed,
 * no fabricated street address (address omitted until verified).
 */
export function scellantJsonLd(loc: ScellantLocation): object[] {
  const url = `${BASE}${loc.seo.canonicalPath}`;

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${site.name} — Scellant ${loc.name}`,
    url,
    telephone: loc.phone,
    email: loc.email,
    priceRange: "$$",
    areaServed: loc.municipalities.map((m) => ({ "@type": "City", name: m })),
    sameAs: [site.facebook],
    description: loc.seo.description,
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Scellant d'asphalte",
    provider: { "@type": "LocalBusiness", name: site.name, telephone: site.phone },
    areaServed: loc.regionLabel,
    url,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: BASE },
      { "@type": "ListItem", position: 2, name: "Scellant", item: `${BASE}/scellant` },
      { "@type": "ListItem", position: 3, name: loc.name, item: url },
    ],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: loc.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return [localBusiness, service, breadcrumb, faqPage];
}

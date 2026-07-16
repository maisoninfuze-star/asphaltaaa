import type { MetadataRoute } from "next";
import { nav, services } from "@/lib/site";
import { scellantLocations } from "@/lib/content/scellant-locations";

const base = "https://asphalteaaa.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Gateway
  const gateway = [{ url: base, priority: 1, changeFrequency: "monthly" as const }];

  // Asphaltage complet division
  const asphalteRoutes = [
    "/asphalte",
    ...nav.map((n) => n.href).filter((h) => h !== "/asphalte"),
    "/asphalte/soumission",
    "/asphalte/faq",
  ];
  const asphaltePages = asphalteRoutes.map((r) => ({
    url: `${base}${r}`,
    changeFrequency: "monthly" as const,
    priority: r === "/asphalte" ? 0.9 : 0.7,
  }));
  const servicePages = services.map((s) => ({
    url: `${base}/asphalte/services/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Scellant division (selector + one localized site per region)
  const scellantSub = ["", "/services", "/realisations", "/a-propos", "/faq", "/contact", "/soumission"];
  const scellantPages = [
    { url: `${base}/scellant`, changeFrequency: "monthly" as const, priority: 0.8 },
    ...scellantLocations.flatMap((loc) =>
      scellantSub.map((sub) => ({
        url: `${base}/scellant/${loc.slug}${sub}`,
        changeFrequency: "monthly" as const,
        priority: sub === "" ? 0.9 : 0.6,
      }))
    ),
  ];

  return [...gateway, ...asphaltePages, ...servicePages, ...scellantPages].map((p) => ({
    ...p,
    lastModified: now,
  }));
}

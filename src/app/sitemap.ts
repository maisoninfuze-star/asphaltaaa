import type { MetadataRoute } from "next";
import { nav, services } from "@/lib/site";

const base = "https://asphalteaaa.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    ...nav.map((n) => n.href).filter((h) => h !== "/"),
    "/soumission",
    "/faq",
  ];
  const staticPages = routes.map((r) => ({
    url: `${base}${r}`,
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.7,
  }));
  const servicePages = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...staticPages, ...servicePages];
}

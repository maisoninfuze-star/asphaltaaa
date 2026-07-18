import type { NextConfig } from "next";

// Specific service redirects (removed / renamed slugs) — must come BEFORE the
// generic /services/:slug rule so they win. Pressure washing → maintenance.
const serviceRedirects: [string, string][] = [
  ["/asphalte/services/lavage-pression", "/scellant"],
  ["/services/lavage-pression", "/scellant"],
  ["/asphalte/services/scellant", "/scellant"],
  ["/services/scellant", "/scellant"],
  ["/asphalte/services/lignage", "/asphalte/services"],
  ["/services/lignage", "/asphalte/services"],
  ["/asphalte/services/reparations", "/asphalte/services/reparation-fissures"],
  ["/services/reparations", "/asphalte/services/reparation-fissures"],
];

// Old single-division URLs → new /asphalte/* division routes.
const asphalteRedirects: [string, string][] = [
  ["/services", "/asphalte/services"],
  ["/services/:slug", "/asphalte/services/:slug"],
  ["/realisations", "/asphalte/realisations"],
  ["/a-propos", "/asphalte/a-propos"],
  ["/zones", "/asphalte/zones-desservies"],
  ["/emplois", "/asphalte/emplois"],
  ["/contact", "/asphalte/contact"],
  ["/soumission", "/asphalte/soumission"],
  ["/faq", "/asphalte/faq"],
];

const nextConfig: NextConfig = {
  async redirects() {
    return [...serviceRedirects, ...asphalteRedirects].map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;

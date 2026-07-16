import type { NextConfig } from "next";

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
    return asphalteRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;

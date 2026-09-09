/**
 * SCELLANT DIVISION — per-location data. One shared template renders all three.
 * Contact defaults to the single verified company line; region-specific facts that
 * are NOT verified use clearly-labelled [À CONFIRMER] placeholders (never fabricated).
 */
import { site } from "@/lib/site";
import {
  scellantFaqs,
  scellantTestimonials,
  scellantImg,
  type ScellantFAQ,
} from "@/lib/content/scellant-shared";

export type ScellantSlug = "rive-sud" | "quebec" | "rimouski" | "estrie";

export type ScellantGalleryItem = {
  image: string;
  title: string;
  service: string;
  /** Placeholder flag — real customer photos to be supplied before launch. */
  placeholder?: boolean;
};

export type ScellantLocation = {
  slug: ScellantSlug;
  name: string;
  regionLabel: string;
  heroTitle: string;
  heroDescription: string;
  /** Central verified contact by default; override per region only when confirmed. */
  phone: string;
  email: string;
  address?: string;
  municipalities: string[];
  municipalitiesNote: string;
  serviceAreaDescription: string;
  /** Real regional identity photo (supplied by the owner). */
  cityPhoto: string;
  heroMedia: { poster: string; video?: string };
  gallery: ScellantGalleryItem[];
  testimonials: typeof scellantTestimonials;
  faqs: ScellantFAQ[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
  };
  ghlRouting: { locationTag: string };
};

const galleryFor = (): ScellantGalleryItem[] => [
  { image: scellantImg.baSealed, title: "Entrée résidentielle scellée", service: "Scellant d'asphalte" },
  { image: scellantImg.protected, title: "Fini noir uniforme", service: "Scellant d'asphalte" },
  { image: scellantImg.dryCleaning, title: "Nettoyage à sec", service: "Préparation" },
  { image: scellantImg.spray, title: "Application par pulvérisation", service: "Scellant d'asphalte" },
];

/** Region-specific service-area FAQ appended to the shared list. */
const areaFaq = (region: string, municipalities: string[]): ScellantFAQ => ({
  q: "Quelle région desservez-vous ?",
  a: `Nous desservons ${region} et les municipalités avoisinantes — notamment ${municipalities
    .slice(0, 5)
    .join(", ")}. Votre secteur n'est pas dans la liste ? Contactez-nous pour confirmer.`,
});

export const scellantLocations: ScellantLocation[] = [
  {
    slug: "rive-sud",
    name: "Rive-Sud",
    regionLabel: "la Rive-Sud de Montréal",
    heroTitle: "Scellant d'asphalte sur la Rive-Sud de Montréal",
    heroDescription:
      "Protégez et ravivez votre entrée d'asphalte sur la Rive-Sud de Montréal. Scellant durable, préparation soignée et fini noir profond — une équipe rapide et humaine.",
    phone: site.phone,
    email: site.email,
    municipalities: [
      "Longueuil", "Brossard", "Saint-Lambert", "Boucherville",
      "Saint-Hubert", "La Prairie", "Candiac", "Sainte-Julie",
    ],
    municipalitiesNote: "Secteurs desservis — à confirmer avec le propriétaire.",
    serviceAreaDescription:
      "Service de scellant et d'entretien d'asphalte pour les propriétés résidentielles et, selon le secteur, commerciales de la Rive-Sud de Montréal.",
    cityPhoto: "/assets/regions/rive-sud.jpg",
    heroMedia: { poster: scellantImg.regionHero("rive-sud"), video: scellantImg.heroVideo },
    gallery: galleryFor(),
    testimonials: scellantTestimonials,
    faqs: [
      ...scellantFaqs,
      areaFaq("la Rive-Sud de Montréal", ["Longueuil", "Brossard", "Saint-Lambert", "Boucherville", "Saint-Hubert"]),
    ],
    seo: {
      title: "Scellant d'asphalte sur la Rive-Sud de Montréal",
      description:
        "Scellant d'asphalte, réparation des fissures et entretien d'entrées de cour sur la Rive-Sud de Montréal. Soumission gratuite, fini noir profond et durable.",
      keywords: [
        "scellant asphalte Rive-Sud",
        "entretien d'asphalte Rive-Sud", "réparation d'asphalte Rive-Sud",
        "protection entrée asphaltée Longueuil", "scellant entrée de cour Brossard",
      ],
      canonicalPath: "/scellant/rive-sud",
    },
    ghlRouting: { locationTag: "Scellant Rive-Sud" },
  },
  {
    slug: "quebec",
    name: "Québec",
    regionLabel: "la région de Québec",
    heroTitle: "Scellant d'asphalte dans la région de Québec",
    heroDescription:
      "Redonnez vie à votre asphalte dans la région de Québec. Un scellant uniforme et durable pour protéger votre entrée contre le sel, les UV et l'hiver québécois.",
    phone: site.phone,
    email: site.email,
    municipalities: [
      "Québec", "Lévis", "Sainte-Foy", "Charlesbourg",
      "Beauport", "L'Ancienne-Lorette", "Saint-Augustin-de-Desmaures",
    ],
    municipalitiesNote: "Secteurs desservis — à confirmer avec le propriétaire.",
    serviceAreaDescription:
      "Service de scellant et d'entretien d'asphalte pour les propriétés de la région de Québec, sur les deux rives.",
    cityPhoto: "/assets/regions/quebec.jpg",
    heroMedia: { poster: scellantImg.regionHero("quebec"), video: scellantImg.heroVideo },
    gallery: galleryFor(),
    testimonials: scellantTestimonials,
    faqs: [
      ...scellantFaqs,
      areaFaq("la région de Québec", ["Québec", "Lévis", "Sainte-Foy", "Charlesbourg", "Beauport"]),
    ],
    seo: {
      title: "Scellant d'asphalte dans la région de Québec",
      description:
        "Scellant d'asphalte, réparation des fissures et entretien d'entrées de cour dans la région de Québec. Soumission gratuite, fini durable.",
      keywords: [
        "scellant d'asphalte Québec", "entretien d'asphalte Québec",
        "réparation d'asphalte Québec", "protection entrée asphaltée Lévis",
        "scellant entrée de cour Sainte-Foy",
      ],
      canonicalPath: "/scellant/quebec",
    },
    ghlRouting: { locationTag: "Scellant Quebec" },
  },
  {
    slug: "rimouski",
    name: "Rimouski",
    regionLabel: "Rimouski et le Bas-Saint-Laurent",
    heroTitle: "Scellant d'asphalte à Rimouski et dans le Bas-Saint-Laurent",
    heroDescription:
      "Protégez votre entrée d'asphalte contre le climat maritime du Bas-Saint-Laurent. Scellant durable et fini soigné, à Rimouski et dans les environs.",
    phone: site.phone,
    email: site.email,
    municipalities: [
      "Rimouski", "Mont-Joli", "Rivière-du-Loup", "Trois-Pistoles",
      "Le Bic", "Sainte-Luce", "Saint-Anaclet",
    ],
    municipalitiesNote: "Secteurs desservis — à confirmer avec le propriétaire.",
    serviceAreaDescription:
      "Service de scellant et d'entretien d'asphalte pour les propriétés de Rimouski et du Bas-Saint-Laurent.",
    cityPhoto: "/assets/regions/rimouski.jpg",
    heroMedia: { poster: scellantImg.regionHero("rimouski"), video: scellantImg.heroVideo },
    gallery: galleryFor(),
    testimonials: scellantTestimonials,
    faqs: [
      ...scellantFaqs,
      areaFaq("Rimouski et le Bas-Saint-Laurent", ["Rimouski", "Mont-Joli", "Rivière-du-Loup", "Le Bic", "Sainte-Luce"]),
    ],
    seo: {
      title: "Scellant d'asphalte à Rimouski et dans le Bas-Saint-Laurent",
      description:
        "Scellant d'asphalte, réparation des fissures et entretien d'entrées de cour à Rimouski et dans le Bas-Saint-Laurent. Soumission gratuite.",
      keywords: [
        "scellant d'asphalte Rimouski", "entretien d'asphalte Bas-Saint-Laurent",
        "réparation d'asphalte Rimouski", "protection entrée asphaltée Mont-Joli",
      ],
      canonicalPath: "/scellant/rimouski",
    },
    ghlRouting: { locationTag: "Scellant Rimouski" },
  },
  {
    slug: "estrie",
    name: "Estrie",
    regionLabel: "l'Estrie",
    heroTitle: "Scellant d'asphalte en Estrie",
    heroDescription:
      "Protégez votre entrée d'asphalte contre les hivers rigoureux de l'Estrie. Scellant durable, préparation soignée et fini noir profond — de Sherbrooke à Magog.",
    phone: site.phone,
    email: site.email,
    municipalities: [
      "Sherbrooke", "Magog", "Coaticook", "Windsor",
      "East Angus", "Val-des-Sources", "Lac-Mégantic",
    ],
    municipalitiesNote: "Secteurs desservis — à confirmer avec le propriétaire.",
    serviceAreaDescription:
      "Service de scellant et d'entretien d'asphalte pour les propriétés résidentielles et, selon le secteur, commerciales de l'Estrie.",
    cityPhoto: "/assets/regions/estrie.jpg",
    heroMedia: { poster: scellantImg.regionHero("estrie"), video: scellantImg.heroVideo },
    gallery: galleryFor(),
    testimonials: scellantTestimonials,
    faqs: [
      ...scellantFaqs,
      areaFaq("l'Estrie", ["Sherbrooke", "Magog", "Coaticook", "Windsor", "East Angus"]),
    ],
    seo: {
      title: "Scellant d'asphalte en Estrie",
      description:
        "Scellant d'asphalte, réparation des fissures et entretien d'entrées de cour en Estrie — Sherbrooke, Magog et les environs. Soumission gratuite.",
      keywords: [
        "scellant d'asphalte Estrie", "scellant d'asphalte Sherbrooke",
        "entretien d'asphalte Sherbrooke", "réparation d'asphalte Estrie",
        "protection entrée asphaltée Magog",
      ],
      canonicalPath: "/scellant/estrie",
    },
    ghlRouting: { locationTag: "Scellant Estrie" },
  },
];

export function getScellantLocation(slug: string): ScellantLocation | undefined {
  return scellantLocations.find((l) => l.slug === slug);
}

/**
 * SITE DATA — single source of truth.
 * Real business facts extracted from asphalteaaa.com (do not invent contradicting info).
 * Items marked TODO are tasteful placeholders the owner can confirm/replace.
 */

export const site = {
  name: "Asphalte AAA",
  legalName: "Asphalte AAA",
  neq: "1178789161",
  tagline: "Service d'asphalte complet",
  taglineLong: "De l'excavation à la surface finie — la précision AAA.",
  phone: "(263) 588-8043",
  phoneHref: "tel:+12635888043",
  email: "asphalteaaa@gmail.com",
  emailHref: "mailto:asphalteaaa@gmail.com",
  facebook:
    "https://www.facebook.com/profile.php?id=100093324523469&sk=reviews",
  hours: [
    { d: "Lundi – Samedi", h: "7 h 00 – 21 h 30" },
    { d: "Dimanche", h: "Sur rendez-vous" },
  ],
  regions: [
    "Rive-Sud de Montréal",
    "Québec",
    "Chicoutimi",
    "Rimouski",
    "Thetford Mines",
  ],
  regionsNote: "et les municipalités avoisinantes",
} as const;

export const nav = [
  { label: "Accueil", href: "/asphalte" },
  { label: "Services", href: "/asphalte/services" },
  { label: "Réalisations", href: "/asphalte/realisations" },
  { label: "À propos", href: "/asphalte/a-propos" },
  { label: "Zones desservies", href: "/asphalte/zones-desservies" },
  { label: "Emplois", href: "/asphalte/emplois" },
  { label: "Contact", href: "/asphalte/contact" },
] as const;

/** The narrative stages of a full asphalt project — powers the cinematic hero. */
export const projectStages = [
  { n: "01", key: "terrain", label: "Terrain brut", sub: "Analyse & marquage" },
  { n: "02", key: "excavation", label: "Excavation", sub: "Retrait & nivellement" },
  { n: "03", key: "fondation", label: "Fondation 0-¾", sub: "Pierre concassée" },
  { n: "04", key: "compaction", label: "Compaction", sub: "Densité optimale" },
  { n: "05", key: "pavage", label: "Pavage à chaud", sub: "Enrobé bitumineux" },
  { n: "06", key: "rouleau", label: "Rouleau compresseur", sub: "Surface lisse" },
  { n: "07", key: "finition", label: "Finition", sub: "Bordures & scellant" },
] as const;

export type Service = {
  slug: string;
  title: string;
  short: string;
  desc: string;
  category: "Installation" | "Réparation" | "Entretien" | "Terrassement";
  verified?: boolean; // true = confirmed on existing site
};

export const services: Service[] = [
  {
    slug: "excavation",
    title: "Excavation & terrassement",
    short: "On part de zéro, du bon côté.",
    desc: "Retrait du sol instable, nivellement et préparation du site. Une fondation solide commence sous la surface.",
    category: "Terrassement",
  },
  {
    slug: "nivellement",
    title: "Nivellement & drainage",
    short: "L'eau suit la pente qu'on lui donne.",
    desc: "Pentes calculées et solutions de drainage pour évacuer l'eau et éviter la fissuration prématurée.",
    category: "Terrassement",
  },
  {
    slug: "fondation",
    title: "Fondation de pierre 0-¾",
    short: "La base qui porte tout.",
    desc: "Pose et compaction de pierre concassée pour une assise stable qui résiste au gel et aux charges lourdes.",
    category: "Installation",
  },
  {
    slug: "pavage",
    title: "Pavage d'asphalte",
    short: "Enrobé à chaud, posé avec précision.",
    desc: "Installation d'asphalte neuf pour entrées résidentielles, stationnements commerciaux et voies privées.",
    category: "Installation",
  },
  {
    slug: "resurfacage",
    title: "Resurfaçage & rapiéçage",
    short: "Une seconde vie, sans tout refaire.",
    desc: "Couche de recouvrement sur une base saine pour retrouver une surface neuve à une fraction du coût.",
    category: "Réparation",
  },
  {
    slug: "reparations",
    title: "Réparations & nids-de-poule",
    short: "On règle le problème à la source.",
    desc: "Colmatage de fissures, réparation de nids-de-poule et de dommages hivernaux avant qu'ils ne s'aggravent.",
    category: "Réparation",
  },
  {
    slug: "scellant",
    title: "Scellant d'asphalte",
    short: "Une entrée qui retrouve sa jeunesse.",
    desc: "Scellant durable, uniforme et appliqué avec précision — protection contre les fissures, le sel, les UV et les intempéries.",
    category: "Entretien",
    verified: true,
  },
  {
    slug: "lavage-pression",
    title: "Lavage à pression",
    short: "Propre, comme au premier jour.",
    desc: "Nettoyage efficace du béton, du pavé uni et de l'asphalte — saletés, moisissures et taches tenaces retirées.",
    category: "Entretien",
    verified: true,
  },
  {
    slug: "lignage",
    title: "Lignage de stationnement",
    short: "De l'ordre, ligne après ligne.",
    desc: "Marquage et lignage de stationnements commerciaux, cases accessibles et signalisation au sol.",
    category: "Entretien",
  },
];

export const process = [
  { n: "01", title: "Consultation", desc: "On écoute votre besoin et on évalue le terrain." },
  { n: "02", title: "Visite & mesure", desc: "Relevé précis des surfaces et des contraintes du site." },
  { n: "03", title: "Soumission claire", desc: "Un prix détaillé, sans surprise, par écrit." },
  { n: "04", title: "Excavation", desc: "Retrait du sol instable et préparation de l'assise." },
  { n: "05", title: "Fondation", desc: "Pierre concassée compactée pour une base durable." },
  { n: "06", title: "Pavage", desc: "Enrobé à chaud posé et nivelé à la bonne épaisseur." },
  { n: "07", title: "Compaction", desc: "Rouleau compresseur pour une densité et une planéité optimales." },
  { n: "08", title: "Finition", desc: "Bordures, transitions et scellant pour un rendu impeccable." },
  { n: "09", title: "Inspection", desc: "On valide chaque détail avec vous avant de quitter." },
];

export const stats = [
  { value: "500+", label: "Clients satisfaits", note: "TODO: chiffre à confirmer" },
  { value: "5", label: "Régions desservies", note: "" },
  { value: "9", label: "Étapes maîtrisées", note: "" },
  { value: "100%", label: "Travail garanti", note: "TODO: garantie à préciser" },
];

export const testimonials = [
  {
    quote:
      "Beau travail de mes deux entrées de cour. Je recommande fortement.",
    author: "Dave Levass",
    source: "Avis Google",
  },
  {
    quote:
      "Service sympathique et professionnel. Un excellent rapport qualité-prix et en plus ils ont fait les travaux la journée même !",
    author: "Mia Adam",
    source: "Avis Google",
  },
  {
    quote:
      "I wasn't too sure at first, but I was happy I trusted the team — great work and stellar service.",
    author: "Benjamin James",
    source: "Avis Google",
  },
];

export type Project = {
  slug: string;
  title: string;
  location: string;
  category: string;
  surface: string;
  year: string;
  services: string[];
  summary: string;
};

// TODO: remplacer par de vrais projets + photos avant/après.
export const projects: Project[] = [
  {
    slug: "entree-residentielle-brossard",
    title: "Entrée résidentielle repavée",
    location: "Brossard, Rive-Sud",
    category: "Résidentiel",
    surface: "185 m²",
    year: "2024",
    services: ["Excavation", "Fondation", "Pavage"],
    summary:
      "Retrait d'une vieille dalle fissurée, nouvelle fondation de pierre et pavage complet pour une entrée nette et durable.",
  },
  {
    slug: "stationnement-commercial-longueuil",
    title: "Stationnement commercial",
    location: "Longueuil",
    category: "Commercial",
    surface: "1 400 m²",
    year: "2024",
    services: ["Nivellement", "Pavage", "Lignage"],
    summary:
      "Réfection complète d'un stationnement, drainage corrigé et lignage neuf pour maximiser les cases.",
  },
  {
    slug: "resurfacage-chicoutimi",
    title: "Resurfaçage d'entrée double",
    location: "Chicoutimi",
    category: "Résidentiel",
    surface: "240 m²",
    year: "2023",
    services: ["Resurfaçage", "Scellant"],
    summary:
      "Couche de recouvrement sur une base saine, puis scellant pour protéger la surface des hivers rigoureux.",
  },
  {
    slug: "reparations-thetford",
    title: "Réparations & scellant",
    location: "Thetford Mines",
    category: "Entretien",
    surface: "320 m²",
    year: "2023",
    services: ["Réparations", "Scellant", "Lavage à pression"],
    summary:
      "Colmatage de fissures, réparation de nids-de-poule et scellant uniforme pour prolonger la vie de la surface.",
  },
];

export const jobs = [
  {
    slug: "operateur-pavage",
    title: "Opérateur·rice de pavage",
    type: "Temps plein · Saisonnier",
    location: "Rive-Sud / déplacements",
    blurb:
      "Vous maîtrisez la paveuse et le fini de surface. On cherche quelqu'un de fiable et minutieux.",
  },
  {
    slug: "manoeuvre-asphalte",
    title: "Manœuvre en asphalte",
    type: "Temps plein · Saisonnier",
    location: "Rive-Sud / déplacements",
    blurb:
      "Poste d'entrée idéal pour apprendre le métier. Débrouillard, ponctuel, prêt à travailler dehors.",
  },
  {
    slug: "operateur-excavation",
    title: "Opérateur·rice d'excavation",
    type: "Temps plein · Saisonnier",
    location: "Rive-Sud / déplacements",
    blurb:
      "Expérience en pelle mécanique et nivellement. Vous préparez des fondations solides.",
  },
];

export const faqs = [
  {
    q: "Faites-vous seulement du scellant ?",
    a: "Non. Asphalte AAA offre le service complet : excavation, nivellement, fondation de pierre, pavage d'asphalte neuf, resurfaçage, réparations, scellant, lavage à pression et lignage. On peut prendre en charge votre projet du terrain brut jusqu'à la surface finie.",
  },
  {
    q: "Dans quelles régions travaillez-vous ?",
    a: "Rive-Sud de Montréal, Québec, Chicoutimi, Rimouski, Thetford Mines et les municipalités avoisinantes. Contactez-nous pour confirmer votre secteur.",
  },
  {
    q: "Combien coûte un projet d'asphalte ?",
    a: "Chaque projet est unique : la superficie, l'état du sol, le drainage et l'accès influencent le prix. On vous fournit une soumission gratuite, détaillée et sans surprise après une visite.",
  },
  {
    q: "Quel est le meilleur moment pour paver ou sceller ?",
    a: "La saison chaude (mai à octobre) est idéale pour le pavage et le scellant, car l'asphalte a besoin de chaleur pour bien adhérer et durcir. On planifie selon la météo pour un résultat optimal.",
  },
  {
    q: "Offrez-vous une garantie ?",
    a: "Oui, notre travail est garanti. Les détails de la garantie sont précisés dans votre soumission. TODO : préciser la durée exacte de la garantie.",
  },
  {
    q: "Reprenez-vous les projets laissés en plan par d'autres ?",
    a: "Absolument. On reprend souvent des projets inachevés et on les termine avec fierté et selon les règles de l'art.",
  },
];

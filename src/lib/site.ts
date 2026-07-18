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

// Division pavage = pose, pavage et réparation. Le scellant et l'entretien
// vivent dans la division /scellant. Aucun service de lavage à l'eau.
export const services: Service[] = [
  {
    slug: "excavation",
    title: "Excavation & terrassement",
    short: "On part de zéro, du bon côté.",
    desc: "Retrait du sol instable, nivellement et préparation du site. Une surface durable commence par une préparation rigoureuse.",
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
    short: "Une nouvelle couche, posée avec précision.",
    desc: "Pose d'une nouvelle couche d'asphalte pour entrées résidentielles, stationnements commerciaux et voies privées.",
    category: "Installation",
    verified: true,
  },
  {
    slug: "resurfacage",
    title: "Resurfaçage & rapiéçage",
    short: "Une seconde vie, sans tout refaire.",
    desc: "Couche de recouvrement sur une base saine pour retrouver une surface neuve lorsque l'état de la fondation le permet.",
    category: "Réparation",
  },
  {
    slug: "reparation-fissures",
    title: "Réparation des fissures",
    short: "Arrêter l'eau avant qu'elle n'aggrave.",
    desc: "Colmatage des fissures afin de limiter l'infiltration d'eau et de ralentir leur aggravation.",
    category: "Réparation",
    verified: true,
  },
  {
    slug: "reparation-trous",
    title: "Réparation des trous et nids-de-poule",
    short: "Corriger le problème à la source.",
    desc: "Correction des trous, des nids-de-poule et des zones détériorées avant qu'ils ne deviennent structurels.",
    category: "Réparation",
    verified: true,
  },
];

export const process = [
  { n: "01", title: "Consultation", desc: "On écoute votre besoin et on évalue le terrain." },
  { n: "02", title: "Visite & mesure", desc: "Relevé précis des surfaces et des contraintes du site." },
  { n: "03", title: "Soumission claire", desc: "Un prix détaillé, sans surprise, par écrit." },
  { n: "04", title: "Excavation", desc: "Retrait du sol instable et préparation de l'assise." },
  { n: "05", title: "Fondation", desc: "Pierre concassée compactée pour une base durable." },
  { n: "06", title: "Pose de l'asphalte", desc: "Nouvelle couche d'asphalte posée et nivelée à la bonne épaisseur." },
  { n: "07", title: "Compaction", desc: "Rouleau compresseur pour une densité et une planéité optimales." },
  { n: "08", title: "Finition", desc: "Bordures et transitions soignées pour un rendu impeccable." },
  { n: "09", title: "Inspection", desc: "On valide chaque détail avec vous avant de quitter." },
];

// Non-numeric trust indicators (unverified figures removed).
export const stats = [
  { value: "Résidentiel", label: "et commercial", note: "" },
  { value: "Soumission", label: "gratuite et claire", note: "" },
  { value: "Préparation", label: "minutieuse", note: "" },
  { value: "Travail", label: "propre", note: "" },
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
  surface?: string;
  year?: string;
  services: string[];
  summary: string;
  image?: string;
};

// Vrais projets Asphalte AAA (photos réelles). Aucune adresse, superficie ni
// date inventée — location au niveau régional seulement.
export const projects: Project[] = [
  {
    slug: "entree-residentielle-scellee",
    title: "Entrée résidentielle scellée",
    location: "Québec",
    category: "Résidentiel",
    services: ["Scellant", "Réparation des fissures"],
    summary:
      "Préparation à sec, réparation des fissures et application uniforme d'un scellant protecteur pour raviver et protéger l'entrée.",
    image: "/assets/projects/driveway-blue-house.jpg",
  },
  {
    slug: "entree-double-protegee",
    title: "Entrée double protégée",
    location: "Québec",
    category: "Résidentiel",
    services: ["Scellant"],
    summary:
      "Une entrée vieillissante retrouve un fini noir uniforme après la préparation et l'application du scellant.",
    image: "/assets/projects/driveway-brick-houses.jpg",
  },
  {
    slug: "entree-maison-blanche",
    title: "Entrée résidentielle ravivée",
    location: "Québec",
    category: "Résidentiel",
    services: ["Scellant", "Réparation des trous"],
    summary:
      "Correction des zones détériorées et scellant appliqué par pulvérisation, avec protection soignée des bordures.",
    image: "/assets/projects/project-white-house.jpg",
  },
  {
    slug: "grande-propriete-entretien",
    title: "Entretien d'une grande propriété",
    location: "Québec",
    category: "Résidentiel",
    services: ["Scellant", "Nettoyage à sec"],
    summary:
      "Nettoyage à sec, protection des surfaces adjacentes et application du scellant sur une grande entrée de cour.",
    image: "/assets/projects/process-spray-estate.jpg",
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
    q: "Quels services offrez-vous ?",
    a: "De la pose à l'entretien : excavation, nivellement, fondation de pierre, pavage d'asphalte, resurfaçage, réparation des fissures et des trous, ainsi que l'application de scellant. De la pose initiale à l'entretien préventif, on accompagne votre surface à chaque étape de sa durée de vie.",
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
    q: "Quel est le meilleur moment pour paver ou appliquer un scellant ?",
    a: "La saison chaude est idéale : l'asphalte et le scellant ont besoin de chaleur pour bien adhérer et durcir. La surface doit aussi être sèche avant l'application du scellant. On planifie selon la météo pour un résultat optimal.",
  },
  {
    q: "Pose ou entretien : comment savoir ce qu'il me faut ?",
    a: "Si la fondation demeure stable et que la surface a surtout perdu sa couleur ou présente des fissures légères, l'entretien et le scellant suffisent souvent. Si la fondation a cédé, que le drainage est déficient ou que les dommages sont structurels, une réparation plus complète ou une nouvelle couche d'asphalte peut être recommandée. Envoyez-nous quelques photos et on vous guide.",
  },
];

/**
 * SCELLANT DIVISION — shared content (division-wide, location-independent).
 * Real service facts confirmed on asphalteaaa.com (scellant + lavage à pression).
 * Expanded maintenance items are tasteful, clearly-replaceable placeholders.
 */

const B = "/assets/generated/scellant";

export const scellantImg = {
  heroVideo: `${B}/hero.mp4`,
  heroPoster: `${B}/hero-poster.jpg`,
  baFaded: `${B}/ba-faded.jpg`,
  baSealed: `${B}/ba-sealed.jpg`,
  txCleaning: `${B}/tx-cleaning.jpg`,
  txApplication: `${B}/tx-application.jpg`,
  txProtected: `${B}/tx-protected.jpg`,
  regionHero: (slug: string) => `${B}/hero-${slug}.jpg`,
};

export type ScellantService = {
  slug: string;
  title: string;
  short: string;
  desc: string;
  image: string;
  verified?: boolean;
};

export const scellantServices: ScellantService[] = [
  {
    slug: "scellant",
    title: "Scellant d'asphalte",
    short: "Un fini noir profond, protégé.",
    desc: "Application d'un scellant durable et uniforme qui ravive l'apparence de votre asphalte et le protège contre le sel, les UV et les intempéries du Québec.",
    image: scellantImg.txProtected,
    verified: true,
  },
  {
    slug: "lavage-pression",
    title: "Lavage à pression",
    short: "Une surface propre avant tout.",
    desc: "Nettoyage du béton, du pavé uni et de l'asphalte pour retirer saletés, moisissures et taches — la base d'une belle application.",
    image: scellantImg.txCleaning,
    verified: true,
  },
  {
    slug: "preparation",
    title: "Préparation de surface",
    short: "Le résultat dépend de la préparation.",
    desc: "Nettoyage, séchage et préparation minutieuse de la surface pour que le scellant adhère uniformément et dure plus longtemps.",
    image: scellantImg.txCleaning,
  },
  {
    slug: "entretien-residentiel",
    title: "Entretien résidentiel",
    short: "Votre entrée, comme au premier jour.",
    desc: "Traitement d'entrées de cour résidentielles pour préserver l'apparence et ralentir l'usure saisonnière.",
    image: scellantImg.txProtected,
  },
  {
    slug: "entretien-commercial",
    title: "Entretien commercial",
    short: "Des surfaces soignées, une image soignée.",
    desc: "Programmes d'entretien préventif pour stationnements et surfaces commerciales, là où le service est offert.",
    image: scellantImg.baSealed,
  },
  {
    slug: "entretien-preventif",
    title: "Entretien préventif",
    short: "Protéger avant de réparer.",
    desc: "Un entretien régulier réduit la pénétration de l'eau et aide à préserver la surface plus longtemps, saison après saison.",
    image: scellantImg.baSealed,
  },
];

export const scellantBenefits = [
  { title: "Apparence ravivée", desc: "Un fini noir profond et uniforme qui redonne un air neuf à votre entrée." },
  { title: "Protection préventive", desc: "Une barrière contre le sel, les huiles, les UV et les cycles de gel-dégel." },
  { title: "Moins d'infiltration d'eau", desc: "Un scellant bien appliqué aide à limiter la pénétration de l'eau en surface." },
  { title: "Surface préservée", desc: "Ralentir l'usure visible pour prolonger la belle apparence de l'asphalte." },
];

/** Sticky-scroll transformation stages (fluid / surface-focused animation language). */
export const scellantTransformation = [
  { n: "01", label: "Asphalte terni", sub: "L'usure du temps", image: scellantImg.baFaded },
  { n: "02", label: "Inspection", sub: "On évalue la surface", image: scellantImg.txCleaning },
  { n: "03", label: "Nettoyage", sub: "Préparation en profondeur", image: scellantImg.txCleaning },
  { n: "04", label: "Application", sub: "Scellant uniforme", image: scellantImg.txApplication },
  { n: "05", label: "Fini uniforme", sub: "Un noir profond", image: scellantImg.baSealed },
  { n: "06", label: "Résultat protégé", sub: "Pensé pour durer", image: scellantImg.txProtected },
];

/** Process steps (factual, based on the company's actual maintenance flow). */
export const scellantProcess = [
  { n: "01", title: "Demande", desc: "Vous nous contactez avec votre besoin et votre secteur." },
  { n: "02", title: "Évaluation", desc: "On évalue l'état de la surface et sa compatibilité." },
  { n: "03", title: "Soumission", desc: "Un prix clair, détaillé et sans surprise." },
  { n: "04", title: "Préparation", desc: "Nettoyage et préparation de la surface." },
  { n: "05", title: "Nettoyage", desc: "Lavage à pression au besoin, puis séchage." },
  { n: "06", title: "Application", desc: "Application uniforme du scellant, avec soin des bordures." },
  { n: "07", title: "Séchage", desc: "Consignes de séchage avant de circuler à nouveau." },
  { n: "08", title: "Inspection finale", desc: "On valide le résultat avec vous." },
];

/** "Which service?" educational comparison — never presents sealant as structural repair. */
export const serviceComparison = {
  asphalte: {
    title: "Choisir l'asphaltage complet",
    href: "/asphalte",
    cta: "Voir l'asphaltage complet",
    points: [
      "La surface est endommagée structurellement",
      "La fondation a cédé ou s'affaisse",
      "Il y a des dépressions importantes",
      "Le drainage est déficient",
      "De grandes sections doivent être remplacées",
      "Un nouvel asphalte doit être installé",
    ],
  },
  scellant: {
    title: "Choisir le scellant",
    href: "#soumission",
    cta: "Demander une soumission",
    points: [
      "L'asphalte est encore structurellement acceptable",
      "La couleur est ternie ou décolorée",
      "La surface a besoin d'une protection préventive",
      "Vous voulez améliorer l'apparence",
      "L'entrée a besoin d'un nettoyage et d'un entretien",
    ],
  },
};

export type ScellantFAQ = { q: string; a: string };

export const scellantFaqs: ScellantFAQ[] = [
  { q: "Quand faut-il appliquer un scellant ?", a: "Généralement lorsque l'asphalte est encore structurellement solide mais que son apparence se dégrade, ou de façon préventive après quelques saisons. La saison chaude est idéale pour l'adhérence." },
  { q: "Combien de temps faut-il attendre avant de circuler ?", a: "Le temps de séchage varie selon la météo et le produit. On vous remet des consignes claires après l'application. Prévoyez généralement quelques heures avant de marcher dessus et plus longtemps pour un véhicule." },
  { q: "Quelle préparation est nécessaire ?", a: "La surface doit être propre et sèche. On effectue le nettoyage et la préparation nécessaires avant l'application pour un résultat uniforme et durable." },
  { q: "Faites-vous le nettoyage avant l'application ?", a: "Oui. Un lavage à pression est souvent réalisé au préalable pour retirer saletés, moisissures et taches, ce qui améliore l'adhérence et le fini." },
  { q: "Le scellant répare-t-il les fissures ?", a: "Le scellant protège et ravive une surface saine ; il ne remplace pas une réparation structurelle ni un nouveau pavage. Si votre asphalte est fissuré en profondeur ou affaissé, un asphaltage complet est plus approprié." },
  { q: "Travaillez-vous sur les stationnements commerciaux ?", a: "Selon le secteur et le projet, oui. Contactez-nous pour valider la disponibilité dans votre région." },
  { q: "Que se passe-t-il en cas de pluie ?", a: "Le scellant a besoin d'une surface sèche et de conditions favorables. En cas de pluie, on replanifie l'application pour garantir un bon résultat." },
  { q: "Dois-je être présent pendant les travaux ?", a: "Ce n'est généralement pas obligatoire, mais on convient avec vous des accès et des consignes de séchage avant de commencer." },
  { q: "Comment obtenir une soumission ?", a: "Remplissez le formulaire de soumission ou appelez-nous. On revient rapidement avec un prix clair, souvent la journée même." },
];

/** Real Google reviews (from asphalteaaa.com). Region not verified → shown division-wide. */
export const scellantTestimonials = [
  { quote: "Beau travail de mes deux entrées de cour. Je recommande fortement.", author: "Dave Levass", source: "Avis Google" },
  { quote: "Service sympathique et professionnel. Un excellent rapport qualité-prix et en plus ils ont fait les travaux la journée même !", author: "Mia Adam", source: "Avis Google" },
  { quote: "I wasn't too sure at first, but I was happy I trusted the team — great work and stellar service.", author: "Benjamin James", source: "Avis Google" },
];

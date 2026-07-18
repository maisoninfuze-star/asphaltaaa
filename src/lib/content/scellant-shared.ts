/**
 * SCELLANT / ENTRETIEN DIVISION — shared content (division-wide).
 * Real facts: scellant appliqué par PULVÉRISATION sous pression; préparation par
 * NETTOYAGE À SEC (balai mécanique + souffleurs), aucun lavage à l'eau.
 */

const B = "/assets/generated/scellant";
const P = "/assets/projects";

export const scellantImg = {
  heroVideo: `${B}/hero.mp4`,
  heroPoster: `${B}/hero-poster.jpg`,
  // Real project photos
  baFaded: `${P}/before-after-before.jpg`,
  baSealed: `${P}/before-after-after.jpg`,
  dryCleaning: `${P}/process-blowers.jpg`,
  spray: `${P}/process-spray-estate.jpg`,
  protected: `${P}/driveway-blue-house.jpg`,
  whiteHouse: `${P}/project-white-house.jpg`,
  peeling: `${P}/warning-peeling.jpg`,
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

// Un entretien complet unifié : scellant + réparation des fissures + réparation
// des trous, plus la préparation à sec et la protection des surfaces. Aucun lavage.
export const scellantServices: ScellantService[] = [
  {
    slug: "scellant",
    title: "Application de scellant",
    short: "Un fini noir profond, protégé.",
    desc: "Le scellant est pulvérisé uniformément à l'aide d'un système d'application sous pression. Il ravive la couleur de l'asphalte et aide à le protéger contre les rayons UV, le sel et les intempéries.",
    image: scellantImg.spray,
    verified: true,
  },
  {
    slug: "reparation-fissures",
    title: "Réparation des fissures",
    short: "Arrêter l'eau avant qu'elle n'aggrave.",
    desc: "Colmatage des fissures afin de limiter l'infiltration d'eau et leur aggravation, lorsque nécessaire avant l'application.",
    image: scellantImg.protected,
    verified: true,
  },
  {
    slug: "reparation-trous",
    title: "Réparation des trous",
    short: "Corriger avant de protéger.",
    desc: "Correction des trous et des zones détériorées avant l'application du scellant, lorsque nécessaire.",
    image: scellantImg.whiteHouse,
    verified: true,
  },
  {
    slug: "nettoyage-sec",
    title: "Nettoyage à sec",
    short: "Une surface propre et sèche.",
    desc: "Nettoyage à sec de la surface à l'aide d'un balai mécanique et de souffleurs professionnels. L'asphalte doit être complètement sec avant l'application du scellant.",
    image: scellantImg.dryCleaning,
    verified: true,
  },
  {
    slug: "protection-surfaces",
    title: "Protection des surfaces",
    short: "Rien qui déborde.",
    desc: "Protection soignée des bordures, murs, portes de garage, béton, pavé et aménagement paysager afin d'éviter les éclaboussures.",
    image: scellantImg.spray,
    verified: true,
  },
];

export const scellantBenefits = [
  { title: "Limiter l'infiltration d'eau", desc: "Un scellant bien appliqué aide à limiter la pénétration de l'eau en surface." },
  { title: "Ralentir l'aggravation des fissures", desc: "Protéger la surface avant que les petits dommages ne deviennent structurels." },
  { title: "Protection contre le sel et les UV", desc: "Une barrière contre le sel de déglaçage, les rayons UV et les intempéries." },
  { title: "Raviver l'apparence", desc: "Un fini noir profond et uniforme qui redonne un air neuf à votre entrée." },
];

/** Sticky-scroll transformation — 5 étapes réelles, dans l'ordre du procédé. */
export const scellantTransformation = [
  { n: "01", label: "Inspection", sub: "Fissures, trous, zones fragilisées", image: scellantImg.baFaded },
  { n: "02", label: "Nettoyage à sec", sub: "Balai mécanique & souffleurs", image: scellantImg.dryCleaning },
  { n: "03", label: "Protection des surfaces", sub: "Bordures, murs, béton, paysage", image: scellantImg.whiteHouse },
  { n: "04", label: "Application par pulvérisation", sub: "Scellant uniforme sous pression", image: scellantImg.spray },
  { n: "05", label: "Surface protégée", sub: "Un fini noir profond", image: scellantImg.baSealed },
];

/** Procédé du scellant — EXACTEMENT cinq étapes (aucune étape 06). */
export const scellantProcess = [
  { n: "01", title: "Inspection", desc: "Évaluation de l'état de l'asphalte, des fissures, des trous et des zones fragilisées." },
  { n: "02", title: "Nettoyage à sec", desc: "Nettoyage avec un balai mécanique et des souffleurs. Aucun lavage à l'eau." },
  { n: "03", title: "Protection des surfaces", desc: "Protection des bordures, murs, portes de garage, béton, pavé et aménagement paysager." },
  { n: "04", title: "Réparation des fissures et des trous", desc: "Colmatage et correction des zones endommagées lorsque requis avant l'application." },
  { n: "05", title: "Application du scellant", desc: "Pulvérisation uniforme du scellant à l'aide d'un système d'application sous pression." },
];

/**
 * "Pose ou entretien : quelle intervention convient à votre surface?"
 * Services complémentaires — jamais présentés comme des choix concurrents.
 */
export const serviceComparison = {
  asphalte: {
    title: "Pavage et installation",
    href: "/asphalte",
    cta: "Découvrir le pavage",
    points: [
      "La fondation a cédé ou s'est affaissée",
      "La surface est gravement endommagée",
      "Des dépressions importantes sont présentes",
      "Le drainage est déficient",
      "De grandes sections doivent être remplacées",
      "Une nouvelle couche d'asphalte doit être installée",
    ],
  },
  scellant: {
    title: "Entretien et protection",
    href: "#soumission",
    cta: "Découvrir l'entretien",
    points: [
      "La fondation demeure stable",
      "L'asphalte a perdu sa couleur foncée",
      "Des fissures légères ou modérées sont visibles",
      "De petits trous doivent être réparés",
      "La surface doit être protégée avant que les dommages deviennent structurels",
    ],
  },
};

export type ScellantFAQ = { q: string; a: string };

export const scellantFaqs: ScellantFAQ[] = [
  { q: "Quand faut-il appliquer un scellant ?", a: "Généralement lorsque l'asphalte est encore structurellement solide mais que son apparence se dégrade, ou de façon préventive après quelques saisons. La saison chaude est idéale pour l'adhérence." },
  { q: "Combien de temps faut-il attendre avant de circuler ?", a: "Le temps de séchage varie selon la météo et le produit. On vous remet des consignes claires après l'application. Prévoyez généralement quelques heures avant de marcher dessus et plus longtemps pour un véhicule." },
  { q: "Quelle préparation est nécessaire ?", a: "La surface doit être propre et complètement sèche. On effectue un nettoyage à sec à l'aide d'un balai mécanique et de souffleurs avant l'application — aucun lavage à l'eau." },
  { q: "Comment le scellant est-il appliqué ?", a: "Le scellant est pulvérisé uniformément à l'aide d'un système d'application sous pression. Les bordures et les surfaces adjacentes sont soigneusement protégées afin d'éviter les éclaboussures." },
  { q: "Le scellant répare-t-il les fissures ?", a: "Le scellant protège et ravive une surface saine ; il ne remplace pas une réparation structurelle ni une nouvelle couche d'asphalte. Les fissures et les petits trous sont réparés lorsque nécessaire avant l'application, mais si la fondation s'est affaissée ou que les dommages sont importants, un pavage peut être recommandé." },
  { q: "Travaillez-vous sur les stationnements commerciaux ?", a: "Selon le secteur et le projet, oui. Contactez-nous pour valider la disponibilité dans votre région." },
  { q: "Que se passe-t-il en cas de pluie ?", a: "Le scellant a besoin d'une surface sèche et de conditions favorables. En cas de pluie, on replanifie l'application pour garantir un bon résultat." },
  { q: "Dois-je être présent pendant les travaux ?", a: "Ce n'est généralement pas obligatoire, mais on convient avec vous des accès et des consignes de séchage avant de commencer." },
  { q: "Comment obtenir une soumission ?", a: "Envoyez-nous quelques photos de votre entrée ou appelez-nous. On revient rapidement avec une recommandation et un prix clair." },
];

/** Real Google reviews (from asphalteaaa.com). Region not verified → shown division-wide. */
export const scellantTestimonials = [
  { quote: "Beau travail de mes deux entrées de cour. Je recommande fortement.", author: "Dave Levass", source: "Avis Google" },
  { quote: "Service sympathique et professionnel. Un excellent rapport qualité-prix et en plus ils ont fait les travaux la journée même !", author: "Mia Adam", source: "Avis Google" },
  { quote: "I wasn't too sure at first, but I was happy I trusted the team — great work and stellar service.", author: "Benjamin James", source: "Avis Google" },
];

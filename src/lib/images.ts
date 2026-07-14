const B = "/assets/generated";

/** Cinematic hero video options (fal.ai). Change `activeHero` to switch. */
export const heroVariants = {
  driveway: { video: `${B}/hero.mp4`, poster: `${B}/hero-poster.jpg`,
    label: "Entrée sinueuse au coucher du soleil" },
  paver: { video: `${B}/hero-alt1.mp4`, poster: `${B}/hero-alt1.jpg`,
    label: "Pose d'asphalte à chaud" },
  reveal: { video: `${B}/hero-alt2.mp4`, poster: `${B}/hero-alt2.jpg`,
    label: "Révélation aérienne d'un domaine" },
} as const;

export const activeHero: keyof typeof heroVariants = "driveway";

export const img = {
  heroAerial: `${B}/hero-aerial.jpg`,
  heroVideo: heroVariants[activeHero].video,
  heroPoster: heroVariants[activeHero].poster,
  storyPaver: `${B}/story-paver.jpg`,
  baBefore: `${B}/ba-before.jpg`,
  baAfter: `${B}/ba-after.jpg`,
  equipRoller: `${B}/equip-roller.jpg`,
  equipExcavator: `${B}/equip-excavator.jpg`,
  pavage: `${B}/svc-pavage.jpg`,
  residential: `${B}/proj-residential.jpg`,
  commercial: `${B}/proj-commercial.jpg`,
};

export const serviceImg: Record<string, string> = {
  excavation: `${B}/svc-excavation.jpg`,
  nivellement: `${B}/svc-fondation.jpg`,
  fondation: `${B}/svc-fondation.jpg`,
  pavage: `${B}/svc-pavage.jpg`,
  resurfacage: `${B}/proj-residential.jpg`,
  reparations: `${B}/svc-reparations.jpg`,
  scellant: `${B}/svc-scellant.jpg`,
  "lavage-pression": `${B}/svc-lavage.jpg`,
  lignage: `${B}/proj-commercial.jpg`,
};

export const projectImg: Record<string, string> = {
  "entree-residentielle-brossard": `${B}/proj-residential.jpg`,
  "stationnement-commercial-longueuil": `${B}/proj-commercial.jpg`,
  "resurfacage-chicoutimi": `${B}/ba-after.jpg`,
  "reparations-thetford": `${B}/svc-reparations.jpg`,
};

export const equipment = [
  {
    name: "Rouleau compresseur",
    role: "Compaction & planéité",
    spec: "Densité optimale, surface lisse",
    image: img.equipRoller,
  },
  {
    name: "Excavatrice",
    role: "Excavation & terrassement",
    spec: "Retrait du sol, préparation d'assise",
    image: img.equipExcavator,
  },
  {
    name: "Paveuse",
    role: "Pose d'enrobé à chaud",
    spec: "Épaisseur constante, fini régulier",
    image: img.pavage,
  },
];

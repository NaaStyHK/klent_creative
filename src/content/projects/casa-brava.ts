import type { Locale } from "@/lib/i18n/config";
import type { ProjectContent } from "@/lib/i18n/project-content";

const image =
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=85";

const spanishCaseStudy: NonNullable<ProjectContent["caseStudy"]> = {
  year: "2026",
  location: "Costa Brava",
  scope: "Estrategia / Identidad / Digital / Contenido",
  status: "Concepto independiente",
  theme: { primary: "#C85B43", secondary: "#EADCC8", dark: "#1D2823", accent: "#F0B94C" },
  logoLines: ["CASA", "BRAVA"],
  symbolLetters: ["C", "B", "°"],
  coverCaption: "Hospitalidad / Identidad / Experiencia",
  conceptEyebrow: "01 / EL CONCEPTO",
  conceptTitle: "Un lugar que se siente antes de llegar.",
  conceptBody:
    "Casa Brava no se presenta como una lista de servicios, sino como una atmósfera. La estrategia convierte la calidez, la sobremesa y el paisaje mediterráneo en una experiencia de marca capaz de despertar curiosidad desde el primer contacto.",
  identityEyebrow: "02 / IDENTIDAD VISUAL",
  identityTitle: "Calidez contemporánea, sin nostalgia.",
  identityBody:
    "La identidad mezcla tonos minerales, terracota y luz dorada con una tipografía editorial de gran escala. El resultado se siente local y humano, pero mantiene la claridad necesaria para vivir en reservas, contenidos y señalética.",
  logoNote:
    "Un nombre construido como lugar y actitud. La composición puede abrirse, apilarse o reducirse sin perder reconocimiento.",
  colors: [
    { name: "Terracota", hex: "#C85B43" },
    { name: "Arena", hex: "#EADCC8" },
    { name: "Pino", hex: "#1D2823" },
    { name: "Sol", hex: "#F0B94C" },
  ],
  typographyTitle: "Editorial para inspirar. Funcional para reservar.",
  typographyBody:
    "Los titulares amplios construyen deseo y ritmo; la capa funcional ordena habitaciones, espacios, horarios y disponibilidad con absoluta claridad.",
  typePrimaryLabel: "Tipografía principal / Manrope",
  typeDisplayLines: ["Llegar.", "Quedarse."],
  typeSecondaryLabel: "Tipografía funcional / DM Mono",
  typeSample: "A–Z / 0–9 / ESPACIOS / FECHAS / RESERVAS",
  voiceEyebrow: "03 / LENGUAJE DE MARCA",
  voiceTitle: "Invitar sin explicarlo todo.",
  voiceBody:
    "La voz sugiere escenas, momentos y sensaciones. Es cercana, pausada y segura; deja espacio para que cada persona imagine su propia experiencia en la casa.",
  voiceLines: ["VENIR SIN PRISA.", "QUEDARSE UN POCO MÁS.", "ESTO ES CASA BRAVA."],
  applicationsEyebrow: "04 / APLICACIONES",
  applicationsTitle: "La experiencia empieza antes de abrir la puerta.",
  applicationsBody:
    "Papelería, carta, señalética, amenities y contenidos comparten un mismo ritmo visual para que cada punto de contacto continúe la atmósfera del lugar.",
  applicationOne: {
    caption: "Bienvenida / Guía de la casa",
    titleLines: ["CASA", "BRAVA"],
    rows: [
      ["LLEGAR", "Check-in / bienvenida / primera copa"],
      ["DESCUBRIR", "Mesa / jardín / alrededores"],
      ["QUEDARSE", "Habitaciones / calma / sobremesa"],
    ],
  },
  applicationTwo: {
    caption: "Amenities / Objeto de marca",
    titleLines: ["CASA", "BRAVA"],
    small: "LLEVATE UN POCO DE LA CASA",
    sticker: ["CB", "COSTA"],
  },
  applicationPhoto: { caption: "Campaña / Atmósfera", lines: ["ENTRAR.", "QUEDARSE."] },
  digitalEyebrow: "05 / EXPERIENCIA DIGITAL",
  digitalTitle: "Inspirar primero. Reservar después.",
  digitalBody:
    "El sitio construye deseo con una narrativa visual pausada y transforma ese interés en una reserva sencilla, visible y sin pasos innecesarios.",
  digitalMockup: {
    url: "casabrava.com",
    nav: "ESPACIOS   RESERVAR",
    kicker: "COSTA BRAVA / MESA / DESCANSO",
    headline: "UN LUGAR QUE SE RECUERDA ANTES DE LLEGAR.",
    cta: "DESCUBRIR LA CASA ↗",
  },
  resultEyebrow: "06 / RESULTADO",
  resultHeadline: "Una marca capaz de convertir atmósfera en deseo.",
  resultBody:
    "Un sistema cálido, flexible y reconocible que acompaña toda la experiencia: desde el descubrimiento digital hasta el último detalle dentro de la casa.",
};

const frenchCaseStudy: NonNullable<ProjectContent["caseStudy"]> = {
  ...spanishCaseStudy,
  scope: "Stratégie / Identité / Digital / Contenu",
  status: "Concept indépendant",
  coverCaption: "Hospitalité / Identité / Expérience",
  conceptEyebrow: "01 / LE CONCEPT",
  conceptTitle: "Un lieu que l’on ressent avant d’arriver.",
  conceptBody:
    "Casa Brava ne se présente pas comme une liste de services, mais comme une atmosphère. La stratégie transforme la chaleur, les longues tablées et le paysage méditerranéen en une expérience de marque qui éveille la curiosité dès le premier contact.",
  identityEyebrow: "02 / IDENTITÉ VISUELLE",
  identityTitle: "Une chaleur contemporaine, sans nostalgie.",
  identityBody:
    "L’identité mêle des tons minéraux, la terre cuite et une lumière dorée à une typographie éditoriale de grande échelle. Elle paraît locale et humaine tout en restant claire sur les parcours de réservation, les contenus et la signalétique.",
  logoNote:
    "Un nom conçu comme un lieu et une attitude. La composition peut s’ouvrir, s’empiler ou se réduire sans perdre sa reconnaissance.",
  colors: [
    { name: "Terre cuite", hex: "#C85B43" }, { name: "Sable", hex: "#EADCC8" },
    { name: "Pin", hex: "#1D2823" }, { name: "Soleil", hex: "#F0B94C" },
  ],
  typographyTitle: "Éditoriale pour inspirer. Fonctionnelle pour réserver.",
  typographyBody:
    "Les grands titres créent le désir et le rythme ; la couche fonctionnelle organise les chambres, les espaces, les horaires et les disponibilités avec clarté.",
  typePrimaryLabel: "Typographie principale / Manrope",
  typeDisplayLines: ["Arriver.", "Rester."],
  typeSecondaryLabel: "Typographie fonctionnelle / DM Mono",
  typeSample: "A–Z / 0–9 / ESPACES / DATES / RÉSERVATIONS",
  voiceEyebrow: "03 / LANGAGE DE MARQUE",
  voiceTitle: "Inviter sans tout expliquer.",
  voiceBody:
    "La voix suggère des scènes, des moments et des sensations. Elle est proche, calme et sûre d’elle, laissant à chacun la place d’imaginer sa propre expérience dans la maison.",
  voiceLines: ["VENIR SANS SE PRESSER.", "RESTER UN PEU PLUS.", "ICI, C’EST CASA BRAVA."],
  applicationsEyebrow: "04 / APPLICATIONS",
  applicationsTitle: "L’expérience commence avant d’ouvrir la porte.",
  applicationsBody:
    "Papeterie, guide, signalétique, produits d’accueil et contenus suivent le même rythme visuel afin que chaque point de contact prolonge l’atmosphère du lieu.",
  applicationOne: {
    caption: "Bienvenue / Guide de la maison", titleLines: ["CASA", "BRAVA"],
    rows: [["ARRIVER", "Accueil / première coupe"], ["DÉCOUVRIR", "Table / jardin / environs"], ["RESTER", "Chambres / calme / soirée"]],
  },
  applicationTwo: {
    caption: "Produits d’accueil / Objet de marque", titleLines: ["CASA", "BRAVA"],
    small: "EMPORTER UN PEU DE LA MAISON", sticker: ["CB", "COSTA"],
  },
  applicationPhoto: { caption: "Campagne / Atmosphère", lines: ["ENTRER.", "RESTER."] },
  digitalEyebrow: "05 / EXPÉRIENCE DIGITALE",
  digitalTitle: "Inspirer d’abord. Réserver ensuite.",
  digitalBody:
    "Le site crée le désir grâce à une narration visuelle posée, puis transforme cet intérêt en une réservation simple, visible et sans étapes inutiles.",
  digitalMockup: {
    url: "casabrava.com", nav: "ESPACES   RÉSERVER", kicker: "COSTA BRAVA / TABLE / REPOS",
    headline: "UN LIEU DONT ON SE SOUVIENT AVANT D’ARRIVER.", cta: "DÉCOUVRIR LA MAISON ↗",
  },
  resultEyebrow: "06 / RÉSULTAT",
  resultHeadline: "Une marque capable de transformer l’atmosphère en désir.",
  resultBody:
    "Un système chaleureux, flexible et reconnaissable qui accompagne toute l’expérience, de la découverte digitale au dernier détail dans la maison.",
};

const englishCaseStudy: NonNullable<ProjectContent["caseStudy"]> = {
  ...spanishCaseStudy,
  scope: "Strategy / Identity / Digital / Content",
  status: "Independent concept",
  coverCaption: "Hospitality / Identity / Experience",
  conceptEyebrow: "01 / THE CONCEPT",
  conceptTitle: "A place you can feel before you arrive.",
  conceptBody:
    "Casa Brava is presented as an atmosphere rather than a list of amenities. The strategy turns warmth, long conversations around the table and the Mediterranean landscape into a brand experience that sparks curiosity from the very first touchpoint.",
  identityEyebrow: "02 / VISUAL IDENTITY",
  identityTitle: "Contemporary warmth, without nostalgia.",
  identityBody:
    "The identity combines mineral tones, terracotta and golden light with large-scale editorial typography. It feels local and human while remaining clear across booking journeys, content and signage.",
  logoNote:
    "A name built as both a place and an attitude. The composition can expand, stack or contract without losing recognition.",
  colors: [
    { name: "Terracotta", hex: "#C85B43" }, { name: "Sand", hex: "#EADCC8" },
    { name: "Pine", hex: "#1D2823" }, { name: "Sun", hex: "#F0B94C" },
  ],
  typographyTitle: "Editorial to inspire. Functional to book.",
  typographyBody:
    "Large headlines create desire and rhythm, while the functional layer organises rooms, spaces, opening times and availability with complete clarity.",
  typePrimaryLabel: "Primary typeface / Manrope",
  typeDisplayLines: ["Arrive.", "Stay."],
  typeSecondaryLabel: "Functional typeface / DM Mono",
  typeSample: "A–Z / 0–9 / SPACES / DATES / BOOKINGS",
  voiceEyebrow: "03 / BRAND LANGUAGE",
  voiceTitle: "Invite without explaining everything.",
  voiceBody:
    "The voice suggests scenes, moments and sensations. It is warm, measured and confident, leaving room for every guest to imagine their own experience of the house.",
  voiceLines: ["COME WITHOUT RUSHING.", "STAY A LITTLE LONGER.", "THIS IS CASA BRAVA."],
  applicationsEyebrow: "04 / APPLICATIONS",
  applicationsTitle: "The experience begins before the door opens.",
  applicationsBody:
    "Stationery, house guides, signage, amenities and content share one visual rhythm, allowing every touchpoint to extend the atmosphere of the place.",
  applicationOne: {
    caption: "Welcome / House guide", titleLines: ["CASA", "BRAVA"],
    rows: [["ARRIVE", "Check-in / welcome / first drink"], ["DISCOVER", "Table / garden / surroundings"], ["STAY", "Rooms / calm / long evenings"]],
  },
  applicationTwo: {
    caption: "Amenities / Brand object", titleLines: ["CASA", "BRAVA"],
    small: "TAKE A LITTLE OF THE HOUSE WITH YOU", sticker: ["CB", "COSTA"],
  },
  applicationPhoto: { caption: "Campaign / Atmosphere", lines: ["COME IN.", "STAY."] },
  digitalEyebrow: "05 / DIGITAL EXPERIENCE",
  digitalTitle: "Inspire first. Book second.",
  digitalBody:
    "The website builds desire through measured visual storytelling, then turns that interest into a simple and visible booking journey with no unnecessary steps.",
  digitalMockup: {
    url: "casabrava.com", nav: "SPACES   BOOK", kicker: "COSTA BRAVA / TABLE / REST",
    headline: "A PLACE YOU REMEMBER BEFORE YOU ARRIVE.", cta: "DISCOVER THE HOUSE ↗",
  },
  resultEyebrow: "06 / OUTCOME",
  resultHeadline: "A brand that turns atmosphere into desire.",
  resultBody:
    "A warm, flexible and recognisable system that supports the complete experience, from digital discovery to the smallest detail inside the house.",
};

export const casaBrava: Record<Locale, ProjectContent> = {
  fr: {
    metaTitle: "Casa Brava — Marque & expérience digitale hôtelière | KLENT",
    metaDescription:
      "Concept de marque et d'expérience digitale pour Casa Brava, un établissement pensé autour de l'ambiance et de la découverte. Étude de cas KLENT.",
    category: "Hôtellerie-restauration",
    name: ["Casa", "Brava"],
    tags: ["Stratégie", "Digital", "Contenu"],
    image,
    alt: "Concept de site pour établissement hôtelier",
    conceptNote:
      "Concept illustratif réalisé pour explorer une direction créative — pas un client réel ni un projet livré.",
    intro:
      "Casa Brava imagine une marque chaleureuse et contemporaine pour un établissement où l'ambiance prime sur la liste de prestations — et où la réservation ne doit jamais être un frein.",
    briefTitle: "Le brief",
    brief:
      "Concevoir une expérience digitale qui donne envie de découvrir le lieu avant même d'y mettre les pieds, sans sacrifier la simplicité du parcours de réservation.",
    approachTitle: "L'approche",
    approach:
      "Une direction éditoriale centrée sur l'atmosphère — photographie, rythme de lecture, ton chaleureux — associée à un parcours de réservation réduit au strict essentiel.",
    resultTitle: "Le résultat",
    result:
      "Une expérience digitale cohérente qui raconte le lieu autant qu'elle sert la conversion, sans jamais opposer les deux.",
    caseStudy: frenchCaseStudy,
  },
  es: {
    metaTitle: "Casa Brava — Marca y experiencia digital hostelera | KLENT",
    metaDescription:
      "Concepto de marca y experiencia digital para Casa Brava, un establecimiento pensado en torno a la atmósfera y el descubrimiento. Caso de estudio KLENT.",
    category: "Hostelería",
    name: ["Casa", "Brava"],
    tags: ["Estrategia", "Digital", "Contenido"],
    image,
    alt: "Concepto de sitio web para hostelería",
    conceptNote:
      "Concepto ilustrativo realizado para explorar una dirección creativa — no es un cliente real ni un proyecto entregado.",
    intro:
      "Casa Brava imagina una marca cálida y contemporánea para un local donde la atmósfera pesa más que la lista de servicios — y donde reservar nunca debería ser una barrera.",
    briefTitle: "El brief",
    brief:
      "Diseñar una experiencia digital que dé ganas de descubrir el lugar antes incluso de pisarlo, sin sacrificar la sencillez del proceso de reserva.",
    approachTitle: "El enfoque",
    approach:
      "Una dirección editorial centrada en la atmósfera — fotografía, ritmo de lectura, tono cálido — combinada con un recorrido de reserva reducido a lo esencial.",
    resultTitle: "El resultado",
    result:
      "Una experiencia digital coherente que cuenta el lugar tanto como sirve a la conversión, sin enfrentar nunca ambas cosas.",
    caseStudy: spanishCaseStudy,
  },
  "es-ar": {
    metaTitle: "Casa Brava — Marca y experiencia digital gastronómica | KLENT",
    metaDescription:
      "Concepto de marca y experiencia digital para Casa Brava, un local pensado en torno a la atmósfera y el descubrimiento. Caso de estudio KLENT.",
    category: "Gastronomía",
    name: ["Casa", "Brava"],
    tags: ["Estrategia", "Digital", "Contenido"],
    image,
    alt: "Concepto de sitio web para hotelería",
    conceptNote:
      "Concepto ilustrativo realizado para explorar una dirección creativa — no es un cliente real ni un proyecto entregado.",
    intro:
      "Casa Brava imagina una marca cálida y contemporánea para un local donde la atmósfera pesa más que la lista de servicios — y donde reservar nunca debería ser una barrera.",
    briefTitle: "El brief",
    brief:
      "Diseñar una experiencia digital que dé ganas de descubrir el lugar antes incluso de pisarlo, sin sacrificar la simplicidad del proceso de reserva.",
    approachTitle: "El enfoque",
    approach:
      "Una dirección editorial centrada en la atmósfera — fotografía, ritmo de lectura, tono cálido — combinada con un recorrido de reserva reducido a lo esencial.",
    resultTitle: "El resultado",
    result:
      "Una experiencia digital coherente que cuenta el lugar tanto como sirve a la conversión, sin enfrentar nunca ambas cosas.",
    caseStudy: spanishCaseStudy,
  },
  en: {
    metaTitle: "Casa Brava — Brand & Digital Experience for Hospitality | KLENT",
    metaDescription:
      "Brand and digital experience concept for Casa Brava, a venue built around atmosphere and discovery. KLENT case study.",
    category: "Hospitality",
    name: ["Casa", "Brava"],
    tags: ["Strategy", "Digital", "Content"],
    image,
    alt: "Hospitality website concept",
    conceptNote:
      "An illustrative concept built to explore a creative direction — not a real client or a delivered project.",
    intro:
      "Casa Brava imagines a warm, contemporary brand for a venue where atmosphere matters more than a list of amenities — and where booking should never get in the way.",
    briefTitle: "The brief",
    brief:
      "Design a digital experience that makes people want to discover the place before they've even walked in, without sacrificing a simple booking flow.",
    approachTitle: "The approach",
    approach:
      "An editorial direction built around atmosphere — photography, pacing, a warm tone — paired with a booking flow trimmed down to the essentials.",
    resultTitle: "The result",
    result:
      "A consistent digital experience that tells the story of the place as much as it drives conversion, without treating the two as a trade-off.",
    caseStudy: englishCaseStudy,
  },
};

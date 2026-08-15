import type { Locale } from "@/lib/i18n/config";
import type { ProjectContent } from "@/lib/i18n/project-content";

const image = "/projects/manna/hero.jpeg";

const spanishCaseStudy: NonNullable<ProjectContent["caseStudy"]> = {
  year: "2026",
  location: "Poblenou, Barcelona",
  scope: "UX/UI / Desarrollo / SEO / i18n",
  status: "Proyecto real / Sitio en producción",
  theme: { primary: "#6B7C3C", secondary: "#FFFFFF", dark: "#000000", accent: "#FFFFFF" },
  logoLines: ["MANNÀ"],
  logo: "/projects/manna/logo-manna.svg",
  abstractCover: true,
  coverCaption: "Restaurante de barrio / Experiencia digital",
  conceptEyebrow: "01 / EL PROYECTO",
  conceptTitle: "Un sitio de barrio para un restaurante de barrio.",
  conceptBody:
    "Mannà es un restaurante de Poblenou que sirve cocina mediterránea honesta desde el desayuno hasta la cena. El proyecto convierte su carácter cercano en una experiencia digital clara, cálida y preparada para transformar visitas en reservas directas.",
  identityEyebrow: "02 / IDENTIDAD PROPORCIONADA",
  identityTitle: "Una identidad existente, llevada al entorno digital.",
  identityBody:
    "El logotipo, la identidad visual y sus elementos de marca fueron proporcionados por el cliente. La estética y el aspecto general del sitio responden también a la dirección solicitada por el cliente. Klent se encargó de traducir esta visión al entorno digital mediante el diseño UX/UI y el desarrollo web.",
  logoNote:
    "Logotipo e identidad visual proporcionados por el cliente. Klent no participó en su creación.",
  colors: [
    { name: "Negro", hex: "#000000" }, { name: "Blanco", hex: "#FFFFFF" },
    { name: "Verde oliva", hex: "#6B7C3C" },
  ],
  typographyTitle: "Carácter editorial. Lectura sin fricción.",
  typographyBody:
    "Fraunces construye los grandes mensajes y el tono emocional. Inter organiza navegación, carta, horarios y reservas con una jerarquía limpia en todos los dispositivos.",
  typePrimaryLabel: "Tipografía display / Fraunces",
  typeDisplayLines: ["De la montaña", "al mar."],
  typeSecondaryLabel: "Tipografía funcional / Inter",
  typeSample: "A–Z / 0–9 / CARTA / ALÉRGENOS / RESERVAS / HORARIOS",
  voiceEyebrow: "03 / LENGUAJE DE MARCA",
  voiceTitle: "Cercano, honesto y sin pose.",
  voiceBody:
    "El lenguaje habla como un restaurante de confianza: frases breves, cálidas y directas. Barrio, cada día, sin prisa y cariño son las palabras que sostienen el posicionamiento.",
  voiceLines: ["NO SOMOS UN RESTAURANTE DE POSTAL.", "SOMOS VUESTRO RESTAURANTE DE BARRIO.", "SIEMPRE HAY SITIO PARA UNO MÁS."],
  applicationsEyebrow: "04 / PRODUCTO Y LUGAR",
  applicationsTitle: "El restaurante llevado a la pantalla.",
  applicationsBody:
    "Todas las fotografías del local, los platos y el restaurante fueron proporcionadas por el cliente. Klent las integró en la interfaz y construyó el sitio de acuerdo con la estética y la experiencia visual solicitadas.",
  applicationOne: { caption: "Carta / Sistema editorial", titleLines: ["MANNÀ"], rows: [] },
  applicationTwo: { caption: "Lugar / Experiencia", titleLines: ["MANNÀ"], small: "POBLENOU / BARCELONA", sticker: ["M", "74"] },
  applicationPhoto: { caption: "Producto / Fotografía", lines: ["CADA DÍA.", "CON CARIÑO."] },
  galleryImages: [
    { src: "/projects/manna/interior.jpeg", alt: "Interior del restaurante Mannà en Poblenou", caption: "El espacio / Poblenou" },
    { src: "/projects/manna/dish-paella.jpg", alt: "Paella servida en Mannà", caption: "Producto / Carta" },
    { src: "/projects/manna/dish-charcuterie.jpeg", alt: "Tabla de embutidos de Mannà", caption: "De la montaña / Producto" },
  ],
  digitalEyebrow: "05 / EXPERIENCIA DIGITAL",
  digitalTitle: "Una reserva que funciona de verdad.",
  digitalBody:
    "El sitio bilingüe integra carta interactiva, 14 alérgenos, horarios, galería y un sistema de reserva conectado a Google Calendar. La disponibilidad se calcula por franja y la confirmación se envía automáticamente por correo.",
  digitalMockup: {
    url: "mannarestaurantebcn.es", nav: "CARTA   RESERVAR", kicker: "POBLENOU / BARCELONA / CADA DÍA",
    headline: "UN RINCÓN DE BARRIO CON ALMA MEDITERRÁNEA.", cta: "VISITAR EL SITIO ↗",
  },
  digitalScreenshot: "/projects/manna/website-hero.png",
  liveUrl: "https://mannarestaurantebcn.es",
  resultEyebrow: "06 / RESULTADO",
  resultHeadline: "Interfaz, reservas y tecnología en una misma mesa.",
  resultBody:
    "Una presencia digital autónoma que presenta una carta viva, sirve a públicos locales e internacionales y permite al restaurante gestionar reservas desde una herramienta que ya conoce.",
};

const frenchCaseStudy: NonNullable<ProjectContent["caseStudy"]> = {
  ...spanishCaseStudy,
  location: "Poblenou, Barcelone",
  scope: "UX/UI / Développement / SEO / i18n",
  status: "Projet réel / Site en production",
  coverCaption: "Restaurant de quartier / Expérience digitale",
  conceptEyebrow: "01 / LE PROJET",
  conceptTitle: "Un site de quartier pour un restaurant de quartier.",
  conceptBody:
    "Mannà est un restaurant de Poblenou qui sert une cuisine méditerranéenne honnête du petit-déjeuner au dîner. Le projet traduit son caractère accueillant en une expérience digitale claire, chaleureuse et pensée pour transformer les visites en réservations directes.",
  identityEyebrow: "02 / IDENTITÉ FOURNIE",
  identityTitle: "Une identité existante, adaptée au digital.",
  identityBody:
    "Le logo, l’identité visuelle et les éléments de marque ont été fournis par le client. L’esthétique et l’apparence générale du site correspondent également à la direction souhaitée par le client. Klent a traduit cette vision en une expérience digitale grâce au design UX/UI et au développement web.",
  logoNote: "Logo et identité visuelle fournis par le client. Klent n’a pas participé à leur création.",
  colors: [{ name: "Noir", hex: "#000000" }, { name: "Blanc", hex: "#FFFFFF" }, { name: "Vert olive", hex: "#6B7C3C" }],
  typographyTitle: "Du caractère éditorial. Une lecture sans friction.",
  typographyBody: "Fraunces porte les grands messages et l’émotion. Inter organise la navigation, la carte, les horaires et les réservations sur tous les écrans.",
  typePrimaryLabel: "Typographie display / Fraunces", typeDisplayLines: ["De la montagne", "à la mer."],
  typeSecondaryLabel: "Typographie fonctionnelle / Inter", typeSample: "A–Z / 0–9 / CARTE / ALLERGÈNES / RÉSERVATIONS / HORAIRES",
  voiceEyebrow: "03 / LANGAGE DE MARQUE", voiceTitle: "Proche, honnête et sans posture.",
  voiceBody: "Le langage parle comme une adresse de confiance : des phrases courtes, chaleureuses et directes. Le quartier, le quotidien, la simplicité et l’attention portent le positionnement.",
  voiceLines: ["PAS UN RESTAURANT DE CARTE POSTALE.", "VOTRE RESTAURANT DE QUARTIER.", "TOUJOURS UNE PLACE POUR UNE PERSONNE DE PLUS."],
  applicationsEyebrow: "04 / PRODUIT ET LIEU", applicationsTitle: "Le restaurant porté à l’écran.",
  applicationsBody: "Toutes les photographies du lieu, des plats et du restaurant ont été fournies par le client. Klent les a intégrées dans l’interface et a construit le site conformément à l’esthétique et à l’expérience visuelle demandées.",
  galleryImages: [
    { src: "/projects/manna/interior.jpeg", alt: "Intérieur du restaurant Mannà à Poblenou", caption: "Le lieu / Poblenou" },
    { src: "/projects/manna/dish-paella.jpg", alt: "Paella servie chez Mannà", caption: "Produit / Carte" },
    { src: "/projects/manna/dish-charcuterie.jpeg", alt: "Planche de charcuterie de Mannà", caption: "De la montagne / Produit" },
  ],
  digitalEyebrow: "05 / EXPÉRIENCE DIGITALE", digitalTitle: "Une réservation qui fonctionne vraiment.",
  digitalBody: "Le site bilingue rassemble une carte interactive, 14 allergènes, les horaires, une galerie et un système de réservation connecté à Google Calendar. Les disponibilités sont calculées par créneau et confirmées automatiquement par e-mail.",
  digitalMockup: { url: "mannarestaurantebcn.es", nav: "CARTE   RÉSERVER", kicker: "POBLENOU / BARCELONE / CHAQUE JOUR", headline: "UNE ADRESSE DE QUARTIER À L’ÂME MÉDITERRANÉENNE.", cta: "VISITER LE SITE ↗" },
  resultEyebrow: "06 / RÉSULTAT", resultHeadline: "Interface, réservations et technologie à la même table.",
  resultBody: "Une présence digitale autonome qui présente une carte vivante, sert les publics locaux et internationaux et permet au restaurant de gérer les réservations avec un outil qu’il utilise déjà.",
};

const englishCaseStudy: NonNullable<ProjectContent["caseStudy"]> = {
  ...spanishCaseStudy,
  scope: "UX/UI / Development / SEO / i18n", status: "Real project / Live website",
  coverCaption: "Neighbourhood restaurant / Digital experience", conceptEyebrow: "01 / THE PROJECT",
  conceptTitle: "A neighbourhood website for a neighbourhood restaurant.",
  conceptBody: "Mannà is a Poblenou restaurant serving honest Mediterranean food from breakfast through dinner. The project turns its welcoming character into a clear and warm digital experience designed to convert visits into direct bookings.",
  identityEyebrow: "02 / CLIENT-SUPPLIED IDENTITY", identityTitle: "An existing identity, adapted for digital.",
  identityBody: "The logo, visual identity and brand assets were supplied by the client. The website’s overall look and aesthetic direction also reflect the client’s request. Klent translated that vision into a digital experience through UX/UI design and web development.",
  logoNote: "Logo and visual identity supplied by the client. Klent was not involved in their creation.",
  colors: [{ name: "Black", hex: "#000000" }, { name: "White", hex: "#FFFFFF" }, { name: "Olive green", hex: "#6B7C3C" }],
  typographyTitle: "Editorial character. Frictionless reading.", typographyBody: "Fraunces carries the emotional headlines. Inter organises navigation, menus, opening times and bookings clearly on every device.",
  typePrimaryLabel: "Display typeface / Fraunces", typeDisplayLines: ["From the mountains", "to the sea."], typeSecondaryLabel: "Functional typeface / Inter", typeSample: "A–Z / 0–9 / MENU / ALLERGENS / BOOKINGS / HOURS",
  voiceEyebrow: "03 / BRAND LANGUAGE", voiceTitle: "Warm, honest and unpretentious.", voiceBody: "The language sounds like a trusted local restaurant: brief, warm and direct. Neighbourhood, every day, no rush and care anchor the positioning.",
  voiceLines: ["NOT A POSTCARD RESTAURANT.", "YOUR NEIGHBOURHOOD RESTAURANT.", "ALWAYS ROOM FOR ONE MORE."],
  applicationsEyebrow: "04 / FOOD AND PLACE", applicationsTitle: "Bringing the restaurant to the screen.", applicationsBody: "All photography of the venue, food and restaurant was supplied by the client. Klent integrated these assets into the interface and built the website according to the requested aesthetic and visual experience.",
  galleryImages: [
    { src: "/projects/manna/interior.jpeg", alt: "Mannà restaurant interior in Poblenou", caption: "The venue / Poblenou" },
    { src: "/projects/manna/dish-paella.jpg", alt: "Paella served at Mannà", caption: "Food / Menu" },
    { src: "/projects/manna/dish-charcuterie.jpeg", alt: "Mannà charcuterie board", caption: "From the mountains / Food" },
  ],
  digitalEyebrow: "05 / DIGITAL EXPERIENCE", digitalTitle: "A booking system that genuinely works.", digitalBody: "The bilingual website combines an interactive menu, 14 allergens, opening times, a gallery and Google Calendar booking. Availability is calculated per time slot and confirmations are sent automatically by email.",
  digitalMockup: { url: "mannarestaurantebcn.es", nav: "MENU   BOOK", kicker: "POBLENOU / BARCELONA / EVERY DAY", headline: "A NEIGHBOURHOOD PLACE WITH A MEDITERRANEAN SOUL.", cta: "VISIT THE WEBSITE ↗" },
  resultEyebrow: "06 / OUTCOME", resultHeadline: "Interface, bookings and technology at one table.", resultBody: "An autonomous digital presence with a living menu for local and international audiences, allowing the restaurant to manage bookings through a tool it already knows.",
};

function project(locale: Locale, study: NonNullable<ProjectContent["caseStudy"]>): ProjectContent {
  const localized = {
    fr: { category: "Restauration", tags: ["UX/UI", "Développement", "SEO"], intro: "Site internet, réservation directe et carte interactive pour Mannà. Identité, photographies et direction esthétique fournies par le client.", badge: "Projet réel" },
    es: { category: "Restauración", tags: ["UX/UI", "Desarrollo", "SEO"], intro: "Sitio web, reserva directa y carta interactiva para Mannà. Identidad, fotografías y dirección estética proporcionadas por el cliente.", badge: "Proyecto real" },
    "es-ar": { category: "Gastronomía", tags: ["UX/UI", "Desarrollo", "SEO"], intro: "Sitio web, reserva directa y carta interactiva para Mannà. Identidad, fotografías y dirección estética proporcionadas por el cliente.", badge: "Proyecto real" },
    en: { category: "Hospitality", tags: ["UX/UI", "Development", "SEO"], intro: "Website, direct booking and an interactive menu for Mannà. Identity, photography and aesthetic direction supplied by the client.", badge: "Real project" },
  }[locale];
  return {
    metaTitle: `Mannà — ${localized.category} | KLENT Creative`, metaDescription: localized.intro, badge: localized.badge,
    category: localized.category, name: ["Mannà", ""], tags: localized.tags, image, alt: `Mannà — ${localized.category}`,
    conceptNote: localized.badge, intro: localized.intro, briefTitle: "Brief", brief: study.conceptBody,
    approachTitle: "Approach", approach: study.identityBody, resultTitle: "Result", result: study.resultBody, caseStudy: study,
  };
}

export const manna: Record<Locale, ProjectContent> = {
  fr: project("fr", frenchCaseStudy), es: project("es", spanishCaseStudy),
  "es-ar": project("es-ar", spanishCaseStudy), en: project("en", englishCaseStudy),
};

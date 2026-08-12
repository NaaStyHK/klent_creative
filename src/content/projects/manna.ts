import type { Locale } from "@/lib/i18n/config";
import type { ProjectContent } from "@/lib/i18n/project-content";

const image = "/projects/manna/hero.jpeg";

const spanishCaseStudy: NonNullable<ProjectContent["caseStudy"]> = {
  year: "2026",
  location: "Poblenou, Barcelona",
  scope: "Dirección artística / UX/UI / Desarrollo / SEO / i18n",
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
  identityEyebrow: "02 / DIRECCIÓN VISUAL",
  identityTitle: "De la montaña al mar, cada día.",
  identityBody:
    "La dirección evita los clichés mediterráneos y construye un universo editorial dominado por el negro, el blanco y el verde oliva. Fraunces aporta el gesto humano y gastronómico; Inter mantiene toda la información, la carta y los formularios fáciles de usar.",
  logoNote:
    "El logotipo original se integra como firma principal de una identidad digital que prioriza cercanía, producto y claridad.",
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
  applicationsTitle: "Una marca construida con materia real.",
  applicationsBody:
    "La identidad vive junto a fotografías reales del local, el equipo y los platos. La dirección de imagen mantiene la experiencia próxima y creíble, lejos de una representación genérica de Barcelona.",
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
  resultHeadline: "Identidad, contenido y tecnología en una misma mesa.",
  resultBody:
    "Una presencia digital autónoma que presenta una carta viva, sirve a públicos locales e internacionales y permite al restaurante gestionar reservas desde una herramienta que ya conoce.",
};

const frenchCaseStudy: NonNullable<ProjectContent["caseStudy"]> = {
  ...spanishCaseStudy,
  location: "Poblenou, Barcelone",
  scope: "Direction artistique / UX/UI / Développement / SEO / i18n",
  status: "Projet réel / Site en production",
  coverCaption: "Restaurant de quartier / Expérience digitale",
  conceptEyebrow: "01 / LE PROJET",
  conceptTitle: "Un site de quartier pour un restaurant de quartier.",
  conceptBody:
    "Mannà est un restaurant de Poblenou qui sert une cuisine méditerranéenne honnête du petit-déjeuner au dîner. Le projet traduit son caractère accueillant en une expérience digitale claire, chaleureuse et pensée pour transformer les visites en réservations directes.",
  identityEyebrow: "02 / DIRECTION VISUELLE",
  identityTitle: "De la montagne à la mer, chaque jour.",
  identityBody:
    "La direction évite les clichés méditerranéens et compose un univers éditorial dominé par le noir, le blanc et le vert olive. Fraunces apporte le geste humain et gastronomique ; Inter garde la carte, les informations et les formulaires parfaitement lisibles.",
  logoNote: "Le logotype original devient la signature centrale d’une identité digitale fondée sur la proximité, le produit et la clarté.",
  colors: [{ name: "Noir", hex: "#000000" }, { name: "Blanc", hex: "#FFFFFF" }, { name: "Vert olive", hex: "#6B7C3C" }],
  typographyTitle: "Du caractère éditorial. Une lecture sans friction.",
  typographyBody: "Fraunces porte les grands messages et l’émotion. Inter organise la navigation, la carte, les horaires et les réservations sur tous les écrans.",
  typePrimaryLabel: "Typographie display / Fraunces", typeDisplayLines: ["De la montagne", "à la mer."],
  typeSecondaryLabel: "Typographie fonctionnelle / Inter", typeSample: "A–Z / 0–9 / CARTE / ALLERGÈNES / RÉSERVATIONS / HORAIRES",
  voiceEyebrow: "03 / LANGAGE DE MARQUE", voiceTitle: "Proche, honnête et sans posture.",
  voiceBody: "Le langage parle comme une adresse de confiance : des phrases courtes, chaleureuses et directes. Le quartier, le quotidien, la simplicité et l’attention portent le positionnement.",
  voiceLines: ["PAS UN RESTAURANT DE CARTE POSTALE.", "VOTRE RESTAURANT DE QUARTIER.", "TOUJOURS UNE PLACE POUR UNE PERSONNE DE PLUS."],
  applicationsEyebrow: "04 / PRODUIT ET LIEU", applicationsTitle: "Une marque construite avec une matière réelle.",
  applicationsBody: "L’identité vit avec de vraies photographies du lieu et des plats. Cette direction maintient une expérience proche et crédible, loin d’une image générique de Barcelone.",
  galleryImages: [
    { src: "/projects/manna/interior.jpeg", alt: "Intérieur du restaurant Mannà à Poblenou", caption: "Le lieu / Poblenou" },
    { src: "/projects/manna/dish-paella.jpg", alt: "Paella servie chez Mannà", caption: "Produit / Carte" },
    { src: "/projects/manna/dish-charcuterie.jpeg", alt: "Planche de charcuterie de Mannà", caption: "De la montagne / Produit" },
  ],
  digitalEyebrow: "05 / EXPÉRIENCE DIGITALE", digitalTitle: "Une réservation qui fonctionne vraiment.",
  digitalBody: "Le site bilingue rassemble une carte interactive, 14 allergènes, les horaires, une galerie et un système de réservation connecté à Google Calendar. Les disponibilités sont calculées par créneau et confirmées automatiquement par e-mail.",
  digitalMockup: { url: "mannarestaurantebcn.es", nav: "CARTE   RÉSERVER", kicker: "POBLENOU / BARCELONE / CHAQUE JOUR", headline: "UNE ADRESSE DE QUARTIER À L’ÂME MÉDITERRANÉENNE.", cta: "VISITER LE SITE ↗" },
  resultEyebrow: "06 / RÉSULTAT", resultHeadline: "Identité, contenu et technologie à la même table.",
  resultBody: "Une présence digitale autonome qui présente une carte vivante, sert les publics locaux et internationaux et permet au restaurant de gérer les réservations avec un outil qu’il utilise déjà.",
};

const englishCaseStudy: NonNullable<ProjectContent["caseStudy"]> = {
  ...spanishCaseStudy,
  scope: "Art direction / UX/UI / Development / SEO / i18n", status: "Real project / Live website",
  coverCaption: "Neighbourhood restaurant / Digital experience", conceptEyebrow: "01 / THE PROJECT",
  conceptTitle: "A neighbourhood website for a neighbourhood restaurant.",
  conceptBody: "Mannà is a Poblenou restaurant serving honest Mediterranean food from breakfast through dinner. The project turns its welcoming character into a clear and warm digital experience designed to convert visits into direct bookings.",
  identityEyebrow: "02 / VISUAL DIRECTION", identityTitle: "From the mountains to the sea, every day.",
  identityBody: "The direction avoids Mediterranean clichés and builds an editorial world led by black, white and olive green. Fraunces brings a human, food-led gesture; Inter keeps menus, information and forms effortless to use.",
  logoNote: "The original wordmark becomes the central signature of a digital identity built around closeness, produce and clarity.",
  colors: [{ name: "Black", hex: "#000000" }, { name: "White", hex: "#FFFFFF" }, { name: "Olive green", hex: "#6B7C3C" }],
  typographyTitle: "Editorial character. Frictionless reading.", typographyBody: "Fraunces carries the emotional headlines. Inter organises navigation, menus, opening times and bookings clearly on every device.",
  typePrimaryLabel: "Display typeface / Fraunces", typeDisplayLines: ["From the mountains", "to the sea."], typeSecondaryLabel: "Functional typeface / Inter", typeSample: "A–Z / 0–9 / MENU / ALLERGENS / BOOKINGS / HOURS",
  voiceEyebrow: "03 / BRAND LANGUAGE", voiceTitle: "Warm, honest and unpretentious.", voiceBody: "The language sounds like a trusted local restaurant: brief, warm and direct. Neighbourhood, every day, no rush and care anchor the positioning.",
  voiceLines: ["NOT A POSTCARD RESTAURANT.", "YOUR NEIGHBOURHOOD RESTAURANT.", "ALWAYS ROOM FOR ONE MORE."],
  applicationsEyebrow: "04 / FOOD AND PLACE", applicationsTitle: "A brand built from real material.", applicationsBody: "The identity lives alongside genuine photography of the venue and its food, keeping the experience close and credible rather than presenting a generic image of Barcelona.",
  galleryImages: [
    { src: "/projects/manna/interior.jpeg", alt: "Mannà restaurant interior in Poblenou", caption: "The venue / Poblenou" },
    { src: "/projects/manna/dish-paella.jpg", alt: "Paella served at Mannà", caption: "Food / Menu" },
    { src: "/projects/manna/dish-charcuterie.jpeg", alt: "Mannà charcuterie board", caption: "From the mountains / Food" },
  ],
  digitalEyebrow: "05 / DIGITAL EXPERIENCE", digitalTitle: "A booking system that genuinely works.", digitalBody: "The bilingual website combines an interactive menu, 14 allergens, opening times, a gallery and Google Calendar booking. Availability is calculated per time slot and confirmations are sent automatically by email.",
  digitalMockup: { url: "mannarestaurantebcn.es", nav: "MENU   BOOK", kicker: "POBLENOU / BARCELONA / EVERY DAY", headline: "A NEIGHBOURHOOD PLACE WITH A MEDITERRANEAN SOUL.", cta: "VISIT THE WEBSITE ↗" },
  resultEyebrow: "06 / OUTCOME", resultHeadline: "Identity, content and technology at one table.", resultBody: "An autonomous digital presence with a living menu for local and international audiences, allowing the restaurant to manage bookings through a tool it already knows.",
};

function project(locale: Locale, study: NonNullable<ProjectContent["caseStudy"]>): ProjectContent {
  const localized = {
    fr: { category: "Restauration", tags: ["Direction artistique", "UX/UI", "Développement", "SEO"], intro: "Identité éditoriale, réservation directe et carte vivante pour Mannà, un restaurant de quartier à Poblenou.", badge: "Projet réel" },
    es: { category: "Restauración", tags: ["Dirección artística", "UX/UI", "Desarrollo", "SEO"], intro: "Identidad editorial, reserva directa y carta viva para Mannà, un restaurante de barrio en Poblenou.", badge: "Proyecto real" },
    "es-ar": { category: "Gastronomía", tags: ["Dirección artística", "UX/UI", "Desarrollo", "SEO"], intro: "Identidad editorial, reserva directa y carta viva para Mannà, un restaurante de barrio en Poblenou.", badge: "Proyecto real" },
    en: { category: "Hospitality", tags: ["Art direction", "UX/UI", "Development", "SEO"], intro: "Editorial identity, direct booking and a living menu for Mannà, a neighbourhood restaurant in Poblenou.", badge: "Real project" },
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

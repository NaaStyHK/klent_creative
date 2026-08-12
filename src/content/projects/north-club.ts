import type { Locale } from "@/lib/i18n/config";
import type { ProjectContent } from "@/lib/i18n/project-content";

const image =
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1800&q=85";

const spanishCaseStudy: NonNullable<ProjectContent["caseStudy"]> = {
  year: "2026",
  location: "Barcelona",
  scope: "Estrategia / Identidad / Campaña / Social",
  status: "Concepto independiente",
  theme: { primary: "#673CFF", secondary: "#E8E2FF", dark: "#0B0B0E", accent: "#FF4FC8" },
  logoLines: ["NORTH", "CLUB"],
  symbolLetters: ["N", "C", "°"],
  coverCaption: "Nightlife / Cultura / Sistema visual",
  conceptEyebrow: "01 / EL CONCEPTO",
  conceptTitle: "Una identidad que cambia con cada noche.",
  conceptBody:
    "North Club funciona como plataforma para música, arte y comunidad. La estrategia no busca congelar la marca en un único estilo, sino darle reglas claras para transformarse con cada programación sin perder su dirección.",
  identityEyebrow: "02 / IDENTIDAD VISUAL",
  identityTitle: "Un sistema modular, no un logo inmóvil.",
  identityBody:
    "Tipografía, color y composición trabajan como módulos. Los contrastes eléctricos y las estructuras variables permiten crear nuevas piezas constantemente, manteniendo siempre una firma reconocible en carteles, pantallas y redes.",
  logoNote:
    "Un bloque tipográfico directo y adaptable. Puede ocupar toda la pieza, convertirse en marco o reducirse a un sello para acompañar cada evento.",
  colors: [
    { name: "Violeta norte", hex: "#673CFF" },
    { name: "Niebla", hex: "#E8E2FF" },
    { name: "Noche", hex: "#0B0B0E" },
    { name: "Pulso", hex: "#FF4FC8" },
  ],
  typographyTitle: "Impacto para el cartel. Orden para la programación.",
  typographyBody:
    "Una tipografía de gran presencia domina campañas y titulares, mientras la monoespaciada organiza fechas, artistas, horarios, salas y entradas.",
  typePrimaryLabel: "Tipografía principal / Manrope",
  typeDisplayLines: ["La noche", "cambia de forma."],
  typeSecondaryLabel: "Tipografía funcional / DM Mono",
  typeSample: "A–Z / 0–9 / LINE-UP / FECHA / SALA / TICKETS",
  voiceEyebrow: "03 / LENGUAJE DE MARCA",
  voiceTitle: "Más señal. Menos explicación.",
  voiceBody:
    "La voz es breve, magnética y colectiva. No describe una fiesta: activa una sensación de pertenencia y convierte cada frase en una pieza de campaña.",
  voiceLines: ["LA NOCHE CAMBIA.", "EL NORTE ES UNA DIRECCIÓN.", "HOY ES EL LUGAR."],
  applicationsEyebrow: "04 / APLICACIONES",
  applicationsTitle: "Diseñada para moverse al ritmo de la programación.",
  applicationsBody:
    "El sistema genera carteles, entradas, contenidos, señalética y piezas de merchandising con variaciones rápidas, expresivas y siempre conectadas entre sí.",
  applicationOne: {
    caption: "Cartel / Programación",
    titleLines: ["NORTH", "CLUB"],
    rows: [
      ["FRI 14", "Live set / Room 01 / 23:30"],
      ["SAT 15", "Residents / Room 02 / 00:00"],
      ["SUN 16", "Art session / Terrace / 19:00"],
    ],
  },
  applicationTwo: {
    caption: "Merchandising / Comunidad",
    titleLines: ["NORTH", "CLUB"],
    small: "MUSIC / ART / NIGHT",
    sticker: ["NC", "26"],
  },
  applicationPhoto: { caption: "Campaña / Evento", lines: ["NO HAY", "UNA SOLA", "NOCHE."] },
  digitalEyebrow: "05 / EXPERIENCIA DIGITAL",
  digitalTitle: "Toda la programación. Cero fricción.",
  digitalBody:
    "La experiencia digital prioriza lo que está pasando ahora: descubrir fechas, artistas y contenidos, y pasar de la curiosidad a la entrada en pocos gestos.",
  digitalMockup: {
    url: "northclub.live",
    nav: "PROGRAMACIÓN   ENTRADAS",
    kicker: "CLUB / CULTURA / BARCELONA",
    headline: "CADA NOCHE, UNA NUEVA IDENTIDAD.",
    cta: "VER PROGRAMACIÓN ↗",
  },
  resultEyebrow: "06 / RESULTADO",
  resultHeadline: "Una marca preparada para no repetirse.",
  resultBody:
    "Un lenguaje flexible y reconocible que puede evolucionar con cada fecha, colaboración y canal sin perder la energía que mantiene unida a la comunidad.",
};

const frenchCaseStudy: NonNullable<ProjectContent["caseStudy"]> = {
  ...spanishCaseStudy,
  scope: "Stratégie / Identité / Campagne / Social",
  status: "Concept indépendant",
  coverCaption: "Nightlife / Culture / Système visuel",
  conceptEyebrow: "01 / LE CONCEPT",
  conceptTitle: "Une identité qui change à chaque nuit.",
  conceptBody:
    "North Club fonctionne comme une plateforme pour la musique, l’art et la communauté. La stratégie ne fige pas la marque dans un style unique : elle lui donne des règles claires pour se transformer avec chaque programmation sans perdre sa direction.",
  identityEyebrow: "02 / IDENTITÉ VISUELLE",
  identityTitle: "Un système modulaire, pas un logo immobile.",
  identityBody:
    "Typographie, couleur et composition fonctionnent comme des modules. Les contrastes électriques et les structures variables permettent de créer sans cesse de nouvelles pièces, tout en conservant une signature reconnaissable sur les affiches, les écrans et les réseaux.",
  logoNote:
    "Un bloc typographique direct et adaptable. Il peut remplir le support, devenir un cadre ou se réduire à un sceau pour accompagner chaque événement.",
  colors: [
    { name: "Violet nord", hex: "#673CFF" }, { name: "Brume", hex: "#E8E2FF" },
    { name: "Nuit", hex: "#0B0B0E" }, { name: "Pulsation", hex: "#FF4FC8" },
  ],
  typographyTitle: "De l’impact pour l’affiche. De l’ordre pour la programmation.",
  typographyBody:
    "Une typographie très présente domine les campagnes et les titres, tandis que la monospace organise les dates, les artistes, les horaires, les salles et la billetterie.",
  typePrimaryLabel: "Typographie principale / Manrope",
  typeDisplayLines: ["La nuit", "change de forme."],
  typeSecondaryLabel: "Typographie fonctionnelle / DM Mono",
  typeSample: "A–Z / 0–9 / LINE-UP / DATE / SALLE / BILLETS",
  voiceEyebrow: "03 / LANGAGE DE MARQUE",
  voiceTitle: "Plus de signal. Moins d’explications.",
  voiceBody:
    "La voix est brève, magnétique et collective. Elle ne décrit pas une soirée : elle active un sentiment d’appartenance et transforme chaque phrase en élément de campagne.",
  voiceLines: ["LA NUIT CHANGE.", "LE NORD EST UNE DIRECTION.", "CE SOIR, C’EST ICI."],
  applicationsEyebrow: "04 / APPLICATIONS",
  applicationsTitle: "Conçue pour évoluer au rythme de la programmation.",
  applicationsBody:
    "Le système produit affiches, billets, contenus, signalétique et merchandising avec des variations rapides, expressives et toujours reliées entre elles.",
  applicationOne: {
    caption: "Affiche / Programmation", titleLines: ["NORTH", "CLUB"],
    rows: [["VEN 14", "Live set / Salle 01 / 23:30"], ["SAM 15", "Residents / Salle 02 / 00:00"], ["DIM 16", "Art session / Terrasse / 19:00"]],
  },
  applicationTwo: {
    caption: "Merchandising / Communauté", titleLines: ["NORTH", "CLUB"],
    small: "MUSIQUE / ART / NUIT", sticker: ["NC", "26"],
  },
  applicationPhoto: { caption: "Campagne / Événement", lines: ["IL N’Y A PAS", "QU’UNE SEULE", "NUIT."] },
  digitalEyebrow: "05 / EXPÉRIENCE DIGITALE",
  digitalTitle: "Toute la programmation. Zéro friction.",
  digitalBody:
    "L’expérience digitale privilégie ce qui se passe maintenant : découvrir les dates, les artistes et les contenus, puis passer de la curiosité au billet en quelques gestes.",
  digitalMockup: {
    url: "northclub.live", nav: "PROGRAMMATION   BILLETS", kicker: "CLUB / CULTURE / BARCELONE",
    headline: "CHAQUE NUIT, UNE NOUVELLE IDENTITÉ.", cta: "VOIR LA PROGRAMMATION ↗",
  },
  resultEyebrow: "06 / RÉSULTAT",
  resultHeadline: "Une marque conçue pour ne jamais se répéter.",
  resultBody:
    "Un langage flexible et reconnaissable qui évolue avec chaque date, collaboration et canal sans perdre l’énergie qui rassemble la communauté.",
};

const englishCaseStudy: NonNullable<ProjectContent["caseStudy"]> = {
  ...spanishCaseStudy,
  scope: "Strategy / Identity / Campaign / Social",
  status: "Independent concept",
  coverCaption: "Nightlife / Culture / Visual system",
  conceptEyebrow: "01 / THE CONCEPT",
  conceptTitle: "An identity that changes with every night.",
  conceptBody:
    "North Club works as a platform for music, art and community. The strategy does not freeze the brand into one style; it provides clear rules that let it transform with every programme without losing direction.",
  identityEyebrow: "02 / VISUAL IDENTITY",
  identityTitle: "A modular system, not a static logo.",
  identityBody:
    "Typography, colour and composition work as modules. Electric contrasts and variable structures generate an endless stream of new pieces while retaining a recognisable signature across posters, screens and social media.",
  logoNote:
    "A direct and adaptable typographic block. It can fill the canvas, become a frame or contract into a stamp for every event.",
  colors: [
    { name: "North violet", hex: "#673CFF" }, { name: "Mist", hex: "#E8E2FF" },
    { name: "Night", hex: "#0B0B0E" }, { name: "Pulse", hex: "#FF4FC8" },
  ],
  typographyTitle: "Impact for the poster. Order for the programme.",
  typographyBody:
    "A commanding display typeface leads campaigns and headlines, while the monospaced layer organises dates, artists, times, rooms and tickets.",
  typePrimaryLabel: "Primary typeface / Manrope",
  typeDisplayLines: ["The night", "changes shape."],
  typeSecondaryLabel: "Functional typeface / DM Mono",
  typeSample: "A–Z / 0–9 / LINE-UP / DATE / ROOM / TICKETS",
  voiceEyebrow: "03 / BRAND LANGUAGE",
  voiceTitle: "More signal. Less explanation.",
  voiceBody:
    "The voice is brief, magnetic and collective. It does not describe a party; it activates a sense of belonging and turns every line into campaign material.",
  voiceLines: ["THE NIGHT CHANGES.", "NORTH IS A DIRECTION.", "TONIGHT IS THE PLACE."],
  applicationsEyebrow: "04 / APPLICATIONS",
  applicationsTitle: "Built to move with the programme.",
  applicationsBody:
    "The system generates posters, tickets, content, signage and merchandise through fast, expressive variations that always remain connected.",
  applicationOne: {
    caption: "Poster / Programme", titleLines: ["NORTH", "CLUB"],
    rows: [["FRI 14", "Live set / Room 01 / 23:30"], ["SAT 15", "Residents / Room 02 / 00:00"], ["SUN 16", "Art session / Terrace / 19:00"]],
  },
  applicationTwo: {
    caption: "Merchandise / Community", titleLines: ["NORTH", "CLUB"],
    small: "MUSIC / ART / NIGHT", sticker: ["NC", "26"],
  },
  applicationPhoto: { caption: "Campaign / Event", lines: ["THERE ISN’T", "ONLY ONE", "NIGHT."] },
  digitalEyebrow: "05 / DIGITAL EXPERIENCE",
  digitalTitle: "The full programme. Zero friction.",
  digitalBody:
    "The digital experience prioritises what is happening now: discover dates, artists and content, then move from curiosity to a ticket in just a few gestures.",
  digitalMockup: {
    url: "northclub.live", nav: "PROGRAMME   TICKETS", kicker: "CLUB / CULTURE / BARCELONA",
    headline: "EVERY NIGHT, A NEW IDENTITY.", cta: "VIEW THE PROGRAMME ↗",
  },
  resultEyebrow: "06 / OUTCOME",
  resultHeadline: "A brand built never to repeat itself.",
  resultBody:
    "A flexible and recognisable language that evolves with every date, collaboration and channel without losing the energy that holds the community together.",
};

export const northClub: Record<Locale, ProjectContent> = {
  fr: {
    metaTitle: "North Club — Identité pour une marque nightlife & culture | KLENT",
    metaDescription:
      "Système visuel pour North Club, une marque nightlife et culture pensée pour vivre sur les réseaux, les campagnes et les événements. Étude de cas KLENT.",
    category: "Culture",
    name: ["North", "Club"],
    tags: ["Identité", "Campagne", "Réseaux sociaux"],
    image,
    alt: "Concept de marque culture et événementiel",
    conceptNote:
      "Concept illustratif réalisé pour explorer une direction créative — pas un client réel ni un projet livré.",
    intro:
      "North Club imagine l'identité d'une marque nightlife et culture pensée dès le départ pour vivre ailleurs que sur un site figé — sur les réseaux, les campagnes et les affiches d'événements.",
    briefTitle: "Le brief",
    brief:
      "Construire un système visuel assez expressif pour porter une programmation qui change en permanence, sans jamais perdre en reconnaissabilité.",
    approachTitle: "L'approche",
    approach:
      "Une identité modulaire — typographie, couleur, motifs — conçue comme un système de composants réutilisables plutôt qu'un logo figé, pour s'adapter à chaque soirée, chaque campagne.",
    resultTitle: "Le résultat",
    result:
      "Une marque capable de se décliner à l'infini sur les réseaux et les supports événementiels, tout en restant immédiatement identifiable.",
    caseStudy: frenchCaseStudy,
  },
  es: {
    metaTitle: "North Club — Identidad para una marca de ocio nocturno y cultura | KLENT",
    metaDescription:
      "Sistema visual para North Club, una marca de ocio nocturno y cultura pensada para redes, campañas y eventos. Caso de estudio KLENT.",
    category: "Cultura",
    name: ["North", "Club"],
    tags: ["Identidad", "Campaña", "Redes sociales"],
    image,
    alt: "Concepto de marca cultural y de eventos",
    conceptNote:
      "Concepto ilustrativo realizado para explorar una dirección creativa — no es un cliente real ni un proyecto entregado.",
    intro:
      "North Club imagina la identidad de una marca de ocio nocturno y cultura pensada desde el inicio para vivir más allá de un sitio estático — en redes, campañas y carteles de eventos.",
    briefTitle: "El brief",
    brief:
      "Construir un sistema visual lo bastante expresivo como para sostener una programación en constante cambio, sin perder nunca reconocibilidad.",
    approachTitle: "El enfoque",
    approach:
      "Una identidad modular — tipografía, color, patrones — diseñada como un sistema de componentes reutilizables en lugar de un logo fijo, para adaptarse a cada evento y cada campaña.",
    resultTitle: "El resultado",
    result:
      "Una marca capaz de reinventarse constantemente en redes y soportes de eventos, manteniéndose siempre identificable.",
    caseStudy: spanishCaseStudy,
  },
  "es-ar": {
    metaTitle: "North Club — Identidad para una marca de vida nocturna y cultura | KLENT",
    metaDescription:
      "Sistema visual para North Club, una marca de vida nocturna y cultura pensada para redes, campañas y eventos. Caso de estudio KLENT.",
    category: "Cultura",
    name: ["North", "Club"],
    tags: ["Identidad", "Campaña", "Redes sociales"],
    image,
    alt: "Concepto de marca cultural y de eventos",
    conceptNote:
      "Concepto ilustrativo realizado para explorar una dirección creativa — no es un cliente real ni un proyecto entregado.",
    intro:
      "North Club imagina la identidad de una marca de vida nocturna y cultura pensada desde el arranque para vivir más allá de un sitio estático — en redes, campañas y flyers de eventos.",
    briefTitle: "El brief",
    brief:
      "Construir un sistema visual lo suficientemente expresivo para sostener una programación que cambia todo el tiempo, sin perder nunca reconocibilidad.",
    approachTitle: "El enfoque",
    approach:
      "Una identidad modular — tipografía, color, patrones — pensada como un sistema de componentes reutilizables en vez de un logo fijo, para adaptarse a cada fecha y cada campaña.",
    resultTitle: "El resultado",
    result:
      "Una marca capaz de reinventarse todo el tiempo en redes y piezas de eventos, manteniéndose siempre identificable.",
    caseStudy: spanishCaseStudy,
  },
  en: {
    metaTitle: "North Club — Identity for a Nightlife & Culture Brand | KLENT",
    metaDescription:
      "A visual system for North Club, a nightlife and culture brand built to live across social, campaigns and events. KLENT case study.",
    category: "Culture",
    name: ["North", "Club"],
    tags: ["Identity", "Campaign", "Social"],
    image,
    alt: "Culture and events brand concept",
    conceptNote:
      "An illustrative concept built to explore a creative direction — not a real client or a delivered project.",
    intro:
      "North Club imagines the identity of a nightlife and culture brand designed from day one to live somewhere other than a static site — across social, campaigns and event posters.",
    briefTitle: "The brief",
    brief:
      "Build a visual system expressive enough to carry a constantly changing lineup, without ever losing recognizability.",
    approachTitle: "The approach",
    approach:
      "A modular identity — type, color, pattern — designed as a system of reusable components rather than a fixed logo, built to flex for every night and every campaign.",
    resultTitle: "The result",
    result:
      "A brand able to reinvent itself endlessly across social and event materials, while staying instantly recognizable.",
    caseStudy: englishCaseStudy,
  },
};

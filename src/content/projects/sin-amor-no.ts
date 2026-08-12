import type { Locale } from "@/lib/i18n/config";
import type { ProjectContent } from "@/lib/i18n/project-content";

const image =
  "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=85";

const spanishCaseStudy: NonNullable<ProjectContent["caseStudy"]> = {
  year: "2026",
  location: "Barcelona",
  scope: "Estrategia / Identidad / Digital",
  status: "Concepto independiente",
  theme: { primary: "#B8322A", secondary: "#F1E5CE", dark: "#171412", accent: "#D8FF3E" },
  logoLines: ["SIN", "AMOR", "NO."],
  symbolLetters: ["S", "A", "N"],
  coverCaption: "Identidad gastronómica / Dirección visual",
  conceptEyebrow: "01 / EL CONCEPTO",
  conceptTitle: "Una marca que no pide permiso.",
  conceptBody:
    "Sin Amor No nace de una idea sencilla: comer también es una forma de tomar posición. Construimos una identidad gastronómica directa, cálida y cultural, capaz de hablar con personalidad sin caer en los códigos previsibles de la restauración.",
  identityEyebrow: "02 / IDENTIDAD VISUAL",
  identityTitle: "Contraste que abre el apetito.",
  identityBody:
    "El sistema combina una voz tipográfica contundente con una paleta inspirada en la mesa, el fuego y los ingredientes frescos. Cada elemento está pensado para reconocerse rápido y funcionar igual de bien en una fachada, una carta o una pantalla.",
  logoNote: "Un logotipo verbal compacto, frontal y flexible. La repetición convierte el nombre en una declaración.",
  colors: [
    { name: "Rojo sin filtro", hex: "#B8322A" },
    { name: "Crema mesa", hex: "#F1E5CE" },
    { name: "Carbón", hex: "#171412" },
    { name: "Verde fresco", hex: "#D8FF3E" },
  ],
  typographyTitle: "Una voz grande. Información precisa.",
  typographyBody:
    "La tipografía principal construye titulares con presencia; la monoespaciada organiza ingredientes, precios, horarios y pequeños mensajes editoriales.",
  typePrimaryLabel: "Tipografía principal / Manrope",
  typeDisplayLines: ["Comer es", "tomar posición."],
  typeSecondaryLabel: "Tipografía funcional / DM Mono",
  typeSample: "A–Z / 0–9 / MENÚ / RESERVAS / HORARIOS",
  voiceEyebrow: "03 / LENGUAJE DE MARCA",
  voiceTitle: "Decir menos. Decirlo mejor.",
  voiceBody:
    "La voz evita frases decorativas. Habla como la cocina: clara, cercana y con carácter. Los mensajes cortos permiten que la marca se reconozca incluso cuando el logotipo no aparece.",
  voiceLines: ["SIN MIEDO.", "SIN FILTRO.", "SIN AMOR NO."],
  applicationsEyebrow: "04 / APLICACIONES",
  applicationsTitle: "Una identidad preparada para salir a la calle.",
  applicationsBody:
    "El sistema se despliega en carta, packaging, señalética, contenidos sociales y piezas de campaña sin perder coherencia ni depender siempre de la misma composición.",
  applicationOne: {
    caption: "Carta / Sistema editorial",
    titleLines: ["SIN", "AMOR", "NO."],
    rows: [
      ["PARA EMPEZAR", "Pan / tomate / aceite"],
      ["DEL FUEGO", "Verduras / carne / temporada"],
      ["PARA SEGUIR", "Vino / sobremesa / conversación"],
    ],
  },
  applicationTwo: {
    caption: "Packaging / Take away",
    titleLines: ["SIN", "AMOR", "NO."],
    small: "HECHO PARA COMPARTIR",
    sticker: ["SAN", "BCN"],
  },
  applicationPhoto: { caption: "Campaña / Contenido", lines: ["UNA MESA.", "MUCHAS IDEAS."] },
  digitalEyebrow: "05 / EXPERIENCIA DIGITAL",
  digitalTitle: "Del primer impacto a la reserva.",
  digitalBody:
    "La experiencia web traslada el ritmo de la identidad a una navegación simple: descubrir el concepto, abrir el apetito, consultar la carta y reservar sin fricción.",
  digitalMockup: {
    url: "sinamorno.com",
    nav: "MENÚ   RESERVAR",
    kicker: "COCINA / CULTURA / BARCELONA",
    headline: "COMER TAMBIÉN ES TOMAR POSICIÓN.",
    cta: "RESERVAR UNA MESA ↗",
  },
  resultEyebrow: "06 / RESULTADO",
  resultHeadline: "Una marca con hambre de ser recordada.",
  resultBody:
    "Un sistema reconocible, flexible y listo para crecer desde un primer local hasta nuevas campañas, colaboraciones y experiencias digitales.",
};

const frenchCaseStudy: NonNullable<ProjectContent["caseStudy"]> = {
  ...spanishCaseStudy,
  location: "Barcelone",
  scope: "Stratégie / Identité / Digital",
  status: "Concept indépendant",
  coverCaption: "Identité gastronomique / Direction visuelle",
  conceptEyebrow: "01 / LE CONCEPT",
  conceptTitle: "Une marque qui ne demande pas la permission.",
  conceptBody:
    "Sin Amor No part d’une idée simple : manger est aussi une manière de prendre position. Nous avons imaginé une identité gastronomique directe, chaleureuse et culturelle, capable de s’exprimer avec personnalité sans reprendre les codes prévisibles de la restauration.",
  identityEyebrow: "02 / IDENTITÉ VISUELLE",
  identityTitle: "Un contraste qui ouvre l’appétit.",
  identityBody:
    "Le système associe une voix typographique affirmée à une palette inspirée de la table, du feu et des ingrédients frais. Chaque élément est conçu pour être reconnu rapidement et fonctionner aussi bien sur une façade, une carte ou un écran.",
  logoNote:
    "Un logotype verbal compact, frontal et flexible. La répétition transforme le nom en déclaration.",
  colors: [
    { name: "Rouge sans filtre", hex: "#B8322A" },
    { name: "Crème table", hex: "#F1E5CE" },
    { name: "Charbon", hex: "#171412" },
    { name: "Vert frais", hex: "#D8FF3E" },
  ],
  typographyTitle: "Une voix forte. Une information précise.",
  typographyBody:
    "La typographie principale compose des titres très présents ; la monospace organise les ingrédients, les prix, les horaires et les messages éditoriaux.",
  typePrimaryLabel: "Typographie principale / Manrope",
  typeDisplayLines: ["Manger, c’est", "prendre position."],
  typeSecondaryLabel: "Typographie fonctionnelle / DM Mono",
  typeSample: "A–Z / 0–9 / CARTE / RÉSERVATIONS / HORAIRES",
  voiceEyebrow: "03 / LANGAGE DE MARQUE",
  voiceTitle: "En dire moins. Le dire mieux.",
  voiceBody:
    "La voix évite les phrases décoratives. Elle parle comme la cuisine : clairement, simplement et avec du caractère. Les messages courts rendent la marque identifiable même sans son logotype.",
  voiceLines: ["SANS PEUR.", "SANS FILTRE.", "SANS AMOUR, NON."],
  applicationsEyebrow: "04 / APPLICATIONS",
  applicationsTitle: "Une identité prête à descendre dans la rue.",
  applicationsBody:
    "Le système se déploie sur la carte, le packaging, la signalétique, les contenus sociaux et les campagnes sans perdre sa cohérence ni dépendre d’une composition unique.",
  applicationOne: {
    caption: "Carte / Système éditorial",
    titleLines: ["SIN", "AMOR", "NO."],
    rows: [
      ["POUR COMMENCER", "Pain / tomate / huile"],
      ["DU FEU", "Légumes / viande / saison"],
      ["POUR CONTINUER", "Vin / dessert / conversation"],
    ],
  },
  applicationTwo: {
    caption: "Packaging / À emporter",
    titleLines: ["SIN", "AMOR", "NO."],
    small: "FAIT POUR ÊTRE PARTAGÉ",
    sticker: ["SAN", "BCN"],
  },
  applicationPhoto: { caption: "Campagne / Contenu", lines: ["UNE TABLE.", "BEAUCOUP D’IDÉES."] },
  digitalEyebrow: "05 / EXPÉRIENCE DIGITALE",
  digitalTitle: "Du premier impact à la réservation.",
  digitalBody:
    "L’expérience web transpose le rythme de l’identité dans une navigation simple : découvrir le concept, ouvrir l’appétit, consulter la carte et réserver sans friction.",
  digitalMockup: {
    url: "sinamorno.com",
    nav: "CARTE   RÉSERVER",
    kicker: "CUISINE / CULTURE / BARCELONE",
    headline: "MANGER EST AUSSI UNE MANIÈRE DE PRENDRE POSITION.",
    cta: "RÉSERVER UNE TABLE ↗",
  },
  resultEyebrow: "06 / RÉSULTAT",
  resultHeadline: "Une marque qui a faim d’être mémorable.",
  resultBody:
    "Un système reconnaissable, flexible et prêt à grandir, du premier établissement aux futures campagnes, collaborations et expériences digitales.",
};

const englishCaseStudy: NonNullable<ProjectContent["caseStudy"]> = {
  ...spanishCaseStudy,
  scope: "Strategy / Identity / Digital",
  status: "Independent concept",
  coverCaption: "Food identity / Visual direction",
  conceptEyebrow: "01 / THE CONCEPT",
  conceptTitle: "A brand that does not ask for permission.",
  conceptBody:
    "Sin Amor No begins with a simple idea: eating is also a way of taking a stand. We created a direct, warm and culturally driven restaurant identity with enough personality to avoid the predictable codes of hospitality branding.",
  identityEyebrow: "02 / VISUAL IDENTITY",
  identityTitle: "Contrast that builds an appetite.",
  identityBody:
    "The system combines a bold typographic voice with a palette inspired by the table, fire and fresh ingredients. Every element is designed for instant recognition across signage, menus and screens.",
  logoNote:
    "A compact, direct and flexible wordmark. Repetition turns the name into a statement.",
  colors: [
    { name: "Unfiltered red", hex: "#B8322A" },
    { name: "Table cream", hex: "#F1E5CE" },
    { name: "Charcoal", hex: "#171412" },
    { name: "Fresh green", hex: "#D8FF3E" },
  ],
  typographyTitle: "A loud voice. Precise information.",
  typographyBody:
    "The primary typeface creates commanding headlines, while the monospaced layer organises ingredients, prices, opening times and editorial details.",
  typePrimaryLabel: "Primary typeface / Manrope",
  typeDisplayLines: ["Eating is", "taking a stand."],
  typeSecondaryLabel: "Functional typeface / DM Mono",
  typeSample: "A–Z / 0–9 / MENU / BOOKINGS / OPENING TIMES",
  voiceEyebrow: "03 / BRAND LANGUAGE",
  voiceTitle: "Say less. Say it better.",
  voiceBody:
    "The voice avoids decorative language. It speaks like the food: clearly, warmly and with character. Short messages make the brand recognisable even when the logo is absent.",
  voiceLines: ["NO FEAR.", "NO FILTER.", "NO LOVE, NO."],
  applicationsEyebrow: "04 / APPLICATIONS",
  applicationsTitle: "An identity ready to hit the streets.",
  applicationsBody:
    "The system extends across menus, packaging, signage, social content and campaigns without losing consistency or relying on one fixed composition.",
  applicationOne: {
    caption: "Menu / Editorial system",
    titleLines: ["SIN", "AMOR", "NO."],
    rows: [
      ["TO BEGIN", "Bread / tomato / olive oil"],
      ["FROM THE FIRE", "Vegetables / meat / seasonal produce"],
      ["TO CONTINUE", "Wine / dessert / conversation"],
    ],
  },
  applicationTwo: {
    caption: "Packaging / Takeaway",
    titleLines: ["SIN", "AMOR", "NO."],
    small: "MADE TO BE SHARED",
    sticker: ["SAN", "BCN"],
  },
  applicationPhoto: { caption: "Campaign / Content", lines: ["ONE TABLE.", "MANY IDEAS."] },
  digitalEyebrow: "05 / DIGITAL EXPERIENCE",
  digitalTitle: "From first impression to booking.",
  digitalBody:
    "The website carries the identity’s rhythm into a simple journey: discover the concept, build an appetite, explore the menu and book without friction.",
  digitalMockup: {
    url: "sinamorno.com",
    nav: "MENU   BOOK",
    kicker: "FOOD / CULTURE / BARCELONA",
    headline: "EATING IS ALSO A WAY OF TAKING A STAND.",
    cta: "BOOK A TABLE ↗",
  },
  resultEyebrow: "06 / OUTCOME",
  resultHeadline: "A brand hungry to be remembered.",
  resultBody:
    "A recognisable and flexible system, ready to grow from a first venue into future campaigns, collaborations and digital experiences.",
};

export const sinAmorNo: Record<Locale, ProjectContent> = {
  fr: {
    metaTitle: "Sin Amor No — Identité & site pour un concept de restauration | KLENT",
    metaDescription:
      "Concept de branding et de site internet pour Sin Amor No, un restaurant à forte identité culturelle. Étude de cas KLENT.",
    category: "Hôtellerie-restauration",
    name: ["Sin Amor", "No"],
    tags: ["Branding", "Site internet", "Développement"],
    image,
    alt: "Concept de branding pour restaurant",
    conceptNote:
      "Concept illustratif réalisé pour explorer une direction créative — pas un client réel ni un projet livré.",
    intro:
      "Sin Amor No imagine l'identité d'un restaurant qui refuse la neutralité : une cuisine avec un point de vue culturel fort, et une marque qui ne s'excuse pas de prendre position.",
    briefTitle: "Le brief",
    brief:
      "Construire une identité de marque et un site qui reflètent le caractère du lieu — chaleureux mais sans compromis, loin des codes lisses de la restauration traditionnelle.",
    approachTitle: "L'approche",
    approach:
      "Une identité visuelle contrastée, une typographie affirmée et un site pensé comme une vitrine éditoriale plutôt qu'un simple menu en ligne — avec la réservation et la conversion intégrées dès la conception.",
    resultTitle: "Le résultat",
    result:
      "Une identité cohérente du logo jusqu'au site, capable de porter la marque sur tous ses supports — physiques comme digitaux.",
    caseStudy: frenchCaseStudy,
  },
  es: {
    metaTitle: "Sin Amor No — Identidad y web para un concepto gastronómico | KLENT",
    metaDescription:
      "Concepto de branding y sitio web para Sin Amor No, un restaurante con una fuerte identidad cultural. Caso de estudio KLENT.",
    category: "Hostelería",
    name: ["Sin Amor", "No"],
    tags: ["Branding", "Sitio web", "Desarrollo"],
    image,
    alt: "Concepto de branding para restaurante",
    conceptNote:
      "Concepto ilustrativo realizado para explorar una dirección creativa — no es un cliente real ni un proyecto entregado.",
    intro:
      "Sin Amor No imagina la identidad de un restaurante que rechaza la neutralidad: una cocina con un punto de vista cultural fuerte, y una marca que no pide disculpas por tomar posición.",
    briefTitle: "El brief",
    brief:
      "Construir una identidad de marca y un sitio web que reflejen el carácter del local — cálido pero sin concesiones, lejos de los códigos planos de la hostelería tradicional.",
    approachTitle: "El enfoque",
    approach:
      "Una identidad visual contrastada, una tipografía con carácter y un sitio pensado como un escaparate editorial más que un simple menú online — con la reserva y la conversión integradas desde el diseño.",
    resultTitle: "El resultado",
    result:
      "Una identidad coherente desde el logo hasta el sitio web, capaz de sostener la marca en todos sus soportes — físicos y digitales.",
    caseStudy: spanishCaseStudy,
  },
  "es-ar": {
    metaTitle: "Sin Amor No — Identidad y web para un concepto gastronómico | KLENT",
    metaDescription:
      "Concepto de branding y sitio web para Sin Amor No, un restaurante con una fuerte identidad cultural. Caso de estudio KLENT.",
    category: "Gastronomía",
    name: ["Sin Amor", "No"],
    tags: ["Branding", "Sitio web", "Desarrollo"],
    image,
    alt: "Concepto de branding para restaurante",
    conceptNote:
      "Concepto ilustrativo realizado para explorar una dirección creativa — no es un cliente real ni un proyecto entregado.",
    intro:
      "Sin Amor No imagina la identidad de un restaurante que rechaza la neutralidad: una cocina con un punto de vista cultural fuerte, y una marca que no pide disculpas por tomar posición.",
    briefTitle: "El brief",
    brief:
      "Construir una identidad de marca y un sitio web que reflejen el carácter del local — cálido pero sin concesiones, lejos de los códigos planos de la gastronomía tradicional.",
    approachTitle: "El enfoque",
    approach:
      "Una identidad visual contrastada, una tipografía con carácter y un sitio pensado como una vidriera editorial más que un simple menú online — con la reserva y la conversión integradas desde el diseño.",
    resultTitle: "El resultado",
    result:
      "Una identidad coherente desde el logo hasta el sitio web, capaz de sostener la marca en todos sus soportes — físicos y digitales.",
    caseStudy: spanishCaseStudy,
  },
  en: {
    metaTitle: "Sin Amor No — Brand & Website for a Restaurant Concept | KLENT",
    metaDescription:
      "Branding and website concept for Sin Amor No, a restaurant with a strong cultural point of view. KLENT case study.",
    category: "Hospitality",
    name: ["Sin Amor", "No"],
    tags: ["Branding", "Web Design", "Development"],
    image,
    alt: "Restaurant branding concept",
    conceptNote:
      "An illustrative concept built to explore a creative direction — not a real client or a delivered project.",
    intro:
      "Sin Amor No imagines the identity of a restaurant that refuses to play it safe: a kitchen with a strong cultural point of view, and a brand that doesn't apologize for having one.",
    briefTitle: "The brief",
    brief:
      "Build a brand identity and website that reflect the place's character — warm but uncompromising, far from the polished conventions of traditional hospitality branding.",
    approachTitle: "The approach",
    approach:
      "A high-contrast visual identity, bold typography, and a site designed as an editorial showcase rather than a plain online menu — with booking and conversion built in from the start.",
    resultTitle: "The result",
    result:
      "A consistent identity from logo to website, strong enough to carry the brand across every touchpoint — physical and digital.",
    caseStudy: englishCaseStudy,
  },
};

import type { Locale } from "@/lib/i18n/config";
import type { StudioContent } from "@/lib/i18n/studio-content";

/**
 * Claims here stay deliberately factual (who we are, what each of us does,
 * which languages and markets we cover). No invented client counts, awards or
 * years of experience — this page is about trust, and it has to hold up.
 */
export const studio: Record<Locale, StudioContent> = {
  fr: {
    metaTitle: "Le studio | Qui sommes-nous ? | KLENT Creative",
    metaDescription:
      "KLENT est un studio créatif indépendant à deux : design et développement, relation client. Français et espagnol, entre La Rochelle, Barcelone et l'Argentine.",
    eyebrow: "Le studio",
    h1: "Deux personnes. Aucun intermédiaire.",
    intro:
      "KLENT est un studio créatif indépendant. Pas une agence avec des couches de chefs de projet : deux personnes qui travaillent directement avec vous, du premier échange à la mise en ligne.",
    teamEyebrow: "(01) L'équipe",
    teamTitle: "Qui vous aurez en face.",
    members: [
      {
        firstName: "Kevin",
        role: "Design & Développement",
        languages: "Français · Espagnol",
        bio: "Il conçoit et construit. Direction visuelle, interfaces, développement web et mobile, performance et référencement technique : c'est lui qui transforme le projet en produit qui fonctionne. Basé à La Rochelle.",
        photoAlt: "Portrait de Kevin, design et développement chez KLENT",
      },
      {
        firstName: "Céleste",
        role: "Relation client & Développement commercial",
        languages: "Espagnol · Français · Anglais",
        bio: "Elle est votre interlocutrice sur tout le volet commercial : premiers échanges, cadrage du besoin, devis et suivi. Espagnole et argentine, elle porte le studio sur les marchés hispanophones. Basée à Barcelone.",
        photoAlt: "Portrait de Céleste, relation client chez KLENT",
      },
    ],
    reachEyebrow: "(02) Nos marchés",
    reachTitle: "Trois marchés, deux langues natives.",
    reachBody:
      "Beaucoup d'agences traduisent leur site et se disent internationales. Chez nous, la couverture de la France, de l'Espagne et de l'Argentine n'est pas une traduction : c'est notre équipe.",
    reachPoints: [
      {
        title: "France",
        body: "Français natif, ancrage à La Rochelle et connaissance du tissu économique local : TPE, commerçants, artisans, indépendants.",
      },
      {
        title: "Espagne",
        body: "Espagnol natif et présence à Barcelone. Les échanges, les devis et les contenus se font dans votre langue, sans passer par l'anglais.",
      },
      {
        title: "Argentine",
        body: "Une vraie compréhension du marché argentin, de son vocabulaire local et de ses habitudes de travail, avec une tarification en dollars plutôt qu'un espagnol générique.",
      },
    ],
    approachEyebrow: "(03) Notre façon de travailler",
    approachTitle: "Peu de projets. Beaucoup d'attention.",
    approachBody:
      "Être deux nous impose une discipline : nous ne prenons pas tout. Ce que nous prenons, nous le suivons de bout en bout.",
    approachPoints: [
      {
        title: "Un interlocuteur direct",
        body: "Vous parlez à la personne qui vend et à celle qui construit. Pas de téléphone arabe entre un commercial, un chef de projet et un prestataire.",
      },
      {
        title: "La stratégie avant l'esthétique",
        body: "Nous cherchons d'abord ce qui rend votre marque différente. Le design vient ensuite servir cette idée, pas l'inverse.",
      },
      {
        title: "Vous restez propriétaires",
        body: "Code, hébergement, nom de domaine, accès : tout vous appartient. Vous n'êtes jamais captifs de votre prestataire.",
      },
    ],
    ctaKicker: "Envie de travailler ensemble ?",
    ctaHeadline: ["Parlons", "de votre projet."],
    ctaButton: "Démarrer un projet ↗︎",
  },

  es: {
    metaTitle: "El estudio | ¿Quiénes somos? | KLENT Creative",
    metaDescription:
      "Estudio creativo independiente de dos personas: diseño, desarrollo y relación con clientes. Entre Barcelona, La Rochelle y Argentina.",
    eyebrow: "El estudio",
    h1: "Dos personas. Ningún intermediario.",
    intro:
      "KLENT es un estudio creativo independiente. No una agencia con capas de jefes de proyecto: dos personas que trabajan directamente con vosotros, desde la primera conversación hasta la puesta en marcha.",
    teamEyebrow: "(01) El equipo",
    teamTitle: "Quién estará al otro lado.",
    members: [
      {
        firstName: "Kevin",
        role: "Diseño y Desarrollo",
        languages: "Francés · Español",
        bio: "Diseña y construye. Dirección visual, interfaces, desarrollo web y móvil, rendimiento y SEO técnico: es quien convierte el proyecto en un producto que funciona. Con base en La Rochelle.",
        photoAlt: "Retrato de Kevin, diseño y desarrollo en KLENT",
      },
      {
        firstName: "Céleste",
        role: "Relación con clientes y Desarrollo comercial",
        languages: "Español · Francés · Inglés",
        bio: "Es vuestra interlocutora en todo lo comercial: primeras conversaciones, definición de la necesidad, presupuestos y seguimiento. Española y argentina, lleva el estudio en los mercados hispanohablantes. Con base en Barcelona.",
        photoAlt: "Retrato de Céleste, relación con clientes en KLENT",
      },
    ],
    reachEyebrow: "(02) Nuestros mercados",
    reachTitle: "Tres mercados, dos lenguas nativas.",
    reachBody:
      "Muchas agencias traducen su web y se llaman internacionales. Aquí, cubrir España, Francia y Argentina no es una traducción: es nuestro equipo.",
    reachPoints: [
      {
        title: "España",
        body: "Español nativo y presencia en Barcelona. Las conversaciones, los presupuestos y los contenidos van en vuestro idioma, sin pasar por el inglés.",
      },
      {
        title: "Francia",
        body: "Francés nativo, base en La Rochelle y conocimiento del tejido económico local: pymes, comercios, autónomos.",
      },
      {
        title: "Argentina",
        body: "Una comprensión real del mercado argentino, de su vocabulario local y de sus formas de trabajar, con presupuestos en dólares en lugar de un español genérico.",
      },
    ],
    approachEyebrow: "(03) Nuestra forma de trabajar",
    approachTitle: "Pocos proyectos. Mucha atención.",
    approachBody:
      "Ser dos nos obliga a una disciplina: no aceptamos todo. Lo que aceptamos, lo acompañamos de principio a fin.",
    approachPoints: [
      {
        title: "Un interlocutor directo",
        body: "Habláis con quien vende y con quien construye. Sin teléfono roto entre un comercial, un jefe de proyecto y un proveedor.",
      },
      {
        title: "Estrategia antes que estética",
        body: "Primero buscamos qué hace diferente a vuestra marca. El diseño llega después, para servir a esa idea, no al revés.",
      },
      {
        title: "La propiedad es vuestra",
        body: "Código, alojamiento, dominio, accesos: todo os pertenece. Nunca quedáis atados a vuestro proveedor.",
      },
    ],
    ctaKicker: "¿Trabajamos juntos?",
    ctaHeadline: ["Hablemos", "de vuestro proyecto."],
    ctaButton: "Empezar un proyecto ↗︎",
  },

  "es-ar": {
    metaTitle: "El estudio | ¿Quiénes somos? | KLENT Creative",
    metaDescription:
      "Estudio creativo independiente de dos personas: diseño, desarrollo y relación con clientes. Entre Argentina, Barcelona y La Rochelle.",
    eyebrow: "El estudio",
    h1: "Dos personas. Ningún intermediario.",
    intro:
      "KLENT es un estudio creativo independiente. No una agencia con capas de jefes de proyecto: dos personas que trabajan directamente con vos, desde la primera charla hasta la puesta en marcha.",
    teamEyebrow: "(01) El equipo",
    teamTitle: "Quién va a estar del otro lado.",
    members: [
      {
        firstName: "Kevin",
        role: "Diseño y Desarrollo",
        languages: "Francés · Español",
        bio: "Diseña y construye. Dirección visual, interfaces, desarrollo web y mobile, rendimiento y SEO técnico: es quien convierte el proyecto en un producto que funciona. Con base en La Rochelle.",
        photoAlt: "Retrato de Kevin, diseño y desarrollo en KLENT",
      },
      {
        firstName: "Céleste",
        role: "Relación con clientes y Desarrollo comercial",
        languages: "Español · Francés · Inglés",
        bio: "Es tu interlocutora en todo lo comercial: primeras charlas, definición de la necesidad, presupuestos y seguimiento. Española y argentina, lleva el estudio en los mercados hispanohablantes. Con base en Barcelona.",
        photoAlt: "Retrato de Céleste, relación con clientes en KLENT",
      },
    ],
    reachEyebrow: "(02) Nuestros mercados",
    reachTitle: "Tres mercados, dos lenguas nativas.",
    reachBody:
      "Muchas agencias traducen su sitio y se llaman internacionales. Acá, cubrir Argentina, España y Francia no es una traducción: es nuestro equipo.",
    reachPoints: [
      {
        title: "Argentina",
        body: "Una comprensión real del mercado local, de su vocabulario y de sus formas de trabajar, con presupuestos en dólares en lugar de un español genérico importado.",
      },
      {
        title: "España",
        body: "Español nativo y presencia en Barcelona. Las charlas, los presupuestos y los contenidos van en tu idioma, sin pasar por el inglés.",
      },
      {
        title: "Francia",
        body: "Francés nativo, base en La Rochelle y conocimiento del tejido económico local: pymes, comercios, autónomos.",
      },
    ],
    approachEyebrow: "(03) Nuestra forma de trabajar",
    approachTitle: "Pocos proyectos. Mucha atención.",
    approachBody:
      "Ser dos nos obliga a una disciplina: no aceptamos todo. Lo que aceptamos, lo acompañamos de punta a punta.",
    approachPoints: [
      {
        title: "Un interlocutor directo",
        body: "Hablás con quien vende y con quien construye. Sin teléfono descompuesto entre un comercial, un jefe de proyecto y un proveedor.",
      },
      {
        title: "Estrategia antes que estética",
        body: "Primero buscamos qué hace diferente a tu marca. El diseño llega después, para servir a esa idea, no al revés.",
      },
      {
        title: "La propiedad es tuya",
        body: "Código, hosting, dominio, accesos: todo te pertenece. Nunca quedás atado a tu proveedor.",
      },
    ],
    ctaKicker: "¿Trabajamos juntos?",
    ctaHeadline: ["Hablemos", "de tu proyecto."],
    ctaButton: "Empezar un proyecto ↗︎",
  },

  en: {
    metaTitle: "The studio | Who we are | KLENT Creative",
    metaDescription:
      "KLENT is a two-person independent creative studio: design and development, client relations. French and Spanish, across La Rochelle, Barcelona and Argentina.",
    eyebrow: "The studio",
    h1: "Two people. No middlemen.",
    intro:
      "KLENT is an independent creative studio. Not an agency with layers of project managers: two people working directly with you, from the first conversation through to launch.",
    teamEyebrow: "(01) The team",
    teamTitle: "Who you'll actually be dealing with.",
    members: [
      {
        firstName: "Kevin",
        role: "Design & Development",
        languages: "French · Spanish",
        bio: "He designs and builds. Through visual direction, interfaces, web and mobile development, performance and technical SEO, he turns the project into a product that works. Based in La Rochelle.",
        photoAlt: "Portrait of Kevin, design and development at KLENT",
      },
      {
        firstName: "Céleste",
        role: "Client Relations & Business Development",
        languages: "Spanish · French · English",
        bio: "She's your point of contact on everything commercial: first conversations, scoping, quotes and follow-up. Spanish and Argentine, she leads the studio across Spanish-speaking markets. Based in Barcelona.",
        photoAlt: "Portrait of Céleste, client relations at KLENT",
      },
    ],
    reachEyebrow: "(02) Our markets",
    reachTitle: "Three markets, two native languages.",
    reachBody:
      "Plenty of agencies translate their website and call themselves international. Here, covering France, Spain and Argentina comes directly from the team.",
    reachPoints: [
      {
        title: "France",
        body: "Native French, rooted in La Rochelle, with real knowledge of the local business landscape: small companies, shops, independents.",
      },
      {
        title: "Spain",
        body: "Native Spanish and a presence in Barcelona. Conversations, quotes and content happen in your language, without routing through English.",
      },
      {
        title: "Argentina",
        body: "A genuine understanding of the Argentine market, its local vocabulary and working habits, with pricing in dollars rather than generic Spanish.",
      },
    ],
    approachEyebrow: "(03) How we work",
    approachTitle: "Few projects. A lot of attention.",
    approachBody:
      "Being two forces a discipline on us: we don't take everything on. What we do take on, we see through end to end.",
    approachPoints: [
      {
        title: "A direct line",
        body: "You talk to the person who sells and the person who builds. No broken telephone between a salesperson, a project manager and a contractor.",
      },
      {
        title: "Strategy before aesthetics",
        body: "We look for what makes your brand different first. Design comes afterwards to serve that idea, not the other way round.",
      },
      {
        title: "You own everything",
        body: "The code, hosting, domain and access all belong to you. You're never locked in to your provider.",
      },
    ],
    ctaKicker: "Want to work together?",
    ctaHeadline: ["Let's talk", "about your project."],
    ctaButton: "Start a project ↗︎",
  },
};

export function getStudioContent(locale: Locale): StudioContent {
  return studio[locale];
}

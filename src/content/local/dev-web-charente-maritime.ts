import type { LocalLandingContent } from "@/lib/i18n/local-landing-content";

/**
 * Commercial landing for "développement web charente maritime".
 *
 * Search Console shows the home page picking up this department without the
 * site ever naming it. This page names it properly.
 *
 * Deliberately built around "développement web" and not "webmaster": the second
 * term carries a maintenance-and-troubleshooting intent that does not match
 * what the studio sells. It appears once, in the section about taking over an
 * existing site, which is the only place it is honest.
 *
 * Nothing here promises a recurring maintenance plan. The site has never
 * defined one: the closest existing wording, in the web-design FAQ, says
 * support "peut être assuré selon le niveau d'accompagnement souhaité". So
 * this page stays on the ground it can stand on — taking over, fixing,
 * optimising and evolving an existing site.
 *
 * The coverage list is phrased as reach, never as offices: the studio has one
 * French base, La Rochelle.
 */
export const devWebCharenteMaritime: LocalLandingContent = {
  metaTitle: "Développement web en Charente-Maritime | Klent Creative",
  metaDescription:
    "Studio de design et développement web basé à La Rochelle. Sites sur mesure, applications mobiles et outils métier pour les entreprises de Charente-Maritime.",
  eyebrow: "Développement web — Charente-Maritime",
  h1: ["Développement web en ", { outline: "Charente-Maritime" }],
  intro:
    "Nous sommes un studio de design et de développement installé à La Rochelle. Nous concevons des sites, des applications et des outils sur mesure pour des entreprises qui veulent autre chose qu'un gabarit.",

  features: [
    {
      title: "Design et développement au même endroit",
      body: "Pas de relais entre une agence qui dessine et un prestataire qui code. Les deux se font ici, ce qui évite la déperdition entre l'intention et le résultat.",
    },
    {
      title: "Sur mesure plutôt que gabarit",
      body: "Chaque projet part de vos contraintes réelles. Nous utilisons Next.js, WordPress, Shopify ou Flutter selon ce que le projet demande, pas selon une habitude.",
    },
    {
      title: "Deux personnes, aucun intermédiaire",
      body: "Vous parlez directement à ceux qui conçoivent et construisent votre projet, du premier échange à la mise en ligne.",
    },
    {
      title: "Vous restez propriétaires",
      body: "Code source, hébergement, domaines et accès vous appartiennent. Aucune dépendance imposée pour faire évoluer votre outil plus tard.",
    },
  ],

  benefits: {
    eyebrow: "Ce que nous construisons",
    headline: ["Du site vitrine à l'outil ", { outline: "métier." }],
    items: [
      {
        num: "01",
        title: "Sites internet",
        body: "Sites vitrines et sites professionnels sur mesure : structure, narration, design et socle SEO technique pensés ensemble dès la première maquette.",
      },
      {
        num: "02",
        title: "Applications mobiles",
        body: "Applications iOS et Android développées en Flutter, de la conception à la publication sur les stores.",
      },
      {
        num: "03",
        title: "Outils sur mesure",
        body: "Interfaces de gestion, espaces clients, réservation, catalogues connectés : les fonctions dont votre activité a besoin et qu'aucune solution du marché ne couvre exactement.",
      },
      {
        num: "04",
        title: "Identité de marque",
        body: "Quand le projet le demande, nous travaillons aussi l'identité en amont : direction visuelle, langage, cohérence entre le digital et le reste.",
      },
      {
        num: "05",
        title: "Croissance et contenu",
        body: "Référencement naturel, contenu et suivi de performance pour que le site continue de travailler après la mise en ligne.",
      },
    ],
  },

  process: {
    eyebrow: "Notre manière de travailler",
    headline: ["Comprendre, décider, ", { outline: "construire." }],
    steps: [
      {
        num: "01 — CADRAGE",
        title: "Comprendre",
        body: "Votre activité, vos clients, ce qui vous freine aujourd'hui. Nous posons le périmètre, les objectifs et les indicateurs avant de proposer une solution.",
      },
      {
        num: "02 — DIRECTION",
        title: "Décider",
        body: "Arborescence, parcours, direction visuelle et choix techniques. C'est ici que se décide le sur-mesure ou la solution existante, et pourquoi.",
      },
      {
        num: "03 — PRODUCTION",
        title: "Construire",
        body: "Design et développement avancent ensemble, par étapes visibles. Vous validez au fur et à mesure plutôt qu'à la livraison.",
      },
      {
        num: "04 — MISE EN LIGNE",
        title: "Livrer",
        body: "Recette multi-écrans, performance, SEO technique, analytics et prise en main. Vous repartez avec les accès et la documentation.",
      },
    ],
  },

  safeguard: {
    eyebrow: "Site existant",
    headline: ["Reprendre ou faire ", { outline: "évoluer" }, " un site."],
    intro:
      "Tous les projets ne partent pas de zéro. Une partie de notre travail consiste à reprendre un site déjà en place, construit ailleurs, et à le remettre en état de marche.",
    items: [
      {
        title: "Refonte",
        body: "Quand le site a fait son temps, nous le reconstruisons en conservant ce qui fonctionne et en préservant le référencement acquis.",
      },
      {
        title: "Optimisation",
        body: "Vitesse de chargement, affichage mobile, accessibilité, socle SEO technique : des interventions ciblées quand la base est saine mais mal exploitée.",
      },
      {
        title: "Évolutions et corrections",
        body: "Ajout de pages ou de fonctionnalités, correction d'un comportement cassé, reprise d'un développement laissé en plan par un précédent prestataire.",
      },
      {
        title: "Après la mise en ligne",
        body: "Si vous cherchez un webmaster en Charente-Maritime pour faire vivre un site existant, nous intervenons sur ce terrain-là : corrections, ajustements et évolutions, dans le prolongement d'un projet que nous avons construit ou repris. Le niveau d'accompagnement se définit avec vous, projet par projet.",
      },
    ],
  },

  coverage: {
    eyebrow: "Zone d'intervention",
    headline: ["Basé à La Rochelle, disponible ", { outline: "partout." }],
    intro:
      "Le studio a une base française : La Rochelle. Nous travaillons avec des entreprises du département et bien au-delà — l'essentiel du travail se fait en visio et sur des outils partagés, avec des rendez-vous sur place quand le projet le justifie.",
    places: [
      "La Rochelle",
      "Rochefort",
      "Royan",
      "Saintes",
      "Île de Ré",
      "Île d'Oléron",
      "Niort",
      "Saint-Jean-d'Angély",
    ],
    note: "Ces villes sont des zones de collaboration, pas des implantations : Klent Creative n'a qu'une adresse en France, à La Rochelle.",
  },

  showcase: {
    eyebrow: "Nos réalisations",
    headline: ["Ce que nous avons ", { outline: "construit." }],
    intro: "Deux projets publiés, conçus et développés intégralement au studio.",
    items: [
      {
        slug: "oxploria",
        name: "Oxploria",
        meta: "Flutter / Next.js",
        body: "Application mobile et site pour un guide culturel interactif, pensés autour de Barcelone et de La Rochelle puis prévus pour accueillir d'autres villes.",
      },
      {
        slug: "manna",
        name: "Mannà",
        meta: "Poblenou / Barcelona",
        body: "Site, réservation directe et carte interactive pour un restaurant, de l'identité au développement.",
      },
    ],
  },

  faq: {
    eyebrow: "Questions fréquentes",
    headline: ["Travailler avec un studio ", { outline: "local." }],
    items: [
      {
        title: "Faut-il être en Charente-Maritime pour travailler avec vous ?",
        body: "Non. Nous sommes basés à La Rochelle et travaillons avec des clients en France, en Espagne et en Argentine. La proximité facilite les premiers échanges, elle n'est pas une condition.",
      },
      {
        title: "Sur mesure ou solution existante : comment choisissez-vous ?",
        body: "Selon vos usages, votre budget et votre autonomie souhaitée. WordPress ou Shopify quand vous publiez et gérez vous-même au quotidien. Next.js quand la performance et le sur-mesure priment. Flutter pour le mobile. Le choix est argumenté au cadrage, pas imposé au départ.",
      },
      {
        title: "Reprenez-vous un site développé par quelqu'un d'autre ?",
        body: "Oui, à condition d'avoir accès au code et à l'hébergement. Nous commençons par un audit pour évaluer ce qui peut être conservé et ce qui coûterait plus cher à maintenir qu'à refaire.",
      },
      {
        title: "Quel budget prévoir ?",
        body: "Il dépend entièrement du périmètre : nombre de pages, fonctionnalités, volume de contenu et intégrations. Après un échange de cadrage, vous recevez une proposition détaillée avec un périmètre, un calendrier et un budget définis.",
      },
      {
        title: "Intervenez-vous sur un site après sa mise en ligne ?",
        body: "Oui : corrections, optimisations et évolutions, sur un projet que nous avons construit ou repris. Le niveau d'accompagnement après la livraison se définit au cas par cas plutôt que par une formule standard — nous sommes un studio de conception, pas un service de dépannage à la tâche.",
      },
      {
        title: "Développez-vous aussi les applications mobiles ?",
        body: "Oui, en Flutter, avec une seule base de code pour iOS et Android. Nous prenons en charge la conception, le développement et la publication sur l'App Store et le Play Store.",
      },
    ],
  },

  related: {
    label: "Aller plus loin",
    links: [
      { href: "/fr/creation-site-internet", text: "Création de site internet" },
      { href: "/fr/application-mobile", text: "Application mobile" },
      { href: "/fr/refonte-site-internet-la-rochelle", text: "Refonte de site internet à La Rochelle" },
      { href: "/fr/realisations", text: "Nos réalisations" },
    ],
  },

  closingKicker: "Un projet web en Charente-Maritime ?",
  closingHeadline: ["Construisons", [{ outline: "votre projet." }]],
  ctaButton: "Démarrer un projet ↗︎",
};

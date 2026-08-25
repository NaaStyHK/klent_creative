import type { LocalLandingContent } from "@/lib/i18n/local-landing-content";

/**
 * Commercial landing for "refonte site internet la rochelle".
 *
 * The blog article at /fr/blog/refonte-site-web-la-rochelle answers the
 * informational side of the same subject and stays where it is. This page
 * answers the other half: someone who has already decided and is looking for
 * whom to call.
 *
 * Every figure below is the floor of a range already published in the price
 * table of that article. Nothing here is estimated for the occasion, and the
 * starting price is the honest way to state it: the article keeps the full
 * ranges for readers who want them.
 */
export const refonteLaRochelle: LocalLandingContent = {
  metaTitle: "Refonte de site internet à La Rochelle | Klent Creative",
  metaDescription:
    "Studio de design et développement à La Rochelle. Refonte de votre site internet : audit, design sur mesure et migration sans perdre votre référencement.",
  eyebrow: "Refonte de site internet — La Rochelle",
  h1: ["Refonte de site internet à ", { outline: "La Rochelle" }],
  intro:
    "Votre site fonctionne encore, mais il ne raconte plus ce que vous êtes devenu. Nous reprenons l'existant, gardons ce qui mérite de l'être et reconstruisons le reste : structure, design, performance et référencement.",

  features: [
    {
      title: "Un diagnostic avant tout devis",
      body: "Nous commençons par regarder ce que vous avez : contenus, trafic, positions, technique. Une refonte utile part de ce qui fonctionne déjà, pas d'une page blanche.",
    },
    {
      title: "Design sur mesure, jamais de template",
      body: "Votre site est dessiné pour votre marque et vos clients. C'est ce qui sépare un site refait d'un site simplement remis au goût du jour.",
    },
    {
      title: "Votre référencement est préservé",
      body: "URLs, redirections, métadonnées, sitemap : le plan de migration fait partie du projet dès le cadrage, pas des finitions de dernière minute.",
    },
    {
      title: "Vous restez propriétaires",
      body: "Code, hébergement, noms de domaine, accès : tout vous appartient. Vous n'êtes lié à personne pour faire évoluer votre site ensuite.",
    },
  ],

  benefits: {
    eyebrow: "Diagnostic",
    headline: ["Les signes qu'une refonte devient ", { outline: "nécessaire." }],
    items: [
      {
        num: "01",
        title: "Le design a vieilli",
        body: "Un site porte la date à laquelle il a été conçu. Quand l'esthétique décroche de votre positionnement actuel, le visiteur en tire une conclusion sur votre entreprise avant même d'avoir lu une ligne.",
      },
      {
        num: "02",
        title: "L'expérience mobile est subie",
        body: "Texte qu'il faut agrandir, boutons trop proches, menu qui se replie mal. La majorité de vos visiteurs arrivent depuis un téléphone : si le site n'a pas été pensé pour eux, il travaille contre vous.",
      },
      {
        num: "03",
        title: "On ne trouve plus rien",
        body: "L'arborescence s'est construite par ajouts successifs. Les pages importantes sont enterrées à trois clics, et les parcours ne mènent plus nulle part de précis.",
      },
      {
        num: "04",
        title: "Le site est lent",
        body: "Images non optimisées, thème surchargé, extensions accumulées. La lenteur coûte des visiteurs avant l'affichage de la première ligne de texte, et elle se mesure.",
      },
      {
        num: "05",
        title: "Le référencement stagne",
        body: "Structure sémantique approximative, métadonnées absentes ou dupliquées, contenus trop courts. Un site peut être joli et rester illisible pour un moteur de recherche.",
      },
      {
        num: "06",
        title: "Le discours ne correspond plus",
        body: "Vos offres ont évolué, votre clientèle aussi, mais les textes datent du lancement. Le décalage se voit, et il se paie en crédibilité.",
      },
      {
        num: "07",
        title: "Rien ne se transforme",
        body: "Le trafic existe, les demandes non. C'est souvent le symptôme le plus révélateur : le problème n'est pas la visibilité, c'est ce qui se passe une fois le visiteur arrivé.",
      },
    ],
  },

  process: {
    eyebrow: "Notre méthode",
    headline: ["D'un site qui date à un site qui ", { outline: "travaille." }],
    steps: [
      {
        num: "01 — AUDIT",
        title: "Comprendre",
        body: "Analyse de l'existant : contenus, arborescence, positions, performance, technique. Nous identifions ce qui mérite d'être conservé et ce qui doit disparaître, avant d'ouvrir le moindre outil de design.",
      },
      {
        num: "02 — STRATÉGIE",
        title: "Décider",
        body: "Objectifs, audiences, nouvelle arborescence, plan de redirections. C'est l'étape qui détermine si la refonte sera partielle ou complète, et ce que devient chaque URL existante.",
      },
      {
        num: "03 — DESIGN & DEV",
        title: "Construire",
        body: "Direction visuelle, maquettes responsive et développement avancent ensemble. Vous voyez le site prendre forme par étapes plutôt qu'au moment de la livraison.",
      },
      {
        num: "04 — MIGRATION",
        title: "Basculer",
        body: "Recette multi-écrans, vérification des redirections, performance, Search Console et analytics. La bascule est préparée pour que le nouveau site prenne la place de l'ancien sans coupure ni perte.",
      },
    ],
  },

  safeguard: {
    eyebrow: "Migration",
    headline: ["Refondre sans perdre son ", { outline: "référencement." }],
    intro:
      "C'est la crainte qui revient à chaque projet, et elle est légitime : une refonte mal migrée fait disparaître des années de positions du jour au lendemain. Voici ce que nous traitons systématiquement.",
    items: [
      {
        title: "Les URLs et les redirections",
        body: "Chaque adresse existante est recensée avant la bascule. Celles qui restent gardent leur adresse, celles qui changent reçoivent une redirection permanente vers leur équivalent le plus proche. Aucune page indexée ne se retrouve en erreur.",
      },
      {
        title: "Les métadonnées et les canonicals",
        body: "Titles, descriptions et balises canoniques sont repris page par page. Une refonte est aussi l'occasion de corriger les doublons et les pages sans description accumulés au fil du temps.",
      },
      {
        title: "Le contenu qui portait vos positions",
        body: "Les pages qui génèrent déjà des impressions sont identifiées avant le projet. On les retravaille, on ne les supprime pas — c'est la principale cause de perte de trafic après une refonte.",
      },
      {
        title: "Le sitemap et la Search Console",
        body: "Nouveau sitemap soumis à la mise en ligne, suivi de l'indexation et des erreurs de couverture dans les semaines qui suivent. Une migration se vérifie après coup, pas seulement le jour J.",
      },
      {
        title: "La performance",
        body: "Vitesse de chargement, stabilité de l'affichage et réactivité sont mesurées avant et après. Ce sont des critères d'expérience utilisateur, et Google les prend en compte.",
      },
    ],
  },

  pricing: {
    eyebrow: "Budget",
    headline: ["Combien coûte une ", { outline: "refonte" }, " de site ?"],
    intro:
      "Le budget dépend du périmètre : ce que vous gardez, ce que vous refaites, et le volume de contenu à reprendre. Les fourchettes ci-dessous correspondent aux projets que nous menons.",
    rows: [
      {
        label: "Retouches design & performance",
        range: "À partir de 1 000 €",
        body: "Le site reste en place. On reprend l'identité visuelle, la lisibilité et la vitesse sans toucher à la structure ni aux adresses.",
      },
      {
        label: "Refonte partielle",
        range: "À partir de 2 000 €",
        body: "Nouvelle interface et nouveaux parcours sur une base technique conservée. Adapté quand le CMS tient encore la route et que le contenu est exploitable.",
      },
      {
        label: "Refonte complète sur mesure",
        range: "À partir de 3 500 €",
        body: "Nouvelle structure, nouveau design, nouveau développement. Le choix par défaut quand le site a plus de cinq ans ou que le positionnement a changé.",
      },
    ],
    note: "Budgets indicatifs : le montant dépend de l'existant à reprendre, du périmètre retenu, du volume de contenu et des fonctionnalités. Après un échange de cadrage, vous recevez une proposition avec un périmètre, un calendrier et un budget définis.",
  },

  showcase: {
    eyebrow: "Nos projets",
    headline: ["Des projets pensés pour ", { outline: "durer." }],
    intro:
      "Ces deux projets ne sont pas des refontes : ce sont des créations. Ils montrent en revanche le niveau de design et de développement que nous appliquons à chaque site, refonte comprise.",
    items: [
      {
        slug: "oxploria",
        name: "Oxploria",
        meta: "Flutter / Next.js",
        body: "Une application mobile et un site pour un guide culturel interactif, conçus autour de Barcelone et de La Rochelle.",
      },
      {
        slug: "manna",
        name: "Mannà",
        meta: "Poblenou / Barcelona",
        body: "Site, réservation directe et carte interactive pour un restaurant. Identité, interface et développement traités d'un seul tenant.",
      },
    ],
  },

  faq: {
    eyebrow: "Questions fréquentes",
    headline: ["Ce que vous voulez savoir avant de ", { outline: "vous lancer." }],
    items: [
      {
        title: "Combien de temps prend une refonte ?",
        body: "Le délai dépend du périmètre et surtout de la disponibilité des contenus et des décideurs. Le calendrier est fixé au cadrage, avec des étapes de validation qui sécurisent la date de mise en ligne. Une refonte partielle est nettement plus rapide qu'une refonte totale.",
      },
      {
        title: "Puis-je garder mon nom de domaine ?",
        body: "Oui, et c'est même recommandé. Votre nom de domaine porte votre historique et votre notoriété : le conserver évite de repartir de zéro. Nous nous occupons de la bascule technique vers le nouvel hébergement.",
      },
      {
        title: "Peut-on conserver certaines pages ?",
        body: "Oui. L'audit sert précisément à ça : identifier les pages qui fonctionnent — celles qui reçoivent du trafic, celles qui convertissent — et les retravailler plutôt que les remplacer. Le reste est repensé.",
      },
      {
        title: "Que devient mon référencement existant ?",
        body: "Il est préservé par le plan de migration : conservation des URLs quand c'est possible, redirections permanentes sinon, reprise des métadonnées et des contenus qui portaient vos positions. Un site refondu reste ensuite soumis aux mêmes règles que les autres — nous préparons le terrain, nous ne garantissons pas un classement.",
      },
      {
        title: "Mon site est sous WordPress, faut-il tout changer ?",
        body: "Pas nécessairement. WordPress reste pertinent quand vous publiez souvent et gérez vos contenus vous-même. Nous proposons Next.js quand la performance et le sur-mesure priment, et parfois nous gardons simplement le CMS existant en refaisant ce qui l'entoure. Le choix se fait à l'audit, selon vos usages.",
      },
      {
        title: "Faut-il couper le site pendant la refonte ?",
        body: "Non. Le nouveau site est développé et recetté sur un environnement séparé pendant que l'actuel continue de tourner. La bascule se fait en une fois, une fois tout validé.",
      },
    ],
  },

  related: {
    label: "Aller plus loin",
    links: [
      {
        href: "/fr/blog/refonte-site-web-la-rochelle",
        text: "Quand refaire son site : les signes, les erreurs et le budget",
      },
      { href: "/fr/creation-site-internet", text: "Création de site internet" },
      { href: "/fr/developpement-web-charente-maritime", text: "Développement web en Charente-Maritime" },
    ],
  },

  closingKicker: "Votre site mérite mieux que son âge.",
  closingHeadline: ["Refaisons", [{ outline: "votre site." }]],
  ctaButton: "Parler de votre refonte ↗︎",
};

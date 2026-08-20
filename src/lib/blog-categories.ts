import { locales, defaultLocale, hreflangByLocale, siteUrl, type Locale } from "@/lib/i18n/config";

/**
 * Blog categories mirror the studio's services, so each section on the blog
 * index can point at the matching service page. The per-article `category`
 * string in MDX frontmatter is free text and was inconsistent (it contained
 * both "Sitio web" and "Sitio Web", which read as two categories) — grouping
 * is driven by this table instead, never by that string.
 */
export const blogCategoryKeys = ["web", "mobile", "growth"] as const;
export type BlogCategoryKey = (typeof blogCategoryKeys)[number];

export const blogCategorySlugs: Record<BlogCategoryKey, Record<Locale, string>> = {
  web: { fr: "site-internet", es: "sitio-web", "es-ar": "sitio-web", en: "websites" },
  mobile: {
    fr: "application-mobile",
    es: "aplicacion-movil",
    "es-ar": "aplicacion-movil",
    en: "mobile-apps",
  },
  growth: {
    fr: "croissance-seo",
    es: "crecimiento-seo",
    "es-ar": "crecimiento-seo",
    en: "growth-seo",
  },
};

export const blogCategoryLabels: Record<BlogCategoryKey, Record<Locale, string>> = {
  web: { fr: "Site internet", es: "Sitio web", "es-ar": "Sitio web", en: "Websites" },
  mobile: {
    fr: "Application mobile",
    es: "Aplicación móvil",
    "es-ar": "Aplicación móvil",
    en: "Mobile Apps",
  },
  growth: {
    fr: "Croissance & SEO",
    es: "Crecimiento y SEO",
    "es-ar": "Crecimiento y SEO",
    en: "Growth & SEO",
  },
};

/** Short intro shown on each category page, per locale. */
export const blogCategoryIntros: Record<BlogCategoryKey, Record<Locale, string>> = {
  web: {
    fr: "Prix, refonte, standards, choix du prestataire : tout ce qu'il faut savoir avant de lancer ou refaire un site internet.",
    es: "Precios, rediseño, estándares, cómo elegir proveedor: todo lo que hay que saber antes de lanzar o rehacer un sitio web.",
    "es-ar": "Precios, rediseño, estándares, cómo elegir proveedor: todo lo que hay que saber antes de lanzar o rehacer un sitio web.",
    en: "Pricing, redesigns, standards, choosing a partner: what to know before building or rebuilding a website.",
  },
  mobile: {
    fr: "Budget, délais, technologies, no-code ou sur-mesure : nos repères pour lancer une application mobile.",
    es: "Presupuesto, plazos, tecnologías, no-code o a medida: nuestras referencias para lanzar una aplicación móvil.",
    "es-ar": "Presupuesto, plazos, tecnologías, no-code o a medida: nuestras referencias para lanzar una aplicación móvil.",
    en: "Budget, timelines, technology, no-code or custom: what you need to launch a mobile app.",
  },
  growth: {
    fr: "Référencement, contenu et acquisition : comment transformer votre site en source régulière de clients.",
    es: "Posicionamiento, contenido y captación: cómo convertir vuestro sitio en una fuente constante de clientes.",
    "es-ar": "Posicionamiento, contenido y captación: cómo convertir tu sitio en una fuente constante de clientes.",
    en: "SEO, content and acquisition: how to turn your website into a steady source of clients.",
  },
};

/**
 * Article slug -> category. Every slug across all four locales is listed here;
 * an article missing from this table simply won't appear in a category
 * section (and `getPostCategory` returns undefined), which is easy to spot.
 */
const CATEGORY_BY_SLUG: Record<string, BlogCategoryKey> = {
  // --- FR ---
  application_oxploria: "mobile",
  "application-sur-mesure-vs-no-code": "mobile",
  "creation-application-mobile-la-rochelle": "mobile",
  "combien-coute-site-vitrine-la-rochelle": "web",
  "freelance-developpeur-web-la-rochelle": "web",
  "pourquoi-site-premium-change-perception-marque": "web",
  "refonte-site-web-la-rochelle": "web",
  "site-vitrine-moderne-2026": "web",
  "Comment-avoir-plus-de-clients-internet-la-rochelle": "growth",
  "trouver-clients-la-rochelle-site-internet": "growth",
  // --- ES / ES-AR ---
  "no-code-vs-desarrollo-a-medida": "mobile",
  "crear-app-movil-barcelona": "mobile",
  "crear-app-movil-buenos-aires": "mobile",
  "como-elegir-estudio-diseno-web-barcelona": "web",
  "cuanto-cuesta-sitio-web-barcelona": "web",
  "cuanto-cuesta-sitio-web-buenos-aires": "web",
  "freelance-desarrollador-web-barcelona": "web",
  "freelance-desarrollador-web-buenos-aires": "web",
  "rediseno-web-barcelona": "web",
  "rediseno-web-buenos-aires": "web",
  "sitio-web-moderno-2026": "web",
  "web-premium-percepcion-de-marca": "web",
  "conseguir-clientes-online-barcelona": "growth",
  "conseguir-clientes-online-buenos-aires": "growth",
  // --- EN ---
  "no-code-vs-custom-development": "mobile",
  "mobile-app-cost-and-timeline": "mobile",
  "how-much-does-a-website-cost": "web",
  "freelance-web-developer-vs-agency": "web",
  "website-redesign-when-and-how": "web",
  "modern-website-standards-2026": "web",
  "premium-website-brand-perception": "web",
  "get-clients-online-with-your-website": "growth",
};

export function getPostCategory(slug: string): BlogCategoryKey | undefined {
  return CATEGORY_BY_SLUG[slug];
}

export function resolveCategorySlug(locale: Locale, slug: string): BlogCategoryKey | undefined {
  return blogCategoryKeys.find((key) => blogCategorySlugs[key][locale] === slug);
}

export function buildCategoryAlternates(key: BlogCategoryKey): Record<string, string> {
  const entries = locales.map(
    (locale) =>
      [hreflangByLocale[locale], `${siteUrl}/${locale}/blog/${blogCategorySlugs[key][locale]}`] as const,
  );
  return {
    ...Object.fromEntries(entries),
    "x-default": `${siteUrl}/${defaultLocale}/blog/${blogCategorySlugs[key][defaultLocale]}`,
  };
}

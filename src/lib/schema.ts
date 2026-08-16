import { hreflangByLocale, siteUrl, type Locale } from "@/lib/i18n/config";

/**
 * Stable identifiers for the two entities that exist once for the whole site.
 *
 * They deliberately do NOT include the locale: KLENT is one company and
 * klentcreative.com is one website, described in four languages. Minting a new
 * Organization per locale — which is what the previous per-page JSON-LD did —
 * tells Google there are four unrelated companies, and splits whatever entity
 * authority the brand accumulates across all of them.
 */
export const ORG_ID = `${siteUrl}/#organization`;
export const WEBSITE_ID = `${siteUrl}/#website`;
const LOGO_ID = `${siteUrl}/#logo`;

const EMAIL = "contact@klentcreative.com";
const SIRET = "10181386300012";

/**
 * Business phones, one per country. Each must match its Google Business
 * Profile character for character — a different format on the site than on
 * the listing is a NAP inconsistency, and phone is one of the strongest
 * local-ranking signals. Stored in E.164, formatted for humans in the UI.
 *
 * PHONE_FR is the company's main line: the business is a French sole trader,
 * so that is the number attached to the Organization itself.
 */
const PHONE_FR = "+33758747002";
const PHONE_ES = "+34615810330";

/**
 * Cities served, and the countries served remotely.
 *
 * Only places with a real working address get a branch node below
 * (`LOCATIONS`); everywhere else is `areaServed` only. Córdoba is in this list
 * but has no branch: a LocalBusiness node asserts premises at a postal
 * address, and claiming one there would be a fabricated location — it cannot
 * rank in a local pack without a verified Google Business Profile at that
 * address anyway, and Google actively penalises fake ones.
 */
const AREA: Record<Locale, { cities: string[]; countries: string[] }> = {
  fr: {
    cities: ["La Rochelle", "Barcelone", "Córdoba"],
    countries: ["France", "Espagne", "Argentine"],
  },
  es: {
    cities: ["La Rochelle", "Barcelona", "Córdoba"],
    countries: ["Francia", "España", "Argentina"],
  },
  "es-ar": {
    cities: ["La Rochelle", "Barcelona", "Córdoba"],
    countries: ["Francia", "España", "Argentina"],
  },
  en: {
    cities: ["La Rochelle", "Barcelona", "Córdoba"],
    countries: ["France", "Spain", "Argentina"],
  },
};

const CITY_COUNTRY_CODES = ["FR", "ES", "AR"];

/**
 * Real working addresses. Each one becomes a ProfessionalService branch
 * attached to the parent Organization — this is the pattern Google expects for
 * a multi-location business, and it is what lets a Google Business Profile
 * corroborate the site rather than contradict it.
 *
 * Addresses use each city's native spelling ("Barcelona", not "Barcelone") in
 * every locale, deliberately: `addressLocality` has to match the Business
 * Profile string exactly for NAP consistency, whereas `areaServed` above is
 * descriptive and is translated.
 *
 * streetAddress / postalCode / telephone / sameAs are optional and omitted
 * when unset. Fill them in ONLY with the values that the Google Business
 * Profile publishes — a schema address that disagrees with the verified
 * listing is worse than no address at all.
 */
type Branch = {
  id: string;
  /** Used in the branch name. Not necessarily published as an address. */
  locality: string;
  /**
   * City-level is the floor here; streetAddress and postalCode stay optional
   * on purpose. Both branches are worked from private homes, and a listing
   * run from home is registered with Google as a service-area business, which
   * hides the street on the public profile. Publishing a street here that the
   * profile hides would both break NAP consistency and expose a home address.
   * Omit the whole object only if a branch should state no place at all.
   */
  address?: {
    region?: string;
    /** ISO 3166-1 alpha-2. */
    country: string;
    streetAddress?: string;
    postalCode?: string;
  };
  telephone?: string;
  /** Google Business Profile / Maps URL, once the listing is verified. */
  sameAs?: string[];
  /** Index into AREA, for the cities and countries this branch covers. */
  serves: number[];
};

const LOCATIONS: Branch[] = [
  {
    // Registered address of the French sole trader (the SIRET above), already
    // published in the legal notice.
    id: "la-rochelle",
    locality: "La Rochelle",
    address: { region: "Nouvelle-Aquitaine", country: "FR" },
    telephone: PHONE_FR,
    serves: [0],
  },
  {
    // Worked from a private home, so the address stops at city level: no
    // street, no postcode. The city itself is not sensitive — a service-area
    // Business Profile publishes it anyway — and stating it ties the entity to
    // Barcelona instead of leaving the branch address-less.
    // `addressRegion` is the province, per Spanish postal convention
    // (Barcelona, Barcelona). Add the Business Profile URL to `sameAs` once
    // the listing is verified.
    id: "barcelona",
    locality: "Barcelona",
    address: { region: "Barcelona", country: "ES" },
    telephone: PHONE_ES,
    serves: [1],
  },
];

export type SchemaNode = Record<string, unknown>;

/**
 * Schema.org URL properties must be absolute. Project and article images are
 * stored as site-root paths ("/projects/…"), which a consumer fetching the
 * JSON-LD on its own has no way to resolve.
 */
export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${siteUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}

function branchNode(branch: Branch, locale: Locale, description: string): SchemaNode {
  const area = AREA[locale];

  return {
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#${branch.id}`,
    name: `Klent Creative — ${branch.locality}`,
    description,
    url: siteUrl,
    email: EMAIL,
    ...(branch.telephone ? { telephone: branch.telephone } : {}),
    parentOrganization: { "@id": ORG_ID },
    image: { "@id": LOGO_ID },
    ...(branch.address
      ? {
          address: {
            "@type": "PostalAddress",
            ...(branch.address.streetAddress
              ? { streetAddress: branch.address.streetAddress }
              : {}),
            addressLocality: branch.locality,
            ...(branch.address.region ? { addressRegion: branch.address.region } : {}),
            ...(branch.address.postalCode ? { postalCode: branch.address.postalCode } : {}),
            addressCountry: branch.address.country,
          },
        }
      : {}),
    areaServed: branch.serves.flatMap((i) => [
      { "@type": "City", name: area.cities[i] },
      { "@type": "Country", name: area.countries[i] },
    ]),
    knowsLanguage: ["fr", "es", "en"],
    ...(branch.sameAs ? { sameAs: branch.sameAs } : {}),
  };
}

/** One ProfessionalService per real address, all pointing at the Organization. */
export function locationNodes(locale: Locale, description: string): SchemaNode[] {
  return LOCATIONS.map((branch) => branchNode(branch, locale, description));
}

/**
 * The company itself — the brand entity that every page, article and branch
 * refers back to. Deliberately a plain Organization rather than a
 * ProfessionalService: the premises-level claims (a postal address you could
 * walk into) belong on the branch nodes, one per real office. Putting them
 * here too would assert a single location for a business that has two.
 */
export function organizationNode(
  locale: Locale,
  description: string,
  services: { title: string; desc: string; url: string }[],
): SchemaNode {
  const area = AREA[locale];

  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Klent Creative",
    alternateName: "KLENT",
    url: siteUrl,
    description,
    email: EMAIL,
    telephone: PHONE_FR,
    // French sole trader: the SIRET is the verifiable public registration.
    taxID: SIRET,
    logo: {
      "@type": "ImageObject",
      "@id": LOGO_ID,
      url: `${siteUrl}/brand/logo-square.png`,
      width: 512,
      height: 512,
      caption: "Klent Creative",
    },
    image: { "@id": LOGO_ID },
    // Registered address of the business (the SIRET). The Barcelona office is
    // a separate branch node, linked below via `location`.
    address: {
      "@type": "PostalAddress",
      addressLocality: "La Rochelle",
      addressRegion: "Nouvelle-Aquitaine",
      addressCountry: "FR",
    },
    location: LOCATIONS.map((branch) => ({ "@id": `${siteUrl}/#${branch.id}` })),
    areaServed: [
      ...area.cities.map((name, i) => ({
        "@type": "City",
        name,
        containedInPlace: { "@type": "Country", name: area.countries[i] },
        address: {
          "@type": "PostalAddress",
          addressLocality: name,
          addressCountry: CITY_COUNTRY_CODES[i],
        },
      })),
      ...area.countries.map((name) => ({ "@type": "Country", name })),
    ],
    knowsLanguage: ["fr", "es", "en"],
    // The expertise claim that would otherwise sit on a personal author node.
    // Stated on the company instead: articles are published under the studio's
    // name, so the studio is the entity whose competence has to be legible.
    knowsAbout: [
      "Création de site internet",
      "Développement web",
      "Next.js",
      "Développement d'application mobile",
      "Flutter",
      "Identité de marque",
      "Référencement naturel",
    ],
    sameAs: [
      "https://www.instagram.com/klentcreative/",
      "https://www.linkedin.com/company/klent-creative/",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.desc,
          url: service.url,
          provider: { "@id": ORG_ID },
          areaServed: [
            ...area.cities.map((name) => ({ "@type": "City", name })),
            ...area.countries.map((name) => ({ "@type": "Country", name })),
          ],
        },
      })),
    },
  };
}

export function websiteNode(locale: Locale): SchemaNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteUrl,
    name: "Klent Creative",
    publisher: { "@id": ORG_ID },
    inLanguage: hreflangByLocale[locale],
  };
}

/** Ties an individual page back to the site and the company. */
export function webPageNode({
  locale,
  url,
  name,
  description,
}: {
  locale: Locale;
  url: string;
  name: string;
  description: string;
}): SchemaNode {
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: hreflangByLocale[locale],
  };
}

/**
 * Breadcrumbs are one of the few structured-data types Google renders directly
 * in the result, replacing the raw URL with a readable trail.
 */
export function breadcrumbNode(url: string, trail: { name: string; url: string }[]): SchemaNode {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Wraps nodes into the single @graph that every page emits. */
export function graph(nodes: SchemaNode[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

import { siteUrl, type Locale } from "@/lib/i18n/config";
import { ORG_ID, type SchemaNode } from "@/lib/schema";

/**
 * The studio's editorial author.
 *
 * Every article is written by the same person, so the byline lives here rather
 * than in thirty-nine frontmatter blocks. An article can still override it —
 * see `author` in lib/blog.ts — which is what keeps the system open to a second
 * writer without a rewrite.
 *
 * The public name stays "Kevin". The full legal name belongs to the legal
 * notice and does not enter the structured data.
 */
export const AUTHOR_ID = `${siteUrl}/#kevin`;

/** Portrait already published under /public. No new asset is introduced. */
export const AUTHOR_PHOTO = "/photo-kevin-klentcreative.jpg";

type AuthorLabels = {
  /** Visible byline. */
  name: string;
  /** Role line under the name. */
  role: string;
  /** Portrait alt text — descriptive, not a keyword slot. */
  photoAlt: string;
  /** Small label introducing the block at the foot of an article. */
  eyebrow: string;
};

export const authorLabels: Record<Locale, AuthorLabels> = {
  fr: {
    name: "Kevin — Klent Creative",
    role: "Design & Développement",
    photoAlt: "Kevin de Klent Creative",
    eyebrow: "Écrit par",
  },
  es: {
    name: "Kevin — Klent Creative",
    role: "Diseño & Desarrollo",
    photoAlt: "Kevin de Klent Creative",
    eyebrow: "Escrito por",
  },
  "es-ar": {
    name: "Kevin — Klent Creative",
    role: "Diseño & Desarrollo",
    photoAlt: "Kevin de Klent Creative",
    eyebrow: "Escrito por",
  },
  en: {
    name: "Kevin — Klent Creative",
    role: "Design & Development",
    photoAlt: "Kevin from Klent Creative",
    eyebrow: "Written by",
  },
};

/**
 * The Person node, emitted once per article page.
 *
 * One stable @id across the four locales on purpose: four localised copies
 * would read as four different people to anything resolving the entity.
 * `jobTitle` stays in English for the same reason — it labels the entity, not
 * the page, while the visible role is translated in `authorLabels`.
 */
export function authorNode(): SchemaNode {
  return {
    "@type": "Person",
    "@id": AUTHOR_ID,
    name: "Kevin",
    jobTitle: "Design & Development",
    image: `${siteUrl}${AUTHOR_PHOTO}`,
    worksFor: { "@id": ORG_ID },
  };
}

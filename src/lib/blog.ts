import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { locales, defaultLocale, hreflangByLocale, siteUrl, type Locale } from "@/lib/i18n/config";
import type { ServiceKey } from "@/lib/services";
import { blogCategoryKeys, getPostCategory, type BlogCategoryKey } from "@/lib/blog-categories";
import { findTranslationGroup } from "@/lib/blog-translations";

export type PostFrontmatter = {
  /** Editorial headline. Renders as the page H1 and in listings. */
  title: string;
  /**
   * Optional shorter title for the <title> tag only. Editorial headlines run
   * 70-100 characters, which Google truncates around 60 — pushing the keyword
   * out of the visible part on the longer ones. When set, this keeps the
   * keyword in front while the H1 stays fully readable for humans.
   */
  metaTitle?: string;
  description: string;
  date: string; // ISO date, e.g. "2026-01-15"
  updated?: string;
  category?: string;
  /**
   * Entities the article is about, surfaced as schema.org `about`. Naming the
   * subject explicitly beats leaving a retrieval system to infer it from prose.
   */
  about?: string[];
  /** Search intents the piece answers. Emitted as schema.org `keywords`. */
  keywords?: string[];
  /**
   * Self-contained answer lines rendered above the article body. Each one must
   * make sense quoted on its own — see components/blog/KeyTakeaways.
   */
  takeaways?: string[];
  /**
   * Visible byline. Optional: the older articles carry none, and an absent
   * author is better than a fabricated one.
   *
   * It stays a display string. The Article schema keeps the Organization as
   * author on purpose, so the company remains the entity Google knows and no
   * personal name enters the structured data.
   */
  author?: string;
  authorRole?: string;
  /** Portrait sous /public. Absent, le bloc auteur reste en texte seul. */
  authorImage?: string;
  readTime?: number;
  image?: string;
  /**
   * Texte alternatif de l'image de tete.
   *
   * Optionnel a dessein : une photo purement decorative, dont le titre juste
   * au-dessus dit deja tout, se decrit mieux par un alt vide que par une
   * paraphrase du titre. Le renseigner des que l'image montre quelque chose
   * qu'un lecteur d'ecran ne peut pas deviner autrement.
   */
  imageAlt?: string;
  relatedService?: ServiceKey;
};

/**
 * The FR articles don't carry a `relatedService` field in their own
 * frontmatter (they predate the dedicated service pages), so the mapping
 * lives here instead of asking the source files to change. Add an entry
 * whenever a new article's internal-linking target is decided.
 */
const RELATED_SERVICE_BY_SLUG: Record<string, ServiceKey> = {
  application_oxploria: "mobile-app",
  "application-sur-mesure-vs-no-code": "mobile-app",
  "creation-application-mobile-la-rochelle": "mobile-app",
  "combien-coute-site-vitrine-la-rochelle": "web-design",
  "Comment-avoir-plus-de-clients-internet-la-rochelle": "web-design",
  "freelance-developpeur-web-la-rochelle": "web-design",
  "pourquoi-site-premium-change-perception-marque": "web-design",
  "refonte-site-web-la-rochelle": "web-design",
  "site-vitrine-moderne-2026": "web-design",
  "trouver-clients-la-rochelle-site-internet": "web-design",
  "sitio-web-moderno-2026": "web-design",
  "modern-website-standards-2026": "web-design",
  // ES / ES-AR / EN articles (market-adapted originals, not literal
  // translations — the La Rochelle pieces stay FR-only on purpose)
  "no-code-vs-desarrollo-a-medida": "mobile-app",
  "no-code-vs-custom-development": "mobile-app",
  "web-premium-percepcion-de-marca": "web-design",
  "premium-website-brand-perception": "web-design",
  "conseguir-clientes-online-barcelona": "web-design",
  "conseguir-clientes-online-buenos-aires": "web-design",
  "get-clients-online-with-your-website": "web-design",
  "crear-app-movil-barcelona": "mobile-app",
  "crear-app-movil-buenos-aires": "mobile-app",
  "mobile-app-cost-and-timeline": "mobile-app",
  "rediseno-web-barcelona": "web-design",
  "rediseno-web-buenos-aires": "web-design",
  "website-redesign-when-and-how": "web-design",
};

export type Post = {
  slug: string;
  content: string;
} & PostFrontmatter;

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

function localeDir(locale: Locale) {
  return path.join(BLOG_DIR, locale);
}

export function getPostSlugs(locale: Locale): string[] {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

export function getPostBySlug(locale: Locale, slug: string): Post | null {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return null;
  const mdxPath = path.join(dir, `${slug}.mdx`);
  const mdPath = path.join(dir, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;
  return {
    slug,
    content,
    ...frontmatter,
    relatedService: frontmatter.relatedService ?? RELATED_SERVICE_BY_SLUG[slug],
  };
}

export function getAllPosts(locale: Locale): Post[] {
  return getPostSlugs(locale)
    .map((slug) => getPostBySlug(locale, slug))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostsInCategory(locale: Locale, key: BlogCategoryKey): Post[] {
  return getAllPosts(locale).filter((post) => getPostCategory(post.slug) === key);
}

/**
 * Categories in display order, skipping any that have no article in this
 * locale — an empty section would render as a heading with an empty grid.
 */
export function getCategorizedPosts(locale: Locale): Array<{ key: BlogCategoryKey; posts: Post[] }> {
  return blogCategoryKeys
    .map((key) => ({ key, posts: getPostsInCategory(locale, key) }))
    .filter((group) => group.posts.length > 0);
}

function postExists(locale: Locale, slug: string): boolean {
  const dir = localeDir(locale);
  return fs.existsSync(path.join(dir, `${slug}.mdx`)) || fs.existsSync(path.join(dir, `${slug}.md`));
}

/**
 * hreflang alternates for an article.
 *
 * Two cases. Most articles exist in a single locale — the La Rochelle pieces
 * are French-only by design, since translating them would not serve a Spanish
 * or Argentine reader — and those declare only themselves.
 *
 * The rest are genuine translations whose slugs differ per language
 * ("site-vitrine-moderne-2026" and "modern-website-standards-2026" are one
 * article). Matching on the slug alone left each of them isolated, so Google
 * saw unrelated pages instead of one article in several languages. The
 * translation table supplies the mapping; the file check stays, so a stale
 * entry can never produce a hreflang pointing at a 404.
 */
export function buildPostAlternates(slug: string): Record<string, string> {
  const group = findTranslationGroup(slug);

  const entries = locales
    .map((locale) => [locale, group?.[locale] ?? slug] as const)
    .filter(([locale, target]) => postExists(locale, target));

  const alternates = Object.fromEntries(
    entries.map(([locale, target]) => [hreflangByLocale[locale], `${siteUrl}/${locale}/blog/${target}`]),
  );

  // x-default repond a la question "et pour tous les autres ?". Il pointe vers
  // defaultLocale, donc vers l'anglais, comme le x-default des pages
  // principales et comme la redirection de "/" dans next.config.ts. Les
  // entrees sont deja filtrees par postExists(), donc le repli sur la premiere
  // version disponible ne peut designer qu'un article reellement publie : un
  // article sans version anglaise garde un x-default valide dans sa langue.
  const premier = entries[0];
  if (premier) {
    const parDefaut = entries.find(([locale]) => locale === defaultLocale);
    const [locale, target] = parDefaut ?? premier;
    alternates["x-default"] = `${siteUrl}/${locale}/blog/${target}`;
  }

  return alternates;
}

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { locales, hreflangByLocale, siteUrl, type Locale } from "@/lib/i18n/config";
import type { ServiceKey } from "@/lib/services";

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string; // ISO date, e.g. "2026-01-15"
  updated?: string;
  category?: string;
  readTime?: number;
  image?: string;
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

function postExists(locale: Locale, slug: string): boolean {
  const dir = localeDir(locale);
  return fs.existsSync(path.join(dir, `${slug}.mdx`)) || fs.existsSync(path.join(dir, `${slug}.md`));
}

/**
 * Most articles only exist in one locale (the France-specific La Rochelle
 * pieces are FR-only by design — translating them wouldn't serve the ES/AR
 * audience). Only build hreflang alternates for locales where this exact
 * slug actually has a file, so we never point search engines at a 404.
 */
export function buildPostAlternates(slug: string): Record<string, string> {
  const available = locales.filter((locale) => postExists(locale, slug));
  return Object.fromEntries(
    available.map((locale) => [hreflangByLocale[locale], `${siteUrl}/${locale}/blog/${slug}`]),
  );
}

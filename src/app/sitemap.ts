import type { MetadataRoute } from "next";
import { locales, siteUrl, buildAlternates } from "@/lib/i18n/config";
import { serviceKeys, serviceSlugs, buildServiceAlternates } from "@/lib/services";
import { workListingSlug, projectSlugs, buildWorkListingAlternates, buildProjectAlternates } from "@/lib/projects";
import { legalSlug, buildLegalAlternates } from "@/lib/legal";
import { studioSlug, buildStudioAlternates } from "@/lib/studio";
import { getAllPosts, buildPostAlternates, getPostsInCategory } from "@/lib/blog";
import { blogCategoryKeys, blogCategorySlugs, buildCategoryAlternates } from "@/lib/blog-categories";

/**
 * Explicit revision dates for pages whose content lives in TypeScript files.
 *
 * These used to be `new Date()`, which told Google that every page on the site
 * had changed on the day of the build — so a redeploy that touched one CSS
 * file re-dated all 97 URLs. Google notices lastmod that never matches real
 * change and stops trusting the field, which costs you the one signal that
 * genuinely speeds up recrawls when you *do* publish something.
 *
 * Bump the relevant line when you actually edit that content.
 */
const REVISED = {
  home: "2026-08-15",
  contact: "2026-08-15",
  studio: "2026-08-15",
  legal: "2026-08-01",
  services: "2026-08-15",
  work: "2026-08-15",
  projects: "2026-08-15",
} as const;

/**
 * Newest article date in a set — used for the blog index and the category
 * listings, whose content really is "the articles they list", so their lastmod
 * can be derived truthfully instead of hardcoded.
 */
function newestPostDate(posts: { date: string; updated?: string }[]): string | undefined {
  const dates = posts.map((post) => post.updated || post.date).sort();
  return dates[dates.length - 1];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Home pages
  for (const locale of locales) {
    entries.push({
      url: `${siteUrl}/${locale}`,
      lastModified: REVISED.home,
      changeFrequency: "weekly",
      priority: locale === "fr" ? 1 : 0.8,
      alternates: { languages: buildAlternates("/") },
    });
  }

  // Contact pages
  for (const locale of locales) {
    entries.push({
      url: `${siteUrl}/${locale}/contact`,
      lastModified: REVISED.contact,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages: buildAlternates("/contact") },
    });
  }

  // Legal notice, one entry per locale (French law still applies everywhere —
  // only the wording is translated, see src/content/legal)
  {
    const alternates = buildLegalAlternates();
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}/${legalSlug[locale]}`,
        lastModified: REVISED.legal,
        changeFrequency: "yearly",
        priority: 0.2,
        alternates: { languages: alternates },
      });
    }
  }

  // Studio / about page
  {
    const alternates = buildStudioAlternates();
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}/${studioSlug[locale]}`,
        lastModified: REVISED.studio,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: alternates },
      });
    }
  }

  // Blog listing pages
  for (const locale of locales) {
    entries.push({
      url: `${siteUrl}/${locale}/blog`,
      lastModified: newestPostDate(getAllPosts(locale)) ?? REVISED.home,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: { languages: buildAlternates("/blog") },
    });
  }

  // Service pages (one entry per locale, each with its own slug)
  for (const key of serviceKeys) {
    const alternates = buildServiceAlternates(key);
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}/${serviceSlugs[key][locale]}`,
        lastModified: REVISED.services,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: alternates },
      });
    }
  }

  // Work listing pages
  {
    const alternates = buildWorkListingAlternates();
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}/${workListingSlug[locale]}`,
        lastModified: REVISED.work,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: alternates },
      });
    }
  }

  // Project detail pages
  for (const slug of projectSlugs) {
    const alternates = buildProjectAlternates(slug);
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}/${workListingSlug[locale]}/${slug}`,
        lastModified: REVISED.projects,
        changeFrequency: "yearly",
        priority: 0.5,
        alternates: { languages: alternates },
      });
    }
  }

  // Blog category listings — only where the locale actually has articles in
  // that category, so we never publish an empty listing page.
  for (const key of blogCategoryKeys) {
    const alternates = buildCategoryAlternates(key);
    for (const locale of locales) {
      const categoryPosts = getPostsInCategory(locale, key);
      if (categoryPosts.length === 0) continue;
      entries.push({
        url: `${siteUrl}/${locale}/blog/${blogCategorySlugs[key][locale]}`,
        lastModified: newestPostDate(categoryPosts) ?? REVISED.home,
        changeFrequency: "weekly",
        priority: 0.5,
        alternates: { languages: alternates },
      });
    }
  }

  // Blog articles. Most are FR-only (untranslated on purpose — see
  // buildPostAlternates); a few, like the Oxploria piece, exist in several
  // locales and get proper hreflang alternates between those versions.
  for (const locale of locales) {
    for (const post of getAllPosts(locale)) {
      const alternates = buildPostAlternates(post.slug);
      entries.push({
        url: `${siteUrl}/${locale}/blog/${post.slug}`,
        lastModified: post.updated || post.date,
        changeFrequency: "monthly",
        priority: 0.6,
        ...(Object.keys(alternates).length > 1 ? { alternates: { languages: alternates } } : {}),
      });
    }
  }

  return entries;
}

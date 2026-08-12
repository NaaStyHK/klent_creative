import type { MetadataRoute } from "next";
import { locales, siteUrl, buildAlternates } from "@/lib/i18n/config";
import { serviceKeys, serviceSlugs, buildServiceAlternates } from "@/lib/services";
import { workListingSlug, projectSlugs, buildWorkListingAlternates, buildProjectAlternates } from "@/lib/projects";
import { getAllPosts, buildPostAlternates } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Home pages
  for (const locale of locales) {
    entries.push({
      url: `${siteUrl}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: locale === "fr" ? 1 : 0.8,
      alternates: { languages: buildAlternates("/") },
    });
  }

  // Contact pages
  for (const locale of locales) {
    entries.push({
      url: `${siteUrl}/${locale}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages: buildAlternates("/contact") },
    });
  }

  // French legal notice (the legal document is intentionally published in French only)
  entries.push({
    url: `${siteUrl}/fr/mentions-legales`,
    lastModified: "2026-08-01",
    changeFrequency: "yearly",
    priority: 0.2,
  });

  // Blog listing pages
  for (const locale of locales) {
    entries.push({
      url: `${siteUrl}/${locale}/blog`,
      lastModified: now,
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
        lastModified: now,
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
        lastModified: now,
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
        lastModified: now,
        changeFrequency: "yearly",
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

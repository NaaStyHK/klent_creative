import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { locales, isLocale, siteUrl, hreflangByLocale, type Locale } from "@/lib/i18n/config";
import { buildSocial } from "@/lib/seo";
import { ORG_ID, absoluteUrl, breadcrumbNode, graph, webPageNode, BRAND } from "@/lib/schema";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getPostBySlug, getPostSlugs, buildPostAlternates, getPostsInCategory } from "@/lib/blog";
import { getPostCategory } from "@/lib/blog-categories";
import {
  blogCategoryKeys,
  blogCategorySlugs,
  blogCategoryLabels,
  blogCategoryIntros,
  resolveCategorySlug,
  buildCategoryAlternates,
} from "@/lib/blog-categories";
import { serviceKeys, serviceSlugs } from "@/lib/services";
import BlogCategoryPage from "@/components/blog/BlogCategoryPage";
import PageJsonLd from "@/components/seo/PageJsonLd";
import ReadingProgress from "@/components/blog/ReadingProgress";
import KeyTakeaways from "@/components/blog/KeyTakeaways";

export function generateStaticParams() {
  // Category listings live at the same depth as articles (/blog/<slug>), so
  // they are generated from this route too. Category slugs are checked before
  // article slugs below; none of them collide with an existing article.
  const articleParams = locales.flatMap((locale) =>
    getPostSlugs(locale).map((slug) => ({ locale, slug })),
  );
  const categoryParams = locales.flatMap((locale) =>
    blogCategoryKeys.map((key) => ({ locale, slug: blogCategorySlugs[key][locale] })),
  );
  return [...articleParams, ...categoryParams];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const categoryKey = resolveCategorySlug(locale, slug);
  if (categoryKey) {
    const dict = getDictionary(locale);
    const label = blogCategoryLabels[categoryKey][locale];
    return {
      title: `${label} — ${dict.blog.categoryMetaSuffix} | Klent Creative`,
      description: blogCategoryIntros[categoryKey][locale],
      alternates: {
        canonical: `${siteUrl}/${locale}/blog/${slug}`,
        languages: buildCategoryAlternates(categoryKey),
      },
      ...buildSocial({
        locale,
        title: `${label} — ${dict.blog.categoryMetaSuffix}`,
        description: blogCategoryIntros[categoryKey][locale],
        url: `${siteUrl}/${locale}/blog/${slug}`,
      }),
    };
  }

  const post = getPostBySlug(locale, slug);
  if (!post) return {};

  return {
    // No "— KLENT" suffix: it costs 8 characters of an already tight budget,
    // and Google derives the site name itself from the WebSite schema.
    title: post.metaTitle ?? post.title,
    description: post.description,
    alternates: {
      canonical: `${siteUrl}/${locale}/blog/${slug}`,
      // Most articles only exist in FR; this only lists hreflang entries
      // for locales where the same slug actually has a file, so we never
      // point search engines at a 404.
      languages: buildPostAlternates(slug),
    },
    ...buildSocial({
      locale,
      title: post.title,
      description: post.description,
      url: `${siteUrl}/${locale}/blog/${slug}`,
      image: post.image,
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
    }),
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const categoryKey = resolveCategorySlug(locale, slug);
  if (categoryKey) {
    const categoryDict = getDictionary(locale);
    return (
      <>
        <PageJsonLd
          locale={locale}
          url={`${siteUrl}/${locale}/blog/${slug}`}
          name={blogCategoryLabels[categoryKey][locale]}
          description={blogCategoryIntros[categoryKey][locale]}
          trail={[{ name: categoryDict.blog.eyebrow, url: `${siteUrl}/${locale}/blog` }]}
        />
        <BlogCategoryPage
          locale={locale}
          dict={categoryDict}
          categoryKey={categoryKey}
          posts={getPostsInCategory(locale, categoryKey)}
        />
      </>
    );
  }

  const post = getPostBySlug(locale, slug);
  if (!post) notFound();
  const dict = getDictionary(locale);
  const relatedHref = post.relatedService ? `/${locale}/${serviceSlugs[post.relatedService][locale]}` : null;
  // dict.services.items suit l'ordre de serviceKeys : on y prend le nom court
  // ("Création de site internet") au lieu du H1 de la page, qui est une
  // accroche et se lit mal comme libelle de lien.
  const serviceIndex = post.relatedService ? serviceKeys.indexOf(post.relatedService) : -1;
  const serviceLabel = serviceIndex >= 0 ? dict.services.items[serviceIndex].title : null;

  const articleCategory = getPostCategory(post.slug);
  const articleUrl = `${siteUrl}/${locale}/blog/${slug}`;
  const jsonLd = graph([
    webPageNode({
      locale: locale as Locale,
      url: articleUrl,
      name: post.title,
      description: post.description,
    }),
    breadcrumbNode(articleUrl, [
      { name: BRAND, url: `${siteUrl}/${locale}` },
      { name: dict.blog.eyebrow, url: `${siteUrl}/${locale}/blog` },
      { name: post.title, url: articleUrl },
    ]),
    {
      "@type": "Article",
      "@id": `${articleUrl}#article`,
      // Google truncates headline at 110 characters and warns beyond it.
      headline: post.title.slice(0, 110),
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated || post.date,
      // Signed by the studio, not by an individual: the founder's name is
      // deliberately confined to the legal notice. Google accepts an
      // Organization as author, and the expertise signal lives on that node
      // via knowsAbout rather than on a personal one.
      author: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
      mainEntityOfPage: { "@id": `${articleUrl}#webpage` },
      ...(post.image ? { image: absoluteUrl(post.image) } : {}),
      // `about` names the subject as an entity instead of leaving a retrieval
      // system to infer it from prose; `articleSection` and `wordCount` help
      // it judge scope and depth before deciding whether to quote the page.
      ...(articleCategory
        ? { articleSection: blogCategoryLabels[articleCategory][locale] }
        : {}),
      ...(post.about?.length ? { about: post.about.map((name) => ({ "@type": "Thing", name })) } : {}),
      ...(post.keywords?.length ? { keywords: post.keywords.join(", ") } : {}),
      wordCount: post.content.trim().split(/\s+/).length,
      isAccessibleForFree: true,
      inLanguage: hreflangByLocale[locale as Locale],
    },
  ]);

  return (
    <article className="blog-article">
      <ReadingProgress locale={locale} targetId="article-reading-content" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link className="blog-back mono hoverable" href={`/${locale}/blog`}>
        {dict.blog.backToBlog}
      </Link>
      <span className="mono blog-date">
        {post.date}
        {post.category ? ` · ${post.category}` : ""}
        {post.readTime ? ` · ${post.readTime} ${dict.blog.minRead}` : ""}
      </span>
      <h1 className="headline">{post.title}</h1>
      {post.image && (
        <div className="blog-hero-image">
          <Image src={post.image} alt="" fill sizes="(max-width: 850px) 100vw, 820px" priority />
        </div>
      )}
      {post.takeaways?.length ? (
        <KeyTakeaways items={post.takeaways} locale={locale} />
      ) : null}
      <div className="blog-body" id="article-reading-content">
        <MDXRemote source={post.content} />
      </div>
      {/* Closing invitation. What stood here was a "Related service" label
          pointing at the service page's H1: navigation dressed as a
          conclusion, with no way to reach the contact form. The reader has
          just finished the article, which is the moment they are most likely
          to act, so the primary action is now getting in touch and the service
          page becomes the secondary path. */}
      <aside className="blog-cta">
        <div className="blog-cta-eyebrow mono">{dict.blog.cta.eyebrow}</div>
        <p className="blog-cta-title">{dict.blog.cta.title}</p>
        <div className="blog-cta-actions">
          <Link className="blog-cta-button" href={`/${locale}/contact`}>
            {dict.blog.cta.button}
          </Link>
          {serviceLabel && relatedHref && (
            <Link className="blog-cta-secondary mono hoverable" href={relatedHref}>
              {dict.blog.cta.serviceIntro} {serviceLabel} ↗︎
            </Link>
          )}
        </div>
      </aside>
    </article>
  );
}

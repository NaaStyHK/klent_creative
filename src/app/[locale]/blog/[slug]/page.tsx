import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { locales, isLocale, siteUrl, hreflangByLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getPostBySlug, getPostSlugs, buildPostAlternates } from "@/lib/blog";
import { serviceSlugs } from "@/lib/services";
import { getServiceContent } from "@/content/services";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPostSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = getPostBySlug(locale, slug);
  if (!post) return {};

  return {
    title: `${post.title} — KLENT`,
    description: post.description,
    alternates: {
      canonical: `${siteUrl}/${locale}/blog/${slug}`,
      // Most articles only exist in FR; this only lists hreflang entries
      // for locales where the same slug actually has a file, so we never
      // point search engines at a 404.
      languages: buildPostAlternates(slug),
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteUrl}/${locale}/blog/${slug}`,
      siteName: "KLENT",
      locale: hreflangByLocale[locale].replace("-", "_"),
      type: "article",
      publishedTime: post.date,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const post = getPostBySlug(locale, slug);
  if (!post) notFound();
  const dict = getDictionary(locale);
  const related = post.relatedService ? getServiceContent(post.relatedService, locale) : null;
  const relatedHref = post.relatedService ? `/${locale}/${serviceSlugs[post.relatedService][locale]}` : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { "@type": "Organization", name: "KLENT" },
    image: post.image,
    inLanguage: hreflangByLocale[locale as Locale],
  };

  return (
    <article className="blog-article">
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
      <div className="blog-body">
        <MDXRemote source={post.content} />
      </div>
      {related && relatedHref && (
        <div className="blog-related">
          <div className="mono">{dict.blog.relatedServiceIntro}</div>
          <Link className="hoverable" href={relatedHref}>
            {related.h1} ↗︎
          </Link>
        </div>
      )}
    </article>
  );
}


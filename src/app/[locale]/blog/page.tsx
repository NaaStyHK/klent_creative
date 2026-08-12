import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, buildAlternates, siteUrl, hreflangByLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getAllPosts } from "@/lib/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.blog.metaTitle,
    description: dict.blog.metaDescription,
    alternates: {
      canonical: `${siteUrl}/${locale}/blog`,
      languages: buildAlternates("/blog"),
    },
    openGraph: {
      title: dict.blog.metaTitle,
      description: dict.blog.metaDescription,
      url: `${siteUrl}/${locale}/blog`,
      siteName: "KLENT",
      locale: hreflangByLocale[locale].replace("-", "_"),
      type: "website",
    },
  };
}

export default async function BlogListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const posts = getAllPosts(locale as Locale);

  return (
    <>
      <section className="service-page-hero">
        <div className="eyebrow mono">{dict.blog.eyebrow}</div>
        <h1 className="headline">{dict.blog.h1}</h1>
        <p className="service-page-intro reveal-up">{dict.blog.intro}</p>
      </section>

      <section className="blog-list reveal-up">
        {posts.length === 0 ? (
          <p className="blog-empty">{dict.blog.empty}</p>
        ) : (
          posts.map((post) => (
            <Link className="blog-card hoverable" href={`/${locale}/blog/${post.slug}`} key={post.slug}>
              {post.image && (
                <div className="blog-card-image">
                  <Image src={post.image} alt="" fill sizes="220px" />
                </div>
              )}
              <div className="blog-card-body">
                <span className="mono blog-date">
                  {post.date}
                  {post.category ? ` · ${post.category}` : ""}
                  {post.readTime ? ` · ${post.readTime} ${dict.blog.minRead}` : ""}
                </span>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
              </div>
            </Link>
          ))
        )}
      </section>
    </>
  );
}

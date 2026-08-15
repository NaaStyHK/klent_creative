import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, buildAlternates, siteUrl, type Locale } from "@/lib/i18n/config";
import { buildSocial } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getAllPosts, getCategorizedPosts } from "@/lib/blog";
import { blogCategoryLabels, blogCategorySlugs } from "@/lib/blog-categories";
import BlogFeatured from "@/components/blog/BlogFeatured";
import BlogListItem from "@/components/blog/BlogListItem";
import PageJsonLd from "@/components/seo/PageJsonLd";

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
    ...buildSocial({
      locale,
      title: dict.blog.metaTitle,
      description: dict.blog.metaDescription,
      url: `${siteUrl}/${locale}/blog`,
    }),
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);

  const allPosts = getAllPosts(typedLocale);
  // Most recent article overall gets the featured slot, and is then removed
  // from its category list so it never appears twice on the same page.
  const featured = allPosts[0];
  const groups = getCategorizedPosts(typedLocale)
    .map((group) => ({ ...group, posts: group.posts.filter((p) => p.slug !== featured?.slug) }))
    .filter((group) => group.posts.length > 0);

  return (
    <>
      <PageJsonLd
        locale={typedLocale}
        url={`${siteUrl}/${typedLocale}/blog`}
        name={dict.blog.h1}
        description={dict.blog.metaDescription}
      />
      <section className="service-page-hero service-page-hero--narrow">
        <div className="eyebrow mono">{dict.blog.eyebrow}</div>
        <h1 className="headline">{dict.blog.h1}</h1>
        <p className="service-page-intro reveal-up">{dict.blog.intro}</p>
      </section>

      {!featured ? (
        <section className="blog-list">
          <p className="blog-empty">{dict.blog.empty}</p>
        </section>
      ) : (
        <>
          <section className="blog-featured-block reveal-up">
            <BlogFeatured post={featured} locale={typedLocale} />
          </section>

          {groups.map((group) => (
            <section className="blog-category-block" key={group.key}>
              <header className="blog-category-head reveal-up">
                <h2 className="blog-category-title">{blogCategoryLabels[group.key][typedLocale]}</h2>
                <Link
                  className="blog-category-all mono hoverable"
                  href={`/${locale}/blog/${blogCategorySlugs[group.key][typedLocale]}`}
                >
                  {dict.blog.allArticles}
                </Link>
              </header>
              <div className="blog-rows reveal-up">
                {group.posts.map((post) => (
                  <BlogListItem post={post} locale={typedLocale} key={post.slug} />
                ))}
              </div>
            </section>
          ))}
        </>
      )}
    </>
  );
}

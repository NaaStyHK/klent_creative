import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Post } from "@/lib/blog";
import { blogCategoryIntros, blogCategoryLabels, type BlogCategoryKey } from "@/lib/blog-categories";
import BlogFeatured from "@/components/blog/BlogFeatured";
import BlogListItem from "@/components/blog/BlogListItem";

export default function BlogCategoryPage({
  locale,
  dict,
  categoryKey,
  posts,
}: {
  locale: Locale;
  dict: Dictionary;
  categoryKey: BlogCategoryKey;
  posts: Post[];
}) {
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="service-page-hero service-page-hero--narrow">
        <Link className="blog-back mono hoverable" href={`/${locale}/blog`}>
          {dict.blog.backToBlogIndex}
        </Link>
        <div className="eyebrow mono">{dict.blog.eyebrow}</div>
        <h1 className="headline">{blogCategoryLabels[categoryKey][locale]}</h1>
        <p className="service-page-intro reveal-up">{blogCategoryIntros[categoryKey][locale]}</p>
      </section>

      {featured && (
        <section className="blog-featured-block reveal-up">
          <BlogFeatured post={featured} locale={locale} />
        </section>
      )}

      {rest.length > 0 && (
        <section className="blog-category-block">
          <div className="blog-rows reveal-up">
            {rest.map((post) => (
              <BlogListItem post={post} locale={locale} key={post.slug} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

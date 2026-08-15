import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Post } from "@/lib/blog";
import { blogCategoryLabels, getPostCategory } from "@/lib/blog-categories";
import { formatPostDate } from "@/lib/format-date";

export default function BlogFeatured({ post, locale }: { post: Post; locale: Locale }) {
  const categoryKey = getPostCategory(post.slug);

  return (
    <Link className="blog-featured hoverable" href={`/${locale}/blog/${post.slug}`}>
      <div className="blog-featured-media">
        {post.image ? (
          <Image src={post.image} alt="" fill sizes="(max-width: 850px) 100vw, 45vw" priority />
        ) : null}
      </div>
      <div className="blog-featured-body">
        <h2 className="blog-featured-title">{post.title}</h2>
        <div className="blog-featured-meta">
          <span className="blog-chip mono">{formatPostDate(post.date)}</span>
          {categoryKey && (
            <span className="blog-chip mono">{blogCategoryLabels[categoryKey][locale]}</span>
          )}
          <span className="blog-chip blog-chip--plus mono" aria-hidden="true">
            +
          </span>
        </div>
      </div>
    </Link>
  );
}

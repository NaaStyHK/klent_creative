import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Post } from "@/lib/blog";
import { blogCategoryLabels, getPostCategory } from "@/lib/blog-categories";
import { formatPostDate } from "@/lib/format-date";

/** Compact row: title and badges on the left, small thumbnail on the right. */
export default function BlogListItem({ post, locale }: { post: Post; locale: Locale }) {
  const categoryKey = getPostCategory(post.slug);

  return (
    <Link className="blog-row hoverable" href={`/${locale}/blog/${post.slug}`}>
      <div className="blog-row-body">
        <h3 className="blog-row-title">{post.title}</h3>
        <div className="blog-row-meta">
          {categoryKey && (
            <span className="blog-chip mono">{blogCategoryLabels[categoryKey][locale]}</span>
          )}
          <span className="blog-chip mono">{formatPostDate(post.date)}</span>
        </div>
      </div>
      <div className="blog-row-thumb">
        {post.image ? <Image src={post.image} alt="" fill sizes="200px" /> : null}
      </div>
    </Link>
  );
}

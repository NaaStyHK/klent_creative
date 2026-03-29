import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { getPost, getAllPosts, formatDate } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateStaticParams() {
  const locales: Locale[] = ["fr", "es"];
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const posts = getAllPosts(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);
  if (!post) return {};
  return {
    title: `${post.title} — Klent Creative`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale);
  const post = getPost(locale, slug);

  if (!post) notFound();

  const isEs = locale === "es";
  const switchLocale = isEs ? "fr" : "es";
  const switchPost = getPost(switchLocale, slug);
  const switchHref = switchPost
    ? `/${switchLocale}/blog/${slug}`
    : `/${switchLocale}/blog`;

  return (
    <>
      <Navbar locale={locale} dict={dict.navbar} switchHref={switchHref} />
      <main className="article-main">

        {/* Breadcrumb */}
        <div className="article-breadcrumb-wrap">
          <div className="blog-container">
            <nav className="article-breadcrumb">
              <Link href={`/${locale}`} className="article-breadcrumb-link">
                {isEs ? "Inicio" : "Accueil"}
              </Link>
              <span className="article-breadcrumb-sep">›</span>
              <Link href={`/${locale}/blog`} className="article-breadcrumb-link">
                Blog
              </Link>
              <span className="article-breadcrumb-sep">›</span>
              <span className="article-breadcrumb-current">{post.title}</span>
            </nav>
          </div>
        </div>

        {/* Article header */}
        <header className="article-header">
          <div className="article-container">
            <div className="article-meta-top">
              <span className="blog-tag">{post.category}</span>
              <span className="blog-read-time">{post.readTime} min</span>
            </div>
            <h1 className="article-title">{post.title}</h1>
            <p className="article-description">{post.description}</p>
            <div className="article-meta-bottom">
              <span className="blog-date">{formatDate(post.date, locale)}</span>
            </div>
          </div>
          {post.image && (
            <div className="article-hero-img-wrap">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="article-hero-img"
                priority
                sizes="(max-width: 760px) 100vw, 760px"
              />
              <div className="article-hero-img-overlay" />
            </div>
          )}
        </header>

        {/* Article content */}
        <div className="article-body-wrap">
          <div className="article-container">
            <article className="article-body">
              <MDXRemote source={post.content} />
            </article>

            {/* Author card */}
            <aside className="article-author">
              <div className="article-author-avatar">K</div>
              <div className="article-author-info">
                <span className="article-author-name">Klent Creative</span>
                <span className="article-author-role">
                  {isEs ? "Estudio freelance premium" : "Studio freelance premium"}
                </span>
              </div>
            </aside>
          </div>
        </div>

        {/* CTA section */}
        <section className="article-cta">
          <div className="article-container">
            <div className="article-cta-inner">
              <span className="blog-kicker">
                {isEs ? "¿Interesado?" : "Intéressé ?"}
              </span>
              <h2 className="article-cta-title">
                {isEs
                  ? "Transformons votre présence digitale"
                  : "Transformons votre présence digitale"}
              </h2>
              <p className="article-cta-desc">
                {isEs
                  ? "Sites web premium, applications sur mesure — parlons de votre projet."
                  : "Sites web premium, applications sur mesure — parlons de votre projet."}
              </p>
              <div className="article-cta-actions">
                <Link href={`/${locale}#contact`} className="btn btn-primary">
                  {isEs ? "Discutir el proyecto" : "Discuter du projet"}
                </Link>
                <Link href={`/${locale}/blog`} className="btn btn-secondary">
                  {isEs ? "← Otros artículos" : "← Autres articles"}
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  );
}

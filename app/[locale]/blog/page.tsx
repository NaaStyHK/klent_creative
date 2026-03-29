import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { getAllPosts, formatDate } from "@/lib/blog";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";
  return {
    title: isEs ? "Blog — Klent Creative" : "Blog — Klent Creative",
    description: isEs
      ? "Artículos sobre diseño web, desarrollo premium y estrategia digital."
      : "Articles sur le design web, le développement premium et la stratégie digitale.",
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const posts = getAllPosts(locale);
  const isEs = locale === "es";

  return (
    <>
      <Navbar locale={locale} dict={dict.navbar} />
      <main className="blog-main">

        {/* Hero */}
        <section className="blog-hero">
          <div className="blog-container">
            <span className="blog-kicker">
              {isEs ? "Recursos" : "Ressources"}
            </span>
            <h1 className="blog-hero-title">
              {isEs ? "Blog & " : "Blog & "}
              <span className="blog-hero-accent">
                {isEs ? "Conseils" : "Conseils"}
              </span>
            </h1>
            <p className="blog-hero-desc">
              {isEs
                ? "Diseño web, desarrollo premium, estrategia digital — artículos para ayudarte a tomar las mejores decisiones."
                : "Design web, développement premium, stratégie digitale — des articles pour vous aider à prendre les meilleures décisions."}
            </p>
          </div>
        </section>

        {/* Articles grid */}
        <section className="blog-grid-section">
          <div className="blog-container">
            {posts.length === 0 ? (
              <p className="blog-empty">
                {isEs ? "Próximamente..." : "Bientôt disponible..."}
              </p>
            ) : (
              <div className="blog-grid">
                {posts.map((post, i) => (
                  <Link
                    key={post.slug}
                    href={`/${locale}/blog/${post.slug}`}
                    className={`blog-card${i === 0 ? " blog-card--featured" : ""}`}
                  >
                    {post.image && (
                      <div className="blog-card-img-wrap">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="blog-card-img"
                          sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 33vw"
                        />
                        <div className="blog-card-img-overlay" />
                      </div>
                    )}
                    <div className="blog-card-inner">
                      <div className="blog-card-top">
                        <span className="blog-tag">{post.category}</span>
                        <span className="blog-read-time">
                          {post.readTime} min
                        </span>
                      </div>
                      <h2 className="blog-card-title">{post.title}</h2>
                      <p className="blog-card-desc">{post.description}</p>
                      <div className="blog-card-footer">
                        <span className="blog-date">
                          {formatDate(post.date, locale)}
                        </span>
                        <span className="blog-card-cta">
                          {isEs ? "Leer →" : "Lire →"}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA banner */}
        <section className="blog-cta-banner">
          <div className="blog-container">
            <div className="blog-cta-inner">
              <div className="blog-cta-text">
                <h2 className="blog-cta-title">
                  {isEs
                    ? "¿Listo para lanzar tu proyecto?"
                    : "Prêt à lancer votre projet ?"}
                </h2>
                <p className="blog-cta-desc">
                  {isEs
                    ? "Diseño web premium, aplicaciones a medida — hablemos."
                    : "Design web premium, applications sur mesure — parlons-en."}
                </p>
              </div>
              <Link href={`/${locale}#contact`} className="btn btn-primary">
                {isEs ? "Discutir el proyecto" : "Discuter du projet"}
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  );
}

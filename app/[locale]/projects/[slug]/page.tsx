import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { getDictionary, Locale } from "@/lib/dictionaries";
import Image from "next/image";

type Props = {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
};

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale);

  const allProjects = [dict.projects.featured, ...dict.projects.items];
  const project = allProjects.find((p) => p.slug === slug);

  return (
    <>
      <Navbar locale={locale} dict={dict.navbar} />
      <main style={{ minHeight: "100vh", padding: "120px 24px 80px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          {project ? (
            <>
              <p style={{ color: "var(--accent)", marginBottom: "12px", fontSize: "0.92rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {project.category}
              </p>
              <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "24px", color: "var(--text)" }}>
                {project.name}
              </h1>
              <p style={{ color: "var(--text-soft)", fontSize: "1.08rem", lineHeight: 1.7, marginBottom: "40px", maxWidth: "640px" }}>
                {project.description}
              </p>
              {project.image && (
                <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: "var(--r-lg)", overflow: "hidden", border: "1px solid var(--border)" }}>
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
              {project.comingSoon && (
                <div style={{ marginTop: "48px", padding: "24px 28px", borderRadius: "var(--r-md)", border: "1px solid var(--border-accent)", background: "var(--accent-glow)", display: "flex", alignItems: "center", gap: "14px" }}>
                  <span style={{ fontSize: "1.5rem" }}>🚧</span>
                  <p style={{ color: "var(--accent)", fontWeight: 600 }}>
                    {dict.projects.comingSoonLabel} — La page détaillée de ce projet arrive bientôt.
                  </p>
                </div>
              )}
              <div style={{ marginTop: "40px" }}>
                <a href={`/${locale}#contact`} className="btn btn-primary">
                  {dict.contact.eyebrow} →
                </a>
              </div>
            </>
          ) : (
            <>
              <p style={{ color: "var(--accent)", marginBottom: "16px" }}>404</p>
              <h1 style={{ fontSize: "3rem", marginBottom: "20px", color: "var(--text)" }}>
                Projet introuvable
              </h1>
              <p style={{ color: "var(--text-soft)", fontSize: "1.1rem", lineHeight: 1.7 }}>
                Ce projet n'existe pas ou a été déplacé.
              </p>
              <div style={{ marginTop: "32px" }}>
                <a href={`/${locale}#projects`} className="btn btn-primary">
                  ← Voir tous les projets
                </a>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  );
}

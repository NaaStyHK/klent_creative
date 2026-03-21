import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { getDictionary, Locale } from "@/lib/dictionaries";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

type LegalRow = { label: string; value: string; isEmail?: boolean };
type LegalSection = {
  title: string;
  rows?: LegalRow[];
  paragraphs?: string[];
  note?: string;
};

export default async function LegalPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const legal = dict.legal as { eyebrow: string; title: string; subtitle: string; sections: LegalSection[] };

  return (
    <>
      <Navbar locale={locale} dict={dict.navbar} />

      <main style={{ paddingTop: "120px", paddingBottom: "80px", minHeight: "100vh" }}>
        <div className="site-container" style={{ maxWidth: "760px" }}>

          {/* Header */}
          <div style={{ marginBottom: "56px" }}>
            <p style={{
              fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em",
              textTransform: "uppercase", color: "var(--accent)", marginBottom: "16px"
            }}>
              {legal.eyebrow}
            </p>
            <h1 style={{
              fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800,
              color: "var(--text)", lineHeight: 1.1, marginBottom: "20px"
            }}>
              {legal.title}
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7 }}>
              {legal.subtitle}
            </p>
          </div>

          {/* Sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {legal.sections.map((section, i) => (
              <div key={i} className="legal-block">
                <h2 className="legal-block-title">{section.title}</h2>
                <div className="legal-block-content">
                  {section.rows?.map((row, j) => (
                    <div key={j} className="legal-row">
                      <span className="legal-label">{row.label}</span>
                      {row.isEmail ? (
                        <a href={`mailto:${row.value}`} style={{ color: "var(--accent)" }}>{row.value}</a>
                      ) : (
                        <span>{row.value}</span>
                      )}
                    </div>
                  ))}
                  {section.paragraphs?.map((p, j) => (
                    <p key={j} className="legal-text">{p}</p>
                  ))}
                  {section.note && (
                    <p className="legal-text" style={{ marginTop: "12px", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                      {section.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer locale={locale} dict={dict.footer} />
    </>
  );
}

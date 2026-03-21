import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        textAlign: "center",
      }}
    >
      <p style={{ color: "var(--accent)", fontSize: "0.92rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>
        Erreur 404
      </p>
      <h1 style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 800, letterSpacing: "-0.06em", color: "var(--text)", lineHeight: 1, marginBottom: "20px" }}>
        Page introuvable
      </h1>
      <p style={{ color: "var(--text-soft)", fontSize: "1.08rem", lineHeight: 1.7, maxWidth: "480px", marginBottom: "40px" }}>
        La page que tu cherches n'existe pas ou a été déplacée.
      </p>
      <Link href="/fr" className="btn btn-primary">
        ← Retour à l'accueil
        <span className="btn-arrow">→</span>
      </Link>
    </main>
  );
}

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "120px 24px 80px",
        color: "#ede5de",
      }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <p style={{ color: "#c1ff72", marginBottom: "16px" }}>Projet</p>
        <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>{slug}</h1>
        <p style={{ color: "#a8b0b2", fontSize: "1.1rem", lineHeight: 1.7 }}>
          Cette page projet est prête à être enrichie avec le contexte, les
          objectifs, le design, la stack technique et le résultat final.
        </p>
      </div>
    </main>
  );
}
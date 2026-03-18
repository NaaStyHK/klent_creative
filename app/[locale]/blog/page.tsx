import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="inner-page">
        <div className="container">
          <span className="section-kicker">Blog</span>
          <h1>Articles SEO à venir</h1>
          <p className="page-intro">
            Cette page servira à publier des contenus optimisés autour du
            développement web, du design premium, des sites vitrines et des
            applications sur mesure.
          </p>

          <div className="cards-grid three">
            <article className="card">
              <h3>Pourquoi un site premium change la perception d’une marque</h3>
              <p>Article SEO à rédiger.</p>
            </article>

            <article className="card">
              <h3>Créer un site vitrine moderne en 2026</h3>
              <p>Article SEO à rédiger.</p>
            </article>

            <article className="card">
              <h3>Application sur mesure ou no-code : que choisir ?</h3>
              <p>Article SEO à rédiger.</p>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
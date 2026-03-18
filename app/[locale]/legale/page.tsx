import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";

export default function LegalPage() {
  return (
    <>
      <Navbar />
      <main className="inner-page">
        <div className="container narrow">
          <span className="section-kicker">Mentions légales</span>
          <h1>Informations légales</h1>

          <div className="card legal-card">
            <p>
              <strong>Nom commercial :</strong> Klent Creative
            </p>
            <p>
              <strong>Responsable :</strong> Kevin Hafsi
            </p>
            <p>
              <strong>Activité :</strong> Développement web, design
              d’interfaces, création de sites et applications
            </p>
            <p>
              <strong>Email :</strong> contact@klentcreative.com
            </p>
            <p>
              <strong>Hébergement :</strong> À compléter
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { getDictionary, Locale } from "@/lib/dictionaries";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function LegalPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <>
      <Navbar locale={locale} dict={dict.navbar} />
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
              d'interfaces, création de sites et applications
            </p>
            <p>
              <strong>SIRET :</strong> À compléter
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
      <Footer locale={locale} dict={dict.footer} />
    </>
  );
}

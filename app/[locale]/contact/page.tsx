import Navbar from "@/components/Navbar";
import { getDictionary } from "@/lib/getDictionary";

type PageProps = {
  params: {
    locale: string;
  };
};

export default async function ContactPage({ params }: PageProps) {
  const dict = await getDictionary(params.locale);

  return (
    <>
      <Navbar locale={params.locale} dict={dict.navbar} />

      <main className="inner-page">
        <div className="container narrow">
          <span className="section-kicker">Contact</span>
          <h1>Parlons de ton projet</h1>
          <p className="page-intro">
            Tu peux me contacter pour un site vitrine premium, une refonte, une
            interface web ou une application sur mesure.
          </p>

          <div className="card form-card">
            <form className="contact-form">
              <input type="text" placeholder="Ton nom" />
              <input type="email" placeholder="Ton email" />
              <input type="text" placeholder="Sujet" />
              <textarea
                rows={6}
                placeholder="Parle-moi de ton projet..."
              />
              <button type="submit" className="btn btn-primary">
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
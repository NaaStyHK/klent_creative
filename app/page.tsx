import Image from "next/image";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#253439] text-[#ede5de]">
      {/* Background logo */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.05] translate-y-24">
        <Image
          src="/logo_klent.svg"
          alt="Klent Creative, création de site web à La Rochelle"
          width={900}
          height={400}
          priority={false}
        />
      </div>

      {/* Content */}
<section className="relative z-10 flex min-h-screen items-start justify-center px-6 pt-8 pb-8">        <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
          {/* LOGO */}
          <div className="mb-6">
            <Image
              src="/logo_klent.svg"
              alt="Logo Klent Creative"
              width={380}
              height={120}
              priority
            />
          </div>

          {/* Brand */}
          <p className="mb-4 text-sm font-medium tracking-[0.25em] text-[#c1ff72] uppercase">
            Klent Creative by Kevin Hafsi
          </p>

          {/* Main SEO Title */}
          <h1 className="max-w-4xl text-3xl font-semibold leading-tight text-white md:text-5xl">
            Création de site web à La Rochelle
          </h1>

          <div className="mt-6 mb-8 h-[3px] w-24 rounded-full bg-[#c1ff72]" />

          {/* Secondary SEO text */}
          <h2 className="max-w-3xl text-lg leading-relaxed text-[#ede5de] md:text-2xl">
            Développement de sites internet modernes, applications mobiles, SEO et
            performantes pour entreprises et indépendants à La Rochelle.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#d6d2cc] md:text-lg">
            Le site est actuellement en cours de développement.
            <br className="hidden md:block" />
            En attendant sa mise en ligne, Klent Creative accompagne déjà les
            professionnels de La Rochelle dans la création de site web, le
            référencement SEO local et le développement d’applications modernes.
          </p>

          {/* Extra semantic content for SEO */}
          <div className="mt-8 max-w-3xl text-sm leading-7 text-[#bfc7c8] md:text-base">
            <p>
              Basé à La Rochelle, je conçois des sites web rapides, modernes et
              optimisés pour la visibilité sur Google. Mon objectif est d’aider
              les entreprises locales à améliorer leur présence en ligne grâce à
              un site internet professionnel, une base SEO solide et une
              expérience utilisateur performante.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="mailto:contact@klentcreative.com"
              className="rounded-full bg-[#c1ff72] px-6 py-3 text-sm font-semibold text-[#253439] transition hover:scale-[1.02] hover:bg-[#b4f05f]"
            >
              contact@klentcreative.com
            </a>

            <a
              href="https://www.linkedin.com/in/kevin-hafsi-8b5577265/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:border-[#c1ff72] hover:text-[#c1ff72]"
            >
              Voir LinkedIn
            </a>
          </div>

          {/* Footer */}
          <div className="mt-16 flex flex-col items-center gap-3 text-sm text-[#aeb7b8] md:flex-row md:gap-6">
            <span>La Rochelle, France</span>
            <span className="hidden md:inline">•</span>
            <span>Création site web • SEO local • Applications</span>
          </div>
        </div>
      </section>
    </main>
  );
}
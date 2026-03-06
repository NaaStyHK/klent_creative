import Image from "next/image";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#253439] text-[#ede5de]">

      {/* Background logo */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.05] translate-y-24">
        <Image
          src="/logo_klent.svg"
          alt="Background logo"
          width={900}
          height={400}
        />
      </div>

      {/* Content */}
      <section className="relative z-10 flex min-h-screen items-start justify-center px-6 pt-15 pb-15">

        <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">

          {/* LOGO */}
          <div className="mb-6">
            <Image
              src="/logo_klent.svg"
              alt="Klent Creative Logo"
              width={380}
              height={120}
              priority
            />
          </div>

          {/* Brand */}
          <h1 className="mb-6 text-2xl font-semibold tracking-wide text-white md:text-3xl">
            KLENT CREATIVE BY KEVIN HAFSI
          </h1>

          <div className="mb-8 h-[3px] w-24 rounded-full bg-[#c1ff72]" />

          {/* Main copy */}
          <p className="max-w-3xl text-lg leading-relaxed text-[#ede5de] md:text-2xl">
            Création de sites web et apps modernes, rapides et performants.
          </p>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#d6d2cc] md:text-lg">
            Le site est actuellement en cours de développement.
            <br className="hidden md:block" />
            En attendant sa mise en ligne, je reste disponible pour échanger sur
            vos projets web, apps, SEO et performance.
          </p>

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
          <div className="mt-14 flex flex-col items-center gap-3 text-sm text-[#aeb7b8] md:flex-row md:gap-6">
            <span>La Rochelle, France</span>
            <span className="hidden md:inline">•</span>
            <span>Next.js • Flutter • SEO • Performance</span>
          </div>

        </div>

      </section>

    </main>
  );
}
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Manrope, DM_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  locales,
  isLocale,
  hreflangByLocale,
  buildAlternates,
  siteUrl,
  type Locale,
} from "@/lib/i18n/config";
import { buildSocial } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import Nav from "@/components/layout/Nav";
import ProjectNudge from "@/components/layout/ProjectNudge";
import Footer from "@/components/layout/Footer";
import IntroLoader from "@/components/motion/IntroLoader";
import MotionFX from "@/components/motion/MotionFX";
import JsonLd from "@/components/seo/JsonLd";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: buildAlternates("/"),
    },
    ...buildSocial({
      locale,
      title: dict.meta.home.title,
      description: dict.meta.home.description,
      url: `${siteUrl}/${locale}`,
    }),
  };
}

/**
 * The root layout, deliberately placed under [locale] rather than at app/.
 *
 * `lang` is a property of the document, and until now it was written by a
 * client effect: every localised page shipped `<html lang="en">` in its
 * initial HTML and only became French or Spanish once JavaScript ran. Anything
 * reading the document without executing scripts — screen readers on first
 * paint, translation tools, AI crawlers — saw the wrong language.
 *
 * The cost is that IntroLoader now lives inside the locale segment, so
 * switching language remounts it and replays the intro. That is an accepted
 * trade: a visitor picks a language once, whereas every visitor and every
 * crawler reads the lang attribute.
 *
 * "/" is redirected in next.config.ts rather than by a page, so no second root
 * layout is needed for it.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html
      lang={hreflangByLocale[locale]}
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${dmMono.variable}`}
      // The inline script below adds .intro-seen to <html> before hydration,
      // which React would otherwise report as a className mismatch.
      suppressHydrationWarning
    >
      <body className="is-loading">
        {/*
          Runs during body parse, before .intro-loader is reached, so a repeat
          visit in the same session never paints the loader at all. Doing this
          in IntroLoader's effect instead would hide it only after hydration,
          i.e. after the full-screen intro had already flashed. The key is
          shared with SESSION_KEY in IntroLoader.

          The script markup is handed over as a string rather than written as a
          <script> element, for two reasons that pull the same way. A bare
          script tag inside the React tree gets re-rendered on client-side
          navigation — switching locale remounts this layout — where React
          never executes it and logs "Encountered a script tag while rendering
          React component" every time. And next/script's beforeInteractive is
          not an alternative here: it queues the code on self.__next_s for the
          Next runtime to run once the framework bundle loads, which is far too
          late to beat the first paint. Written this way the server emits a
          real inline script that the parser executes on the spot, and the
          client-side re-render is inert, which is exactly what we want since
          the class it sets is already on <html> by then.
        */}
        <div
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html:
              "<script>try{if(sessionStorage.getItem('klent:intro-seen')==='1')document.documentElement.classList.add('intro-seen')}catch(e){}</script>",
          }}
        />
        {/*
          Scroll reveals and the intro loader are driven by JS: .reveal-up
          starts at opacity 0 and the loader hides the body until it finishes.
          If JS never runs, both stay in their initial state and the page reads
          as blank. The text is still in the HTML — extraction and indexing are
          unaffected — but a human would see nothing, so undo both here.

          This lives inside <body> on purpose. As a direct child of <html> the
          server rendered it happily but the client refused to reconcile it,
          which is only visible as a dev-time console error.
        */}
        <noscript>
          <style>{`
            body.is-loading{opacity:1 !important;visibility:visible !important}
            .intro-loader{display:none !important}
            .reveal-up{opacity:1 !important;transform:none !important}
          `}</style>
        </noscript>
        <IntroLoader brand="KLENT CREATIVE" />
        <MotionFX />
        <JsonLd locale={locale} />
        <Nav locale={locale} dict={dict} />
        <main>{children}</main>
        <Footer dict={dict} locale={locale} />
        <ProjectNudge dict={dict} locale={locale} />
        {/* Vercel Analytics (traffic) and Speed Insights (real-user Core Web
            Vitals). Speed Insights is the one that matters most here: it
            reports the field LCP of visitors on real devices, which is the
            only way to know what the intro loader actually costs. Both are
            inert outside Vercel, so local dev is unaffected. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

export type { Locale };

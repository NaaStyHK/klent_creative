import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";
import Hero from "@/components/landing/Hero";
import Ticker from "@/components/landing/Ticker";
import AgencyIntro from "@/components/landing/AgencyIntro";
import Showcase from "@/components/landing/Showcase";
import Statement from "@/components/landing/Statement";
import KineticBand from "@/components/landing/KineticBand";
import Services from "@/components/landing/Services";
import Manifesto from "@/components/landing/Manifesto";
import Metrics from "@/components/landing/Metrics";
import Process from "@/components/landing/Process";
import CTA from "@/components/landing/CTA";

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Hero dict={dict} />
      <Ticker dict={dict} />
      <AgencyIntro dict={dict} />
      <Showcase dict={dict} locale={locale} />
      <Statement dict={dict} />
      <KineticBand dict={dict} />
      <Services dict={dict} locale={locale} />
      <Manifesto dict={dict} />
      <Metrics dict={dict} />
      <Process dict={dict} />
      <CTA dict={dict} />
    </>
  );
}

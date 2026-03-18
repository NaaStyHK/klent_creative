import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Projects from "@/components/Projects/Projects";
import Services from "@/components/services/Services";
import Why from "@/components/Why/Why";
import Process from "@/components/Process/Process";
import About from "@/components/About/About";
import ContactSection from "@/components/ContactSection/ContactSection";
import Footer from "@/components/Footer/Footer";
import { getDictionary, Locale } from "@/lib/dictionaries";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function LocaleHomePage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <>
      <Navbar locale={locale} dict={dict.navbar} />
      <main>
        <Hero dict={dict.hero} />
        <Projects dict={dict.projects} />
        <Services dict={dict.services} />
        <Why dict={dict.why} />
        <Process dict={dict.process} />
        <About dict={dict.about} />
        <ContactSection dict={dict.contact} />
      </main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  );
}
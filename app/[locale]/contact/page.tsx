import Navbar from "@/components/Navbar/Navbar";
import ContactSection from "@/components/ContactSection/ContactSection";
import Footer from "@/components/Footer/Footer";
import { getDictionary, Locale } from "@/lib/dictionaries";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <>
      <Navbar locale={locale} dict={dict.navbar} />
      <main>
        <ContactSection dict={dict.contact} />
      </main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  );
}

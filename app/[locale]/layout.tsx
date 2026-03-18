import { notFound } from "next/navigation";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (locale !== "fr" && locale !== "es") {
    notFound();
  }

  return <>{children}</>;
}
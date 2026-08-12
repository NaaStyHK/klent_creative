import type { Metadata } from "next";
import { Manrope, DM_Mono } from "next/font/google";
import IntroLoader from "@/components/motion/IntroLoader";
import MotionFX from "@/components/motion/MotionFX";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.klentcreative.com"),
};

// Locale-specific <html lang> is set by the [locale] segment via SetHtmlLang,
// since this root layout renders before the locale is known to the framework.
//
// IntroLoader and MotionFX live here (not in [locale]/layout) so they never
// remount: this root layout persists across every client-side navigation,
// including a locale switch — which changes the [locale] segment itself and
// would otherwise remount anything mounted inside it, replaying the loader
// on every language switch instead of only on a genuine first page load.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${manrope.variable} ${dmMono.variable}`}>
      <body className="is-loading">
        <IntroLoader brand="KLENT CREATIVE" />
        <MotionFX />
        {children}
      </body>
    </html>
  );
}

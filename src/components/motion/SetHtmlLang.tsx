"use client";

import { useEffect } from "react";
import { hreflangByLocale, type Locale } from "@/lib/i18n/config";

/**
 * The root layout (src/app/layout.tsx) owns the single <html> tag and can't
 * know the locale ahead of time, so this sets the correct lang attribute
 * client-side once the [locale] segment mounts. Search engines rely on the
 * hreflang alternates (set via metadata) rather than this attribute, so this
 * is an accessibility nicety, not an SEO-critical signal.
 */
export default function SetHtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = hreflangByLocale[locale];
  }, [locale]);

  return null;
}

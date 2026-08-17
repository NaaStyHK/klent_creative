"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale } from "@/lib/i18n/config";
import { getLocalizedPath } from "@/lib/i18n/localized-path";
import { navigationLocales, navigationLocaleLabel } from "@/lib/i18n/navigation-locales";

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <div className="locale-switcher mono" aria-label="Language">
      {navigationLocales(locale).map((l, i) => (
        <span key={l}>
          {i > 0 && <span className="locale-switcher__sep">/</span>}
          <Link
            href={getLocalizedPath(pathname, locale, l)}
            className={`hoverable locale-switcher__link${l === locale ? " is-active" : ""}`}
            aria-current={l === locale ? "true" : undefined}
          >
            {navigationLocaleLabel(l)}
          </Link>
        </span>
      ))}
    </div>
  );
}

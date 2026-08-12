"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabels, type Locale } from "@/lib/i18n/config";
import { getLocalizedPath } from "@/lib/i18n/localized-path";

const primaryNavigationLocales: Locale[] = ["fr", "es", "en"];

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  // The Argentina-specific version remains fully crawlable and indexed, but
  // does not add a fourth choice to the main navigation. Visitors who land on
  // /es-ar from search see ES as their active Spanish option and stay on the
  // regional version until they deliberately choose another language.
  const navigationLocales =
    locale === "es-ar" ? (["fr", "es-ar", "en"] satisfies Locale[]) : primaryNavigationLocales;

  return (
    <div className="locale-switcher mono" aria-label="Language">
      {navigationLocales.map((l, i) => (
        <span key={l}>
          {i > 0 && <span className="locale-switcher__sep">/</span>}
          <Link
            href={getLocalizedPath(pathname, locale, l)}
            className={`hoverable locale-switcher__link${l === locale ? " is-active" : ""}`}
            aria-current={l === locale ? "true" : undefined}
          >
            {l === "es-ar" ? localeLabels.es : localeLabels[l]}
          </Link>
        </span>
      ))}
    </div>
  );
}

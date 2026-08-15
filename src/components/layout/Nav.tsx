import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { workListingSlug } from "@/lib/projects";
import { studioSlug } from "@/lib/studio";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher";
import MobileMenu from "@/components/layout/MobileMenu";

export default function Nav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <nav>
      <Link className="brand hoverable" href={`/${locale}`} aria-label={dict.loader.brand}>
        {/* eslint-disable-next-line @next/next/no-img-element -- local SVG icon, next/image adds no optimization for vectors here */}
        <img className="brand-mark" src="/brand/logo-mark-light-bg.svg" alt="" />
        <span className="brand-text">{dict.loader.brand}</span>
      </Link>
      <div className="navlinks mono">
        <Link className="hoverable" href={`/${locale}/${workListingSlug[locale]}`}>
          {dict.nav.work}
        </Link>
        <Link className="hoverable" href={`/${locale}#services`}>
          {dict.nav.services}
        </Link>
        <Link className="hoverable" href={`/${locale}/${studioSlug[locale]}`}>
          {dict.nav.studio}
        </Link>
      </div>
      <div className="nav-right">
        <LocaleSwitcher locale={locale} />
        <Link className="nav-cta mono hoverable magnetic" href={`/${locale}/contact`}>
          {dict.nav.cta}
        </Link>
        <MobileMenu locale={locale} dict={dict} />
      </div>
    </nav>
  );
}

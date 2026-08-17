"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale } from "@/lib/i18n/config";
import { navigationLocales, navigationLocaleLabel } from "@/lib/i18n/navigation-locales";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { workListingSlug } from "@/lib/projects";
import { getLocalizedPath } from "@/lib/i18n/localized-path";
import { studioSlug } from "@/lib/studio";

/**
 * Phone navigation: a small dropdown panel, not a full-screen takeover. The
 * top nav links are hidden below 850px (inherited from the one-page mockup),
 * so without this the work, studio and contact pages are unreachable on
 * a phone. Rendered at every width but CSS-hidden above 850px.
 */
export default function MobileMenu({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  // Stores the route the panel was opened on rather than a boolean: as soon as
  // the visitor navigates, `open` becomes false on its own, so no effect has
  // to call setState on route change.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn !== null && openedOn === pathname;
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenedOn(null);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpenedOn(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  // Mirrors the desktop nav exactly. The blog is absent from both on purpose:
  // the footer is its single site-wide entry point, and having it here made the
  // phone menu say something the wide screen did not.
  const links = [
    { href: `/${locale}/${workListingSlug[locale]}`, label: dict.nav.work },
    { href: `/${locale}#services`, label: dict.nav.services },
    { href: `/${locale}/${studioSlug[locale]}`, label: dict.nav.studio },
    { href: `/${locale}/contact`, label: dict.contact.eyebrow },
  ];

  return (
    <div className="menu-wrap" ref={wrapRef}>
      <button
        ref={buttonRef}
        type="button"
        className={`menu-toggle mono${open ? " menu-toggle--open" : ""}`}
        aria-label={open ? dict.nav.menuClose : dict.nav.menuOpen}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpenedOn(open ? null : pathname)}
      >
        <span aria-hidden="true">+</span>
      </button>

      <div id="mobile-menu" className={`menu-pop${open ? " menu-pop--open" : ""}`} aria-hidden={!open}>
        {/* A <div role="navigation"> rather than a <nav>: the mockup styles the
            bare `nav` element as the fixed site header, so a nested <nav> here
            inherited position:fixed and escaped to the top of the screen. The
            role keeps the same meaning for assistive tech. */}
        <div className="menu-pop-links" role="navigation" aria-label={dict.nav.menuOpen}>
          {links.map((link) => (
            <Link className="menu-pill mono" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="menu-pop-locales">
          {navigationLocales(locale).map((l) => (
            <Link
              className={`menu-pill menu-pill--locale mono${l === locale ? " is-active" : ""}`}
              // Same resolver as the desktop switcher. Swapping only the
              // locale prefix produced /es/creation-site-internet, whose real
              // Spanish slug is /es/creacion-sitio-web: 26 of 27 sampled
              // language switches led to a 404.
              href={getLocalizedPath(pathname, locale, l)}
              key={l}
              aria-current={l === locale ? "true" : undefined}
            >
              {navigationLocaleLabel(l)}
            </Link>
          ))}
        </div>

        <Link className="menu-pop-cta mono" href={`/${locale}/contact`}>
          {dict.nav.cta}
        </Link>
      </div>
    </div>
  );
}

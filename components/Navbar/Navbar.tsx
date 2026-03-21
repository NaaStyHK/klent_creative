"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type NavbarDict = {
  projects: string;
  services: string;
  about: string;
  contact: string;
  audit: string;
};

type NavbarProps = {
  locale: string;
  dict: NavbarDict;
};

const SECTIONS = ["projects", "services", "why", "process", "about", "contact"];

export default function Navbar({ locale, dict }: NavbarProps) {
  const switchLocale = locale === "fr" ? "es" : "fr";
  const switchLabel = locale === "fr" ? "ES" : "FR";

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });

    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: "-40% 0px -40% 0px",
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  // Ferme le menu si on scroll
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { href: "#projects", label: dict.projects, id: "projects" },
    { href: "#services", label: dict.services, id: "services" },
    { href: "#about",    label: dict.about,    id: "about"    },
    { href: "#contact",  label: dict.contact,  id: "contact"  },
  ];

  return (
    <>
      <header className={`topbar${scrolled ? " is-scrolled" : ""}`}>
        <div className="site-container">
          <nav className="nav-shell">

            <Link href={`/${locale}`} className="nav-brand" aria-label="Klent Creative">
              <Image
                src="/logo.svg"
                alt="Klent Creative"
                width={120}
                height={45}
                className="nav-brand-logo-img"
                priority
              />
            </Link>

            <div className="nav-center">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id ||
                  (link.id === "about" && ["why", "process"].includes(activeSection));

                return (
                  <a
                    key={link.id}
                    href={link.href}
                    className={`nav-link${isActive ? " is-active" : ""}`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            <div className="nav-right">
              <Link href={`/${switchLocale}`} className="locale-switch">
                {switchLabel}
              </Link>
              <a href="#contact" className="nav-button nav-button--desktop">
                {dict.audit}
              </a>
              <button
                type="button"
                className="nav-hamburger"
                aria-label="Menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((o) => !o)}
              >
                <span className={`nav-hamburger-bar${menuOpen ? " is-open" : ""}`} />
                <span className={`nav-hamburger-bar${menuOpen ? " is-open" : ""}`} />
                <span className={`nav-hamburger-bar${menuOpen ? " is-open" : ""}`} />
              </button>
            </div>

          </nav>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`nav-mobile-overlay${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="nav-mobile-content">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="nav-mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="nav-mobile-bottom">
            <Link
              href={`/${switchLocale}`}
              className="locale-switch"
              onClick={() => setMenuOpen(false)}
            >
              {switchLabel}
            </Link>
            <a
              href="#contact"
              className="btn btn-primary"
              onClick={() => setMenuOpen(false)}
            >
              {dict.audit}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

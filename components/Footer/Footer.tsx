import Link from "next/link";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: "300", display: "swap" });

type FooterDict = {
  tagline: string;
  navLabel: string;
  navLinks: { label: string; href: string }[];
  contactLabel: string;
  contactEmail: string;
  contactLocation: string;
  legal: string;
  mentionsLabel: string;
  mentionsHref: string;
};

type FooterProps = {
  locale: string;
  dict: FooterDict;
};

export default function Footer({ locale, dict }: FooterProps) {
  return (
    <footer className="footer">
      <div className="site-container">

        <div className="footer-top">

          {/* Col 1 — Brand + socials */}
          <div className="footer-brand">
            <div className="footer-brand-identity">
              <Image
                src="/logo.svg"
                alt="Klent Creative"
                width={110}
                height={42}
                className="footer-brand-logo-img"
              />
              </div>
            <p className="footer-tagline">{dict.tagline}</p>
            <div className="footer-socials">
              <a
                href="https://www.linkedin.com/in/kevin-hafsi/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="LinkedIn"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <nav className="footer-col">
            <p className="footer-col-label">{dict.navLabel}</p>
            <ul className="footer-col-list">
              {dict.navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3 — Contact */}
          <div className="footer-col">
            <p className="footer-col-label">{dict.contactLabel}</p>
            <ul className="footer-col-list">
              <li>
                <a href={`mailto:${dict.contactEmail}`}>{dict.contactEmail}</a>
              </li>
              <li>
                <span className="footer-col-location">{dict.contactLocation}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p>{dict.legal}</p>
          <Link href={`/${locale}${dict.mentionsHref}`} className="footer-mentions">
            {dict.mentionsLabel}
          </Link>
        </div>

      </div>
    </footer>
  );
}
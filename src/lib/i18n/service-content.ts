import type { RichHeading } from "@/components/ui/RichHeading";
export type ServiceContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: RichHeading;
  intro: string;
  features: { title: string; body: string }[];
  benefits?: {
    eyebrow: string;
    headline: RichHeading;
    items: { num: string; title: string; body: string }[];
  };
  process?: {
    eyebrow: string;
    headline: RichHeading;
    steps: { num: string; title: string; body: string }[];
  };
  faq?: {
    eyebrow: string;
    headline: RichHeading;
    items: { title: string; body: string }[];
  };
  /**
   * Contextual outbound links, rendered as one compact row above the closing
   * CTA. Optional and per-locale, so a French page can point at a French-only
   * landing without inventing an equivalent for the other three locales.
   */
  related?: {
    label: string;
    links: { href: string; text: string }[];
  };
  closingKicker: string;
  closingHeadline: [RichHeading, RichHeading];
  ctaButton: string;
};

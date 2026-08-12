export type ServiceContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  features: { title: string; body: string }[];
  benefits?: {
    eyebrow: string;
    headline: string;
    items: { num: string; title: string; body: string }[];
  };
  process?: {
    eyebrow: string;
    headline: string;
    steps: { num: string; title: string; body: string }[];
  };
  faq?: {
    eyebrow: string;
    headline: string;
    items: { title: string; body: string }[];
  };
  closingKicker: string;
  closingHeadline: [string, string];
  ctaButton: string;
};

export type ProjectContent = {
  metaTitle: string;
  metaDescription: string;
  badge?: string;
  category: string;
  name: string[];
  tags: string[];
  image: string;
  alt: string;
  conceptNote: string;
  intro: string;
  briefTitle: string;
  brief: string;
  approachTitle: string;
  approach: string;
  resultTitle: string;
  result: string;
  caseStudy?: {
    year: string;
    location: string;
    scope: string;
    status: string;
    theme: { primary: string; secondary: string; dark: string; accent: string };
    logoLines: string[];
    symbolLetters?: string[];
    logo?: string;
    abstractCover?: boolean;
    /**
     * Renders the cover as a short banner instead of a full-height panel, and
     * drops the wordmark from inside it.
     *
     * Separate from `variant` on purpose: `variant` carries a project's own
     * palette, so reusing "oxploria" here to get its banner would have dragged
     * the yellow gradient onto every project that wanted the same proportion.
     */
    coverBanner?: boolean;
    variant?: "oxploria";
    coverCaption: string;
    conceptEyebrow: string;
    conceptTitle: string;
    conceptBody: string;
    identityEyebrow: string;
    identityTitle: string;
    identityBody: string;
    logoNote: string;
    colors: Array<{ name: string; hex: string }>;
    typographyTitle: string;
    typographyBody: string;
    typePrimaryLabel: string;
    typeDisplayLines: string[];
    typeSecondaryLabel: string;
    typeSample: string;
    voiceEyebrow: string;
    voiceTitle: string;
    voiceBody: string;
    voiceLines: string[];
    applicationsEyebrow: string;
    applicationsTitle: string;
    applicationsBody: string;
    applicationOne: { caption: string; titleLines: string[]; rows: Array<[string, string]> };
    applicationTwo: { caption: string; titleLines: string[]; small: string; sticker: string[] };
    applicationPhoto: { caption: string; lines: string[] };
    galleryImages?: Array<{ src: string; alt: string; caption: string }>;
    digitalEyebrow: string;
    digitalTitle: string;
    digitalBody: string;
    digitalMockup: { url: string; nav: string; kicker: string; headline: string; cta: string };
    digitalScreenshot?: string;
    liveUrl?: string;
    resultEyebrow: string;
    resultHeadline: string;
    resultBody: string;
  };
};

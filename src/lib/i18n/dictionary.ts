export type CaseCard = {
  slug: string;
  cursor: string;
  index: string;
  name: string[]; // rendered as separate <br>-joined lines
  desc: string;
  tags: string[];
  link: string;
  image: string;
  alt: string;
};

export type ServiceItem = {
  num: string;
  title: string;
  desc: string;
  href?: string; // relative path within the locale, e.g. "/branding" — omitted if no dedicated page exists yet
  cta?: string;
};

export type ProcessStep = {
  num: string;
  title: string;
  desc: string;
};

export type Metric = {
  value: string;
  count?: number;
  label: string[];
};

export type Dictionary = {
  meta: {
    home: { title: string; description: string };
  };
  nav: {
    work: string;
    services: string;
    studio: string;
    cta: string;
  };
  hero: {
    kickerLeft: string[];
    kickerRight: string[];
    titleLines: string[];
    copy: string;
    status: string;
    scroll: string;
  };
  ticker: string;
  agencyIntro: { left: string; leftStrong: string; right: string; rightStrong: string };
  work: {
    eyebrow: string;
    headline: string[];
    description: string;
    cases: CaseCard[];
  };
  statement: {
    kicker: string;
    // One entry per rendered line (<br>-joined); each line is a list of
    // inline segments so only part of a line can carry the "outline" style,
    // matching the original "make <span class=outline>pretty.</span>" markup.
    lines: Array<Array<string | { outline: string }>>;
    copy: string;
    spinmark: string;
  };
  kineticBand: { text: string; emphasis: string; tail: string };
  services: {
    eyebrow: string;
    headline: string;
    items: ServiceItem[];
  };
  manifesto: {
    kicker: string;
    word: string[];
    tagline: string;
    note: string;
  };
  metrics: Metric[];
  process: {
    eyebrow: string;
    headline: string;
    steps: ProcessStep[];
  };
  cta: {
    kicker: string;
    headlineLines: string[];
    button: string;
  };
  footer: {
    tagline: string;
    legal: string;
    copyright: string;
  };
  loader: { brand: string };
  workPage: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    h1: string;
    intro: string;
    conceptTag: string;
    backToWork: string;
    viewProject: string;
  };
  blog: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    h1: string;
    intro: string;
    empty: string;
    readArticle: string;
    backToBlog: string;
    relatedServiceIntro: string;
    minRead: string;
  };
  contact: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    h1: string;
    intro: string;
    emailLabel: string;
    locationLabel: string;
    location: string;
    socialLabel: string;
  };
};

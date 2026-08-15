export type LegalSection = {
  title: string;
  /** Rendered as successive <p> blocks. */
  paragraphs: string[];
};

export type LegalField = {
  label: string;
  /** Plain text, or a mailto:/https: link rendered as an <a>. */
  value: string;
  href?: string;
};

export type LegalContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  editorTitle: string;
  editorFields: LegalField[];
  hostingTitle: string;
  hostingFields: LegalField[];
  sections: LegalSection[];
  lastUpdate: string;
};

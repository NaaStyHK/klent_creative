export type StudioMember = {
  firstName: string;
  role: string;
  /** Short label such as "Français · Espagnol". */
  languages: string;
  bio: string;
  /**
   * Path under /public once real portraits exist (e.g. "/team/kevin.jpg").
   * Left undefined on purpose for now — the component renders a typographic
   * placeholder rather than pointing at a file that does not exist yet.
   */
  photo?: string;
  photoAlt: string;
};

export type StudioPoint = {
  title: string;
  body: string;
};

export type StudioContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  teamEyebrow: string;
  teamTitle: string;
  members: StudioMember[];
  reachEyebrow: string;
  reachTitle: string;
  reachBody: string;
  reachPoints: StudioPoint[];
  approachEyebrow: string;
  approachTitle: string;
  approachBody: string;
  approachPoints: StudioPoint[];
  ctaKicker: string;
  ctaHeadline: [string, string];
  ctaButton: string;
};

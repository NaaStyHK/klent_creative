"use client";

const ITEMS = [
  "Next.js",
  "TypeScript",
  "React",
  "Flutter",
  "Figma",
  "Tailwind CSS",
  "WordPress",
  "Supabase",
  "Node.js",
  "Vercel",
  "Mobile-first",
  "Performance",
  "SEO",
  "UX Design",
  "Sur mesure",
  "100% custom",
];

// Dupliquer pour l'effet infini
const TRACK = [...ITEMS, ...ITEMS];

export default function Marquee() {
  return (
    <div className="marquee-section" aria-hidden="true">
      <div className="marquee-track">
        {TRACK.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

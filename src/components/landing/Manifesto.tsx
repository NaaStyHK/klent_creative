import type { Dictionary } from "@/lib/i18n/dictionary";

export default function Manifesto({ dict }: { dict: Dictionary }) {
  const { manifesto } = dict;
  return (
    <section className="manifesto">
      <div className="manifesto-grid reveal-up">
        <div className="manifesto-left">
          <div className="mono">{manifesto.kicker}</div>
          <div className="manifesto-word">
            {manifesto.word.map((w, i) => (
              <span key={i}>
                {i > 0 && <>{" "}<br /></>}
                {w}
              </span>
            ))}
          </div>
          <div className="mono">{manifesto.tagline}</div>
        </div>
        <div className="manifesto-right">
          <div className="sphere" />
          <div className="manifesto-note mono">{manifesto.note}</div>
        </div>
      </div>
    </section>
  );
}

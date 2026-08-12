import type { Dictionary } from "@/lib/i18n/dictionary";

export default function CTA({ dict }: { dict: Dictionary }) {
  const { cta } = dict;
  return (
    <section className="cta" id="contact">
      <div className="ring" />
      <div className="mono" style={{ marginBottom: 26, zIndex: 2 }}>
        {cta.kicker}
      </div>
      <h2 className="reveal-up">
        {cta.headlineLines[0]}
        <br />
        {cta.headlineLines[1]}
      </h2>
      <a className="mono hoverable magnetic" href="mailto:hello@klent.studio">
        {cta.button}
      </a>
    </section>
  );
}

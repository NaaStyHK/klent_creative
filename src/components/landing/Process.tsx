import type { Dictionary } from "@/lib/i18n/dictionary";

export default function Process({ dict }: { dict: Dictionary }) {
  const { process } = dict;
  return (
    <section className="process">
      <div className="section-head reveal-up">
        <div className="eyebrow mono">{process.eyebrow}</div>
        <h2 className="headline">{process.headline}</h2>
      </div>
      <div className="steps">
        {process.steps.map((step) => (
          <div className="step reveal-up" key={step.num}>
            <div className="step-num mono">{step.num}</div>
            <div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

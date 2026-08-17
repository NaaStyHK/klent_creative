import type { Dictionary } from "@/lib/i18n/dictionary";

export default function Process({ dict }: { dict: Dictionary }) {
  const { process } = dict;
  return (
    <section className="process">
      <div className="section-head reveal-up">
        <div className="eyebrow mono">{process.eyebrow}</div>
        <h2 className="headline headline--display">
            {typeof process.headline === "string"
              ? process.headline
              : process.headline.map((seg, i) =>
                  typeof seg === "string" ? (
                    seg
                  ) : (
                    <span className="outline" key={i}>
                      {seg.outline}
                    </span>
                  ),
                )}
          </h2>
      </div>
      <div className="steps">
        {process.steps.map((step) => (
          <div className="step reveal-up" key={step.num}>
            {/* Flat, not wrapped: each part occupies a row of the shared
                subgrid, which is what keeps the four cards aligned. */}
            <div className="step-num mono">{step.num}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

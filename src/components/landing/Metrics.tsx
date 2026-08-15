import type { Dictionary } from "@/lib/i18n/dictionary";

export default function Metrics({ dict }: { dict: Dictionary }) {
  return (
    <section className="metrics">
      <div className="metrics-grid reveal-up">
        {dict.metrics.map((m, i) => (
          <div className="metric" key={i}>
            {m.count !== undefined ? (
              <div className="metric-value" data-count={m.count}>
                0
              </div>
            ) : (
              <div className="metric-value">{m.value}</div>
            )}
            <div className="metric-label">
              {m.label[0]}
              {" "}<br />
              {m.label[1]}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import type { Dictionary } from "@/lib/i18n/dictionary";
import SpinMark from "@/components/landing/SpinMark";

export default function Statement({ dict }: { dict: Dictionary }) {
  const { statement } = dict;
  return (
    <section className="statement" id="studio">
      <div className="mono">{statement.kicker}</div>
      <h2 className="big reveal-up">
        {statement.lines.map((line, i) => (
          <span key={i}>
            {i > 0 && <>{" "}<br /></>}
            {line.map((seg, j) =>
              typeof seg === "string" ? (
                seg
              ) : (
                <span className="outline" key={j}>
                  {seg.outline}
                </span>
              ),
            )}
          </span>
        ))}
      </h2>
      <div className="statement-foot">
        <div className="statement-copy reveal-up">{statement.copy}</div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <SpinMark label={statement.spinmark} />
        </div>
      </div>
    </section>
  );
}

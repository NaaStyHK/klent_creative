import type { Dictionary } from "@/lib/i18n/dictionary";

export default function Hero({ dict }: { dict: Dictionary }) {
  const { hero } = dict;
  return (
    <header className="hero">
      <div className="hero-orb" />
      <div className="hero-top">
        <div className="kicker mono">
          {hero.kickerLeft[0]}
          {" "}<br />
          {hero.kickerLeft[1]}
        </div>
        <div className="kicker mono">
          {hero.kickerRight[0]}
          {" "}<br />
          {hero.kickerRight[1]}
        </div>
      </div>

      <h1 className="hero-title">
        {/* The trailing space is not cosmetic. Each line is its own block-level
            span, so with nothing between them the H1's text content reads
            "Des idéesqui marquent." — glued words that tokenise badly for the
            AI crawlers that ingest raw HTML. A trailing space collapses at the
            end of a block, so the rendering is untouched. */}
        {hero.titleLines.map((line, i) => (
          <span key={i}>
            <i>
              {typeof line === "string"
                ? line
                : line.map((seg, j) =>
                    typeof seg === "string" ? (
                      seg
                    ) : (
                      <span className="outline" key={j}>
                        {seg.outline}
                      </span>
                    ),
                  )}
            </i>{" "}
          </span>
        ))}
      </h1>

      <div className="hero-bottom">
        <div className="hero-copy">{hero.copy}</div>
        <div className="hero-meta mono">
          <div className="status">
            <span className="dot" /> {hero.status}
          </div>
        </div>
      </div>
    </header>
  );
}

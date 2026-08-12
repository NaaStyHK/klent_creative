import type { Dictionary } from "@/lib/i18n/dictionary";

export default function Hero({ dict }: { dict: Dictionary }) {
  const { hero } = dict;
  return (
    <header className="hero">
      <div className="hero-orb" />
      <div className="hero-badge">
        <span>↗︎</span>
      </div>
      <div className="hero-top">
        <div className="kicker mono">
          {hero.kickerLeft[0]}
          <br />
          {hero.kickerLeft[1]}
        </div>
        <div className="kicker mono">
          {hero.kickerRight[0]}
          <br />
          {hero.kickerRight[1]}
        </div>
      </div>

      <h1 className="hero-title">
        {hero.titleLines.map((line, i) => (
          <span key={i}>
            <i>{line}</i>
          </span>
        ))}
      </h1>

      <div className="hero-bottom">
        <div className="hero-copy">{hero.copy}</div>
        <div className="hero-meta mono">
          <div className="status">
            <span className="dot" /> {hero.status}
          </div>
          <div>{hero.scroll}</div>
        </div>
      </div>
    </header>
  );
}

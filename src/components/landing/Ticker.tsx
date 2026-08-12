import type { Dictionary } from "@/lib/i18n/dictionary";

export default function Ticker({ dict }: { dict: Dictionary }) {
  const items = dict.ticker
    .split("✦")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <div className="ticker" role="list">
      <div className="ticker-track">
        {items.map((item, index) => (
          <div className="ticker-item hoverable" role="listitem" key={item}>
            <span className="ticker-index mono">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="ticker-label">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

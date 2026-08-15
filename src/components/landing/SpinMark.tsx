/**
 * The rotating studio seal.
 *
 * The mockup centred a single flat line of text inside a circle and spun the
 * whole box, so the words tilted as a block and read upside down for half of
 * every turn. Here the text follows the circle itself (SVG <textPath>), which
 * is what a seal actually does — every letter stays upright relative to the
 * ring, and only the ring turns.
 *
 * `textLength` is set to the exact circumference so the label distributes
 * evenly whatever its length: the French, Spanish and English strings all
 * differ, and without it they would leave a visible gap at the seam.
 */
const R = 38;
const CIRCUMFERENCE = 2 * Math.PI * R;

export default function SpinMark({ label }: { label: string }) {
  // A trailing separator closes the loop so there is no gap where the text
  // meets its own start.
  const text = label.trim().replace(/[•·\s]+$/, "") + " • ";

  return (
    <div className="spinmark" aria-label={label} role="img">
      <svg className="spinmark-ring" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <path
            id="spinmark-path"
            fill="none"
            d={`M50,50 m-${R},0 a${R},${R} 0 1,1 ${R * 2},0 a${R},${R} 0 1,1 -${R * 2},0`}
          />
        </defs>
        <text className="spinmark-text mono">
          <textPath href="#spinmark-path" textLength={CIRCUMFERENCE} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="spinmark-dot" aria-hidden="true" />
    </div>
  );
}

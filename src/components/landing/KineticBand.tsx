import type { Dictionary } from "@/lib/i18n/dictionary";

function Row({ dict }: { dict: Dictionary }) {
  return (
    <span>
      {dict.kineticBand.text} — <em>{dict.kineticBand.emphasis}</em> — {dict.kineticBand.tail} —{" "}
    </span>
  );
}

export default function KineticBand({ dict }: { dict: Dictionary }) {
  return (
    <div className="kinetic-band" aria-hidden="true">
      <div className="kinetic-row">
        <Row dict={dict} />
        <Row dict={dict} />
      </div>
    </div>
  );
}

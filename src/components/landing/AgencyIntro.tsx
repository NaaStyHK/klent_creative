import type { Dictionary } from "@/lib/i18n/dictionary";

export default function AgencyIntro({ dict }: { dict: Dictionary }) {
  const { agencyIntro } = dict;
  return (
    <div className="agency-intro">
      <div>
        {agencyIntro.left}
        <strong>{agencyIntro.leftStrong}</strong>
      </div>
      <div>
        {agencyIntro.right}
        <strong>{agencyIntro.rightStrong}</strong>
      </div>
    </div>
  );
}

import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";

export default function Services({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { services } = dict;
  return (
    <section className="services" id="services">
      <div className="section-head reveal-up">
        <div className="eyebrow mono">{services.eyebrow}</div>
        <h2 className="headline headline--display">
          {typeof services.headline === "string"
            ? services.headline
            : services.headline.map((seg, i) =>
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

      {services.items.map((item) => {
        const body = (
          <>
            <div className="mono">{item.num}</div>
            <h3>{item.title}</h3>
            <p>
              {item.desc}
              {item.cta && (
                <>
                  {" "}
                  <span className="service-learn-more">{item.cta} ↗︎</span>
                </>
              )}
            </p>
            <div className="arrow">↗︎</div>
          </>
        );

        return item.href ? (
          <Link className="service hoverable reveal-up" href={`/${locale}${item.href}`} key={item.num}>
            {body}
          </Link>
        ) : (
          <div className="service reveal-up" key={item.num}>
            {body}
          </div>
        );
      })}
    </section>
  );
}

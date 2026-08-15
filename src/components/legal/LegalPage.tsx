import type { LegalContent, LegalField } from "@/lib/i18n/legal-content";

function Field({ field }: { field: LegalField }) {
  return (
    <p>
      <strong>{field.label}</strong>
      {" "}<br />
      {field.href ? (
        <a
          href={field.href}
          {...(field.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {field.value}
        </a>
      ) : (
        field.value
      )}
    </p>
  );
}

export default function LegalPage({ content }: { content: LegalContent }) {
  return (
    <article className="blog-article">
      <span className="mono blog-date">{content.eyebrow}</span>
      <h1 className="headline">{content.h1}</h1>

      <div className="blog-body">
        <p>{content.intro}</p>

        <h2>{content.editorTitle}</h2>
        {content.editorFields.map((field) => (
          <Field field={field} key={field.label} />
        ))}

        <h2>{content.hostingTitle}</h2>
        {content.hostingFields.map((field) => (
          <Field field={field} key={field.label} />
        ))}

        {content.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </section>
        ))}

        <p>
          <strong>{content.lastUpdate}</strong>
        </p>
      </div>
    </article>
  );
}

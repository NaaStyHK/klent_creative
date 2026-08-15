/**
 * Frontmatter dates are ISO ("2026-06-20"). Rendered as DD/MM/YYYY, which is
 * the convention in all four target markets (FR, ES, AR) — including EN here,
 * since the English site addresses those same European/Latin-American readers
 * rather than a US audience. Hence no locale argument: the format is uniform.
 */
export function formatPostDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) return iso;
  return `${day}/${month}/${year}`;
}

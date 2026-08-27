import { Eyebrow, Reveal } from "./primitives";

/**
 * Shared shell for /privacy and /terms — same Hero pattern as colophon.tsx
 * and hire.tsx (halo + grid lines, pt-32 for the fixed nav), with a plain
 * long-form body instead of a card grid, since this is prose, not a stack
 * of facts.
 */
export function LegalPage({
  eyebrow,
  headline,
  updated,
  sections,
}: {
  eyebrow: string;
  headline: string;
  updated: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <>
      <header className="relative overflow-hidden pt-32 pb-16 sm:pt-36 sm:pb-20">
        <div className="v-halo pointer-events-none absolute inset-0" aria-hidden />
        <div className="v-grid-lines pointer-events-none absolute inset-0" aria-hidden />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="v-display mt-7 max-w-2xl text-balance text-[clamp(2.5rem,7vw,4.5rem)] text-[var(--v-fg)]">
              {headline}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="v-mono mt-6 text-[12px] uppercase tracking-[0.14em] text-[var(--v-faint)]">
              Last updated {updated}
            </p>
          </Reveal>
        </div>
      </header>

      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pt-16 pb-28 sm:px-8 sm:pt-20 md:pb-32">
        <Reveal>
          <div className="rounded-2xl border border-[var(--v-accent-line)] bg-[var(--v-accent-dim)] px-6 py-5">
            <p className="v-heading text-[13px] leading-relaxed text-[var(--v-fg)]">
              Placeholder draft — this page describes the site&apos;s actual
              data handling as of this writing, but hasn&apos;t been reviewed
              by counsel. Replace or confirm before relying on it.
            </p>
          </div>
        </Reveal>

        <dl className="mt-12 flex flex-col gap-10">
          {sections.map((section, i) => (
            <Reveal as="div" key={section.heading} delay={0.06 + i * 0.05}>
              <dt className="v-heading text-[15px] font-semibold text-[var(--v-fg)]">
                {section.heading}
              </dt>
              <dd className="mt-2 text-pretty text-[14.5px] leading-relaxed text-[var(--v-muted)]">
                {section.body}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </>
  );
}

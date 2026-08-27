import Image from "next/image";

import { cn } from "@/lib/utils";
import { ABOUT } from "./data";
import { Eyebrow, Reveal, Section } from "./primitives";

/**
 * About and experience in one two-column section rather than two stacked
 * ones. They answer adjacent questions — "what is this person like to work
 * with" and "what have they actually owned" — and splitting them makes the
 * page read like a CV again.
 *
 * Left column is sticky: the portrait and credentials stay in view while the
 * experience rail scrolls, so the face is attached to the record.
 */
export function VelombeAbout() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Portrait. `group` so the desaturate-on-hover has something to
            hook: the shirt is the only chroma on the page, and holding it
            back until hover keeps the monochrome discipline while still
            rewarding the cursor. */}
        <Reveal className="group lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="v-scrim v-inset-line relative aspect-[3/4] overflow-hidden rounded-2xl bg-[var(--v-surface)]">
              <Image
                src={ABOUT.portrait}
                alt={ABOUT.portraitAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                // object-contain, not object-cover: this is the same
                // transparent cut-out the hero uses, and cropping it would
                // cut into the figure rather than trim spare background
                // that isn't there. The box is aspect-[3/4] (0.75) against
                // the asset's own ~0.745, so there's effectively nothing to
                // letterbox anyway.
                className="object-contain object-top grayscale transition-[filter,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:grayscale-0"
              />
              <span className="v-mono absolute bottom-4 left-5 z-[3] text-[11px] uppercase tracking-[0.14em] text-[var(--v-muted)]">
                {ABOUT.portraitCaption}
              </span>
            </div>

            <div className="mt-8">
              <h3 className="v-heading v-accent text-[11px] uppercase tracking-[0.16em]">
                {ABOUT.ledgerTitle}
              </h3>
              <dl className="mt-4 flex flex-col">
                {ABOUT.ledger.map((entry) => (
                  <div
                    key={entry.label}
                    className="flex flex-col gap-0.5 border-b border-[var(--v-line-soft)] py-3"
                  >
                    <dt className="v-heading text-[13px] text-[var(--v-fg)]">
                      {entry.label}
                    </dt>
                    <dd className="v-mono text-[11px] text-[var(--v-faint-2)]">{entry.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow>{ABOUT.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="v-display mt-6 text-balance text-[clamp(2rem,4.6vw,3.25rem)] text-[var(--v-fg)]">
              {ABOUT.headline}
            </h2>
          </Reveal>

          <div className="mt-8 flex flex-col gap-5">
            {ABOUT.paragraphs.map((paragraph, i) => (
              <Reveal key={paragraph.slice(0, 24)} delay={0.12 + i * 0.05}>
                <p className="max-w-xl text-pretty text-[15px] leading-relaxed text-[var(--v-muted)]">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.26}>
            <h3 className="v-display mt-16 text-[26px] text-[var(--v-fg)]">
              {ABOUT.experienceHeadline}
            </h3>
          </Reveal>

          <div className="relative mt-8">
            {/* Rail, inset by half a marker so it starts and ends on the
                first and last role rather than overshooting. */}
            <span
              aria-hidden
              className="absolute bottom-[22px] left-[5px] top-[22px] hidden w-px bg-[var(--v-line-soft)] sm:block"
            />

            <ol className="flex flex-col gap-10">
              {ABOUT.roles.map((role, i) => (
                <Reveal as="li" key={role.company} delay={i * 0.07}>
                  <div className="grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-5">
                    <span
                      aria-hidden
                      className={cn(
                        "relative z-10 mt-[7px] hidden size-[11px] shrink-0 rounded-full border-2 border-[var(--v-bg)] sm:block",
                        // Only the current role is lime. That is the entire
                        // signal — giving it to all three would say nothing.
                        role.current
                          ? "bg-[var(--v-accent)] shadow-[0_0_0_3px_var(--v-accent-dim)]"
                          : "bg-[var(--v-line-strong)]",
                      )}
                    />

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <h4 className="v-heading text-[16px] font-semibold text-[var(--v-fg)]">
                          {role.title}
                        </h4>
                        <span
                          className={cn(
                            "v-mono text-[11px] uppercase tracking-[0.1em]",
                            role.current ? "v-accent" : "text-[var(--v-fg)]",
                          )}
                        >
                          {role.period}
                        </span>
                      </div>

                      <p className="v-mono mt-1.5 text-[12px] text-[var(--v-faint)]">
                        {role.company} · {role.location}
                      </p>

                      <p className="mt-3 max-w-xl text-pretty text-[13.5px] leading-relaxed text-[var(--v-muted)]">
                        {role.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
}

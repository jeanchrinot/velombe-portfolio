import { ArrowUpRight } from "lucide-react";

import { AVAILABILITY, CONTACT } from "./data";
import { Eyebrow, Reveal, Section, ShimmerButton, StatusDot } from "./primitives";

/**
 * Closing CTA — a section that argues, then hands off to /hire rather
 * than trying to close the deal here. Used to be the deal-closer itself
 * (the raw address as the action, no form): that was the right call
 * before /hire existed to take the handoff. Now that it does, this
 * section's job is persuasion, not collection — the actual intake (name,
 * budget, timeline, project description) belongs on one page, not
 * duplicated onto every section that mentions getting in touch.
 */
export function VelombeContact() {
  return (
    <Section id="contact">
      <div className="relative overflow-hidden rounded-2xl border border-[var(--v-line)] bg-[var(--v-surface)] px-6 py-20 sm:px-12 sm:py-28">
        <div className="v-halo pointer-events-none absolute inset-0" aria-hidden />
        <div className="v-grid-lines pointer-events-none absolute inset-0" aria-hidden />

        <div className="relative z-10 flex flex-col items-start">
          {/* w-full because the parent is `flex flex-col items-start`, which
              shrinks children to content width — without it the marker's
              hairline collapses to the width of the word "Next". */}
          <Reveal className="w-full">
            <Eyebrow>{CONTACT.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="v-display mt-7 text-balance text-[clamp(2.25rem,6vw,4.5rem)] text-[var(--v-fg)]">
              {CONTACT.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-lg text-pretty text-[15px] leading-relaxed text-[var(--v-muted)]">
              {CONTACT.subhead}
            </p>
          </Reveal>

          <Reveal delay={0.24} className="mt-12">
            <ShimmerButton href="/hire" size="lg">
              {CONTACT.cta}
              <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </ShimmerButton>
          </Reveal>

          <Reveal delay={0.32}>
            <p className="v-heading mt-10 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] uppercase tracking-[0.14em] text-[var(--v-muted)]">
              <StatusDot className="text-[var(--v-accent)]" />
              <span className="text-[var(--v-muted)]">{AVAILABILITY.detail}</span>
              <span aria-hidden className="text-[var(--v-line)]">
                ·
              </span>
              {CONTACT.footnote}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

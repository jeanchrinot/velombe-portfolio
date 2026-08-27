"use client";

import { motion, useReducedMotion } from "motion/react";

import { BUILD } from "./data";
import { Reveal, Section, SectionHeader } from "./primitives";

/**
 * Answers the question a founder actually has — "do I have to write you a
 * spec?" — rather than reciting a generic discovery/design/build framework.
 *
 * Two connectors, one per layout.
 *
 * DESKTOP is a single rule across the row that draws itself: a 1px bar
 * scaled from `origin-left` on entry, with the step markers popping in
 * behind it. scaleX rather than an animated `width` keeps it on the
 * compositor; animating width would re-lay-out five columns every frame.
 *
 * MOBILE keeps the rule horizontal — the same rail, just restated once per
 * step. Each row runs edge to edge with its dot sitting on it; the step's
 * paragraph is what breaks the line before the next one picks it up.
 *
 * A vertical spine was the other option and it is worse twice over: it has
 * to run past every paragraph, so all the copy needs indenting to clear it,
 * and the connector then reads in a different direction from the desktop
 * one. Five horizontal rules stacked down the page still read as one
 * sequence, and they match both the desktop rule and the section eyebrows.
 */
export function VelombeBuild() {
  const reduced = useReducedMotion();

  return (
    <Section id="build">
      <SectionHeader
        eyebrow={BUILD.eyebrow}
        headline={BUILD.headline}
        subhead={BUILD.subhead}
      />

      <div className="relative">
        {/* Desktop rule. Hidden below lg, where the steps stack and a
            horizontal line would have nothing to connect — the per-dot
            ticks inside each step take over there. */}
        <div
          className="absolute inset-x-0 top-[5px] hidden h-px bg-[var(--v-line-soft)] lg:block"
          aria-hidden
        >
          <motion.div
            className="h-px origin-left bg-[var(--v-line-strong)]"
            initial={reduced ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        <ol className="grid gap-10 lg:grid-cols-5 lg:gap-6">
          {BUILD.steps.map((step, i) => (
            <Reveal as="li" key={step.num} delay={0.15 + i * 0.09}>
              <div className="flex items-center lg:block">
                {/* Leading stub. Negative margin equal to the Section's own
                    gutter (px-5, px-8 from sm) so the rule enters from the
                    page edge while the dot stays at x=0, flush with the
                    heading and body below it. Padding the dot inward
                    instead would break that alignment for the sake of 20px
                    of hairline. */}
                <span
                  aria-hidden
                  className="-ml-5 h-px w-5 shrink-0 bg-[var(--v-line)] sm:-ml-8 sm:w-8 lg:hidden"
                />

                {/* Lime stations on a zinc rule. Five marks would normally
                    blow the accent budget, but a repeated element in a
                    sequence reads as one object — a timeline — not five
                    separate signals. The rule itself stays zinc so the dots
                    are what the eye lands on. */}
                <span
                  aria-hidden
                  className="relative z-10 block size-[11px] shrink-0 rounded-full border-2 border-[var(--v-bg)] bg-[var(--v-accent)] shadow-[0_0_0_3px_var(--v-accent-dim)] lg:mb-7"
                />
                <span className="v-mono ml-3 text-[11px] tracking-[0.14em] text-[var(--v-faint-2)] lg:hidden">
                  {step.num}
                </span>

                {/* Trailing rule to the far edge. flex-1 rather than a
                    width, so it absorbs whatever the number leaves and the
                    five rows terminate on the same right edge. */}
                <span
                  aria-hidden
                  className="ml-3 h-px flex-1 bg-[var(--v-line)] lg:hidden"
                />
              </div>

              <div className="mt-4 lg:mt-0">
                <span className="v-mono hidden text-[11px] tracking-[0.14em] text-[var(--v-faint-2)] lg:block">
                  {step.num}
                </span>
                <h3 className="v-heading mt-2 text-[15px] font-semibold text-[var(--v-fg)]">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-pretty text-[13.5px] leading-relaxed text-[var(--v-muted)]">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { HERO, HERO_PORTRAIT } from "./data";
import {
  GhostButton,
  ShimmerButton,
  SlicedLines,
  VELOMBE_SPRING,
} from "./primitives";
import { VelombeTechStrip } from "./tech-strip";

/**
 * Portrait-led hero: text column left, a standing figure on the right whose
 * lower body dissolves into the page rather than stopping at an edge.
 *
 * The asset is the same transparent cut-out the main landing page uses, so
 * there is no background to blend away — only the bottom of the figure
 * needs dissolving, which `.v-portrait-blend` does with a single mask.
 * Pixels are removed rather than painted over, so the halo and grid behind
 * stay visible through the fade.
 *
 * ── Mobile ────────────────────────────────────────────────────────────
 * A 46% side column would leave the text about 190px wide on a phone, so
 * below `sm` the portrait leaves the background entirely and becomes a
 * block in normal flow, under the copy and standing on the tech strip — its
 * lower edge tucked behind that opaque band rather than stopping in mid-air.
 * It was a 18%-opacity wash behind the text before; a portrait you can
 * barely see is doing neither job. Full opacity, full figure, its own space.
 *
 * That is why `PortraitColumn` sits AFTER the text column in the markup —
 * DOM order is the mobile layout. From `sm` up the element goes absolute
 * and order stops mattering.
 */
export function VelombeHeroPortrait() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden pt-32 sm:pt-36"
    >
      <div className="v-halo pointer-events-none absolute inset-0" aria-hidden />
      <div className="v-grid-lines pointer-events-none absolute inset-0" aria-hidden />

      {/* pointer-events-none + a targeted re-enable on <a> tags: this div
          is w-full max-w-6xl, so its box spans the full section width —
          including the empty space on the right where the portrait sits —
          even though the visible text column only occupies the left 54%.
          At z-10 above the portrait's z-0, that empty area was capturing
          the hover meant for the image underneath before it ever reached
          it. The two CTAs are the only things in here that need to stay
          clickable. */}
      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8 [&_a]:pointer-events-auto">
        {/* Text never runs under the portrait: this column caps at 54% and
            the figure occupies the right 46%. */}
        <div className="max-w-xl lg:max-w-[54%]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...VELOMBE_SPRING, delay: 0.15 }}
            className="flex items-center gap-2.5"
          >
            <span
              aria-hidden
              className="size-[7px] shrink-0 bg-[var(--v-accent)]"
            />
            <span className="v-mono text-[12px] uppercase tracking-[0.18em] text-[var(--v-muted)] sm:text-[13px]">
              {HERO_PORTRAIT.signature}
            </span>
            <span aria-hidden className="text-[var(--v-line-strong)]">
              /
            </span>
            <span className="v-mono text-[12px] uppercase tracking-[0.18em] text-[var(--v-faint)] sm:text-[13px]">
              {HERO_PORTRAIT.signatureRole}
            </span>
          </motion.p>

          <h1 className="v-display mt-9 text-[clamp(2rem,4.6vw,3.75rem)] text-[var(--v-fg)]">
            {/* Stable text for assistive tech and crawlers. The rotator is
                decorative and hidden from both. */}
            <span className="sr-only">{HERO.headlineSr}</span>
            <RotatingClaim />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...VELOMBE_SPRING, delay: 0.5 }}
            className="mt-10 max-w-lg text-pretty text-[15px] leading-relaxed text-[var(--v-muted)]"
          >
            {HERO_PORTRAIT.intro.map((segment) => (
              <span
                key={segment.text.slice(0, 24)}
                className={cn(
                  "accent" in segment && segment.accent && "v-accent",
                )}
              >
                {segment.text}
              </span>
            ))}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...VELOMBE_SPRING, delay: 0.6 }}
            // flex-wrap, not flex-col-then-row: the two pills fit side by
            // side at 360px, and stacking them by default spends a whole
            // row of a phone hero on a break nothing asked for. They wrap
            // when they genuinely run out of room and not before.
            className="mt-10 flex flex-wrap gap-3"
          >
            <ShimmerButton href="#work">
              {HERO.primaryCta}
              <ArrowDownRight className="size-4" strokeWidth={1.5} />
            </ShimmerButton>
            <GhostButton href="#contact">
              {HERO.secondaryCta}
              <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </GhostButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="v-mono mt-8 text-[11px] uppercase tracking-[0.14em] text-[var(--v-faint-2)]"
          >
            {HERO_PORTRAIT.footnote}
          </motion.p>
        </div>
      </div>

      <PortraitColumn />

      <VelombeTechStrip />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Portrait column

   The asset is the same transparent cut-out the main landing page uses, so
   the treatment matches it: `object-contain` (never crop a cut-out — there
   is no spare background to lose) anchored to the top, with the bottom of
   the figure dissolved by `.v-portrait-blend`.

   From `sm` up the column starts BELOW the nav rather than at `inset-y-0`.
   Top-anchored inside a full-height column would put the head behind the
   fixed navbar.

   On phones the same element is a normal-flow block instead: `relative`,
   full width, holding open the asset's own 801:1075 so the figure is never
   cropped or letterboxed. `fill` needs a sized positioned box, and an
   aspect-ratio is what supplies the height without hardcoding pixels.

   `sm:aspect-auto` matters — without it the ratio would keep fighting the
   `top`/`bottom` pair for the column's height at every breakpoint above.
────────────────────────────────────────────────────────────────────────── */

function PortraitColumn() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      aria-hidden
      className={cn(
        "v-portrait-blend pointer-events-none z-0",
        // Phone: a block under the copy, at its natural proportions.
        // The negative bottom margin is the tuck: the tech strip follows
        // immediately (its own top margin is off below `sm`) and paints at
        // z-10 over an opaque zinc-950 band, so it covers the last 56px of
        // the box. `.v-portrait-blend` is already fading the figure out
        // across that stretch, so the band meets a soft edge, not a crop —
        // the tuck only guarantees the PNG's straight bottom edge can never
        // surface on a narrow screen where the box is shorter.
        "relative mt-10 -mb-14 aspect-[801/1075] w-[86%] self-center",
        // Tablet up: back to the side column behind the text.
        "sm:absolute sm:bottom-0 sm:right-0 sm:top-24",
        "sm:mb-0 sm:mt-0 sm:aspect-auto sm:w-[52%] sm:self-auto lg:w-[46%]",
      )}
    >
      <Image
        src={HERO_PORTRAIT.image.src}
        // Decorative here — the accessible name is carried by the signature
        // line and the H1. An alt on a background portrait just makes screen
        // readers announce the same person twice.
        alt=""
        fill
        sizes="(max-width: 640px) 86vw, 50vw"
        priority
        // pointer-events-auto overrides the wrapper's own pointer-events-
        // none just for this element — a child can re-enable hit-testing
        // even under a disabled ancestor, so the rest of the column stays
        // click-through while the image itself can still catch a hover.
        className="pointer-events-auto object-contain object-top grayscale transition-[filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:grayscale-0"
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Rotating claim

   `mode="wait"` so the outgoing sentence finishes slicing apart before the
   next slices in — overlapping two display-scale sentences mid-swap is
   unreadable.

   The wrapper reserves 1.88em (two lines at the 0.94 display leading) and
   the sentence is absolutely positioned inside it, so the swap can never
   move anything below it. Index starts at 0 so server and first client
   render agree; rotation begins after mount.
────────────────────────────────────────────────────────────────────────── */

const ROTATE_MS = 3600;

function RotatingClaim() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % HERO.rotating.length),
      ROTATE_MS,
    );
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <span aria-hidden className="relative block min-h-[1.88em]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={index} className="absolute inset-x-0 top-0 block">
          <SlicedLines lines={HERO.rotating[index]} />
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

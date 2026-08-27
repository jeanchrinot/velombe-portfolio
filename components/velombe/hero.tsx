"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { HERO } from "./data";
import {
  Eyebrow,
  GhostButton,
  ShimmerButton,
  SlicedLines,
  VELOMBE_SPRING,
} from "./primitives";
import { VelombeTechStrip } from "./tech-strip";

/**
 * Three-row editorial hero: portrait and rotating claim, specimen line, then
 * a split base of argument (left) and evidence (right).
 *
 * The pinned-scroll variant lives in hero-pinned.tsx and is parked — see the
 * note at the top of that file.
 *
 * The role line is static rather than a rotator: this row is the recruiter's
 * five-second answer, and text that changes while you read it is worse at
 * that job than text that does not.
 */
export function VelombeHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden pt-32 sm:pt-36"
    >
      <div className="v-halo pointer-events-none absolute inset-0" aria-hidden />
      <div className="v-grid-lines pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* Same marker as every section opener — square, label, rule. The
            hero used to get its own pill; one marker language across the
            whole page is worth more than a bespoke one here. The live
            "Available" pulse still exists in the nav and at Contact, so the
            status signal is not lost by dropping the dot. */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...VELOMBE_SPRING, delay: 0.15 }}
        >
          <Eyebrow>{HERO.eyebrow}</Eyebrow>
        </motion.div>

        {/* Row 1 — claim left, portrait right. `flex-col-reverse` puts the
            portrait ABOVE the text on mobile while keeping it after the
            heading in the DOM, so reading order stays heading-first. */}
        <div className="mt-9 flex flex-col-reverse gap-8 sm:flex-row sm:items-center sm:gap-12">
          <div className="min-w-0 flex-1">
            <h1 className="v-display text-[clamp(2.25rem,5.6vw,4.5rem)] text-[var(--v-fg)]">
              {/* Stable text for assistive tech and crawlers. The rotator
                  below is decorative and hidden from both. */}
              <span className="sr-only">{HERO.headlineSr}</span>
              <RotatingClaim />
            </h1>

            <p className="v-heading mt-5 text-[clamp(1rem,2vw,1.35rem)] font-medium text-[var(--v-faint)]">
              {HERO.tagline}
            </p>
          </div>

          <Portrait />
        </div>

        {/* Row 2 — the specimen line. Who, what, where, available: the four
            facts a recruiter scans for, on one rule. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-[var(--v-line)] py-4"
        >
          {HERO.specimen.map((item, i) => (
            <span key={item} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden className="text-[var(--v-line-strong)]">
                  ·
                </span>
              )}
              <span
                className={cn(
                  "v-mono text-[12px] sm:text-[13px]",
                  i === 0 ? "text-[var(--v-fg)]" : "text-[var(--v-muted)]",
                )}
              >
                {item}
              </span>
            </span>
          ))}
        </motion.div>

        {/* Row 3 — argument left, evidence right. */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...VELOMBE_SPRING, delay: 0.55 }}
          >
            <p className="max-w-xl text-pretty text-[15px] leading-relaxed text-[var(--v-muted)] sm:text-base">
              {HERO.subhead}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ShimmerButton href="#work">
                {HERO.primaryCta}
                <ArrowDownRight className="size-4" strokeWidth={1.5} />
              </ShimmerButton>
              <GhostButton href="#contact">
                {HERO.secondaryCta}
                <ArrowUpRight className="size-4" strokeWidth={1.5} />
              </GhostButton>
            </div>
          </motion.div>

          {/* Ledger. gap-px over a zinc-800 ground gives true hairlines
              between cells — `divide-*` on a grid puts a border on the
              first cell of every row, which reads as a stray outer edge. */}
          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...VELOMBE_SPRING, delay: 0.65 }}
            className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-xl bg-[var(--v-line)]/80"
          >
            {HERO.ledger.map((entry) => (
              <div
                key={entry.label}
                className="flex flex-col gap-1 bg-[var(--v-bg)]/80 p-5 backdrop-blur-sm"
              >
                <dd
                  className={cn(
                    "v-mono text-[26px] font-medium leading-none",
                    // Exactly one lime value in this band.
                    "spotlight" in entry && entry.spotlight
                      ? "v-accent"
                      : "text-[var(--v-fg)]",
                  )}
                >
                  {entry.value}
                </dd>
                <dt className="v-heading text-[11px] leading-snug text-[var(--v-faint)]">
                  {entry.label}
                </dt>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      <VelombeTechStrip />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Portrait — squircle with a hard lime shadow

   Square crop of a 3:4 source. `object-cover` fills the width and takes the
   top 75% of the frame's height; `object-position: center 10%` nudges it
   down just enough to leave headroom above the hair without pulling the
   chest crop up past the shoulders — head and shoulders, not a torso with a
   head balanced on top.

   The shadow is a HARD offset, not a blur: `12px 12px 0 0` leaves a crisp
   L of solid lime along two edges. A blurred lime glow at this size would
   read as a neon halo and drag the whole page toward crypto-landing; a flat
   offset reads as print registration, which is the register this template
   is in.

   It is the largest single lime mark in the design — deliberately, since
   this is the one element that has to carry the first impression. It also
   means the eyebrow above is the only other accent in the frame, so the
   hero spends its whole budget in two places instead of five.

   On hover the card presses into its own shadow: offset halves, card
   translates by the difference, so the two meet.
────────────────────────────────────────────────────────────────────────── */

function Portrait() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ ...VELOMBE_SPRING, delay: 0.25 }}
      className={cn(
        "relative size-40 shrink-0 overflow-hidden rounded-[2rem] ring-1 ring-[var(--v-line)] sm:size-48 lg:size-56",
        "shadow-[12px_12px_0_0_var(--v-accent)]",
        "transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:translate-x-1.5 hover:translate-y-1.5 hover:shadow-[6px_6px_0_0_var(--v-accent)]",
      )}
    >
      <Image
        src={HERO.portrait.src}
        alt={HERO.portrait.alt}
        fill
        sizes="224px"
        priority
        className="object-cover object-[center_10%]"
      />
      {/* Bottom-weighted scrim so the crop sits on the page rather than
          floating as a bright rectangle against zinc-950. */}
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[var(--v-bg)]/45 via-transparent to-transparent"
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Rotating claim

   `mode="wait"` so the outgoing sentence finishes slicing apart before the
   next one slices in — overlapping two display-scale sentences mid-swap is
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

  // min-h is 1.88em = two lines at the 0.94 display leading.
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

"use client";

/* ⚠ PARKED — not rendered. Kept because the pinned-scroll hero is a good
   idea that needs more than a regroup of the existing copy to land: it wants
   copy written FOR the sequence (a line per layer that only makes sense in
   order) and probably an asset per layer, rather than the static hero's
   blocks redistributed across frames.

   The static hero in hero.tsx is what ships. To try this again, import
   VelombeHeroPinned in the page instead. Its extra copy lives in
   HERO.greeting / HERO.closing / HERO.sceneLabels in data.ts.
*/


import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { HERO } from "./data";
import {
  GhostButton,
  ShimmerButton,
  SlicedLines,
  StatusDot,
  VELOMBE_SPRING,
} from "./primitives";
import { VelombeTechStrip } from "./tech-strip";

/* ═════════════════════════════════════════════════════════════════════════
   PINNED HERO SEQUENCE

   A tall section whose inner container is `sticky`, so it stays fixed while
   the page scrolls through it. Scroll progress across that section drives
   two layers that hand off to each other — the first fades and lifts out as
   the second fades and lifts in over the top.

   Narrative: intro (who + what) → proof (evidence + ask).

   Two, not four. Four scenes split the same content four ways and each one
   read as an underfilled slide with a lot of empty frame around it. Two
   dense compositions fill the viewport and still give the handoff.

   ── The tradeoff, stated plainly ──────────────────────────────────────
   This costs some instant scannability — the ledger and the CTAs now sit
   one scroll down rather than in the first frame. Layer 1 still answers
   who, what and available on landing, which is most of the five-second
   test; the rail shows there are only two layers; and the nav is fixed
   with Work always reachable.

   ── Degradation ───────────────────────────────────────────────────────
   With `prefers-reduced-motion`, the pin is dropped entirely: the section
   goes `h-auto`, the container goes `static`, and the layers stack in
   normal flow as two ordinary blocks. Same DOM, same content, no scroll
   choreography — which is the correct fallback, not an approximation of it.
   Nothing here is content-bearing motion.
   ═════════════════════════════════════════════════════════════════════ */

const SCENES = 2;

/** Scroll height per layer. Two layers of 110vh = a 220vh pin. */
const SCENE_VH = 110;

export function VelombeHeroPinned() {
  const ref = useRef<HTMLElement>(null);

  // "start start" → progress 0 when the section top meets the viewport top;
  // "end end" → progress 1 when its bottom meets the viewport bottom. That
  // window is exactly the span over which the inner container stays pinned.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <section
        id="top"
        ref={ref}
        className="relative motion-reduce:h-auto"
        style={{ height: `${SCENES * SCENE_VH}vh` }}
      >
        <div className="sticky top-0 h-svh overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:overflow-visible">
          <div className="v-halo pointer-events-none absolute inset-0" aria-hidden />
          <div
            className="v-grid-lines pointer-events-none absolute inset-0"
            aria-hidden
          />

          <div className="relative mx-auto h-full w-full max-w-6xl px-5 sm:px-8">
            <Scene index={0} progress={scrollYProgress}>
              <Intro />
            </Scene>
            <Scene index={1} progress={scrollYProgress}>
              <Proof />
            </Scene>
          </div>

          <ProgressRail progress={scrollYProgress} />
        </div>
      </section>

      <VelombeTechStrip />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Scene

   Each layer owns a 1/SCENES slice of progress and animates across it:
   fade+lift in over the first third, hold, fade+lift out over the last
   third. The first scene skips its entrance (it must be readable before any
   scrolling happens) and the last skips its exit (nothing follows it inside
   the pin).

   `pointerEvents` is driven off the same value: an invisible scene sitting
   on top of a visible one would otherwise swallow every click meant for the
   scene below, and its links would still be tab-reachable.
────────────────────────────────────────────────────────────────────────── */

function Scene({
  index,
  progress,
  children,
}: {
  index: number;
  progress: MotionValue<number>;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();

  const start = index / SCENES;
  const end = (index + 1) / SCENES;
  const fade = (end - start) * 0.34;

  const isFirst = index === 0;
  const isLast = index === SCENES - 1;

  const stops = [
    isFirst ? 0 : start,
    isFirst ? 0 : start + fade,
    isLast ? 1 : end - fade,
    isLast ? 1 : end,
  ];

  const opacity = useTransform(progress, stops, [
    isFirst ? 1 : 0,
    1,
    1,
    isLast ? 1 : 0,
  ]);
  const y = useTransform(progress, stops, [
    isFirst ? 0 : 48,
    0,
    0,
    isLast ? 0 : -48,
  ]);
  const scale = useTransform(progress, stops, [
    isFirst ? 1 : 0.97,
    1,
    1,
    isLast ? 1 : 0.97,
  ]);
  const pointerEvents = useTransform(opacity, (o) =>
    o > 0.6 ? "auto" : "none",
  );

  return (
    <motion.div
      style={reduced ? undefined : { opacity, y, scale, pointerEvents }}
      className={cn(
        "absolute inset-0 flex flex-col justify-center will-change-[transform,opacity]",
        // Unpinned fallback: normal flow, two stacked blocks.
        "motion-reduce:static motion-reduce:py-24",
      )}
    >
      {children}
    </motion.div>
  );
}

/* ── Layer 1 · Intro ──────────────────────────────────────────────────────
   Identity and claim in one composition: portrait row on top, hairline,
   then the rotating claim at display scale. Four thinner scenes each read
   as an underfilled slide; two dense ones fill the frame and still hand off.
────────────────────────────────────────────────────────────────────────── */

function Intro() {
  return (
    <div className="flex flex-col gap-9 sm:gap-11">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
        <Portrait />

        <div className="min-w-0">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...VELOMBE_SPRING, delay: 0.15 }}
            className="v-heading inline-flex items-center gap-2.5 rounded-full border border-zinc-800 bg-zinc-900/60 py-1.5 pl-2.5 pr-4 text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-400 backdrop-blur-md"
          >
            <StatusDot className="text-[var(--v-accent)]" />
            {HERO.eyebrow}
          </motion.span>

          <p className="v-mono mt-6 text-[13px] text-zinc-500">
            {HERO.greeting.hello}
          </p>

          <h1 className="v-display mt-1.5 text-[clamp(2rem,5.2vw,3.5rem)] text-white">
            {/* The stable H1. The rotating claims below are aria-hidden
                decoration, so this is the heading crawlers and screen
                readers actually get. */}
            <span className="sr-only">{HERO.headlineSr}</span>
            <span aria-hidden>
              <SlicedLines lines={[HERO.greeting.name]} />
            </span>
          </h1>

          <p className="v-mono mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-zinc-400 sm:text-[13px]">
            {HERO.greeting.role}
            <span aria-hidden className="text-zinc-700">
              ·
            </span>
            <span className="text-zinc-500">{HERO.greeting.location}</span>
          </p>
        </div>
      </div>

      <span aria-hidden className="block h-px w-full bg-zinc-800" />

      <div>
        <p className="v-display text-[clamp(1.9rem,5vw,4rem)] text-white">
          <RotatingClaim />
        </p>
        <p className="v-heading mt-6 text-[clamp(0.95rem,1.8vw,1.25rem)] font-medium text-zinc-500">
          {HERO.tagline}
        </p>
      </div>
    </div>
  );
}

/* ── Layer 2 · Proof ──────────────────────────────────────────────────────
   Evidence on top, invitation underneath, separated by a rule. Reading
   order matters here: the ledger has to land before the ask.
────────────────────────────────────────────────────────────────────────── */

function Proof() {
  return (
    <div className="flex flex-col gap-9 sm:gap-11">
      <div className="grid gap-9 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
        <p className="max-w-xl text-pretty text-[15px] leading-relaxed text-zinc-400 sm:text-[17px] sm:leading-relaxed">
          {HERO.subhead}
        </p>

        {/* gap-px over a zinc-800 ground gives true hairlines between cells —
            `divide-*` on a grid puts a border on the first cell of every
            row, which reads as a stray outer edge. */}
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-zinc-800/80">
          {HERO.ledger.map((entry) => (
            <div
              key={entry.label}
              className="flex flex-col gap-1 bg-zinc-950/80 p-5 backdrop-blur-sm"
            >
              <dd
                className={cn(
                  "v-mono text-[26px] font-medium leading-none",
                  // Exactly one lime value in this band.
                  "spotlight" in entry && entry.spotlight
                    ? "v-accent"
                    : "text-white",
                )}
              >
                {entry.value}
              </dd>
              <dt className="v-heading text-[11px] leading-snug text-zinc-500">
                {entry.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>

      <span aria-hidden className="block h-px w-full bg-zinc-800" />

      <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <h2 className="v-display max-w-md text-balance text-[clamp(1.6rem,3.4vw,2.6rem)] text-white">
          {HERO.closing.headline}
        </h2>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <ShimmerButton href="#work">
            {HERO.primaryCta}
            <ArrowDownRight className="size-4" strokeWidth={1.5} />
          </ShimmerButton>
          <GhostButton href="#contact">
            {HERO.secondaryCta}
            <ArrowUpRight className="size-4" strokeWidth={1.5} />
          </GhostButton>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        {HERO.specimen.map((item, i) => (
          <span key={item} className="flex items-center gap-3">
            {i > 0 && (
              <span aria-hidden className="text-zinc-700">
                ·
              </span>
            )}
            <span
              className={cn(
                "v-mono text-[12px]",
                i === 0 ? "text-white" : "text-zinc-500",
              )}
            >
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Progress rail

   One tick per layer on the right edge, each filling with lime across its
   own slice of progress. Not decoration: a pinned section hijacks the
   scroll, and without a visible end-point people cannot tell whether they
   are two beats from the end or twenty. Hidden when the pin is off.
────────────────────────────────────────────────────────────────────────── */

function ProgressRail({ progress }: { progress: MotionValue<number> }) {
  return (
    <div
      aria-hidden
      className="absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col gap-3 motion-reduce:!hidden lg:flex"
    >
      {HERO.sceneLabels.map((label, i) => (
        <RailTick key={label} index={i} progress={progress} />
      ))}
    </div>
  );
}

function RailTick({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  const scaleY = useTransform(
    progress,
    [index / SCENES, (index + 1) / SCENES],
    [0, 1],
  );

  return (
    <span className="relative block h-10 w-px overflow-hidden bg-zinc-800">
      <motion.span
        style={{ scaleY }}
        className="absolute inset-0 block origin-top bg-[var(--v-accent)]"
      />
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Portrait

   Square crop of a 3:4 source. `object-cover` fills the width and takes the
   top 75% of the frame's height; `object-position: center 10%` nudges it
   down just enough to leave headroom above the hair without pulling the
   chest crop up past the shoulders. Net result is head-and-shoulders, which
   is what a circle wants — a full-body source in a circle crops to a torso
   with a head balanced on the rim.

   Ring is zinc, not lime. The availability dot sits close by, and two lime
   marks that near each other stop reading as a signal and start reading as
   a colour scheme.
────────────────────────────────────────────────────────────────────────── */

function Portrait() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...VELOMBE_SPRING, delay: 0.25 }}
      className="relative size-28 shrink-0 overflow-hidden rounded-full ring-1 ring-zinc-800 sm:size-40 lg:size-48"
    >
      <Image
        src={HERO.portrait.src}
        alt={HERO.portrait.alt}
        fill
        sizes="192px"
        priority
        className="object-cover object-[center_10%]"
      />
      {/* Bottom-weighted scrim so the circle sits on the page rather than
          floating as a bright disc against zinc-950. */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-gradient-to-t from-zinc-950/45 via-transparent to-transparent"
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

"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Transition,
} from "motion/react";

import { cn } from "@/lib/utils";
import { scrollToHash } from "./smooth-scroll";

/* ─────────────────────────────────────────────────────────────────────────
   Shared spring. Every reveal and every magnetic pull runs on this curve —
   a single physical "weight" is most of what makes a page feel authored.
────────────────────────────────────────────────────────────────────────── */
export const SPRING: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.9,
};

/* ── Reveal ───────────────────────────────────────────────────────────── */

const REVEAL_TAGS = {
  div: motion.div,
  li: motion.li,
  span: motion.span,
} as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: keyof typeof REVEAL_TAGS;
}) {
  const reduced = useReducedMotion();
  const Tag = REVEAL_TAGS[as];

  return (
    <Tag
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </Tag>
  );
}

/* ── Text mask reveal ─────────────────────────────────────────────────────
   One clipping frame per line, with the line sliding up out of it. The frame
   needs `overflow-hidden` plus vertical slack, or descenders (g, y, p) get
   shaved at rest — the classic bug in this effect. `pb-[0.16em]
   -mb-[0.16em]` buys the room back without changing the line box.
────────────────────────────────────────────────────────────────────────── */

export function MaskedLines({
  lines,
  className,
  delay = 0,
  stagger = 0.09,
}: {
  lines: readonly string[];
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <span className={cn("block", className)}>
      {lines.map((line, i) => (
        <span key={line} className="-mb-[0.16em] block overflow-hidden pb-[0.16em]">
          <motion.span
            className="block"
            initial={reduced ? false : { y: "108%" }}
            animate={{ y: "0%" }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 22,
              mass: 1,
              delay: delay + i * stagger,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ── Sliced text reveal ───────────────────────────────────────────────────
   The line is cut horizontally and the two halves fly in from opposite
   directions to meet on the cut. Known as a sliced / split reveal.

   How it works: the text is rendered three times in the same box — once
   invisibly to establish the line box, then twice more, absolutely stacked
   and each clipped to one half by `clip-path`. Because `transform` applies
   *after* clipping, translating a clipped copy moves its visible sliver too,
   so the top half of the glyphs genuinely slides down from above while the
   bottom half slides up from below.

   Two details that are easy to get wrong:

   1. The cut sits at 44%, not 50%. The container carries `pb-[0.14em]` of
      descender slack, so the glyph midline is above the box midline — a 50%
      cut visibly slices through the bottom of the letterforms.
   2. The halves OVERLAP by 4%. Exactly complementary clips leave a hairline
      seam at fractional pixel heights, which reads as a crack across the
      word at some viewport widths.
────────────────────────────────────────────────────────────────────────── */

const SLICE = {
  /** visible 0 → 46% */
  top: { clipPath: "inset(0% 0% 54% 0%)", from: "-105%" },
  /** visible 42% → 100% */
  bottom: { clipPath: "inset(42% 0% 0% 0%)", from: "105%" },
} as const;

export function SlicedLines({
  lines,
  className,
  stagger = 0.07,
  duration = 0.75,
}: {
  lines: readonly string[];
  className?: string;
  stagger?: number;
  duration?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <span className={cn("block", className)}>
      {lines.map((line, i) => (
        <span
          key={line}
          className="relative -mb-[0.14em] block overflow-hidden pb-[0.14em]"
        >
          {/* Sizer. Holds the line box open so the two absolute halves have
              something to be `inset-0` against. */}
          <span className="invisible block" aria-hidden>
            {line}
          </span>

          {(["top", "bottom"] as const).map((half) => (
            <motion.span
              key={half}
              className="absolute inset-0 block"
              style={{ clipPath: SLICE[half].clipPath }}
              initial={reduced ? { y: "0%" } : { y: SLICE[half].from }}
              animate={{ y: "0%" }}
              exit={reduced ? { y: "0%" } : { y: SLICE[half].from }}
              transition={{
                duration,
                ease: [0.16, 1, 0.3, 1],
                delay: i * stagger,
              }}
            >
              {line}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}

/* ── Magnetic ─────────────────────────────────────────────────────────── */

export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.5 });

  const onMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.span>
  );
}

/* ── Buttons ──────────────────────────────────────────────────────────── */

type ButtonProps = {
  children: ReactNode;
  href?: string;
  className?: string;
  size?: "md" | "lg";
  external?: boolean;
};

const SIZE = {
  md: "h-10 px-5 text-[13px]",
  lg: "h-12 px-7 text-sm",
} as const;

/**
 * Primary CTA — white, not lime. A lime button would spend most of the
 * accent budget on a single element, and white on zinc-950 is the highest
 * contrast pair available. See the budget note at the top of portfolio.css.
 */
export function ShimmerButton({
  children,
  href = "#",
  className,
  size = "lg",
  external,
}: ButtonProps) {
  const cls = cn(
    "v-shimmer v-heading group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--v-cta-bg)] font-semibold text-[var(--v-cta-fg)]",
    "transition-[transform,box-shadow] duration-300 hover:shadow-[0_8px_40px_-8px_var(--v-cta-glow)]",
    SIZE[size],
    className,
  );

  // External destinations aren't in this app's route tree — Link has
  // nothing to prefetch and no client-side transition to perform, so a
  // plain anchor is the correct element, not a stylistic choice.
  if (external) {
    return (
      <Magnetic strength={0.3}>
        <a href={href} target="_blank" rel="noreferrer" className={cls}>
          {children}
        </a>
      </Magnetic>
    );
  }

  return (
    <Magnetic strength={0.3}>
      <Link href={href} onClick={anchorHandler(href)} className={cls}>
        {children}
      </Link>
    </Magnetic>
  );
}

/** Secondary CTA — hairline ghost pill, lime only on the border at hover. */
export function GhostButton({
  children,
  href = "#",
  className,
  size = "lg",
  external,
}: ButtonProps) {
  const cls = cn(
    "v-heading inline-flex items-center justify-center gap-2 rounded-full border border-[var(--v-line)] bg-[var(--v-surface)]/40 font-medium text-[var(--v-muted)] backdrop-blur-md",
    "transition-colors duration-300 hover:border-[var(--v-accent-line)] hover:bg-[var(--v-surface)] hover:text-[var(--v-fg)]",
    SIZE[size],
    className,
  );

  if (external) {
    return (
      <Magnetic strength={0.3}>
        <a href={href} target="_blank" rel="noreferrer" className={cls}>
          {children}
        </a>
      </Magnetic>
    );
  }

  return (
    <Magnetic strength={0.3}>
      <Link href={href} onClick={anchorHandler(href)} className={cls}>
        {children}
      </Link>
    </Magnetic>
  );
}

/**
 * An in-page anchor that routes through the inertial scroller.
 *
 * Server components cannot call `anchorHandler` — it is a function exported
 * from a "use client" module, and invoking it during a server render throws
 * "Attempted to call anchorHandler() from the server". They render this
 * instead: a client component is a legal child of a server component, a
 * client *function call* is not.
 */
export function ScrollLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} onClick={anchorHandler(href)} className={className}>
      {children}
    </Link>
  );
}

/** "/en" is home; "/en/work/twy" is not. Locale-agnostic on purpose — it
 *  reads the segment count, not the locale value. Exported so nav.tsx's
 *  mobile menu — which needs the same off-home fallback for a click
 *  handler that also has to close the sheet — doesn't duplicate it. */
export function isHomePath(pathname: string): boolean {
  return pathname.split("/").filter(Boolean).length <= 1;
}

/**
 * Routes in-page hashes through the inertial scroller — but only when the
 * hash actually resolves on the current page.
 *
 * Two href shapes reach this function. A bare `"#section"` comes from
 * components that only ever render on the home page (the hero, the
 * contact CTA) — always same-page, always intercepted. A path-qualified
 * `"/#section"` comes from nav and footer, which render on every page in
 * this route group via layout.tsx — including case study pages that have
 * no `#section` to scroll to. Intercepting unconditionally there used to
 * mean clicking "Work" from a case study silently did nothing: `document.
 * querySelector("#work")` found nothing and `scrollToHash` returned
 * early.
 *
 * The fix has to run at click time, not render time — this function runs
 * during render (`onClick={anchorHandler(href)}`), where `window` isn't
 * available during the server pass a "use client" component still gets.
 * So a path-qualified href always gets a handler back; the handler itself
 * checks `window.location.pathname` when it actually fires. Off the home
 * page it simply returns without calling `preventDefault()`, which leaves
 * Link's own click handling to run — a real navigation to "/", after
 * which the browser's native hash-scroll lands on the target.
 */
export function anchorHandler(href: string) {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1 || href === "#") return undefined;

  const path = href.slice(0, hashIndex);
  const hash = href.slice(hashIndex);

  return (e: React.MouseEvent) => {
    if (path && !isHomePath(window.location.pathname)) return;
    e.preventDefault();
    scrollToHash(hash);
  };
}

/* ── Section chrome ───────────────────────────────────────────────────── */

/**
 * Section marker: a lime square, the label in zinc, a hairline beneath.
 *
 * Lime here is one of the budgeted accent uses, and it earns it by being
 * wayfinding rather than decoration — exactly one per section, always at
 * the top, so the accent becomes the "new section starts here" signal as
 * you scroll.
 *
 * All of the lime is in the 7px square; the type stays zinc. A pill that
 * tinted border, background and text together read as a badge — something
 * clickable — instead of typographic punctuation. The rule beneath does
 * what the pill's border was doing: separating the marker from the display
 * headline under it.
 *
 * The rule spans its container, so it runs the width of whatever column it
 * sits in — a section divider rather than an underline, which is the point.
 * That does mean it is a different length per section; that variation is
 * wanted, not a bug.
 *
 * Inside a shrink-to-fit parent (a `flex ... items-start` column, say) give
 * the wrapper `w-full`, or the rule collapses to the text width.
 *
 * This is NOT the hero's availability pill — that one is a status
 * indicator with its own lime dot, and lives inline in hero.tsx.
 */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="block">
      <span className="flex items-center gap-2.5">
        <span aria-hidden className="size-[7px] shrink-0 bg-[var(--v-accent)]" />
        <span className="v-heading text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--v-muted)]">
          {children}
        </span>
      </span>
      <span aria-hidden className="mt-3.5 block h-px w-full bg-[var(--v-line)]" />
    </span>
  );
}

/**
 * Live-status dot. The lime is `currentColor`, so the same markup serves
 * lime-on-dark in the hero and dark-on-lime inside a white pill — one of the
 * budgeted accent uses, and the one that most reliably reads as "live".
 */
export function StatusDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex size-1.5", className)} aria-hidden>
      <span className="v-pulse-ring absolute inline-flex size-full rounded-full bg-current" />
      <span className="relative inline-flex size-1.5 rounded-full bg-current" />
    </span>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative px-5 py-24 sm:px-8 md:py-32", className)}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

/**
 * PARKED — not rendered. The page imported this between work / build /
 * about / depth / contact; the sliding treatment was not right and the
 * seams are back to plain whitespace until a better idea turns up. Kept
 * because the geometry below took several passes to fit and the file is
 * uncommitted, so deleting it would lose it for good. Re-adding is one
 * import and four lines in the page.
 *
 * ──────────────────────────────────────────────────────────────────────
 * Vertical hairline in the seam between two sections, with a solid lime
 * segment sliding up and down it.
 *
 * ── Why it costs nothing in height ────────────────────────────────────
 * `h-24 -my-12` — 96px tall, pulled 48px into the padding on either side,
 * so it contributes exactly 0 to the page. The gap between sections is
 * unchanged; the middle half of it now has a spine. Sections keep their
 * own `py-24 md:py-32` and know nothing about this.
 *
 * ── Why there is no overflow clipping ─────────────────────────────────
 * The snake is a third of the track and travels exactly 200% of its own
 * height: 32px moving 64px inside 96px lands flush at both ends and never
 * leaves the box. Nothing to clip.
 *
 * That is also what lets the head have width. `overflow-hidden` on a
 * 1px-wide track would shave an 11px head down to the width of the line —
 * the clip applies on both axes, and only the vertical one was ever
 * wanted. Instead the box is 11px wide with the 1px rail centred in it by
 * flex, and the snake spans the full 11px.
 *
 * ── Turning around ────────────────────────────────────────────────────
 * The head has to point where it is going, so it swaps ends at each turn.
 * `scaleY(-1)` does that with one element — the silhouette is symmetric
 * left-to-right, so flipping it vertically is a clean about-face.
 *
 * The flip is a keyframe of its own rather than something derived from
 * velocity: `y` and `scaleY` share a `times` array, so the turn happens at
 * exactly the moment travel stops and never drifts out of phase with it.
 * It runs 4% of the cycle — about 200ms — which is long enough to read as
 * the head coming about and short enough that passing through scaleY 0
 * looks like a turn rather than a dropped frame.
 */
export function SectionRule() {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className="-my-12 flex h-24 justify-center">
      <div className="relative flex h-full w-[11px] justify-center">
        <span className="h-full w-px bg-[var(--v-line)]" />

        <motion.span
          className="v-snake absolute inset-x-0 top-0 block h-1/3 bg-[var(--v-accent)]"
          // Parked mid-rail under reduced motion rather than dropped: the
          // mark is part of the seam's design, only its travel is
          // decorative. The blanket rule at the foot of portfolio.css cannot
          // help here — it collapses CSS animation durations, and this is
          // a JS transform.
          animate={
            reduced
              ? { y: "100%", scaleY: 1 }
              : {
                  y: ["0%", "200%", "200%", "0%", "0%"],
                  scaleY: [1, 1, -1, -1, 1],
                }
          }
          transition={
            reduced
              ? { duration: 0 }
              : {
                  duration: 5.2,
                  times: [0, 0.46, 0.5, 0.96, 1],
                  ease: "easeInOut",
                  repeat: Infinity,
                }
          }
        />
      </div>
    </div>
  );
}

/** Asymmetric section opener — eyebrow and title left, support line right. */
export function SectionHeader({
  eyebrow,
  headline,
  subhead,
  action,
}: {
  eyebrow: string;
  headline: string;
  subhead?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-14 grid gap-8 md:grid-cols-2 md:items-end md:gap-16">
      <div>
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="v-display mt-6 text-balance text-[clamp(2rem,4.6vw,3.25rem)] text-[var(--v-fg)]">
            {headline}
          </h2>
        </Reveal>
      </div>

      {(subhead || action) && (
        <Reveal delay={0.12} className="md:pb-2">
          {subhead && (
            <p className="max-w-md text-pretty text-[15px] leading-relaxed text-[var(--v-muted)]">
              {subhead}
            </p>
          )}
          {action && <div className="mt-6">{action}</div>}
        </Reveal>
      )}
    </div>
  );
}

/** The card surface, used everywhere. */
export function Card({
  children,
  className,
  interactive = true,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[var(--v-line)] bg-[var(--v-surface)]",
        interactive &&
          "will-change-transform transition-[transform,border-color] duration-500 ease-out hover:scale-[1.02] hover:border-[var(--v-line-strong)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Metric pair. `spotlight` promotes the value to lime — at most one per
 * band, per the accent budget.
 */
export function Metric({
  value,
  label,
  spotlight = false,
  size = "md",
}: {
  value: string;
  label: string;
  spotlight?: boolean;
  size?: "sm" | "md";
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span
        className={cn(
          "v-mono font-medium",
          size === "sm" ? "text-lg" : "text-2xl",
          spotlight ? "v-accent" : "text-[var(--v-fg)]",
        )}
      >
        {value}
      </span>
      <span className="v-heading text-[11px] uppercase tracking-[0.12em] text-[var(--v-faint)]">
        {label}
      </span>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { BRAND } from "./data";

/* ═════════════════════════════════════════════════════════════════════════
   VELOMBE MARK — "Ve", set in the display face

   A typographic monogram rather than a drawn symbol: the first two letters
   of the name in Cal Sans, the same face the footer's oversized background
   wordmark uses. `.v-display` is what carries that — font, 600 weight,
   -0.045em tracking and 0.94 leading all come from the one class, so the
   monogram and the footer wordmark cannot drift apart the way two hand-
   tuned copies of a shape would.

   `V` inherits `currentColor`; `e` takes the lime. Splitting on the
   letter rather than tinting the pair keeps the accent to a single glyph,
   which is what the budget in portfolio.css asks for. `accent={false}`
   makes both inherit — for print, or anywhere two tones would muddy at
   small size.

   ── Sizing ────────────────────────────────────────────────────────────
   This is text, so it sizes with `text-*`, not `size-*`. The previous
   SVG mark took `size-[21px]`; a font-size utility replaces it in the
   lockup below.

   No `leading-*` utility here on purpose. `.v-display` already sets
   line-height 0.94, and a `leading-none` in this base list would not
   survive anyway — `cn` runs tailwind-merge, which treats a caller's
   `text-[24px]` as a font-size that supersedes an earlier line-height and
   drops it. Leaving the leading to the CSS class keeps one owner for it.

   ── The favicon ───────────────────────────────────────────────────────
   public/_static/velombe-mark.svg still holds the CHECK, not this. That
   is deliberate for now, not drift: a favicon renders outside the page
   with no access to a local webfont, so `Ve` there would silently fall
   back to whatever system face the OS picks. Making the two match means
   converting the glyphs to outlines from assets/fonts/CalSans-SemiBold
   .woff2. Worth doing if this monogram is the one that sticks — say the
   word. Nothing references that file yet, so it is inert either way.
   ═════════════════════════════════════════════════════════════════════ */

export function Mark({
  className,
  accent = true,
}: {
  className?: string;
  /** false → both letters inherit currentColor (print, one-tone). */
  accent?: boolean;
}) {
  return (
    // aria-hidden because the lockup already carries the full name as real
    // text — without it a screen reader announces "Ve velombe".
    <span aria-hidden className={cn("v-display shrink-0", className)}>
      V<span className={accent ? "v-accent" : undefined}>e</span>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   PARKED — the check mark this replaced.

   Two arms: a short one down to the vertex, a long one rising past it.
   Kept rather than deleted because the geometry took several passes to
   land and public/_static/velombe-mark.svg still renders exactly these
   numbers, so this is also the reference for what that file draws.

   The two numbers that carry it: 64° between the arms (a normal 45°-per-
   arm check sums to a right angle and falls open — it stops reading as a
   letter and becomes a checkbox glyph), and a 0.46 length ratio (much
   above 0.6 and the shape has no direction; much below 0.35 and the short
   arm turns into a serif hanging off the long one).

   Two paths and not one because a single path takes a single stroke
   colour. Painting the long arm second also puts the vertex under it, so
   the colour break lands on the turn instead of seaming down the middle
   of it.

   To restore: render <CheckMark /> in the lockup below and give it
   `size-[21px]` back in place of the font-size utility.
────────────────────────────────────────────────────────────────────────── */

/** Short arm — upper-left, down to the vertex. */
const SHORT_ARM = "M17 33 L26 48";

/** Long arm — vertex, up past the short arm's height. */
const LONG_ARM = "M26 48 L47 16";

/** 10/64 ≈ 16% of the box. Heavier and the vertex caps swell into a blob;
 *  lighter and the mark disappears at favicon size. */
const STROKE_WIDTH = 10;

export function CheckMark({
  className,
  accent = true,
}: {
  className?: string;
  /** false → both arms inherit currentColor (favicon, print, one-tone). */
  accent?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <path
        d={SHORT_ARM}
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
      <path
        d={LONG_ARM}
        stroke={accent ? "var(--v-accent)" : "currentColor"}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * The logo, used in the nav and the footer. Monogram only by default —
 * "Ve" is the whole mark; the name is not repeated beside it.
 *
 * `wordmark` is kept as an opt-in rather than removed: a lockup with the
 * name spelled out is the thing you want on an OG card or a slide, where
 * there is no surrounding page to say whose site this is. When it is on,
 * both halves are type and align on their own baselines — hence
 * `items-baseline`, not `items-center` — and the size and face difference
 * between them (display at 22px against heading at 15px) is what keeps
 * them reading as mark-then-name rather than one run of repeating text.
 *
 * 22px holds whether the wordmark is shown or not. Hiding the name is not
 * a reason to grow the monogram: it sits in a fixed-height nav pill, and
 * the size is set by that row, not by what is beside it.
 */
export function Logo({
  className,
  markClassName,
  wordmark = false,
}: {
  className?: string;
  markClassName?: string;
  /** true → spell the name out beside the monogram. Off by default. */
  wordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-baseline gap-1.5", className)}>
      <Mark className={cn("text-[22px]", markClassName)} />
      {wordmark && (
        // lowercase as a CSS transform, not `BRAND.toLowerCase()` — BRAND
        // is still the real, capitalised name everywhere it is read as
        // content (page titles, the footer's oversized wordmark, the
        // portrait's alt text). Only this lockup's rendering is lowercase,
        // which is a typographic choice and belongs in the class list.
        <span className="v-heading text-[15px] font-semibold lowercase tracking-tight text-[var(--v-fg)]">
          {BRAND}
        </span>
      )}
    </span>
  );
}

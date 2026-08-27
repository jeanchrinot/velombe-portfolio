"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { BRAND } from "./data";

/* ─────────────────────────────────────────────────────────────────────────
   Loading curtain

   ── What it is actually for ───────────────────────────────────────────
   Not decoration. Before the stylesheet applies, the hero's headline is
   raw text three times over: SlicedLines renders every line as an
   invisible sizer plus a top half plus a bottom half, and the <h1> also
   carries an sr-only copy for crawlers. Styled, that is one headline.
   Unstyled, it reads "I design SaaSI design SaaS products end to
   end.products end to end."

   Nothing can be fixed inside SlicedLines — the technique needs three
   copies of the line, and `invisible` / `absolute` / `sr-only` are all
   classes that do not exist yet at that moment. So the fix is to cover
   the page until there is a page to look at.

   ── Which is why the styling here is inline ───────────────────────────
   Position, fill and layout are inline, because a curtain that needs the
   stylesheet to be *positioned* is no curtain at all.

   The background is the one exception, and it is a CSS class
   (.v-loader-curtain in velombe.css) rather than inline — on purpose, once
   there were two themes to pick between. There is no `document` on the
   server to say which one the visitor chose, so an inline value computed
   in JS can only ever be right *after* hydration runs, which is a whole
   JS-bundle-download-and-execute later than first paint — for most of the
   loading window a light-mode visitor would see the dark literal the
   server had no way to correct. `background: var(--v-bg)` does not have
   that gap: next-themes' own FOUC script sets `<html class="dark">` (or
   doesn't) synchronously, before the browser is allowed to paint the body
   at all, and the stylesheet carrying that rule is render-blocking in
   `<head>` for exactly the same reason — both are already resolved by the
   time this curtain paints, no hydration required. This is the same
   guarantee every other themed pixel on the page already relies on; the
   curtain gets no special exemption from it, only from *layout* using CSS.

   The letter reveal and the display face come from classes too and will
   simply be absent for the first frame if the stylesheet is somehow still
   behind — that was already the accepted worst case (system font on the
   curtain's own background) before there were two themes to get wrong.

   ── Dismissal ─────────────────────────────────────────────────────────
   `window.load`, not mount. Mount fires while fonts and the hero portrait
   are still arriving, which is the moment things are ugliest. The 2.5s cap
   is there so a single stalled image can never hold the page hostage.
────────────────────────────────────────────────────────────────────────── */

/** Hard cap — the curtain lifts even if something never finishes loading. */
const MAX_MS = 2500;

/** Beat after load so the curtain does not blink out of existence. */
const SETTLE_MS = 350;

export function VelombeLoader() {
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    let settle: number | undefined;
    const lift = () => {
      settle = window.setTimeout(() => setLifted(true), SETTLE_MS);
    };

    // readyState is already "complete" on a client-side navigation back to
    // this route, where no load event will ever fire again.
    if (document.readyState === "complete") {
      lift();
    } else {
      window.addEventListener("load", lift, { once: true });
    }

    const cap = window.setTimeout(() => setLifted(true), MAX_MS);

    return () => {
      window.removeEventListener("load", lift);
      window.clearTimeout(cap);
      if (settle !== undefined) window.clearTimeout(settle);
    };
  }, []);

  return (
    <AnimatePresence>
      {!lifted && (
        <motion.div
          role="status"
          aria-label="Loading"
          className="v-loader-curtain"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // Each letter starts at scale(4). At the top of the clamp
            // that is a 4.5rem glyph drawn at 18rem, well past the
            // viewport on a narrow screen — without this the reveal
            // hands the page a horizontal scrollbar for its first
            // second. Inline with the rest of the load-bearing styles,
            // since it has to hold before the stylesheet lands.
            overflow: "hidden",
          }}
        >
          {/* Lowercase, and tracked in rather than out. The uppercase
              version needed positive tracking to stop the caps colliding;
              lowercase display type has its own rhythm, and setting it
              loose reads as seven separate objects rather than one word.

              leading-none matches the original's `line-height: 1em` on
              the letter — inline-block letters otherwise carry the line
              box's extra leading into the centred layout. */}
          <span
            aria-hidden
            className="v-display text-[clamp(2rem,9vw,4.5rem)] leading-none tracking-[-0.015em]"
          >
            {/* Index keys are correct here and only here: the string is a
                fixed literal and `e` appears three times, so the letter is
                not a stable identity. */}
            {BRAND.toLowerCase()
              .split("")
              .map((letter, i) => (
                <span
                  key={i}
                  className="v-wordmark-letter"
                  // The stagger — anime.js's `delay: (el, i) => 70 * i`.
                  // In ms rather than s so the arithmetic stays integer:
                  // `i * 0.07` serialises 0.21000000000000002s into the
                  // markup on the fourth letter.
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  {letter}
                </span>
              ))}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

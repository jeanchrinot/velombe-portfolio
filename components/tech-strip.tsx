import { HERO } from "./data";
import { TECH_STACK } from "./tech-icons";

/**
 * Fold transition under the hero: the tools, not a screenshot gallery.
 *
 * Same thirteen tools and the same icon geometry as the portfolio's "Stack I
 * build with every day" strip, restated in the template's zinc palette. That
 * label is still the section's accessible name — it is just not drawn.
 *
 * The track holds the list twice and translates -50%, so the loop lands
 * exactly on the seam. The second copy is aria-hidden — a screen reader
 * should hear thirteen tools, not twenty-six.
 *
 * Every glyph is a single 24×24 currentColor path, so one <svg> wrapper
 * serves all of them and the icon inherits the row's hover colour for free.
 */
export function TechStrip() {
  return (
    // A <section> with an accessible name, not a <div>. The visible heading
    // is gone, so without this a screen reader meets thirteen bare product
    // names with nothing saying what they are. A named section is exposed as
    // a landmark and announced; aria-label on a plain div is not.
    //
    // bg-zinc-950 rather than transparent: this band sits over the hero's
    // portrait column and ambience layers, and letting a figure show through
    // a row of tool names read as a rendering bug rather than a design.
    //
    // py-11 replaces pt-8/pb-8 + the heading's 28px bottom margin — dropping
    // the label without adding it back would leave a ~60px sliver.
    <section
      aria-label={HERO.stripLabel}
      // No top margin below `sm`: the portrait is an in-flow block there and
      // deliberately runs under this band. A gap here would reopen the space
      // it is meant to close. From `sm` up the portrait is absolute again and
      // mt-16 is what keeps the strip clear of the hero copy.
      className="relative z-10 border-t border-[var(--v-line-soft)] bg-[var(--v-bg)] py-11 sm:mt-16 sm:py-14"
    >
      <div className="v-marquee v-marquee-mask relative overflow-hidden">
        {/* Speed comes from --v-marquee-duration (52s default in portfolio.css). */}
        <div className="v-marquee-track">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="flex shrink-0 items-center"
              aria-hidden={copy === 1 || undefined}
            >
              {TECH_STACK.map((tool) => (
                <li
                  key={tool.name}
                  className="v-heading group inline-flex shrink-0 items-center gap-2.5 px-6 text-[14px] font-medium text-[var(--v-faint)] transition-colors duration-300 hover:text-[var(--v-fg)]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                    className="size-4 shrink-0 text-[var(--v-faint-2)] transition-colors duration-300 group-hover:text-[var(--v-accent)]"
                  >
                    <path d={tool.path} />
                  </svg>
                  {tool.name}

                  {/* Hairline separator. Rendered inside the item rather than
                      as a border-r so the trailing one before the seam is
                      spaced identically to every other — a border would sit
                      flush against the next item's padding. */}
                  <span
                    aria-hidden
                    className="ml-3.5 h-3.5 w-px shrink-0 bg-[var(--v-line)]"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

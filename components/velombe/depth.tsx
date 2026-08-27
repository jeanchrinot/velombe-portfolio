import { cn } from "@/lib/utils";
import { DEPTH } from "./data";
import { Reveal, Section, SectionHeader } from "./primitives";

/**
 * Judgement first, chips as the footnote.
 *
 * A wall of logos proves someone can read a package.json. The sentence above
 * each list is the actual signal — it is an opinion about *how* the thing is
 * used, which is the difference between listing a stack and having one.
 *
 * `span` drives a 6-column bento (4/2 then 3/3), spelled out in a lookup
 * because Tailwind scans source text and never generates an interpolated
 * `lg:col-span-${n}`.
 */
const SPAN: Record<number, string> = {
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
};

export function VelombeDepth() {
  return (
    <Section id="stack">
      <SectionHeader
        eyebrow={DEPTH.eyebrow}
        headline={DEPTH.headline}
        subhead={DEPTH.subhead}
      />

      <div className="grid gap-4 lg:grid-cols-6">
        {DEPTH.groups.map((group, i) => (
          <Reveal key={group.title} delay={(i % 2) * 0.07} className={cn(SPAN[group.span])}>
            <div className="flex h-full flex-col rounded-2xl border border-[var(--v-line)] bg-[var(--v-surface)]/50 p-7 transition-colors duration-500 hover:border-[var(--v-line-strong)]">
              <h3 className="v-heading v-accent text-[11px] uppercase tracking-[0.16em]">
                {group.title}
              </h3>

              {/* The opinion is set at body scale and in white-ish ink; the
                  chips below it are deliberately quieter. Reversing that
                  hierarchy is what turns this into a logo wall. */}
              <p className="mt-4 max-w-lg text-pretty text-[14.5px] leading-relaxed text-[var(--v-muted)]">
                {group.opinion}
              </p>

              <ul className="mt-auto flex flex-wrap gap-1.5 pt-7">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="v-mono rounded-full border border-[var(--v-line)] bg-[var(--v-bg)]/50 px-2.5 py-1 text-[11.5px] text-[var(--v-faint)] transition-colors duration-300 hover:border-[var(--v-line-strong)] hover:text-[var(--v-fg)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

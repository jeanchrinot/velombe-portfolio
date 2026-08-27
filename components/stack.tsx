import { ArrowDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { STACK } from "./data";
import { Reveal, ScrollLink, Section, SectionHeader } from "./primitives";

/**
 * ⚠ PARKED — not rendered on the landing page.
 *
 * This sat at position two and was pulled: on a landing page the graph asks
 * a visitor to hold five product names in their head before they have seen
 * any of them, so the relationships land as trivia rather than as an
 * argument. It is kept because the same diagram works once the reader is
 * already inside one project — a case-study page for the Voice AI Platform
 * or Twy has the context that makes each edge mean something.
 *
 * To bring it back: import and render <Stack /> from a page.
 * Its copy lives in STACK in data.ts and is still maintained.
 *
 * ── What it is ────────────────────────────────────────────────────────
 * A dependency graph of his own products, drawn in CSS rather than shipped
 * as an image or a chart library.
 *
 * Three chains side by side, each a capability with its proof directly
 * beneath — and they map onto the three pillars in lib/data/pillars.ts,
 * instantiated with real products instead of adjectives.
 *
 * Why three chains rather than the tiered graph in COPY.md §2: only two
 * edges are actually sourced in VELOMBE.md (InvoiceBoard → Ship AI SaaS,
 * Twy → Voice AI Platform). A three-tier graph would have needed edges I
 * cannot verify, and a made-up arrow is worse than a missing one. Three
 * clean chains say the same thing and every line is true.
 *
 * Mobile: the columns stack, and each chain keeps its own vertical
 * structure — so it degrades into exactly the same diagram, read downward.
 * No horizontal scroll, no pinch-zoom.
 */
export function Stack() {
  return (
    <Section id="system">
      <SectionHeader
        eyebrow={STACK.eyebrow}
        headline={STACK.headline}
        subhead={STACK.subhead}
      />

      <ol className="grid gap-x-4 gap-y-12 lg:grid-cols-3">
        {STACK.chains.map((chain, i) => (
          <Reveal as="li" key={chain.pillar} delay={i * 0.1} className="group">
            <div className="flex h-full flex-col">
              <span className="v-mono mb-5 flex items-center gap-2.5 text-[11px] uppercase tracking-[0.14em] text-zinc-600">
                <span className="text-zinc-700">{`0${i + 1}`}</span>
                {chain.pillar}
              </span>

              <Node
                title={chain.top.title}
                sub={chain.top.sub}
                href={chain.top.href}
              />

              <Connector label={chain.edge} />

              <Node
                title={chain.bottom.title}
                sub={chain.bottom.sub}
                href={"href" in chain.bottom ? chain.bottom.href : undefined}
                ghost={"ghost" in chain.bottom && chain.bottom.ghost}
              />

              <p className="mt-6 text-pretty text-[13px] leading-relaxed text-zinc-400">
                {chain.takeaway}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={0.3}>
        <p className="v-mono mt-14 border-t border-zinc-900 pt-6 text-[12px] leading-relaxed text-zinc-600">
          {STACK.aside}
        </p>
      </Reveal>
    </Section>
  );
}

/* ── Node ─────────────────────────────────────────────────────────────── */

function Node({
  title,
  sub,
  href,
  ghost = false,
}: {
  title: string;
  sub: string;
  href?: string;
  ghost?: boolean;
}) {
  const body = (
    <>
      <span
        className={cn(
          "v-heading block text-[15px] font-semibold",
          ghost ? "text-zinc-500" : "text-white",
        )}
      >
        {title}
      </span>
      <span className="v-mono mt-1 block text-[11px] text-zinc-600">{sub}</span>
    </>
  );

  const shell = cn(
    "block rounded-xl border px-5 py-4 transition-colors duration-500",
    ghost
      ? // Dashed because it is not a product — it is the thing being
        // measured. Giving it a solid border would imply a sixth project.
        "border-dashed border-zinc-800 bg-transparent"
      : "border-zinc-800 bg-zinc-900 group-hover:border-zinc-700",
  );

  if (!href || ghost) {
    return <div className={shell}>{body}</div>;
  }

  return (
    <ScrollLink href={href} className={cn(shell, "hover:border-zinc-600")}>
      {body}
    </ScrollLink>
  );
}

/* ── Connector ────────────────────────────────────────────────────────────
   A 1px rule with the edge label sitting on it and an arrowhead at the foot.
   The label chip carries the page background so it punches a hole in the
   line rather than overlapping it.

   The whole connector goes lime on column hover — this is the budgeted
   accent for the section, and it is what makes the graph feel like a graph
   rather than three lists.
────────────────────────────────────────────────────────────────────────── */

function Connector({ label }: { label: string }) {
  return (
    <div className="relative flex h-24 items-center justify-center" aria-hidden>
      <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-zinc-800 transition-colors duration-500 group-hover:bg-[var(--v-accent-line)]" />

      <span className="v-mono relative rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-zinc-500 transition-colors duration-500 group-hover:border-[var(--v-accent-line)] group-hover:text-[var(--v-accent)]">
        {label}
      </span>

      <ArrowDown
        className="absolute bottom-0 left-1/2 size-4 -translate-x-1/2 -translate-y-px text-zinc-700 transition-colors duration-500 group-hover:text-[var(--v-accent)]"
        strokeWidth={1.5}
      />
    </div>
  );
}

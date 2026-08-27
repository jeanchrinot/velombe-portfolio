import Image from "next/image";

import { cn } from "@/lib/utils";
import type { WorkArtifact } from "./data";

/**
 * Renders the visual for a work card. The switch is exhaustive over
 * `WorkArtifact`, so adding a fourth kind to the union is a compile error
 * rather than a silently blank card — the same guarantee `PillarArtifact`
 * gives in lib/data/pillars.ts.
 *
 * Why this exists at all: two of the five projects have no screenshot worth
 * showing. Borrowing an unrelated one would be a false claim about real
 * work, and an empty placeholder wastes the slot. Rendering the actual
 * architecture is both honest and, for a systems portfolio, more persuasive
 * than a UI shot.
 */
export function Artifact({
  artifact,
  aspect,
  sizes,
}: {
  artifact: WorkArtifact;
  aspect: string;
  sizes: string;
}) {
  switch (artifact.kind) {
    case "image":
      return <ImageArtifact artifact={artifact} aspect={aspect} sizes={sizes} />;
    case "diagram":
      return <DiagramArtifact artifact={artifact} />;
    case "terminal":
      return <TerminalArtifact artifact={artifact} />;
  }
}

/* ── Image ────────────────────────────────────────────────────────────── */

function ImageArtifact({
  artifact,
  aspect,
  sizes,
}: {
  artifact: Extract<WorkArtifact, { kind: "image" }>;
  aspect: string;
  sizes: string;
}) {
  return (
    <div
      className={cn(
        "v-scrim v-inset-line relative isolate overflow-hidden rounded-2xl bg-[var(--v-surface)]",
        aspect,
      )}
    >
      <Image
        src={artifact.src}
        alt={artifact.alt}
        fill
        sizes={sizes}
        // Scale the image, not the frame: scaling the frame would drag its
        // rounded corners and any caption along with it.
        className="object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
      />
    </div>
  );
}

/* ── Diagram ──────────────────────────────────────────────────────────────
   A vertical chain rather than a horizontal one: five stages laid out
   left-to-right inside a half-width card gives each label about 90px, which
   is not enough for "MCP Discovery / tools/list". Vertical also lets the
   rail carry the connector for free.
────────────────────────────────────────────────────────────────────────── */

function DiagramArtifact({
  artifact,
}: {
  artifact: Extract<WorkArtifact, { kind: "diagram" }>;
}) {
  return (
    <div className="v-inset-line relative overflow-hidden rounded-2xl border border-[var(--v-line)] bg-[var(--v-surface)] p-6 sm:p-7">
      <ol className="relative flex flex-col">
        {/* The rail. Inset top and bottom by half a marker so it starts and
            ends at the first and last node instead of overshooting. */}
        <span
          aria-hidden
          className="absolute bottom-[18px] left-[5px] top-[18px] w-px bg-[var(--v-line)]"
        />

        {artifact.nodes.map((node) => (
          <li key={node.label} className="relative flex items-start gap-4 py-[9px]">
            <span
              aria-hidden
              className={cn(
                "relative z-10 mt-[7px] block size-[11px] shrink-0 rounded-full border-2 border-[var(--v-bg)]",
                // The emphasised node is the one budgeted lime mark in this
                // artifact — it marks the component that is actually mine.
                node.emphasis
                  ? "bg-[var(--v-accent)] shadow-[0_0_0_3px_var(--v-accent-dim)]"
                  : "bg-[var(--v-line-strong)]",
              )}
            />

            <div className="flex min-w-0 flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
              <span
                className={cn(
                  "v-mono text-[13px]",
                  node.emphasis ? "text-[var(--v-fg)]" : "text-[var(--v-muted)]",
                )}
              >
                {node.label}
              </span>
              <span className="v-mono text-[11px] text-[var(--v-faint-2)]">{node.sub}</span>
            </div>
          </li>
        ))}
      </ol>

      <p className="v-mono mt-5 border-t border-[var(--v-line)] pt-4 text-[11px] leading-relaxed text-[var(--v-faint-2)]">
        {artifact.caption}
      </p>
    </div>
  );
}

/* ── Terminal ─────────────────────────────────────────────────────────── */

const LINE_STYLE: Record<string, string> = {
  prompt: "text-[var(--v-fg)]",
  out: "text-[var(--v-muted)]",
  ok: "v-accent",
  dim: "text-[var(--v-faint-2)]",
};

function TerminalArtifact({
  artifact,
}: {
  artifact: Extract<WorkArtifact, { kind: "terminal" }>;
}) {
  return (
    <div className="v-terminal v-inset-line relative overflow-hidden rounded-2xl">
      <div className="v-terminal-bar flex items-center gap-2 px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="block size-2 rounded-full bg-[var(--v-line-strong)]" />
          <span className="block size-2 rounded-full bg-[var(--v-line)]" />
          <span className="block size-2 rounded-full bg-[var(--v-line)]" />
        </span>
        <span className="v-mono ml-1 truncate text-[11px] text-[var(--v-faint)]">
          {artifact.title}
        </span>
      </div>

      {/* Long transcript lines scroll inside the block rather than widening
          the card and pushing the whole grid into horizontal overflow. */}
      <div className="overflow-x-auto px-4 py-4">
        <pre className="v-mono min-w-max text-[11.5px] leading-[1.9]">
          {artifact.lines.map((line, i) => (
            <div key={i} className={LINE_STYLE[line.kind]}>
              {line.text}
              {i === artifact.lines.length - 1 && (
                <span
                  aria-hidden
                  className="v-caret ml-1.5 inline-block h-[11px] w-[6px] translate-y-[1px] bg-[var(--v-accent)]"
                />
              )}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

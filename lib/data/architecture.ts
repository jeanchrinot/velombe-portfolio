/**
 * Shared vocabulary for the "Systems & Proof" surfaces.
 *
 * This module is the single home for types used by BOTH `case-studies.ts`
 * and `pillars.ts`. The dependency direction is always
 * `case-studies → architecture` and `pillars → architecture`, never back —
 * otherwise `pipelineFromArchitecture` (which needs a layer type) and
 * `case-studies.ts` (which needs `PipelineSpec`) would form a cycle.
 */

/** A single hard number or structural claim. Rendered by `<MetricTiles>`. */
export interface Metric {
  /** Short and scannable — keep under ~10 chars where it renders as a gradient. */
  value: string;
  /** Must stand on its own: `value` is never the only meaningful text. */
  label: string;
  /** Optional mono caption naming where the number comes from. */
  note?: string;
  emphasis?: boolean;
}

/** One stage in a linear pipeline. */
export interface PipelineNode {
  id: string;
  label: string;
  /** Mono sub-label — the implementing tech, e.g. "livekit-agents · python". */
  sub?: string;
  /** One-line body, rendered only by the "detailed" variant. */
  detail?: string;
  /** Tints the node with the brand color — use for the stage that matters. */
  emphasis?: boolean;
}

export interface PipelineSpec {
  nodes: PipelineNode[];
  connector?: "arrow" | "bidirectional" | "dashed";
  orientation?: "row" | "column";
  caption?: string;
}

/** A numbered architecture layer, rendered as a card under the diagram. */
export interface ArchLayer {
  num: string;
  title: string;
  subtitle: string;
  description: string;
}

/**
 * Derives a pipeline from the legacy `title` + `layers` shape, so case
 * studies written before `PipelineSpec` existed get a diagram for free.
 *
 * The arrow-separated title carries the stage names ("Capture → Think →
 * Clarity") while `layers` carries the implementation detail. When the two
 * agree in length we zip them; when they disagree the title is not a
 * reliable stage list, so we fall back to `layers` alone rather than
 * silently pairing the wrong subtitle with the wrong stage.
 *
 * Case studies whose title and layers intentionally differ in length
 * should supply an explicit `architecture.pipeline` instead.
 */
export function pipelineFromArchitecture(a: {
  title: string;
  layers: ArchLayer[];
}): PipelineSpec {
  const stages = a.title
    .split("→")
    .map((s) => s.trim())
    .filter(Boolean);

  if (stages.length > 1 && stages.length === a.layers.length) {
    return {
      nodes: a.layers.map((layer, i) => ({
        id: `${i}`,
        label: stages[i],
        sub: layer.subtitle,
        detail: layer.description,
      })),
    };
  }

  return {
    nodes: a.layers.map((layer, i) => ({
      id: `${i}`,
      label: layer.title,
      sub: layer.subtitle,
      detail: layer.description,
    })),
  };
}

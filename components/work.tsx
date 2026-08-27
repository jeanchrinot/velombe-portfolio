import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { WORK } from "./data";
import { Artifact } from "./artifact";
import { Reveal, Section, SectionHeader, ShimmerButton } from "./primitives";

/**
 * Three deliberately different treatments — flagship, major, compact.
 *
 * Identical rows would flatten the Voice AI Platform into the boilerplate,
 * and pretending every project earns a hero treatment is exactly what makes
 * portfolios feel padded. The visual weight is the editorial judgement.
 *
 * ── Linking ───────────────────────────────────────────────────────────
 * No card-wrapping anchor. A single <a> containing a heading, four
 * paragraphs and a dozen chips is one enormous focus target that a screen
 * reader must read end-to-end before it can say where the link goes, and it
 * makes selecting text on the card fiddly.
 *
 * Three precise targets replace it: the project TITLE goes to the case
 * study, an explicit Case study BUTTON goes to the same place, and the HOST
 * in the meta rule goes to the live product. `group` stays on the <article>
 * so the artifact zoom, the title arrow and the chip lift still fire on
 * card hover — those were always CSS and never needed the anchor.
 */
export function Work() {
  return (
    <Section id="work">
      <SectionHeader
        eyebrow={WORK.eyebrow}
        headline={WORK.headline}
        subhead={WORK.subhead}
      />

      <Flagship />

      <div className="mt-24 flex flex-col gap-24">
        {WORK.majors.map((project, i) => (
          <Major key={project.title} project={project} flip={i % 2 === 1} />
        ))}
      </div>

      <Compact />
    </Section>
  );
}

/* ── Shared bits ──────────────────────────────────────────────────────── */

/** A bracketed placeholder is not a destination. */
const ready = (href: string) => !href.startsWith("[");

/**
 * Meta rule. The host is the live-product link — it was already sitting
 * there as text, so making it clickable restores the destination the
 * card-wrapping anchor used to provide without adding anything to the
 * layout.
 */
function MetaRule({
  index,
  host,
  href,
  year,
}: {
  index: string;
  host: string;
  href: string;
  year: string;
}) {
  return (
    <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-[var(--v-line-soft)] pb-3">
      <span className="v-mono text-[11px] text-[var(--v-faint-2)]">
        {index} —{" "}
        {ready(href) ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 transition-colors duration-300 hover:text-[var(--v-fg)] hover:underline"
          >
            {host}
          </a>
        ) : (
          host
        )}
      </span>
      <span className="v-mono text-[11px] text-[var(--v-faint-2)]">{year}</span>
    </div>
  );
}

/**
 * Project title linking to its case study, with the arrow that reveals on
 * card hover. Falls back to plain text when no case study exists yet, so an
 * unwritten one never ships a link to the literal string "[CASE STUDY URL]".
 */
function ProjectTitle({
  title,
  caseStudy,
  className,
  arrowSize = "size-5",
}: {
  title: string;
  caseStudy: string;
  className?: string;
  arrowSize?: string;
}) {
  const shell = cn("inline-flex items-center gap-2", className);

  // Shown by default; hidden only where a real pointer exists to reveal it.
  // A reveal-on-hover affordance on a touch screen is just an invisible
  // affordance — there is no hover, so the arrow that says "this title is a
  // link" would never appear on the devices that need the hint most.
  // `group-hover` beats the media query on specificity (0,2,0 vs 0,1,0), so
  // the desktop slide-in still works regardless of source order.
  const arrow = (
    <ArrowUpRight
      className={cn(
        arrowSize,
        "shrink-0 text-[var(--v-accent)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "[@media(hover:hover)]:-translate-x-1 [@media(hover:hover)]:text-[var(--v-faint-2)] [@media(hover:hover)]:opacity-0",
        "group-hover:translate-x-0 group-hover:text-[var(--v-accent)] group-hover:opacity-100",
      )}
      strokeWidth={1.5}
      aria-hidden
    />
  );

  if (!ready(caseStudy)) {
    return <span className={shell}>{title}</span>;
  }

  return (
    <Link href={caseStudy} className={shell}>
      {title}
      {arrow}
    </Link>
  );
}

function CaseStudyButton({ caseStudy }: { caseStudy: string }) {
  // Stays a dashed ghost when there is no case study yet: an unavailable
  // action should not look identical to an available one.
  if (!ready(caseStudy)) {
    return (
      <span className="v-heading inline-flex h-10 items-center rounded-full border border-dashed border-[var(--v-line)] px-5 text-[13px] text-[var(--v-faint-2)]">
        Case study — soon
      </span>
    );
  }

  return (
    <ShimmerButton href={caseStudy} size="md">
      Case study
      <ArrowUpRight className="size-4" strokeWidth={1.5} />
    </ShimmerButton>
  );
}

/**
 * Closing row for the first three projects: a hairline, then the primary
 * action with the role beside it.
 *
 * Role lives here rather than under the artifact so all three tiers put it
 * in the same place — on the text side, at the foot of the argument. Under
 * the flagship's sticky artifact it scrolled away from the copy it
 * described.
 */
function ActionRow({ caseStudy, role }: { caseStudy: string; role: string }) {
  return (
    <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[var(--v-line-soft)] pt-7">
      <CaseStudyButton caseStudy={caseStudy} />
      <span className="v-heading text-[11px] uppercase tracking-[0.12em] text-[var(--v-faint-2)]">
        {role}
      </span>
    </div>
  );
}

/** Tools only — no metric pill. */
function ToolPills({ stack }: { stack: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {stack.map((tech) => (
        <li
          key={tech}
          className="v-mono rounded-full border border-[var(--v-line)] px-2.5 py-0.5 text-[11px] text-[var(--v-faint)] transition-colors duration-500 group-hover:border-[var(--v-line-strong)] group-hover:text-[var(--v-muted)]"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

/* ── 01 · Flagship ────────────────────────────────────────────────────────
   Its own vertical rhythm and a labelled sub-grid, because this is the
   project that has to carry the "can one person build hard infrastructure"
   question on its own.
────────────────────────────────────────────────────────────────────────── */

function Flagship() {
  const p = WORK.flagship;

  return (
    <Reveal>
      <article className="group">
        <MetaRule index={p.index} host={p.host} href={p.href} year={p.year} />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
          {/* The artifact sticks while the blocks scroll past it — the
              diagram is the reference you keep glancing back at while
              reading the decisions. */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Artifact
              artifact={p.artifact}
              aspect="aspect-[16/9]"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>

          <div>
            <h3 className="v-display text-[clamp(2rem,4.4vw,2.75rem)] text-[var(--v-fg)]">
              <ProjectTitle
                title={p.title}
                caseStudy={p.caseStudy}
                arrowSize="size-6"
              />
            </h3>

            <p className="mt-4 max-w-lg text-pretty text-[16px] leading-relaxed text-[var(--v-muted)]">
              {p.lede}
            </p>

            <dl className="mt-9 flex flex-col gap-7">
              {p.blocks.map((block) => (
                <div
                  key={block.label}
                  className="grid gap-x-6 gap-y-1.5 sm:grid-cols-[104px_minmax(0,1fr)]"
                >
                  <dt className="v-mono v-accent pt-0.5 text-[11px] uppercase tracking-[0.12em]">
                    {block.label}
                  </dt>
                  <dd className="text-pretty text-[14px] leading-relaxed text-[var(--v-muted)]">
                    {block.body}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 border-t border-[var(--v-line-soft)] pt-7">
              <ToolPills stack={p.stack} />
            </div>

            <ActionRow caseStudy={p.caseStudy} role={p.role} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ── 02–03 · Majors ───────────────────────────────────────────────────────
   Alternating 7/5 rows. The flip swaps visual and copy sides so two
   consecutive projects never present the same shape.
────────────────────────────────────────────────────────────────────────── */

function Major({
  project,
  flip,
}: {
  project: (typeof WORK.majors)[number];
  flip: boolean;
}) {
  return (
    <Reveal>
      <article className="group">
        <MetaRule
          index={project.index}
          host={project.host}
          href={project.href}
          year={project.year}
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* min-w-0: a plain grid-cols-12 track defaults to minmax(auto,
              1fr), so without it this column won't shrink below its
              content's intrinsic width — the VibeScore terminal's long CLI
              line (min-w-max on its <pre>) was pushing the column, the
              grid, and the page itself wider instead of triggering the
              scrollbar already on the terminal's own overflow-x-auto. */}
          <div className={cn("min-w-0 lg:col-span-7", flip && "lg:order-2")}>
            <Artifact
              artifact={project.artifact}
              aspect="aspect-[16/10]"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>

          <div className={cn("lg:col-span-5 lg:self-center", flip && "lg:order-1")}>
            <h3 className="v-display text-[28px] text-[var(--v-fg)] sm:text-[34px]">
              <ProjectTitle title={project.title} caseStudy={project.caseStudy} />
            </h3>

            <p className="v-mono mt-2 text-[12px] text-[var(--v-faint)]">{project.tagline}</p>

            <p className="mt-5 text-pretty text-[14px] leading-relaxed text-[var(--v-muted)]">
              {project.body}
            </p>

            <div className="mt-5 border-l border-[var(--v-line)] pl-5">
              <span className="v-mono v-accent block text-[10px] uppercase tracking-[0.14em]">
                Key decision
              </span>
              <p className="mt-2 text-pretty text-[13px] leading-relaxed text-[var(--v-muted)]">
                {project.decision}
              </p>
            </div>

            <div className="mt-7 border-t border-[var(--v-line-soft)] pt-7">
              <ToolPills stack={project.stack} />
            </div>

            <ActionRow caseStudy={project.caseStudy} role={project.role} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ── 04–06 · Compact index ────────────────────────────────────────────────
   Hairline rows, no imagery. Deliberately quieter than the two above: this
   is the "also shipped" shelf, and giving it the same weight would dilute
   the flagship.
────────────────────────────────────────────────────────────────────────── */

function Compact() {
  return (
    <div className="mt-24">
      <h3 className="v-heading border-b border-[var(--v-line)] pb-4 text-[11px] uppercase tracking-[0.16em] text-[var(--v-faint)]">
        {WORK.compactLabel}
      </h3>

      <ul className="flex flex-col">
        {WORK.compact.map((project, i) => (
          <Reveal as="li" key={project.title} delay={i * 0.06} className="group">
            <div className="grid gap-x-8 gap-y-4 border-b border-[var(--v-line-soft)] py-7 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_auto] md:items-start">
              <div className="flex items-baseline gap-3">
                <span className="v-mono text-[11px] text-[var(--v-line-strong)]">
                  {project.index}
                </span>
                <div className="min-w-0">
                  <h4 className="v-heading text-[17px] font-semibold text-[var(--v-fg)]">
                    <ProjectTitle
                      title={project.title}
                      caseStudy={project.caseStudy}
                      arrowSize="size-4"
                    />
                  </h4>
                  <span className="v-mono mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-[var(--v-faint-2)]">
                    {ready(project.href) ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="underline-offset-4 transition-colors duration-300 hover:text-[var(--v-fg)] hover:underline"
                      >
                        {project.host}
                      </a>
                    ) : (
                      project.host
                    )}
                    · {project.year}
                    {project.clientWork && (
                      <span className="v-heading rounded-full border border-[var(--v-accent-line)] px-2 py-0.5 text-[9px] uppercase tracking-[0.12em] text-[var(--v-accent)]">
                        Client
                      </span>
                    )}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-pretty text-[13.5px] leading-relaxed text-[var(--v-muted)]">
                  {project.body}
                </p>
                <div className="mt-3">
                  <ToolPills stack={project.stack} />
                </div>
              </div>

              <div className="md:justify-self-end">
                <CaseStudyButton caseStudy={project.caseStudy} />
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

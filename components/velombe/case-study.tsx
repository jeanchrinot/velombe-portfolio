import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Artifact } from "./artifact";
import type { CaseStudy } from "./case-studies";
import {
  Eyebrow,
  GhostButton,
  Reveal,
  ShimmerButton,
} from "./primitives";

/**
 * The dynamic case study page — /work/[slug]. One component reused for
 * every project; everything that differs lives in case-studies.ts.
 *
 * Structure mirrors the flagship project on the homepage (Problem / What I
 * built / Key decision / Also true), because that block is already "the
 * true style" the ask referenced — this just gives every project the full
 * version of it instead of only the one flagship gets.
 */
export function VelombeCaseStudy({ cs }: { cs: CaseStudy }) {
  return (
    <>
      <Hero cs={cs} />
      <ScreenshotBand cs={cs} />
      <Body cs={cs} />
      <Cta cs={cs} />
    </>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────── */

function Hero({ cs }: { cs: CaseStudy }) {
  return (
    // pb-20/24 is not spacing before the next section — ScreenshotBand's own
    // mt-14 already provides that. It's what keeps `v-halo`/`v-grid-lines`
    // (absolute, sized to THIS box) from ending flush with the about
    // paragraph: without it the header is only as tall as pt-32 + content,
    // so the background cut off right where the text did, reading as a
    // seam instead of the atmosphere fading out behind empty space.
    <header className="relative overflow-hidden pt-32 pb-20 sm:pt-36 sm:pb-24">
      <div className="v-halo pointer-events-none absolute inset-0" aria-hidden />
      <div className="v-grid-lines pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          {/* Always a real cross-page navigation — this page is never the
              home page, so no anchorHandler/scroll-interception is needed
              here. Plain Link to "/#work"; the browser's own hash-scroll
              lands on the section after the route change completes. */}
          <Link
            href="/#work"
            className="v-heading inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--v-faint)] transition-colors duration-300 hover:text-[var(--v-fg)]"
          >
            ← Selected work
          </Link>
        </Reveal>

        <Reveal delay={0.06} className="mt-8">
          <Eyebrow>{`Case study — ${cs.index}`}</Eyebrow>
        </Reveal>

        <Reveal delay={0.12}>
          <h1 className="v-display mt-7 text-balance text-[clamp(2.5rem,7vw,5rem)] text-[var(--v-fg)]">
            {cs.title}
          </h1>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="mt-4 max-w-2xl text-pretty text-[17px] leading-relaxed text-[var(--v-muted)]">
            {cs.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="v-mono mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[var(--v-line-soft)] pt-6 text-[12px] text-[var(--v-faint)]">
            <span>{cs.role}</span>
            <span aria-hidden className="text-[var(--v-line)]">
              ·
            </span>
            {cs.href ? (
              <a
                href={cs.href}
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 transition-colors duration-300 hover:text-[var(--v-fg)] hover:underline"
              >
                {cs.host}
              </a>
            ) : (
              <span>{cs.host}</span>
            )}
            <span aria-hidden className="text-[var(--v-line)]">
              ·
            </span>
            <time dateTime={cs.date}>{formatDate(cs.date)}</time>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-8 max-w-2xl text-pretty text-[15px] leading-relaxed text-[var(--v-muted)]">
            {cs.about}
          </p>
        </Reveal>
      </div>
    </header>
  );
}

/** "June 2026" — month-level, matching the precision the sourced date
 *  actually carries. A day is in `Project.date` but was never a verified
 *  ship date, so showing it would overclaim. */
function formatDate(iso: string): string {
  const [year, month] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, (month ?? 1) - 1)).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/* ── Screenshot ───────────────────────────────────────────────────────── */

function ScreenshotBand({ cs }: { cs: CaseStudy }) {
  return (
    <div className="relative z-10 mx-auto mt-14 w-full max-w-6xl px-5 sm:px-8">
      <Reveal delay={0.1}>
        <Artifact
          artifact={cs.artifact}
          aspect="aspect-[16/9]"
          sizes="(max-width: 1024px) 100vw, 1152px"
        />
      </Reveal>
    </div>
  );
}

/* ── Body ─────────────────────────────────────────────────────────────── */

function Body({ cs }: { cs: CaseStudy }) {
  const blocks = [
    { label: "Problem", body: cs.problem },
    { label: "What I built", body: cs.solution },
    { label: "Key decision", body: cs.keyDecision },
    ...(cs.extra ? [{ label: "Also true", body: cs.extra }] : []),
  ];

  return (
    <div className="relative z-10 mx-auto mt-20 w-full max-w-6xl px-5 sm:px-8 md:mt-28">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16">
        <dl className="flex flex-col gap-10">
          {blocks.map((block, i) => (
            <Reveal
              as="div"
              key={block.label}
              delay={i * 0.06}
              className="grid gap-x-8 gap-y-2 border-t border-[var(--v-line-soft)] pt-6 sm:grid-cols-[140px_minmax(0,1fr)]"
            >
              <dt className="v-mono v-accent pt-0.5 text-[11px] uppercase tracking-[0.12em]">
                {block.label}
              </dt>
              <dd className="text-pretty text-[15px] leading-relaxed text-[var(--v-muted)]">
                {block.body}
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={0.12}>
          <div className="border-t border-[var(--v-line-soft)] pt-6 lg:sticky lg:top-28">
            <span className="v-heading v-accent text-[11px] uppercase tracking-[0.14em]">
              Built with
            </span>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {cs.techStack.map((tech) => (
                <li
                  key={tech}
                  className="v-mono rounded-full border border-[var(--v-line)] px-2.5 py-0.5 text-[11px] text-[var(--v-faint)]"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* ── Closing CTA ──────────────────────────────────────────────────────── */

function Cta({ cs }: { cs: CaseStudy }) {
  return (
    <div className="relative z-10 mx-auto mt-24 w-full max-w-6xl px-5 pb-28 sm:px-8 md:mt-32">
      <Reveal>
        <div className="flex flex-wrap items-center gap-3 border-t border-[var(--v-line-soft)] pt-10">
          {cs.href && (
            <ShimmerButton href={cs.href} external>
              Visit {cs.host}
              <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </ShimmerButton>
          )}
          {/* /hire, not /#contact: that homepage section is a persuasion
              beat now, not an intake point — same shift as the nav CTA and
              the homepage's own Contact section. */}
          <GhostButton href="/hire">
            Get in touch
            <ArrowUpRight className="size-4" strokeWidth={1.5} />
          </GhostButton>
        </div>
      </Reveal>
    </div>
  );
}

import { AVAILABILITY } from "./data";
import { VelombeHireForm } from "./hire-form";
import { Card, Eyebrow, Reveal, StatusDot } from "./primitives";

/**
 * The dedicated /hire page — the deeper version of the homepage Contact
 * section's CTA. That section stays email-first and light; this is the
 * "fill in the details" experience the nav's "Hire me" pill and the
 * mobile menu both point at.
 *
 * Structure mirrors case-study.tsx: a full-bleed Hero (halo + grid lines,
 * pt-32 for the fixed nav) followed by a plain max-w-6xl body — not the
 * Section primitive, which would double up on padding against the Hero's
 * own.
 */
export function VelombeHire() {
  return (
    <>
      <Hero />
      <Body />
    </>
  );
}

const SERVICES = [
  {
    num: "01",
    title: "SaaS development",
    body: "From an early idea to a working product, I design and build the application, backend, data layer, and the pieces needed to get it into production.",
  },
  {
    num: "02",
    title: "AI workflow design",
    body: "I design practical AI workflows around your existing product or process — from structured LLM interactions and retrieval to agents, automation, and voice.",
  },
  {
    num: "03",
    title: "Landing pages & websites",
    body: "Fast, polished websites designed around your product and audience, with the structure, messaging, and interactions needed to turn a visit into action.",
  },
] as const;

/* ── Hero ─────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    // Same reasoning as case-study.tsx's header: pb-* keeps v-halo/
    // v-grid-lines (absolute, sized to this box) from ending flush with
    // the subhead — without it the background is only as tall as
    // pt-32 + content and the atmosphere cuts off exactly where the text
    // does, reading as a seam rather than fading into open space.
    <header className="relative overflow-hidden pt-32 pb-16 sm:pt-36 sm:pb-20">
      <div
        className="v-halo pointer-events-none absolute inset-0"
        aria-hidden
      />
      <div
        className="v-grid-lines pointer-events-none absolute inset-0"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>Hire me</Eyebrow>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="v-display mt-7 max-w-3xl text-[clamp(2.5rem,7vw,4.5rem)] text-balance text-[var(--v-fg)]">
            Tell me what you&apos;re working on.
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-pretty text-[var(--v-muted)]">
            Tell me what you&apos;re trying to build, what you&apos;re working
            with, and where the hard part is. A rough idea is enough to start. I
            read every inquiry myself.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="v-heading mt-8 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] tracking-[0.14em] text-[var(--v-muted)] uppercase">
            <StatusDot className="text-[var(--v-accent)]" />
            <span className="text-[var(--v-muted)]">{AVAILABILITY.detail}</span>
            <span aria-hidden className="text-[var(--v-line)]">
              ·
            </span>
            Replies within one business day
          </p>
        </Reveal>
      </div>
    </header>
  );
}

/* ── Body: services + form ────────────────────────────────────────────── */

function Body() {
  return (
    // pt-16/20 is independent of the Hero's own pb-16/20 on purpose: that
    // padding's job is extending v-halo/v-grid-lines so they fade into
    // open space instead of ending flush with the subhead — it doesn't
    // reserve any actual gap on this side of the seam. Without a pt here,
    // the first thing in Body (the services list's own border-t) sits
    // directly against wherever the hero's background happens to end, and
    // reads as one line with nothing on either side of it. This pt is the
    // gap the previous fix was missing.
    <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-16 pb-28 sm:px-8 sm:pt-20 md:pb-32">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-16">
        <div className="flex flex-col gap-10">
          {SERVICES.map((service, i) => (
            <Reveal
              key={service.num}
              delay={i * 0.06}
              className="grid gap-x-6 gap-y-1.5 border-t border-[var(--v-line-soft)] pt-6 sm:grid-cols-[56px_minmax(0,1fr)]"
            >
              <span className="v-mono pt-0.5 text-[11px] text-[var(--v-line-strong)]">
                {service.num}
              </span>
              <div>
                <h3 className="v-heading text-[16px] font-semibold text-[var(--v-fg)]">
                  {service.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-pretty text-[var(--v-muted)]">
                  {service.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
          <Card interactive={false} className="p-6 sm:p-8">
            <h2 className="v-display text-xl text-[var(--v-fg)]">Start a project</h2>
            <div className="mt-8 border-t border-[var(--v-line)] pt-8">
              <VelombeHireForm />
            </div>
          </Card>
        </Reveal>
      </div>
    </div>
  );
}

import { COLOPHON } from "./data";
import { Eyebrow, Reveal } from "./primitives";

/**
 * /colophon — how the site itself was built. Structure mirrors
 * case-study.tsx and hire.tsx: a full-bleed Hero (halo + grid lines,
 * pt-32 for the fixed nav) followed by a plain max-w-6xl body, not the
 * Section primitive, which would double up on padding against the Hero's
 * own.
 */
export function Colophon() {
  return (
    <>
      <Hero />
      <Body />
    </>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    // pb-16/20 keeps v-halo/v-grid-lines (absolute, sized to this box)
    // from ending flush with the subhead — see hire.tsx and
    // case-study.tsx for the fuller version of this note. Body below
    // still carries its own independent pt, for the same reason those two
    // pages do: this padding's job is the background fade, not reserving
    // a content gap.
    <header className="relative overflow-hidden pt-32 pb-16 sm:pt-36 sm:pb-20">
      <div className="v-halo pointer-events-none absolute inset-0" aria-hidden />
      <div className="v-grid-lines pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>{COLOPHON.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="v-display mt-7 max-w-2xl text-balance text-[clamp(2.5rem,7vw,4.5rem)] text-[var(--v-fg)]">
            {COLOPHON.headline}
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-6 max-w-xl text-pretty text-[16px] leading-relaxed text-[var(--v-muted)]">
            {COLOPHON.subhead}
          </p>
        </Reveal>
      </div>
    </header>
  );
}

/* ── Body: type + stack, then a few build notes ──────────────────────── */

function Body() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-16 pb-28 sm:px-8 sm:pt-20 md:pb-32">
      {/* Same card language as Depth on the homepage — title,
          opinion sentence, chips — reused rather than reinvented, since
          "the stack" is the same kind of content whether it's arguing a
          hiring case or documenting the build. */}
      <div className="grid gap-4 md:grid-cols-2">
        {COLOPHON.groups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.07}>
            <div className="flex h-full flex-col rounded-2xl border border-[var(--v-line)] bg-[var(--v-surface)]/50 p-7 transition-colors duration-500 hover:border-[var(--v-line-strong)]">
              <h2 className="v-heading text-[11px] uppercase tracking-[0.16em] text-[var(--v-faint)]">
                {group.title}
              </h2>

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

      {/* Full sentences, not chips — these are facts about the process,
          not a tag list, so they get the same dt/dd block style the case
          study pages use for Problem / What I built / Key decision. */}
      <dl className="mt-16 grid gap-8 sm:grid-cols-2">
        {COLOPHON.notes.map((note, i) => (
          <Reveal
            as="div"
            key={note.label}
            delay={i * 0.05}
            className="border-t border-[var(--v-line-soft)] pt-6"
          >
            <dt className="v-mono text-[11px] uppercase tracking-[0.12em] text-[var(--v-faint-2)]">
              {note.label}
            </dt>
            <dd className="mt-2 text-pretty text-[14px] leading-relaxed text-[var(--v-muted)]">
              {note.body}
            </dd>
          </Reveal>
        ))}
      </dl>
    </div>
  );
}

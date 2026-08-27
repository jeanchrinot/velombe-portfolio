import Link from "next/link";
import { Facebook, Github, Instagram, Linkedin } from "lucide-react";

import { BRAND, CONTACT, FOOTER, NAV_LINKS } from "./data";
import { VelombeLogo } from "./logo";
import { ScrollLink } from "./primitives";

/**
 * Sections column mirrors NAV_LINKS exactly — same hrefs, same
 * path-qualification, same reason: this footer renders on every page in
 * the (landing) route group, not just the home page the hashes target.
 */
const SECTION_HREF: Record<string, string> = Object.fromEntries(
  NAV_LINKS.map((l) => [l.label, l.href]),
);

type IconProps = { className?: string };

/**
 * lucide-react's own `X` is a close/cross glyph — the "dismiss this
 * dialog" icon, not the X (formerly Twitter) wordmark. There is no lucide
 * icon for the actual brand mark, so this is the official logo path
 * inlined directly: a solid glyph rather than an outline, because the
 * real mark doesn't have a stroked variant to borrow.
 */
function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

// Thin wrappers so every entry in SOCIAL_ICON shares one call signature
// (`className` only) — XIcon above has no `strokeWidth` prop to accept,
// since it's filled rather than stroked, so the strokeWidth needed by the
// four lucide icons is baked in here instead of passed at the call site.
function LinkedInIcon({ className }: IconProps) {
  return <Linkedin className={className} strokeWidth={1.5} aria-hidden />;
}
function GitHubIcon({ className }: IconProps) {
  return <Github className={className} strokeWidth={1.5} aria-hidden />;
}
function FacebookIcon({ className }: IconProps) {
  return <Facebook className={className} strokeWidth={1.5} aria-hidden />;
}
function InstagramIcon({ className }: IconProps) {
  return <Instagram className={className} strokeWidth={1.5} aria-hidden />;
}

const SOCIAL_ICON: Record<string, React.ComponentType<IconProps>> = {
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
  X: XIcon,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
};

/**
 * VelombeFooter is a Server Component; it cannot call `anchorHandler`
 * itself — that's a function exported from a "use client" module, and
 * invoking it during a server render throws "Attempted to call
 * anchorHandler() from the server". `ScrollLink` exists in primitives.tsx
 * for exactly this: a client component is a legal child of a server
 * component even though a client function call isn't.
 */
function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <ScrollLink
      href={href}
      className="text-[13px] text-[var(--v-muted)] transition-colors duration-300 hover:text-[var(--v-fg)]"
    >
      {label}
    </ScrollLink>
  );
}

/**
 * Icon-only social link. An unfilled `[BRACKETED]` href renders inert —
 * same rule as CONTACT.links on the homepage: a placeholder is not a
 * destination, and shipping it as a live link would point at the literal
 * string. `aria-label` carries the platform name either way, since the
 * icon alone has no accessible text.
 */
function FooterSocial({ label, href }: { label: string; href: string }) {
  const Icon = SOCIAL_ICON[label];
  const isPlaceholder = href.startsWith("[");

  const cls =
    "inline-flex size-8 items-center justify-center rounded-full border transition-colors duration-300";

  if (isPlaceholder) {
    return (
      <span
        aria-label={`${label} (coming soon)`}
        className={`${cls} border-dashed border-[var(--v-line)] text-[var(--v-line-strong)]`}
      >
        <Icon className="size-4" />
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`${cls} border-[var(--v-line)] text-[var(--v-faint)] hover:border-[var(--v-accent-line)] hover:text-[var(--v-fg)]`}
    >
      <Icon className="size-4" />
    </a>
  );
}

export function VelombeFooter() {
  const year = new Date().getFullYear();

  return (
    // relative + overflow-hidden: what lets the giant wordmark below bleed
    // past the footer's own bottom edge and get cropped there, rather than
    // needing a fixed height picked by hand.
    <footer className="relative overflow-hidden border-t border-[var(--v-line-soft)] px-5 py-16 sm:px-8">
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div>
            <VelombeLogo />
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-[var(--v-faint)]">
              {FOOTER.blurb}
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="v-mono mt-5 inline-block text-[13px] text-[var(--v-muted)] transition-colors duration-300 hover:text-[var(--v-fg)]"
            >
              {CONTACT.email}
            </a>

            <ul className="mt-6 flex flex-wrap items-center gap-2">
              {FOOTER.socials.map((social) => (
                <li key={social.label}>
                  <FooterSocial label={social.label} href={social.href} />
                </li>
              ))}
            </ul>
          </div>

          {FOOTER.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="v-heading text-[11px] uppercase tracking-[0.14em] text-[var(--v-faint)]">
                {column.title}
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <FooterLink label={link} href={SECTION_HREF[link] ?? "/#top"} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[var(--v-line-soft)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="v-mono text-[12px] text-[var(--v-faint-2)]">
            © {year} {FOOTER.copyright}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {FOOTER.legal.map((item) => (
              <li key={item}>
                {/* A real route now (/colophon) — plain Link, no
                    anchorHandler needed since there's no hash to resolve. */}
                <Link
                  href="/colophon"
                  className="text-[12px] text-[var(--v-faint-2)] transition-colors duration-300 hover:text-[var(--v-muted)]"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Oversized wordmark, bleeding off the bottom edge. aria-hidden
          because it's pure decoration — the brand name is already real
          content via the logo above, so a screen reader gaining nothing
          from a second "Velombe" here.

          -bottom-[0.14em] pulls it down by roughly a descender's worth so
          the baseline sits past the footer's edge rather than the type's
          natural bottom padding leaving a sliver of empty space under it.

          --v-line rather than an arbitrary opacity value: it's the same
          token every hairline border in this template already uses, so
          "grayed out" here reads as the same design language, not a new
          gray invented for this one spot. */}
      <span
        aria-hidden
        className="v-display pointer-events-none absolute inset-x-0 -bottom-[0.14em] block select-none text-center text-[clamp(4.5rem,20vw,15rem)] leading-none font-semibold tracking-tight text-[var(--v-line)]"
      >
        {BRAND}
      </span>
    </footer>
  );
}

# velombe.com — Portfolio Website

Personal portfolio for **Jean "Velombe" Chrinot** — full-stack developer & AI builder.

---

## 🗂️ What This Project Is

The entire public surface is:
- `/` — homepage (hero, work, how-I-build, about, technical depth, contact)
- `/work/[slug]` — case study pages, one per project
- `/hire` — client inquiry form (email-only, via Resend — no database)
- `/colophon` — how the site itself was built
- `/privacy`, `/terms` — placeholder legal pages (see the notice on each page — draft content, not reviewed by counsel)

There is no auth, no dashboard, no billing, no blog, no docs, no templates marketplace, and no `/now` page. If a route isn't one of the five above, it doesn't exist in this repo.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Routing:** `app/(landing)/` for every route — single-locale, no i18n routing (the source repo's next-intl setup was dropped along with the multi-locale content it existed to serve; every string in `components/*` is hardcoded English)
- **Styling:** Tailwind CSS v4, no shadcn/ui (the `components/` folder is fully self-contained — its own primitives, no `components/ui`)
- **Animations:** motion/react
- **Theme:** next-themes — dark by default, light is an explicit opt-in via the nav toggle (see `components/mode-toggle.tsx`)
- **Email:** Resend — the only external service the site depends on at runtime
- **SEO:** `constructMetadata()` from `lib/utils.ts`

No database, no auth provider, no payments provider. `env.mjs` only validates `APP_NAME`, `RESEND_API_KEY`, `EMAIL_FROM`, `NEXT_PUBLIC_APP_URL`.

---

## 🎨 Design System

Everything under `(landing)` renders through `components/*`, wrapped in a single `.portfolio` scoping class (`app/(landing)/layout.tsx`). It is a **fully self-contained, independently-deletable** component tree: it imports nothing from `components/ui`, `components/shared`, `hooks/`, or `config/` (none of those exist in this repo), and defines its own type roles, primitives (`Card`, `ShimmerButton`, `GhostButton`, `Eyebrow`, `SectionHeader`, `Metric`, `Reveal`), and font stack.

**Accent color:** lime — `#A3E635` in dark mode, `#84CC16` (the brand value) in light mode. Rationed on purpose: see the "ACCENT BUDGET" comment block at the top of `components/portfolio.css` before adding a new lime element. Target is roughly six lime marks per viewport-height.

**Light/dark tokens:** `portfolio.css`'s custom properties (`--v-bg`, `--v-surface`, `--v-line`, `--v-fg`, `--v-muted`, `--v-faint`, `--v-accent`, etc.) are split `.portfolio { /* light */ }` / `.dark .portfolio { /* dark */ }`, mirroring how `styles/globals.css` splits `:root`/`.dark` for the rest of Tailwind's semantic tokens. Every component references these via arbitrary-value utilities (`bg-[var(--v-surface)]`, `text-[var(--v-fg)]`) — never raw `zinc-*`/`white` Tailwind classes. `next-themes`' `defaultTheme` is `"dark"` (not `"system"`) in `components/providers/index.tsx`: the whole design is one dark composition, so a first-time visitor should land there regardless of OS preference.

**Never use hardcoded Tailwind palette classes** (`bg-zinc-900`, `text-white`) inside `components/*` — always the `--v-*` tokens above.

---

## 📁 Key Files & Directories

```
app/(landing)/
  layout.tsx            # Nav, footer, loader, .portfolio wrapper — every route inherits this
  page.tsx               # Homepage
  hire/page.tsx
  colophon/page.tsx
  privacy/page.tsx
  terms/page.tsx
  work/[slug]/page.tsx    # Case study pages

components/
  data.ts                 # NAV_LINKS, FOOTER, HERO, ABOUT, BUILD, DEPTH, CONTACT, COLOPHON, AVAILABILITY
  case-studies.ts          # CASE_STUDIES + getCaseStudy()/getCaseStudySlugs() — the /work/[slug] data
  primitives.tsx           # Card, ShimmerButton, GhostButton, Eyebrow, SectionHeader, Metric, Reveal, ...
  portfolio.css              # Scoped stylesheet — tokens, accent budget, all custom animations/masks
  nav.tsx / footer.tsx / mode-toggle.tsx / logo.tsx / loader.tsx
  hero.tsx / hero-portrait.tsx / hero-pinned.tsx / tech-strip.tsx   # hero-portrait.tsx is the one actually rendered; the other two hero variants are parked (see page.tsx's comment)
  work.tsx / artifact.tsx  # Selected Work section + the image/diagram/terminal artifact renderer
  build.tsx / about.tsx / depth.tsx / contact.tsx
  case-study.tsx           # /work/[slug] page template
  hire.tsx / hire-form.tsx
  colophon.tsx / legal.tsx # legal.tsx is the shared shell for /privacy and /terms
  stack.tsx                # parked, not rendered — a dependency-graph section kept for reuse

lib/data/projects.ts       # PROJECTS — imported by components/case-studies.ts
lib/data/architecture.ts   # Shared `Metric` type projects.ts depends on — keep this even
                            #   though nothing else in this repo still uses PipelineSpec/ArchLayer
lib/utils.ts                # cn(), constructMetadata()
actions/hire.ts             # The /hire form's server action — Zod validation + Resend send, no DB write
```

### ⚠️ Type couplings that fail loudly (by design)

- **`FeatureIconKey`** (in `case-studies.ts`, if reintroduced) and any `Record<SomeUnion, X>` pattern in this codebase is deliberate — adding a new union member without updating the matching `Record` is a **compile error**, not a silent `undefined` at runtime. Keep that pattern when extending `case-studies.ts` or `data.ts`.
- **`PROJECTS` array order drives the numbering** shown on the homepage's Selected Work section. Nothing sorts by date; inserting mid-array renumbers everything after it.

---

## 🧭 Nav & Loader

- `components/nav.tsx` — fixed pill nav, present at every breakpoint (only the hamburger button is `md:hidden`). Contains `ShimmerButton` ("Hire me"), `ModeToggle`, and the mobile menu sheet.
- `components/loader.tsx` — the loading curtain shown before the stylesheet has fully applied. Its background is driven by a CSS class (`.v-loader-curtain`, `background: var(--v-bg)`), **not** inline JS — see the long comment in that file for why: a JS-computed value can only be correct after React hydrates, which is far slower than the render-blocking stylesheet + next-themes' pre-paint FOUC script that every other themed pixel already depends on.

---

## 📝 Case Study Pattern

To add a new case study:
1. Add a `Project` entry to `lib/data/projects.ts` (slug, title, screenshot, liveUrl, etc.)
2. Add a `CaseStudy` entry to `components/case-studies.ts` (stats, architecture, features, techStack, cta — all copy lives in data)
3. The dynamic route `app/(landing)/work/[slug]/page.tsx` auto-renders it via `case-study.tsx`

---

## 🔍 SEO

Use `constructMetadata()` from `lib/utils.ts` for every page:
```ts
export const metadata = constructMetadata({
  title: "Page Title",
  description: "...",
});
```
Note it unconditionally appends `" | Velombe"` to whatever `title` you pass — for a literal full title that already contains the site name, spread the result and override `title` afterward (see `app/(landing)/page.tsx` for the pattern).

---

## ⚠️ Conventions

1. **No hardcoded strings in `components/*` components** — all copy comes from `data.ts`/`case-studies.ts`
2. **No hardcoded Tailwind colors** — use the `--v-*` tokens in `portfolio.css`, referenced via `[var(--v-*)]` arbitrary values
3. **Static data only** — nothing in this repo queries a database; `/hire` sends email and returns, nothing more
4. **`constructMetadata()`** for every page
5. **`Reveal`** (from `primitives.tsx`) for scroll animations, never a raw `motion.div` inline in a page
6. Keep `components/` self-contained — resist reaching for `components/ui` or similar shared infrastructure; if the folder ever needs to be forked or deleted again, that isolation is what makes it possible

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# velombe.com

Jean Chrinot Velombe's portfolio site — Next.js 16, App Router, React 19, TypeScript, Tailwind CSS v4.

This is a portfolio-only extraction of a larger SaaS boilerplate repo: no dashboard, no admin, no database, no auth, no billing. See `CLAUDE.md` for the full shape of the codebase.

## Prerequisites

- Node.js 20+
- A [Resend](https://resend.com) API key — the only external service the site uses (the `/hire` form sends an email, nothing else)

## Quick start

```bash
npm install
cp .env.example .env   # fill in RESEND_API_KEY and EMAIL_FROM
npm run dev
```

Visit `http://localhost:3000`.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — eslint

## Structure

- `app/(landing)/` — every route (`/`, `/work/[slug]`, `/hire`, `/colophon`, `/privacy`, `/terms`)
- `components/velombe/` — the entire design system for the site, self-contained
- `lib/data/projects.ts` — the project data behind the case study pages

## Notes

- `/privacy` and `/terms` ship with placeholder content, clearly labeled as a draft on the page itself — replace before relying on it.
- Theme defaults to dark; the toggle in the nav switches to light, persisted in `localStorage`.

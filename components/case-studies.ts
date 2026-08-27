import { getProjectBySlug } from "@/lib/data/projects";

import type { WorkArtifact } from "./data";

/**
 * Content for the dynamic case study page (/work/[slug]), joined at read
 * time against `lib/data/projects.ts` — the site's one source of truth for
 * title, tagline, role, date, live URL and tech stack. Duplicating those
 * here would mean two places that can drift; this file only holds what
 * `Project` doesn't carry: the narrative.
 *
 * ── Sourcing ──────────────────────────────────────────────────────────
 * Every paragraph below is adapted from material that already existed in
 * this repo — VELOMBE.md, the retired Systems & Proof case studies in
 * lib/data/case-studies.ts (origin story, architecture, constraints), and
 * the WORK export in ./data.ts (same rule as data.ts: nothing invented).
 * `date` is `Project.date`, already a real ISO date per project — not
 * something this file adds.
 */

export type CaseStudyContent = {
  slug: string;
  /** Display numbering — matches the index each project already has in
   *  WORK, so "01" means the same project on the homepage and here. */
  index: string;
  about: string;
  problem: string;
  solution: string;
  keyDecision: string;
  /** "Also true" — one further fact, optional. Not every project needs a
   *  fourth beat; forcing one would mean padding. */
  extra?: string;
  artifact: WorkArtifact;
};

const CASE_STUDY_CONTENT: readonly CaseStudyContent[] = [
  {
    slug: "voice-ai-platform",
    index: "01",
    about:
      "Speech-to-speech agents that any SaaS product can rent, without giving up its own interface or its own data — architected and built solo, from the WebRTC pipeline to the Ubuntu VPS it runs on.",
    problem:
      "Adding a voice assistant normally means rebuilding the audio pipeline, the agent loop and the tool layer inside your own product. Every app pays that cost again, and every app's tools get hard-coded into whichever agent framework it picked.",
    solution:
      "A decoupled, multi-tenant voice backend. A tenant app authenticates with an API key, receives a short-lived audience-scoped JWT, and publishes its own backend tools over MCP. A shared LiveKit agent worker discovers those tools at connect time and calls them bound to the end user's scope. The client is custom Web Audio API — synthesised ringtones, waveform visualisers, and a voice-cloning enrolment flow.",
    keyDecision:
      "Tools are resolved per connection, never compiled in. That is the whole design: onboarding a tenant takes zero platform deploys, and a tenant can add a tool without me ever seeing it.",
    // extra:
    //   "Runs on a self-managed Ubuntu VPS — systemd units, Nginx reverse proxies, dev/prod isolation, Let's Encrypt. Not a Vercel deploy.",
    artifact: {
      kind: "diagram",
      caption: "Tools resolved per connection, never compiled in.",
      nodes: [
        { label: "Tenant App", sub: "api key → /token" },
        { label: "MCP Discovery", sub: "tools/list" },
        { label: "Agent Worker", sub: "livekit-agents", emphasis: true },
        { label: "LiveKit Room", sub: "WebRTC · SFU" },
        { label: "Voice Client", sub: "Web Audio API" },
      ],
    },
  },
  {
    slug: "vibescore",
    index: "02",
    about:
      "A directory and leaderboard ranking AI-built apps on build data parsed straight from CLI transcripts — not self-reported, and re-ranked on every read.",
    problem:
      "“Built with AI” is a claim almost nobody backs with numbers — how long it took, how many tokens it burned, what that would have cost at API rates. The signal was sitting unused in everyone's CLI transcripts, and ranking it fairly meant surviving scrutiny: no self-reported inputs, no weighting I couldn't defend, nothing that couldn't be recomputed on demand.",
    solution:
      "A 1–100 composite weighs time-to-ship, token usage and API-equivalent cost against calibrated thresholds, run entirely in SQL — window functions rank each build against its cohort, CTEs assemble the components — so the leaderboard is always consistent with what it claims to measure.",
    keyDecision:
      "Scoring lives in the query, not the app. Window functions and CTEs through Drizzle mean rankings recompute on read, so a new submission reorders the board without a batch job.",
    extra:
      "A multi-source scraper with cross-run deduplication feeds the same pipeline, so an app discovered twice never double-counts.",
    artifact: {
      kind: "terminal",
      title: "vibescore-cli",
      lines: [
        { kind: "prompt", text: "cd your-project" },
        { kind: "dim", text: "# macOS" },
        { kind: "prompt", text: "npx --yes vibescore-cli | pbcopy" },
        { kind: "dim", text: "# Windows PowerShell" },
        { kind: "prompt", text: "npx --yes vibescore-cli | Set-Clipboard" },
        { kind: "dim", text: "# Linux" },
        {
          kind: "prompt",
          text: "npx --yes vibescore-cli | xclip -selection clipboard",
        },
        { kind: "ok", text: "✓ score copied — paste it to submit" },
      ],
    },
  },
  {
    slug: "twy",
    index: "03",
    about:
      "A second brain you can talk to — typed, spoken or photographed input goes in unstructured and comes out clustered, with no folders and no setup.",
    problem:
      "Pen and paper is faster than any note app for capture, but a physical notebook turns into a mess within days — tasks, ideas and meeting notes mixed into one continuous stream, with finding something written last week feeling like archaeology.",
    solution:
      "Typed, spoken or photographed input goes in unstructured and comes out as clustered tasks and ideas — no folders, no tags, no setup. Hybrid semantic retrieval on pgvector with text-embedding-3-small handles the search half of that promise.",
    keyDecision:
      "Twy ships no speech code. It publishes tools and lets the Voice AI Platform call them over MCP — the payoff for building that platform as infrastructure rather than a feature.",
    extra:
      "Capture accepts text, voice or a photographed page via OCR — Twy reads handwriting as readily as it reads typed input, and works in any language.",
    artifact: {
      kind: "image",
      src: "/_static/projects/twy.png",
      alt: "Twy — AI capture interface with auto-clustered notes and tasks",
    },
  },
  {
    slug: "invoiceboard",
    index: "04",
    about:
      "Describe an invoice in plain language and get a tax-ready document back — automated reminders, payment links and multi-currency, no form filling anywhere in the flow.",
    problem:
      "Building AI-powered invoicing from scratch meant re-solving the same foundation every time the project was picked back up — auth, payments, email, database — which is most of why it took the better part of a year of on-and-off attempts before a working version existed.",
    solution:
      "Describe what's owed in plain English — “invoice XYZ Corp for web design, $1,500” — and get a complete, tax-ready invoice back, with a magic payment link and automated follow-ups for anything overdue. Re-architected front to back in one week on Ship AI SaaS.",
    keyDecision:
      "Reused Ship AI SaaS's auth, billing and deploy pipeline instead of building InvoiceBoard's foundation a third time — which is exactly why a project that stalled for the better part of a year shipped in one week once the boilerplate existed.",
    extra:
      "Free forever plan, no credit card required. Quote-to-invoice conversion happens with zero re-entry.",
    artifact: {
      kind: "image",
      src: "/_static/projects/invoiceboard.png",
      alt: "InvoiceBoard — AI-drafted invoice with payment link and reminder status",
    },
  },
  {
    slug: "ship-ai-saas",
    index: "05",
    about:
      "The boilerplate the rest of this list stands on — a production-ready foundation for shipping AI-integrated vertical SaaS in days, not months.",
    problem:
      "Every new AI web app hit the same wall: weeks spent wiring up authentication, payments, email and database connections before writing a single line of the actual product. The friction of re-solving the same solved problems was draining enough to abandon projects over.",
    solution:
      "Agentic chat with streaming, Better-Auth with team workspaces, Stripe billing, QStash background queues, human-in-the-loop approval — and a CLAUDE.md written so coding agents can navigate the codebase without being re-briefed every session.",
    keyDecision:
      "Every AI action routes through one deterministic pipeline — a semantic-router orchestrator, specialised agents, Zod-validated tools — so nothing about agent behaviour is spaghetti or hallucinated state.",
    extra:
      "Every AI-generated output is auto-captured to a searchable library via the Asset Interceptor, and human-in-the-loop approval gates pause execution before anything sensitive runs.",
    artifact: {
      kind: "image",
      src: "/_static/projects/shipaisaas.png",
      alt: "Ship AI SaaS — agentic chat interface with streaming and approval gates",
    },
  },
] as const;

export type CaseStudy = CaseStudyContent & {
  title: string;
  tagline: string;
  role: string;
  /** ISO date, real — `Project.date`. Not fabricated to a finer grain than
   *  what's already sourced there. */
  date: string;
  host: string;
  href: string;
  techStack: readonly string[];
};

/** Every slug this route can render — feeds `generateStaticParams`. */
export function getCaseStudySlugs(): readonly string[] {
  return CASE_STUDY_CONTENT.map((c) => c.slug);
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  const content = CASE_STUDY_CONTENT.find((c) => c.slug === slug);
  const project = getProjectBySlug(slug);
  if (!content || !project) return undefined;

  return {
    ...content,
    title: project.title,
    tagline: project.tagline,
    role: project.role ?? "Sole Developer",
    date: project.date,
    href: project.liveUrl ?? "",
    host: (project.liveUrl ?? "").replace(/^https?:\/\//, ""),
    techStack: project.techStack,
  };
}

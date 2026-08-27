import type { Metric } from "@/lib/data/architecture";

/**
 * Which of the three capability pillars a project demonstrates.
 *
 * Deliberately separate from `category`: `category` is what the thing
 * *is* (and drives the user-facing badge), `pillar` is what it *proves*.
 * The voice platform is infrastructure, not a SaaS app, yet it is the
 * strongest evidence for AI integration — one field cannot carry both.
 */
export type ProjectPillar =
  | "vertical-saas"
  | "ai-integration"
  | "ai-native-workflow";

export type ProjectCategory = "saas" | "ai" | "tool" | "website" | "platform";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  pillar: ProjectPillar;
  /** Appears on /work. */
  featured?: boolean;
  /** Gets a full row on the landing page rather than a compact entry. */
  spotlight?: boolean;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  screenshot?: string;
  date: string;
  role?: string;
  /** Two headline claims, surfaced on /work and the case study hero. */
  metrics?: Metric[];
}

/**
 * Order matters: it drives the 01…05 numbering on both /work and the
 * landing preview. Nothing sorts by `date`, so inserting a project
 * mid-array renumbers everything after it.
 */
export const PROJECTS: Project[] = [
  {
    slug: "voice-ai-platform",
    title: "Voice AI Platform",
    tagline: "Speech-to-speech agents, as a service.",
    description:
      "A decoupled, multi-tenant voice-agent backend that lets any SaaS product embed a real-time speech-to-speech assistant with its own UI and its own user-scoped tools. Tenant apps publish their backend tools over MCP; a shared LiveKit agent worker discovers them at connect time — no changes to the platform. Short-lived audience-scoped JWTs, tenant API keys, and per-tenant origin allowlists keep every room isolated.",
    category: "platform",
    pillar: "ai-integration",
    featured: true,
    spotlight: true,
    techStack: [
      "Python",
      "FastAPI",
      "LiveKit",
      "WebRTC",
      "OpenAI Realtime",
      "xAI Grok Voice",
      "MCP",
      "Next.js",
    ],
    liveUrl: "https://call.velombe.com",
    date: "2026-06-20",
    role: "Architect & Sole Developer",
    metrics: [
      { value: "Multi-tenant", label: "One worker, N isolated apps" },
      { value: "MCP", label: "Runtime tool discovery" },
    ],
  },
  {
    slug: "vibescore",
    title: "VibeScore",
    tagline: "Objective scores for AI-built apps.",
    description:
      "A SaaS directory and leaderboard ranking vibe-coded applications on verifiable build data parsed straight from CLI transcripts. A 1–100 composite score — assembled in SQL from window functions and CTEs — weighs time-to-ship, token usage, and API-equivalent cost against calibrated thresholds, turning “built with AI” from a claim into a number you can compare.",
    category: "saas",
    pillar: "ai-native-workflow",
    featured: true,
    spotlight: true,
    techStack: [
      "Next.js 16",
      "TypeScript",
      "Drizzle ORM",
      "PostgreSQL",
      "Stripe",
      "Better-Auth",
      "Vercel AI SDK",
    ],
    liveUrl: "https://vibescore.dev",
    date: "2026-07-10",
    role: "Sole Developer & Designer",
    metrics: [
      { value: "1–100", label: "Composite build score" },
      { value: "SQL-native", label: "Ranking via window fns + CTEs" },
    ],
  },
  {
    slug: "twy",
    title: "Twy",
    tagline: "Think freely. Twy organizes.",
    description:
      "An AI-first capture app that takes messy thoughts — typed, spoken, or photographed — and transforms them into structured tasks and ideas automatically. No folders, no tags, no setup. Just capture and let the AI do the categorisation. Cross-device, instant, and free to start.",
    category: "ai",
    pillar: "ai-integration",
    featured: true,
    spotlight: true,
    techStack: ["Next.js", "OpenAI", "OCR", "PostgreSQL"],
    liveUrl: "https://heytwy.com",
    screenshot: "/_static/projects/twy.png",
    date: "2026-04-01",
    role: "Sole Developer & Designer",
    metrics: [
      { value: "pgvector", label: "Hybrid semantic retrieval" },
      { value: "Voice-native", label: "Queryable over MCP" },
    ],
  },
  {
    slug: "invoiceboard",
    title: "InvoiceBoard",
    tagline: "Create invoices at the speed of thought.",
    description:
      "An AI-powered invoicing platform for freelancers and agencies. Describe an invoice in plain language and InvoiceBoard generates it instantly. Automated payment reminders, secure payment links, multi-currency with automatic tax, and a financial dashboard that shows exactly what's owed — no accountant required.",
    category: "saas",
    pillar: "vertical-saas",
    featured: true,
    techStack: ["Next.js", "Vercel AI SDK", "OpenAI", "PostgreSQL", "Stripe"],
    liveUrl: "https://invoiceboard.vercel.app",
    screenshot: "/_static/projects/invoiceboard.png",
    date: "2026-05-14",
    role: "Sole Developer & Designer",
    metrics: [
      { value: "1 week", label: "MVP to production" },
      { value: "Plain language", label: "Invoice drafting" },
    ],
  },
  {
    slug: "ship-ai-saas",
    title: "Ship AI SaaS",
    tagline: "The most production-ready AI SaaS boilerplate.",
    description:
      "A battle-tested Next.js boilerplate that eliminates months of setup. Agentic chat UI with streaming, Better-Auth with team workspaces, Stripe billing, background job queues via Upstash QStash, and a human-in-the-loop approval system — all documented in CLAUDE.md so AI agents can actually work with the codebase.",
    category: "tool",
    pillar: "vertical-saas",
    featured: true,
    techStack: [
      "Next.js",
      "Better-Auth",
      "Stripe",
      "Drizzle",
      "Upstash",
      "Resend",
    ],
    liveUrl: "https://shipaisaas.com",
    screenshot: "/_static/projects/shipaisaas.png",
    date: "2026-03-01",
    role: "Sole Developer & Designer",
    metrics: [
      { value: "80%", label: "Dev-time reduction" },
      { value: "3 days", label: "Average time to first deploy" },
    ],
  },
];

/** Curated orbit set — capped at 14: TechOrbitCloud is a fixed 420×420 box
 *  and the outer ring visibly crowds beyond that. */
export const ORBIT_TECH = [
  "Next.js",
  "TypeScript",
  "Python",
  "FastAPI",
  "LiveKit",
  "MCP",
  "OpenAI",
  "PostgreSQL",
  "Drizzle",
  "Stripe",
  "Better-Auth",
  "Tailwind",
  "React",
  "Vercel AI",
];

export const PILLAR_LABEL: Record<ProjectPillar, string> = {
  "vertical-saas": "Vertical SaaS",
  "ai-integration": "AI Integration",
  "ai-native-workflow": "AI-Native Workflow",
};

export const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  ai: "AI Product",
  saas: "SaaS",
  tool: "Dev Tool",
  website: "Website",
  platform: "Platform",
};

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

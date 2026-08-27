/**
 * Every string and asset path this template renders. Section components hold
 * zero hardcoded copy. Structure follows COPY.md in this folder.
 *
 * ── Sourcing ──────────────────────────────────────────────────────────
 * Content is REAL, drawn from VELOMBE.md, lib/data/projects.ts,
 * lib/data/pillars.ts and config/site.ts. Anything not sourced is marked
 * with a [BRACKETED] placeholder so it is greppable before launch.
 *
 * No testimonials and no rate card: both would mean inventing facts about
 * real people. See COPY.md §9.
 */

/* ── Work artifacts ──────────────────────────────────────────────────────
   Discriminated union rather than an optional `screenshot` string, so the
   renderer switches exhaustively and a fourth kind is a compile error. Same
   shape as `PillarArtifact` in lib/data/pillars.ts — same problem, and the
   codebase already reads that way.

   Array members are `readonly` because the export below is `as const`;
   without it a readonly tuple fails to satisfy a mutable array type.
────────────────────────────────────────────────────────────────────────── */

export type TerminalLine = {
  kind: "prompt" | "out" | "ok" | "dim";
  text: string;
};

export type WorkArtifact =
  | { kind: "image"; src: string; alt: string }
  | {
      kind: "diagram";
      caption: string;
      nodes: readonly { label: string; sub: string; emphasis?: boolean }[];
    }
  | { kind: "terminal"; title: string; lines: readonly TerminalLine[] };

export const BRAND = "Velombe";
export const FULL_NAME = "Jean Chrinot";

/**
 * Path-qualified ("/#work", not "#work") because nav renders on every page
 * in the (landing) route group, not just the home page it targets — see
 * anchorHandler in primitives.tsx for how that's resolved off the home page.
 */
export const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "How I build", href: "/#build" },
  { label: "About", href: "/#about" },
  { label: "Stack", href: "/#stack" },
] as const;

export const AVAILABILITY = {
  status: "Available",
  detail: "Open to remote roles & contracts",
} as const;

/* ── 1. Hero ───────────────────────────────────────────────────────────*/

export const HERO = {
  eyebrow: "Available — open to remote roles & contracts",

  /**
   * Rotating display sentences, sliced-reveal one after another.
   *
   * Every entry is TWO lines on purpose. Equal line counts keep the block
   * height identical through the swap, so nothing below the headline shifts
   * as it cycles. Keep new lines to ~20 characters — beyond that they wrap
   * at the display size and the reserved height stops being right.
   */
  rotating: [
    ["I design SaaS", "products end to end."],
    ["I build real-time", "AI systems."],
    ["I take products from", "idea to production."],
    ["I use AI to ship", "software faster."],
  ],

  /**
   * The H1's real content. The visual rotator is aria-hidden — an H1 whose
   * text mutates every few seconds is bad for screen readers and gives
   * crawlers a moving target — so this stable sentence carries it.
   */
  headlineSr:
    "I design SaaS products end to end, build real-time AI systems, take products from idea to production, and use AI to ship software faster.",

  /** Static anchor under the rotator — the positioning line stays put. */
  tagline: "Whole products. Not features.",

  /** Square crop, head and shoulders. See the note in hero.tsx on framing. */
  portrait: {
    src: "/_static/velombe-2.png",
    alt: `${FULL_NAME} — AI systems engineer`,
  },

  /* ── Parked: used only by hero-pinned.tsx, which is not rendered ──────
     Kept rather than deleted — the pinned-scroll hero is worth another
     attempt, and this is the copy it needs. Nothing below this comment
     reaches the live page until that variant ships. */

  /**
   * Layer 1 of the pinned sequence. Deliberately the smallest amount of
   * information that answers "who is this": a face, a name, a role, a
   * place.
   */
  greeting: {
    hello: "Hello — I'm",
    name: FULL_NAME,
    role: "AI Systems Engineer",
    location: "Istanbul, Türkiye",
    scrollHint: "Scroll",
  },

  /** Closes layer 2. The sequence has to land on an action, not just stop. */
  closing: {
    headline: "So — what are you building?",
  },

  /** One entry per layer of the pinned sequence; drives the progress rail. */
  sceneLabels: ["Intro", "Proof"],
  /** The recruiter's five-second answer, set on a hairline rule. */
  specimen: [
    FULL_NAME,
    "AI Systems Engineer",
    "Istanbul, Türkiye",
    "Remote worldwide",
  ],
  subhead:
    "I take software from schema to Stripe webhook to production VPS without a handoff. Five products in production, and they use each other — one rebuilt in a week on a boilerplate I also built, another talking to a voice platform I also built. The model is the easy part; the plumbing around it is the work.",
  primaryCta: "View my work",
  secondaryCta: "Get in touch",
  /** 2×2 hairline grid. `spotlight` marks the single lime value. */
  ledger: [
    { value: "5", label: "Products in production", spotlight: true },
    { value: "5+", label: "Years shipping" },
    { value: "3", label: "Companies, one lead role" },
    { value: "M.Sc.", label: "Computer Engineering, 2026" },
  ],
  /**
   * Fold transition. The tools rather than a screenshot gallery — the work
   * already gets large visuals in §3, and repeating those images above the
   * fold spends the page's strongest asset before the argument starts.
   *
   * The tools and their icons live in tech-icons.tsx.
   */
  stripLabel: "Stack I build with every day",
} as const;

/* ── 1b. Portrait-led hero ─────────────────────────────────────────────
   Alternative hero: text column left, a tall portrait bleeding in from the
   right and feathered into the page. Rendered by hero-portrait.tsx.

   It reuses HERO.rotating, HERO.tagline, HERO.portrait and the two CTA
   labels — only the pieces specific to this composition live here.
────────────────────────────────────────────────────────────────────────── */

export const HERO_PORTRAIT = {
  /** Signature line at the top, in place of the reference's script name. */
  signature: BRAND,
  signatureRole: "AI Systems Engineer",

  /**
   * Segmented so individual phrases can carry the accent inline, the way
   * the reference sets its name and company in gold. Two accented spans is
   * the ceiling — a third and the eye stops treating them as emphasis.
   */
  intro: [
    {
      text: "I'm a full-stack software engineer and product designer specializing in ",
    },
    { text: "SaaS and AI systems. ", accent: true },
    {
      text: "From LLMs to real-time voice, ",
    },
    {
      text: "I build and ship products end-to-end ",
      accent: true,
    },
    {
      text: ", driven by a passion for understanding the big picture and making complex pieces work together.",
    },
  ],

  /**
   * The same cut-out the main landing page uses — a transparent PNG, not a
   * photo on a background. HERO.portrait stays the framed studio shot the
   * parked square-crop hero needs.
   */
  image: {
    src: "/_static/velombe-2.png",
    alt: "Velombe",
  },

  footnote: "Istanbul · Remote worldwide · Available for roles & contracts",
} as const;

/* ── 2. The stack — signature section ──────────────────────────────────
   Three chains, each one a capability with its proof directly beneath.
   They map onto the three pillars in lib/data/pillars.ts, instantiated with
   real products instead of adjectives.

   EVERY EDGE HERE IS SOURCED. From VELOMBE.md:
     · InvoiceBoard — "Re-architected … utilizing the proprietary Ship AI
       SaaS boilerplate" within a single week.
     · Twy — "Wired the application directly to the Multi-Tenant Voice AI
       Platform via MCP."
   If Twy or VibeScore also sit on the boilerplate, add a chain — do not
   assume it. An unverifiable arrow is worse than a missing one.
────────────────────────────────────────────────────────────────────────── */

export const STACK = {
  eyebrow: "The stack",
  headline: "Five products that feed each other.",
  subhead:
    "Most portfolios are a list. This one is a dependency graph. Each arrow below is a real import, not a theme — the boilerplate makes the products cheaper to build, the voice platform gives one of them a capability it could not have alone, and the scoring tool measures whether any of it is actually fast.",
  chains: [
    {
      pillar: "Vertical SaaS",
      top: { title: "Ship AI SaaS", sub: "boilerplate", href: "#work" },
      edge: "built on",
      bottom: {
        title: "InvoiceBoard",
        sub: "MVP to production in a week",
        href: "#work",
      },
      takeaway:
        "InvoiceBoard shipped in a week because auth, billing and deploys were already solved.",
    },
    {
      pillar: "AI Integration",
      top: {
        title: "Voice AI Platform",
        sub: "multi-tenant, MCP",
        href: "#work",
      },
      edge: "exposes tools over MCP",
      bottom: { title: "Twy", sub: "queried entirely by voice", href: "#work" },
      takeaway:
        "Twy ships no speech code. It publishes tools and the platform calls them.",
    },
    {
      pillar: "AI-Native Workflow",
      top: { title: "VibeScore", sub: "1–100 composite", href: "#work" },
      edge: "measures",
      bottom: {
        title: "Every build above",
        sub: "parsed from CLI transcripts",
        ghost: true,
      },
      takeaway:
        "Built it because “I ship fast with AI” is worthless as an unverified claim.",
    },
  ],
  /** Client work sits outside the graph on purpose — it is someone else's
   *  system, not part of this one. */
  aside:
    "Client engagements sit outside this graph — they are someone else's system, not part of mine. Billet.mg is below.",
} as const;

/* ── 3. Selected work ──────────────────────────────────────────────────
   Three tiers on purpose. Identical rows would flatten the flagship into
   the boilerplate, and pretending every project earns a hero treatment is
   what makes portfolios feel padded.
────────────────────────────────────────────────────────────────────────── */

export const WORK = {
  eyebrow: "Selected work",
  headline: "The work, and the decisions behind it.",
  subhead:
    "These are the products and systems I've spent the most time building. From SaaS applications to AI infrastructure, each one reflects a different part of how I approach software.",
  flagship: {
    index: "01",
    title: "Voice AI Platform",
    tagline: "Speech-to-speech agents that any product can rent.",
    host: "call.velombe.com",
    href: "https://call.velombe.com",
    caseStudy: "/work/voice-ai-platform",
    year: "2026",
    role: "Architect & Sole Developer",
    lede: "Speech-to-speech agents that any SaaS product can rent, without giving up its own interface or its own data.",
    blocks: [
      {
        label: "Problem",
        body: "Adding a voice assistant normally means rebuilding the audio pipeline, the agent loop and the tool layer inside your own product. Every app pays that cost again, and every app's tools get hard-coded into whichever agent framework it picked.",
      },
      {
        label: "What I built",
        body: "A decoupled, multi-tenant voice backend. A tenant app authenticates with an API key, receives a short-lived audience-scoped JWT, and publishes its own backend tools over MCP. A shared LiveKit agent worker discovers those tools at connect time and calls them bound to the end user's scope. The client is custom Web Audio API — synthesised ringtones, waveform visualisers, and a voice-cloning enrolment flow.",
      },
      {
        label: "Key decision",
        body: "Tools are resolved per connection, never compiled in. That is the whole design: onboarding a tenant takes zero platform deploys, and a tenant can add a tool without me ever seeing it.",
      },
      // {
      //   label: "Also true",
      //   body: "Runs on a self-managed Ubuntu VPS — systemd units, Nginx reverse proxies, dev/prod isolation, Let's Encrypt. Not a Vercel deploy.",
      // },
    ],
    metric: "0 deploys to onboard a tenant",
    stack: [
      "Python",
      "FastAPI",
      "LiveKit",
      "WebRTC",
      "OpenAI Realtime",
      "xAI Grok Voice",
      "MCP",
      "Next.js",
    ],
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
  majors: [
    {
      index: "02",
      title: "VibeScore",
      tagline: "Turns “built with AI” into a number you can compare.",
      host: "vibescore.dev",
      href: "https://vibescore.dev",
      caseStudy: "/work/vibescore",
      year: "2026",
      role: "Sole Developer & Designer",
      body: "A directory and leaderboard ranking AI-built apps on build data parsed straight from CLI transcripts — not self-reported. A 1–100 composite weighs time-to-ship, token usage and API-equivalent cost against calibrated thresholds.",
      decision:
        "Scoring lives in the query, not the app. Window functions and CTEs through Drizzle mean rankings recompute on read, so a new submission reorders the board without a batch job.",
      metric: "1–100 composite score",
      stack: [
        "Next.js 16",
        "Drizzle ORM",
        "PostgreSQL",
        "Stripe",
        "Better-Auth",
      ],
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
      index: "03",
      title: "Twy",
      tagline: "A second brain you can talk to.",
      host: "heytwy.com",
      href: "https://heytwy.com",
      caseStudy: "/work/twy",
      year: "2026",
      role: "Sole Developer & Designer",
      body: "Typed, spoken, or photographed input goes in unstructured and comes back organized into related tasks, ideas, and notes. Hybrid semantic retrieval runs on pgvector with OpenAI's text-embedding-3-small model.",
      decision:
        "Twy ships no speech code. It publishes tools and lets the Voice AI Platform call them over MCP — the payoff for building that platform as infrastructure rather than a feature.",
      metric: "Voice-native over MCP",
      stack: ["Next.js", "pgvector", "OpenAI", "MCP"],
      artifact: {
        kind: "image",
        src: "/_static/projects/twy.png",
        alt: "Twy — AI capture interface with auto-clustered notes and tasks",
      },
    },
  ],
  compactLabel: "Also shipped",
  compact: [
    {
      index: "04",
      title: "InvoiceBoard",
      host: "invoiceboard.vercel.app",
      href: "https://invoiceboard.vercel.app",
      caseStudy: "/work/invoiceboard",
      year: "2026",
      note: null,
      body: "Describe an invoice in plain language and it generates the document. Automated reminders, payment links, multi-currency, and tax handling. Re-architected front to back in one week using my own boilerplate.",
      metric: "1 week — MVP to production",
      stack: ["Next.js", "Vercel AI SDK", "PostgreSQL", "Stripe"],
      clientWork: false,
    },
    {
      index: "05",
      title: "Ship AI SaaS",
      host: "shipaisaas.com",
      href: "https://shipaisaas.com",
      caseStudy: "/work/ship-ai-saas",
      year: "2026",
      note: null,
      body: "The boilerplate under the rest. Agentic chat with streaming, Better-Auth with team workspaces, Stripe billing, QStash background queues, human-in-the-loop approval — and a CLAUDE.md written so coding agents can navigate the codebase without being re-briefed every session.",
      metric: "80% dev-time reduction",
      stack: [
        "Next.js",
        "Better-Auth",
        "Stripe",
        "Drizzle",
        "Upstash",
        "Resend",
      ],
      clientWork: false,
    },
    /**
     * Client engagement. Only the name and the one-line descriptor are
     * known (they come from the root COPY.md). Everything bracketed needs
     * filling before launch — grep this file for "[" to find them all.
     */
    // {

    //   index: "06",
    //   title: "Billet.mg",
    //   host: "billet.mg",
    //   href: "[PROJECT URL]",
    //   caseStudy: "[CASE STUDY URL]",
    //   year: "[YEAR]",
    //   note: "[PLACEHOLDER — fill from your own records]",
    //   body: "Mobile booking infrastructure. [PROJECT DESCRIPTION — what it books, for whom, and what changed for them. Then: what you owned, and the one technical decision that mattered.]",
    //   metric: "[RESULT]",
    //   stack: ["[STACK]"],
    //   clientWork: true,
    // },
  ],
} as const;

/* ── 4. How I build ────────────────────────────────────────────────────
   Answers the founder's real question — "do I have to write you a spec?"
────────────────────────────────────────────────────────────────────────── */

export const BUILD = {
  eyebrow: "How I build",

  headline: "Start with the problem, not the spec.",

  subhead:
    "Bring me the problem and the constraints. I dive straight into the domain, isolate the core workflow, and build toward tangible value before over-engineering the rest.",

  steps: [
    {
      num: "01",
      title: "Understand the domain",
      body: "Before writing a line of code, I map out the users, the constraints, and the end goal. I want to understand the actual workflow, not just the feature request.",
    },
    {
      num: "02",
      title: "Isolate the core",
      body: "I identify the workflows that matter most and build around them first. A small, well-architected core gives the rest of the product a solid foundation to grow from.",
    },
    {
      num: "03",
      title: "Build with leverage",
      body: "I use AI tooling to accelerate implementation, exploration, and refactoring. But I drive the architecture, review the output, and stay strictly accountable for the code.",
    },
    {
      num: "04",
      title: "Keep the system coherent",
      body: "As the product scales, I obsess over the boundaries: architecture, data, APIs, and UI. Every new feature should make the system better, not just bigger.",
    },
    {
      num: "05",
      title: "Ship, learn, iterate",
      body: "Software only improves when it meets reality. I prioritize getting a working version into users' hands to learn and adapt, rather than trying to predict everything upfront.",
    },
  ],
} as const;

/* ── 5. About + experience ─────────────────────────────────────────────*/

export const ABOUT = {
  eyebrow: "About",
  headline: "I'd rather own the whole problem.",
  // Same transparent cut-out HERO_PORTRAIT.image uses, not the framed
  // studio shot — one portrait across the page instead of two different
  // photos of the same person.
  portrait: "/_static/velombe-2.png",
  portraitAlt: `${FULL_NAME}, AI systems engineer, Istanbul`,
  portraitCaption: "Istanbul, Türkiye",
  paragraphs: [
    "I'm a software engineer working across full-stack development, SaaS, and AI systems. I tend to gravitate toward focused, domain-specific products where understanding the problem matters as much as the technology behind it.",
    "I like being involved from the first idea through architecture, interface, implementation, and deployment. I've also led engineering work within a team, so I’m comfortable collaborating and handing off when that makes sense. What I enjoy most is staying close enough to the product that the technical decisions and the end result remain connected.",
    "For the past two years, I've also been working in clinical AI research alongside my M.Sc. at Kocaeli University. It's given me a useful perspective on the gap between building a capable model and building something that is actually useful.",
  ],
  experienceHeadline: "Where the hours went.",
  roles: [
    {
      company: "WINS Research Center",
      location: "Kocaeli, Türkiye",
      title: "AI Researcher & Frontend Designer",
      period: "2025 — Present",
      current: true,
      body: "Co-developing an AI clinical decision support system for diabetes self-management under a TÜSEB-funded initiative, coordinating between medical stakeholders and infrastructure teams. Trained a CNN food-classification model and calibrated its error rates for dietary volume estimation; wired in multimodal LLMs for spatial reasoning and portion analysis.",
    },
    {
      company: "SayHey Inc.",
      location: "Remote — Romania",
      title: "Lead AI Engineer",
      period: "Jun 2022 — Jul 2025",
      current: false,
      body: "Developed and shipped a SaaS chatbot-builder platform, integrating LLM capabilities via LangChain so customers could compose their own agents. Built the React Flow visual editor that cut configuration time. Owned sprint planning, architecture review and the technical roadmap for the team.",
    },
    {
      company: "MindView Platform",
      location: "Remote — Romania",
      title: "Full-Stack Web Developer",
      period: "Dec 2020 — Jun 2022",
      current: false,
      body: "Designed and deployed highly available applications on Laravel, React and Django REST. Designed relational and non-relational schemas across PostgreSQL, MySQL and MongoDB.",
    },
  ],
  ledgerTitle: "EDUCATION & LANGUAGES",
  ledger: [
    {
      label: "M.Sc. Computer Engineering",
      detail: "Kocaeli University · 2023–2026",
    },
    {
      label: "B.Sc. Electronics & Communication Eng.",
      detail: "Kocaeli University · 2016–2020",
    },
    {
      label: "Languages",
      detail: "Malagasy (native) · English · French · Turkish",
    },
  ],
} as const;

/* ── 6. Technical depth ────────────────────────────────────────────────
   Judgement first, chips as the footnote. The sentence is the section.
────────────────────────────────────────────────────────────────────────── */

export const DEPTH = {
  eyebrow: "Technical depth",

  headline: "What I reach for, and why.",

  subhead:
    "Not a proficiency chart. Four areas, each with the principles that shape how I use the tools.",

  groups: [
    {
      title: "AI & agentic",
      span: 4,
      opinion:
        "The model is one part of the system. I care just as much about context, tool boundaries, latency, failure handling, and what the application does when the model gets it wrong.",
      items: [
        "OpenAI Realtime",
        "xAI Grok Voice",
        "Vercel AI SDK",
        "LangChain",
        "LangGraph",
        "Model Context Protocol",
        "Tool calling",
        "Multi-agent workflows",
        "RAG",
        "pgvector",
        "Multimodal vision",
        "CNNs",
      ],
    },

    {
      title: "Product & frontend",
      span: 2,
      opinion:
        "The interface is part of the product, not a layer added at the end. I care about clear flows, useful feedback, and interfaces that make complex systems feel straightforward.",
      items: [
        "TypeScript",
        "Next.js",
        "React",
        "Tailwind CSS",
        "Web Audio API",
        "React Flow",
      ],
    },

    {
      title: "Backend & data",
      span: 3,
      opinion:
        "I prefer simple systems that keep important logic close to the data. Good schemas, well-designed queries, and clear boundaries usually remove more complexity than another layer of abstraction.",
      items: [
        "Node.js",
        "Python",
        "FastAPI",
        "Django",
        "Laravel",
        "PostgreSQL",
        "Neon",
        "Supabase",
        "MySQL",
        "MongoDB",
        "Drizzle ORM",
        "Prisma",
        "Better-Auth",
        "Stripe",
      ],
    },

    {
      title: "Real-time & infrastructure",
      span: 3,
      opinion:
        "I like understanding what happens below the application layer. Whether the system runs on managed infrastructure or a machine I manage myself, I want to understand how it is deployed, observed, and kept reliable.",
      items: [
        "LiveKit",
        "WebRTC",
        "WebSockets",
        "Asyncio",
        "AWS",
        "DigitalOcean",
        "Ubuntu",
        "Vercel",
        "systemd",
        "Nginx",
        "Let's Encrypt",
      ],
    },
  ],
} as const;

/* ── 7. Contact ────────────────────────────────────────────────────────*/

export const CONTACT = {
  eyebrow: "Next",
  headline: "Bring me the whole problem.",
  subhead:
    "Tell me what you're trying to build, what is getting in the way, and what constraints you're working with. A paragraph is enough to start. I'll take a look and let you know how I can help.",
  /** Section-closing CTA — routes to /hire rather than exposing the raw
   *  address here. `email` stays: the footer still links it directly. */
  cta: "Hire me",
  email: "hello@velombe.com",
  emailNote: "[VERIFY — VELOMBE.md lists jean.chrinot@gmail.com]",
  footnote: "Replies within one business day · Istanbul · Remote worldwide",
} as const;

export const FOOTER = {
  blurb:
    "AI systems engineer and full-stack developer. Istanbul, remote worldwide.",
  /** Mirrors NAV_LINKS exactly — the footer shouldn't offer a link the nav
   *  doesn't. */
  columns: [
    { title: "Sections", links: ["Work", "How I build", "About", "Stack"] },
  ],
  /** Icon row, no text labels. See FooterSocial in footer.tsx. */
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jean-chrinot-velombe/",
    },
    { label: "GitHub", href: "https://github.com/jeanchrinot" },
    { label: "X", href: "https://twitter.com/JeanChrinot" },
    { label: "Facebook", href: "https://www.facebook.com/jean.chrinot" },
    { label: "Instagram", href: "https://instagram.com/jean.chrinot" },
  ],
  legal: ["Colophon"],
  copyright: "Velombe",
} as const;

/* ── Colophon ──────────────────────────────────────────────────────────
   Every fact here is sourced from elsewhere in this codebase — fonts.ts's
   own role comments, package.json's actual versions, smooth-scroll.tsx's
   doc comment, CLAUDE.md's "no hardcoded strings" rule, VELOMBE.md's own
   line about AI-assisted development, and the accent-budget header in
   portfolio.css. Nothing here is written for this page alone. */

export const COLOPHON = {
  eyebrow: "Colophon",
  headline: "How this is built.",
  subhead:
    "The typefaces, the stack, and a few things about the process worth writing down.",
  groups: [
    {
      title: "Type",
      opinion:
        "Four faces, each with exactly one job — a display face is not a body face wearing a bigger size.",
      items: [
        "Cal Sans — display",
        "Instrument Sans — heading",
        "Manrope — body",
        "JetBrains Mono — mono",
      ],
    },
    {
      title: "Stack",
      opinion:
        "Next.js App Router end to end — server components by default, client only where interaction actually needs it.",
      items: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind CSS v4",
        "Motion",
        "next-intl",
        "Lucide",
      ],
    },
  ],
  notes: [
    {
      label: "Scroll",
      body: "The inertial scroll is about 90 lines of hand-rolled easing, not a Lenis dependency — swapping in real Lenis later is a two-line change.",
    },
    {
      label: "Content",
      body: "Every section reads from a typed data file. No hardcoded copy in a layout component, anywhere.",
    },
    {
      label: "Process",
      body: "Built with AI-assisted development — Claude Code drives the refactors, every diff is read before it ships.",
    },
    {
      label: "Accent",
      body: "One accent color on the whole site, rationed on purpose: lime means live, verified, or mine.",
    },
  ],
} as const;

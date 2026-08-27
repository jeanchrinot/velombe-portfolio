# velombe — copy & layout blueprint

Copy and structural blueprint for the solo-developer portfolio at
`/templates/velombe`. Follows the `[LAYOUT]` note convention established in
the root `COPY.md`.

Everything factual here traces to `VELOMBE.md`, `lib/data/projects.ts`,
`lib/data/pillars.ts` or `config/site.ts`. Anything that does not is marked
`[PLACEHOLDER]` and listed in §7. Nothing is invented.

---

## 0. Decisions made before any layout

### 0.1 Positioning

Most solo-dev portfolios claim *"I ship fast with AI."* Everyone claims it and
nobody can show it.

The genuinely unusual, checkable fact about this developer is that **his
projects are a system, not a list**:

- **Ship AI SaaS** is the boilerplate. Three of the other products run on it.
- **InvoiceBoard** was rebuilt front-to-back in a week *on that boilerplate*.
- **Voice AI Platform** is the hard infrastructure — WebRTC, MCP, tenant JWTs.
- **Twy** consumes that platform over MCP; you query your own notes by voice.
- **VibeScore** measures build velocity from CLI transcripts — the metric the
  rest of the portfolio is implicitly claiming.

He built the tools he builds with, and then built the thing that measures the
building. That compounds, and it is impossible for a template portfolio to
fake.

> **Positioning: one engineer with a compounding stack.**
> Not "full-stack developer." Not "AI enthusiast." Someone whose tooling makes
> the next product cheaper than the last, with five in production to show for
> it.

**Rejected alternatives, and why:**

| Option | Rejected because |
| --- | --- |
| "AI-native full-stack developer" | Every portfolio says this in 2026. Zero differentiation. |
| "Ships fast with AI" | An unprovable velocity claim. Worse: VibeScore exists precisely because that claim is unprovable. |
| "Voice AI / real-time specialist" | Narrows him to one project and hides the vertical-SaaS range. |

### 0.2 Audience

Four visitors, one page. It must not become generic serving all of them.

| Visitor | Wants | Served by |
| --- | --- | --- |
| Founder / potential client | "Can one person actually deliver my product?" | §2 stack graph, §3.1 flagship case study, §4 how I build |
| Engineering manager | "Is this real engineering or glue code?" | §3 technical decisions, §2 the MCP edge, §6 depth |
| Recruiter | Role, seniority, location, availability, stack | Hero specimen line, §5 experience ledger |
| Another developer | "Is this person legit?" | The architecture artifacts, `CLAUDE.md`-documented codebases |

**Design consequence:** the page front-loads *evidence* over *adjectives*. A
recruiter can scan the hero ledger in five seconds; an EM can dig into the
architecture diagrams without hitting a marketing wall.

### 0.3 Narrative

The brief's default is *Who I am → What I build → Proof → How I think →
Experience → Contact*. One change, deliberately:

> **Proof moves to position two.**

The strongest asset is the dependency graph between his own products. Holding
it until after a conventional "what I build" section wastes it. Showing the
system *immediately* after the hero is the differentiator, and everything
after reads as elaboration on something already believed.

Final order:

```
1  Hero              — positioning + credibility ledger
2  The stack         — the dependency graph (SIGNATURE SECTION)
3  Selected work     — case studies, non-uniform, flagship largest
4  How I build       — solo end-to-end lifecycle
5  About + Experience— who to work with, then what he owned
6  Technical depth   — categorised, judgement-led
7  Contact           — closing statement
```

### 0.4 Visual concept

**"Instrument panel."** Zinc-950 ground, hairline rules, monospace carrying
every number and identifier, one rationed lime accent meaning *live / verified
/ mine*. Editorial spacing, not dashboard density.

The look should say *this person reads logs* — without a single fake terminal
or matrix-green cliché. Reference points: a well-set technical spec sheet, not
a SaaS landing page.

Full accent rules live at the top of `portfolio.css`. Summary: ~6 lime marks per
viewport-height, never on body text, never on a primary button.

### 0.5 Primary visitor journey

```
Hero headline (2s)
  → ledger: "5 in production" (5s)
    → stack graph: "…and they feed each other" (20s)
      → flagship case study: "…and the hard one is genuinely hard" (60s)
        → contact
```

Every section after the graph exists to keep someone who already believes.

---

## 1. Hero

**[LAYOUT]** Not centred, and no single hero banner image — a lone screenshot
makes a portfolio look like a product page for one thing. Three-row editorial
stack inside `max-w-6xl`, full viewport height:

- **Row 1 — headline.** Oversized display type, full bleed to the container,
  two mask-revealed lines. `clamp(2.5rem, 8vw, 5.5rem)`.
- **Row 2 — specimen line.** A single hairline rule with a monospace strip
  sitting on it: `Jean Chrinot · AI Systems Engineer · Istanbul ·
  Available`. This is the recruiter's five-second answer. Lime status dot only.
- **Row 3 — two columns.** Left: supporting paragraph + both CTAs. Right: the
  **credibility ledger** — a 2×2 hairline grid, monospace values.
- **Fold transition — filmstrip.** Edge-to-edge horizontal strip of the five
  product screenshots at ~180px tall, scrim'd, scrolling at half speed against
  the page. It replaces the single banner, proves plurality immediately, and
  doubles as the entrance to §2. On mobile it becomes a swipeable overflow
  row, not a stack.

**Eyebrow (status pill):**
`Available — open to remote roles & contracts`

**Headline (2 lines):**
> **Whole products.**
> **Not features.**

**Specimen line (mono, on the rule):**
`Jean Chrinot` · `AI Systems Engineer` · `Istanbul` · `Remote worldwide`

**Supporting paragraph:**
> I take software from schema to Stripe webhook to production VPS without a
> handoff. Five products in production, three of them running on a boilerplate
> I also built. The model is the easy part — the plumbing around it is the
> work.

**Primary CTA:** `View my work`
**Secondary CTA:** `Get in touch`

**Credibility ledger (2×2):**

| Value | Label |
| --- | --- |
| `5` | Products in production |
| `5+` | Years shipping |
| `3` | Companies, one lead role |
| `M.Sc.` | Computer Engineering, 2026 |

*Note: "5" carries the lime — one accent mark in this band, not four.*

---

## 2. The stack — signature section

**[LAYOUT]** The section that makes this portfolio not a template. A real
dependency graph of his own products, rendered as CSS/flex boxes with SVG
connectors (not an image, not a chart library).

Desktop, 12-col:

```
                  ┌──────────────────┐
                  │  Voice AI        │  ← infrastructure tier
                  │  Platform        │
                  └────────┬─────────┘
                           │ queries over MCP
   ┌───────────┐  ┌────────▼─────────┐  ┌───────────────┐
   │ Invoice   │  │  Twy             │  │  VibeScore    │  ← product tier
   │ Board     │  │                  │  │               │
   └─────┬─────┘  └────────┬─────────┘  └───────┬───────┘
         │ built on        │ built on           │ measures
   ┌─────▼──────────────────▼────────────────────▼───────┐
   │  Ship AI SaaS — the boilerplate underneath          │  ← foundation
   └─────────────────────────────────────────────────────┘
```

- Each node is a link to its case study in §3.
- Edges carry **labels** (`built on`, `queries over MCP`, `measures builds
  like these`) — the labels are the argument, not decoration.
- The foundation bar is full width and visually heaviest.
- Hovering a node dims the others and highlights its edges. Lime on the active
  edge only.
- **Mobile:** collapses to a nested definition list with the same relationships
  spelled out in words. No horizontal scroll, no pinch-zoom diagram.
  Accessible fallback is the same list, always in the DOM.

**Eyebrow:** `The stack`

**Headline:**
> **Five products that feed each other.**

**Supporting paragraph:**
> Most portfolios are a list. This one is a dependency graph. The boilerplate
> makes the products cheaper to build, the voice platform gives one of them a
> capability it could not have alone, and the scoring tool measures whether any
> of it is actually fast. Each arrow is a real import, not a theme.

**Three takeaways under the graph (mono labels, one line each):**

- `COMPOUNDING` — InvoiceBoard went MVP-to-production in a week because Ship AI
  SaaS already handled auth, billing and deploys.
- `COMPOSABLE` — Twy queries its own database by voice because the platform
  exposes tools over MCP, not because Twy shipped a speech feature.
- `MEASURED` — VibeScore parses CLI transcripts into a 1–100 build score. Built
  it because "I ship fast with AI" is worthless as an unverified claim.

---

## 3. Selected work

**[LAYOUT]** Case studies, not cards. Three deliberately different treatments —
identical rows would flatten the flagship into the boilerplate.

- **3.1 Flagship** — full-bleed row. Architecture artifact at 60% width, copy
  in a labelled sub-grid beside it: `Problem / What I built / Key decision /
  Outcome`. Own section, own vertical rhythm.
- **3.2–3.3 Majors** — alternating 7/5 rows, visual and copy swapping sides.
- **3.4–3.5 Compact** — a two-column index: title, one line, stack, link. Not
  every project earns a hero treatment, and pretending otherwise is what makes
  portfolios feel padded.

Two projects have **no screenshot**. They render their real architecture
instead — the MCP chain and the scoring transcript. Borrowing an unrelated
screenshot would be a false claim about real work.

**Eyebrow:** `Selected work`
**Headline:** **Five things in production.**
**Sub:** Every one shipped and running. Two have no screenshot worth showing,
so they show their architecture instead — which is the part that took the time.

### 3.1 Voice AI Platform — flagship

`call.velombe.com` · 2026 · Architect & Sole Developer

**One-liner:**
> Speech-to-speech agents that any SaaS product can rent, without giving up
> its own interface or its own data.

**Problem:**
> Adding a voice assistant to a product normally means rebuilding the audio
> pipeline, the agent loop and the tool layer inside that product. Every app
> pays the cost again, and every app's tools get hard-coded into whatever
> agent framework it picked.

**What I built:**
> A decoupled, multi-tenant voice backend. A tenant app authenticates with an
> API key, receives a short-lived audience-scoped JWT, and publishes its own
> backend tools over MCP. A shared LiveKit agent worker discovers those tools
> at connect time and calls them bound to the end user's scope. The frontend is
> custom Web Audio API — synthesised ringtones, waveform visualisers, and a
> voice-cloning enrolment flow.

**Key decision:**
> Tools are resolved per connection, never compiled in. That is the whole
> design. It means onboarding a new tenant app takes zero deploys of the
> platform, and a tenant can add a tool without me ever seeing it.

**Also true:** deployed on a self-managed Ubuntu VPS — systemd units, Nginx
reverse proxies, dev/prod isolation, Let's Encrypt. Not a Vercel deploy.

**Stack:** Python · FastAPI · LiveKit · WebRTC · OpenAI Realtime · xAI Grok
Voice · MCP · Next.js

**Outcome:** `0 deploys to onboard a tenant`
**Visual:** architecture diagram (5-node MCP chain, agent worker emphasised).

### 3.2 VibeScore — major

`vibescore.dev` · 2026 · Sole Developer & Designer

**One-liner:**
> Turns "built with AI" from a claim into a number you can compare.

**What I built:**
> A directory and leaderboard that ranks AI-built apps on build data parsed
> straight from CLI transcripts — not self-reported. A 1–100 composite weighs
> time-to-ship, token usage and API-equivalent cost against calibrated
> thresholds. The ranking is assembled in SQL: window functions and CTEs
> through Drizzle, not in application code.

**Key decision:**
> Scoring lives in the query, not the app. Rankings recompute on read, so a new
> submission reorders the board without a batch job.

**Also:** custom multi-source scraper with cross-run deduplication, AI-assisted
normalisation, Stripe for subscription tiers and a sponsor marketplace.

**Stack:** Next.js 16 · TypeScript · Drizzle ORM · PostgreSQL · Stripe ·
Better-Auth · Vercel AI SDK
**Outcome:** `1–100 composite build score`
**Visual:** terminal transcript artifact.

### 3.3 Twy — major

`heytwy.com` · 2026 · Sole Developer & Designer

**One-liner:**
> A second brain you can talk to. Capture anything; it does the filing.

**What I built:**
> Typed, spoken or photographed input goes in unstructured and comes out as
> clustered tasks and ideas — no folders, no tags, no setup. Hybrid semantic
> retrieval on pgvector with `text-embedding-3-small`. Wired to the Voice AI
> Platform over MCP, so you can query and edit your own private database
> entirely by voice. Weekly AI insight cards rendered server-side with Satori.

**Key decision:**
> Twy ships no speech code. It publishes tools and lets the platform call them
> — which is the payoff for building §3.1 as infrastructure rather than a
> feature.

**Stack:** Next.js · TypeScript · pgvector · Drizzle ORM · OpenAI · MCP · Stripe
**Outcome:** `Voice-native over MCP`
**Visual:** product screenshot.

### 3.4 InvoiceBoard — compact

`invoiceboard.vercel.app` · 2026

> Describe an invoice in plain language; it generates. Automated reminders,
> payment links, multi-currency with tax, and a dashboard showing what is
> actually owed. Re-architected front to back **in one week** on my own
> boilerplate — which is the point of having one.

**Stack:** Next.js · Vercel AI SDK · OpenAI · PostgreSQL · Stripe
**Outcome:** `1 week — MVP to production`

### 3.5 Ship AI SaaS — compact

`shipaisaas.com` · 2026

> The boilerplate under the rest. Agentic chat with streaming, Better-Auth with
> team workspaces, Stripe billing, QStash background queues, human-in-the-loop
> approval — and a `CLAUDE.md` written so coding agents can navigate the
> codebase without being re-briefed every session.

**Stack:** Next.js · Better-Auth · Stripe · Drizzle · Upstash · Resend
**Outcome:** `80% dev-time reduction`

---

## 4. How I build

**[LAYOUT]** Five steps on a horizontal rule that draws itself on scroll
(`scaleX` from `origin-left`, compositor-only). Step markers pop in behind it.
Below each: mono step number, title, two lines. Collapses to a vertical rail on
mobile with the same markers.

Not the generic *Understand → Design → Build → Ship → Iterate*. Written to
match how he actually works, and to answer the founder's real question: *do I
have to write you a spec?*

**Eyebrow:** `How I build`
**Headline:** **You don't need a finished spec.**
**Sub:** Bring me the problem and the constraints. I will come back with the
three screens the product hangs off, built against your real data — not a
slide deck.

| # | Title | Copy |
| --- | --- | --- |
| `01` | Read the domain | Your codebase, your support tickets, the workflow you are actually trying to replace. I arrive at kickoff with questions, not a proposal template. |
| `02` | Draw the spine | The two or three screens everything else hangs off, designed properly and built as real components against real data. Everything after this is filling in. |
| `03` | Build with agents, review as an engineer | Claude Code drives the refactors. I read every diff. Agent-assisted is a speed multiplier, not a substitute for knowing what the code does. |
| `04` | Ship to infrastructure you own | Vercel when Vercel is right, a self-managed VPS when it is not — systemd, Nginx, TLS, dev/prod isolation. Deployment is part of the build, not someone else's ticket. |
| `05` | Measure the build | Time-to-ship, tokens, cost-equivalent. I instrument delivery because I built the product that scores it. |

---

## 5. About + experience

**[LAYOUT]** Two-column, asymmetric. Left (5 cols, sticky): portrait in a 3:4
frame, greyscale at rest, colour on hover — the one chromatic note on an
otherwise monochrome page. Right (7 cols): About prose, then the experience
rail, then a credibility ledger.

Experience is a rail with a lime marker on the **current** role only — that is
the entire signal, and giving it to all three would say nothing. Two lines per
role maximum. This is not a CV; the CV is a download.

### About

**Headline:** **I'd rather own the whole problem.**

> I'm an AI engineer and technical architect. Most of my work is vertical SaaS
> — narrow, industry-specific products — rather than another horizontal tool,
> because the interesting constraints live in a domain.
>
> I work in public and I take the whole lifecycle: ideation, architecture,
> interface, deploy, and whatever breaks at 2am afterwards. That is a
> preference, not a limitation — I have led an engineering team through sprint
> planning and roadmap, and I am comfortable either way. But the work I do best
> is the work where nobody has to translate between the person who designed it
> and the person who shipped it.
>
> Currently splitting time between an M.Sc. at Kocaeli University and clinical
> AI research at WINS — which is where I learned that a model's accuracy and a
> product's usefulness are two different problems.
>
> Malagasy natively, plus English, French and Turkish. Based in Istanbul,
> working remote.

### Experience

**Headline:** **Where the hours went.**

**WINS Research Center** — *AI Researcher & Frontend Designer* · Kocaeli ·
2025–Present · **current**
> Co-developing an AI clinical decision support system for diabetes
> self-management under a TÜSEB-funded initiative, coordinating between medical
> stakeholders and infrastructure teams. Trained a CNN food-classification
> model and calibrated its error rates for dietary volume estimation; wired in
> multimodal LLMs for spatial reasoning and portion analysis.

**SayHey Inc.** — *Lead AI Engineer* · Remote, Romania · Jun 2022 – Jul 2025
> Architected and shipped a SaaS chatbot-builder platform, integrating LLM
> capabilities via LangChain so customers could compose their own agents. Built
> the React Flow visual editor that cut configuration time. Owned sprint
> planning, architecture review and the technical roadmap for the team.

**MindView Platform** — *Full-Stack Web Developer* · Remote, Romania ·
Dec 2020 – Jun 2022
> Designed and deployed highly available applications on Laravel, React and
> Django REST. Architected relational and non-relational schemas across
> PostgreSQL, MySQL and MongoDB.

### Credibility ledger

`M.Sc. Computer Engineering` — Kocaeli University, 2023–2026
`B.Sc. Electronics & Communication Engineering` — Kocaeli University, 2016–2020
`TÜSEB-funded research` — clinical decision support, ongoing
`Open source` — Ship AI SaaS boilerplate
`Languages` — Malagasy (native) · English · French · Turkish

---

## 6. Technical depth

**[LAYOUT]** Four categories, judgement-led. Each gets a **one-sentence point
of view** in body type, then the technologies as monospace chips underneath.
The sentence is the section; the chips are the footnote. No logo wall, no
percentage bars, no "proficiency" ratings.

Bento spans 4/2 then 3/3 so the AI block reads as the deepest.

**Eyebrow:** `Technical depth`
**Headline:** **What I reach for, and why.**

### AI & agentic
> The model is a dependency, not an architecture. What matters is tool scoping,
> failure modes and what happens when the call times out.

`OpenAI Realtime` `xAI Grok Voice` `Vercel AI SDK` `LangChain` `LangGraph`
`Model Context Protocol` `Tool calling` `Multi-agent workflows` `RAG`
`pgvector` `Multimodal vision` `CNNs`

### Product & frontend
> I design the interface before I build it, which is why the products above
> look like products and not admin panels.

`TypeScript` `Next.js 16 (App Router)` `React 19` `Tailwind CSS v4`
`Web Audio API` `React Flow`

### Backend & data
> Put the hard logic in the query. Window functions and CTEs beat a batch job
> and a cron entry almost every time.

`Node.js` `Python` `FastAPI` `Django` `Laravel` `PostgreSQL` `Neon` `Supabase`
`MySQL` `MongoDB` `Drizzle ORM` `Prisma` `Better-Auth` `Stripe`

### Real-time & infrastructure
> I run my own boxes when it is the right answer. Knowing what systemd does is
> not nostalgia; it is what lets you choose.

`LiveKit` `WebRTC` `WebSockets` `Asyncio` `AWS` `DigitalOcean` `Ubuntu VPS`
`Vercel` `systemd` `Nginx` `Let's Encrypt`

---

## 7. Contact

**[LAYOUT]** Full-width panel, left-aligned, generous vertical space. Email set
at display scale as the primary action with a lime rule that sweeps in from the
left on hover. Profile links as mono pills beneath. No contact form — a form is
a worse experience than an address for everyone involved.

**Eyebrow:** `Next`

**Headline:**
> **Bring me the whole problem.**

**Sub:**
> Not a ticket, not a finished spec — the actual thing you are trying to make
> work. A paragraph is plenty. If it is not a fit I will say so in the reply,
> and if I know someone better suited I will point you at them.

**Primary:** `hello@velombe.com` [VERIFY — VELOMBE.md lists
`jean.chrinot@gmail.com`; pick one public address]

**Links:** `github.com/jeanchrinot` · `@JeanChrinot` · `velombe.com` ·
`[LINKEDIN URL]`

**Footnote:** Replies within one business day · Istanbul · Remote
worldwide

---

## 8. SEO & metadata

- **Title:** `Jean Chrinot — AI Systems Engineer & Full-Stack Developer`
- **Meta description:** `Solo engineer building vertical SaaS and real-time AI
  systems end to end — schema to Stripe webhook to production. Five products in
  production, including a multi-tenant voice platform and an AI SaaS
  boilerplate.`
- **OG image:** rendered from the §2 stack graph, not a headshot — it is the
  most distinctive asset and it previews well at small sizes.
- **H1:** one only, the hero headline. Every section opener is an `<h2>`,
  project titles `<h3>`.
- Natural keyword coverage: *AI systems engineer, vertical SaaS, MCP, LiveKit,
  WebRTC, RAG, Next.js, real-time voice AI, Istanbul, remote*. No stuffing —
  each of these appears because it is load-bearing copy.

---

## 9. Content integrity ledger

### Verified — safe to ship

Five projects, their stacks, roles, live URLs and outcome figures · three
employers with dates and responsibilities · two degrees · four languages ·
location · GitHub and X handles · the "80% dev-time reduction" and "1 week MVP"
figures (both from `projects.ts` / `VELOMBE.md`).

### Deliberately absent

| Missing | Why |
| --- | --- |
| Testimonials | Would mean inventing quotes attributed to real former employers. §2 and §3 carry credibility instead. |
| Rates / pricing | A rate card is a claim about what you charge. Only you can make it. |
| User counts, revenue, uptime | Not recorded anywhere in the repo. Never estimate these. |

### Needs your input

| Marker | Question |
| --- | --- |
| `[VERIFY]` Public email | `hello@velombe.com` or `jean.chrinot@gmail.com`? |
| `[LINKEDIN URL]` | Not in the repo. Recruiters will look for it. |
| `[PLACEHOLDER]` Screenshots | Voice AI Platform and VibeScore have none. Architecture artifacts stand in — replace only if the real UI is stronger than the diagram. |
| `[PLACEHOLDER]` Per-project GitHub | Only the global profile is known. Ship AI SaaS is described as open source; a repo link would be strong proof. |
| `[UNVERIFIED]` AIDCARE, Ovennia, Billet.mg | Named in the root `COPY.md` but absent from `projects.ts`. If these are real client work they belong in §3 — they are the only client-facing projects mentioned anywhere, and this portfolio currently reads as entirely self-directed. |

### Tone rules applied

Banned throughout: *passionate, results-driven, innovative solutions,
cutting-edge, turning ideas into reality, love solving complex problems, eager
to learn, leveraging, exceptional results.* Every claim in this document is
either checkable or framed as a preference.

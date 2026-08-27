# Jean Chrinot Velombe

**AI-Native Software Engineer & Full-Stack Developer**
📍 Istanbul / Kocaeli, Türkiye | 📧 jean.chrinot@gmail.com | 🌐 velombe.com | 🐙 github.com/jeanchrinot

---

## 👨‍💻 About Me

I am an AI Engineer and Technical Architect specializing in building scalable, AI-driven web applications and vertical SaaS platforms from the ground up. I am deeply passionate about the "build in public" philosophy, focusing on creating highly specialized, industry-specific automation tools rather than generic horizontal applications.

With a strong foundation in both clinical research environments and digital product ownership, I take full ownership of the product lifecycle—from ideation and system architecture to production deployment. My engineering approach heavily leverages AI-assisted development (utilizing tools like Claude Code) to accelerate shipping cycles and execute complex full-stack refactors seamlessly.

I am comfortable operating across the entire stack, whether it involves engineering real-time WebRTC voice pipelines, designing hybrid semantic retrieval (RAG) systems, or crafting premium, minimalist frontends with bento-grid layouts and high-contrast aesthetics.

**Languages:** Proficient in English, Turkish, French, and a native speaker of Malagasy.

---

## 🛠️ Technical Arsenal

### AI & Agentic Stack

- **LLMs & Orchestration:** OpenAI Realtime, xAI Grok Voice, Vercel AI SDK, LangChain, LangGraph
- **Agentic Frameworks:** Model Context Protocol (MCP), Tool Calling, Multi-Agent Workflows
- **Data & Vision:** RAG, Vector Embeddings (pgvector), Multimodal Vision Models, CNNs, Prompt Engineering

### Full-Stack & Infrastructure

- **Frontend:** TypeScript, Next.js 16 (App Router), React 19, Tailwind CSS v4, Web Audio API
- **Backend:** Node.js, Python, FastAPI, Django, Laravel
- **Database:** PostgreSQL, Neon DB, Supabase (Storage/DB), MySQL, MongoDB, Drizzle ORM, Prisma
- **Real-Time:** LiveKit, WebSockets, WebRTC, Asyncio
- **Auth & Payments:** Better-Auth, Next-Auth, JWT Auth, Stripe (Webhooks, Subscriptions)
- **Cloud & DevOps:** AWS, DigitalOcean, custom Ubuntu VPS, Vercel, systemd, Nginx, Let's Encrypt (TLS)

---

## 💼 Professional Experience

### **WINS Research Center** | Kocaeli, Türkiye

_AI Researcher & Frontend Designer_ | **2025 – Present**

- Co-developed an AI-enabled clinical decision support system for diabetes self-management as part of a TÜSEB-funded initiative, coordinating between medical stakeholders and infrastructure teams.
- Engineered and trained a CNN-based food classification model, meticulously calibrating the variance and error rates of visual predictions for dietary volume estimation.
- Implemented Multimodal LLMs to execute complex spatial reasoning, visual inference, and food portion analysis within the clinical platform.

### **SayHey Inc.** | Remote, Romania

_Lead AI Engineer_ | **June 2022 – July 2025**

- Architected and deployed a scalable SaaS chatbot builder platform, integrating complex LLM capabilities via LangChain to enable the creation of custom AI agents.
- Engineered a dynamic, React Flow-based visual interface, significantly reducing configuration time and enhancing the UX for bot creators.
- Directed full-lifecycle software development, managing sprint planning, architecture reviews, and the technical roadmap for the engineering team.

### **MindView Platform** | Remote, Romania

_Full-Stack Web Developer_ | **December 2020 – June 2022**

- Designed and deployed highly available web applications utilizing Laravel, React, and Django REST frameworks.
- Architected scalable relational and non-relational database schemas across PostgreSQL, MySQL, and MongoDB.
- Delivered end-to-end feature implementations, ensuring seamless integration between complex backend logic and user-facing frontend components.

---

## 🚀 Selected Projects

### **1. Real-Time Multi-Tenant Voice AI Platform** (`call.velombe.com`)

_Built with: Python, FastAPI, Next.js, LiveKit (WebRTC), OpenAI/xAI Realtime APIs, MCP_

- Architected a decoupled, voice-agent-as-a-service backend allowing independent SaaS products to embed speech-to-speech assistants with custom UIs and secure, user-scoped tools.
- Integrated the Model Context Protocol (MCP) for dynamic tool discovery, enabling tenant apps to expose backend tools to a shared LiveKit agent worker without altering core backend code.
- Designed a rigorous security model utilizing short-lived, audience-scoped JWTs, tenant API-key auth, and wildcard origin allowlists.
- Built a custom Web Audio API frontend with synthesized ringtones, waveform visualizers, and an AI voice-cloning pipeline for custom persona enrollment.
- Deployed on a custom Ubuntu VPS setup handling multi-environment (dev/prod) isolation, systemd services, and Nginx reverse proxies.

### **2. VibeScore** (`vibescore.dev`)

_Built with: Next.js 16, TypeScript, Drizzle ORM, PostgreSQL, Stripe, Better-Auth, Vercel AI SDK_

- Engineered a full-stack SaaS directory and leaderboard ranking AI-built ("vibe-coded") applications based on objective, verifiable build data parsed directly from CLI transcripts (Claude Code/ccusage).
- Developed a proprietary 1–100 composite scoring algorithm utilizing complex SQL (window functions and CTEs via Drizzle ORM) to rank build efficiency (time-to-ship, token usage, API equivalent costs) across calibrated thresholds.
- Built a custom multi-source web scraper with cross-run deduplication and an AI-assisted data normalization pipeline.
- Integrated Stripe for subscription tiers and one-off checkout flows to power a sponsor and ad marketplace.

### **3. Twy: AI-Powered Note Organizer** (`heytwy.com`)

_Built with: Next.js, TypeScript, PostgreSQL (pgvector), Drizzle ORM, OpenAI API, MCP, Stripe_

- Developed a full-stack SaaS digital second-brain utilizing the Vercel AI SDK to transform unstructured inputs (voice, text, images) into structured, auto-clustered data.
- Implemented a hybrid semantic retrieval system (RAG) using pgvector and OpenAI’s text-embedding-3-small model.
- Wired the application directly to the Multi-Tenant Voice AI Platform via MCP, enabling users to query and manipulate their private databases strictly via voice commands.
- Developed a weekly AI insights engine generating dynamic, server-rendered social cards using Vercel Satori.

### **4. Ship AI SaaS Boilerplate** (`starter.shipaisaas.com`)

_Built with: Next.js, Tailwind CSS, Drizzle ORM, Better-Auth, Supabase_

- Engineered a production-ready, open-source premium Next.js boilerplate optimized for the rapid deployment of AI-integrated vertical SaaS applications.
- Designed a highly secure and scalable technical foundation utilizing Drizzle ORM and Better-Auth for robust session management, routing to Supabase strictly for optimized database and storage layers.

### **5. InvoiceBoard** (`invoiceboard.vercel.app`)

_Built with: Next.js, React, TypeScript, Tailwind CSS, Vercel AI SDK_

- Developed a smart invoicing SaaS for freelancers, enabling AI-based invoice document generation and automated payment reminders via custom AI workflows.
- Re-architected the frontend components and state management within a single week utilizing the proprietary Ship AI SaaS boilerplate.

---

## 🎓 Education

**M.Sc. Computer Engineering**
_Kocaeli University_ | Kocaeli, Türkiye | 2023 – 2026

**B.Sc. Electronics & Communication Engineering**
_Kocaeli University_ | Kocaeli, Türkiye | 2016 – 2020

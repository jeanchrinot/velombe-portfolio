# Role & Context

You are an elite Next.js/Tailwind frontend developer and SaaS UX architect. Your task is to build a high-converting, premium B2B SaaS landing page template. Analyze current landing page components and use what you can/should use. The page components must be modular.

This page will serve as the core demo for an AI SaaS boilerplate. It needs to look like a multi-million dollar AI SaaS product.

# Design & Vibe Constraints

- **Strict Theming:** Do NOT use hardcoded Tailwind colors (like `bg-blue-500` or `text-gray-900`). You must strictly use CSS variables from the `globals.css` theme (e.g., `bg-background`, `text-foreground`, `bg-primary`, `text-primary-foreground`, `border-border`, `bg-muted`).
- **The Vibe:** It must be highly "vibe-coder friendly"—clean lines, perfect padding, and a sleek, modern structure.
- **No Obvious AI Tropes:** Strictly avoid "obvious AI shit UI" (no glowing purple magic wands, no generic chatbox graphics, no overly sci-fi gradients). It should look like serious, high-ticket enterprise software that happens to be powered by autonomous background agents.
- **Use alternating background nuance for sections**

# Required Components (Top to Bottom)

Please generate the Next.js component structure and copy for the following sections:

## 1. The Hero Section

- **Badge:** A small pill badge at the top (e.g., "v2.0 is live: Introducing Autonomous Agents").
- **Typography:** A massive, punchy H1 and a compelling subheadline focusing on saving time/automating work.
- **CTAs:** Two buttons (Primary: "Start Free Trial", Secondary: "Book a Demo").
- **Avatar Stack (Trust Badge):** A row of 5 overlapping user avatars with the text "Trusted by 10,000+ forward-thinking teams" right below the CTAs.

## 2. Dashboard Preview (The "Wow" Factor)

- A massive, beautifully framed mock image/dashboard UI component showing the software in action. Add a subtle shadow and border radius to make it pop against the background.

## 3. Logo Cloud

- "Powered by the best" - A horizontal, grayscale row of 5-6 dummy enterprise logos (e.g., Acme Corp, GlobalTech).

## 4. The Feature Grid (Bento Box Style)

- A modern, asymmetrical Bento Grid highlighting 4 core features (e.g., Background Workflows, Human-in-the-Loop, Secure Storage, Custom Personas). Use subtle borders (`border-border`) and muted backgrounds (`bg-muted/50`) for the cards.

## 5. How It Works (Step-by-Step)

- A clean 1-2-3 vertical or horizontal layout showing the user journey: 1. Connect Data, 2. AI Agents Process, 3. Review & Ship.

## 6. Social Proof: Testimonials

- **Video Testimonial:** A featured, large card with a video thumbnail, play button, and a quote.
- **Masonry Text Grid:** 3-4 text-based testimonial cards with 5-star icons, user names, and job titles (e.g., "This saved our agency 40 hours a week.").

## 7. Pricing Cards (use current pricing cards)

## 8. FAQ (Accordion)

- A standard accordion component answering 4-5 common objections (Security, Onboarding time, Integrations).

## 9. Bottom CTA

- A final, high-contrast banner section to catch users who scrolled to the bottom. "Ready to put your workflows on autopilot?" with a final primary button.

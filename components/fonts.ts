import { Instrument_Sans, JetBrains_Mono, Manrope } from "next/font/google";
import localFont from "next/font/local";

/**
 * The site's type stack — three faces meant to read as one house style,
 * plus a real monospace.
 *
 * The mono is the difference that matters. On a product or studio page a
 * system mono stack is fine, because mono only ever sets a caption. Here it
 * carries metrics, tech names, terminal output and architecture labels, so
 * it is load-bearing type and gets a chosen face like every other role.
 *
 * Declared under `--font-portfolio-*` (distinct from assets/fonts/index.ts's
 * `--font-sans`/`--font-serif`/`--font-mono`) so the two font stacks never
 * collide within the same inherited CSS custom-property namespace.
 */

/** Display — hero headline and section openers. */
export const fontPortfolioDisplay = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  weight: "600",
  style: "normal",
  variable: "--font-portfolio-display",
  display: "swap",
  adjustFontFallback: "Arial",
});

/** Headings — project titles, card titles, nav. */
export const fontPortfolioHeading = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-portfolio-heading",
  display: "swap",
});

/** Body — paragraphs, captions, meta. */
export const fontPortfolioBody = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-portfolio-body",
  display: "swap",
});

/** Mono — metrics, tech names, terminal transcripts, pipeline labels. */
export const fontPortfolioMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-portfolio-mono",
  display: "swap",
});

export const portfolioFontVariables = [
  fontPortfolioDisplay.variable,
  fontPortfolioHeading.variable,
  fontPortfolioBody.variable,
  fontPortfolioMono.variable,
].join(" ");

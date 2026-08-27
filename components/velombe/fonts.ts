import { Instrument_Sans, JetBrains_Mono, Manrope } from "next/font/google";
import localFont from "next/font/local";

/**
 * Velombe's type stack. Same three faces as the other two templates — they
 * are meant to read as one house style — plus a real monospace.
 *
 * The mono is the difference that matters. On a product or studio page a
 * system mono stack is fine, because mono only ever sets a caption. Here it
 * carries metrics, tech names, terminal output and architecture labels, so
 * it is load-bearing type and gets a chosen face like every other role.
 *
 * Declared under `--font-velombe-*` so this folder imports nothing from
 * templates/nocturne or templates/atelier. Only one template ever mounts per
 * request, so the duplicate Google declarations cost nothing at runtime.
 */

/** Display — hero headline and section openers. */
export const fontVelombeDisplay = localFont({
  src: "../../assets/fonts/CalSans-SemiBold.woff2",
  weight: "600",
  style: "normal",
  variable: "--font-velombe-display",
  display: "swap",
  adjustFontFallback: "Arial",
});

/** Headings — project titles, card titles, nav. */
export const fontVelombeHeading = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-velombe-heading",
  display: "swap",
});

/** Body — paragraphs, captions, meta. */
export const fontVelombeBody = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-velombe-body",
  display: "swap",
});

/** Mono — metrics, tech names, terminal transcripts, pipeline labels. */
export const fontVelombeMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-velombe-mono",
  display: "swap",
});

export const velombeFontVariables = [
  fontVelombeDisplay.variable,
  fontVelombeHeading.variable,
  fontVelombeBody.variable,
  fontVelombeMono.variable,
].join(" ");

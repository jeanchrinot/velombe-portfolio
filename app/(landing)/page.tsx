import { VelombeAbout } from "@/components/velombe/about";
import { VelombeBuild } from "@/components/velombe/build";
import { VelombeContact } from "@/components/velombe/contact";
import { VelombeDepth } from "@/components/velombe/depth";
import { VelombeHeroPortrait } from "@/components/velombe/hero-portrait";
import { VelombeWork } from "@/components/velombe/work";
import { constructMetadata } from "@/lib/utils";

const TITLE = "Jean Chrinot Velombe - AI Systems Engineer";

export const metadata = {
  // constructMetadata always appends " | Velombe" to whatever title it's
  // given — right for a short page name like "Hire me", but TITLE already
  // carries the full name, so that suffix would just repeat "Velombe" a
  // second time in the browser tab. Spread everything else it computes
  // (OG/Twitter titles, description, icons, etc. — those read the raw
  // `title` param, not the suffixed one, so they're already correct) and
  // override only the top-level title with the literal string.
  ...constructMetadata({
    title: TITLE,
    description:
      "I architect AI systems that ship to production: real-time voice platforms, vertical SaaS, and measured AI-native delivery. Full-stack developer and AI engineer based in Istanbul.",
  }),
  title: TITLE,
};

/**
 * The real homepage, rendered from components/velombe/ — forked from the
 * (templates)/templates/velombe demo, which still exists unchanged at
 * /templates/velombe and renders the same components independently from
 * its own untouched copy under components/templates/velombe/. Nav and
 * footer moved out of this file and into layout.tsx, where they wrap
 * every page in this route group instead of just this one.
 *
 * Section order follows COPY.md §0.3 (components/velombe/).
 *
 * The dependency-graph section (components/velombe/stack.tsx) is PARKED,
 * not deleted — it sat here at position two and is now unrendered, kept
 * for reuse on a case-study page where the relationships it draws have a
 * project to hang off. Re-adding it is one import and one line.
 *
 * With it gone the work section takes position two, so the page argues
 * through the projects themselves rather than through a diagram about them.
 *
 * `SectionRule` (primitives.tsx) is likewise PARKED. It sat between work /
 * build / about / depth / contact as an animated seam divider; the sliding
 * treatment was not right and the sections are back to plain whitespace
 * until a better one turns up. Re-adding it is one import and four lines.
 */
export default function LandingPage() {
  return (
    <main>
      {/* Three hero variants exist. Only this one is rendered; the other
          two are parked and swap in by changing this line:
            hero.tsx         → <VelombeHero />        (portrait on the
                               right as a squircle, centred column)
            hero-pinned.tsx  → <VelombeHeroPinned />  (scroll sequence) */}
      <VelombeHeroPortrait />
      <VelombeWork />
      <VelombeBuild />
      <VelombeAbout />
      <VelombeDepth />
      <VelombeContact />
    </main>
  );
}

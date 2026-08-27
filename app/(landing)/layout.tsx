import "@/components/portfolio.css";

import { cn } from "@/lib/utils";
import { portfolioFontVariables } from "@/components/fonts";
import { Footer } from "@/components/footer";
import { Loader } from "@/components/loader";
import { Nav } from "@/components/nav";
import { SmoothScroll } from "@/components/smooth-scroll";

/**
 * The site's only layout below the root, rendered from components/*.
 * Every route lives under this one route group — no locale segment, no
 * sibling chrome to differentiate from.
 *
 * Nav and footer live HERE rather than in page.tsx so every route in the
 * group inherits both for free — a page dropped in here only ever needs
 * its own <main> content.
 */
export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn("portfolio relative min-h-screen", portfolioFontVariables)}>
      <SmoothScroll />
      <div className="v-grain" aria-hidden />
      <Loader />
      <Nav />
      {children}
      <Footer />
    </div>
  );
}

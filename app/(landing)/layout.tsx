import "@/components/velombe/velombe.css";

import { cn } from "@/lib/utils";
import { velombeFontVariables } from "@/components/velombe/fonts";
import { VelombeFooter } from "@/components/velombe/footer";
import { VelombeLoader } from "@/components/velombe/loader";
import { VelombeNav } from "@/components/velombe/nav";
import { SmoothScroll } from "@/components/velombe/smooth-scroll";

/**
 * The site's only layout below the root, rendered from components/velombe/
 * — a fork of the original templates/velombe design (not part of this
 * repo; see CLAUDE.md). This is a portfolio-only repo: every route lives
 * under this one route group, so there's no sibling (marketing) chrome to
 * differentiate from and no locale segment above this — app/layout.tsx is
 * the direct parent.
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
    <div className={cn("velombe relative min-h-screen", velombeFontVariables)}>
      <SmoothScroll />
      <div className="v-grain" aria-hidden />
      <VelombeLoader />
      <VelombeNav />
      {children}
      <VelombeFooter />
    </div>
  );
}

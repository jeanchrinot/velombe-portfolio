import "@/components/velombe/velombe.css";

import { cn } from "@/lib/utils";
import { velombeFontVariables } from "@/components/velombe/fonts";
import { VelombeFooter } from "@/components/velombe/footer";
import { VelombeLoader } from "@/components/velombe/loader";
import { VelombeNav } from "@/components/velombe/nav";
import { SmoothScroll } from "@/components/velombe/smooth-scroll";

/**
 * The live homepage's layout, rendered from components/velombe/ — a fork
 * of components/templates/velombe/, which still exists unchanged as the
 * source for the /templates/velombe showcase page. The two copies are
 * independent from here on.
 *
 * A sibling route group to (marketing), not a page inside it: (marketing)/
 * layout.tsx wraps every route under it in the site's NavBar/SiteFooter and
 * a fixed `pt-14`, neither of which this design wants — Velombe brings its
 * own fixed nav, its own footer, and full-bleed sections.
 *
 * Root [locale]/layout.tsx is still the parent of both groups — the locale
 * segment, next-intl messages, and site fonts stay exactly as they are for
 * every route, including this one.
 *
 * Nav and footer live HERE rather than in page.tsx, mirroring how
 * (marketing)/layout.tsx wraps NavBar/SiteFooter around its own {children}.
 * The payoff: any future page moved into this group inherits both for free
 * — no per-page import — which matters once /work, /hire etc. join this
 * group in a later phase. A page dropped in here only ever needs its own
 * <main> content.
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

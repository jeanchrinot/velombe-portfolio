import { VelombeHire } from "@/components/velombe/hire";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Hire me",
  description:
    "Custom SaaS and AI products, AI feature integration, and template customization — tell me what you're building and I'll reply within one business day.",
});

/**
 * Moved into (landing) rather than (marketing) so it inherits VelombeNav /
 * VelombeFooter / the loading curtain from (landing)/layout.tsx — same
 * reason the homepage and the case study route live here. The old
 * (marketing)/hire/page.tsx is removed, since a URL can only resolve to
 * one page; components/forms/hire-form.tsx and its GlowCard/SectionHeading
 * styling are left in place, just unreferenced by this route now.
 */
export default function HirePage() {
  return (
    <main>
      <VelombeHire />
    </main>
  );
}

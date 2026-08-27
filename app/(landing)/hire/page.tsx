import { Hire } from "@/components/hire";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Hire me",
  description:
    "Custom SaaS and AI products, AI feature integration, and template customization — tell me what you're building and I'll reply within one business day.",
});

/**
 * Inherits Nav / Footer / the loading curtain from (landing)/layout.tsx
 * like every other route.
 */
export default function HirePage() {
  return (
    <main>
      <Hire />
    </main>
  );
}

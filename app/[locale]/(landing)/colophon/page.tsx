import { VelombeColophon } from "@/components/velombe/colophon";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Colophon",
  description:
    "The typefaces, the stack, and a few notes on how this site was built.",
});

/**
 * Lives in (landing) like the homepage, the case studies and /hire, so it
 * inherits VelombeNav / VelombeFooter / the loading curtain from
 * (landing)/layout.tsx.
 */
export default function ColophonPage() {
  return (
    <main>
      <VelombeColophon />
    </main>
  );
}

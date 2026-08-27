import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { VelombeCaseStudy } from "@/components/velombe/case-study";
import { getCaseStudy, getCaseStudySlugs } from "@/components/velombe/case-studies";
import { constructMetadata } from "@/lib/utils";

/**
 * The dynamic Velombe case study page, at the same URL the old Systems &
 * Proof design used (/work/[slug]) — that route lived in (marketing) and
 * is removed, since a URL can only resolve to one page. Its component
 * (components/work/case-study-layout.tsx) and data (lib/data/
 * case-studies.ts) are left in place, unreferenced, same as every other
 * "parked" file in this codebase.
 *
 * Lives in (landing) rather than (marketing) so it inherits VelombeNav,
 * VelombeFooter and the loading curtain from (landing)/layout.tsx — the
 * same reason the homepage moved there.
 */

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);

  if (!cs) return constructMetadata({});

  return constructMetadata({
    title: `${cs.title} — Case Study`,
    description: cs.about,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);

  if (!cs) notFound();

  return (
    <main>
      <VelombeCaseStudy cs={cs} />
    </main>
  );
}

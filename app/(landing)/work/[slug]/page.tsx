import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudy } from "@/components/case-study";
import { getCaseStudy, getCaseStudySlugs } from "@/components/case-studies";
import { constructMetadata } from "@/lib/utils";

/**
 * The dynamic case study page, /work/[slug] — inherits Nav, Footer, and
 * the loading curtain from (landing)/layout.tsx like every other route.
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
      <CaseStudy cs={cs} />
    </main>
  );
}

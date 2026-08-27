import { VelombeLegalPage } from "@/components/velombe/legal";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Terms",
  description: "Terms of use for this site.",
});

const SECTIONS = [
  {
    heading: "Content",
    body: "The case studies, writing, and code samples on this site describe real projects. They're shared for evaluation purposes — reuse of specific text, designs, or code beyond that requires asking first.",
  },
  {
    heading: "No warranty",
    body: "This site and its content are provided as-is, without warranty of any kind. Project outcomes described in case studies reflect specific engagements and aren't a guarantee of future results.",
  },
  {
    heading: "Inquiries",
    body: "Submitting the /hire form is not a contract or an engagement — it's a starting point for a conversation. Any actual engagement is governed by its own separate agreement.",
  },
  {
    heading: "Changes",
    body: "These terms may be updated as the site changes. Continued use after an update means you accept the current version.",
  },
];

export default function TermsPage() {
  return (
    <main>
      <VelombeLegalPage
        eyebrow="Legal"
        headline="Terms"
        updated="2026"
        sections={SECTIONS}
      />
    </main>
  );
}

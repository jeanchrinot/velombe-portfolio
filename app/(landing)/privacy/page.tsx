import { VelombeLegalPage } from "@/components/velombe/legal";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Privacy Policy",
  description: "What this site collects, and what it does with it.",
});

const SECTIONS = [
  {
    heading: "What this site collects",
    body: "The /hire form is the only place this site collects personal information: name, email address, and whatever project details you choose to write. Submitting it sends that information to hello@velombe.com by email — nothing is written to a database.",
  },
  {
    heading: "Analytics",
    body: "Page-view analytics are collected via Vercel Analytics, which is cookieless and does not track individuals across sites or sessions.",
  },
  {
    heading: "Cookies",
    body: "This site does not set cookies of its own. The theme toggle (light/dark) is stored in your browser's localStorage, not a cookie, and never leaves your device.",
  },
  {
    heading: "Third parties",
    body: "Form submissions are relayed through Resend (email delivery) and hosting/analytics run on Vercel. Neither is used for advertising or resold to third parties.",
  },
  {
    heading: "Contact",
    body: "Questions about this policy or a request to delete a prior inquiry can be sent to hello@velombe.com.",
  },
];

export default function PrivacyPage() {
  return (
    <main>
      <VelombeLegalPage
        eyebrow="Legal"
        headline="Privacy Policy"
        updated="2026"
        sections={SECTIONS}
      />
    </main>
  );
}

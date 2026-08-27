import { SiteConfig } from "types";
import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "Velombe",
  description:
    "AI systems engineer and full-stack developer — real-time voice platforms, vertical SaaS, and AI-native product delivery.",
  url: site_url,
  ogImage: `${site_url}/_static/og.png`,
  links: {
    twitter: "https://twitter.com/JeanChrinot",
    github: "https://github.com/jeanchrinot",
  },
  mailSupport: "hello@velombe.com",
};

import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  const base = SITE.url.replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Explicitly keep public, indexable pages accessible to answer-engine search crawlers.
      {
        userAgent: ["OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "PerplexityBot"],
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

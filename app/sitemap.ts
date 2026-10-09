import { BLOG_POSTS } from "@/lib/blog";
import { CASE_STUDIES } from "@/lib/portfolio";
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { DEMO_PRODUCTS, PRODUCTS } from "@/lib/products";
import { SOLUTIONS } from "@/lib/solutions";
import { PRINT_SERVICES } from "@/lib/print/data/services";
import { PRINT_PRODUCTS } from "@/lib/print/data/products";

const BASE = SITE.url.replace(/\/$/, "");

function entry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  lastModified?: string,
) {
  return {
    url: `${BASE}${path}`,
    priority,
    changeFrequency,
    // Only publish a lastmod value where the content has a real editorial date.
    ...(lastModified ? { lastModified: new Date(`${lastModified}T00:00:00.000Z`) } : {}),
  } satisfies MetadataRoute.Sitemap[number];
}

const newestPost = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date))[0];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry("/", 1, "weekly"),

    /* Karen Chap: public service and product pages. Order forms are intentionally noindex. */
    entry("/print", 0.98, "weekly"),
    ...PRINT_SERVICES.map((service) => entry(`/print/services/${service.slug}`, 0.86, "monthly")),
    entry("/print/services", 0.84, "monthly"),
    ...PRINT_PRODUCTS.map((product) => entry(`/print/products/${product.slug}`, 0.8, "monthly")),
    entry("/print/portfolio", 0.72, "monthly"),
    entry("/print/about", 0.65, "monthly"),
    entry("/print/faq", 0.65, "monthly"),
    entry("/print/contact", 0.62, "monthly"),

    /* Karen Soft: core commercial, editorial, and trust pages. */
    entry("/services", 0.9, "monthly"),
    entry("/products", 0.9, "weekly"),
    ...PRODUCTS.map((product) => entry(`/products/${product.slug}`, 0.86, "monthly")),
    entry("/solutions", 0.84, "monthly"),
    ...SOLUTIONS.map((solution) => entry(`/solutions/${solution.slug}`, 0.78, "monthly")),
    entry("/demo", 0.82, "weekly"),
    ...DEMO_PRODUCTS.map((product) => entry(`/demo/${product.demoSlug}`, 0.68, "monthly")),
    entry("/demo/industries", 0.68, "monthly"),
    entry("/portfolio", 0.7, "monthly"),
    ...CASE_STUDIES.map((study) => entry(`/portfolio/${study.slug}`, 0.68, "monthly")),
    entry("/blog", 0.72, "weekly", newestPost?.date),
    ...BLOG_POSTS.map((post) => entry(`/blog/${post.slug}`, 0.66, "monthly", post.date)),
    entry("/about", 0.58, "monthly"),
    entry("/contact", 0.62, "monthly"),
    entry("/download-law-software", 0.48, "monthly"),
    entry("/docs", 0.42, "monthly"),
    entry("/privacy", 0.25, "yearly"),
    entry("/terms", 0.25, "yearly"),
  ];
}

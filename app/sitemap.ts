import { BLOG_POSTS } from "@/lib/blog";
import { CASE_STUDIES } from "@/lib/portfolio";
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { INDUSTRIES } from "@/lib/industries";
import { PRODUCTS } from "@/lib/products";
import { SOLUTIONS } from "@/lib/solutions";
import { PRINT_SERVICES } from "@/lib/print/data/services";
import { PRINT_PRODUCTS } from "@/lib/print/data/products";

const BASE = SITE.url.replace(/\/$/, "");

function entry(path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly") {
  return {
    url: `${BASE}${path}`,
    lastModified: new Date(),
    priority,
    changeFrequency,
  } satisfies MetadataRoute.Sitemap[number];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry("/", 1),
    /* ── کارن چاپ (زیرمجموعه) ── */
    entry("/print", 0.98),
    entry("/print/order", 0.9),
    ...PRINT_PRODUCTS.map(product => entry(`/print/order/${product.slug}`, 0.6, "monthly")),
    entry("/print/services", 0.86),
    ...PRINT_SERVICES.map((service) => entry(`/print/services/${service.slug}`, 0.82)),
    ...PRINT_PRODUCTS.map((product) => entry(`/print/products/${product.slug}`, 0.72, "monthly")),
    entry("/print/portfolio", 0.7, "weekly"),
    entry("/print/about", 0.6, "monthly"),
    entry("/print/faq", 0.55, "monthly"),
    entry("/print/contact", 0.55, "monthly"),

    /* ── سایت اصلی ── */
    ...["/solutions", "/docs", "/changelog", "/roadmap", "/status", "/privacy", "/terms", "/about/careers", "/download-law-software"].map(path => entry(path, 0.5, "monthly")),
    ...BLOG_POSTS.map(post => entry(`/blog/${post.slug}`, 0.65, "monthly")),
    ...CASE_STUDIES.map(post => entry(`/portfolio/${post.slug}`, 0.65, "monthly")),
    entry("/services", 0.9),
    entry("/products", 0.9),
    ...PRODUCTS.map((product) => entry(`/products/${product.slug}`, 0.85)),
    ...PRODUCTS.map((product) => entry(`/demo/${product.demoSlug}`, 0.8, "monthly")),
    entry("/demo", 0.88),
    entry("/demo/industries", 0.7),
    ...INDUSTRIES.map((industry) => entry(`/demo/industries/${industry.slug}`, 0.6, "monthly")),
    ...SOLUTIONS.map((solution) => entry(`/solutions/${solution.slug}`, 0.7)),
    entry("/portfolio", 0.7),
    entry("/blog", 0.68),
    entry("/about", 0.6, "monthly"),
    entry("/contact", 0.62),
  ];
}

import { BLOG_POSTS } from "@/lib/blog";
import { CASE_STUDIES } from "@/lib/portfolio";
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { PRODUCTS } from "@/lib/products";
import { SOLUTIONS } from "@/lib/solutions";
import { PRINT_SERVICES } from "@/lib/print/data/services";
import { PRINT_PRODUCTS } from "@/lib/print/data/products";
import { defineSitemap, type SitemapEntry, type SitemapRouteInput } from "@/lib/seo-kit";

const BASE = SITE.url.replace(/\/$/, "");

/**
 * آخرین تغییر مجله = جدیدترین تاریخ انتشار یا به‌روزرسانی هر مقاله.
 * اگر فقط `date` مبنا باشد، مقالات ویرایش‌شده lastmod کهنه اعلام می‌کنند.
 */
const latestPostUpdate = BLOG_POSTS.reduce<string | undefined>((latest, post) => {
  const candidate = post.modifiedDate && post.modifiedDate > post.date ? post.modifiedDate : post.date;
  return !latest || candidate > latest ? candidate : latest;
}, undefined);

/** فهرست کامل مسیرهای عمومی؛ `defineSitemap` آن را اعتبارسنجی و به XML-ready تبدیل می‌کند. */
function publicRoutes(): SitemapRouteInput[] {
  return [
    { path: "/", priority: 1, changeFrequency: "weekly" },

    /* کارن چاپ: صفحه‌های عمومی خدمات و محصولات. فرم‌های سفارش عمداً noindex و بیرون از نقشه‌اند. */
    { path: "/print", priority: 0.98, changeFrequency: "weekly" },
    ...PRINT_SERVICES.map((service) => ({ path: `/print/services/${service.slug}`, priority: 0.86 })),
    { path: "/print/services", priority: 0.84 },
    ...PRINT_PRODUCTS.map((product) => ({ path: `/print/products/${product.slug}`, priority: 0.8 })),
    { path: "/print/portfolio", priority: 0.72 },
    { path: "/print/about", priority: 0.65 },
    { path: "/print/faq", priority: 0.65 },
    { path: "/print/contact", priority: 0.62 },

    /* کارن سافت: صفحه‌های تجاری، تحریریه و اعتماد. */
    { path: "/services", priority: 0.9 },
    { path: "/qazvin", priority: 0.88, changeFrequency: "monthly" },
    { path: "/products", priority: 0.9, changeFrequency: "weekly" },
    ...PRODUCTS.map((product) => ({
      path: `/products/${product.slug}`,
      priority: product.slug === "hesabyar" ? 0.92 : 0.86,
      changeFrequency: product.slug === "hesabyar" ? ("weekly" as const) : ("monthly" as const),
      ...(product.slug === "hesabyar" ? { lastModified: "2026-10-28" } : {}),
    })),
    { path: "/solutions", priority: 0.84 },
    ...SOLUTIONS.map((solution) => ({ path: `/solutions/${solution.slug}`, priority: 0.78 })),
    { path: "/portfolio", priority: 0.7 },
    ...CASE_STUDIES.map((study) => ({ path: `/portfolio/${study.slug}`, priority: 0.68 })),
    { path: "/blog", priority: 0.72, changeFrequency: "weekly", lastModified: latestPostUpdate },
    ...BLOG_POSTS.map((post) => ({
      path: `/blog/${post.slug}`,
      priority: 0.66,
      lastModified: post.modifiedDate ?? post.date,
    })),
    { path: "/about", priority: 0.58 },
    { path: "/contact", priority: 0.62 },
    { path: "/download-law-software", priority: 0.48 },
    { path: "/docs", priority: 0.42 },
    { path: "/privacy", priority: 0.25, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.25, changeFrequency: "yearly" },
  ];
}

/** مسیرهای noindex؛ اگر روزی اشتباهی وارد نقشه شوند، build با خطا متوقف می‌شود. */
const NOINDEX_PATHS = ["/status", "/roadmap", "/changelog", "/about/careers", "/print/order"];

/** نقشهٔ اعتبارسنجی‌شده برای استفادهٔ داخلی، تست‌ها و گزارش سئو. */
export function sitemapEntries(): SitemapEntry[] {
  return defineSitemap({ baseUrl: BASE, routes: publicRoutes(), excluded: NOINDEX_PATHS });
}

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries();
}

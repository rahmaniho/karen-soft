import { BLOG_POSTS, type BlogPost } from "./blog";

/**
 * پیوند داخلی «صفحهٔ محصول ← مقالهٔ آموزشی».
 * برای هر محصول، مقاله‌هایی انتخاب می‌شوند که واقعاً به همان مسئله پاسخ می‌دهند؛
 * اگر مقالهٔ اختصاصی نبود، مقاله‌های عمومی و مرتبط نمایش داده می‌شوند.
 */
const POSTS_BY_PRODUCT: Record<string, string[]> = {
  "printing-management": ["printing-cost-control", "business-card-print-guide", "tract-print-checklist"],
  "law-office": ["legal-case-management", "smart-case-management", "why-lawyer-needs-website"],
  "law-book": ["law-book-launch", "legal-case-management"],
  hesabyar: ["hesabyar-personal-budget", "hesabyar-store-inventory", "online-store"],
  "taxi-management": ["taxi-management", "growth-strategies"],
  "online-store": ["online-store", "hesabyar-store-inventory"],
  "smart-building": ["office-automation", "growth-strategies"],
  "real-estate": ["growth-strategies", "online-store"],
  restaurant: ["office-automation", "growth-strategies"],
  "auto-parts": ["hesabyar-store-inventory", "online-store"],
  gym: ["growth-strategies", "security"],
  "karen-net": ["security", "direct-to-cell"],
};

/** مقاله‌های مرتبط یک محصول؛ حداکثر سه مورد و همیشه با شناسهٔ معتبر. */
export function relatedPostsForProduct(slug: string): BlogPost[] {
  const slugs = POSTS_BY_PRODUCT[slug] ?? ["office-automation", "growth-strategies"];
  return slugs
    .map((postSlug) => BLOG_POSTS.find((post) => post.slug === postSlug))
    .filter((post): post is BlogPost => Boolean(post))
    .slice(0, 3);
}

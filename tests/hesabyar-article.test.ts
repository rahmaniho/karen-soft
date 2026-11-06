import { describe, expect, it } from "vitest";
import { BLOG_POSTS } from "../lib/blog";
import { COMMUNITY_POSTS } from "../lib/community-posts";
import {
  HESABYAR_ARTICLE_POST,
  HESABYAR_ARTICLE_PATH,
} from "../lib/hesabyar-article";

describe("Karo articles", () => {
  it("preserves all three existing article URLs", () => {
    for (const slug of [
      "hesabyar-accounting-software",
      "hesabyar-personal-budget",
      "hesabyar-store-inventory",
    ]) {
      const post = BLOG_POSTS.find((item) => item.slug === slug)!;
      expect(post).toBeDefined();
      expect(post.title).toContain("کارو");
      expect(post.cover).toBe("/images/karo/logo.webp");
      expect(post.modifiedDate).toBe("2026-11-06");
    }
    expect(HESABYAR_ARTICLE_PATH).toBe("/blog/hesabyar-accounting-software");
    expect(
      HESABYAR_ARTICLE_POST.sections.map((section) => section.id),
    ).toContain("pricing");
  });
  it("removes misleading old tariffs and local-data claims", () => {
    const text = JSON.stringify(
      COMMUNITY_POSTS.filter((post) => post.category === "کارو"),
    );
    for (const obsolete of [
      "۲۷۰٬۰۰۰",
      "۱۳۰٬۰۰۰",
      "۷۰٬۰۰۰",
      "hesabyar.karen-soft.ir",
      "همگام‌سازی خودکار بین دستگاه‌ها وجود ندارد",
      "قالب نسخهٔ ۳",
      "نسخه فعلی نیز پایه جریان فروش",
    ])
      expect(text).not.toContain(obsolete);
    expect(text).toContain("روی سرور");
    expect(text).toContain("دستگاه‌های مختلف");
  });
});

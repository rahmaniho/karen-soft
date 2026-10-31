import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { COMMUNITY_POSTS } from "../lib/community-posts";
import { BLOG_POSTS } from "../lib/blog";
import sitemap from "../app/sitemap";
import { GET } from "../app/rss.xml/route";
import { pageMeta } from "../lib/seo";

describe("new illustrated editorial guides", () => {
  it("publishes two substantive illustrated posts for each requested topic", () => {
    for (const category of ["کارن چاپ", "مدرسه‌ی من", "حساب‌یار"]) {
      expect(COMMUNITY_POSTS.filter(post => post.category === category)).toHaveLength(2);
    }
    // شش راهنمای موضوعی + راهنمای میزبانی وب (مقالهٔ همراهِ پیشنهاد همکاری در فروش)
    expect(COMMUNITY_POSTS).toHaveLength(7);
    for (const post of COMMUNITY_POSTS) {
      expect(BLOG_POSTS.find(item => item.slug === post.slug)).toEqual(post);
      expect(existsSync(`public${post.cover}`)).toBe(true);
      expect(post.sections.length).toBeGreaterThanOrEqual(4);
      expect(post.sections.flatMap(section => section.paragraphs).join(" ").length).toBeGreaterThan(1500);
      expect(post.relatedLinks?.length).toBeGreaterThanOrEqual(2);
      for (const link of post.relatedLinks ?? []) {
        if (link.href.startsWith("/blog/")) expect(BLOG_POSTS.some(item => `/blog/${item.slug}` === link.href)).toBe(true);
      }
    }
    expect(BLOG_POSTS[0].slug).toBe("web-hosting-guide");
    expect(BLOG_POSTS[0].date).toBe("2026-10-30");
  });
  it("includes each post in sitemap, RSS and article social metadata", async () => {
    const urls = sitemap().map(item => item.url);
    const rss = await GET().text();
    for (const post of COMMUNITY_POSTS) {
      expect(urls.some(url => url.endsWith(`/blog/${post.slug}`))).toBe(true);
      expect(rss).toContain(`/blog/${post.slug}`);
      const metadata = pageMeta({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}`, images: [post.cover], openGraphType: "article", publishedTime: post.date });
      expect(metadata.openGraph).toMatchObject({ type: "article", description: post.excerpt });
      expect(metadata.alternates?.canonical).toContain(`/blog/${post.slug}`);
    }
  });
  it("illustrates the shared school introduction and links to its parent guide", () => {
    const source = readFileSync("components/sections/class1-community.tsx", "utf8");
    expect(source).toContain("<Class1Gallery />");
    expect(source).toContain('/blog/class1-learning-at-home');
  });
});

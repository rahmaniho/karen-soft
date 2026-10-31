import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { AFFILIATE_OFFERS, AFFILIATE_REL, HOSTING_OFFER } from "../lib/affiliate";
import { BLOG_POSTS } from "../lib/blog";
import { COMMUNITY_POSTS } from "../lib/community-posts";
import { HostingBanner } from "../components/sections/hosting-banner";

/**
 * پیشنهاد همکاری در فروش باید همیشه با همان لینک تأییدشده، با rel=sponsored و با
 * افشاگری پورسانت منتشر شود؛ این تست جلوی تغییر تصادفی هر سه مورد را می‌گیرد.
 */
describe("affiliate hosting offer", () => {
  it("uses exactly the affiliate URL and no other", () => {
    expect(HOSTING_OFFER.url).toBe("https://my.cpanel.ir/aff.php?aff=1535");
    const internal = new URL(HOSTING_OFFER.url);
    expect(internal.protocol).toBe("https:");
    expect(internal.searchParams.get("aff")).toBe("1535");
    for (const offer of AFFILIATE_OFFERS) {
      expect(offer.url.startsWith("https://")).toBe(true);
      expect(offer.disclosure.length).toBeGreaterThan(20);
    }
  });

  it("marks the link as sponsored and never as a plain link", () => {
    const source = readFileSync("components/sections/hosting-banner.tsx", "utf8");
    expect(AFFILIATE_REL).toBe("sponsored nofollow noopener noreferrer");
    expect(source).toContain("rel={AFFILIATE_REL}");
    expect(source).toContain("target=\"_blank\"");
    expect(source).not.toMatch(/href="https:\/\/my\.cpanel\.ir/);
  });

  it("discloses the commission next to the ad and labels it as advertising", () => {
    const source = readFileSync("components/sections/hosting-banner.tsx", "utf8");
    expect(source).toContain("HOSTING_OFFER.disclosure");
    expect(source).toContain("همکاری در فروش");
    expect(source).toContain("data-ad-slot");
  });

  it("is a server component without external scripts or images", () => {
    const source = readFileSync("components/sections/hosting-banner.tsx", "utf8");
    expect(source).not.toContain("\"use client\"");
    expect(source).not.toContain("<script");
    expect(source).not.toContain("<img");
    expect(typeof HostingBanner).toBe("function");
  });

  it("appears on the home page and inside its companion article", () => {
    const home = readFileSync("app/(site)/page.tsx", "utf8");
    expect(home).toContain("<HostingBanner");
    const post = COMMUNITY_POSTS.find((item) => item.slug === "web-hosting-guide");
    expect(post, "راهنمای میزبانی وب باید منتشر شود").toBeTruthy();
    expect(BLOG_POSTS.some((item) => item.slug === "web-hosting-guide")).toBe(true);
    const affiliateBlocks = post!.sections.flatMap((section) =>
      (section.blocks ?? []).filter((block) => block.type === "affiliate"),
    );
    expect(affiliateBlocks).toHaveLength(1);
    expect(affiliateBlocks[0].offer).toBe(HOSTING_OFFER.id);
    expect(post!.sections.at(-1)?.heading).not.toBe("پیشنهاد ما برای شروع");
    expect(post!.excerpt.length).toBeLessThanOrEqual(158);
  });
});

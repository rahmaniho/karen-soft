import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { HESABYAR_ARTICLE_PATH, HESABYAR_ARTICLE_POST, HESABYAR_ARTICLE_IMAGES, HESABYAR_ARTICLE_CTA } from "../../lib/hesabyar-article";
import { HESABYAR_PRODUCT_PATH, HESABYAR_WEB_URL } from "../../lib/hesabyar";

const noOverflow = async (page: import("@playwright/test").Page) =>
  expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), { timeout: 3000 }).toBe(true);

test("article is published in the journal with SEO metadata and structured data", async ({ page, request }) => {
  const response = await request.get(HESABYAR_ARTICLE_PATH);
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toContain(HESABYAR_ARTICLE_POST.metaTitle!);
  expect(html).toContain(HESABYAR_ARTICLE_POST.excerpt);
  expect(html).toContain(`rel="canonical" href="https://karen-soft.ir${HESABYAR_ARTICLE_PATH}"`);
  expect(html).toContain('property="og:type" content="article"');
  expect(html).toContain('name="twitter:card" content="summary_large_image"');
  expect(html).toContain('"@type":"BlogPosting"');
  expect(html).toContain('"@type":"BreadcrumbList"');
  await page.goto("/blog");
  await expect(page.locator(`a[href="${HESABYAR_ARTICLE_PATH}"]`).first()).toBeVisible();
});

test("table of contents, FAQ, images and CTAs work without console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(HESABYAR_ARTICLE_PATH);
  await page.evaluate(() => document.fonts.ready);
  const toc = page.getByRole("navigation", { name: "فهرست مقاله" });
  await expect(toc.locator('a[href^="#"]')).toHaveCount(HESABYAR_ARTICLE_POST.sections.length);
  await toc.getByRole("link", { name: "رایگان و حرفه‌ای" }).click();
  await expect(page).toHaveURL(new RegExp(`${HESABYAR_ARTICLE_PATH}#pricing$`));
  const hero = page.locator(".ks-ha-hero-figure img");
  await expect(hero).toHaveAttribute("alt", HESABYAR_ARTICLE_IMAGES.coverAlt);
  await expect.poll(() => hero.evaluate((node) => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  const features = page.locator(`img[src*="hesabyar-accounting"]`).nth(1);
  await features.scrollIntoViewIfNeeded();
  await expect.poll(() => features.evaluate((node) => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  const faq = page.getByRole("button", { name: "آیا اطلاعات بین گوشی و کامپیوتر همگام می‌شوند؟", exact: true });
  await faq.scrollIntoViewIfNeeded();
  await faq.click();
  await expect(faq).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("region", { name: "آیا اطلاعات بین گوشی و کامپیوتر همگام می‌شوند؟" })).toContainText("خیر");
  const finalCta = page.locator("#start");
  await expect(finalCta.getByRole("link", { name: HESABYAR_ARTICLE_CTA.primary.label, exact: true })).toHaveAttribute("href", HESABYAR_WEB_URL);
  await expect(finalCta.getByRole("link", { name: HESABYAR_ARTICLE_CTA.secondary.label, exact: true })).toHaveAttribute("href", HESABYAR_PRODUCT_PATH);
  expect(errors).toEqual([]);
});

for (const { theme, width } of [
  { theme: "light", width: 1440 },
  { theme: "light", width: 320 },
  { theme: "dark", width: 1440 },
  { theme: "dark", width: 320 },
] as const) {
  test(`article fits ${width}px and passes axe in ${theme}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.addInitScript((value) => localStorage.setItem("theme", value), theme);
    await page.goto(HESABYAR_ARTICLE_PATH);
    await page.evaluate(() => document.fonts.ready);
    await noOverflow(page);
    for (const link of await page.locator("#start a").all()) {
      expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    }
    const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    expect(result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.html) }))).toEqual([]);
    await page.locator("#comparison").scrollIntoViewIfNeeded();
    await noOverflow(page);
  });
}

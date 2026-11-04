import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import {
  HESABYAR_APK_URL,
  HESABYAR_IMAGE,
  HESABYAR_IMAGE_ALT,
  HESABYAR_LOGO,
  HESABYAR_RELEASE_CHANGES,
  HESABYAR_UPGRADE_INSTRUCTIONS,
  HESABYAR_VERSION,
} from "../../lib/hesabyar";

const noOverflow = async (page: import("@playwright/test").Page) =>
  expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), { timeout: 3000 }).toBe(true);

for (const path of ["/", "/products"]) {
  test(`shared download section exposes the exact APK and short update note on ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(path);
    const section = page.locator("#hesabyar-download");
    const download = section.locator("[data-hesabyar-apk]");
    await expect(download).toHaveCount(1);
    await expect(download).toHaveAttribute("href", HESABYAR_APK_URL);
    await expect(download).toContainText(HESABYAR_VERSION);
    await expect(section.locator(".ks-hesabyar-update-note")).toHaveText(HESABYAR_UPGRADE_INSTRUCTIONS);
    await expect(section).not.toContainText("Android Debug");
    await expect(section).not.toContainText("پیش از نصب بخوانید");
    await expect(page.locator('a[href*="hesabyar-1.3.0-test.apk"]')).toHaveCount(0);
    await noOverflow(page);
    await section.getByRole("link", { name: `تغییرات نسخهٔ ${HESABYAR_VERSION} و راهنمای به‌روزرسانی ←`, exact: true }).click();
    await expect(page).toHaveURL(/\/products\/hesabyar#release-notes$/);
    await expect(page.getByRole("heading", { name: `تازه در نسخهٔ ${HESABYAR_VERSION}`, exact: true })).toBeVisible();
  });
}

test("product release notes, checksum and short update FAQ are present in the initial page", async ({ page, request }) => {
  const response = await request.get("/products/hesabyar");
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toContain(HESABYAR_APK_URL);
  expect(html).toContain(HESABYAR_UPGRADE_INSTRUCTIONS);
  expect(html).not.toContain("Android Debug");
  expect(html).toContain('id="release-notes"');
  await page.goto("/products/hesabyar");
  const downloads = page.locator("[data-hesabyar-apk]");
  await expect(downloads).toHaveCount(2);
  for (const link of await downloads.all()) await expect(link).toHaveAttribute("href", HESABYAR_APK_URL);
  const notes = page.locator("#release-notes");
  await expect(notes.locator("article")).toHaveCount(HESABYAR_RELEASE_CHANGES.length);
  for (const change of HESABYAR_RELEASE_CHANGES) await expect(notes.getByRole("heading", { name: change.title, exact: true })).toBeVisible();
  await expect(notes.getByRole("link", { name: "دریافت فایل SHA-256", exact: false })).toHaveAttribute("href", `${HESABYAR_APK_URL}.sha256`);
  const question = `پیش از به‌روزرسانی به حساب‌یار ${HESABYAR_VERSION} چه کارهایی انجام دهم؟`;
  const faq = page.getByRole("button", { name: question, exact: true });
  await faq.click();
  await expect(faq).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("region", { name: question })).toHaveText(HESABYAR_UPGRADE_INSTRUCTIONS);
});

test("new official logo cover loads in the download section and social metadata", async ({ page, request }) => {
  const cover = await request.get(HESABYAR_IMAGE);
  expect(cover.status()).toBe(200);
  expect(cover.headers()["content-type"]).toContain("image/jpeg");
  const mark = await request.get(HESABYAR_LOGO);
  expect(mark.status()).toBe(200);
  expect(mark.headers()["content-type"]).toContain("image/png");
  await page.goto("/");
  const image = page.locator("#hesabyar-download [data-hesabyar-image]");
  await image.scrollIntoViewIfNeeded();
  await expect(image).toHaveAttribute("alt", HESABYAR_IMAGE_ALT);
  await expect.poll(() => image.evaluate((node) => (node as HTMLImageElement).naturalWidth)).toBeGreaterThanOrEqual(640);
  const dimensions = await image.evaluate((node) => {
    const img = node as HTMLImageElement;
    return { width: img.naturalWidth, height: img.naturalHeight, src: img.currentSrc };
  });
  expect(dimensions.height / dimensions.width).toBeCloseTo(864 / 1536, 2);
  expect(dimensions.src).toContain("hesabyar-cover.jpg");
  await page.goto("/products/hesabyar");
  await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute("content", /hesabyar-cover\.jpg/);
});

for (const theme of ["light", "dark"] as const) {
  test(`release page fits 320px and passes axe in ${theme}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.addInitScript(value => localStorage.setItem("theme", value), theme);
    await page.goto("/products/hesabyar");
    await page.evaluate(() => document.fonts.ready);
    await noOverflow(page);
    for (const link of await page.locator("[data-hesabyar-apk]").all()) {
      expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    }
    const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    expect(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.html) }))).toEqual([]);
    await page.locator("#release-notes").scrollIntoViewIfNeeded();
    await noOverflow(page);
  });
}

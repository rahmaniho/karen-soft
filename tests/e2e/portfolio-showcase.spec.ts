import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function openShowcase(page: Page, expectRunning = false) {
  await page.goto("/");
  // Autoplay pauses while the tab is hidden; parallel workers can leave it backgrounded.
  await page.bringToFront();
  const viewport = page.locator(".ks-work-viewport");
  // Instant scroll avoids a smooth-scroll race where the carousel moves under the pointer.
  await viewport.evaluate(element => element.scrollIntoView({ block: "center", behavior: "instant" }));
  // Park the pointer in the top-left corner (never over the scroller) and drop focus.
  await page.mouse.move(0, 0);
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur?.());
  await expect(page.locator(".ks-work-carousel")).toHaveAttribute("data-running", /^(true|false)$/);
  if (expectRunning) {
    await expect.poll(() => page.evaluate(() => document.visibilityState)).toBe("visible");
    await expect(page.getByRole("button", { name: "توقف حرکت خودکار نمونه‌کارها" })).toBeEnabled();
    await expect(page.locator(".ks-work-carousel")).toHaveAttribute("data-running", "true", { timeout: 15_000 });
  }
  return viewport;
}

test("portfolio cards replace the product grid and link to their case studies", async ({ page }) => {
  const viewport = await openShowcase(page);
  await expect(page.getByRole("heading", { name: "ایده‌هایی که جان گرفته‌اند." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "ابزارهایی که کار می‌کنند." })).toHaveCount(0);
  await expect(page.locator(".ks-work-group").first().locator("a")).toHaveCount(8);
  await page.locator(".ks-work-group").first().locator("a").first().click();
  await expect(page).toHaveURL(/\/portfolio\/qazvi-tasvir$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("قزوین تصویر");
});

test("manual arrows and keyboard work with reduced motion, without autoplay", async ({ page }) => {
  const viewport = await openShowcase(page);
  await expect(page.locator(".ks-work-carousel")).toHaveAttribute("data-reduced-motion", "true");
  await expect(page.getByRole("button", { name: "حرکت خودکار مطابق تنظیمات دستگاه غیرفعال است" })).toBeDisabled();
  const initial = await viewport.evaluate(element => element.scrollLeft);
  await page.waitForTimeout(250);
  expect(await viewport.evaluate(element => element.scrollLeft)).toBe(initial);
  await page.getByRole("button", { name: "نمونه‌کار بعدی", exact: true }).click();
  await expect.poll(() => viewport.evaluate(element => element.scrollLeft)).toBeLessThan(initial - 100);
  const next = await viewport.evaluate(element => element.scrollLeft);
  await page.getByRole("button", { name: "نمونه‌کار قبلی", exact: true }).click();
  await expect.poll(() => viewport.evaluate(element => element.scrollLeft)).toBeGreaterThan(next + 100);
  await viewport.focus();
  await page.keyboard.press("End");
  const end = await viewport.evaluate(element => element.scrollLeft);
  expect(end).toBeLessThan(-1000);
  await page.keyboard.press("Home");
  await expect.poll(() => viewport.evaluate(element => element.scrollLeft)).toBe(0);
});

test.describe("continuous motion", () => {
  test.use({ reducedMotion: "no-preference" });

  test("scrolls continuously and can be paused, resumed and hovered", async ({ page }) => {
    const viewport = await openShowcase(page, true);
    const carousel = page.locator(".ks-work-carousel");
    await expect(carousel).toHaveAttribute("data-running", "true");
    await expect.poll(() => viewport.evaluate(element => element.scrollLeft)).toBeLessThan(-15);
    await page.getByRole("button", { name: "توقف حرکت خودکار نمونه‌کارها" }).click();
    await expect(carousel).toHaveAttribute("data-running", "false");
    const paused = await viewport.evaluate(element => element.scrollLeft);
    await page.waitForTimeout(250);
    expect(await viewport.evaluate(element => element.scrollLeft)).toBe(paused);
    await page.getByRole("button", { name: "شروع حرکت خودکار نمونه‌کارها" }).click();
    await expect(carousel).toHaveAttribute("data-running", "true");
    await viewport.hover();
    await expect(carousel).toHaveAttribute("data-running", "false");
    await page.mouse.move(0, 0);
    await expect(carousel).toHaveAttribute("data-running", "true");
    await viewport.focus();
    await expect(carousel).toHaveAttribute("data-running", "false");
  });

  test("crosses the loop seam without running out of cards", async ({ page }) => {
    const viewport = await openShowcase(page, true);
    await page.getByRole("button", { name: "توقف حرکت خودکار نمونه‌کارها" }).click();
    const dimensions = await viewport.evaluate(element => {
      const group = element.querySelector(".ks-work-group")!;
      const gap = parseFloat(getComputedStyle(group.parentElement!).columnGap);
      const cycle = group.getBoundingClientRect().width + gap;
      element.scrollLeft = -cycle + 5;
      return { cycle, width: element.clientWidth };
    });
    await page.getByRole("button", { name: "شروع حرکت خودکار نمونه‌کارها" }).click();
    await expect.poll(() => viewport.evaluate(element => element.scrollLeft)).toBeGreaterThan(-100);
    const left = await viewport.evaluate(element => element.scrollLeft);
    expect(left).toBeLessThan(0);
    expect(dimensions.cycle).toBeGreaterThan(dimensions.width);
    await expect(page.locator(".ks-work-carousel")).toHaveAttribute("data-running", "true", { timeout: 10_000 });
  });

  test("dragging moves the cards without opening a project", async ({ page }) => {
    const viewport = await openShowcase(page);
    await page.getByRole("button", { name: "توقف حرکت خودکار نمونه‌کارها" }).click();
    const box = (await viewport.boundingBox())!;
    const x = box.x + box.width * 0.6;
    const y = box.y + 130;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x - 180, y, { steps: 12 });
    await page.mouse.up();
    await expect.poll(() => viewport.evaluate(element => element.scrollLeft)).toBeLessThan(-100);
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe("touch scrolling", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, reducedMotion: "no-preference" });

  test("a swipe moves the cards without following the project link", async ({ page, context }) => {
    const viewport = await openShowcase(page);
    const box = (await viewport.boundingBox())!;
    const session = await context.newCDPSession(page);
    const y = box.y + 130;
    // In an RTL scroller, dragging toward the right reveals the next card on the left.
    await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: box.x + 45, y }] });
    for (let step = 1; step <= 8; step++) {
      await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: box.x + 45 + step * 22, y }] });
      await page.waitForTimeout(20);
    }
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect.poll(() => viewport.evaluate(element => element.scrollLeft)).toBeLessThan(-80);
    await expect(page.locator(".ks-work-carousel")).toHaveAttribute("data-running", "false");
    await expect(page).toHaveURL(/\/$/);
  });
});

test("the carousel and its controls fit mobile and have no accessibility violations", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openShowcase(page);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.setViewportSize({ width: 320, height: 800 });
  expect(await page.locator(".ks-work-controls").evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
  await page.setViewportSize({ width: 390, height: 844 });
  const card = (await page.locator(".ks-work-slide").first().boundingBox())!;
  const viewport = (await page.locator(".ks-work-viewport").boundingBox())!;
  expect(card.width).toBeLessThan(viewport.width);
  await expect(page.getByRole("button", { name: "نمونه‌کار بعدی", exact: true })).toBeVisible();
  const result = await new AxeBuilder({ page }).include(".ks-work-showcase").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(result.violations.map(violation => ({ id: violation.id, nodes: violation.nodes.map(node => node.html) }))).toEqual([]);
});

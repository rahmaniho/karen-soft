#!/usr/bin/env node
/**
 * WCAG 2.2 AA audit of every public sitemap route, in both themes and at
 * desktop/mobile widths. External chat requests are blocked so the audit is
 * reproducible; same-origin demo documents are included in the axe scan.
 *
 * Usage: node scripts/a11y-routes.mjs [--base http://127.0.0.1:3000]
 *        [--widths 320,1440] [--themes light,dark] [--concurrency 2]
 *        [--include-frames] [--strict-runtime] [--settle 500]
 */
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

function option(name, fallback) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
}
const base = option("--base", process.env.TEST_BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
const widths = option("--widths", "320,1440").split(",").map(Number);
const themes = option("--themes", "light,dark").split(",");
const concurrency = Math.max(1, Number(option("--concurrency", "2")));
const output = option("--out", ".cache/audit/a11y-routes.json");
const includeFrames = process.argv.includes("--include-frames");
const strictRuntime = process.argv.includes("--strict-runtime");
const settle = Math.max(0, Number(option("--settle", "500")));
const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

const sitemap = await fetch(`${base}/sitemap.xml`);
if (!sitemap.ok) throw new Error(`sitemap returned ${sitemap.status}`);
const xml = await sitemap.text();
const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname);
if (!paths.length) throw new Error("sitemap contains no routes");

const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const jobList = themes.flatMap(theme => widths.flatMap(width => paths.map(path => ({ theme, width, path }))));
const results = [];
let cursor = 0;
let completed = 0;

async function worker() {
  let context, page, currentTheme;
  async function ensurePage(theme) {
    if (context && currentTheme === theme) return;
    await context?.close();
    currentTheme = theme;
    context = await browser.newContext({ reducedMotion: "reduce" });
    await context.addInitScript(value => localStorage.setItem("theme", value), theme);
    await context.route("**/*", route => {
      const url = new URL(route.request().url());
      return url.origin === base || url.protocol === "data:" ? route.continue() : route.abort();
    });
    page = await context.newPage();
  }
  while (cursor < jobList.length) {
    const job = jobList[cursor++];
    await ensurePage(job.theme);
    const errors = [];
    const recordError = (message, stack = "") => {
      const source = /\/demos\//.test(stack) || /\/demos\//.test(message) ? "demo" : "main";
      if (!errors.some(error => error.message === message && error.source === source)) errors.push({ message, source, stack });
    };
    const onError = error => recordError(error.message, error.stack ?? "");
    const onConsole = message => {
      if (message.type() !== "error") return;
      const text = message.text();
      if (/Minified React error #(418|423|425)|Hydration|hydrating/i.test(text)) recordError(text, message.location()?.url ?? "");
    };
    page.on("pageerror", onError);
    page.on("console", onConsole);
    try {
      await page.setViewportSize({ width: job.width, height: 900 });
      const response = await page.goto(base + job.path, { waitUntil: "domcontentloaded", timeout: 20_000 });
      await page.evaluate(() => document.fonts.ready);
      // Give lazy demo frames and client hydration a bounded opportunity to settle.
      if (includeFrames) {
        const frame = page.locator("iframe").first();
        if (await frame.count()) {
          await frame.scrollIntoViewIfNeeded().catch(() => {});
          await frame.evaluate(element => element.contentDocument?.readyState === "complete").catch(() => {});
        }
      }
      await page.waitForTimeout(settle);
      let builder = new AxeBuilder({ page }).withTags(tags);
      if (!includeFrames) builder = builder.exclude("iframe");
      const audit = await builder.analyze();
      const geometry = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        h1: document.querySelectorAll("h1").length,
      }));
      const frameErrors = includeFrames ? [] : errors.filter(error => error.source === "main");
      results.push({
        ...job,
        status: response?.status() ?? 0,
        ...geometry,
        errors: includeFrames ? errors : frameErrors,
        demoErrors: includeFrames ? [] : errors.filter(error => error.source === "demo"),
        violations: audit.violations.map(violation => ({
          id: violation.id,
          impact: violation.impact,
          help: violation.help,
          nodes: violation.nodes.map(node => ({ target: node.target, html: node.html, summary: node.failureSummary })),
        })),
      });
    } catch (error) {
      results.push({ ...job, status: 0, errors: [{ message: error.message, source: "audit", stack: "" }], violations: [] });
    } finally {
      page.off("pageerror", onError);
      page.off("console", onConsole);
      completed += 1;
      if (completed % 50 === 0) console.log(`audited ${completed}/${jobList.length}`);
    }
  }
  await context?.close();
}

try {
  await Promise.all(Array.from({ length: concurrency }, worker));
} finally {
  await browser.close();
}
results.sort((a, b) => a.path.localeCompare(b.path) || a.theme.localeCompare(b.theme) || a.width - b.width);
const failed = results.filter(result => result.status !== 200 || result.overflow || result.h1 !== 1 || result.violations.length || (strictRuntime && result.errors.length));
const runtimeFailed = results.filter(result => result.errors.length);
const report = { base, tags, includeFrames, strictRuntime, settle, routes: paths.length, checks: results.length, failedChecks: failed.length, runtimeErrorChecks: runtimeFailed.length, results };
const outputPath = resolve(output);
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, JSON.stringify(report, null, 2));
console.log(`${paths.length} routes · ${results.length} checks · ${failed.length} failed checks · ${runtimeFailed.length} runtime-error checks · report: ${output}`);
for (const result of failed.slice(0, 30)) {
  console.log(result.path, result.theme, result.width, result.violations.map(v => `${v.id}(${v.nodes.length})`).join(",") || result.errors.map(error => error.message).join(";") || `status=${result.status} overflow=${result.overflow} h1=${result.h1}`);
}
process.exitCode = failed.length ? 1 : 0;

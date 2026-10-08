"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Info, Maximize2, Minimize2 } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";

/**
 * اجازه‌ها: اسکریپت و هم‌مبدأ بودن (برای اجرای برنامهٔ نمایشی).
 * عمداً allow-forms، allow-popups و allow-top-navigation داده نمی‌شود،
 * بنابراین نسخهٔ نمایشی نمی‌تواند پنجرهٔ جدید باز کند یا صفحهٔ اصلی را تغییر دهد.
 */
const SANDBOX = "allow-scripts allow-same-origin";
const BLOCKED_MESSAGE = "این پیوند در نسخهٔ نمایشی غیرفعال است تا از سایت خارج نشوید.";
const NOTICE = "در این نسخهٔ نمایشی، پیوندهای بیرونی، پنجرهٔ جدید و ارسال فرم به سرویس‌های بیرونی غیرفعال‌اند.";

interface DemoFrameProps {
  /** نقطهٔ ورود نسخهٔ نمایشی؛ همیشه مسیر هم‌مبدأ. */
  src: string;
  /** محدودهٔ مجاز پیوندها؛ هر چیزی بیرون از آن متوقف می‌شود. */
  scope: string;
  title: string;
  /** پیوند «صفحهٔ کامل» داخل همین سایت (اختیاری). */
  fullPageHref?: string;
}

function isInsideScope(url: URL, origin: string, scope: string): boolean {
  if (url.origin !== origin) return false;
  const prefix = scope.endsWith("/") ? scope : `${scope}/`;
  return url.pathname === scope || url.pathname.startsWith(prefix);
}

/**
 * نمایش نسخهٔ نمایشی داخل صفحه، با حالت تمام‌صفحه (کلید Esc برای بستن).
 * پیوندها و فرم‌های بیرونی در مرحلهٔ capture متوقف می‌شوند تا بازدیدکننده از سایت خارج نشود.
 */
export function DemoFrame({ src, scope, title, fullPageHref }: DemoFrameProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [hint, setHint] = useState("");

  const flashHint = useCallback((message: string) => {
    setHint(message);
    if (hintTimer.current) clearTimeout(hintTimer.current);
    hintTimer.current = setTimeout(() => setHint(""), 3500);
  }, []);

  /** پس از هر بارگذاری سند داخل iframe، شنوندهٔ کلیک و ارسال فرم را روی آن سند می‌گذارد. */
  const guardDocument = useCallback(() => {
    cleanupRef.current?.();
    cleanupRef.current = null;

    const frame = frameRef.current;
    const win = frame?.contentWindow;
    const doc = frame?.contentDocument;
    if (!win || !doc) return;

    const origin = win.location.origin;
    const block = (event: Event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      flashHint(BLOCKED_MESSAGE);
    };

    const onClick = (event: MouseEvent) => {
      // رویداد از سند iframe است؛ بنابراین از instanceof استفاده نمی‌کنیم.
      const target = event.target as Element | null;
      if (!target || typeof target.closest !== "function") return;
      const link = target.closest("a[href], area[href]") as HTMLAnchorElement | null;
      if (!link) return;
      if ((link.getAttribute("href") ?? "").startsWith("#")) return;
      let url: URL;
      try {
        url = new URL(link.href, doc.baseURI);
      } catch {
        block(event);
        return;
      }
      if (!isInsideScope(url, origin, scope)) block(event);
    };

    const onSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement | null;
      if (!form || form.tagName !== "FORM") return;
      const action = form.getAttribute("action");
      if (!action) return; // فرم‌های بدون action فقط در همین سند با جاوااسکریپت کار می‌کنند.
      let url: URL;
      try {
        url = new URL(action, doc.baseURI);
      } catch {
        block(event);
        return;
      }
      if (!isInsideScope(url, origin, scope)) block(event);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };

    doc.addEventListener("click", onClick, true);
    doc.addEventListener("submit", onSubmit, true);
    doc.addEventListener("keydown", onKeyDown);
    cleanupRef.current = () => {
      doc.removeEventListener("click", onClick, true);
      doc.removeEventListener("submit", onSubmit, true);
      doc.removeEventListener("keydown", onKeyDown);
    };
  }, [scope, flashHint]);

  useEffect(() => {
    if (!expanded) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [expanded]);

  // اگر iframe پیش از hydrate شدن React بارگذاری شده باشد، رویداد load دیگر دریافت نمی‌شود؛
  // بنابراین هنگام اتصال کامپوننت وضعیت سند را هم بررسی می‌کنیم.
  useEffect(() => {
    const frame = frameRef.current;
    if (
      frame?.contentDocument &&
      frame.contentWindow &&
      frame.contentDocument.readyState === "complete" &&
      frame.contentWindow.location.href !== "about:blank"
    ) {
      guardDocument();
    }
  }, [guardDocument]);

  useEffect(() => {
    return () => {
      cleanupRef.current?.();
      if (hintTimer.current) clearTimeout(hintTimer.current);
    };
  }, []);

  return (
    <div
      className={
        expanded
          ? "fixed inset-0 z-[80] flex flex-col gap-3 bg-[var(--surface)] p-3 sm:p-5"
          : "flex flex-col gap-3"
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">این نسخه داخل همین صفحه اجرا می‌شود.</p>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-pressed={expanded}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? <Minimize2 className="size-4" aria-hidden /> : <Maximize2 className="size-4" aria-hidden />}
            {expanded ? "بستن (Esc)" : "نمای تمام‌صفحه"}
          </Button>
          {fullPageHref ? (
            <ButtonLink href={fullPageHref} variant="ghost" size="sm">
              صفحهٔ کامل
            </ButtonLink>
          ) : null}
        </div>
      </div>

      <div
        className={`relative overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--surface-sunken)] ${
          expanded ? "min-h-0 flex-1" : "h-[min(82vh,860px)] min-h-[520px]"
        }`}
      >
        <iframe
          ref={frameRef}
          src={src}
          title={title}
          sandbox={SANDBOX}
          loading="lazy"
          onLoad={guardDocument}
          className="h-full w-full border-0"
        />
      </div>

      <p className="flex items-start gap-2 text-xs leading-6 text-muted">
        <Info className="mt-1 size-4 shrink-0" aria-hidden />
        <span>{NOTICE}</span>
      </p>
      <p role="status" aria-live="polite" className="min-h-6 text-sm text-brand-700 dark:text-brand-200">
        {hint}
      </p>
    </div>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { CRISP_WEBSITE_ID } from "@/lib/constants";

declare global {
  interface Window {
    $crisp?: unknown[][];
    CRISP_WEBSITE_ID?: string;
  }
}

const websiteId = CRISP_WEBSITE_ID;

function productInterest(path: string) {
  if (path.startsWith("/products/")) return path.split("/")[2] ?? "";
  if (path.startsWith("/print")) return "karen-print";
  return "";
}

function updateSessionData(path: string) {
  window.$crisp = window.$crisp || [];
  window.$crisp.push([
    "set",
    "session:data",
    [[
      ["current_page", path],
      ["product_interest", productInterest(path)],
    ]],
  ]);
}

/** Crisp supplies its own launcher; do not render a second floating chat button. */
export function CrispChat() {
  const path = usePathname();

  /**
   * اسکریپت گفت‌وگوی زنده در بارگذاری اولیه اجرا نمی‌شود؛ چون یک درخواست
   * سوم‌شخص است و می‌تواند LCP و INP را در موبایل خراب کند. تا زمانی که
   * کاربر با صفحه تعامل نکند یا مرورگر بیکار نشود، دانلود نمی‌شود.
   */
  useEffect(() => {
    if (!websiteId) return;

    window.$crisp = window.$crisp || [];
    window.CRISP_WEBSITE_ID = websiteId;

    let started = false;
    const load = () => {
      if (started) return;
      started = true;
      cleanup();
      if (document.getElementById("crisp-sdk")) return;
      const script = document.createElement("script");
      script.id = "crisp-sdk";
      script.src = "https://client.crisp.chat/l.js";
      script.async = true;
      document.head.appendChild(script);
    };

    const events: (keyof WindowEventMap)[] = ["pointerdown", "keydown", "scroll", "touchstart"];
    const cleanup = () => events.forEach((event) => window.removeEventListener(event, load, { passive: true } as AddEventListenerOptions));

    events.forEach((event) => window.addEventListener(event, load, { once: true, passive: true }));
    // در نبود تعامل، پس از بیکار شدن مرورگر بارگذاری می‌شود.
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idleId = hasIdle ? window.requestIdleCallback(load, { timeout: 12000 }) : window.setTimeout(load, 8000);

    return () => {
      cleanup();
      if (hasIdle) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
    };
  }, []);

  useEffect(() => {
    if (websiteId) updateSessionData(path);
  }, [path]);

  return null;
}

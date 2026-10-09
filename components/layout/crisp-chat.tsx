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

  useEffect(() => {
    if (!websiteId) return;

    window.$crisp = window.$crisp || [];
    window.CRISP_WEBSITE_ID = websiteId;

    if (!document.getElementById("crisp-sdk")) {
      const script = document.createElement("script");
      script.id = "crisp-sdk";
      script.src = "https://client.crisp.chat/l.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (websiteId) updateSessionData(path);
  }, [path]);

  return null;
}

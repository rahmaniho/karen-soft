"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
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

  const openChat = () => {
    if (!websiteId) return;
    updateSessionData(path);
    window.$crisp?.push(["do", "chat:open"]);
  };

  return websiteId ? (
    <button type="button" className="ks-chat-trigger" onClick={openChat} aria-label="باز کردن چت پشتیبانی">
      <MessageCircle size={21} />
      <span>گفت‌وگو با ما</span>
      <i />
    </button>
  ) : (
    <Link href="/contact" className="ks-chat-trigger" aria-label="تماس با پشتیبانی">
      <MessageCircle size={21} />
      <span>گفت‌وگو با ما</span>
      <i />
    </Link>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

const websiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;
declare global { interface Window { $crisp?: unknown[][]; CRISP_WEBSITE_ID?: string } }

export function CrispChat() {
  const path = usePathname();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!loaded || !websiteId || !window.$crisp) return;
    window.$crisp.push(["set", "session:data", [["current_page", path], ["product_interest", path.startsWith("/products/") ? path.split("/")[2] ?? "" : path.startsWith("/print") ? "karen-print" : ""]]]);
  }, [loaded, path]);

  const openChat = () => {
    if (!websiteId) return;
    window.$crisp = window.$crisp || [];
    window.CRISP_WEBSITE_ID = websiteId;
    window.$crisp.push(["set", "session:data", [["current_page", path], ["product_interest", path.startsWith("/products/") ? path.split("/")[2] ?? "" : path.startsWith("/print") ? "karen-print" : ""]]]);
    window.$crisp.push(["do", "chat:open"]);
    if (!document.getElementById("crisp-sdk")) {
      const script = document.createElement("script");
      script.id = "crisp-sdk"; script.src = "https://client.crisp.chat/l.js"; script.async = true;
      document.head.appendChild(script);
    }
    setLoaded(true);
  };

  return websiteId ? <button type="button" className="ks-chat-trigger" onClick={openChat} aria-label="باز کردن چت پشتیبانی"><MessageCircle size={21} /><span>گفت‌وگو با ما</span><i /></button> : <Link href="/contact" className="ks-chat-trigger" aria-label="تماس با پشتیبانی"><MessageCircle size={21} /><span>گفت‌وگو با ما</span><i /></Link>;
}

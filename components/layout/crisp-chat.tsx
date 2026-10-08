import Script from "next/script";
import { CRISP_WEBSITE_ID } from "@/lib/constants";

/**
 * گفت‌وگوی آنلاین Crisp.
 * - strategy="lazyOnload": اسکریپت پس از آمادگی صفحه بارگذاری می‌شود تا اولین نمایش کند نشود.
 * - داخل iframe (نسخه‌های نمایشی) بارگذاری نمی‌شود تا دو ویجت هم‌زمان دیده نشود.
 * - اگر شناسه خالی باشد، هیچ اسکریپتی رندر نمی‌شود.
 */
export function CrispChat() {
  if (!CRISP_WEBSITE_ID) return null;
  const websiteId = JSON.stringify(CRISP_WEBSITE_ID).replace(/</g, "\\u003c");

  return (
    <Script id="crisp-chat" strategy="lazyOnload">
      {`if (window.self === window.top) {
  window.$crisp = window.$crisp || [];
  window.CRISP_WEBSITE_ID = ${websiteId};
  var crispScript = document.createElement("script");
  crispScript.src = "https://client.crisp.chat/l.js";
  crispScript.async = true;
  document.head.appendChild(crispScript);
}`}
    </Script>
  );
}

import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[100] focus:rounded-[var(--radius-sm)] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-extrabold focus:text-ink-900"
      >
        رفتن به محتوای اصلی
      </a>
      <SiteHeader />
      <main id="main" className="pt-24">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

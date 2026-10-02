import type { ReactNode } from "react";
import { ChapHeader } from "@/components/print/chap-header";
import { ChapFooter } from "@/components/print/chap-footer";

export default function PrintLayout({ children }: { children: ReactNode }) {
  return (
    <div className="print-scope flex min-h-screen flex-col">
      <a
        href="#chap-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[100] focus:rounded-[var(--radius-sm)] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-ink-900"
      >
        رفتن به محتوای اصلی
      </a>
      <ChapHeader />
      <main id="chap-main" className="flex-1">
        {children}
      </main>
      <ChapFooter />
    </div>
  );
}

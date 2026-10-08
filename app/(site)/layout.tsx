import type { ReactNode } from "react";
import { ExperienceNav } from "@/components/layout/experience-nav";
import { SiteFooter } from "@/components/layout/site-footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <div className="ks-shell"><a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[200] focus:bg-white focus:px-4 focus:py-2 focus:text-black">رفتن به محتوای اصلی</a><ExperienceNav /><div className="ks-content"><main id="main">{children}</main><SiteFooter /></div></div>;
}

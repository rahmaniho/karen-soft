"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowUpLeft, Menu, Phone, X } from "lucide-react";
import { CHAP, CHAP_NAV } from "@/lib/print/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function ChapHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setDrawer(false), [pathname]);

  const isActive = (href: string) => (href === CHAP.path ? pathname === CHAP.path : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled
          ? "glass-panel border-x-0 border-t-0"
          : "border-b border-[var(--border-subtle)] bg-[var(--surface-raised)]/70 backdrop-blur-xl",
      )}
    >
      <div className="cmyk-strip" aria-hidden>
        <span style={{ background: "var(--color-cmyk-c)" }} />
        <span style={{ background: "var(--color-cmyk-m)" }} />
        <span style={{ background: "var(--color-cmyk-y)" }} />
        <span style={{ background: "var(--color-cmyk-k)" }} />
      </div>

      <div className="container-page flex items-center gap-4 py-3">
        <Link href={CHAP.path} className="flex shrink-0 items-center gap-3" aria-label={`${CHAP.name} — خانه`}>
          <span className="grid size-11 place-items-center overflow-hidden rounded-[var(--radius-md)] bg-ink-950 p-1">
            <Image src={CHAP.logo} alt="" width={64} height={64} className="size-9 object-contain" priority />
          </span>
          <span className="flex flex-col leading-none">
            <strong className="font-titr text-[17px] leading-tight">{CHAP.name}</strong>
            <small className="mt-1 text-6xs font-bold tracking-[0.28em] text-muted" dir="ltr">
              {CHAP.motto}
            </small>
          </span>
        </Link>

        <nav aria-label="منوی کارن چاپ" className="me-auto hidden items-center gap-0.5 lg:flex">
          {CHAP_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-[var(--radius-sm)] px-3 py-2 text-xs font-bold transition-colors duration-[150ms]",
                isActive(link.href)
                  ? "text-[color:var(--text-primary)]"
                  : "text-muted hover:text-[color:var(--text-primary)]",
              )}
            >
              {link.label}
              {isActive(link.href) ? (
                <motion.span
                  layoutId="chap-nav-underline"
                  className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-ink-900 dark:bg-white"
                  transition={{ type: "spring", stiffness: 280, damping: 30 }}
                />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${CHAP.tel}`}
            className="hidden items-center gap-1.5 rounded-full border border-[var(--border-subtle)] px-3 py-2 text-2xs font-bold text-muted transition-colors hover:border-ink-900 hover:text-[color:var(--text-primary)] xl:inline-flex"
          >
            <Phone className="size-3.5" aria-hidden />
            <span dir="ltr" className="persian-num">
              {CHAP.phone}
            </span>
          </a>
          <Link
            href="/"
            className="hidden items-center gap-1.5 rounded-full border border-[var(--border-subtle)] px-3 py-2 text-5xs font-bold text-muted transition-colors hover:border-brand-400 hover:text-brand-600 2xl:inline-flex dark:hover:text-brand-300"
          >
            کارن سافت
            <ArrowUpLeft className="size-3.5" aria-hidden />
          </Link>
          <ThemeToggle />
          <ButtonLink
            href="/print/order"
            size="sm"
            className="hidden bg-ink-900 hover:bg-ink-800 sm:inline-flex dark:bg-white dark:text-ink-900"
          >
            ثبت سفارش
            <ArrowLeft className="size-3.5" aria-hidden />
          </ButtonLink>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-[var(--radius-sm)] border border-[var(--border-subtle)] lg:hidden"
            aria-label={drawer ? "بستن منو" : "باز کردن منو"}
            aria-expanded={drawer}
            onClick={() => setDrawer((v) => !v)}
          >
            {drawer ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {drawer ? (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            aria-label="منوی موبایل کارن چاپ"
            className="overflow-hidden border-t border-[var(--border-subtle)] bg-[var(--surface-raised)] lg:hidden"
          >
            <ul className="container-page grid gap-1 py-4">
              {CHAP_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-[var(--radius-md)] px-4 py-3 text-sm font-bold",
                      isActive(link.href) ? "bg-[var(--surface-sunken)]" : "hover:bg-[var(--surface-sunken)]",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/print/order"
                  className="mt-1 block rounded-[var(--radius-md)] bg-ink-900 px-4 py-3 text-center text-sm font-bold text-white dark:bg-white dark:text-ink-900"
                >
                  ثبت سفارش آنلاین
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="block rounded-[var(--radius-md)] px-4 py-3 text-center text-2xs font-bold text-muted"
                >
                  ← بازگشت به کارن سافت
                </Link>
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

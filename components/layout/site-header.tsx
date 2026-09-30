"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { SOLUTIONS } from "@/lib/solutions";
import { PRODUCTS } from "@/lib/products";
import { INDUSTRIES } from "@/lib/industries";
import { cn } from "@/lib/utils";
import { useScrollState } from "@/hooks/use-scroll-state";
import { ButtonLink } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { DemoMega, ProductsMega, SolutionsMega } from "./mega-menus";

export function SiteHeader() {
  const pathname = usePathname();
  const { scrolled, hidden } = useScrollState();
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setOpenMega(null);
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMega(null);
        setDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled ? "glass-panel border-x-0 border-t-0 py-2 shadow-[0_1px_0_rgba(10,30,50,.06)]" : "border-transparent py-4",
        hidden && !openMega && !drawerOpen && "-translate-y-full",
      )}
      onMouseLeave={() => setOpenMega(null)}
    >
      <div className="container-page flex items-center gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="صفحه اصلی کارن سافت">
          <Image src="/images/logo.png" alt="لوگوی کارن سافت" width={44} height={44} className="size-11 object-contain" priority />
          <span className="flex flex-col leading-tight">
            <strong className="text-[15px]">{SITE.name}</strong>
            <small className="text-[8px] font-extrabold tracking-[3px] text-brand-600">KAREN SOFT</small>
          </span>
        </Link>

        <nav aria-label="منوی اصلی" className="me-auto hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <div key={link.href} className="relative" onMouseEnter={() => setOpenMega(link.mega ?? null)}>
              <Link
                href={link.href}
                aria-haspopup={link.mega ? "true" : undefined}
                aria-expanded={link.mega ? openMega === link.mega : undefined}
                className={cn(
                  "relative flex items-center gap-1 rounded-[var(--radius-sm)] px-3 py-2 text-[13px] font-bold transition-colors duration-[150ms]",
                  isActive(link.href) ? "text-brand-600 dark:text-brand-300" : "text-[color:var(--text-secondary)] hover:text-brand-600",
                  link.highlight && "text-brand-600 dark:text-brand-300",
                )}
              >
                {link.label}
                {link.highlight ? <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden /> : null}
                {link.mega ? <ChevronDown className="size-3.5 opacity-60" aria-hidden /> : null}
                {isActive(link.href) ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-500"
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  />
                ) : null}
              </Link>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${SITE.phone}`}
            className="hidden items-center gap-1.5 rounded-full border border-[var(--border-subtle)] px-3 py-2 text-[12px] font-extrabold text-muted transition-colors hover:border-brand-400 hover:text-brand-600 xl:inline-flex"
          >
            <Phone className="size-3.5" aria-hidden />
            {SITE.phoneDisplay}
          </a>
          <ThemeToggle />
          <ButtonLink href="/contact" size="sm" className="hidden sm:inline-flex">
            شروع همکاری
          </ButtonLink>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-[var(--radius-sm)] bg-ink-900 text-white lg:hidden dark:bg-white dark:text-ink-900"
            aria-label={drawerOpen ? "بستن منو" : "باز کردن منو"}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((v) => !v)}
          >
            {drawerOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {openMega ? (
          <motion.div
            key={openMega}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="container-page absolute inset-x-0 top-full hidden pt-3 lg:block"
          >
            {openMega === "solutions" ? <SolutionsMega onNavigate={() => setOpenMega(null)} /> : null}
            {openMega === "products" ? <ProductsMega onNavigate={() => setOpenMega(null)} /> : null}
            {openMega === "demo" ? <DemoMega onNavigate={() => setOpenMega(null)} /> : null}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {drawerOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[68px] z-40 overflow-y-auto bg-[var(--surface)] px-4 pb-24 pt-4 lg:hidden"
          >
            <MobileNav onNavigate={() => setDrawerOpen(false)} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = useState<string | null>(null);
  const groups = [
    { id: "solutions", label: "راهکارها", items: SOLUTIONS.map((s) => ({ label: `${s.emoji} ${s.name}`, href: `/solutions/${s.slug}` })) },
    { id: "products", label: "محصولات", items: PRODUCTS.map((p) => ({ label: `${p.emoji} ${p.name}`, href: `/products/${p.slug}` })) },
    {
      id: "demo",
      label: "دموی زنده",
      items: [
        { label: "هاب دموها", href: "/demo" },
        { label: "گالری صنایع", href: "/demo/industries" },
        ...INDUSTRIES.slice(0, 6).map((i) => ({ label: i.name, href: `/demo/industries/${i.slug}` })),
      ],
    },
  ];

  return (
    <nav aria-label="منوی موبایل" className="space-y-2">
      <Link href="/services" onClick={onNavigate} className="block rounded-[var(--radius-md)] p-4 text-sm font-extrabold surface-card">
        خدمات
      </Link>
      {groups.map((group) => (
        <div key={group.id} className="surface-card overflow-hidden">
          <button
            type="button"
            onClick={() => setOpen(open === group.id ? null : group.id)}
            aria-expanded={open === group.id}
            className="flex w-full items-center justify-between p-4 text-sm font-extrabold"
          >
            {group.label}
            <ChevronDown className={cn("size-4 transition-transform", open === group.id && "rotate-180")} aria-hidden />
          </button>
          {open === group.id ? (
            <ul className="border-t border-[var(--border-subtle)] p-2">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className="block rounded-[var(--radius-sm)] px-3 py-2.5 text-[13px] font-bold text-muted hover:bg-[var(--surface-sunken)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
      {[
        { label: "نمونه‌کارها", href: "/portfolio" },
        { label: "مجله", href: "/blog" },
        { label: "درباره ما", href: "/about" },
        { label: "تماس با ما", href: "/contact" },
      ].map((link) => (
        <Link key={link.href} href={link.href} onClick={onNavigate} className="block rounded-[var(--radius-md)] p-4 text-sm font-extrabold surface-card">
          {link.label}
        </Link>
      ))}
      <ButtonLink href="/demo" size="lg" className="mt-4 w-full" onClick={onNavigate}>
        مشاهده دموی زنده
      </ButtonLink>
    </nav>
  );
}

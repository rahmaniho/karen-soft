"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpLeft, BriefcaseBusiness, Code2, Contact, House, Menu, Newspaper, Printer, Sparkles, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";

type NavItem = { label: string; href: string; icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }> };
const items: NavItem[] = [
  { label: "خانه", href: "/", icon: House },
  { label: "محصولات", href: "/products", icon: Code2 },
  { label: "خدمات", href: "/services", icon: Sparkles },
  { label: "کارن چاپ", href: "/print", icon: Printer },
  { label: "نمونه‌کارها", href: "/portfolio", icon: BriefcaseBusiness },
  { label: "وبلاگ", href: "/blog", icon: Newspaper },
  { label: "درباره ما", href: "/about", icon: Contact },
  { label: "تماس", href: "/contact", icon: ArrowUpLeft },
];

// Sound files are tiny local synthesized samples. Howler is loaded only on the first sound-enabled gesture.
let audioModule: Promise<typeof import("howler")> | undefined;
function playSound(name: "click" | "swoosh" | "chime") {
  if (!audioModule) audioModule = import("howler");
  void audioModule.then(({ Howl }) => new Howl({ src: [`/audio/${name}.wav`], volume: 0.22 }).play());
}

export function ExperienceNav() {
  const path = usePathname();
  const reduce = useReducedMotion();
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [sound, setSound] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    const onTrap = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !sheetRef.current) return;
      const focusable = Array.from(sheetRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled])'));
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onTrap);
    document.addEventListener("keydown", onKey);
    requestAnimationFrame(() => sheetRef.current?.querySelector<HTMLElement>('a[href]')?.focus());
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("keydown", onTrap); document.body.style.overflow = ""; };
  }, [open]);
  useEffect(() => {
    const onSuccess = () => { if (sound) playSound("chime"); };
    window.addEventListener("karen:success", onSuccess);
    return () => window.removeEventListener("karen:success", onSuccess);
  }, [sound]);
  const click = (type: "click" | "swoosh" = "click") => { if (sound) playSound(type); };
  const toggleOpen = () => { click("swoosh"); if (open) requestAnimationFrame(() => fabRef.current?.focus()); setOpen(!open); };
  const active = (href: string) => href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);

  return (
    <>
      <motion.aside layout={!reduce} className={`ks-sidebar ${collapsed ? "is-collapsed" : ""}`} aria-label="ناوبری اصلی">
        <Link href="/" onClick={() => click()} className="ks-brand" aria-label="کارن سافت؛ صفحه اصلی">
          <Image src="/images/logo-symbol.png" alt="" width={512} height={512} className="ks-brand-logo" />
          {!collapsed && <span className="ks-brand-name"><strong>کارن سافت</strong><small>KAREN SOFT®</small></span>}
        </Link>
        <div className="ks-side-meta">{!collapsed ? "فناوری، با نگاه آینده" : "•••"}</div>
        <nav className="ks-side-links" aria-label="منوی اصلی">
          {items.map(({ label, href, icon: Icon }, index) => (
            <motion.div key={href} initial={reduce ? false : { opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
              <Link href={href} onClick={() => click()} className={`ks-nav-link ${active(href) ? "active" : ""} ${href === "/print" ? "print-link" : ""}`} title={collapsed ? label : undefined} aria-current={active(href) ? "page" : undefined}>
                {active(href) && <motion.span layoutId="ks-active" className="ks-nav-active" transition={{ type: "spring", stiffness: 100, damping: 20 }} />}
                <Icon size={19} strokeWidth={1.8} className="ks-nav-icon" />
                {!collapsed && <span className="ks-nav-label">{label}</span>}
                {!collapsed && href === "/print" && <span className="ks-print-dot" aria-hidden />}
              </Link>
            </motion.div>
          ))}
        </nav>
        <div className="ks-side-bottom">
          {!collapsed && <div className="ks-availability"><i /> آماده برای پروژه‌های جدید <span>↗</span></div>}
          <div className="ks-side-controls">
            <button className="ks-icon-button" aria-label={sound ? "قطع صدا" : "فعال کردن صدا"} aria-pressed={sound} onClick={() => { setSound(!sound); if (!sound) playSound("click"); }} type="button">{sound ? <Volume2 size={18} /> : <VolumeX size={18} />}</button>
            <button className="ks-collapse" type="button" aria-label={collapsed ? "باز کردن نوار کناری" : "جمع کردن نوار کناری"} aria-expanded={!collapsed} onClick={() => { click(); setCollapsed(!collapsed); }}>{collapsed ? "‹" : "›"}</button>
          </div>
          {!collapsed && <span className="ks-copyright">© 2024 — 2026 KAREN SOFT</span>}
        </div>
      </motion.aside>

      <div className="ks-mobile-top"><Link href="/" className="ks-mobile-logo" aria-label="کارن سافت؛ صفحه اصلی"><Image src="/images/logo-symbol.png" alt="" width={512} height={512} className="ks-mobile-logo-image" /><span>کارن سافت<small>KAREN SOFT</small></span></Link><span className="ks-mobile-index">DIGITAL ENGINEERING / 01</span></div>
      <AnimatePresence>
        {open && <>
          <motion.button className="ks-sheet-backdrop" aria-label="بستن منو" type="button" onClick={toggleOpen} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div ref={sheetRef} className="ks-sheet" role="dialog" aria-modal="true" aria-label="منوی سایت" drag={reduce ? false : "y"} dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.5 }} onDragEnd={(_, info) => { if (info.offset.y > 90 || info.velocity.y > 500) toggleOpen(); }} initial={reduce ? { opacity: 0 } : { y: "100%" }} animate={reduce ? { opacity: 1 } : { y: 0 }} exit={reduce ? { opacity: 0 } : { y: "100%" }} transition={{ type: "spring", stiffness: 100, damping: 20 }}>
            <div className="ks-sheet-handle" aria-hidden /><div className="ks-sheet-heading">مسیر خودت رو پیدا کن <span>MENU / 08</span></div>
            <nav aria-label="منوی موبایل" className="ks-sheet-links">{items.map(({ label, href, icon: Icon }, index) => <motion.div key={href} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.045 }}><Link className={active(href) ? "active" : ""} href={href} onClick={() => { click(); setOpen(false); }}><Icon size={19} /><span>{label}</span><ArrowUpLeft size={16} /></Link></motion.div>)}</nav>
            <div className="ks-sheet-footer"><button type="button" onClick={() => { setSound(!sound); if (!sound) playSound("click"); }}>{sound ? <Volume2 size={18} /> : <VolumeX size={18} />} {sound ? "صدا روشن" : "صدا خاموش"}</button><span>ساخته‌شده در قزوین ◦ ایران</span></div>
          </motion.div>
        </>}
      </AnimatePresence>
      <button ref={fabRef} className={`ks-fab ${open ? "is-open" : ""}`} type="button" aria-label={open ? "بستن منو" : "باز کردن منو"} aria-expanded={open} onClick={toggleOpen}>{open ? <X size={23} /> : <Menu size={23} />}<span>{open ? "بستن" : "منو"}</span></button>
    </>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpLeft, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import type { CaseStudy } from "@/lib/portfolio";

export function ExperienceEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lenis: import("lenis").default | undefined;
    let frame = 0;
    let disposed = false;
    let gsapCleanup: (() => void) | undefined;
    void import("lenis").then(({ default: Lenis }) => {
      if (disposed) return;
      lenis = new Lenis({ duration: 1.1, anchors: true });
      const raf = (time: number) => { lenis?.raf(time); frame = requestAnimationFrame(raf); };
      frame = requestAnimationFrame(raf);
    });
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        gsap.fromTo(".ks-time-dot", { scale: 0.3 }, { scale: 1, duration: 0.8, stagger: 0.25, ease: "back.out(1.8)", scrollTrigger: { trigger: ".ks-about", start: "top 75%", once: true } });
      });
      gsapCleanup = () => context.revert();
    });
    const art = document.querySelector<HTMLElement>(".ks-hero-art");
    let pointerFrame = 0;
    const onPointer = (event: PointerEvent) => {
      if (!art || event.pointerType !== "mouse") return;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        const rect = art.getBoundingClientRect();
        art.style.setProperty("--glow-x", `${event.clientX - rect.left}px`);
        art.style.setProperty("--glow-y", `${event.clientY - rect.top}px`);
      });
    };
    art?.addEventListener("pointermove", onPointer);
    // IntersectionObserver avoids a scroll handler and only animates elements when visible.
    const home = document.querySelector(".ks-home");
    home?.classList.add("ks-js");
    const targets = document.querySelectorAll(".ks-section-heading, .ks-service-card, .ks-product-card, .ks-portfolio-card");
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("ks-revealed"); observer.unobserve(entry.target); } }), { threshold: 0.08 });
    targets.forEach(target => observer.observe(target));
    return () => { disposed = true; cancelAnimationFrame(frame); cancelAnimationFrame(pointerFrame); art?.removeEventListener("pointermove", onPointer); lenis?.destroy(); gsapCleanup?.(); observer.disconnect(); home?.classList.remove("ks-js"); };
  }, []);
  return null;
}

export function PortfolioGallery({ cases }: { cases: CaseStudy[] }) {
  const [selected, setSelected] = useState<CaseStudy | null>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    if (!selected?.demo) return;
    const frame = frameRef.current;
    const doc = frame?.contentDocument;
    if (!doc) return;
    const scope = selected.demo.scope;
    const guard = (event: Event) => {
      const target = event.target as Element | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      const form = target?.closest?.("form[action]") as HTMLFormElement | null;
      const urlString = link?.href ?? form?.action;
      if (!urlString || link?.getAttribute("href")?.startsWith("#")) return;
      try {
        const url = new URL(urlString, doc.baseURI);
        const prefix = scope.endsWith("/") ? scope : `${scope}/`;
        if (url.origin !== location.origin || (url.pathname !== scope && !url.pathname.startsWith(prefix))) {
          event.preventDefault(); event.stopImmediatePropagation();
        }
      } catch { event.preventDefault(); event.stopImmediatePropagation(); }
    };
    doc.addEventListener("click", guard, true);
    doc.addEventListener("submit", guard, true);
    return () => { doc.removeEventListener("click", guard, true); doc.removeEventListener("submit", guard, true); };
  }, [selected]);
  return <>
    <div className="ks-portfolio-grid">{cases.map((item, i) => <button key={item.slug} type="button" className={`ks-portfolio-card portfolio-${i}`} onClick={() => setSelected(item)} aria-label={`نمایش پیش‌نمایش ${item.title}`}>
      <div className="ks-portfolio-image"><Image src={item.cover} alt={item.title} fill sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw" className="object-cover" /><span className="ks-portfolio-view"><ArrowUpLeft size={23} /></span></div><div className="ks-portfolio-meta"><span>0{i + 1} / {item.category}</span><span>{item.year}</span></div><h3>{item.title}</h3><p>{item.summary}</p>
    </button>)}</div>
    <Dialog.Root open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}>
      <Dialog.Portal><Dialog.Overlay className="ks-dialog-overlay" /><Dialog.Content className="ks-dialog" dir="rtl" aria-describedby="ks-dialog-description">
        <div className="ks-dialog-top"><div><span>LIVE PREVIEW / نمونه‌کار</span><Dialog.Title>{selected?.title}</Dialog.Title></div><Dialog.Close className="ks-dialog-close" aria-label="بستن پیش‌نمایش"><X size={22} /></Dialog.Close></div>
        <Dialog.Description id="ks-dialog-description" className="ks-dialog-description">{selected?.note ?? selected?.summary}</Dialog.Description>
        {selected?.demo ? <iframe key={selected.slug} ref={frameRef} onLoad={() => { /* re-attach guards when a demo navigates within its scope */ setSelected(current => current ? { ...current } : null); }} src={selected.demo.src} title={selected.demo.title} className="ks-dialog-frame" loading="lazy" sandbox="allow-scripts allow-same-origin" referrerPolicy="same-origin" /> : <div className="ks-dialog-fallback"><Image src={selected?.cover ?? "/images/logo.png"} alt={selected?.title ?? "نمونه کار"} fill sizes="90vw" className="object-contain" /></div>}
        <div className="ks-dialog-bottom"><span>پیش‌نمایش در همین سایت نمایش داده می‌شود.</span><Dialog.Close className="ks-dialog-done">بستن پیش‌نمایش <ArrowUpLeft size={16} /></Dialog.Close></div>
      </Dialog.Content></Dialog.Portal>
    </Dialog.Root>
  </>;
}

/** Static final value on the server; the count runs only once the number enters view. */
export function CountUp({ to, pad = false }: { to: number; pad?: boolean }) {
  const [value, setValue] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(entries => {
      if (!entries[0]?.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 1100, 1);
        setValue(Math.round(to * (1 - (1 - progress) ** 3)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    if (ref.current) observer.observe(ref.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [to]);
  return <span ref={ref}>{new Intl.NumberFormat("fa-IR", { useGrouping: false, minimumIntegerDigits: pad ? 2 : 1 }).format(value)}</span>;
}

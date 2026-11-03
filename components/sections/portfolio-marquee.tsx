"use client";

import React, { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpLeft, MoveHorizontal, Pause, Play } from "lucide-react";
import type { CaseStudy } from "@/lib/portfolio";
import { formatNumber } from "@/lib/utils";

const KIND_LABEL = { client: "پروژهٔ مشتری", sample: "نمونهٔ نمایشی", hypothetical: "نمونهٔ فرضی" } as const;
const faNumber = (value: number) => formatNumber(value, { minimumIntegerDigits: 2, useGrouping: false });

/** A real, touch-scrollable carousel; autoplay is only ever a progressive enhancement. */
export function PortfolioMarquee({ cases }: { cases: CaseStudy[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLUListElement>(null);
  const cycleRef = useRef(0);
  const strideRef = useRef(0);
  const dragRef = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const suppressClickUntil = useRef(0);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [active, setActive] = useState(0);
  const instructionsId = useId();
  const running = ready && playing && !reducedMotion && inView && pageVisible && !hovered && !focused && !dragging;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onPreference = () => setReducedMotion(preference.matches);
    const onVisibility = () => setPageVisible(!document.hidden);
    onPreference();
    onVisibility();
    preference.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      preference.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group) return;
    const measure = () => {
      const gap = parseFloat(getComputedStyle(group.parentElement!).columnGap) || 0;
      const card = group.firstElementChild;
      cycleRef.current = group.getBoundingClientRect().width + gap;
      strideRef.current = (card?.getBoundingClientRect().width ?? 0) + gap;
      setReady(cycleRef.current > viewport.clientWidth && cases.length > 1);
      // A resize must not leave the reader in the extra, accessibility-hidden copies.
      if (cycleRef.current && viewport.scrollLeft < -cycleRef.current) {
        viewport.scrollLeft %= cycleRef.current;
      }
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(viewport);
    resize.observe(group);
    const visibility = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "100px" });
    visibility.observe(viewport);
    return () => { resize.disconnect(); visibility.disconnect(); };
  }, [cases.length]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!running || !viewport) return;
    let frame = 0;
    let previous = 0;
    let position = viewport.scrollLeft;
    const tick = (time: number) => {
      const elapsed = previous ? Math.min(time - previous, 50) : 0;
      previous = time;
      position -= elapsed * 0.034;
      if (position <= -cycleRef.current) position += cycleRef.current;
      viewport.scrollLeft = position;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  function move(direction: -1 | 1, edge?: "start" | "end") {
    const viewport = viewportRef.current;
    if (!viewport || !ready) return;
    setPlaying(false);
    const cycle = cycleRef.current;
    let left = viewport.scrollLeft;
    // Jump to an identical copy before animating, so both arrows also cross the seam.
    if (direction === 1 && left - strideRef.current <= -cycle) left += cycle;
    if (direction === -1 && left + strideRef.current > 0) left -= cycle;
    if (left !== viewport.scrollLeft) viewport.scrollLeft = left;
    const target = edge === "start" ? 0 : edge === "end" ? -strideRef.current * (cases.length - 1) : left - direction * strideRef.current;
    viewport.scrollTo({ left: target, behavior: reducedMotion ? "instant" : "smooth" });
  }

  function onScroll() {
    const viewport = viewportRef.current;
    if (!viewport || !strideRef.current) return;
    const index = Math.round(Math.abs(viewport.scrollLeft) / strideRef.current) % cases.length;
    setActive(index);
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") { setPlaying(false); return; }
    if (event.button !== 0) return;
    dragRef.current = { x: event.clientX, left: event.currentTarget.scrollLeft, moved: false };
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag) return;
    const distance = event.clientX - drag.x;
    if (!drag.moved && Math.abs(distance) < 6) return;
    if (!drag.moved) {
      drag.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      setDragging(true);
      setPlaying(false);
    }
    event.preventDefault();
    // RTL has a negative scroll range; dragging the artwork right moves toward zero.
    let left = drag.left + distance;
    if (cycleRef.current) left = -(((-left % cycleRef.current) + cycleRef.current) % cycleRef.current);
    event.currentTarget.scrollLeft = left;
  }

  function onPointerEnd(event: PointerEvent<HTMLDivElement>) {
    if (dragRef.current?.moved) suppressClickUntil.current = performance.now() + 150;
    dragRef.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  if (!cases.length) return null;

  return (
    <div className="ks-work-carousel" data-running={running} data-reduced-motion={reducedMotion}>
      <p id={instructionsId} className="sr-only">
        {reducedMotion ? "حرکت خودکار مطابق تنظیم کاهش حرکت دستگاه شما غیرفعال است." : "نمونه‌کارها به‌صورت خودکار حرکت می‌کنند. حرکت با نگه داشتن نشانگر یا رفتن فوکوس روی کارت‌ها موقتاً می‌ایستد."}
        {" "}با دکمه‌های قبل و بعد، کشیدن کارت‌ها یا کلیدهای جهت‌نما آن‌ها را مرور کنید.
      </p>
      <div
        ref={viewportRef}
        className="ks-work-viewport"
        dir="rtl"
        role="region"
        aria-roledescription="اسلایدر"
        aria-label="نمونه‌کارهای منتخب کارن سافت"
        aria-describedby={instructionsId}
        tabIndex={0}
        onScroll={onScroll}
        onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }}
        onPointerLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false); }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onWheel={event => { if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) setPlaying(false); }}
        onClickCapture={event => {
          if (performance.now() < suppressClickUntil.current) { event.preventDefault(); event.stopPropagation(); }
        }}
        onKeyDown={event => {
          if (event.key === "ArrowLeft") { event.preventDefault(); move(1); }
          if (event.key === "ArrowRight") { event.preventDefault(); move(-1); }
          if (event.key === "Home") { event.preventDefault(); move(-1, "start"); }
          if (event.key === "End") { event.preventDefault(); move(1, "end"); }
        }}
      >
        <div className="ks-work-track">
          {[0, 1, 2].map(copy => (
            <ul key={copy} ref={copy === 0 ? groupRef : undefined} className="ks-work-group" aria-hidden={copy > 0 || undefined}>
              {cases.map((item, index) => (
                <li key={item.slug} className="ks-work-slide" style={{ scrollSnapAlign: "start" }}>
                  <Link
                    href={`/portfolio/${item.slug}`}
                    className="ks-work-card"
                    tabIndex={copy > 0 ? -1 : undefined}
                    draggable={false}

                  >
                    <div className="ks-work-card-image">
                      <div className="ks-work-browser" aria-hidden="true"><i /><i /><i /><span>KAREN SOFT / SELECTED WORK</span><ArrowUpLeft size={10} /></div>
                      <div className="ks-work-image-inner">
                        <Image
                          src={item.cover}
                          alt={copy === 0 ? `تصویر ${item.title}` : ""}
                          fill
                          sizes="(max-width: 600px) 82vw, (max-width: 1023px) 43vw, 30vw"
                          className="ks-work-image"
                          draggable={false}
                        />
                        <span className={`ks-work-kind is-${item.kind}`}>{item.kind === "client" && <i aria-hidden="true" />}{KIND_LABEL[item.kind]}</span>
                      </div>
                    </div>
                    <div className="ks-work-card-body">
                      <div className="ks-work-card-meta"><span>{item.category}</span><span aria-hidden="true">{faNumber(index + 1)} / {item.year}</span></div>
                      <h3>{item.title}</h3>
                      <p>{item.summary}</p>
                      <div className="ks-work-card-bottom"><span>مشاهدهٔ پروژه</span><span className="ks-work-card-arrow"><ArrowLeft size={18} aria-hidden="true" /></span></div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="ks-work-controls">
        <div className="ks-work-navigation">
          <button type="button" onClick={() => move(-1)} disabled={!ready} aria-label="نمونه‌کار قبلی" title="نمونه‌کار قبلی"><ArrowRight size={19} aria-hidden="true" /></button>
          <button type="button" onClick={() => move(1)} disabled={!ready} aria-label="نمونه‌کار بعدی" title="نمونه‌کار بعدی"><ArrowLeft size={19} aria-hidden="true" /></button>
          <span className="ks-work-control-divider" aria-hidden="true" />
          <button
            type="button"
            className="ks-work-play"
            onClick={() => setPlaying(value => !value)}
            disabled={!ready || reducedMotion}
            aria-label={reducedMotion ? "حرکت خودکار مطابق تنظیمات دستگاه غیرفعال است" : playing ? "توقف حرکت خودکار نمونه‌کارها" : "شروع حرکت خودکار نمونه‌کارها"}
          >
            {playing && !reducedMotion ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
            <span>{reducedMotion ? "حرکت دستی" : playing ? "توقف حرکت" : "پخش حرکت"}</span>
          </button>
        </div>
        <div className="ks-work-progress" aria-hidden="true"><span style={{ transform: `scaleX(${(active + 1) / cases.length})` }} /></div>
        <div className="ks-work-status"><MoveHorizontal size={16} aria-hidden="true" /><span>بکشید و کشف کنید</span><span className="ks-work-count" aria-label={`نمونه‌کار ${active + 1} از ${cases.length}`}><b>{faNumber(active + 1)}</b> / {faNumber(cases.length)}</span></div>
      </div>
    </div>
  );
}

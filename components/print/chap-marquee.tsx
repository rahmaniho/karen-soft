import { CHAP_TICKER } from "@/lib/print/site";

/** نوار متحرک خدمات — ادای احترام به تیکر نسخۀ قدیمی کارن چاپ */
export function ChapMarquee() {
  const items = [...CHAP_TICKER, ...CHAP_TICKER];
  return (
    <div className="relative overflow-hidden border-y border-[var(--border-subtle)] bg-ink-950 py-3 text-white">
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap pe-8">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-8 text-3xs font-bold tracking-wide">
            <span className="text-white/80">{item}</span>
            <span className="size-1 rounded-full bg-[var(--color-cmyk-y)]" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}

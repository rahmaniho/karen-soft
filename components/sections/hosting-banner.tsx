import { ArrowUpLeft, Check, Server, Sparkles } from "lucide-react";
import { AFFILIATE_REL, HOSTING_OFFER } from "@/lib/affiliate";

/**
 * بنر تبلیغاتی همکاری در فروش میزبانی وب.
 *
 * - برچسب «AD / همکاری در فروش» همیشه دیده می‌شود تا آگهی از محتوای تحریریه جدا باشد.
 * - لینک با `rel="sponsored nofollow noopener noreferrer"` منتشر می‌شود.
 * - ظاهر با توکن‌های طراحی سایت هماهنگ است و تصویر خارجی یا اسکریپت تبلیغاتی
 *   بارگذاری نمی‌کند؛ بنابراین روی LCP و CLS اثری ندارد.
 */
export function HostingBanner({ variant = "section" }: { variant?: "section" | "compact" }) {
  const compact = variant === "compact";

  return (
    <section
      aria-labelledby="hosting-offer-title"
      data-ad-slot="hosting-affiliate"
      className={compact ? "not-prose my-10" : "container-page py-10 sm:py-14"}
    >
      <div className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-white/10 bg-ink-950 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_-20%,rgba(36,103,244,0.35),transparent_58%)]"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-backdrop opacity-30" />

        <div className={`relative grid gap-8 ${compact ? "p-6 sm:p-8" : "p-8 sm:p-10"} lg:grid-cols-[1.45fr_1fr] lg:items-center`}>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-4xs font-bold tracking-widest text-white/80">
                <Sparkles className="size-3" aria-hidden />
                AD · همکاری در فروش
              </span>
              <span className="text-4xs font-bold tracking-widest text-white/45">
                {HOSTING_OFFER.provider}
              </span>
            </div>

            <h2 id="hosting-offer-title" className={`mt-4 font-bold leading-snug ${compact ? "text-xl" : "display-3"}`}>
              {HOSTING_OFFER.title}
            </h2>
            <p className={`mt-3 leading-loose text-white/70 ${compact ? "text-sm" : ""}`}>
              {HOSTING_OFFER.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={HOSTING_OFFER.url}
                target="_blank"
                rel={AFFILIATE_REL}
                data-affiliate={HOSTING_OFFER.id}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-brand-600 px-5 text-sm font-bold text-white transition-colors hover:bg-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Server className="size-4" aria-hidden />
                {HOSTING_OFFER.cta}
                <ArrowUpLeft className="size-4" aria-hidden />
              </a>
              <p className="max-w-sm text-3xs leading-relaxed text-white/50">{HOSTING_OFFER.disclosure}</p>
            </div>
          </div>

          <ul className={`grid gap-2.5 ${compact ? "text-xs" : "text-sm"}`}>
            {HOSTING_OFFER.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2 rounded-[var(--radius-sm)] bg-white/5 px-3 py-2 leading-relaxed text-white/75">
                <Check className="mt-0.5 size-4 shrink-0 text-emerald-300" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

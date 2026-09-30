import { ArrowLeft, PlayCircle, TrendingUp } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { DashboardMockup } from "@/components/shared/dashboard-mockup";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-10 lg:pb-28 lg:pt-16">
      <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute -end-24 top-10 size-[360px] rounded-full opacity-70 blur-[2px]"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,.18), transparent 68%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 start-[5%] size-[430px] rounded-full opacity-70"
        style={{ background: "radial-gradient(circle, rgba(59,109,246,.18), transparent 68%)" }}
      />

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-raised)]/80 px-3.5 py-2 text-[11px] font-extrabold">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            پذیرش پروژه جدید برای پاییز ۱۴۰۵
          </span>

          <h1 className="mt-6 text-[42px] leading-[1.15] font-extrabold tracking-tight text-balance sm:text-6xl lg:text-[68px]">
            فناوری پیچیده،
            <br />
            <em className="not-italic text-brand-600 dark:text-brand-400">رشد ساده.</em>
          </h1>

          <p className="mt-6 max-w-lg text-[15px] leading-loose text-muted sm:text-base">
            ایده‌های کسب‌وکار شما را به وب‌سایت و نرم‌افزارهای سریع، امن و مقیاس‌پذیر تبدیل می‌کنیم — از طراحی تا پشتیبانی.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/contact" size="lg">
              مشاوره رایگان
              <ArrowLeft className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/demo" size="lg" variant="outline">
              <PlayCircle className="size-5" aria-hidden />
              دیدن دموی زنده
            </ButtonLink>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <div className="flex" dir="ltr" aria-hidden>
              {["ک", "س", "ح", "+"].map((letter, index) => (
                <span
                  key={letter}
                  className="-mr-2 grid size-9 place-items-center rounded-full border-2 border-[var(--surface)] text-[10px] font-extrabold text-white"
                  style={{ background: ["#3b6df6", "#0ba7c5", "#ff795c", "#0a0e18"][index] }}
                >
                  {letter}
                </span>
              ))}
            </div>
            <p className="text-[11px] leading-relaxed text-muted">
              <strong className="block text-[13px] text-[color:var(--text-primary)]">۱۲۰+ کسب‌وکار</strong>
              با کارن سافت دیجیتال شدند
            </p>
            <span className="ms-auto hidden items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-[11px] font-extrabold text-emerald-600 sm:inline-flex dark:text-emerald-400">
              <TrendingUp className="size-3.5" aria-hidden />
              رشد ۳۶٪ میانگین فروش مشتریان
            </span>
          </div>
        </div>

        <DashboardMockup />
      </div>
    </section>
  );
}

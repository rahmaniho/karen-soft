import { ArrowLeft, PlayCircle, Printer, TrendingUp } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { DashboardMockup } from "@/components/shared/dashboard-mockup";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-10 lg:pb-28 lg:pt-14">
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
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="eyebrow">Karen Soft · Est. 1404</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-raised)]/80 px-3 py-1.5 text-3xs font-bold">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              پذیرش پروژهٔ پاییز ۱۴۰۵
            </span>
          </div>

          <h1 className="display-1 mt-5">
            فناوری پیچیده،
            <br />
            <em className="relative not-italic text-brand-600 dark:text-brand-400">
              رشد ساده.
              <svg
                aria-hidden
                viewBox="0 0 240 12"
                preserveAspectRatio="none"
                className="absolute inset-x-0 -bottom-1 h-2.5 w-full text-brand-500/35"
              >
                <path d="M2 8c48-6 92-6 138-3 34 2 66 1 98-3" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </em>
          </h1>

          <p className="lead mt-7">
            سه کار انجام می‌دهیم و همه را جدی می‌گیریم: وب‌سایت سریع، نرم‌افزار مدیریتی دقیق، و اتوماسیونی که وقت
            تیم شما را پس می‌دهد. از اولین جلسه تا پشتیبانی، یک تیم — یک زبان.
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
            <ButtonLink href="/print" size="lg" variant="ghost" className="text-brand-700 dark:text-brand-300">
              <Printer className="size-4" aria-hidden />
              کارن چاپ
            </ButtonLink>
          </div>

          <div className="cmyk-strip mt-10 max-w-xs" aria-hidden>
            <span style={{ background: "var(--color-cmyk-c)" }} />
            <span style={{ background: "var(--color-cmyk-m)" }} />
            <span style={{ background: "var(--color-cmyk-y)" }} />
            <span style={{ background: "var(--color-cmyk-k)" }} />
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex" dir="ltr" aria-hidden>
              {["ک", "س", "ح", "+"].map((letter, index) => (
                <span
                  key={letter}
                  className="-mr-2 grid size-9 place-items-center rounded-full border-2 border-[var(--surface)] text-4xs font-extrabold text-white"
                  style={{ background: ["#3b6df6", "#0ba7c5", "#ff795c", "#0a0e18"][index] }}
                >
                  {letter}
                </span>
              ))}
            </div>
            <p className="text-2xs leading-relaxed text-muted">
              <strong className="block text-xs text-[color:var(--text-primary)]">۱۲۰+ کسب‌وکار</strong>
              با کارن سافت دیجیتال شدند
            </p>
            <span className="ms-auto hidden items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-3xs font-bold text-emerald-600 sm:inline-flex dark:text-emerald-400">
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

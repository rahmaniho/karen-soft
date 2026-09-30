import { ArrowUpLeft, Bell, Search } from "lucide-react";

const SERIES = [38, 52, 46, 68, 61, 88];
const MONTHS = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"];

/** Pure-CSS/SVG dashboard mockup used in the hero (no client JS). */
export function DashboardMockup() {
  const max = Math.max(...SERIES);
  const points = SERIES.map((value, index) => {
    const x = (index / (SERIES.length - 1)) * 100;
    const y = 100 - (value / max) * 82;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="relative [perspective:1400px]">
      <div className="overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] shadow-[0_35px_90px_rgba(10,35,70,.17)] [transform:rotateY(2deg)_rotateX(1deg)]">
        <div className="flex h-12 items-center gap-3 border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-4">
          <span className="flex items-center gap-1.5" aria-hidden>
            <span className="size-2 rounded-full bg-emerald-500" />
            <span className="size-2 rounded-full bg-amber-400" />
            <span className="size-2 rounded-full bg-rose-400" />
          </span>
          <span className="flex items-center gap-2 rounded-md bg-[var(--surface)] px-3 py-1.5 text-[10px] text-muted">
            <Search className="size-3" aria-hidden />
            جست‌وجو در داشبورد…
          </span>
          <Bell className="ms-auto size-3.5 text-muted" aria-hidden />
        </div>

        <div className="grid grid-cols-[56px_1fr]">
          <div className="flex flex-col items-center gap-5 bg-ink-900 py-5">
            <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-accent-cyan to-brand-500 text-[11px] font-extrabold text-white">
              ک
            </span>
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={i === 0 ? "size-4 rounded border-2 border-brand-400" : "h-1.5 w-4 rounded bg-white/20"}
                aria-hidden
              />
            ))}
          </div>

          <div className="bg-[var(--surface-sunken)] p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] text-muted">خوش آمدید</p>
                <strong className="text-sm">داشبورد فروش کارن سافت</strong>
              </div>
              <span className="rounded-md bg-brand-600 px-3 py-1.5 text-[10px] font-extrabold text-white">گزارش ماه</span>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2.5">
              {[
                { label: "درآمد", value: "۱۲۸.۴م", trend: "۱۲٪+" },
                { label: "سفارش‌ها", value: "۱٬۲۴۰", trend: "۸٪+" },
                { label: "رشد", value: "۳۶٪", trend: "۴٪+" },
              ].map((kpi) => (
                <div key={kpi.label} className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-3">
                  <p className="text-[9px] text-muted">{kpi.label}</p>
                  <strong className="block text-base">{kpi.value}</strong>
                  <span className="inline-flex items-center gap-0.5 text-[9px] font-extrabold text-emerald-600">
                    <ArrowUpLeft className="size-2.5" aria-hidden />
                    {kpi.trend}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4">
              <div className="mb-3 flex items-center justify-between">
                <strong className="text-[11px]">روند فروش ۶ ماه اخیر</strong>
                <span className="text-[9px] text-muted">میلیون تومان</span>
              </div>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-32 w-full" role="img" aria-label="نمودار روند فروش شش ماه اخیر">
                <defs>
                  <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b6df6" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#3b6df6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon points={`0,100 ${points} 100,100`} fill="url(#areaFill)" />
                <polyline points={points} fill="none" stroke="#3b6df6" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
              </svg>
              <div className="mt-2 flex justify-between text-[8px] text-muted">
                {MONTHS.map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -start-4 hidden rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-4 py-3 shadow-[var(--shadow-lift)] sm:block">
        <p className="text-[9px] text-muted">زمان بارگذاری</p>
        <strong className="text-sm text-emerald-600">۰.۹ ثانیه</strong>
      </div>
    </div>
  );
}

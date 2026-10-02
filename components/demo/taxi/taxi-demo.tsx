"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageSquare, Navigation, Phone } from "lucide-react";
import {
  DRIVERS,
  RIDES,
  TARIFF,
  TAXI_CUSTOMERS,
  TRIP_TREND,
  type TaxiDriver,
  type TaxiRide,
} from "@/lib/demos/taxi-management.data";
import { DemoShell, type DemoModule } from "@/components/demo/shared/demo-shell";
import { BarChart, DataTable, DemoPanel, KpiGrid, RangeField } from "@/components/demo/shared/widgets";
import { formatToman, toPersianDigits } from "@/lib/utils";

const ACCENT = "#0ea5e9";

export function TaxiDemo() {
  const [drivers, setDrivers] = useState<TaxiDriver[]>(DRIVERS);
  const [rides, setRides] = useState<TaxiRide[]>(RIDES);
  const [log, setLog] = useState<string[]>([]);
  const [distance, setDistance] = useState(8);
  const [night, setNight] = useState(false);
  const [waitMinutes, setWaitMinutes] = useState(5);

  // Animate cars on the mock map.
  useEffect(() => {
    const id = window.setInterval(() => {
      setDrivers((prev) =>
        prev.map((driver) =>
          driver.status === "آفلاین"
            ? driver
            : {
                ...driver,
                x: (driver.x + (driver.id.charCodeAt(1) % 3) + 1) % 92,
                y: (driver.y + ((driver.id.charCodeAt(1) % 2) + 1)) % 84,
              },
        ),
      );
    }, 1600);
    return () => window.clearInterval(id);
  }, []);

  function reset() {
    setDrivers(DRIVERS);
    setRides(RIDES);
    setLog([]);
  }

  function assign(rideId: string, driverId: string) {
    const driver = drivers.find((d) => d.id === driverId);
    const ride = rides.find((r) => r.id === rideId);
    if (!driver || !ride) return;
    setRides((prev) => prev.map((r) => (r.id === rideId ? { ...r, driverId, status: "تخصیص‌یافته" } : r)));
    setDrivers((prev) => prev.map((d) => (d.id === driverId ? { ...d, status: "در سفر" } : d)));
    setLog((prev) => [
      `پیامک به ${ride.passenger}: راننده ${driver.name} با ${driver.car} به پلاک ${driver.plate} در راه است.`,
      ...prev,
    ]);
  }

  const fare = useMemo(() => {
    const base = TARIFF.base + distance * TARIFF.perKm + waitMinutes * TARIFF.waitPerMinute;
    return Math.round(night ? base * (1 + TARIFF.nightSurcharge / 100) : base);
  }, [distance, night, waitMinutes]);

  const freeDrivers = drivers.filter((d) => d.status === "آزاد");

  const modules: DemoModule[] = [
    {
      id: "map",
      label: "نقشه زنده",
      hint: "موقعیت خودروها هر ۱.۶ ثانیه به‌روزرسانی می‌شود.",
      content: (
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <DemoPanel title="نقشه ناوگان">
            <div className="relative aspect-4/3 overflow-hidden rounded-[var(--radius-lg)] bg-[var(--surface-sunken)]">
              <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
                {[20, 40, 60, 80].map((pos) => (
                  <g key={pos}>
                    <line x1={pos} y1="0" x2={pos} y2="100" stroke="currentColor" strokeWidth="0.4" className="text-[color:var(--border-subtle)]" />
                    <line x1="0" y1={pos} x2="100" y2={pos} stroke="currentColor" strokeWidth="0.4" className="text-[color:var(--border-subtle)]" />
                  </g>
                ))}
                <circle cx="50" cy="50" r="6" fill={`${ACCENT}22`} />
                <text x="50" y="51" textAnchor="middle" fontSize="3" fill={ACCENT}>مرکز</text>
              </svg>
              {drivers.map((driver) => (
                <span
                  key={driver.id}
                  className="absolute grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-5xs font-extrabold text-white transition-all duration-[1200ms] ease-linear"
                  style={{
                    insetInlineStart: `${driver.x}%`,
                    top: `${driver.y}%`,
                    background: driver.status === "آزاد" ? "#10b981" : driver.status === "در سفر" ? ACCENT : "#94a3b8",
                  }}
                  title={`${driver.name} — ${driver.status}`}
                >
                  🚖
                </span>
              ))}
            </div>
            <ul className="mt-3 flex flex-wrap gap-3 text-3xs">
              {[
                { color: "#10b981", label: "آزاد" },
                { color: ACCENT, label: "در سفر" },
                { color: "#94a3b8", label: "آفلاین" },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full" style={{ background: item.color }} aria-hidden />
                  {item.label}
                </li>
              ))}
            </ul>
          </DemoPanel>
          <DemoPanel title="پیامک‌های ارسال‌شده">
            <ul aria-live="polite" className="space-y-2">
              {log.map((entry, index) => (
                <li key={index} className="flex gap-2 rounded-[var(--radius-sm)] bg-[var(--surface-sunken)] p-3 text-3xs leading-loose">
                  <MessageSquare className="size-3.5 shrink-0" style={{ color: ACCENT }} aria-hidden />
                  {entry}
                </li>
              ))}
              {log.length === 0 ? <li className="p-3 text-center text-3xs text-muted">هنوز سفری تخصیص نیافته است.</li> : null}
            </ul>
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "rides",
      label: "سفارش‌ها",
      hint: "برای هر درخواست، راننده آزاد را تخصیص دهید.",
      content: (
        <div className="space-y-5">
          <KpiGrid
            accent={ACCENT}
            items={[
              { label: "در صف", value: toPersianDigits(rides.filter((r) => r.status === "در صف").length) },
              { label: "در حال انجام", value: toPersianDigits(rides.filter((r) => r.status === "در حال انجام" || r.status === "تخصیص‌یافته").length) },
              { label: "راننده آزاد", value: toPersianDigits(freeDrivers.length) },
              { label: "میانگین انتظار", value: "۵۰ ثانیه" },
            ]}
          />
          <DemoPanel title="صف درخواست‌ها">
            <ul className="space-y-2">
              {rides.map((ride) => {
                const driver = drivers.find((d) => d.id === ride.driverId);
                return (
                  <li key={ride.id} className="rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-2xs font-extrabold persian-num">
                          {ride.id} — {ride.passenger}
                        </p>
                        <p className="mt-1 text-3xs text-muted">
                          {ride.from} ← {ride.to} · <span className="persian-num">{toPersianDigits(ride.distanceKm)} کیلومتر</span> · {ride.requestedAt}
                        </p>
                      </div>
                      {ride.status === "در صف" ? (
                        <div className="flex items-center gap-2">
                          <select
                            aria-label={`تخصیص راننده به ${ride.id}`}
                            defaultValue=""
                            onChange={(event) => {
                              if (event.target.value) assign(ride.id, event.target.value);
                            }}
                            className="h-9 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-2 text-3xs"
                          >
                            <option value="" disabled>
                              انتخاب راننده
                            </option>
                            {freeDrivers.map((driverOption) => (
                              <option key={driverOption.id} value={driverOption.id}>
                                {driverOption.name} — {driverOption.car}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <span className="rounded-full px-3 py-1 text-4xs font-extrabold text-white" style={{ background: ACCENT }}>
                          {driver ? `${driver.name} — ${ride.status}` : ride.status}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "drivers",
      label: "رانندگان",
      hint: "وضعیت آنلاین، امتیاز و مشخصات خودرو.",
      content: (
        <DemoPanel title="ناوگان">
          <DataTable
            rows={drivers}
            searchKeys={(row) => `${row.name} ${row.car} ${row.plate}`}
            filters={[
              { id: "free", label: "آزاد", predicate: (row) => row.status === "آزاد" },
              { id: "busy", label: "در سفر", predicate: (row) => row.status === "در سفر" },
            ]}
            columns={[
              { key: "name", header: "راننده", render: (row) => <span className="font-bold">{row.name}</span> },
              { key: "car", header: "خودرو", render: (row) => row.car },
              { key: "plate", header: "پلاک", render: (row) => <span className="persian-num text-muted">{row.plate}</span> },
              { key: "rating", header: "امتیاز", render: (row) => <span className="persian-num">{toPersianDigits(row.rating)}</span> },
              {
                key: "status",
                header: "وضعیت",
                render: (row) => (
                  <span
                    className="rounded-full px-2 py-1 text-4xs font-bold text-white"
                    style={{ background: row.status === "آزاد" ? "#10b981" : row.status === "در سفر" ? ACCENT : "#94a3b8" }}
                  >
                    {row.status}
                  </span>
                ),
              },
            ]}
          />
        </DemoPanel>
      ),
    },
    {
      id: "customers",
      label: "مشتریان",
      hint: "سوابق سفر و مسیرهای پرتکرار مسافران.",
      content: (
        <div className="grid gap-4 sm:grid-cols-2">
          {TAXI_CUSTOMERS.map((customer) => (
            <article key={customer.id} className="surface-card p-5">
              <h3 className="text-xs font-extrabold">{customer.name}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-3xs text-muted persian-num">
                <Phone className="size-3" aria-hidden />
                {customer.phone}
              </p>
              <dl className="mt-3 flex gap-6 text-3xs">
                <div>
                  <dt className="text-muted">تعداد سفر</dt>
                  <dd className="font-extrabold persian-num">{toPersianDigits(customer.trips)}</dd>
                </div>
                <div>
                  <dt className="text-muted">مسیر پرتکرار</dt>
                  <dd className="font-extrabold">{customer.favorite}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      ),
    },
    {
      id: "fare",
      label: "مالی و کرایه‌ها",
      hint: "ماشین‌حساب کرایه بر اساس تعرفه مصوب.",
      content: (
        <div className="grid gap-5 lg:grid-cols-2">
          <DemoPanel title="محاسبه کرایه">
            <div className="space-y-5">
              <RangeField label="مسافت سفر" value={distance} min={1} max={40} suffix="کیلومتر" accent={ACCENT} onChange={setDistance} />
              <RangeField label="زمان انتظار" value={waitMinutes} min={0} max={30} suffix="دقیقه" accent={ACCENT} onChange={setWaitMinutes} />
              <label className="flex items-center gap-2 text-2xs font-bold">
                <input type="checkbox" checked={night} onChange={(e) => setNight(e.target.checked)} className="size-4" style={{ accentColor: ACCENT }} />
                نرخ شب‌کاری (+{toPersianDigits(TARIFF.nightSurcharge)}٪)
              </label>
            </div>
            <div className="mt-6 rounded-[var(--radius-md)] p-4 text-white" style={{ background: ACCENT }}>
              <p className="text-3xs opacity-85">کرایه محاسبه‌شده</p>
              <strong className="text-2xl persian-num">{formatToman(fare)}</strong>
            </div>
          </DemoPanel>
          <DemoPanel title="حساب رانندگان">
            <ul className="space-y-2">
              {drivers.slice(0, 5).map((driver, index) => (
                <li key={driver.id} className="flex items-center justify-between rounded-[var(--radius-sm)] bg-[var(--surface-sunken)] p-3 text-2xs">
                  <span className="font-bold">{driver.name}</span>
                  <span className="persian-num">{formatToman([4_820_000, 3_640_000, 5_110_000, 2_980_000, 6_240_000][index]!)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-3xs text-muted">کمیسیون آژانس ۱۵٪ به‌صورت خودکار از هر سفر کسر می‌شود.</p>
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "reports",
      label: "گزارش سفرها",
      hint: "توزیع سفرها در ساعات مختلف روز.",
      content: (
        <div className="space-y-5">
          <KpiGrid
            accent={ACCENT}
            items={[
              { label: "سفر امروز", value: "۴۳۸" },
              { label: "درآمد امروز", value: "۳۸.۶م", hint: "تومان" },
              { label: "نرخ لغو", value: "۳.۲٪" },
              { label: "میانگین مسافت", value: "۷.۸ کیلومتر" },
            ]}
          />
          <DemoPanel title="سفرها بر اساس ساعت">
            <BarChart data={TRIP_TREND} accent={ACCENT} unit="سفر" />
          </DemoPanel>
          <DemoPanel title="خلاصه">
            <p className="flex items-center gap-2 text-2xs text-muted">
              <Navigation className="size-4" style={{ color: ACCENT }} aria-hidden />
              بیشترین تقاضا بین ساعت ۱۷ تا ۲۰ است؛ پیشنهاد می‌شود شیفت عصر با دو راننده بیشتر برنامه‌ریزی شود.
            </p>
          </DemoPanel>
        </div>
      ),
    },
  ];

  return <DemoShell productSlug="taxi-management" productName="مدیریت آژانس تاکسی تلفنی" emoji="🚖" accent={ACCENT} modules={modules} onReset={reset} />;
}

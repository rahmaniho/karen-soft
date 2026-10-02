"use client";

import { useMemo, useState } from "react";
import { ScanLine } from "lucide-react";
import { CAR_BRANDS, CAR_MODELS, PARTS, PART_ORDERS } from "@/lib/demos/auto-parts.data";
import { DemoShell, type DemoModule } from "@/components/demo/shared/demo-shell";
import { DataTable, DemoPanel, KpiGrid, RangeField } from "@/components/demo/shared/widgets";
import { cn, formatToman, toPersianDigits } from "@/lib/utils";

const ACCENT = "#3b6df6";

export function AutoPartsDemo() {
  const [brand, setBrand] = useState<string>(CAR_BRANDS[0]!);
  const [model, setModel] = useState<string>(CAR_MODELS[CAR_BRANDS[0]!]![0]!);
  const [year, setYear] = useState(1395);
  const [scanned, setScanned] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [margin, setMargin] = useState(22);

  function reset() {
    setBrand(CAR_BRANDS[0]!);
    setModel(CAR_MODELS[CAR_BRANDS[0]!]![0]!);
    setYear(1395);
    setScanned(null);
    setMargin(22);
  }

  const matches = useMemo(
    () => PARTS.filter((part) => part.brand === brand && part.model === model && year >= part.yearFrom && year <= part.yearTo),
    [brand, model, year],
  );

  const lowStock = PARTS.filter((part) => part.stock <= part.reorder);

  async function scan() {
    setScanning(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const part = PARTS[Math.floor(Math.random() * PARTS.length)]!;
    setScanned(part.code);
    setScanning(false);
  }

  const scannedPart = PARTS.find((p) => p.code === scanned);

  const modules: DemoModule[] = [
    {
      id: "dashboard",
      label: "داشبورد",
      hint: "فروش، موجودی بحرانی و سفارش‌های باز.",
      content: (
        <div className="space-y-5">
          <KpiGrid
            accent={ACCENT}
            items={[
              { label: "کد کالا", value: toPersianDigits(PARTS.length) },
              { label: "موجودی بحرانی", value: toPersianDigits(lowStock.length) },
              { label: "سفارش باز", value: toPersianDigits(PART_ORDERS.filter((o) => o.status !== "تحویل‌شده").length) },
              { label: "فروش امروز", value: "۲۵.۸م", hint: "تومان" },
            ]}
          />
          <DemoPanel title="اقلام زیر نقطه سفارش">
            <ul className="space-y-2">
              {lowStock.slice(0, 8).map((part) => (
                <li key={part.id} className="flex items-center justify-between rounded-[var(--radius-sm)] bg-[var(--surface-sunken)] p-3 text-2xs">
                  <span className="font-bold">
                    {part.name} — {part.model}
                  </span>
                  <span className="persian-num font-extrabold text-rose-500">موجودی {toPersianDigits(part.stock)}</span>
                </li>
              ))}
            </ul>
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "finder",
      label: "قطعه‌یاب",
      hint: "برند، مدل و سال خودرو را انتخاب کنید.",
      content: (
        <div className="space-y-5">
          <DemoPanel title="فیلتر آبشاری">
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="text-2xs font-bold">
                برند
                <select
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                    setModel(CAR_MODELS[e.target.value]![0]!);
                  }}
                  className="mt-2 h-10 w-full rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-3 text-2xs"
                >
                  {CAR_BRANDS.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label className="text-2xs font-bold">
                مدل
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="mt-2 h-10 w-full rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-3 text-2xs"
                >
                  {(CAR_MODELS[brand] ?? []).map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <div>
                <RangeField label="سال ساخت" value={year} min={1385} max={1404} accent={ACCENT} onChange={setYear} />
              </div>
            </div>
          </DemoPanel>
          <DemoPanel title={`${toPersianDigits(matches.length)} قطعه سازگار`}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {matches.map((part) => (
                <article key={part.id} className="rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-4">
                  <h3 className="text-2xs font-extrabold">{part.name}</h3>
                  <p className="text-4xs text-muted" dir="ltr">{part.code}</p>
                  <p className="mt-2 text-2xs font-bold persian-num" style={{ color: ACCENT }}>
                    {formatToman(part.price)}
                  </p>
                  <p className={cn("mt-1 text-4xs persian-num", part.stock <= part.reorder ? "text-rose-500" : "text-muted")}>
                    موجودی: {toPersianDigits(part.stock)} عدد
                  </p>
                </article>
              ))}
              {matches.length === 0 ? <p className="p-6 text-2xs text-muted">برای این ترکیب قطعه‌ای یافت نشد.</p> : null}
            </div>
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "scanner",
      label: "بارکدخوان",
      hint: "شبیه‌سازی اسکن بارکد قطعه.",
      content: (
        <DemoPanel title="ایستگاه اسکن">
          <div className="grid place-items-center rounded-[var(--radius-lg)] bg-[var(--surface-sunken)] p-10">
            <ScanLine className={cn("size-20", scanning && "animate-pulse")} style={{ color: ACCENT }} aria-hidden />
            <button
              type="button"
              onClick={() => void scan()}
              disabled={scanning}
              className="mt-4 h-10 rounded-[var(--radius-sm)] px-5 text-2xs font-extrabold text-white disabled:opacity-50"
              style={{ background: ACCENT }}
            >
              {scanning ? "در حال اسکن…" : "اسکن بارکد"}
            </button>
          </div>
          {scannedPart ? (
            <div aria-live="polite" className="mt-4 rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-4 text-2xs">
              <strong className="block">{scannedPart.name}</strong>
              <span className="text-3xs text-muted">
                {scannedPart.brand} {scannedPart.model} · <span dir="ltr">{scannedPart.code}</span>
              </span>
              <p className="mt-2 font-extrabold persian-num" style={{ color: ACCENT }}>
                {formatToman(scannedPart.price)} · موجودی {toPersianDigits(scannedPart.stock)}
              </p>
            </div>
          ) : null}
        </DemoPanel>
      ),
    },
    {
      id: "inventory",
      label: "انبار",
      hint: "جست‌وجو و فیلتر موجودی قطعات.",
      content: (
        <DemoPanel title="موجودی انبار">
          <DataTable
            rows={PARTS}
            searchKeys={(row) => `${row.name} ${row.model} ${row.code}`}
            filters={[
              { id: "low", label: "کمبود موجودی", predicate: (row) => row.stock <= row.reorder },
              { id: "high", label: "موجودی بالا", predicate: (row) => row.stock > 30 },
            ]}
            columns={[
              { key: "name", header: "قطعه", render: (row) => <span className="font-bold">{row.name}</span> },
              { key: "model", header: "خودرو", render: (row) => `${row.brand} ${row.model}` },
              { key: "code", header: "کد", render: (row) => <span dir="ltr" className="text-muted">{row.code}</span> },
              { key: "price", header: "قیمت", render: (row) => <span className="persian-num">{formatToman(row.price)}</span> },
              {
                key: "stock",
                header: "موجودی",
                render: (row) => (
                  <span className={cn("persian-num", row.stock <= row.reorder && "font-extrabold text-rose-500")}>{toPersianDigits(row.stock)}</span>
                ),
              },
            ]}
          />
        </DemoPanel>
      ),
    },
    {
      id: "orders",
      label: "سفارش‌ها",
      hint: "سفارش مشتریان و وضعیت ارسال.",
      content: (
        <DemoPanel title="سفارش‌های اخیر">
          <ul className="space-y-2">
            {PART_ORDERS.map((order) => (
              <li key={order.id} className="flex items-center justify-between rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-4 text-2xs">
                <span>
                  <strong className="block persian-num">{order.id} — {order.customer}</strong>
                  <span className="text-4xs text-muted persian-num">{toPersianDigits(order.items)} قلم کالا</span>
                </span>
                <span className="text-end">
                  <strong className="block persian-num">{formatToman(order.total)}</strong>
                  <span className="text-4xs text-muted">{order.status}</span>
                </span>
              </li>
            ))}
          </ul>
        </DemoPanel>
      ),
    },
    {
      id: "pricing",
      label: "قیمت‌گذاری",
      hint: "حاشیه سود را تغییر دهید تا قیمت فروش به‌روز شود.",
      content: (
        <DemoPanel title="قواعد قیمت">
          <RangeField label="حاشیه سود" value={margin} min={5} max={60} suffix="٪" accent={ACCENT} onChange={setMargin} />
          <ul className="mt-5 space-y-2">
            {PARTS.slice(0, 8).map((part) => (
              <li key={part.id} className="flex items-center justify-between rounded-[var(--radius-sm)] bg-[var(--surface-sunken)] p-3 text-2xs">
                <span className="font-bold">{part.name} — {part.model}</span>
                <span className="persian-num">
                  خرید {formatToman(part.price)} ← فروش{" "}
                  <strong style={{ color: ACCENT }}>{formatToman(Math.round(part.price * (1 + margin / 100)))}</strong>
                </span>
              </li>
            ))}
          </ul>
        </DemoPanel>
      ),
    },
  ];

  return <DemoShell productSlug="auto-parts" productName="مدیریت لوازم یدکی" emoji="🔧" accent={ACCENT} modules={modules} onReset={reset} />;
}

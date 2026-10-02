"use client";

import { useMemo, useState } from "react";
import { CalendarPlus, FileSignature, Sparkles } from "lucide-react";
import { AGENTS, BUYERS, PROPERTIES, VIEWINGS, type Property } from "@/lib/demos/real-estate.data";
import { DemoShell, type DemoModule } from "@/components/demo/shared/demo-shell";
import { DataTable, DemoPanel, KpiGrid } from "@/components/demo/shared/widgets";
import { cn, formatNumber, formatToman, toPersianDigits } from "@/lib/utils";

const ACCENT = "#84a98c";

export function RealEstateDemo() {
  const [properties, setProperties] = useState<Property[]>(PROPERTIES);
  const [buyerId, setBuyerId] = useState(BUYERS[0]!.id);
  const [viewings, setViewings] = useState(VIEWINGS);
  const [contracts, setContracts] = useState<{ id: string; property: string; buyer: string; commission: number }[]>([]);

  function reset() {
    setProperties(PROPERTIES);
    setViewings(VIEWINGS);
    setContracts([]);
  }

  const buyer = BUYERS.find((b) => b.id === buyerId)!;

  const matches = useMemo(
    () =>
      properties
        .filter((p) => p.status !== "فروخته‌شده")
        .map((property) => {
          let score = 0;
          if (property.price <= buyer.budget) score += 40;
          if (property.area >= buyer.minArea) score += 25;
          if (property.rooms >= buyer.rooms) score += 20;
          if (property.district === buyer.district) score += 15;
          return { property, score };
        })
        .sort((a, b) => b.score - a.score),
    [properties, buyer],
  );

  const modules: DemoModule[] = [
    {
      id: "dashboard",
      label: "داشبورد فروش",
      hint: "معاملات، فایل‌های فعال و درآمد کمیسیون.",
      content: (
        <div className="space-y-5">
          <KpiGrid
            accent={ACCENT}
            items={[
              { label: "فایل فعال", value: toPersianDigits(properties.filter((p) => p.status === "فعال").length) },
              { label: "بازدید برنامه‌ریزی‌شده", value: toPersianDigits(viewings.length) },
              { label: "قرارداد این ماه", value: toPersianDigits(contracts.length) },
              { label: "کمیسیون", value: formatNumber(contracts.reduce((s, c) => s + c.commission, 0) / 1_000_000), hint: "میلیون تومان" },
            ]}
          />
          <DemoPanel title="فایل‌ها بر اساس محله">
            <ul className="space-y-3">
              {["زیباشهر", "مینودر", "بلوار امام", "مرکز شهر"].map((district) => {
                const count = properties.filter((p) => p.district === district).length;
                return (
                  <li key={district}>
                    <div className="flex justify-between text-3xs font-bold">
                      <span>{district}</span>
                      <span className="persian-num">{toPersianDigits(count)} فایل</span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-[var(--surface-sunken)]">
                      <span className="block h-full rounded-full" style={{ width: `${(count / properties.length) * 100}%`, background: ACCENT }} />
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
      id: "properties",
      label: "فایل‌های ملک",
      hint: "بانک فایل‌ها با فیلتر نوع معامله و وضعیت.",
      content: (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <article key={property.id} className="surface-card overflow-hidden">
              <div className="h-28" style={{ background: `linear-gradient(140deg, ${ACCENT}55, ${ACCENT}15)` }} aria-hidden />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-4xs font-bold text-muted persian-num">{property.id}</span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-5xs font-bold",
                      property.status === "فعال" && "bg-emerald-500/15 text-emerald-600",
                      property.status === "رزرو" && "bg-amber-500/15 text-amber-600",
                      property.status === "فروخته‌شده" && "bg-slate-500/15 text-slate-500",
                    )}
                  >
                    {property.status}
                  </span>
                </div>
                <h3 className="mt-1 text-xs font-extrabold">{property.title}</h3>
                <p className="mt-1 text-3xs text-muted persian-num">
                  {property.district} · {toPersianDigits(property.area)} متر · {toPersianDigits(property.rooms)} خواب
                </p>
                <p className="mt-2 text-2xs font-extrabold persian-num" style={{ color: ACCENT }}>
                  {formatToman(property.price)}
                </p>
              </div>
            </article>
          ))}
        </div>
      ),
    },
    {
      id: "buyers",
      label: "مشتریان و تطبیق",
      hint: "خریدار را انتخاب کنید تا فایل‌های مناسب امتیازدهی شوند.",
      content: (
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <DemoPanel title="خریداران">
            <ul className="space-y-2">
              {BUYERS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setBuyerId(item.id)}
                    aria-pressed={buyerId === item.id}
                    className={cn(
                      "w-full rounded-[var(--radius-md)] p-3 text-start transition-colors",
                      buyerId === item.id ? "text-white" : "bg-[var(--surface-sunken)]",
                    )}
                    style={buyerId === item.id ? { background: ACCENT } : undefined}
                  >
                    <span className="block text-2xs font-extrabold">{item.name}</span>
                    <span className="block text-4xs persian-num opacity-80">
                      بودجه {formatToman(item.budget)} · حداقل {toPersianDigits(item.minArea)} متر · {item.district}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </DemoPanel>
          <DemoPanel title="پیشنهاد هوشمند فایل">
            <ul className="space-y-2">
              {matches.map(({ property, score }) => (
                <li key={property.id} className="rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xs font-extrabold">{property.title}</span>
                    <span className="flex items-center gap-1 text-3xs font-extrabold persian-num" style={{ color: ACCENT }}>
                      <Sparkles className="size-3.5" aria-hidden />
                      {toPersianDigits(score)}٪ تطابق
                    </span>
                  </div>
                  <p className="mt-1 text-4xs text-muted persian-num">
                    {formatToman(property.price)} · {toPersianDigits(property.area)} متر · {property.district}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setViewings((prev) => [
                          ...prev,
                          { id: `v-${prev.length + 1}`, property: property.title, buyer: buyer.name, date: "۱۴۰۵/۰۷/۲۰", agent: AGENTS[prev.length % AGENTS.length]!, result: "در انتظار" },
                        ])
                      }
                      className="inline-flex h-8 items-center gap-1 rounded-[var(--radius-sm)] px-3 text-4xs font-extrabold text-white"
                      style={{ background: ACCENT }}
                    >
                      <CalendarPlus className="size-3" aria-hidden />
                      زمان‌بندی بازدید
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setProperties((prev) => prev.map((p) => (p.id === property.id ? { ...p, status: "رزرو" } : p)));
                        setContracts((prev) => [
                          ...prev,
                          { id: `q-${prev.length + 1}`, property: property.title, buyer: buyer.name, commission: Math.round(property.price * 0.005) },
                        ]);
                      }}
                      className="inline-flex h-8 items-center gap-1 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] px-3 text-4xs font-extrabold"
                    >
                      <FileSignature className="size-3" aria-hidden />
                      تنظیم قرارداد
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "viewings",
      label: "بازدیدها",
      hint: "برنامه بازدیدها و نتیجه هر بازدید.",
      content: (
        <DemoPanel title="تقویم بازدید">
          <DataTable
            rows={viewings}
            columns={[
              { key: "property", header: "ملک", render: (row) => <span className="font-bold">{row.property}</span> },
              { key: "buyer", header: "خریدار", render: (row) => row.buyer },
              { key: "date", header: "تاریخ", render: (row) => <span className="persian-num">{row.date}</span> },
              { key: "agent", header: "مشاور", render: (row) => <span className="text-muted">{row.agent}</span> },
              { key: "result", header: "نتیجه", render: (row) => row.result },
            ]}
          />
        </DemoPanel>
      ),
    },
    {
      id: "contracts",
      label: "قراردادها",
      hint: "قراردادهای تولیدشده از فایل‌های رزروشده.",
      content: (
        <DemoPanel title="قراردادها">
          {contracts.length === 0 ? (
            <p className="p-8 text-center text-2xs text-muted">
              هنوز قراردادی ثبت نشده است. از ماژول «مشتریان و تطبیق» یک قرارداد بسازید.
            </p>
          ) : (
            <ul className="space-y-2">
              {contracts.map((contract) => (
                <li key={contract.id} className="flex items-center justify-between rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-4 text-2xs">
                  <span>
                    <strong className="block">{contract.property}</strong>
                    <span className="text-4xs text-muted">خریدار: {contract.buyer}</span>
                  </span>
                  <span className="persian-num font-extrabold" style={{ color: ACCENT }}>
                    کمیسیون {formatToman(contract.commission)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </DemoPanel>
      ),
    },
    {
      id: "commission",
      label: "کمیسیون‌ها",
      hint: "سهم دفتر و مشاوران از معاملات.",
      content: (
        <div className="grid gap-4 sm:grid-cols-2">
          {AGENTS.map((agent, index) => (
            <article key={agent} className="surface-card p-5">
              <h3 className="text-xs font-extrabold">{agent}</h3>
              <p className="mt-2 text-3xs text-muted persian-num">
                معاملات ماه: {toPersianDigits([4, 3, 2, 5][index]!)} · نرخ تبدیل {toPersianDigits([32, 28, 21, 39][index]!)}٪
              </p>
              <p className="mt-2 text-sm font-extrabold persian-num" style={{ color: ACCENT }}>
                {formatToman([62_000_000, 48_500_000, 31_000_000, 74_200_000][index]!)}
              </p>
            </article>
          ))}
        </div>
      ),
    },
  ];

  return <DemoShell productSlug="real-estate" productName="مدیریت املاک" emoji="🏢" accent={ACCENT} modules={modules} onReset={reset} />;
}

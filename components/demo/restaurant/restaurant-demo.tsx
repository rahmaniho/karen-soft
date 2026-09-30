"use client";

import { useEffect, useMemo, useState } from "react";
import { ChefHat, Minus, Plus, Timer } from "lucide-react";
import {
  MENU,
  SALES_TREND,
  STOCK,
  TABLES,
  type KitchenTicket,
  type MenuItem,
  type RestaurantTable,
} from "@/lib/demos/restaurant.data";
import { DemoShell, type DemoModule } from "@/components/demo/shared/demo-shell";
import { BarChart, DataTable, DemoPanel, KpiGrid } from "@/components/demo/shared/widgets";
import { cn, formatNumber, formatToman, toPersianDigits } from "@/lib/utils";

const ACCENT = "#f59e0b";

export function RestaurantDemo() {
  const [tables, setTables] = useState<RestaurantTable[]>(TABLES);
  const [selectedTable, setSelectedTable] = useState<string>(TABLES[0]!.id);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [tickets, setTickets] = useState<KitchenTicket[]>([]);
  const [revenue, setRevenue] = useState(18_450_000);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  function reset() {
    setTables(TABLES);
    setCart({});
    setTickets([]);
    setRevenue(18_450_000);
  }

  const cartTotal = useMemo(
    () => Object.entries(cart).reduce((sum, [id, qty]) => sum + (MENU.find((m) => m.id === id)?.price ?? 0) * qty, 0),
    [cart],
  );

  function submitOrder() {
    const items = Object.entries(cart)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => ({ name: MENU.find((m) => m.id === id)?.name ?? "", qty }));
    if (items.length === 0) return;
    const table = tables.find((t) => t.id === selectedTable)!;
    setTickets((prev) => [
      { id: `k-${prev.length + 1}`, table: table.name, items, createdAt: Date.now(), status: "در صف" },
      ...prev,
    ]);
    setTables((prev) => prev.map((t) => (t.id === selectedTable ? { ...t, status: "مشغول" } : t)));
    setRevenue((prev) => prev + cartTotal);
    setCart({});
  }

  const modules: DemoModule[] = [
    {
      id: "dashboard",
      label: "داشبورد روز",
      hint: "فروش امروز، میزهای فعال و سفارش‌های باز.",
      content: (
        <div className="space-y-5">
          <KpiGrid
            accent={ACCENT}
            items={[
              { label: "فروش امروز", value: formatNumber(Math.round(revenue / 1_000_000)), hint: "میلیون تومان" },
              { label: "میز مشغول", value: toPersianDigits(tables.filter((t) => t.status === "مشغول").length) },
              { label: "سفارش در آشپزخانه", value: toPersianDigits(tickets.filter((t) => t.status !== "آماده").length) },
              { label: "میانگین فاکتور", value: "۶۸۰ هزار" },
            ]}
          />
          <DemoPanel title="فروش ساعتی (تومان)">
            <BarChart data={SALES_TREND.map((s) => ({ label: s.label, value: Math.round(s.value / 100_000) }))} accent={ACCENT} unit="صدهزار تومان" />
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "order",
      label: "سفارش‌گیری",
      hint: "میز را انتخاب کنید، آیتم‌ها را اضافه کنید و سفارش را به آشپزخانه بفرستید.",
      content: (
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <DemoPanel title="منو">
            <div className="grid gap-2 sm:grid-cols-2">
              {MENU.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  disabled={!item.available}
                  onClick={() => setCart((prev) => ({ ...prev, [item.id]: (prev[item.id] ?? 0) + 1 }))}
                  className="flex items-center justify-between rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-3 text-start transition-colors hover:bg-amber-500/10 disabled:opacity-40"
                >
                  <span>
                    <span className="block text-[12px] font-extrabold">{item.name}</span>
                    <span className="text-[10px] text-muted">{item.category} · {toPersianDigits(item.prepMinutes)} دقیقه</span>
                  </span>
                  <span className="text-[11px] font-bold persian-num">{formatNumber(item.price)}</span>
                </button>
              ))}
            </div>
          </DemoPanel>

          <DemoPanel title="سفارش جاری">
            <label className="block text-[12px] font-bold">
              میز
              <select
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                className="mt-2 h-10 w-full rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-3 text-[12px]"
              >
                {tables.map((table) => (
                  <option key={table.id} value={table.id}>
                    {table.name} — {toPersianDigits(table.seats)} نفره ({table.status})
                  </option>
                ))}
              </select>
            </label>

            <ul className="mt-4 space-y-2">
              {Object.entries(cart).filter(([, qty]) => qty > 0).map(([id, qty]) => {
                const item = MENU.find((m) => m.id === id)!;
                return (
                  <li key={id} className="flex items-center justify-between rounded-[var(--radius-sm)] bg-[var(--surface-sunken)] p-2.5 text-[12px]">
                    <span className="font-bold">{item.name}</span>
                    <span className="flex items-center gap-2">
                      <button type="button" aria-label={`کم کردن ${item.name}`} onClick={() => setCart((prev) => ({ ...prev, [id]: Math.max(0, qty - 1) }))} className="grid size-6 place-items-center rounded border border-[var(--border-subtle)]">
                        <Minus className="size-3" aria-hidden />
                      </button>
                      <span className="w-5 text-center persian-num font-bold">{toPersianDigits(qty)}</span>
                      <button type="button" aria-label={`افزودن ${item.name}`} onClick={() => setCart((prev) => ({ ...prev, [id]: qty + 1 }))} className="grid size-6 place-items-center rounded border border-[var(--border-subtle)]">
                        <Plus className="size-3" aria-hidden />
                      </button>
                    </span>
                  </li>
                );
              })}
              {cartTotal === 0 ? <li className="p-4 text-center text-[11px] text-muted">هنوز آیتمی انتخاب نشده است.</li> : null}
            </ul>

            <div className="mt-4 flex items-center justify-between text-[13px] font-extrabold">
              <span>جمع کل</span>
              <span className="persian-num">{formatToman(cartTotal)}</span>
            </div>
            <button
              type="button"
              onClick={submitOrder}
              disabled={cartTotal === 0}
              className="mt-3 h-11 w-full rounded-[var(--radius-sm)] text-[12px] font-extrabold text-white disabled:opacity-40"
              style={{ background: ACCENT }}
            >
              ارسال به آشپزخانه
            </button>
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "menu",
      label: "منو و آیتم‌ها",
      hint: "قیمت، دسته و موجودی آیتم‌های منو.",
      content: (
        <DemoPanel title="آیتم‌های منو">
          <DataTable
            rows={MENU}
            searchKeys={(row) => row.name}
            filters={(["پیش‌غذا", "غذای اصلی", "دسر", "نوشیدنی"] as MenuItem["category"][]).map((c) => ({ id: c, label: c, predicate: (row: MenuItem) => row.category === c }))}
            columns={[
              { key: "name", header: "آیتم", render: (row) => <span className="font-bold">{row.name}</span> },
              { key: "category", header: "دسته", render: (row) => <span className="text-muted">{row.category}</span> },
              { key: "price", header: "قیمت", render: (row) => <span className="persian-num">{formatToman(row.price)}</span> },
              { key: "prep", header: "زمان آماده‌سازی", render: (row) => <span className="persian-num">{toPersianDigits(row.prepMinutes)} دقیقه</span> },
              {
                key: "available",
                header: "وضعیت",
                render: (row) => (
                  <span className={cn("rounded-full px-2 py-1 text-[10px] font-bold", row.available ? "bg-emerald-500/15 text-emerald-600" : "bg-rose-500/15 text-rose-600")}>
                    {row.available ? "موجود" : "ناموجود"}
                  </span>
                ),
              },
            ]}
          />
        </DemoPanel>
      ),
    },
    {
      id: "tables",
      label: "میزها",
      hint: "برای تغییر وضعیت هر میز روی آن کلیک کنید.",
      content: (
        <DemoPanel title="نقشه سالن">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {tables.map((table) => (
              <button
                key={table.id}
                type="button"
                onClick={() =>
                  setTables((prev) =>
                    prev.map((t) =>
                      t.id === table.id
                        ? { ...t, status: t.status === "آزاد" ? "مشغول" : t.status === "مشغول" ? "رزرو" : "آزاد" }
                        : t,
                    ),
                  )
                }
                className="rounded-[var(--radius-lg)] border-2 p-5 text-center transition-colors"
                style={{
                  borderColor: table.status === "مشغول" ? ACCENT : table.status === "رزرو" ? "#8b5cf6" : "var(--border-subtle)",
                  background: table.status === "مشغول" ? `${ACCENT}1a` : "transparent",
                }}
              >
                <span className="block text-[13px] font-extrabold">{table.name}</span>
                <span className="block text-[10px] text-muted persian-num">{toPersianDigits(table.seats)} نفره</span>
                <span className="mt-2 block text-[10px] font-bold">{table.status}</span>
              </button>
            ))}
          </div>
        </DemoPanel>
      ),
    },
    {
      id: "kds",
      label: "آشپزخانه (KDS)",
      hint: "تایمر هر سفارش زنده است؛ وضعیت را جلو ببرید.",
      content: (
        <DemoPanel title="نمایشگر آشپزخانه">
          {tickets.length === 0 ? (
            <p className="p-8 text-center text-[12px] text-muted">
              سفارشی در آشپزخانه نیست. از ماژول «سفارش‌گیری» یک سفارش ثبت کنید.
            </p>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {tickets.map((ticket) => {
                const seconds = Math.floor((now - ticket.createdAt) / 1000);
                const late = seconds > 60;
                return (
                  <li key={ticket.id} className="rounded-[var(--radius-md)] border-2 p-4" style={{ borderColor: late ? "#ef4444" : ACCENT }}>
                    <div className="flex items-center justify-between">
                      <strong className="text-[12px]">{ticket.table}</strong>
                      <span className={cn("flex items-center gap-1 text-[11px] font-extrabold persian-num", late && "text-rose-500")}>
                        <Timer className="size-3.5" aria-hidden />
                        {toPersianDigits(Math.floor(seconds / 60))}:{toPersianDigits(String(seconds % 60).padStart(2, "0"))}
                      </span>
                    </div>
                    <ul className="mt-3 space-y-1 text-[11px]">
                      {ticket.items.map((item) => (
                        <li key={item.name} className="flex justify-between">
                          <span>{item.name}</span>
                          <span className="persian-num font-bold">×{toPersianDigits(item.qty)}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() =>
                        setTickets((prev) =>
                          prev.map((t) =>
                            t.id === ticket.id
                              ? { ...t, status: t.status === "در صف" ? "در حال آماده‌سازی" : "آماده" }
                              : t,
                          ),
                        )
                      }
                      disabled={ticket.status === "آماده"}
                      className="mt-3 h-9 w-full rounded-[var(--radius-sm)] text-[11px] font-extrabold text-white disabled:opacity-40"
                      style={{ background: ticket.status === "آماده" ? "#10b981" : ACCENT }}
                    >
                      {ticket.status === "آماده" ? "آماده سرو" : ticket.status === "در صف" ? "شروع آماده‌سازی" : "اعلام آماده"}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          <p className="mt-4 flex items-center gap-2 text-[11px] text-muted">
            <ChefHat className="size-3.5" aria-hidden />
            در نسخه کامل، KDS روی نمایشگر آشپزخانه با هشدار صوتی تأخیر نصب می‌شود.
          </p>
        </DemoPanel>
      ),
    },
    {
      id: "stock",
      label: "انبار",
      hint: "موجودی مواد اولیه با هشدار کمبود.",
      content: (
        <DemoPanel title="مواد اولیه">
          <ul className="space-y-2">
            {STOCK.map((item) => {
              const low = item.stock <= item.reorder;
              return (
                <li key={item.id} className="flex items-center justify-between rounded-[var(--radius-sm)] bg-[var(--surface-sunken)] p-3 text-[12px]">
                  <span className="font-bold">{item.name}</span>
                  <span className={cn("persian-num", low && "font-extrabold text-rose-500")}>
                    {toPersianDigits(item.stock)} {item.unit}
                    {low ? " — نیاز به خرید" : ""}
                  </span>
                </li>
              );
            })}
          </ul>
        </DemoPanel>
      ),
    },
    {
      id: "reports",
      label: "گزارش فروش",
      hint: "پرفروش‌ترین آیتم‌ها و روند فروش.",
      content: (
        <div className="grid gap-5 lg:grid-cols-2">
          <DemoPanel title="پرفروش‌ترین آیتم‌ها">
            <ul className="space-y-3">
              {MENU.slice(0, 5).map((item, index) => {
                const percent = [88, 72, 61, 48, 34][index]!;
                return (
                  <li key={item.id}>
                    <div className="flex justify-between text-[11px] font-bold">
                      <span>{item.name}</span>
                      <span className="persian-num">{toPersianDigits(percent)} پرس</span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-[var(--surface-sunken)]">
                      <span className="block h-full rounded-full" style={{ width: `${percent}%`, background: ACCENT }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </DemoPanel>
          <DemoPanel title="روند فروش امروز">
            <BarChart data={SALES_TREND.map((s) => ({ label: s.label, value: Math.round(s.value / 100_000) }))} accent={ACCENT} unit="صدهزار تومان" />
          </DemoPanel>
        </div>
      ),
    },
  ];

  return <DemoShell productSlug="restaurant" productName="مدیریت رستوران" emoji="🍽️" accent={ACCENT} modules={modules} onReset={reset} />;
}

"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Ticket } from "lucide-react";
import {
  ORDER_STAGES,
  SALES_SERIES,
  STORE_CUSTOMERS,
  STORE_ORDERS,
  STORE_PRODUCTS,
  type OrderStage,
  type StoreOrder,
  type StoreProduct,
} from "@/lib/demos/online-store.data";
import { DemoShell, type DemoModule } from "@/components/demo/shared/demo-shell";
import { DataTable, DemoPanel, KanbanBoard, KpiGrid, LineChart, TransferHint } from "@/components/demo/shared/widgets";
import { cn, formatNumber, formatToman, toPersianDigits } from "@/lib/utils";

const ACCENT = "#f43f5e";

export function OnlineStoreDemo() {
  const [orders, setOrders] = useState<StoreOrder[]>(STORE_ORDERS);
  const [products, setProducts] = useState<StoreProduct[]>(STORE_PRODUCTS);
  const [codes, setCodes] = useState<{ code: string; percent: number; limit: number }[]>([
    { code: "PAEIZ1405", percent: 15, limit: 100 },
  ]);

  function reset() {
    setOrders(STORE_ORDERS);
    setProducts(STORE_PRODUCTS);
    setCodes([{ code: "PAEIZ1405", percent: 15, limit: 100 }]);
  }

  const cards = useMemo(() => {
    const map: Record<string, { id: string; title: string; meta: string; tag?: string }[]> = {};
    for (const stage of ORDER_STAGES) {
      map[stage.id] = orders
        .filter((order) => order.stage === stage.id)
        .map((order) => ({
          id: order.id,
          title: order.customer,
          meta: `${order.id} · ${formatToman(order.total)} · ${order.city}`,
          tag: `${toPersianDigits(order.items)} قلم`,
        }));
    }
    return map;
  }, [orders]);

  const revenue = orders.reduce((sum, order) => sum + order.total, 0);

  function addProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    if (!name) return;
    setProducts((prev) => [
      {
        id: `p-${prev.length + 1}`,
        name,
        price: Number(form.get("price") ?? 0),
        stock: Number(form.get("stock") ?? 0),
        category: String(form.get("category") ?? "عمومی"),
        published: true,
      },
      ...prev,
    ]);
    event.currentTarget.reset();
  }

  const modules: DemoModule[] = [
    {
      id: "dashboard",
      label: "داشبورد فروش",
      hint: "درآمد، سفارش‌ها و نرخ تبدیل.",
      content: (
        <div className="space-y-5">
          <KpiGrid
            accent={ACCENT}
            items={[
              { label: "درآمد ماه", value: formatNumber(Math.round(revenue / 1_000_000)), hint: "میلیون تومان" },
              { label: "سفارش‌ها", value: toPersianDigits(orders.length) },
              { label: "نرخ تبدیل", value: "۳.۴٪" },
              { label: "سبد میانگین", value: "۳.۹م", hint: "تومان" },
            ]}
          />
          <DemoPanel title="روند فروش ماه (میلیون تومان)">
            <LineChart data={SALES_SERIES} accent={ACCENT} />
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "products",
      label: "محصولات",
      hint: "محصول جدید بسازید و موجودی را ببینید.",
      content: (
        <div className="space-y-5">
          <DemoPanel title="افزودن محصول">
            <form onSubmit={addProduct} className="grid gap-3 sm:grid-cols-5">
              <input name="name" required placeholder="نام محصول" aria-label="نام محصول" className="h-10 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-3 text-2xs sm:col-span-2" />
              <input name="price" type="number" placeholder="قیمت (تومان)" aria-label="قیمت" className="h-10 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-3 text-2xs" />
              <input name="stock" type="number" placeholder="موجودی" aria-label="موجودی" className="h-10 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-3 text-2xs" />
              <button type="submit" className="h-10 rounded-[var(--radius-sm)] text-2xs font-extrabold text-white" style={{ background: ACCENT }}>
                انتشار محصول
              </button>
            </form>
          </DemoPanel>
          <DemoPanel title="کاتالوگ">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <article key={product.id} className="rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-4">
                  <div className="h-24 rounded-[var(--radius-sm)]" style={{ background: `linear-gradient(140deg, ${ACCENT}33, ${ACCENT}0d)` }} aria-hidden />
                  <h3 className="mt-3 text-2xs font-extrabold">{product.name}</h3>
                  <p className="text-4xs text-muted">{product.category}</p>
                  <div className="mt-2 flex items-center justify-between text-3xs">
                    <span className="persian-num font-bold">{formatToman(product.price)}</span>
                    <span className={cn("persian-num", product.stock < 10 && "text-rose-500")}>موجودی {toPersianDigits(product.stock)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, published: !p.published } : p)))}
                    className="mt-3 h-8 w-full rounded-[var(--radius-sm)] border border-[var(--border-subtle)] text-4xs font-bold"
                  >
                    {product.published ? "منتشر شده — پنهان کن" : "پیش‌نویس — منتشر کن"}
                  </button>
                </article>
              ))}
            </div>
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "orders",
      label: "سفارش‌ها",
      hint: "سفارش‌ها را در خط لوله پردازش جابه‌جا کنید.",
      content: (
        <DemoPanel title="خط لوله پردازش سفارش">
          <KanbanBoard
            columns={ORDER_STAGES.map((s) => ({ id: s.id, title: s.title }))}
            cards={cards}
            accent={ACCENT}
            onMove={(id, _from, to) => setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, stage: to as OrderStage } : o)))}
          />
          <TransferHint />
        </DemoPanel>
      ),
    },
    {
      id: "customers",
      label: "مشتریان",
      hint: "ارزش طول عمر و سطح باشگاه مشتریان.",
      content: (
        <DemoPanel title="باشگاه مشتریان">
          <DataTable
            rows={STORE_CUSTOMERS}
            searchKeys={(row) => row.name}
            columns={[
              { key: "name", header: "مشتری", render: (row) => <span className="font-bold">{row.name}</span> },
              { key: "orders", header: "سفارش‌ها", render: (row) => <span className="persian-num">{toPersianDigits(row.orders)}</span> },
              { key: "ltv", header: "ارزش طول عمر", render: (row) => <span className="persian-num">{formatToman(row.ltv)}</span> },
              {
                key: "tier",
                header: "سطح",
                render: (row) => (
                  <span className="rounded-full px-2 py-1 text-4xs font-bold" style={{ background: `${ACCENT}1f`, color: ACCENT }}>
                    {row.tier}
                  </span>
                ),
              },
            ]}
          />
        </DemoPanel>
      ),
    },
    {
      id: "discounts",
      label: "تخفیف‌ها",
      hint: "کد تخفیف بسازید و محدودیت تعیین کنید.",
      content: (
        <DemoPanel title="کدهای تخفیف">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);
              const code = String(form.get("code") ?? "").trim().toUpperCase();
              if (!code) return;
              setCodes((prev) => [{ code, percent: Number(form.get("percent") ?? 10), limit: Number(form.get("limit") ?? 50) }, ...prev]);
              event.currentTarget.reset();
            }}
            className="grid gap-3 sm:grid-cols-4"
          >
            <input name="code" placeholder="کد تخفیف" dir="ltr" aria-label="کد تخفیف" className="h-10 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-3 text-2xs" />
            <input name="percent" type="number" min={1} max={90} placeholder="درصد" aria-label="درصد تخفیف" className="h-10 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-3 text-2xs" />
            <input name="limit" type="number" placeholder="سقف استفاده" aria-label="سقف استفاده" className="h-10 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-3 text-2xs" />
            <button type="submit" className="h-10 rounded-[var(--radius-sm)] text-2xs font-extrabold text-white" style={{ background: ACCENT }}>
              ساخت کد
            </button>
          </form>
          <ul className="mt-4 space-y-2">
            {codes.map((code) => (
              <li key={code.code} className="flex items-center justify-between rounded-[var(--radius-sm)] bg-[var(--surface-sunken)] p-3 text-2xs">
                <span className="flex items-center gap-2 font-extrabold">
                  <Ticket className="size-4" style={{ color: ACCENT }} aria-hidden />
                  <span dir="ltr">{code.code}</span>
                </span>
                <span className="persian-num text-muted">
                  {toPersianDigits(code.percent)}٪ تخفیف · سقف {toPersianDigits(code.limit)} بار
                </span>
              </li>
            ))}
          </ul>
        </DemoPanel>
      ),
    },
    {
      id: "analytics",
      label: "تحلیل فروش",
      hint: "روند فروش و سهم دسته‌بندی‌ها.",
      content: (
        <div className="grid gap-5 lg:grid-cols-2">
          <DemoPanel title="روند فروش">
            <LineChart data={SALES_SERIES} accent={ACCENT} />
          </DemoPanel>
          <DemoPanel title="سهم دسته‌بندی‌ها">
            <ul className="space-y-3">
              {["پالتو", "پیراهن", "شلوار", "بافت", "اکسسوری"].map((category, index) => {
                const percent = [32, 24, 18, 15, 11][index]!;
                return (
                  <li key={category}>
                    <div className="flex justify-between text-3xs font-bold">
                      <span>{category}</span>
                      <span className="persian-num">{toPersianDigits(percent)}٪</span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-[var(--surface-sunken)]">
                      <span className="block h-full rounded-full" style={{ width: `${percent}%`, background: ACCENT }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </DemoPanel>
        </div>
      ),
    },
  ];

  return <DemoShell productSlug="online-store" productName="مدیریت فروشگاه" emoji="🛒" accent={ACCENT} modules={modules} onReset={reset} />;
}

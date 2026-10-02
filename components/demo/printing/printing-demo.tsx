"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Gauge, Layers, Timer } from "lucide-react";
import {
  COST_DEFAULTS,
  PRINT_INKS,
  PRINT_MACHINES,
  PRINT_ORDERS,
  PRINT_ROLLS,
  PRINT_STAGES,
  PRODUCTION_TREND,
  QC_CHECKLIST,
  WASTE_REASONS,
  WASTE_TREND,
  type PrintOrder,
  type PrintStage,
} from "@/lib/demos/printing-management.data";
import { DemoShell, type DemoModule } from "@/components/demo/shared/demo-shell";
import {
  BarChart,
  Checklist,
  DataTable,
  DemoPanel,
  KanbanBoard,
  KpiGrid,
  LineChart,
  RangeField,
  TransferHint,
} from "@/components/demo/shared/widgets";
import { formatNumber, formatToman, toPersianDigits } from "@/lib/utils";

const ACCENT = "#4b5563";

export function PrintingDemo() {
  const [orders, setOrders] = useState<PrintOrder[]>(PRINT_ORDERS);
  const [qc, setQc] = useState<Record<string, "pass" | "fail" | undefined>>({});
  const [waste, setWaste] = useState<{ reason: string; meters: number }[]>([
    { reason: "ست‌آپ اولیه", meters: 320 },
    { reason: "اختلاف رنگ", meters: 140 },
  ]);
  const [wasteReason, setWasteReason] = useState(WASTE_REASONS[0]!);
  const [wasteMeters, setWasteMeters] = useState(120);
  const [cost, setCost] = useState(COST_DEFAULTS);
  const [zoom, setZoom] = useState(1);

  function reset() {
    setOrders(PRINT_ORDERS);
    setQc({});
    setWaste([]);
    setCost(COST_DEFAULTS);
    setZoom(1);
  }

  const cardsByStage = useMemo(() => {
    const map: Record<string, { id: string; title: string; meta: string; tag?: string }[]> = {};
    for (const stage of PRINT_STAGES) {
      map[stage.id] = orders
        .filter((order) => order.stage === stage.id)
        .map((order) => ({
          id: order.id,
          title: `${order.customer} — ${order.product}`,
          meta: `${toPersianDigits(order.id)} · ${formatNumber(order.meters)} متر · ${toPersianDigits(order.colors)} رنگ`,
          tag: order.priority === "فوری" ? "فوری" : undefined,
        }));
    }
    return map;
  }, [orders]);

  const totalMeters = orders.reduce((sum, order) => sum + order.meters, 0);
  const inProduction = orders.filter((o) => o.stage === "printing").length;
  const totalWaste = waste.reduce((sum, item) => sum + item.meters, 0);
  const qcPassed = Object.values(qc).filter((v) => v === "pass").length;

  const costBreakdown = useMemo(() => {
    const filmKg = (cost.meters * cost.gramsPerMeter) / 1000;
    const film = filmKg * cost.filmPricePerKg;
    const ink = (cost.meters / 1000) * cost.colors * 0.9 * cost.inkPricePerKg;
    const cylinder = cost.cylinderCost * (cost.colors / 8);
    const machine = (cost.meters / cost.speedPerHour) * cost.machineHourCost;
    const subtotal = film + ink + cylinder + machine;
    const wasteCost = subtotal * (cost.wastePercent / 100);
    const overhead = (subtotal + wasteCost) * (cost.overheadPercent / 100);
    const total = subtotal + wasteCost + overhead;
    return {
      rows: [
        { label: "فیلم و مواد پایه", value: film },
        { label: "مرکب و حلال", value: ink },
        { label: "سیلندر و کلیشه", value: cylinder },
        { label: "ساعت ماشین", value: machine },
        { label: `ضایعات (${toPersianDigits(cost.wastePercent)}٪)`, value: wasteCost },
        { label: `سربار (${toPersianDigits(cost.overheadPercent)}٪)`, value: overhead },
      ],
      total,
      perMeter: total / cost.meters,
    };
  }, [cost]);

  function moveOrder(id: string, _from: string, to: string) {
    setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, stage: to as PrintStage } : order)));
  }

  const modules: DemoModule[] = [
    {
      id: "dashboard",
      label: "داشبورد تولید",
      hint: "نمای لحظه‌ای خطوط چاپ، بهره‌وری و ضایعات.",
      content: (
        <div className="space-y-5">
          <KpiGrid
            accent={ACCENT}
            items={[
              { label: "متراژ در جریان", value: formatNumber(totalMeters), hint: "متر" },
              { label: "سفارش در حال چاپ", value: toPersianDigits(inProduction), hint: "سفارش" },
              { label: "ضایعات ثبت‌شده", value: formatNumber(totalWaste), hint: "متر" },
              { label: "بهره‌وری ماشین", value: "۸۴٪", hint: "میانگین OEE" },
            ]}
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <DemoPanel title="تولید هفته جاری (متر)">
              <BarChart data={PRODUCTION_TREND} accent={ACCENT} unit="متر" />
            </DemoPanel>
            <DemoPanel title="روند ضایعات (درصد)">
              <LineChart data={WASTE_TREND} accent="#ef4444" />
            </DemoPanel>
          </div>
          <DemoPanel title="وضعیت ماشین‌ها">
            <ul className="grid gap-3 sm:grid-cols-2">
              {PRINT_MACHINES.map((machine, index) => (
                <li key={machine.id} className="flex items-center gap-3 rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-4">
                  <Gauge className="size-5" style={{ color: ACCENT }} aria-hidden />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-2xs font-extrabold">{machine.name}</p>
                    <p className="text-4xs text-muted persian-num">
                      ظرفیت {formatNumber(machine.capacityPerHour)} متر بر ساعت
                    </p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--surface-raised)]">
                      <span
                        className="block h-full rounded-full"
                        style={{ width: `${[86, 72, 64, 91][index]}%`, background: ACCENT }}
                      />
                    </div>
                  </div>
                  <span className="text-3xs font-extrabold persian-num">{toPersianDigits([86, 72, 64, 91][index]!)}٪</span>
                </li>
              ))}
            </ul>
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "orders",
      label: "سفارش‌ها",
      hint: "سفارش‌ها را بین مراحل تولید بکشید یا در جدول فیلتر کنید.",
      content: (
        <div className="space-y-5">
          <DemoPanel title="تابلوی مراحل تولید">
            <KanbanBoard columns={PRINT_STAGES.map((s) => ({ id: s.id, title: s.title }))} cards={cardsByStage} onMove={moveOrder} accent={ACCENT} />
            <TransferHint />
          </DemoPanel>
          <DemoPanel title="لیست سفارش‌ها">
            <DataTable
              rows={orders}
              searchKeys={(row) => `${row.id} ${row.customer} ${row.product}`}
              filters={[
                { id: "urgent", label: "فوری", predicate: (row) => row.priority === "فوری" },
                { id: "printing", label: "در حال چاپ", predicate: (row) => row.stage === "printing" },
                { id: "delivered", label: "تحویل‌شده", predicate: (row) => row.stage === "delivered" },
              ]}
              columns={[
                { key: "id", header: "کد", render: (row) => <span className="font-bold persian-num">{toPersianDigits(row.id)}</span> },
                { key: "customer", header: "مشتری", render: (row) => row.customer },
                { key: "product", header: "محصول", render: (row) => <span className="text-muted">{row.product}</span> },
                { key: "meters", header: "متراژ", render: (row) => <span className="persian-num">{formatNumber(row.meters)}</span> },
                { key: "due", header: "تحویل", render: (row) => <span className="persian-num">{row.dueDate}</span> },
                {
                  key: "stage",
                  header: "مرحله",
                  render: (row) => (
                    <span className="rounded-full px-2 py-1 text-4xs font-bold" style={{ background: `${ACCENT}1f`, color: ACCENT }}>
                      {PRINT_STAGES.find((s) => s.id === row.stage)?.title}
                    </span>
                  ),
                },
              ]}
            />
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "planning",
      label: "برنامه‌ریزی ماشین‌ها",
      hint: "تایم‌لاین گانت تخصیص سفارش‌ها به ماشین‌ها؛ بزرگ‌نمایی را تغییر دهید.",
      content: (
        <DemoPanel
          title="تایم‌لاین هفتگی"
          action={
            <div className="flex items-center gap-2">
              <span className="text-3xs text-muted">بزرگ‌نمایی</span>
              <input
                type="range"
                min={1}
                max={2.5}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                aria-label="بزرگ‌نمایی تایم‌لاین"
                style={{ accentColor: ACCENT }}
              />
            </div>
          }
        >
          <div className="scrollbar-thin overflow-x-auto">
            <div style={{ width: `${zoom * 100}%`, minWidth: "640px" }}>
              <div className="mb-2 grid grid-cols-6 text-4xs text-muted">
                {["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه"].map((day) => (
                  <span key={day} className="border-s border-[var(--border-subtle)] ps-2">{day}</span>
                ))}
              </div>
              <ul className="space-y-2">
                {PRINT_MACHINES.map((machine, machineIndex) => (
                  <li key={machine.id} className="rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-2">
                    <p className="mb-1.5 text-3xs font-extrabold">{machine.name}</p>
                    <div className="relative h-9 rounded bg-[var(--surface-raised)]">
                      {orders
                        .filter((order) => order.machine === machine.name && order.stage !== "delivered")
                        .slice(0, 3)
                        .map((order, index) => (
                          <span
                            key={order.id}
                            title={`${order.id} — ${order.customer}`}
                            className="absolute top-1 flex h-7 items-center rounded px-2 text-5xs font-bold text-white"
                            style={{
                              insetInlineStart: `${(index * 30 + machineIndex * 4) % 70}%`,
                              width: `${18 + (order.colors * 2)}%`,
                              background: order.priority === "فوری" ? "#ef4444" : ACCENT,
                            }}
                          >
                            <span className="truncate persian-num">{toPersianDigits(order.id)}</span>
                          </span>
                        ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DemoPanel>
      ),
    },
    {
      id: "quality",
      label: "کنترل کیفی",
      hint: "چک‌لیست پذیرش را تکمیل کنید و ضایعات شیفت را ثبت نمایید.",
      content: (
        <div className="grid gap-5 lg:grid-cols-2">
          <DemoPanel title={`چک‌لیست کنترل کیفی (${toPersianDigits(qcPassed)}/${toPersianDigits(QC_CHECKLIST.length)} تأیید)`}>
            <Checklist items={QC_CHECKLIST} state={qc} onToggle={(id, value) => setQc((prev) => ({ ...prev, [id]: value }))} accent={ACCENT} />
            <p aria-live="polite" className="mt-4 rounded-[var(--radius-sm)] bg-[var(--surface-sunken)] p-3 text-3xs font-bold">
              {qcPassed === QC_CHECKLIST.length
                ? "✅ کار آماده تحویل به انبار است."
                : Object.values(qc).includes("fail")
                  ? "⚠️ حداقل یک مورد رد شده؛ نیاز به بازبینی سرشیفت دارد."
                  : "در حال بازرسی…"}
            </p>
          </DemoPanel>
          <DemoPanel title="ثبت ضایعات شیفت">
            <div className="flex flex-wrap gap-2">
              <select
                value={wasteReason}
                onChange={(e) => setWasteReason(e.target.value)}
                aria-label="علت ضایعات"
                className="h-10 flex-1 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-3 text-2xs"
              >
                {WASTE_REASONS.map((reason) => (
                  <option key={reason}>{reason}</option>
                ))}
              </select>
              <input
                type="number"
                min={0}
                value={wasteMeters}
                onChange={(e) => setWasteMeters(Number(e.target.value))}
                aria-label="متراژ ضایعات"
                className="h-10 w-28 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-3 text-2xs"
              />
              <button
                type="button"
                onClick={() => setWaste((prev) => [...prev, { reason: wasteReason, meters: wasteMeters }])}
                className="h-10 rounded-[var(--radius-sm)] px-4 text-2xs font-extrabold text-white"
                style={{ background: ACCENT }}
              >
                ثبت
              </button>
            </div>
            <ul className="mt-4 space-y-2">
              {waste.map((item, index) => (
                <li key={`${item.reason}-${index}`} className="flex items-center justify-between rounded-[var(--radius-sm)] bg-[var(--surface-sunken)] p-3 text-2xs">
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="size-3.5 text-amber-500" aria-hidden />
                    {item.reason}
                  </span>
                  <span className="persian-num font-bold">{formatNumber(item.meters)} متر</span>
                </li>
              ))}
              {waste.length === 0 ? <li className="p-3 text-center text-3xs text-muted">ضایعاتی ثبت نشده است.</li> : null}
            </ul>
            <p className="mt-3 text-2xs font-extrabold persian-num">جمع ضایعات: {formatNumber(totalWaste)} متر</p>
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "inventory",
      label: "انبار مواد اولیه",
      hint: "موجودی رول‌ها و رنگ‌ها با هشدار نقطه سفارش.",
      content: (
        <div className="grid gap-5 lg:grid-cols-2">
          <DemoPanel title="رول‌ها و فیلم‌ها">
            <StockList items={PRINT_ROLLS} />
          </DemoPanel>
          <DemoPanel title="رنگ‌ها و حلال‌ها">
            <StockList items={PRINT_INKS} />
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "cost",
      label: "بهای تمام‌شده",
      hint: "پارامترها را تغییر دهید تا قیمت تمام‌شده لحظه‌ای محاسبه شود.",
      content: (
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <DemoPanel title="پارامترهای سفارش">
            <div className="space-y-5">
              <RangeField label="متراژ سفارش" value={cost.meters} min={1_000} max={60_000} step={500} suffix="متر" accent={ACCENT} onChange={(v) => setCost((c) => ({ ...c, meters: v }))} />
              <RangeField label="تعداد رنگ" value={cost.colors} min={1} max={8} suffix="رنگ" accent={ACCENT} onChange={(v) => setCost((c) => ({ ...c, colors: v }))} />
              <RangeField label="گرماژ فیلم" value={cost.gramsPerMeter} min={10} max={60} suffix="گرم بر متر" accent={ACCENT} onChange={(v) => setCost((c) => ({ ...c, gramsPerMeter: v }))} />
              <RangeField label="درصد ضایعات" value={cost.wastePercent} min={0} max={20} suffix="٪" accent={ACCENT} onChange={(v) => setCost((c) => ({ ...c, wastePercent: v }))} />
              <RangeField label="سربار کارخانه" value={cost.overheadPercent} min={0} max={30} suffix="٪" accent={ACCENT} onChange={(v) => setCost((c) => ({ ...c, overheadPercent: v }))} />
            </div>
          </DemoPanel>
          <DemoPanel title="محاسبه بهای تمام‌شده">
            <ul className="space-y-2">
              {costBreakdown.rows.map((row) => (
                <li key={row.label} className="flex items-center justify-between rounded-[var(--radius-sm)] bg-[var(--surface-sunken)] p-3 text-2xs">
                  <span>{row.label}</span>
                  <span className="persian-num font-bold">{formatToman(Math.round(row.value))}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-[var(--radius-md)] p-4 text-white" style={{ background: ACCENT }}>
              <p className="text-3xs opacity-80">بهای تمام‌شده کل</p>
              <strong className="block text-2xl persian-num">{formatToman(Math.round(costBreakdown.total))}</strong>
              <p className="mt-1 text-3xs persian-num opacity-80">
                هر متر: {formatToman(Math.round(costBreakdown.perMeter))}
              </p>
            </div>
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "reports",
      label: "گزارش‌ها",
      hint: "گزارش‌های تولید، ضایعات و سودآوری.",
      content: (
        <div className="space-y-5">
          <KpiGrid
            accent={ACCENT}
            items={[
              { label: "تولید ماه", value: "۱٬۲۴۰٬۰۰۰", hint: "متر" },
              { label: "میانگین ضایعات", value: "۴.۳٪", hint: "هدف: زیر ۵٪" },
              { label: "تحویل به‌موقع", value: "۹۲٪", hint: "۳۰ روز اخیر" },
              { label: "حاشیه سود", value: "۲۷٪", hint: "میانگین سفارش‌ها" },
            ]}
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <DemoPanel title="تولید به تفکیک ماشین">
              <BarChart
                accent={ACCENT}
                data={PRINT_MACHINES.map((machine, index) => ({ label: machine.name.split(" — ")[1] ?? machine.name, value: [420, 385, 310, 260][index]! }))}
                unit="هزار متر"
              />
            </DemoPanel>
            <DemoPanel title="سهم علت‌های ضایعات">
              <ul className="space-y-3">
                {WASTE_REASONS.map((reason, index) => {
                  const percent = [38, 24, 18, 12, 8][index]!;
                  return (
                    <li key={reason}>
                      <div className="flex justify-between text-3xs font-bold">
                        <span>{reason}</span>
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
          <DemoPanel title="خلاصه عملکرد">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: Layers, title: "سفارش‌های فعال", value: toPersianDigits(orders.filter((o) => o.stage !== "delivered").length) },
                { icon: Timer, title: "میانگین زمان تولید", value: "۳.۲ روز" },
                { icon: Gauge, title: "بهره‌وری کل", value: "۸۴٪" },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-3 rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-4">
                  <item.icon className="size-5" style={{ color: ACCENT }} aria-hidden />
                  <div>
                    <p className="text-4xs text-muted">{item.title}</p>
                    <strong className="text-base persian-num">{item.value}</strong>
                  </div>
                </div>
              ))}
            </div>
          </DemoPanel>
        </div>
      ),
    },
  ];

  return (
    <DemoShell
      productSlug="printing-management"
      productName="مدیریت چاپ روتوگراور"
      emoji="🖨️"
      accent={ACCENT}
      modules={modules}
      onReset={reset}
    />
  );
}

function StockList({ items }: { items: { id: string; name: string; stock: number; unit: string; reorder: number }[] }) {
  return (
    <ul className="scrollbar-thin max-h-96 space-y-2 overflow-y-auto pe-1">
      {items.map((item) => {
        const low = item.stock <= item.reorder;
        const ratio = Math.min(100, (item.stock / (item.reorder * 3)) * 100);
        return (
          <li key={item.id} className="rounded-[var(--radius-sm)] bg-[var(--surface-sunken)] p-3">
            <div className="flex items-center justify-between text-2xs font-bold">
              <span>{item.name}</span>
              <span className={low ? "text-rose-500 persian-num" : "persian-num"}>
                {formatNumber(item.stock)} {item.unit}
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--surface-raised)]">
              <span className="block h-full rounded-full" style={{ width: `${ratio}%`, background: low ? "#ef4444" : ACCENT }} />
            </div>
            {low ? <p className="mt-1 text-4xs font-bold text-rose-500">زیر نقطه سفارش — نیاز به خرید</p> : null}
          </li>
        );
      })}
    </ul>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { Bell, DoorOpen, Wrench } from "lucide-react";
import { CONTRACTORS, TICKETS, UNITS, VISITORS, type RepairTicket, type Unit } from "@/lib/demos/smart-building.data";
import { DemoShell, type DemoModule } from "@/components/demo/shared/demo-shell";
import { DemoPanel, KpiGrid } from "@/components/demo/shared/widgets";
import { cn, formatNumber, formatToman, toPersianDigits } from "@/lib/utils";

const ACCENT = "#64748b";

export function SmartBuildingDemo() {
  const [units, setUnits] = useState<Unit[]>(UNITS);
  const [selected, setSelected] = useState<string>(UNITS[0]!.id);
  const [tickets, setTickets] = useState<RepairTicket[]>(TICKETS);
  const [announcements, setAnnouncements] = useState<{ text: string; at: string }[]>([
    { text: "قطعی آب گرم روز پنجشنبه از ساعت ۹ تا ۱۲", at: "۱۴۰۵/۰۷/۰۳" },
  ]);

  function reset() {
    setUnits(UNITS);
    setTickets(TICKETS);
    setAnnouncements([]);
  }

  const unit = units.find((u) => u.id === selected)!;
  const unpaid = units.filter((u) => !u.paid);
  const totalCharge = units.reduce((sum, u) => sum + u.charge, 0);

  function addTicket(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    if (!title) return;
    setTickets((prev) => [
      { id: `t-${300 + prev.length + 2}`, title, unit: String(form.get("unit") ?? "مشاعات"), status: "ثبت‌شده", createdAt: "۱۴۰۵/۰۷/۱۰" },
      ...prev,
    ]);
    event.currentTarget.reset();
  }

  const modules: DemoModule[] = [
    {
      id: "dashboard",
      label: "داشبورد",
      hint: "وضعیت مالی، درخواست‌ها و اعلان‌های ساختمان.",
      content: (
        <div className="space-y-5">
          <KpiGrid
            accent={ACCENT}
            items={[
              { label: "واحدها", value: toPersianDigits(units.length) },
              { label: "شارژ ماه", value: formatNumber(Math.round(totalCharge / 1_000_000)), hint: "میلیون تومان" },
              { label: "واحد بدهکار", value: toPersianDigits(unpaid.length) },
              { label: "درخواست باز", value: toPersianDigits(tickets.filter((t) => t.status !== "بسته‌شده").length) },
            ]}
          />
          <DemoPanel title="نرخ وصول شارژ">
            <div className="h-3 overflow-hidden rounded-full bg-[var(--surface-sunken)]">
              <span
                className="block h-full rounded-full"
                style={{ width: `${((units.length - unpaid.length) / units.length) * 100}%`, background: ACCENT }}
              />
            </div>
            <p className="mt-2 text-2xs font-bold persian-num">
              {toPersianDigits(Math.round(((units.length - unpaid.length) / units.length) * 100))}٪ از واحدها شارژ خود را پرداخت کرده‌اند.
            </p>
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "units",
      label: "واحدها",
      hint: "روی هر واحد کلیک کنید تا مالک و وضعیت شارژ را ببینید.",
      content: (
        <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <DemoPanel title="نمای طبقات">
            <div className="space-y-2">
              {[6, 5, 4, 3, 2, 1].map((floor) => (
                <div key={floor} className="flex items-center gap-2">
                  <span className="w-16 text-3xs font-bold text-muted persian-num">طبقه {toPersianDigits(floor)}</span>
                  <div className="grid flex-1 grid-cols-4 gap-2">
                    {units
                      .filter((u) => u.floor === floor)
                      .map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelected(item.id)}
                          aria-pressed={selected === item.id}
                          className={cn(
                            "rounded-[var(--radius-sm)] border p-3 text-3xs font-bold transition-colors",
                            selected === item.id ? "text-white" : "bg-[var(--surface-sunken)]",
                          )}
                          style={{
                            background: selected === item.id ? ACCENT : undefined,
                            borderColor: item.paid ? "var(--border-subtle)" : "#ef4444",
                          }}
                        >
                          <span className="block persian-num">واحد {toPersianDigits(item.number)}</span>
                          <span className="block text-5xs opacity-75">{item.paid ? "تسویه" : "بدهکار"}</span>
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </DemoPanel>
          <DemoPanel title={`واحد ${toPersianDigits(unit.number)}`}>
            <dl className="space-y-2 text-2xs">
              {[
                ["مالک", unit.owner],
                ["متراژ", `${toPersianDigits(unit.area)} متر`],
                ["ساکنان", `${toPersianDigits(unit.residents)} نفر`],
                ["شارژ ماه", formatToman(unit.charge)],
                ["وضعیت", unit.paid ? "تسویه شده" : "بدهکار"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-[var(--border-subtle)] pb-2">
                  <dt className="text-muted">{label}</dt>
                  <dd className="font-bold persian-num">{value}</dd>
                </div>
              ))}
            </dl>
            {!unit.paid ? (
              <button
                type="button"
                onClick={() => setUnits((prev) => prev.map((u) => (u.id === unit.id ? { ...u, paid: true } : u)))}
                className="mt-4 h-10 w-full rounded-[var(--radius-sm)] text-2xs font-extrabold text-white"
                style={{ background: ACCENT }}
              >
                ثبت پرداخت شارژ
              </button>
            ) : null}
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "charges",
      label: "شارژ و پرداخت‌ها",
      hint: "لیست بدهکاران و صدور قبض.",
      content: (
        <DemoPanel title="وضعیت پرداخت واحدها">
          <ul className="grid gap-2 sm:grid-cols-2">
            {units.map((item) => (
              <li key={item.id} className="flex items-center justify-between rounded-[var(--radius-sm)] bg-[var(--surface-sunken)] p-3 text-2xs">
                <span className="persian-num font-bold">واحد {toPersianDigits(item.number)} — {item.owner}</span>
                <span className={cn("persian-num", item.paid ? "text-emerald-600" : "text-rose-500 font-extrabold")}>
                  {item.paid ? "پرداخت شده" : formatToman(item.charge)}
                </span>
              </li>
            ))}
          </ul>
        </DemoPanel>
      ),
    },
    {
      id: "repairs",
      label: "درخواست‌های تعمیر",
      hint: "درخواست ثبت کنید، پیمانکار تخصیص دهید و ببندید.",
      content: (
        <div className="space-y-5">
          <DemoPanel title="ثبت درخواست جدید">
            <form onSubmit={addTicket} className="grid gap-3 sm:grid-cols-4">
              <input name="title" required placeholder="شرح مشکل" aria-label="شرح مشکل" className="h-10 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-3 text-2xs sm:col-span-2" />
              <input name="unit" placeholder="واحد / مشاعات" aria-label="واحد" className="h-10 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-3 text-2xs" />
              <button type="submit" className="h-10 rounded-[var(--radius-sm)] text-2xs font-extrabold text-white" style={{ background: ACCENT }}>
                ثبت درخواست
              </button>
            </form>
          </DemoPanel>
          <DemoPanel title="گردش‌کار تعمیرات">
            <ul className="space-y-2">
              {tickets.map((ticket) => (
                <li key={ticket.id} className="rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="flex items-center gap-2 text-2xs font-extrabold">
                        <Wrench className="size-3.5" style={{ color: ACCENT }} aria-hidden />
                        {ticket.title}
                      </p>
                      <p className="text-4xs text-muted persian-num">
                        {ticket.id} · واحد {ticket.unit} · {ticket.createdAt}
                        {ticket.assignee ? ` · ${ticket.assignee}` : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {ticket.status === "ثبت‌شده" ? (
                        <select
                          defaultValue=""
                          aria-label={`تخصیص پیمانکار به ${ticket.title}`}
                          onChange={(event) =>
                            setTickets((prev) =>
                              prev.map((t) => (t.id === ticket.id ? { ...t, assignee: event.target.value, status: "در حال انجام" } : t)),
                            )
                          }
                          className="h-9 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-2 text-3xs"
                        >
                          <option value="" disabled>
                            تخصیص پیمانکار
                          </option>
                          {CONTRACTORS.map((contractor) => (
                            <option key={contractor}>{contractor}</option>
                          ))}
                        </select>
                      ) : null}
                      {ticket.status === "در حال انجام" ? (
                        <button
                          type="button"
                          onClick={() => setTickets((prev) => prev.map((t) => (t.id === ticket.id ? { ...t, status: "بسته‌شده" } : t)))}
                          className="h-9 rounded-[var(--radius-sm)] px-3 text-3xs font-extrabold text-white"
                          style={{ background: ACCENT }}
                        >
                          بستن درخواست
                        </button>
                      ) : null}
                      <span className="rounded-full bg-[var(--surface-raised)] px-3 py-1 text-4xs font-bold">{ticket.status}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "announcements",
      label: "اعلان‌ها و پیام‌ها",
      hint: "اعلان همگانی برای همه ساکنان ارسال کنید.",
      content: (
        <DemoPanel title="اعلان همگانی">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const text = String(new FormData(event.currentTarget).get("text") ?? "").trim();
              if (!text) return;
              setAnnouncements((prev) => [{ text, at: "۱۴۰۵/۰۷/۱۰" }, ...prev]);
              event.currentTarget.reset();
            }}
            className="flex gap-2"
          >
            <input name="text" placeholder="متن اعلان برای همه ساکنان…" aria-label="متن اعلان" className="h-11 flex-1 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-3 text-2xs" />
            <button type="submit" className="inline-flex h-11 items-center gap-1.5 rounded-[var(--radius-sm)] px-4 text-2xs font-extrabold text-white" style={{ background: ACCENT }}>
              <Bell className="size-4" aria-hidden />
              ارسال
            </button>
          </form>
          <ul aria-live="polite" className="mt-4 space-y-2">
            {announcements.map((item, index) => (
              <li key={index} className="rounded-[var(--radius-sm)] bg-[var(--surface-sunken)] p-3 text-2xs">
                {item.text}
                <span className="mt-1 block text-4xs text-muted persian-num">
                  ارسال به {toPersianDigits(units.length)} واحد · {item.at}
                </span>
              </li>
            ))}
            {announcements.length === 0 ? <li className="p-4 text-center text-3xs text-muted">اعلانی ثبت نشده است.</li> : null}
          </ul>
        </DemoPanel>
      ),
    },
    {
      id: "visitors",
      label: "بازدیدکنندگان",
      hint: "ثبت ورود مهمان، پیک و تعمیرکار.",
      content: (
        <DemoPanel title="دفتر ورود">
          <ul className="space-y-2">
            {VISITORS.map((visitor) => (
              <li key={visitor.id} className="flex items-center justify-between rounded-[var(--radius-sm)] bg-[var(--surface-sunken)] p-3 text-2xs">
                <span className="flex items-center gap-2 font-bold">
                  <DoorOpen className="size-4" style={{ color: ACCENT }} aria-hidden />
                  {visitor.name}
                </span>
                <span className="text-3xs text-muted persian-num">
                  واحد {visitor.unit} · {visitor.time} · {visitor.type}
                </span>
              </li>
            ))}
          </ul>
        </DemoPanel>
      ),
    },
  ];

  return <DemoShell productSlug="smart-building" productName="مدیریت ساختمان هوشمند" emoji="🏗️" accent={ACCENT} modules={modules} onReset={reset} />;
}

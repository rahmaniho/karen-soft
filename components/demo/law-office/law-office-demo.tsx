"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Bot, CalendarDays, FileText, Plus, Send, User } from "lucide-react";
import {
  AI_ANSWERS,
  AI_SUGGESTIONS,
  CASE_STAGES,
  CASE_TYPES,
  CLIENTS,
  DOCUMENTS,
  HEARINGS,
  INVOICES,
  LAWYERS,
  LEGAL_CASES,
  type CaseStage,
  type LegalCase,
} from "@/lib/demos/law-office.data";
import { DemoShell, type DemoModule } from "@/components/demo/shared/demo-shell";
import { DataTable, DemoPanel, KanbanBoard, KpiGrid, TransferHint } from "@/components/demo/shared/widgets";
import { delay, formatNumber, formatToman, toPersianDigits } from "@/lib/utils";

const ACCENT = "#c9a96e";

export function LawOfficeDemo() {
  const [cases, setCases] = useState<LegalCase[]>(LEGAL_CASES);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "سلام. دستیار حقوقی کارن سافت هستم. درباره پرونده‌ها، مهلت‌ها یا پیش‌نویس لوایح بپرسید." },
  ]);
  const [thinking, setThinking] = useState(false);
  const [invoices, setInvoices] = useState(INVOICES);
  const [docs, setDocs] = useState(DOCUMENTS);

  function reset() {
    setCases(LEGAL_CASES);
    setMessages([{ role: "ai", text: "دمو بازنشانی شد. دوباره بپرسید." }]);
    setInvoices(INVOICES);
    setDocs(DOCUMENTS);
  }

  const cardsByStage = useMemo(() => {
    const map: Record<string, { id: string; title: string; meta: string; tag?: string }[]> = {};
    for (const stage of CASE_STAGES) {
      map[stage.id] = cases
        .filter((item) => item.stage === stage.id)
        .map((item) => ({
          id: item.id,
          title: item.title,
          meta: `${item.client} · ${item.lawyer}`,
          tag: item.type,
        }));
    }
    return map;
  }, [cases]);

  async function ask(question: string) {
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setThinking(true);
    await delay(700);
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        text:
          AI_ANSWERS[question] ??
          "بر اساس سوابق دفتر، برای این پرسش نیاز به بررسی مدارک پرونده است. پیشنهاد می‌شود مدارک را در ماژول اسناد بارگذاری کنید تا خلاصه تحلیلی تهیه شود.",
      },
    ]);
    setThinking(false);
  }

  function addCase(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    if (!title) return;
    const id = `ک-${toPersianDigits(1032 + cases.length)}`;
    setCases((prev) => [
      {
        id,
        title,
        client: String(form.get("client") ?? "موکل جدید"),
        lawyer: String(form.get("lawyer") ?? LAWYERS[0]),
        branch: "شعبه تعیین‌نشده",
        stage: "intake",
        nextHearing: String(form.get("hearing") ?? "—") || "—",
        type: String(form.get("type") ?? CASE_TYPES[0]),
      },
      ...prev,
    ]);
    event.currentTarget.reset();
  }

  const totalBilled = invoices.reduce((sum, item) => sum + item.amount, 0);
  const totalPaid = invoices.reduce((sum, item) => sum + item.paid, 0);

  const modules: DemoModule[] = [
    {
      id: "dashboard",
      label: "داشبورد",
      hint: "نمای کلی پرونده‌های فعال، جلسات نزدیک و مطالبات.",
      content: (
        <div className="space-y-5">
          <KpiGrid
            accent={ACCENT}
            items={[
              { label: "پرونده فعال", value: toPersianDigits(cases.filter((c) => c.stage !== "execution").length) },
              { label: "جلسه این ماه", value: toPersianDigits(HEARINGS.length) },
              { label: "مطالبات وصول‌شده", value: `${toPersianDigits(Math.round((totalPaid / totalBilled) * 100))}٪` },
              { label: "موکلین فعال", value: toPersianDigits(CLIENTS.length) },
            ]}
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <DemoPanel title="جلسات پیش‌رو">
              <ul className="space-y-2">
                {HEARINGS.map((hearing) => (
                  <li key={hearing.title} className="flex items-center gap-3 rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-[var(--radius-sm)] text-sm font-extrabold text-white persian-num" style={{ background: ACCENT }}>
                      {toPersianDigits(hearing.day)}
                    </span>
                    <div>
                      <p className="text-2xs font-bold">{hearing.title}</p>
                      <p className="text-4xs text-muted persian-num">مهر ۱۴۰۵ — ساعت {hearing.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </DemoPanel>
            <DemoPanel title="توزیع پرونده‌ها بر اساس موضوع">
              <ul className="space-y-3">
                {CASE_TYPES.map((type) => {
                  const count = cases.filter((c) => c.type === type).length;
                  const percent = Math.round((count / cases.length) * 100);
                  return (
                    <li key={type}>
                      <div className="flex justify-between text-3xs font-bold">
                        <span>{type}</span>
                        <span className="persian-num">{toPersianDigits(count)} پرونده</span>
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
        </div>
      ),
    },
    {
      id: "cases",
      label: "پرونده‌ها",
      hint: "پرونده جدید بسازید و مراحل دادرسی را جابه‌جا کنید.",
      content: (
        <div className="space-y-5">
          <DemoPanel title="ایجاد پرونده جدید">
            <form onSubmit={addCase} className="grid gap-3 sm:grid-cols-5">
              <input name="title" required placeholder="موضوع پرونده" className="h-10 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-3 text-2xs sm:col-span-2" aria-label="موضوع پرونده" />
              <input name="client" placeholder="نام موکل" className="h-10 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-3 text-2xs" aria-label="نام موکل" />
              <select name="lawyer" aria-label="وکیل پرونده" className="h-10 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-3 text-2xs">
                {LAWYERS.map((lawyer) => (
                  <option key={lawyer}>{lawyer}</option>
                ))}
              </select>
              <select name="type" aria-label="موضوع" className="h-10 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-3 text-2xs">
                {CASE_TYPES.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
              <input name="hearing" placeholder="تاریخ جلسه ۱۴۰۵/۰۸/۰۱" className="h-10 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-3 text-2xs sm:col-span-2" aria-label="تاریخ جلسه" />
              <button type="submit" className="inline-flex h-10 items-center justify-center gap-1.5 rounded-[var(--radius-sm)] px-4 text-2xs font-extrabold text-white sm:col-span-3" style={{ background: ACCENT }}>
                <Plus className="size-4" aria-hidden />
                ثبت پرونده و تخصیص وکیل
              </button>
            </form>
          </DemoPanel>

          <DemoPanel title="تابلوی مراحل دادرسی">
            <KanbanBoard
              columns={CASE_STAGES.map((s) => ({ id: s.id, title: s.title }))}
              cards={cardsByStage}
              accent={ACCENT}
              onMove={(id, _from, to) => setCases((prev) => prev.map((c) => (c.id === id ? { ...c, stage: to as CaseStage } : c)))}
            />
            <TransferHint />
          </DemoPanel>

          <DemoPanel title="نمای لیستی">
            <DataTable
              rows={cases}
              searchKeys={(row) => `${row.id} ${row.title} ${row.client} ${row.lawyer}`}
              filters={CASE_TYPES.slice(0, 4).map((type) => ({ id: type, label: type, predicate: (row: LegalCase) => row.type === type }))}
              columns={[
                { key: "id", header: "کد", render: (row) => <span className="font-bold persian-num">{row.id}</span> },
                { key: "title", header: "موضوع", render: (row) => row.title },
                { key: "client", header: "موکل", render: (row) => <span className="text-muted">{row.client}</span> },
                { key: "lawyer", header: "وکیل", render: (row) => row.lawyer },
                { key: "branch", header: "شعبه", render: (row) => <span className="text-muted">{row.branch}</span> },
                { key: "hearing", header: "جلسه بعدی", render: (row) => <span className="persian-num">{row.nextHearing}</span> },
              ]}
            />
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "clients",
      label: "موکلین",
      hint: "کارت‌های CRM موکلین با سوابق پرونده و مالی.",
      content: (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CLIENTS.map((client) => (
            <article key={client.id} className="surface-card p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full text-white" style={{ background: ACCENT }}>
                  <User className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-xs font-extrabold">{client.name}</h3>
                  <p className="text-4xs text-muted persian-num">موکل از سال {client.since}</p>
                </div>
              </div>
              <dl className="mt-4 space-y-1.5 text-3xs">
                <div className="flex justify-between">
                  <dt className="text-muted">تلفن</dt>
                  <dd className="persian-num font-bold">{client.phone}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">پرونده‌ها</dt>
                  <dd className="persian-num font-bold">{toPersianDigits(client.cases)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">مانده حساب</dt>
                  <dd className={`persian-num font-bold ${client.debt ? "text-rose-500" : "text-emerald-600"}`}>
                    {client.debt ? formatToman(client.debt) : "تسویه"}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      ),
    },
    {
      id: "calendar",
      label: "تقویم و جلسات",
      hint: "تقویم شمسی مهر ۱۴۰۵ با اوقات رسیدگی.",
      content: (
        <DemoPanel title="مهر ۱۴۰۵">
          <div className="grid grid-cols-7 gap-1.5 text-center text-4xs text-muted">
            {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((day) => (
              <span key={day} className="py-1 font-bold">{day}</span>
            ))}
            {Array.from({ length: 30 }, (_, index) => index + 1).map((day) => {
              const hearing = HEARINGS.find((h) => h.day === day);
              return (
                <div
                  key={day}
                  className="min-h-16 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] p-1.5 text-start"
                  style={hearing ? { background: `${ACCENT}1a`, borderColor: ACCENT } : undefined}
                >
                  <span className="text-4xs font-bold persian-num">{toPersianDigits(day)}</span>
                  {hearing ? (
                    <p className="mt-1 line-clamp-2 text-6xs font-bold leading-tight" style={{ color: ACCENT }}>
                      {hearing.time} — {hearing.title}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
          <p className="mt-4 flex items-center gap-2 text-3xs text-muted">
            <CalendarDays className="size-3.5" aria-hidden />
            یادآور پیامکی ۲۴ ساعت پیش از هر جلسه برای وکیل و موکل ارسال می‌شود.
          </p>
        </DemoPanel>
      ),
    },
    {
      id: "finance",
      label: "مالی",
      hint: "فاکتورها، اقساط و ثبت پرداخت.",
      content: (
        <div className="space-y-5">
          <KpiGrid
            accent={ACCENT}
            items={[
              { label: "کل صورت‌حساب", value: formatNumber(totalBilled / 1_000_000), hint: "میلیون تومان" },
              { label: "وصول‌شده", value: formatNumber(totalPaid / 1_000_000), hint: "میلیون تومان" },
              { label: "مانده مطالبات", value: formatNumber((totalBilled - totalPaid) / 1_000_000), hint: "میلیون تومان" },
              { label: "نرخ وصول", value: `${toPersianDigits(Math.round((totalPaid / totalBilled) * 100))}٪` },
            ]}
          />
          <DemoPanel title="فاکتورها">
            <ul className="space-y-2">
              {invoices.map((invoice) => {
                const remaining = invoice.amount - invoice.paid;
                return (
                  <li key={invoice.id} className="rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-2xs font-extrabold persian-num">{invoice.id} — {invoice.client}</p>
                        <p className="text-4xs text-muted persian-num">
                          {formatToman(invoice.paid)} از {formatToman(invoice.amount)}
                        </p>
                      </div>
                      {remaining > 0 ? (
                        <button
                          type="button"
                          onClick={() =>
                            setInvoices((prev) =>
                              prev.map((item) =>
                                item.id === invoice.id
                                  ? { ...item, paid: Math.min(item.amount, item.paid + Math.round(item.amount * 0.25)), status: item.paid + Math.round(item.amount * 0.25) >= item.amount ? "تسویه" : item.status }
                                  : item,
                              ),
                            )
                          }
                          className="h-9 rounded-[var(--radius-sm)] px-3 text-3xs font-extrabold text-white"
                          style={{ background: ACCENT }}
                        >
                          ثبت پرداخت قسط
                        </button>
                      ) : (
                        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-4xs font-extrabold text-emerald-600">تسویه شده</span>
                      )}
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--surface-raised)]">
                      <span className="block h-full rounded-full" style={{ width: `${(invoice.paid / invoice.amount) * 100}%`, background: ACCENT }} />
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
      id: "ai",
      label: "دستیار AI",
      hint: "شبیه‌سازی دستیار هوشمند حقوقی؛ یکی از پیشنهادها را انتخاب کنید.",
      content: (
        <DemoPanel title="گفت‌وگو با دستیار">
          <div className="scrollbar-thin max-h-80 space-y-3 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className={`flex gap-2 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                <span className="grid size-8 shrink-0 place-items-center rounded-full text-white" style={{ background: message.role === "ai" ? ACCENT : "#1f2937" }}>
                  {message.role === "ai" ? <Bot className="size-4" aria-hidden /> : <User className="size-4" aria-hidden />}
                </span>
                <p className={`max-w-lg rounded-[var(--radius-md)] p-3 text-2xs leading-loose ${message.role === "ai" ? "bg-[var(--surface-sunken)]" : "bg-brand-600 text-white"}`}>
                  {message.text}
                </p>
              </div>
            ))}
            {thinking ? <p aria-live="polite" className="text-3xs text-muted">دستیار در حال تحلیل پرونده است…</p> : null}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {AI_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => ask(suggestion)}
                className="rounded-full border border-[var(--border-subtle)] px-3 py-1.5 text-3xs font-bold transition-colors hover:border-current"
                style={{ color: ACCENT }}
              >
                {suggestion}
              </button>
            ))}
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const input = new FormData(event.currentTarget).get("q");
              const value = String(input ?? "").trim();
              if (value) void ask(value);
              event.currentTarget.reset();
            }}
            className="mt-4 flex gap-2"
          >
            <input name="q" placeholder="پرسش حقوقی خود را بنویسید…" aria-label="پرسش" className="h-11 flex-1 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-3 text-2xs" />
            <button type="submit" className="grid size-11 place-items-center rounded-[var(--radius-sm)] text-white" style={{ background: ACCENT }} aria-label="ارسال">
              <Send className="size-4" aria-hidden />
            </button>
          </form>
        </DemoPanel>
      ),
    },
    {
      id: "documents",
      label: "اسناد و مدارک",
      hint: "بارگذاری شبیه‌سازی‌شده و دسته‌بندی مدارک پرونده.",
      content: (
        <DemoPanel
          title="بایگانی اسناد"
          action={
            <button
              type="button"
              onClick={() =>
                setDocs((prev) => [
                  { id: `d-${prev.length + 1}`, name: `مدرک جدید ${toPersianDigits(prev.length + 1)}.pdf`, size: "۱.۲ مگابایت", tag: "مدرک" },
                  ...prev,
                ])
              }
              className="h-9 rounded-[var(--radius-sm)] px-3 text-3xs font-extrabold text-white"
              style={{ background: ACCENT }}
            >
              شبیه‌سازی بارگذاری
            </button>
          }
        >
          <ul className="space-y-2">
            {docs.map((doc) => (
              <li key={doc.id} className="flex items-center gap-3 rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-3">
                <FileText className="size-4" style={{ color: ACCENT }} aria-hidden />
                <span className="flex-1 truncate text-2xs font-bold">{doc.name}</span>
                <span className="text-4xs text-muted persian-num">{doc.size}</span>
                <span className="rounded-full px-2 py-0.5 text-5xs font-bold" style={{ background: `${ACCENT}22`, color: ACCENT }}>
                  {doc.tag}
                </span>
              </li>
            ))}
          </ul>
        </DemoPanel>
      ),
    },
  ];

  return (
    <DemoShell productSlug="law-office" productName="مدیریت دفتر وکالت هوشمند" emoji="⚖️" accent={ACCENT} modules={modules} onReset={reset} />
  );
}

"use client";

import { useState } from "react";
import { QrCode, RefreshCw } from "lucide-react";
import { ATTENDANCE_TREND, COACHES, MEMBERS, PLAN_PRICES, WORKOUT_TEMPLATES, type Member } from "@/lib/demos/gym.data";
import { DemoShell, type DemoModule } from "@/components/demo/shared/demo-shell";
import { BarChart, DataTable, DemoPanel, KpiGrid } from "@/components/demo/shared/widgets";
import { cn, formatToman, toPersianDigits } from "@/lib/utils";

const ACCENT = "#84cc16";

export function GymDemo() {
  const [members, setMembers] = useState<Member[]>(MEMBERS);
  const [scanning, setScanning] = useState<string | null>(null);
  const [log, setLog] = useState<string[]>([]);

  function reset() {
    setMembers(MEMBERS);
    setLog([]);
  }

  async function checkIn(member: Member) {
    setScanning(member.id);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setMembers((prev) => prev.map((m) => (m.id === member.id ? { ...m, checkedIn: true } : m)));
    setLog((prev) => [`${member.name} با کد QR وارد شد — اشتراک ${member.plan}`, ...prev]);
    setScanning(null);
  }

  const checkedIn = members.filter((m) => m.checkedIn).length;
  const expiring = members.filter((m) => m.expiresIn <= 7);
  const income = members.reduce((sum, m) => sum + PLAN_PRICES[m.plan], 0);

  const modules: DemoModule[] = [
    {
      id: "dashboard",
      label: "داشبورد",
      hint: "حضور امروز، اشتراک‌های رو به اتمام و درآمد ماه.",
      content: (
        <div className="space-y-5">
          <KpiGrid
            accent={ACCENT}
            items={[
              { label: "حضور امروز", value: toPersianDigits(checkedIn), hint: `از ${toPersianDigits(members.length)} عضو` },
              { label: "اشتراک رو به اتمام", value: toPersianDigits(expiring.length), hint: "کمتر از ۷ روز" },
              { label: "درآمد ماه", value: toPersianDigits(Math.round(income / 1_000_000)), hint: "میلیون تومان" },
              { label: "مربیان فعال", value: toPersianDigits(COACHES.length) },
            ]}
          />
          <DemoPanel title="حضور هفتگی">
            <BarChart data={ATTENDANCE_TREND} accent={ACCENT} unit="نفر" />
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "members",
      label: "اعضا",
      hint: "لیست اعضا با وضعیت اشتراک و مربی.",
      content: (
        <DemoPanel title="اعضای باشگاه">
          <DataTable
            rows={members}
            searchKeys={(row) => `${row.name} ${row.coach}`}
            filters={[
              { id: "gold", label: "طلایی", predicate: (row) => row.plan === "طلایی" },
              { id: "expiring", label: "رو به اتمام", predicate: (row) => row.expiresIn <= 7 },
              { id: "in", label: "حاضر", predicate: (row) => row.checkedIn },
            ]}
            columns={[
              { key: "name", header: "عضو", render: (row) => <span className="font-bold">{row.name}</span> },
              { key: "plan", header: "اشتراک", render: (row) => row.plan },
              {
                key: "expires",
                header: "اعتبار",
                render: (row) => (
                  <span className={cn("persian-num", row.expiresIn <= 7 && "font-extrabold text-rose-500")}>
                    {toPersianDigits(row.expiresIn)} روز
                  </span>
                ),
              },
              { key: "coach", header: "مربی", render: (row) => <span className="text-muted">{row.coach}</span> },
              { key: "program", header: "برنامه", render: (row) => <span className="text-muted">{row.program ?? "تخصیص نیافته"}</span> },
            ]}
          />
        </DemoPanel>
      ),
    },
    {
      id: "subscriptions",
      label: "اشتراک‌ها و تمدید",
      hint: "اشتراک‌های رو به اتمام را با یک کلیک تمدید کنید.",
      content: (
        <div className="grid gap-5 lg:grid-cols-2">
          <DemoPanel title="نیازمند تمدید">
            <ul className="space-y-2">
              {expiring.map((member) => (
                <li key={member.id} className="flex items-center justify-between rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-3">
                  <div>
                    <p className="text-[12px] font-extrabold">{member.name}</p>
                    <p className="text-[10px] text-muted persian-num">
                      {member.plan} — {toPersianDigits(member.expiresIn)} روز مانده
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMembers((prev) => prev.map((m) => (m.id === member.id ? { ...m, expiresIn: m.expiresIn + 30 } : m)));
                      setLog((prev) => [`اشتراک ${member.name} به مدت ۳۰ روز تمدید شد.`, ...prev]);
                    }}
                    className="inline-flex h-9 items-center gap-1.5 rounded-[var(--radius-sm)] px-3 text-[11px] font-extrabold text-white"
                    style={{ background: ACCENT }}
                  >
                    <RefreshCw className="size-3.5" aria-hidden />
                    تمدید ۳۰ روزه
                  </button>
                </li>
              ))}
              {expiring.length === 0 ? <li className="p-4 text-center text-[11px] text-muted">همه اشتراک‌ها معتبرند.</li> : null}
            </ul>
          </DemoPanel>
          <DemoPanel title="پلن‌ها">
            <ul className="space-y-2">
              {Object.entries(PLAN_PRICES).map(([plan, price]) => (
                <li key={plan} className="flex items-center justify-between rounded-[var(--radius-sm)] bg-[var(--surface-sunken)] p-3 text-[12px]">
                  <span className="font-bold">{plan}</span>
                  <span className="persian-num">{formatToman(price)} / ماهانه</span>
                </li>
              ))}
            </ul>
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "programs",
      label: "برنامه تمرینی",
      hint: "قالب برنامه را انتخاب و به عضو تخصیص دهید.",
      content: (
        <div className="grid gap-4 sm:grid-cols-2">
          {WORKOUT_TEMPLATES.map((template) => (
            <article key={template.id} className="surface-card p-5">
              <h3 className="text-[13px] font-extrabold">{template.name}</h3>
              <p className="mt-1 text-[11px] text-muted">{template.sessions} · {template.focus}</p>
              <label className="mt-4 block text-[11px] font-bold">
                تخصیص به عضو
                <select
                  defaultValue=""
                  onChange={(event) => {
                    const id = event.target.value;
                    if (!id) return;
                    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, program: template.name } : m)));
                    setLog((prev) => [`برنامه «${template.name}» به ${members.find((m) => m.id === id)?.name} تخصیص یافت.`, ...prev]);
                    event.target.value = "";
                  }}
                  className="mt-2 h-10 w-full rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-3 text-[12px]"
                >
                  <option value="">انتخاب عضو…</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </label>
            </article>
          ))}
        </div>
      ),
    },
    {
      id: "attendance",
      label: "حضور و غیاب",
      hint: "شبیه‌سازی ورود با کد QR.",
      content: (
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <DemoPanel title="ایستگاه ورود">
            <div className="grid place-items-center rounded-[var(--radius-lg)] bg-[var(--surface-sunken)] p-8">
              <QrCode className={cn("size-24", scanning && "animate-pulse")} style={{ color: ACCENT }} aria-hidden />
              <p aria-live="polite" className="mt-3 text-[12px] font-bold">
                {scanning ? "در حال اسکن کد عضو…" : "کد QR عضو را اسکن کنید"}
              </p>
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {members.map((member) => (
                <li key={member.id}>
                  <button
                    type="button"
                    disabled={member.checkedIn}
                    onClick={() => void checkIn(member)}
                    className="h-10 w-full rounded-[var(--radius-sm)] border border-[var(--border-subtle)] text-[11px] font-bold transition-colors hover:border-current disabled:opacity-40"
                    style={{ color: member.checkedIn ? "#10b981" : undefined }}
                  >
                    {member.checkedIn ? `✔ ${member.name}` : `اسکن ${member.name}`}
                  </button>
                </li>
              ))}
            </ul>
          </DemoPanel>
          <DemoPanel title="گزارش رویدادها">
            <ul aria-live="polite" className="space-y-2">
              {log.map((entry, index) => (
                <li key={index} className="rounded-[var(--radius-sm)] bg-[var(--surface-sunken)] p-3 text-[11px]">
                  {entry}
                </li>
              ))}
              {log.length === 0 ? <li className="p-4 text-center text-[11px] text-muted">رویدادی ثبت نشده است.</li> : null}
            </ul>
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "coaches",
      label: "مربیان",
      hint: "شاگردان و برنامه کاری هر مربی.",
      content: (
        <div className="grid gap-4 sm:grid-cols-2">
          {COACHES.map((coach) => {
            const students = members.filter((m) => m.coach === coach);
            return (
              <article key={coach} className="surface-card p-5">
                <h3 className="text-[13px] font-extrabold">{coach}</h3>
                <p className="mt-1 text-[11px] text-muted persian-num">{toPersianDigits(students.length)} شاگرد فعال</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {students.map((student) => (
                    <li key={student.id} className="rounded-full px-2.5 py-1 text-[10px] font-bold" style={{ background: `${ACCENT}22`, color: "#4d7c0f" }}>
                      {student.name}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      ),
    },
    {
      id: "finance",
      label: "مالی",
      hint: "درآمد، بدهی و سهم مربیان.",
      content: (
        <div className="space-y-5">
          <KpiGrid
            accent={ACCENT}
            items={[
              { label: "درآمد ماه", value: toPersianDigits(Math.round(income / 1_000_000)), hint: "میلیون تومان" },
              { label: "بدهی اعضا", value: "۴.۸م", hint: "تومان" },
              { label: "سهم مربیان", value: "۳۲٪" },
              { label: "نرخ تمدید", value: "۷۸٪" },
            ]}
          />
          <DemoPanel title="درآمد بر اساس پلن">
            <BarChart
              accent={ACCENT}
              data={Object.entries(PLAN_PRICES).map(([plan, price]) => ({
                label: plan,
                value: members.filter((m) => m.plan === plan).length * (price / 1_000_000),
              }))}
              unit="میلیون تومان"
            />
          </DemoPanel>
        </div>
      ),
    },
  ];

  return <DemoShell productSlug="gym" productName="مدیریت باشگاه ورزشی" emoji="💪" accent={ACCENT} modules={modules} onReset={reset} />;
}

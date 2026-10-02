"use client";

import { useMemo, useState, type FormEvent } from "react";
import { CheckCircle2, Circle, LifeBuoy } from "lucide-react";
import {
  MILESTONES,
  PROJECTS,
  PROJECT_STAGES,
  SERVICES_CATALOG,
  TICKETS_SEED,
  type ProjectStage,
  type ServiceProject,
  type Ticket,
} from "@/lib/demos/karen-net.data";
import { DemoShell, type DemoModule } from "@/components/demo/shared/demo-shell";
import { DemoPanel, KanbanBoard, KpiGrid, TransferHint } from "@/components/demo/shared/widgets";
import { cn, formatNumber, formatToman, toPersianDigits } from "@/lib/utils";

const ACCENT = "#8b5cf6";

export function KarenNetDemo() {
  const [projects, setProjects] = useState<ServiceProject[]>(PROJECTS);
  const [tickets, setTickets] = useState<Ticket[]>(TICKETS_SEED);
  const [brief, setBrief] = useState<string | null>(null);
  const [milestones, setMilestones] = useState(MILESTONES);

  function reset() {
    setProjects(PROJECTS);
    setTickets(TICKETS_SEED);
    setBrief(null);
    setMilestones(MILESTONES);
  }

  const cards = useMemo(() => {
    const map: Record<string, { id: string; title: string; meta: string; tag?: string }[]> = {};
    for (const stage of PROJECT_STAGES) {
      map[stage.id] = projects
        .filter((p) => p.stage === stage.id)
        .map((p) => ({ id: p.id, title: p.client, meta: `${p.service} · تحویل ${p.due}`, tag: `${toPersianDigits(p.progress)}٪` }));
    }
    return map;
  }, [projects]);

  function createOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const client = String(form.get("client") ?? "مشتری جدید");
    const serviceId = String(form.get("service") ?? SERVICES_CATALOG[0]!.id);
    const service = SERVICES_CATALOG.find((s) => s.id === serviceId)!;
    const goal = String(form.get("goal") ?? "");
    setProjects((prev) => [
      { id: `pr-${905 + prev.length}`, client, service: service.name, stage: "brief", progress: 5, due: "۱۴۰۵/۰۹/۱۵" },
      ...prev,
    ]);
    setBrief(
      `بریف خودکار پروژه «${service.name}» برای ${client}:\n• هدف اعلام‌شده: ${goal || "افزایش فروش آنلاین"}\n• مدت اجرا: ${service.duration}\n• برآورد هزینه: ${formatToman(service.price)}\n• خروجی‌ها: طراحی رابط، توسعه، آموزش تحویل و سه ماه پشتیبانی.`,
    );
    event.currentTarget.reset();
  }

  const modules: DemoModule[] = [
    {
      id: "dashboard",
      label: "داشبورد",
      hint: "پروژه‌های فعال، تیکت‌ها و درآمد.",
      content: (
        <div className="space-y-5">
          <KpiGrid
            accent={ACCENT}
            items={[
              { label: "پروژه فعال", value: toPersianDigits(projects.filter((p) => p.stage !== "done").length) },
              { label: "تیکت باز", value: toPersianDigits(tickets.filter((t) => t.status !== "بسته").length) },
              { label: "میانگین پیشرفت", value: `${toPersianDigits(Math.round(projects.reduce((s, p) => s + p.progress, 0) / projects.length))}٪` },
              { label: "درآمد در جریان", value: formatNumber(485), hint: "میلیون تومان" },
            ]}
          />
          <DemoPanel title="پیشرفت پروژه‌ها">
            <ul className="space-y-3">
              {projects.map((project) => (
                <li key={project.id}>
                  <div className="flex justify-between text-3xs font-bold">
                    <span>{project.client} — {project.service}</span>
                    <span className="persian-num">{toPersianDigits(project.progress)}٪</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-[var(--surface-sunken)]">
                    <span className="block h-full rounded-full" style={{ width: `${project.progress}%`, background: ACCENT }} />
                  </div>
                </li>
              ))}
            </ul>
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "orders",
      label: "سفارش خدمات",
      hint: "سفارش ثبت کنید تا بریف پروژه خودکار تولید شود.",
      content: (
        <div className="grid gap-5 lg:grid-cols-2">
          <DemoPanel title="ثبت سفارش خدمت">
            <form onSubmit={createOrder} className="space-y-3">
              <input name="client" required placeholder="نام کسب‌وکار" aria-label="نام کسب‌وکار" className="h-10 w-full rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-3 text-2xs" />
              <select name="service" aria-label="خدمت" className="h-10 w-full rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-3 text-2xs">
                {SERVICES_CATALOG.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} — {formatToman(service.price)}
                  </option>
                ))}
              </select>
              <textarea name="goal" rows={3} placeholder="هدف اصلی پروژه…" aria-label="هدف پروژه" className="w-full rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-3 text-2xs" />
              <button type="submit" className="h-10 w-full rounded-[var(--radius-sm)] text-2xs font-extrabold text-white" style={{ background: ACCENT }}>
                ثبت سفارش و تولید بریف
              </button>
            </form>
          </DemoPanel>
          <DemoPanel title="بریف تولیدشده">
            {brief ? (
              <pre aria-live="polite" className="whitespace-pre-wrap rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-4 text-2xs leading-loose">
                {brief}
              </pre>
            ) : (
              <p className="p-8 text-center text-2xs text-muted">پس از ثبت سفارش، بریف اولیه اینجا ساخته می‌شود.</p>
            )}
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "projects",
      label: "پروژه‌ها",
      hint: "پروژه‌ها را بین مراحل اجرا جابه‌جا کنید.",
      content: (
        <DemoPanel title="کانبان پروژه‌ها">
          <KanbanBoard
            columns={PROJECT_STAGES.map((s) => ({ id: s.id, title: s.title }))}
            cards={cards}
            accent={ACCENT}
            onMove={(id, _from, to) =>
              setProjects((prev) =>
                prev.map((p) =>
                  p.id === id
                    ? { ...p, stage: to as ProjectStage, progress: to === "done" ? 100 : Math.max(p.progress, PROJECT_STAGES.findIndex((s) => s.id === to) * 22) }
                    : p,
                ),
              )
            }
          />
          <TransferHint />
        </DemoPanel>
      ),
    },
    {
      id: "tickets",
      label: "تیکت پشتیبانی",
      hint: "چرخه عمر تیکت را از باز تا بسته پیش ببرید.",
      content: (
        <DemoPanel title="تیکت‌ها">
          <ul className="space-y-2">
            {tickets.map((ticket) => (
              <li key={ticket.id} className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-4">
                <div>
                  <p className="flex items-center gap-2 text-2xs font-extrabold">
                    <LifeBuoy className="size-3.5" style={{ color: ACCENT }} aria-hidden />
                    {ticket.subject}
                  </p>
                  <p className="text-4xs text-muted persian-num">
                    {ticket.id} · {ticket.client} · اولویت {ticket.priority}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-4xs font-bold",
                      ticket.status === "باز" && "bg-rose-500/15 text-rose-600",
                      ticket.status === "در حال بررسی" && "bg-amber-500/15 text-amber-600",
                      ticket.status === "بسته" && "bg-emerald-500/15 text-emerald-600",
                    )}
                  >
                    {ticket.status}
                  </span>
                  {ticket.status !== "بسته" ? (
                    <button
                      type="button"
                      onClick={() =>
                        setTickets((prev) =>
                          prev.map((t) => (t.id === ticket.id ? { ...t, status: t.status === "باز" ? "در حال بررسی" : "بسته" } : t)),
                        )
                      }
                      className="h-9 rounded-[var(--radius-sm)] px-3 text-3xs font-extrabold text-white"
                      style={{ background: ACCENT }}
                    >
                      {ticket.status === "باز" ? "شروع بررسی" : "بستن تیکت"}
                    </button>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </DemoPanel>
      ),
    },
    {
      id: "progress",
      label: "گزارش پیشرفت",
      hint: "مایلستون‌ها را تکمیل کنید تا درصد پیشرفت به‌روز شود.",
      content: (
        <DemoPanel title="مایلستون‌های پروژه نمونه">
          <ul className="space-y-2">
            {milestones.map((milestone, index) => (
              <li key={milestone.title}>
                <button
                  type="button"
                  onClick={() => setMilestones((prev) => prev.map((m, i) => (i === index ? { ...m, done: !m.done } : m)))}
                  className="flex w-full items-center gap-3 rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-3 text-start text-2xs"
                >
                  {milestone.done ? (
                    <CheckCircle2 className="size-4" style={{ color: ACCENT }} aria-hidden />
                  ) : (
                    <Circle className="size-4 text-muted" aria-hidden />
                  )}
                  <span className={cn("font-bold", milestone.done && "line-through opacity-60")}>{milestone.title}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-2xs font-extrabold persian-num">
            پیشرفت کل: {toPersianDigits(Math.round((milestones.filter((m) => m.done).length / milestones.length) * 100))}٪
          </p>
        </DemoPanel>
      ),
    },
  ];

  return <DemoShell productSlug="karen-net" productName="کارن نت" emoji="🌐" accent={ACCENT} modules={modules} onReset={reset} />;
}

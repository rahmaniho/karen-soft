"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ArrowLeftRight, Check, Search, X } from "lucide-react";
import { cn, formatNumber, toPersianDigits } from "@/lib/utils";

/* ─────────────── Layout primitives ─────────────── */

export function DemoPanel({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("surface-card p-5", className)}>
      {title || action ? (
        <header className="mb-4 flex items-center justify-between gap-4">
          {title ? <h3 className="text-sm font-extrabold">{title}</h3> : <span />}
          {action}
        </header>
      ) : null}
      {children}
    </section>
  );
}

export function KpiGrid({
  items,
  accent,
}: {
  items: { label: string; value: string; hint?: string }[];
  accent: string;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="surface-card p-4">
          <p className="text-[11px] text-muted">{item.label}</p>
          <strong className="mt-1 block text-2xl persian-num" style={{ color: accent }}>
            {item.value}
          </strong>
          {item.hint ? <span className="text-[10px] text-muted">{item.hint}</span> : null}
        </div>
      ))}
    </div>
  );
}

/* ─────────────── Bar chart (dependency-free) ─────────────── */

export function BarChart({
  data,
  accent,
  unit = "",
}: {
  data: { label: string; value: number }[];
  accent: string;
  unit?: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div>
      <div className="flex h-44 items-end gap-2" role="img" aria-label="نمودار ستونی">
        {data.map((item) => (
          <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-[10px] font-bold text-muted persian-num">{formatNumber(item.value)}</span>
            <div
              className="w-full rounded-t-md transition-all duration-[450ms]"
              style={{ height: `${(item.value / max) * 100}%`, background: accent, opacity: 0.85 }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        {data.map((item) => (
          <span key={item.label} className="flex-1 text-center text-[10px] text-muted">
            {item.label}
          </span>
        ))}
      </div>
      {unit ? <p className="mt-1 text-end text-[10px] text-muted">{unit}</p> : null}
    </div>
  );
}

export function LineChart({ data, accent }: { data: { label: string; value: number }[]; accent: string }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const points = data
    .map((d, i) => `${(i / Math.max(data.length - 1, 1)) * 100},${100 - (d.value / max) * 85}`)
    .join(" ");
  return (
    <div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-40 w-full" role="img" aria-label="نمودار خطی روند">
        <polyline points={points} fill="none" stroke={accent} strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <polygon points={`0,100 ${points} 100,100`} fill={accent} opacity="0.12" />
      </svg>
      <div className="flex justify-between text-[10px] text-muted">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── Kanban with keyboard-accessible moves ─────────────── */

export interface KanbanCard {
  id: string;
  title: string;
  meta?: string;
  tag?: string;
}

export function KanbanBoard({
  columns,
  cards,
  onMove,
  accent,
}: {
  columns: { id: string; title: string }[];
  cards: Record<string, KanbanCard[]>;
  onMove: (cardId: string, from: string, to: string) => void;
  accent: string;
}) {
  const [dragging, setDragging] = useState<{ id: string; from: string } | null>(null);

  return (
    <div className="scrollbar-thin flex gap-4 overflow-x-auto pb-2">
      {columns.map((column, columnIndex) => (
        <div
          key={column.id}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            if (dragging && dragging.from !== column.id) onMove(dragging.id, dragging.from, column.id);
            setDragging(null);
          }}
          className="min-w-60 flex-1 rounded-[var(--radius-lg)] bg-[var(--surface-sunken)] p-3"
        >
          <header className="mb-3 flex items-center justify-between">
            <h4 className="text-[12px] font-extrabold">{column.title}</h4>
            <span className="rounded-full bg-[var(--surface-raised)] px-2 py-0.5 text-[10px] font-bold text-muted persian-num">
              {toPersianDigits((cards[column.id] ?? []).length)}
            </span>
          </header>
          <ul className="space-y-2">
            {(cards[column.id] ?? []).map((card) => (
              <li
                key={card.id}
                draggable
                onDragStart={() => setDragging({ id: card.id, from: column.id })}
                onDragEnd={() => setDragging(null)}
                className="surface-card cursor-grab p-3 active:cursor-grabbing"
              >
                <p className="text-[12px] font-extrabold">{card.title}</p>
                {card.meta ? <p className="mt-1 text-[10px] text-muted">{card.meta}</p> : null}
                <div className="mt-2 flex items-center justify-between gap-2">
                  {card.tag ? (
                    <span className="rounded-full px-2 py-0.5 text-[9px] font-bold" style={{ background: `${accent}22`, color: accent }}>
                      {card.tag}
                    </span>
                  ) : (
                    <span />
                  )}
                  <span className="flex gap-1">
                    <button
                      type="button"
                      disabled={columnIndex === 0}
                      onClick={() => onMove(card.id, column.id, columns[columnIndex - 1]!.id)}
                      aria-label={`انتقال ${card.title} به مرحله قبل`}
                      className="grid size-6 place-items-center rounded border border-[var(--border-subtle)] text-[10px] disabled:opacity-30"
                    >
                      ›
                    </button>
                    <button
                      type="button"
                      disabled={columnIndex === columns.length - 1}
                      onClick={() => onMove(card.id, column.id, columns[columnIndex + 1]!.id)}
                      aria-label={`انتقال ${card.title} به مرحله بعد`}
                      className="grid size-6 place-items-center rounded border border-[var(--border-subtle)] text-[10px] disabled:opacity-30"
                    >
                      ‹
                    </button>
                  </span>
                </div>
              </li>
            ))}
            {(cards[column.id] ?? []).length === 0 ? (
              <li className="rounded-[var(--radius-sm)] border border-dashed border-[var(--border-subtle)] p-4 text-center text-[10px] text-muted">
                کارتی اینجا نیست — یک کارت را بکشید
              </li>
            ) : null}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ─────────────── Filterable table ─────────────── */

export interface TableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
}

export function DataTable<T extends { id: string }>({
  rows,
  columns,
  searchKeys,
  filters,
  emptyLabel = "موردی یافت نشد.",
}: {
  rows: T[];
  columns: TableColumn<T>[];
  searchKeys?: (row: T) => string;
  filters?: { id: string; label: string; predicate: (row: T) => boolean }[];
  emptyLabel?: string;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const visible = useMemo(() => {
    const active = filters?.find((f) => f.id === filter);
    return rows.filter((row) => {
      const matchesFilter = !active || active.predicate(row);
      const haystack = searchKeys?.(row) ?? "";
      const matchesQuery = !query || haystack.includes(query.trim());
      return matchesFilter && matchesQuery;
    });
  }, [rows, filters, filter, query, searchKeys]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {searchKeys ? (
          <label className="relative flex-1 min-w-48">
            <span className="sr-only">جست‌وجو</span>
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جست‌وجو…"
              className="h-10 w-full rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] ps-9 pe-3 text-[13px] outline-none focus:border-brand-500"
            />
          </label>
        ) : null}
        {filters?.length ? (
          <div className="flex flex-wrap gap-1.5">
            {[{ id: "all", label: "همه" }, ...filters].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                aria-pressed={filter === item.id}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-[11px] font-bold transition-colors",
                  filter === item.id
                    ? "border-brand-500 bg-brand-500 text-white"
                    : "border-[var(--border-subtle)] text-muted hover:border-brand-300",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="scrollbar-thin overflow-x-auto">
        <table className="w-full min-w-[640px] text-start text-[12px]">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] text-muted">
              {columns.map((column) => (
                <th key={column.key} scope="col" className="px-3 py-2.5 text-start font-bold">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr key={row.id} className="border-b border-[var(--border-subtle)] last:border-0 hover:bg-[var(--surface-sunken)]">
                {columns.map((column) => (
                  <td key={column.key} className="px-3 py-3 align-middle">
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
            {visible.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-3 py-10 text-center text-muted">
                  {emptyLabel}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─────────────── Checklist ─────────────── */

export function Checklist({
  items,
  state,
  onToggle,
  accent,
}: {
  items: { id: string; label: string; hint?: string }[];
  state: Record<string, "pass" | "fail" | undefined>;
  onToggle: (id: string, value: "pass" | "fail") => void;
  accent: string;
}) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.id} className="flex items-center justify-between gap-3 rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-3">
          <div>
            <p className="text-[12px] font-bold">{item.label}</p>
            {item.hint ? <p className="text-[10px] text-muted">{item.hint}</p> : null}
          </div>
          <div className="flex shrink-0 gap-1.5">
            <button
              type="button"
              onClick={() => onToggle(item.id, "pass")}
              aria-pressed={state[item.id] === "pass"}
              aria-label={`تأیید ${item.label}`}
              className={cn(
                "grid size-8 place-items-center rounded-[var(--radius-sm)] border transition-colors",
                state[item.id] === "pass" ? "border-transparent text-white" : "border-[var(--border-subtle)] text-muted",
              )}
              style={state[item.id] === "pass" ? { background: accent } : undefined}
            >
              <Check className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => onToggle(item.id, "fail")}
              aria-pressed={state[item.id] === "fail"}
              aria-label={`رد ${item.label}`}
              className={cn(
                "grid size-8 place-items-center rounded-[var(--radius-sm)] border transition-colors",
                state[item.id] === "fail" ? "border-transparent bg-rose-500 text-white" : "border-[var(--border-subtle)] text-muted",
              )}
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ─────────────── Slider input ─────────────── */

export function RangeField({
  label,
  value,
  min,
  max,
  step = 1,
  suffix,
  onChange,
  accent,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
  accent: string;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between text-[12px] font-bold">
        {label}
        <span className="persian-num" style={{ color: accent }}>
          {formatNumber(value)} {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-brand-500"
        style={{ accentColor: accent }}
      />
    </label>
  );
}

export function TransferHint() {
  return (
    <p className="mt-3 flex items-center gap-1.5 text-[10px] text-muted">
      <ArrowLeftRight className="size-3" aria-hidden />
      کارت‌ها را بکشید و رها کنید یا از دکمه‌های جهت استفاده کنید.
    </p>
  );
}

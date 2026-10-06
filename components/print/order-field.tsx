"use client";

import { Minus, Plus } from "lucide-react";
import type { Field, FieldOption, FieldValue } from "@/lib/print/types";
import { optionsOf } from "@/lib/print/order";
import { cn } from "@/lib/utils";
import { toPersianDigits } from "@/lib/utils";

/** کنترل‌های فرم پیکربند سفارش — هر نوع فیلد، رابط خودش را دارد */

interface FieldProps {
  field: Field;
  value: FieldValue | undefined;
  error?: string;
  onChange: (value: FieldValue) => void;
}

const shell =
  "w-full rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-3.5 py-2.5 text-xs outline-none transition-colors placeholder:text-muted/70 focus:border-brand-500";

function Label({ field, filled }: { field: Field; filled?: boolean }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <span id={`label-${field.key}`} className="text-2xs font-bold">{field.label}</span>
      {field.required ? (
        <span className={cn("text-5xs font-bold", filled ? "text-emerald-700 dark:text-emerald-400" : "text-brand-600")}>
          {filled ? "✓ انجام شد" : " الزامی"}
        </span>
      ) : null}
    </div>
  );
}

function Hint({ field }: { field: Field }) {
  if (!field.hint) return null;
  return <p className="mt-1.5 text-5xs leading-relaxed text-muted">{field.hint}</p>;
}

function Error({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-5xs font-bold text-rose-600 dark:text-rose-400">
      {message}
    </p>
  );
}

function OptionPills({
  field,
  value,
  multiple,
  onPick,
}: {
  field: Field;
  value: string[];
  multiple?: boolean;
  onPick: (id: string) => void;
}) {
  const options = optionsOf(field);
  return (
    <div role={multiple ? "group" : "radiogroup"} aria-labelledby={`label-${field.key}`} className="flex flex-wrap gap-2">
      {options.map((option: FieldOption) => {
        const active = value.includes(option.id);
        return (
          <button
            key={option.id}
            type="button"
            role={multiple ? "checkbox" : "radio"}
            aria-checked={active}
            onClick={() => onPick(option.id)}
            className={cn(
              "rounded-[var(--radius-md)] border px-3 py-2 text-start transition-all duration-[180ms]",
              active
                ? "border-transparent bg-ink-950 text-white shadow-[0_10px_22px_-14px_rgba(17,22,38,.9)] dark:bg-white dark:text-ink-950"
                : "border-[var(--border-subtle)] bg-[var(--surface-raised)] hover:-translate-y-0.5 hover:border-ink-900/40",
            )}
          >
            <span className="block text-2xs font-bold leading-none">{option.label}</span>
            {option.hint ? (
              <span className={cn("mt-1 block text-5xs leading-snug", active ? "text-white/80 dark:text-ink-700" : "text-muted")}>
                {option.hint}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function Stepper({
  value,
  onChange,
  min = 1,
  step = 1,
  unit,
  label,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  step?: number;
  unit?: string;
  label: string;
}) {
  const set = (n: number) => onChange(Math.max(min, Number.isFinite(n) ? n : min));
  return (
    <div className="flex items-stretch gap-2">
      <button
        type="button"
        aria-label="کاهش"
        onClick={() => set(value - step)}
        className="grid size-10 shrink-0 place-items-center rounded-[var(--radius-md)] border border-[var(--border-subtle)] hover:border-ink-900"
      >
        <Minus className="size-4" aria-hidden />
      </button>
      <div className="relative flex-1">
        <input
          aria-label={label}
          type="number"
          inputMode="numeric"
          value={Number.isFinite(value) ? value : min}
          min={min}
          step={step}
          onChange={(e) => set(Number(e.target.value))}
          className={cn(shell, "text-center text-sm font-bold")}
        />
        {unit ? (
          <span className="pointer-events-none absolute inset-y-0 start-3 flex items-center text-5xs text-muted">
            {unit}
          </span>
        ) : null}
      </div>
      <button
        type="button"
        aria-label="افزایش"
        onClick={() => set(value + step)}
        className="grid size-10 shrink-0 place-items-center rounded-[var(--radius-md)] border border-[var(--border-subtle)] hover:border-ink-900"
      >
        <Plus className="size-4" aria-hidden />
      </button>
    </div>
  );
}

export function OrderField({ field, value, error, onChange }: FieldProps) {
  switch (field.type) {
    case "chips": {
      const current = typeof value === "string" ? [value] : [];
      return (
        <div>
          <Label field={field} filled={current.length > 0} />
          <OptionPills field={field} value={current} onPick={(id) => onChange(id)} />
          <Hint field={field} />
          <Error message={error} />
        </div>
      );
    }
    case "select": {
      const options = optionsOf(field);
      return (
        <div>
          <Label field={field} />
          <select
            aria-labelledby={`label-${field.key}`}
            aria-invalid={Boolean(error)}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
            className={cn(shell, "appearance-none bg-[length:0] pe-9")}
          >
            <option value="">انتخاب کنید…</option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
                {option.hint ? ` — ${option.hint}` : ""}
              </option>
            ))}
          </select>
          <Hint field={field} />
          <Error message={error} />
        </div>
      );
    }
    case "multi": {
      const current = Array.isArray(value) ? value : [];
      return (
        <div>
          <Label field={field} />
          <OptionPills
            field={field}
            value={current}
            multiple
            onPick={(id) => onChange(current.includes(id) ? current.filter((v) => v !== id) : [...current, id])}
          />
          <Hint field={field} />
          <Error message={error} />
        </div>
      );
    }
    case "qty": {
      const n = typeof value === "number" ? value : (field.min ?? 100);
      return (
        <div>
          <Label field={field} />
          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start">
            <div className="flex flex-wrap gap-2">
              {(field.presets ?? []).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => onChange(preset)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-2xs font-bold transition-colors",
                    n === preset
                      ? "border-transparent bg-ink-950 text-white dark:bg-white dark:text-ink-950"
                      : "border-[var(--border-subtle)] hover:border-ink-900/40",
                  )}
                >
                  <span className="persian-num">{toPersianDigits(preset)}</span>
                </button>
              ))}
            </div>
            <div className="sm:w-52">
              <Stepper label={field.label} value={n} min={field.min ?? 1} step={50} unit={field.unit} onChange={onChange} />
            </div>
          </div>
          <Hint field={field} />
          <Error message={error} />
        </div>
      );
    }
    case "num": {
      const n = typeof value === "number" ? value : (field.default ?? field.min ?? 1);
      return (
        <div>
          <Label field={field} />
          <div className="sm:max-w-[16rem]">
            <Stepper label={field.label} value={n} min={field.min ?? 1} step={field.step ?? 1} unit={field.unit} onChange={onChange} />
          </div>
          <Hint field={field} />
          <Error message={error} />
        </div>
      );
    }
    case "toggle": {
      const on = Boolean(value);
      return (
        <button
          type="button"
          role="switch"
          aria-checked={on}
          onClick={() => onChange(!on)}
          className={cn(
            "flex w-full items-center justify-between gap-4 rounded-[var(--radius-lg)] border p-4 text-start transition-colors",
            on
              ? "border-transparent bg-ink-950 text-white dark:bg-white dark:text-ink-950"
              : "border-[var(--border-subtle)]",
          )}
        >
          <span>
            <span className="block text-2xs font-bold">{field.label}</span>
            {field.hint ? (
              <span className={cn("mt-0.5 block text-5xs", on ? "opacity-70" : "text-muted")}>{field.hint}</span>
            ) : null}
          </span>
          <span
            className={cn(
              "relative h-6 w-11 shrink-0 rounded-full transition-colors",
              on ? "bg-[var(--color-cmyk-y)]" : "bg-[var(--border-subtle)]",
            )}
            aria-hidden
          >
            <span
              className={cn(
                "absolute top-0.5 size-5 rounded-full bg-white shadow transition-all",
                on ? "start-0.5 translate-x-0" : "start-0.5",
              )}
              style={{ insetInlineStart: on ? "calc(100% - 1.375rem)" : "0.125rem" }}
            />
          </span>
        </button>
      );
    }
    case "dims": {
      const dims = (value ?? {}) as { w?: string; h?: string };
      const set = (key: "w" | "h", v: string) => onChange({ ...dims, [key]: v });
      return (
        <div>
          <Label field={field} />
          <div className="flex items-center gap-2">
            <input
              value={dims.w ?? ""}
              onChange={(e) => set("w", e.target.value)}
              inputMode="decimal"
              placeholder="عرض"
              aria-label={`عرض (${field.unit ?? "سانتی‌متر"})`}
              className={cn(shell, "text-center")}
            />
            <span className="text-xs font-bold text-muted">×</span>
            <input
              value={dims.h ?? ""}
              onChange={(e) => set("h", e.target.value)}
              inputMode="decimal"
              placeholder="ارتفاع"
              aria-label={`ارتفاع (${field.unit ?? "سانتی‌متر"})`}
              className={cn(shell, "text-center")}
            />
            <span className="shrink-0 text-5xs text-muted">{field.unit ?? "سانتی‌متر"}</span>
          </div>
          <Hint field={field} />
          <Error message={error} />
        </div>
      );
    }
    case "counts": {
      const rec = (value ?? {}) as Record<string, number>;
      return (
        <div>
          <Label field={field} />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {optionsOf(field).map((option) => (
              <label key={option.id} className="block">
                <span className="mb-1 block text-5xs font-bold text-muted" dir="ltr">
                  {option.label}
                </span>
                <input
                  type="number"
                  min={0}
                  value={rec[option.id] ?? 0}
                  onChange={(e) => onChange({ ...rec, [option.id]: Math.max(0, Number(e.target.value) || 0) })}
                  className={cn(shell, "text-center font-bold")}
                />
              </label>
            ))}
          </div>
          <Hint field={field} />
          <Error message={error} />
        </div>
      );
    }
    default: {
      const text = typeof value === "string" ? value : "";
      const common = {
        value: text,
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
        placeholder: "placeholder" in field ? field.placeholder : undefined,
        "aria-labelledby": `label-${field.key}`,
        "aria-invalid": Boolean(error),
        name: field.key,
        id: `field-${field.key}`,
        className: cn(shell, error && "border-rose-400"),
      };
      return (
        <div>
          <Label field={field} filled={text.length > 0} />
          {field.type === "textarea" ? (
            <textarea {...common} rows={4} className={cn(common.className, "resize-y leading-loose")} />
          ) : (
            <input
              {...common}
              type={field.type === "tel" ? "tel" : "text"}
              inputMode={field.type === "tel" ? "tel" : undefined}
              autoComplete={field.autofill === "tel" ? "tel" : field.autofill === "name" ? "name" : "off"}
            />
          )}
          <Hint field={field} />
          <Error message={error} />
        </div>
      );
    }
  }
}

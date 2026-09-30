"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import type { Industry } from "@/lib/industries";
import { delay } from "@/lib/utils";

export function BookingForm({ industry }: { industry: Industry }) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const palette = industry.palette;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    await delay(900);
    setState("done");
  }

  const fieldStyle: CSSProperties = {
    background: palette.bg,
    borderColor: palette.border,
    color: palette.text,
  };

  if (state === "done") {
    return (
      <div
        className="rounded-2xl border p-8 text-center"
        style={{ background: palette.surface, borderColor: palette.border, color: palette.text }}
      >
        <CheckCircle2 className="mx-auto size-10" style={{ color: palette.primary }} aria-hidden />
        <p className="mt-3 text-base font-extrabold">درخواست شما ثبت شد</p>
        <p className="mt-2 text-[13px]" style={{ color: palette.muted }}>
          همکاران ما تا کمتر از یک ساعت کاری برای تأیید نهایی با شما تماس می‌گیرند.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-5 h-11 rounded-xl px-5 text-[13px] font-extrabold transition-opacity hover:opacity-90"
          style={{ background: palette.primary, color: palette.onPrimary }}
        >
          ثبت درخواست دیگر
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border p-6 sm:p-8"
      style={{ background: palette.surface, borderColor: palette.border }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {industry.booking.fields.map((field, index) => {
          const isLong = field.includes("توضیح") || field.includes("پیام");
          return (
            <label
              key={field}
              className={`text-[12px] font-extrabold ${isLong || index === industry.booking.fields.length - 1 ? "sm:col-span-2" : ""}`}
              style={{ color: palette.text }}
            >
              {field}
              {isLong ? (
                <textarea
                  name={`f${index}`}
                  rows={3}
                  className="mt-2 w-full rounded-xl border p-3 text-[13px] outline-none transition-colors focus:border-current"
                  style={fieldStyle}
                />
              ) : (
                <input
                  name={`f${index}`}
                  className="mt-2 h-11 w-full rounded-xl border px-3 text-[13px] outline-none transition-colors focus:border-current"
                  style={fieldStyle}
                />
              )}
            </label>
          );
        })}
      </div>
      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-5 h-12 w-full rounded-xl text-[13px] font-extrabold transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ background: palette.primary, color: palette.onPrimary }}
      >
        {state === "sending" ? "در حال ارسال…" : industry.booking.submit}
      </button>
      <p className="mt-3 text-center text-[11px]" style={{ color: palette.muted }}>
        این فرم نمونه است و اطلاعاتی ارسال یا ذخیره نمی‌شود.
      </p>
    </form>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { Check, Loader2 } from "lucide-react";
import { newsletterSchema } from "@/lib/validations";
import { cn, delay } from "@/lib/utils";

export function NewsletterForm({ variant = "section" }: { variant?: "section" | "footer" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const parsed = newsletterSchema.safeParse({ email });
    if (!parsed.success) {
      setState("error");
      setMessage(parsed.error.issues[0]?.message ?? "ایمیل معتبر نیست.");
      return;
    }
    setState("loading");
    await delay(600);
    setState("done");
    setMessage("عضویت شما ثبت شد. ماهی یک ایمیل، بدون تبلیغات.");
    setEmail("");
  }

  const footer = variant === "footer";

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className={cn("flex gap-2", footer ? "flex-col" : "flex-col sm:flex-row")}>
        <label className="sr-only" htmlFor={`newsletter-${variant}`}>
          ایمیل شما
        </label>
        <input
          id={`newsletter-${variant}`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ایمیل شما"
          dir="ltr"
          className={cn(
            "h-12 w-full rounded-[var(--radius-sm)] border px-4 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-4 focus:ring-brand-500/12",
            footer
              ? "border-white/15 bg-white/5 text-white placeholder:text-white/40"
              : "border-[var(--border-subtle)] bg-[var(--surface-sunken)]",
          )}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="h-12 shrink-0 rounded-[var(--radius-sm)] bg-brand-600 px-5 text-sm font-extrabold text-white transition-colors hover:bg-brand-500 disabled:opacity-60"
        >
          {state === "loading" ? <Loader2 className="mx-auto size-4 animate-spin" aria-hidden /> : "عضویت"}
        </button>
      </div>
      <p
        aria-live="polite"
        className={cn(
          "mt-2 min-h-5 text-[11px] font-bold",
          state === "error" ? "text-rose-400" : footer ? "text-emerald-300" : "text-emerald-600",
        )}
      >
        {state === "done" ? (
          <span className="inline-flex items-center gap-1">
            <Check className="size-3.5" aria-hidden />
            {message}
          </span>
        ) : (
          message
        )}
      </p>
    </form>
  );
}

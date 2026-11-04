"use client";

import { useId, useState, type FormEvent } from "react";
import { newsletterSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { fieldControlClass } from "@/components/ui/field";
import { FormFeedback, type FeedbackTone } from "@/components/ui/form-feedback";

export function NewsletterForm({ variant = "section" }: { variant?: "section" | "footer" }) {
  const id = useId();
  const emailId = `newsletter-${id}`;
  const feedbackId = `newsletter-feedback-${id}`;
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<FeedbackTone>("idle");
  const [message, setMessage] = useState("");
  const busy = state === "loading";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const parsed = newsletterSchema.safeParse({ email, website });
    if (!parsed.success) {
      setState("error");
      setMessage(parsed.error.issues[0]?.message ?? "ایمیل معتبر نیست.");
      event.currentTarget.querySelector<HTMLInputElement>(`[id="${emailId}"]`)?.focus();
      return;
    }
    setState("loading");
    setMessage("در حال ثبت عضویت…");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error ?? "ثبت عضویت ناموفق بود.");
      setState("success");
      setMessage("عضویت شما ثبت شد.");
      setEmail("");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "ارسال ناموفق بود.");
    }
  }

  const footer = variant === "footer";
  return (
    <form onSubmit={onSubmit} className="w-full" noValidate aria-busy={busy}>
      <div className="ks-honeypot" aria-hidden="true">
        <label htmlFor={`${id}-website`}>وب‌سایت</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={event => setWebsite(event.target.value)} />
      </div>
      <div className={cn("flex gap-2", footer ? "flex-col" : "flex-col sm:flex-row")}>
        <label className="sr-only" htmlFor={emailId}>ایمیل شما</label>
        <input
          id={emailId}
          name="email"
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder="ایمیل شما"
          dir="ltr"
          required
          maxLength={254}
          autoComplete="email"
          disabled={busy}
          aria-invalid={state === "error"}
          aria-describedby={feedbackId}
          className={cn(
            fieldControlClass,
            "mt-0",
            footer && "border-white/25 bg-white/5 text-white placeholder:text-white/70",
          )}
        />
        <Button type="submit" loading={busy} className="shrink-0">عضویت</Button>
      </div>
      <FormFeedback id={feedbackId} tone={state} compact className="mt-2">{message}</FormFeedback>
    </form>
  );
}

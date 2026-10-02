"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { contactSchema } from "@/lib/validations";
import { PRODUCTS } from "@/lib/products";
import { FieldError, Input, Label, Select, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

type Errors = Partial<Record<"name" | "phone" | "email" | "subject" | "message", string>>;

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? ""),
      subject: String(form.get("subject") ?? ""),
      message: String(form.get("message") ?? ""),
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus("error");
      setFeedback("لطفاً خطاهای فرم را برطرف کنید.");
      return;
    }

    setErrors({});
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      setFeedback("پیام شما ثبت شد. کمتر از یک روز کاری تماس می‌گیریم.");
      (event.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
      setFeedback("ارسال پیام ناموفق بود. لطفاً تلفنی تماس بگیرید.");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[var(--radius-2xl)] bg-[var(--surface-raised)] p-6 text-[color:var(--text-primary)] sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">نام و نام خانوادگی</Label>
          <Input id="name" name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} placeholder="مثلاً حسین رحمانی" />
          <FieldError>{errors.name}</FieldError>
        </div>
        <div>
          <Label htmlFor="phone">شماره تماس</Label>
          <Input id="phone" name="phone" inputMode="tel" dir="ltr" autoComplete="tel" aria-invalid={Boolean(errors.phone)} placeholder="09123456789" />
          <FieldError>{errors.phone}</FieldError>
        </div>
        <div>
          <Label htmlFor="email">
            ایمیل <span className="font-normal text-muted">(اختیاری)</span>
          </Label>
          <Input id="email" name="email" type="email" dir="ltr" autoComplete="email" placeholder="you@example.com" />
          <FieldError>{errors.email}</FieldError>
        </div>
        <div>
          <Label htmlFor="subject">موضوع</Label>
          <Select id="subject" name="subject" defaultValue="">
            <option value="" disabled>
              انتخاب کنید
            </option>
            <option value="website">طراحی وب‌سایت</option>
            <option value="custom">نرم‌افزار اختصاصی</option>
            {PRODUCTS.map((product) => (
              <option key={product.slug} value={product.slug}>
                {product.name}
              </option>
            ))}
            <option value="other">سایر</option>
          </Select>
          <FieldError>{errors.subject}</FieldError>
        </div>
      </div>

      <div className="mt-5">
        <Label htmlFor="message">توضیحات پروژه</Label>
        <Textarea id="message" name="message" rows={5} aria-invalid={Boolean(errors.message)} placeholder="کوتاه درباره کسب‌وکار و نیازتان بنویسید…" />
        <FieldError>{errors.message}</FieldError>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === "loading"}>
          {status === "loading" ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
          ارسال پیام
        </Button>
        <p className="text-3xs text-muted">اطلاعات شما محرمانه است و در اختیار هیچ شخص ثالثی قرار نمی‌گیرد.</p>
      </div>

      <p
        aria-live="polite"
        className={`mt-3 min-h-5 text-xs font-bold ${status === "success" ? "text-emerald-600" : "text-rose-600"}`}
      >
        {feedback}
      </p>
    </form>
  );
}

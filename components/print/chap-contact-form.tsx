"use client";

import { useState, type FormEvent } from "react";
import { Check, Loader2, Send } from "lucide-react";
import { PRINT_PRODUCTS } from "@/lib/print/data/products";
import { FieldError, Input, Label, Select, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

type Errors = Partial<Record<"name" | "phone" | "email" | "subject" | "message", string>>;

/** ارقام فارسی/عربی را به لاتین تبدیل می‌کند تا اعتبارسنجی سمت سرور درست کار کند */
function toLatinDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

export function ChapContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      phone: toLatinDigits(String(form.get("phone") ?? "")),
      email: String(form.get("email") ?? ""),
      subject: `کارن چاپ — ${String(form.get("subject") ?? "پیام")}`,
      message: String(form.get("message") ?? ""),
    };

    setStatus("loading");
    setFeedback("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { ok: boolean; error?: string; errors?: { message: string }[] };
      if (!response.ok || !data.ok) {
        setErrors({ message: data.error ?? "لطفاً اطلاعات را بررسی کنید." });
        setStatus("error");
        return;
      }
      setStatus("success");
      setFeedback("پیام شما ثبت شد؛ کارشناس کارن چاپ در ساعت کاری با شما تماس می‌گیرد.");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setFeedback("ارسال پیام ممکن نشد. از واتساپ یا تماس استفاده کنید.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="surface-card space-y-5 p-6 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="chap-name">نام و نام خانوادگی</Label>
          <Input id="chap-name" name="name" placeholder="مثال: علی رضایی" autoComplete="name" />
          <FieldError>{errors.name}</FieldError>
        </div>
        <div>
          <Label htmlFor="chap-phone">شماره تماس</Label>
          <Input id="chap-phone" name="phone" inputMode="tel" placeholder="۰۹۱۲۳۴۵۶۷۸۹" autoComplete="tel" />
          <FieldError>{errors.phone}</FieldError>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="chap-email">ایمیل (اختیاری)</Label>
          <Input id="chap-email" name="email" type="email" placeholder="you@example.com" dir="ltr" />
          <FieldError>{errors.email}</FieldError>
        </div>
        <div>
          <Label htmlFor="chap-subject">موضوع</Label>
          <Select id="chap-subject" name="subject" defaultValue="">
            <option value="">انتخاب کنید…</option>
            {PRINT_PRODUCTS.map((product) => (
              <option key={product.slug} value={product.name}>
                {product.name}
              </option>
            ))}
            <option value="استعلام قیمت">استعلام قیمت</option>
            <option value="پیگیری سفارش">پیگیری سفارش</option>
            <option value="همکاری سازمانی">همکاری سازمانی</option>
          </Select>
          <FieldError>{errors.subject}</FieldError>
        </div>
      </div>

      <div>
        <Label htmlFor="chap-message">توضیح سفارش یا پرسش</Label>
        <Textarea
          id="chap-message"
          name="message"
          rows={5}
          placeholder="ابعاد، کاغذ، تیراژ، زمان مورد نیاز و هر نکته‌ای که باید بدانیم…"
        />
        <FieldError>{errors.message}</FieldError>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          disabled={status === "loading"}
          className="bg-ink-900 hover:bg-ink-800 dark:bg-white dark:text-ink-900"
        >
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            <Send className="size-4" aria-hidden />
          )}
          ارسال پیام
        </Button>
        {status === "success" ? (
          <p className="flex items-center gap-2 text-2xs font-bold text-emerald-600">
            <Check className="size-4" aria-hidden />
            {feedback}
          </p>
        ) : null}
        {status === "error" ? <p className="text-2xs font-bold text-rose-600">{feedback}</p> : null}
      </div>
    </form>
  );
}

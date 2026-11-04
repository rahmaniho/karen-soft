"use client";

import { useRef, useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { PRINT_PRODUCTS } from "@/lib/print/data/products";
import { contactSchema } from "@/lib/validations";
import { FormField, Input, Select, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/card";
import { FormFeedback, type FeedbackTone } from "@/components/ui/form-feedback";

type FieldName = "name" | "phone" | "email" | "subject" | "message";
type Errors = Partial<Record<FieldName, string>>;
const fieldNames: FieldName[] = ["name", "phone", "email", "subject", "message"];

export function ChapContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<FeedbackTone>("idle");
  const [feedback, setFeedback] = useState("");

  function showErrors(next: Errors) {
    setErrors(next);
    setStatus("error");
    setFeedback("لطفاً فیلدهای مشخص‌شده را بررسی کنید.");
    requestAnimationFrame(() => {
      const first = fieldNames.find(name => next[name]);
      if (first) formRef.current?.querySelector<HTMLElement>(`#chap-${first}`)?.focus();
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: `کارن چاپ — ${String(data.get("subject") ?? "پیام")}`,
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
    };
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && fieldNames.includes(key as FieldName)) next[key as FieldName] = issue.message;
      }
      showErrors(next);
      return;
    }

    setErrors({});
    setStatus("loading");
    setFeedback("در حال ارسال پیام…");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = (await response.json()) as { ok: boolean; error?: string; errors?: { path: string; message: string }[] };
      if (!response.ok || !result.ok) {
        if (result.errors?.length) {
          const next: Errors = {};
          for (const issue of result.errors) {
            if (fieldNames.includes(issue.path as FieldName)) next[issue.path as FieldName] = issue.message;
          }
          showErrors(next);
        } else {
          setStatus("error");
          setFeedback(result.error ?? "ارسال پیام ممکن نشد. لطفاً دوباره تلاش کنید.");
        }
        return;
      }
      setStatus("success");
      setFeedback("پیام شما ثبت شد؛ کارشناس کارن چاپ در ساعت کاری با شما تماس می‌گیرد.");
      form.reset();
    } catch {
      setStatus("error");
      setFeedback("ارسال پیام ممکن نشد. از واتساپ یا تماس استفاده کنید.");
    }
  }

  const busy = status === "loading";
  return (
    <SurfaceCard>
      <form ref={formRef} onSubmit={onSubmit} className="space-y-5 p-6 sm:p-8" noValidate aria-busy={busy}>
        <div className="ks-honeypot" aria-hidden="true">
          <label htmlFor="chap-website">وب‌سایت</label>
          <input id="chap-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField id="chap-name" label="نام و نام خانوادگی" error={errors.name}>
            {props => <Input {...props} name="name" required maxLength={120} placeholder="مثال: علی رضایی" autoComplete="name" disabled={busy} />}
          </FormField>
          <FormField id="chap-phone" label="شماره تماس" error={errors.phone}>
            {props => <Input {...props} name="phone" required type="tel" inputMode="tel" placeholder="۰۹۱۲۳۴۵۶۷۸۹" autoComplete="tel" disabled={busy} />}
          </FormField>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField id="chap-email" label="ایمیل (اختیاری)" error={errors.email}>
            {props => <Input {...props} name="email" type="email" placeholder="you@example.com" dir="ltr" autoComplete="email" maxLength={254} disabled={busy} />}
          </FormField>
          <FormField id="chap-subject" label="موضوع" error={errors.subject}>
            {props => (
              <Select {...props} name="subject" defaultValue="" disabled={busy}>
                <option value="">انتخاب کنید…</option>
                {PRINT_PRODUCTS.map(product => <option key={product.slug} value={product.name}>{product.name}</option>)}
                <option value="استعلام قیمت">استعلام قیمت</option>
                <option value="پیگیری سفارش">پیگیری سفارش</option>
                <option value="همکاری سازمانی">همکاری سازمانی</option>
              </Select>
            )}
          </FormField>
        </div>
        <FormField id="chap-message" label="توضیح سفارش یا پرسش" hint="حداقل ۱۰ نویسه؛ ابعاد، کاغذ، تیراژ و زمان مورد نیاز را بنویسید." error={errors.message}>
          {props => <Textarea {...props} name="message" required rows={5} maxLength={10000} placeholder="ابعاد، کاغذ، تیراژ، زمان مورد نیاز و هر نکته‌ای که باید بدانیم…" disabled={busy} />}
        </FormField>
        <Button type="submit" variant="dark" loading={busy} icon={<Send className="size-4" aria-hidden />}>
          ارسال پیام
        </Button>
        <FormFeedback id="chap-feedback" tone={status}>{feedback}</FormFeedback>
      </form>
    </SurfaceCard>
  );
}

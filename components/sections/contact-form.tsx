"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowUpLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormFeedback } from "@/components/ui/form-feedback";
import { contactSchema } from "@/lib/validations";
import { PRODUCTS } from "@/lib/products";
import { formatNumber } from "@/lib/utils";

type Input = z.input<typeof contactSchema>;
type Output = z.output<typeof contactSchema>;

export function ContactForm() {
  const [feedback, setFeedback] = useState("");
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, reset, setError, setValue, formState: { errors, isSubmitting } } = useForm<Input, unknown, Output>({
    resolver: zodResolver(contactSchema), mode: "onChange", defaultValues: { name: "", phone: "", email: "", subject: "", message: "", website: "" },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedSubject = params.get("subject");
    const allowedSubjects = new Set(["website", "custom", "print", "other", ...PRODUCTS.map(p => p.slug)]);
    if (requestedSubject && allowedSubjects.has(requestedSubject)) {
      setValue("subject", requestedSubject, { shouldValidate: true });
    }
    const requestedProduct = params.get("product");
    if (requestedProduct !== "law-book") return;
    const product = PRODUCTS.find((item) => item.slug === requestedProduct);
    if (!product) return;
    setValue("subject", product.slug, { shouldValidate: true });
    setValue(
      "message",
      `سلام، برای خرید نسخۀ کامل «${product.name}» با قیمت ${formatNumber(product.pricingFrom)} تومان درخواست دارم. لطفاً برای هماهنگی با من تماس بگیرید.`,
      { shouldValidate: true },
    );
  }, [setValue]);

  function focusFirstError() {
    requestAnimationFrame(() => document.querySelector<HTMLElement>('form [aria-invalid="true"]')?.focus());
  }

  const submit = handleSubmit(async values => {
    setFeedback(""); setSent(false);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(values) });
      const result: { ok: boolean; error?: string; errors?: { path: string; message: string }[] } = await response.json();
      if (!response.ok) {
        if (result.errors) {
          result.errors.forEach(issue => { if (issue.path in contactSchema.shape) setError(issue.path as keyof Input, { message: issue.message }); });
          focusFirstError();
        }
        throw new Error(result.error ?? "ارسال پیام ناموفق بود. لطفاً دوباره تلاش کنید.");
      }
      reset(); setSent(true); setFeedback("پیام شما با موفقیت ارسال شد. به زودی با شما تماس می‌گیریم.");
      window.dispatchEvent(new Event("karen:success"));
    } catch (error) { setFeedback(error instanceof Error ? error.message : "خطایی رخ داد. لطفاً دوباره تلاش کنید."); }
  }, () => { setFeedback("لطفاً فیلدهای مشخص‌شده را بررسی کنید."); setSent(false); focusFirstError(); });

  return <form onSubmit={submit} noValidate aria-busy={isSubmitting} className="ks-form">
    <div className="ks-honeypot" aria-hidden="true">
      <label htmlFor="contact-website">وب‌سایت</label>
      <input id="contact-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
    </div>
    <div className="ks-form-row">
      <div className={`ks-field ${errors.name ? "has-error" : ""}`}><input id="name" placeholder=" " autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} {...register("name")} /><label htmlFor="name">نام و نام خانوادگی *</label>{errors.name && <span role="alert" id="name-error">{errors.name.message}</span>}</div>
      <div className={`ks-field ${errors.phone ? "has-error" : ""}`}><input id="phone" placeholder=" " type="tel" inputMode="tel" dir="ltr" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} {...register("phone")} /><label htmlFor="phone">شماره تماس *</label>{errors.phone && <span role="alert" id="phone-error">{errors.phone.message}</span>}</div>
    </div>
    <div className="ks-form-row">
      <div className={`ks-field ${errors.email ? "has-error" : ""}`}><input id="email" placeholder=" " type="email" dir="ltr" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} /><label htmlFor="email">ایمیل (اختیاری)</label>{errors.email && <span role="alert" id="email-error">{errors.email.message}</span>}</div>
      <div className={`ks-field ${errors.subject ? "has-error" : ""}`}><select id="subject" aria-label="موضوع" aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "subject-error" : undefined} defaultValue="" {...register("subject")}><option value="" disabled>موضوع همکاری را انتخاب کنید</option><option value="website">طراحی وب‌سایت</option><option value="custom">نرم‌افزار اختصاصی</option><option value="print">کارن چاپ</option>{PRODUCTS.map(p => <option key={p.slug} value={p.slug}>{p.name}</option>)}<option value="other">سایر موارد</option></select><label className="ks-select-label" htmlFor="subject">موضوع <span aria-hidden="true">*</span></label>{errors.subject && <span role="alert" id="subject-error">{errors.subject.message}</span>}</div>
    </div>
    <div className={`ks-field ks-field-message ${errors.message ? "has-error" : ""}`}><textarea id="message" aria-label="توضیحات پروژه" placeholder=" " rows={4} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} {...register("message")} /><label htmlFor="message">توضیحات پروژه <span aria-hidden="true">*</span></label>{errors.message && <span role="alert" id="message-error">{errors.message.message}</span>}</div>
    <div className="ks-form-submit"><Button type="submit" loading={isSubmitting} icon={<ArrowUpLeft size={18} aria-hidden />} className="ks-button ks-button-primary h-auto shadow-none">ارسال پیام</Button><span>اطلاعات شما نزد ما محفوظ می‌ماند.</span></div>
    <FormFeedback id="contact-feedback" tone={isSubmitting ? "loading" : sent ? "success" : feedback ? "error" : "idle"}>{isSubmitting ? "در حال ارسال پیام…" : feedback}</FormFeedback>
  </form>;
}

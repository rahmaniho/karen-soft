"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowUpLeft, LoaderCircle } from "lucide-react";
import { contactSchema } from "@/lib/validations";
import { PRODUCTS } from "@/lib/products";

type Input = z.input<typeof contactSchema>;
type Output = z.output<typeof contactSchema>;

export function ContactForm() {
  const [feedback, setFeedback] = useState("");
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting } } = useForm<Input, unknown, Output>({
    resolver: zodResolver(contactSchema), mode: "onChange", defaultValues: { name: "", phone: "", email: "", subject: "", message: "" },
  });

  const submit = handleSubmit(async values => {
    setFeedback(""); setSent(false);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(values) });
      const result: { ok: boolean; error?: string; errors?: { path: string; message: string }[] } = await response.json();
      if (!response.ok) {
        if (result.errors) result.errors.forEach(issue => { if (issue.path in contactSchema.shape) setError(issue.path as keyof Input, { message: issue.message }); });
        throw new Error(result.error ?? "ارسال پیام ناموفق بود. لطفاً دوباره تلاش کنید.");
      }
      reset(); setSent(true); setFeedback("پیام شما با موفقیت ارسال شد. به زودی با شما تماس می‌گیریم.");
      window.dispatchEvent(new Event("karen:success"));
    } catch (error) { setFeedback(error instanceof Error ? error.message : "خطایی رخ داد. لطفاً دوباره تلاش کنید."); }
  }, () => { setFeedback("لطفاً فیلدهای مشخص‌شده را بررسی کنید."); setSent(false); });

  return <form onSubmit={submit} noValidate aria-busy={isSubmitting} className="ks-form">
    <div className="ks-form-row">
      <div className={`ks-field ${errors.name ? "has-error" : ""}`}><input id="name" placeholder=" " autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} {...register("name")} /><label htmlFor="name">نام و نام خانوادگی *</label>{errors.name && <span role="alert" id="name-error">{errors.name.message}</span>}</div>
      <div className={`ks-field ${errors.phone ? "has-error" : ""}`}><input id="phone" placeholder=" " type="tel" inputMode="tel" dir="ltr" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} {...register("phone")} /><label htmlFor="phone">شماره تماس *</label>{errors.phone && <span role="alert" id="phone-error">{errors.phone.message}</span>}</div>
    </div>
    <div className="ks-form-row">
      <div className={`ks-field ${errors.email ? "has-error" : ""}`}><input id="email" placeholder=" " type="email" dir="ltr" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} /><label htmlFor="email">ایمیل (اختیاری)</label>{errors.email && <span role="alert" id="email-error">{errors.email.message}</span>}</div>
      <div className={`ks-field ${errors.subject ? "has-error" : ""}`}><select id="subject" aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "subject-error" : undefined} defaultValue="" {...register("subject")}><option value="" disabled>موضوع همکاری را انتخاب کنید</option><option value="website">طراحی وب‌سایت</option><option value="custom">نرم‌افزار اختصاصی</option><option value="print">کارن چاپ</option>{PRODUCTS.map(p => <option key={p.slug} value={p.slug}>{p.name}</option>)}<option value="other">سایر موارد</option></select><label className="ks-select-label" htmlFor="subject">موضوع همکاری *</label>{errors.subject && <span role="alert" id="subject-error">{errors.subject.message}</span>}</div>
    </div>
    <div className={`ks-field ks-field-message ${errors.message ? "has-error" : ""}`}><textarea id="message" placeholder=" " rows={4} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} {...register("message")} /><label htmlFor="message">کمی از پروژه‌تان بگویید *</label>{errors.message && <span role="alert" id="message-error">{errors.message.message}</span>}</div>
    <div className="ks-form-submit"><button type="submit" disabled={isSubmitting} className="ks-button ks-button-primary">{isSubmitting ? <LoaderCircle className="animate-spin" size={18} /> : <ArrowUpLeft size={18} />} ارسال پیام</button><span>اطلاعات شما نزد ما محفوظ می‌ماند.</span></div>
    <p className={`ks-form-feedback ${sent ? "success" : ""}`} role="status" aria-live="polite">{feedback}</p>
  </form>;
}

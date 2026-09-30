import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(3, "نام باید حداقل ۳ حرف باشد."),
  phone: z
    .string()
    .regex(/^0?9\d{9}$/u, "شماره موبایل معتبر نیست. نمونه: ۰۹۱۲۳۴۵۶۷۸۹"),
  email: z.string().email("ایمیل معتبر نیست.").optional().or(z.literal("")),
  subject: z.string().min(2, "موضوع را انتخاب کنید."),
  message: z.string().min(10, "توضیحات باید حداقل ۱۰ حرف باشد."),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("ایمیل معتبر نیست."),
});

export const demoRequestSchema = z.object({
  name: z.string().min(3, "نام را وارد کنید."),
  phone: z.string().regex(/^0?9\d{9}$/u, "شماره موبایل معتبر نیست."),
  product: z.string().min(1, "محصول را انتخاب کنید."),
});

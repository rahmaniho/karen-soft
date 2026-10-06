import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().max(120, "نام بیش از حد طولانی است.").min(3, "نام باید حداقل ۳ حرف باشد."),
  phone: z
    .string()
    .transform(value => value.trim().replace(/[۰-۹]/g, c => String("۰۱۲۳۴۵۶۷۸۹".indexOf(c))).replace(/[٠-٩]/g, c => String("٠١٢٣٤٥٦٧٨٩".indexOf(c))))
    .pipe(z.string().regex(/^0?9\d{9}$/u, "شماره موبایل معتبر نیست. نمونه: ۰۹۱۲۳۴۵۶۷۸۹")),
  email: z.string().trim().max(254).email("ایمیل معتبر نیست.").optional().or(z.literal("")),
  subject: z.string().trim().max(120).min(2, "موضوع را انتخاب کنید."),
  message: z.string().trim().max(10000, "توضیحات حداکثر ۱۰ هزار نویسه باشد.").min(10, "توضیحات باید حداقل ۱۰ حرف باشد."),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().max(254).email("ایمیل معتبر نیست."),
});

export const demoRequestSchema = z.object({
  name: z.string().min(3, "نام را وارد کنید."),
  phone: z.string().regex(/^0?9\d{9}$/u, "شماره موبایل معتبر نیست."),
  product: z.string().min(1, "محصول را انتخاب کنید."),
});

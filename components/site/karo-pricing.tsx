"use client";

import React, { useState } from "react";
import {
  KARO_PLANS,
  KARO_RULES,
  KARO_WEB_URL,
  calculateKaroSubscription,
  type KaroPlanId,
} from "@/lib/karo";
import { formatToman } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";

export function KaroPricing() {
  const [planId, setPlanId] = useState<KaroPlanId>("basic");
  const [users, setUsers] = useState("1");
  const [months, setMonths] = useState("12");
  let total: number | null = null;
  try {
    total = calculateKaroSubscription(planId, Number(users), Number(months));
  } catch {
    /* Show validation, never a fabricated price. */
  }
  return (
    <div className="space-y-8">
      <div className="grid gap-5 md:grid-cols-3">
        {KARO_PLANS.map((plan) => (
          <article key={plan.id} className="surface-card min-w-0 p-6">
            <h3>{plan.title}</h3>
            <p className="my-4 text-xl font-bold">
              <bdi>{formatToman(plan.price)}</bdi>
            </p>
            <p className="text-sm leading-loose">{plan.period}</p>
            <p className="text-sm leading-loose">
              سالانه برای یک کاربر: <bdi>{formatToman(plan.yearly)}</bdi>
            </p>
            <p className="text-sm leading-loose">{plan.note}</p>
          </article>
        ))}
      </div>
      <div className="surface-card space-y-5 p-6">
        <h3>محاسبه مبلغ اشتراک</h3>
        <p className="text-sm leading-loose">
          مبلغ نهایی = (هزینه ماهانه پلن + (تعداد کاربران اضافه × هزینه هر کاربر
          اضافه در ماه)) × تعداد ماه‌ها
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="grid gap-2 text-sm">
            پلن
            <select
              aria-label="پلن"
              className="min-h-11 w-full rounded-lg border border-[var(--hairline)] bg-[var(--surface)] p-3 text-[var(--text-primary)]"
              value={planId}
              onChange={(e) => setPlanId(e.target.value as KaroPlanId)}
            >
              {KARO_PLANS.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.title}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            تعداد کل کاربران
            <input
              className="min-h-11 w-full min-w-0 rounded-lg border border-[var(--hairline)] bg-[var(--surface)] p-3"
              type="number"
              min="1"
              step="1"
              value={users}
              onChange={(e) => setUsers(e.target.value)}
            />
          </label>
          <label className="grid gap-2 text-sm">
            مدت اشتراک (ماه)
            <input
              className="min-h-11 w-full min-w-0 rounded-lg border border-[var(--hairline)] bg-[var(--surface)] p-3"
              type="number"
              min="1"
              step="1"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
            />
          </label>
        </div>
        <p role="status" aria-live="polite" className="text-lg font-bold">
          {total === null
            ? "تعداد کاربران و ماه‌ها باید عدد صحیح مثبت باشد."
            : `مبلغ نهایی: ${formatToman(total)}`}
        </p>
        <ButtonLink href={KARO_WEB_URL}>ورود به کارو و بررسی اشتراک</ButtonLink>
        <p className="text-xs leading-loose">
          این ابزار برآورد تعرفه اعلام‌شده است؛ خرید و فعال‌سازی در برنامه انجام
          می‌شود. مبلغ نهایی را پیش از پرداخت بررسی کنید.
        </p>
      </div>
      <div
        className="overflow-x-auto rounded-lg border border-[var(--hairline)]"
        role="region"
        aria-label="نمونه محاسبه تعرفه کارو"
        tabIndex={0}
      >
        <table className="w-full text-right text-sm">
          <caption className="p-4 text-right font-bold">
            نمونه محاسبه اشتراک سالانه
          </caption>
          <thead>
            <tr>
              {["پلن", "کاربران", "مدت", "مبلغ نهایی"].map((heading) => (
                <th key={heading} scope="col" className="p-3">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {KARO_PLANS.flatMap((plan) =>
              [1, 5].map((count) => (
                <tr
                  key={`${plan.id}-${count}`}
                  className="border-t border-[var(--hairline)]"
                >
                  <th scope="row" className="p-3">
                    {plan.title}
                  </th>
                  <td className="p-3">{count === 1 ? "۱" : "۵"}</td>
                  <td className="p-3">۱۲ ماه</td>
                  <td className="p-3">
                    <bdi>
                      {formatToman(
                        calculateKaroSubscription(plan.id, count, 12),
                      )}
                    </bdi>
                  </td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      </div>
      <div>
        <h3 className="mb-4">قوانین خرید و تمدید اشتراک</h3>
        <ul className="list-inside list-disc space-y-3 text-sm leading-loose">
          {KARO_RULES.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

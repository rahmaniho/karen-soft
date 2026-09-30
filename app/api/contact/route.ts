import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

export async function POST(request: Request): Promise<NextResponse> {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "تعداد درخواست‌ها بیش از حد مجاز است." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "بدنه درخواست نامعتبر است." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })) },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM ?? "Karen Soft <noreply@karen-soft.ir>",
          to: [process.env.CONTACT_TO ?? "info@karen-soft.ir"],
          subject: `پیام جدید از سایت — ${parsed.data.subject}`,
          text: `نام: ${parsed.data.name}\nتلفن: ${parsed.data.phone}\nایمیل: ${parsed.data.email ?? "-"}\n\n${parsed.data.message}`,
        }),
      });
    } catch {
      return NextResponse.json({ ok: false, error: "ارسال ایمیل ناموفق بود." }, { status: 502 });
    }
  } else {
    console.info("[contact] پیام دریافت شد (حالت توسعه)");
  }

  return NextResponse.json({ ok: true });
}

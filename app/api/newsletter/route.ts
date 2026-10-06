import { rateLimited } from "@/lib/rate-limit";
import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";
export async function POST(request: Request) {
 const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
 if (rateLimited(`newsletter:${ip}`)) return NextResponse.json({error:"لطفاً یک دقیقه بعد دوباره تلاش کنید."},{status:429});
 let body: unknown;
 try {body = await request.json();} catch {return NextResponse.json({error:"درخواست نامعتبر است."},{status:400});}
 const parsed = newsletterSchema.safeParse(body);
 if (!parsed.success) return NextResponse.json({error:"ایمیل معتبر وارد کنید."},{status:422});
 const key=process.env.RESEND_API_KEY, audience=process.env.RESEND_AUDIENCE_ID;
 if (!key || !audience) return NextResponse.json({error:"عضویت خبرنامه هنوز فعال نیست. مقاله‌ها را در مجله دنبال کنید."},{status:503});
 try {
  const res=await fetch(`https://api.resend.com/audiences/${encodeURIComponent(audience)}/contacts`,{method:"POST",signal:AbortSignal.timeout(10000),headers:{authorization:`Bearer ${key}`,"content-type":"application/json"},body:JSON.stringify({email:parsed.data.email,unsubscribed:false})});
  if(!res.ok) throw new Error("provider error");
  return NextResponse.json({ok:true});
 } catch {return NextResponse.json({error:"ثبت عضویت ناموفق بود. دوباره تلاش کنید."},{status:502});}
}

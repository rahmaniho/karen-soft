export async function onRequest(context) {
  // باید env را از context استخراج کنیم
  const { request, env } = context; 
  
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  // به جای استفاده از کلید مستقیم، آن را از env می‌خوانیم
  const RESEND_API_KEY = env.RESEND_API_KEY; 
  const YOUR_EMAIL = env.YOUR_EMAIL; // ایمیل خود را هم می‌توانید به محیط ببرید

  // بقیه کدها بدون تغییر...
  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${RESEND_API_KEY}`
    },
    body: JSON.stringify({
      from: "فرم تماس <onboarding@resend.dev>",
      to: [YOUR_EMAIL],
      subject: `پیام جدید از وب‌سایت از طرف ${name}`,
      html: `<p><strong>نام:</strong> ${name}</p>
             <p><strong>ایمیل:</strong> ${email}</p>
             <p><strong>پیام:</strong><br>${message}</p>`
    })
  });

  if (resendResponse.ok) {
    return new Response("ایمیل با موفقیت ارسال شد", { status: 200 });
  } else {
    return new Response("خطا در ارسال ایمیل", { status: 500 });
  }
}

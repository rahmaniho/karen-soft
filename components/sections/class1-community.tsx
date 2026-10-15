import React from "react";
import { ArrowUpLeft, BookOpen, Calculator, FlaskConical, Gamepad2, Heart, Sprout, Users } from "lucide-react";

export const CLASS1_URL = "http://class1.karen-soft.ir/";

const subjects = [
  { icon: Calculator, title: "ریاضی با کشف و بازی", text: "شمارش تا ۲۰، جمع و تفریق، شکل‌ها، الگوها، ساعت و پول." },
  { icon: BookOpen, title: "فارسی، حرف به حرف", text: "آشنایی با الفبا، شنیدن صدای حروف و کلمه‌ها، کلمه‌سازی، خواندن و درک مطلب." },
  { icon: FlaskConical, title: "علوم و دنیای پیرامون", text: "جانداران و گیاهان، فصل‌ها و آب‌وهوا، نور و صدا، حواس و ایمنی." },
];

export function Class1Community() {
  return (
    <section className="ks-class1" id="class1-community" aria-labelledby="class1-title">
      <div className="ks-class1-intro">
        <span className="ks-class1-kicker"><Heart size={17} aria-hidden="true" /> خدمت اجتماعی کارن سافت</span>
        <h2 id="class1-title">مدرسه‌ی من؛<br />برای اولین قدم‌های بزرگ.</h2>
        <p className="ks-class1-dedication">تقدیم به کودکان کلاس اول دبستان و والدین همراهشان</p>
        <p className="ks-class1-lead">یادگیری می‌تواند یک ماجراجویی شیرین باشد. «مدرسه‌ی من | کلاس اول» یک وب‌اپ فارسی و راست‌چین برای کودکان ۶ تا ۷ ساله است؛ همراهی برای تمرین ریاضی، فارسی و علوم، در کنار خانواده.</p>
        <div className="ks-class1-stats" aria-label="محتوای آموزشی"><span><strong>۳۹</strong> درس</span><span><strong>بیش از ۱۰۰</strong> تمرین</span><span><strong>۳</strong> موضوع آموزشی</span></div>
        <a href={CLASS1_URL} className="ks-class1-link" target="_blank" rel="noopener noreferrer">ورود به مدرسه‌ی من <ArrowUpLeft size={19} aria-hidden="true" /><span className="sr-only"> (در پنجرهٔ جدید)</span></a>
        <p className="ks-class1-note">یک قدم در مسیر مسئولیت اجتماعی ما؛ برای همراهی خانواده‌ها در آغاز مسیر یادگیری کودکان.</p>
      </div>
      <div className="ks-class1-content">
        <div className="ks-class1-subjects">{subjects.map(({ icon: Icon, title, text }) => <article key={title}><Icon size={24} aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        <div className="ks-class1-extras">
          <div><Gamepad2 size={20} aria-hidden="true" /><h3>تمرین در لباس بازی</h3><p>باغ شمارش، شکارچی حروف، سازنده‌ی الگو و کارآگاه طبیعت؛ چهار بازی برای یادگیری تعاملی.</p></div>
          <div><Users size={20} aria-hidden="true" /><h3>همراهی آگاهانهٔ والدین</h3><p>بخش «ورود بزرگ‌ترها» با گزارش یادگیری و پیشنهادهای همراهی؛ پیشرفت و ستاره‌ها روی همان دستگاه ذخیره می‌شوند.</p></div>
        </div>
        <p className="ks-class1-footnote"><Sprout size={18} aria-hidden="true" /> ساخته‌شده با توجه به کودکان: دکمه‌های لمسی بزرگ و پشتیبانی از کاهش حرکت‌های نمایشی.</p>
      </div>
    </section>
  );
}

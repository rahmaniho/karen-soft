import { FileQuestion } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { StatePanel } from "@/components/ui/state-panel";

export default function NotFound() {
  return (
    <main dir="rtl" className="container-page min-h-[70vh] py-12">
      <StatePanel
        icon={<FileQuestion className="size-6" />}
        eyebrow="404 / NOT FOUND"
        title="این صفحه پیدا نشد."
        description="ممکن است آدرس تغییر کرده باشد. از بخش‌های زیر ادامه دهید."
      >
        <ButtonLink href="/">صفحه اصلی</ButtonLink>
        <ButtonLink href="/products" variant="outline">محصولات</ButtonLink>
        <ButtonLink href="/blog" variant="outline">مرکز دانش</ButtonLink>
        <ButtonLink href="/contact" variant="outline">تماس با ما</ButtonLink>
      </StatePanel>
    </main>
  );
}

import {
  Award,
  BadgeCheck,
  BookOpen,
  Check,
  Clock,
  Flag,
  Gift,
  Info,
  Newspaper,
  Package,
  Phone,
  Printer,
  Send,
  Shield,
  SlidersHorizontal,
  Stamp,
  Star,
  Timer,
  Truck,
  type LucideIcon,
} from "lucide-react";

/** نگاشت نام آیکون‌های نسخۀ قدیمی کارن چاپ به lucide */
const MAP: Record<string, LucideIcon> = {
  printer: Printer,
  flag: Flag,
  stamp: Stamp,
  book: BookOpen,
  gift: Gift,
  news: Newspaper,
  award: Award,
  sliders: SlidersHorizontal,
  shield: Shield,
  clock: Clock,
  timer: Timer,
  truck: Truck,
  bag: Package,
  check: Check,
  send: Send,
  info: Info,
  phone: Phone,
  star: Star,
  verified: BadgeCheck,
};

export function ChapIcon({ name, className }: { name: string; className?: string }) {
  const Component = MAP[name] ?? Info;
  return <Component className={className} aria-hidden />;
}

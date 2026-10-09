import {
  BookOpen,
  Boxes,
  Building2,
  Car,
  Dumbbell,
  Globe,
  Globe2,
  Home,
  Printer,
  Scale,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  UtensilsCrossed,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  BookOpen,
  Boxes,
  Building2,
  Car,
  Dumbbell,
  Globe,
  Globe2,
  Home,
  Printer,
  Scale,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  UtensilsCrossed,
  Workflow,
  Wrench,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Component = ICONS[name] ?? Sparkles;
  return <Component className={className} aria-hidden />;
}

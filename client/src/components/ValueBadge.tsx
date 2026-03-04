/*
 * ValueBadge Component - GAME OF ECOM Guide
 * Color-coded badges for 3 value layers:
 * - Knowledge (teal): Kiến thức chuyên sâu
 * - Info (amber): Thông tin độc đáo
 * - Emotion (rose): Cảm xúc chạm người dùng
 */
import { BookOpen, Lightbulb, Heart } from "lucide-react";
import type { ValueLayer } from "@/lib/bookData";

const config: Record<ValueLayer, { label: string; icon: typeof BookOpen; bg: string; text: string; border: string }> = {
  knowledge: {
    label: "Kiến thức chuyên sâu",
    icon: BookOpen,
    bg: "bg-teal-50",
    text: "text-teal-700",
    border: "border-teal-200",
  },
  info: {
    label: "Thông tin độc đáo",
    icon: Lightbulb,
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  emotion: {
    label: "Cảm xúc chạm người dùng",
    icon: Heart,
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
  },
};

interface ValueBadgeProps {
  layer: ValueLayer;
  size?: "sm" | "md";
}

export default function ValueBadge({ layer, size = "sm" }: ValueBadgeProps) {
  const c = config[layer];
  const Icon = c.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-ui font-medium border rounded-full ${c.bg} ${c.text} ${c.border} ${
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm"
      }`}
    >
      <Icon className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
      {c.label}
    </span>
  );
}

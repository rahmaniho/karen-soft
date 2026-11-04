import React, { type ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Shared surface only; interaction is opt-in so informational cards never imply a link. */
export function SurfaceCard({
  as: Component = "div",
  interactive = false,
  className,
  ...props
}: ComponentProps<"div"> & {
  as?: "article" | "div" | "section";
  interactive?: boolean;
}) {
  return (
    <Component
      className={cn("surface-card", interactive && "surface-card-interactive", className)}
      {...props}
    />
  );
}

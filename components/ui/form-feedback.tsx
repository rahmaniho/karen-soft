"use client";

import React, { type ReactNode } from "react";
import { AlertCircle, CheckCircle2, Info, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type FeedbackTone = "idle" | "loading" | "success" | "error" | "info";
const icons = { loading: LoaderCircle, success: CheckCircle2, error: AlertCircle, info: Info };

/** A stable live region: mount it before the request, then update its content. */
export function FormFeedback({
  tone = "idle",
  children,
  id,
  compact = false,
  className,
}: {
  tone?: FeedbackTone;
  children?: ReactNode;
  id?: string;
  compact?: boolean;
  className?: string;
}) {
  const Icon = tone === "idle" ? null : icons[tone];
  return (
    <div
      id={id}
      role={tone === "error" ? "alert" : "status"}
      aria-live="polite"
      aria-atomic="true"
      data-tone={tone}
      className={cn("ui-feedback", compact && "ui-feedback-compact", className)}
    >
      {Icon ? <Icon aria-hidden className={cn("mt-0.5 size-4 shrink-0", tone === "loading" && "motion-safe:animate-spin")} /> : null}
      <span>{children}</span>
    </div>
  );
}

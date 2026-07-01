import * as React from "react";
import { cn } from "@/lib/utils";

export function DashboardCard({
  label,
  value,
  icon,
  tone = "default",
  className,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  tone?: "default" | "warning" | "good";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-white p-4 shadow-sm",
        className
      )}
    >
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted">
        {icon}
        {label}
      </div>
      <div
        className={cn(
          "mt-1.5 text-xl font-bold",
          tone === "warning" && "text-amber-600",
          tone === "good" && "text-emerald-600",
          tone === "default" && "text-navy"
        )}
      >
        {value}
      </div>
    </div>
  );
}

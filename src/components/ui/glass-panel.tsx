import * as React from "react";
import { cn } from "@/lib/utils";

export function GlassPanel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/55 bg-white/72 shadow-[0_26px_80px_-52px_rgba(180,83,9,0.55)] backdrop-blur-xl",
        className
      )}
      {...props}
    />
  );
}

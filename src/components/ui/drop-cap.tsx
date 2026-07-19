import * as React from "react";
import { cn } from "@/lib/utils";

/** Wraps the opening paragraph of long-form editorial copy with a large serif drop cap. */
export function DropCap({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("editorial-drop-cap leading-relaxed", className)} {...props} />;
}

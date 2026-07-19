import * as React from "react";
import { cn } from "@/lib/utils";

/** Magazine-style gold serif pull-quote for exam tips and key callouts. */
export function PullQuote({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <blockquote className={cn("editorial-pull-quote", className)} {...props}>
      {children}
    </blockquote>
  );
}

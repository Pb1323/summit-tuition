import * as React from "react";
import { cn } from "@/lib/utils";

export interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description?: string;
}

export function FeatureGrid({
  items,
  columns = 3,
  className,
}: {
  items: FeatureItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-5 sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
        columns === 4 && "lg:grid-cols-4",
        className
      )}
    >
      {items.map((item) => (
        <div key={item.title} className="rounded-2xl border border-line bg-white p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy/5 text-navy">
            {item.icon}
          </div>
          <h3 className="mt-3 text-sm font-semibold text-navy">{item.title}</h3>
          {item.description && (
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}

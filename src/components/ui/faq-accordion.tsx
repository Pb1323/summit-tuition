"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQItem } from "@/types/faq";

export function FAQAccordion({ items, className }: { items: FAQItem[]; className?: string }) {
  return (
    <AccordionPrimitive.Root type="single" collapsible className={cn("space-y-3", className)}>
      {items.map((item, i) => (
        <AccordionPrimitive.Item
          key={item.question}
          value={`item-${i}`}
          className="overflow-hidden rounded-2xl border border-line bg-white"
        >
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-navy">
              {item.question}
              <Plus className="h-4 w-4 shrink-0 text-gold-dark transition-transform duration-200 group-data-[state=open]:rotate-45" />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden px-6 text-sm leading-relaxed text-muted data-[state=closed]:animate-[accordion-up_0.2s_ease] data-[state=open]:animate-[accordion-down_0.2s_ease]">
            <p className="pb-5">{item.answer}</p>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}

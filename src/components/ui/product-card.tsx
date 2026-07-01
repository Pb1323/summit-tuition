import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { LadderProduct } from "@/types/product";

export function ProductCard({ product }: { product: LadderProduct }) {
  return (
    <Link
      href={product.href}
      className={cn(
        "group flex flex-col rounded-2xl border bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-16px_rgba(15,43,61,0.25)]",
        product.featured ? "border-gold/50 shadow-sm" : "border-line"
      )}
    >
      {product.featured && (
        <Badge variant="gold" className="mb-3 w-fit">
          Popular
        </Badge>
      )}
      <h3 className="text-lg font-semibold text-navy">{product.name}</h3>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted">
        {product.audience}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{product.benefit}</p>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <span className="text-sm font-bold text-navy">{product.price}</span>
        <span className="flex items-center gap-1 text-sm font-semibold text-gold-dark">
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

import { ProductCard } from "@/components/ui/product-card";
import { PRODUCT_LADDER } from "@/data/products";

export function ProductLadder() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {PRODUCT_LADDER.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}

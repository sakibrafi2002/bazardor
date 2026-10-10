import type { Product } from "@/types";
import ProductCard from "./ProductCard";

// The responsive grid used by Home AND the Category page:
//   mobile (default)  -> 1 column
//   sm  (>= 640px)    -> 2 columns (tablet)
//   lg  (>= 1024px)   -> 3 columns (desktop)
export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        // `key` helps React track each item in a list. It must be unique.
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
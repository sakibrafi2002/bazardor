import type { Product } from "@/types";
import ProductGrid from "@/components/product/ProductGrid";

interface Props {
  title: React.ReactNode; // ReactNode lets us color the ▲ ▼ arrows separately
  subtitle?: string;
  products: Product[];
  id?: string; // used by the hero CTA anchor (#সব-পণ্য)
}

export default function ProductSection({ title, subtitle, products, id }: Props) {
  // Nothing to show -> don't render an empty heading
  if (products.length === 0) return null;

  return (
    // scroll-mt-6: when the page scrolls to this section via the anchor,
    // leave a little space above it instead of touching the screen's top edge
    <section id={id} className="scroll-mt-6">
      <h2 className="flex items-center gap-2 text-xl font-extrabold sm:text-2xl">
        {title}
      </h2>
      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}

      <div className="mt-4">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
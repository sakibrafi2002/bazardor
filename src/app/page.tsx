import Hero from "@/components/home/Hero";
import ProductSection from "@/components/home/ProductSection";
import { getProducts } from "@/lib/api";
import { formatNumber } from "@/lib/format";
import { getTopFallers, getTopRisers } from "@/lib/product-utils";

// Server component: fetches data on the server, sends finished HTML.
export default async function HomePage() {
  // One request gets all 33 products. We then derive the risers and
  // fallers from it, so we don't need extra API calls.
  const products = await getProducts();

  const risers = getTopRisers(products, 6);
  const fallers = getTopFallers(products, 6);

  return (
    <div className="space-y-10">
      <Hero />

      {/* Section A: top 6 price RISES. The ▲ is red (price up = red). */}
      <ProductSection
        title={
          <>
            <span className="text-up text-base">▲</span> আজ দাম বেড়েছে
          </>
        }
        products={risers}
      />

      {/* Section B: top 6 price FALLS. The ▼ is green (price down = green). */}
      <ProductSection
        title={
          <>
            <span className="text-down text-base">▼</span> আজ দাম কমেছে
          </>
        }
        products={fallers}
      />

      {/* Section C: everything. id="সব-পণ্য" is the target of the hero button */}
      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`মোট ${formatNumber(products.length)}টি পণ্য দেখানো হচ্ছে`}
        products={products}
      />
    </div>
  );
}
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/product/Breadcrumb";
import MarketTable from "@/components/product/MarketTable";
import PriceSummaryCards from "@/components/product/PriceSummaryCards";
import ProductSummary from "@/components/product/ProductSummary";
import { getProductBySlug } from "@/lib/api";
import { getPriceSummary } from "@/lib/product-utils";
import { requireSession } from "@/lib/session";

// `params` is a Promise in Next.js 15+, so we await it.
type Props = { params: Promise<{ slug: string }> };

// Browser tab title: "বাটাম সাইজ চাল | বাজার দর"
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product ? product.nameBn : "পণ্য পাওয়া যায়নি" };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  // 1) PROTECTED ROUTE: no valid login -> redirect to /signin and remember
  //    this page, so the user returns here after signing in.
  //    This runs BEFORE we look for the product on purpose.
  await requireSession(`/product/${slug}`);

  // 2) Find the product. Unknown slug -> 404 page (see not-found.tsx).
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  // 3) Calculate lowest / highest / average from the product's markets
  const { min, max, avg } = getPriceSummary(product);

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "হোম", href: "/" },
          { label: product.categoryNameBn, href: `/category/${product.category}` },
          { label: product.nameBn }, // current page: no link
        ]}
      />

      <ProductSummary product={product} />

      {/* One white panel holding both the summary cards and the market table,
          like the Figma */}
      <div className="space-y-8 rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:p-6">
        <PriceSummaryCards min={min} max={max} avg={avg} unit={product.unit} />
        <MarketTable markets={product.markets} />
      </div>
    </div>
  );
}
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";

// Next.js shows this file AUTOMATICALLY while page.tsx is fetching data,
// then swaps in the real page. No extra code needed in page.tsx.
// The filename must be exactly "loading.tsx".

// A helper that draws a section heading placeholder + 6 skeleton cards
function SkeletonSection() {
  return (
    <section>
      <div className="h-7 w-48 animate-pulse rounded bg-slate-200" />
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Array.from({ length: 6 }) makes 6 items to loop over */}
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

export default function Loading() {
  return (
    <div className="space-y-10" aria-busy="true" aria-label="লোড হচ্ছে">
      {/* Hero placeholder */}
      <div className="h-64 animate-pulse rounded-3xl bg-slate-200/70" />
      <SkeletonSection />
      <SkeletonSection />
      <SkeletonSection />
    </div>
  );
}
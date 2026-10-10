// A gray "ghost" version of ProductCard, with the same size and layout,
// shown while real data loads. `animate-pulse` makes it fade in and out.
// Using the same shape as the real card prevents the page from jumping
// when the real cards replace the skeletons.
export default function ProductCardSkeleton() {
  return (
    <div
      className="animate-pulse rounded-2xl border border-black/5 bg-white p-4 shadow-sm"
      aria-hidden
    >
      <div className="flex items-center gap-3">
        <div className="size-12 rounded-xl bg-slate-200" />
        <div className="space-y-2">
          <div className="h-4 w-28 rounded bg-slate-200" />
          <div className="h-3 w-16 rounded bg-slate-200" />
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div className="space-y-2">
          <div className="h-3 w-14 rounded bg-slate-200" />
          <div className="h-6 w-24 rounded bg-slate-200" />
        </div>
        <div className="h-6 w-16 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}
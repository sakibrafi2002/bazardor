// Skeleton shown while the product page loads. It copies the real layout:
// breadcrumb, summary card, then a panel with 3 small cards and table rows.
export default function ProductLoading() {
  return (
    <div className="animate-pulse space-y-6" aria-busy="true" aria-label="লোড হচ্ছে">
      {/* Breadcrumb */}
      <div className="h-4 w-56 rounded bg-slate-200" />

      {/* Summary card */}
      <div className="h-36 rounded-2xl bg-slate-200/70" />

      {/* Panel */}
      <div className="space-y-6 rounded-2xl border border-black/5 bg-white p-5 sm:p-6">
        <div className="h-6 w-40 rounded bg-slate-200" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 rounded-2xl bg-slate-200/70" />
          ))}
        </div>

        <div className="h-6 w-48 rounded bg-slate-200" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 rounded bg-slate-200/70" />
          ))}
        </div>
      </div>
    </div>
  );
}
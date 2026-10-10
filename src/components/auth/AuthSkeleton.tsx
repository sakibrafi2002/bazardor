// Gray placeholder shown while an auth page loads (used by loading.tsx).
// `fields` = how many input boxes to draw (2 for sign in, 4 for sign up).
export default function AuthSkeleton({ fields }: { fields: number }) {
  return (
    <div
      className="mx-auto w-full max-w-md animate-pulse py-4 sm:py-8"
      aria-busy="true"
      aria-label="লোড হচ্ছে"
    >
      {/* Title + subtitle */}
      <div className="mx-auto h-8 w-48 rounded bg-slate-200" />
      <div className="mx-auto mt-3 h-4 w-72 max-w-full rounded bg-slate-200" />

      {/* Card */}
      <div className="mt-6 space-y-5 rounded-2xl border border-black/5 bg-white p-5 sm:p-6">
        {Array.from({ length: fields }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-20 rounded bg-slate-200" />
            <div className="h-10 rounded-lg bg-slate-200" />
          </div>
        ))}
        <div className="h-11 rounded-lg bg-slate-200" />
        <div className="h-11 rounded-lg bg-slate-200/70" />
      </div>
    </div>
  );
}
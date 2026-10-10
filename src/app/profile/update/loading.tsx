export default function UpdateProfileLoading() {
  return (
    <div
      className="mx-auto w-full max-w-md animate-pulse"
      aria-busy="true"
      aria-label="লোড হচ্ছে"
    >
      <div className="h-8 w-52 rounded bg-slate-200" />
      <div className="mt-2 h-4 w-64 max-w-full rounded bg-slate-200" />
      <div className="mt-5 space-y-5 rounded-2xl border border-black/5 bg-white p-5 sm:p-6">
        <div className="space-y-2">
          <div className="h-4 w-12 rounded bg-slate-200" />
          <div className="h-10 rounded-lg bg-slate-200" />
        </div>
        <div className="h-11 rounded-lg bg-slate-200" />
      </div>
    </div>
  );
}
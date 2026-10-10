// Skeleton for the profile page: heading, avatar card, info card.
export default function ProfileLoading() {
  return (
    <div
      className="mx-auto w-full max-w-2xl animate-pulse space-y-5"
      aria-busy="true"
      aria-label="লোড হচ্ছে"
    >
      <div>
        <div className="h-8 w-48 rounded bg-slate-200" />
        <div className="mt-2 h-4 w-64 max-w-full rounded bg-slate-200" />
      </div>
      <div className="h-32 rounded-2xl bg-slate-200/70" />
      <div className="h-64 rounded-2xl bg-slate-200/70" />
    </div>
  );
}
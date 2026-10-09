// TEMPORARY page just to prove Steps 1 and 2 work. We replace it in Step 5.
import { getProducts } from "@/lib/api";
import { formatChange, formatNumber, formatPrice, getPerUnitLabel } from "@/lib/format";

// This is a Server Component (the default in the App Router), so it can be
// async and fetch data directly. No useEffect or useState needed.
export default async function HomePage() {
  const products = await getProducts();
  const first = products[0];

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-3xl font-bold text-brand">বাজার দর ✅</h1>
      <p className="mt-2">মোট {formatNumber(products.length)}টি পণ্য লোড হয়েছে</p>
      <p className="mt-2">
        {first.image} {first.nameBn} · {getPerUnitLabel(first.unit)} ·{" "}
        {formatPrice(first.today)}{" "}
        <span className="text-up">{formatChange(first.change)}</span>
      </p>
    </main>
  );
}
import Link from "next/link";
import type { Product } from "@/types";
import {
  CHANGE_STYLES,
  formatChange,
  formatNumber,
  getPerUnitLabel,
} from "@/lib/format";

// A pure display component: give it a product, it draws a card.
// No "use client" needed because there is no state or click handler of our own.
export default function ProductCard({ product }: { product: Product }) {
  // Pick red / green / gray classes depending on up / down / flat
  const style = CHANGE_STYLES[product.change.dir];

  return (
    // The WHOLE card is a link to the details page: /product/<slug>
    // prefetch={false}: the details page is protected, so we don't want
    // Next.js to preload dozens of them as soon as the cards appear.
    <Link
      href={`/product/${product.slug}`}
      prefetch={false}
      className="block rounded-2xl border border-black/5 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      {/* ---------- Top row: emoji + name + unit ---------- */}
      <div className="flex items-center gap-3">
        {/* Emoji inside a soft gray rounded square */}
        <span
          className="grid size-12 shrink-0 place-items-center rounded-xl bg-slate-100 text-2xl"
          aria-hidden
        >
          {product.image}
        </span>

        <div>
          <h3 className="font-bold leading-snug">{product.nameBn}</h3>
          {/* "প্রতি কেজি", "প্রতি লিটার", "প্রতি ডজন" or "প্রতি পিস" */}
          <p className="text-xs text-slate-500">
            {getPerUnitLabel(product.unit)}
          </p>
        </div>
      </div>

      {/* ---------- Bottom row: price (left) + change badge (right) ---------- */}
      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-slate-500">আজকের দাম</p>
          <p>
            {/* Big Bengali number, e.g. "১,৮৫০" */}
            <span className="text-2xl font-extrabold">
              {formatNumber(product.today)}
            </span>{" "}
            <span className="text-sm text-slate-700">টাকা</span>
          </p>
        </div>

        {/* Badge: "▲ ২.১%" red, "▼ ২.৯%" green, "— ০.০%" gray */}
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-bold ${style.bg} ${style.text}`}
        >
          {formatChange(product.change)}
        </span>
      </div>
    </Link>
  );
}
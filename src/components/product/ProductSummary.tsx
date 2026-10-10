import Link from "next/link";
import type { Product } from "@/types";
import {
  CHANGE_STYLES,
  formatChange,
  formatNumber,
  formatPrice,
  getUnitLabel,
} from "@/lib/format";

export default function ProductSummary({ product }: { product: Product }) {
  // red / green / gray classes for this product's direction
  const style = CHANGE_STYLES[product.change.dir];

  // How many taka the price moved since yesterday (always positive here;
  // the verb "বেড়েছে / কমেছে" carries the direction).
  const diff = Math.abs(product.today - product.yesterday);

  // The market summary line under the title
  let changeLine: React.ReactNode;
  if (product.change.dir === "up") {
    changeLine = (
      <>
        গতকালের তুলনায় আজ দাম <strong>বেড়েছে</strong> · {formatPrice(diff)}
      </>
    );
  } else if (product.change.dir === "down") {
    changeLine = (
      <>
        গতকালের তুলনায় আজ দাম <strong>কমেছে</strong> · {formatPrice(diff)}
      </>
    );
  } else {
    changeLine = <>গতকালের তুলনায় আজ দামের কোনো পরিবর্তন হয়নি</>;
  }

  return (
    // Mobile: stacked (flex-col). sm and up: info on the left, price box on the right.
    <section className="flex flex-col gap-5 rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
      {/* ---------- Left: emoji + title + text ---------- */}
      <div className="flex items-center gap-4">
        <span
          className="grid size-16 shrink-0 place-items-center rounded-2xl bg-slate-100 text-4xl sm:size-20 sm:text-5xl"
          aria-hidden
        >
          {product.image}
        </span>

        <div>
          <h1 className="text-2xl font-extrabold sm:text-3xl">
            {product.nameBn}
          </h1>

          {/* "প্রতি কেজি · চাল" */}
          <p className="mt-0.5 text-sm text-slate-500">
            প্রতি {getUnitLabel(product.unit)} · {product.categoryNameBn}
          </p>

          <p className="mt-1 text-sm text-slate-800">{changeLine}</p>

          {/* Category tag: a small pill that links to the category page */}
          <div className="mt-2 flex flex-wrap gap-2">
            <Link
              href={`/category/${product.category}`}
              className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand hover:bg-brand/15"
            >
              <span aria-hidden>{product.categoryIcon}</span>
              {product.categoryNameBn}
            </Link>
          </div>
        </div>
      </div>

      {/* ---------- Right: highlighted "today's price" box ---------- */}
      <div className="rounded-2xl bg-slate-100 px-8 py-4 text-center sm:min-w-44">
        <p className="text-xs text-slate-500">আজকের দাম</p>
        <p className="text-4xl font-extrabold leading-tight">
          {formatNumber(product.today)}
        </p>
        <p className="text-xs text-slate-500">
          টাকা / {getUnitLabel(product.unit)}
        </p>
        {/* ▲ ৩.১% (red) / ▼ ২.৯% (green) / — ০.০% (gray) */}
        <p className={`mt-1 text-sm font-bold ${style.text}`}>
          {formatChange(product.change)}
        </p>
      </div>
    </section>
  );
}
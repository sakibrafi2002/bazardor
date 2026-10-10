"use client";
// Client component: it keeps the chosen sort option in state (useState).

import { useMemo, useState } from "react";
import { Select, SelectItem } from "@heroui/react";
import { FiChevronDown } from "react-icons/fi";
import ProductGrid from "@/components/product/ProductGrid";
import NotFoundView from "@/components/ui/NotFoundView";
import { formatNumber } from "@/lib/format";
import { sortProducts } from "@/lib/product-utils";
import type { Product, SortOption } from "@/types";

// The three dropdown choices. `value` is what we store in state,
// `label` is what the user reads.
const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

export default function CategoryProducts({
  products,
}: {
  products: Product[];
}) {
  // Current sort choice. Starts at "default" (the API's original order).
  const [sort, setSort] = useState<SortOption>("default");

  // useMemo = "only re-sort when `products` or `sort` actually changes",
  // not on every render. sortProducts compares REAL NUMBERS (product.today),
  // so ৯৯ correctly comes before ১৪৮.
  const sorted = useMemo(() => sortProducts(products, sort), [products, sort]);

  /* ---------- Empty state: valid category, but no products ---------- */
  if (products.length === 0) {
    return (
      <NotFoundView
        emoji="🔍"
        title="কোনো পণ্য পাওয়া যায়নি"
        message="এই ক্যাটাগরিতে এখন কোনো পণ্য নেই।"
      />
    );
  }

  return (
    <>
      {/* ---------- Sort bar ---------- */}
      <div className="flex items-center justify-end gap-3 rounded-2xl border border-black/5 bg-white p-3 shadow-sm sm:p-4">
        <span className="text-sm text-slate-600">সাজান</span>

        <Select
          aria-label="পণ্য সাজান" // required for accessibility (no visible label inside)
          size="sm"
          variant="bordered"
          radius="md"
          className="w-48 sm:w-56"
          // HeroUI wants a collection of selected keys, so we wrap it: [sort]
          selectedKeys={[sort]}
          // Prevents the user from "un-selecting" and leaving the box empty
          disallowEmptySelection
          // The chevron icon on the right of the dropdown
          selectorIcon={<FiChevronDown aria-hidden />}
          onSelectionChange={(keys) => {
            // `keys` is a Set of selected keys (or the string "all").
            // We only allow one choice, so we take the first item.
            if (keys === "all") return;
            const value = Array.from(keys)[0] as SortOption | undefined;
            if (value) setSort(value);
          }}
        >
          {SORT_OPTIONS.map((option) => (
            // `key` must equal the value we store in state
            <SelectItem key={option.value}>{option.label}</SelectItem>
          ))}
        </Select>
      </div>

      {/* ---------- Result count ---------- */}
      <p className="mt-4 text-sm text-slate-500">
        মোট {formatNumber(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* ---------- Product cards (same card + grid as Home) ---------- */}
      <div className="mt-3">
        <ProductGrid products={sorted} />
      </div>
    </>
  );
}
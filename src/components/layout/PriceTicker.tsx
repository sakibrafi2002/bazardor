import Link from "next/link";
import type { Product } from "@/types";
import {
  CHANGE_STYLES,
  formatChange,
  formatNumber,
  getUnitLabel,
} from "@/lib/format";

// One group of ticker items. We render this group twice (see below).
function TickerItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((p) => (
        <li key={p.id} className="shrink-0 border-r border-black/5">
          <Link
            href={`/product/${p.slug}`}
            // The details page is protected. Without this, Next.js would
            // prefetch ~66 protected links the moment the page loads.
            prefetch={false}
            className="flex items-center gap-2 whitespace-nowrap px-4 py-2 text-xs hover:bg-black/5 sm:text-sm"
          >
            <span aria-hidden>{p.image}</span>
            <span className="font-semibold">{p.nameBn}</span>
            <span className="text-slate-600">
              {/* e.g. "১৪৮ টাকা/কেজি" */}
              {formatNumber(p.today)} টাকা/{getUnitLabel(p.unit)}
            </span>
            {/* e.g. "▲ ২.১%" in red, "▼ ২.৯%" in green, "— ০.০%" in gray */}
            <span className={`font-bold ${CHANGE_STYLES[p.change.dir].text}`}>
              {formatChange(p.change)}
            </span>
          </Link>
        </li>
      ))}
    </>
  );
}

export default function PriceTicker({ products }: { products: Product[] }) {
  return (
    <div
      className="overflow-hidden border-b border-black/5 bg-white/70"
      // Screen readers: describe the strip once instead of reading 66 items
      role="region"
      aria-label="আজকের দামের টিকার"
    >
      {/*
        w-max          -> the list is as wide as its content (not squeezed)
        animate-marquee-> moves left forever (defined in globals.css)
        hover:[...]    -> pauses while the mouse is over it, so you can click
        motion-reduce  -> respects users who turned OFF animations in their OS
      */}
      <ul className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        {/* Copy 1 */}
        <TickerItems products={products} />
        {/* Copy 2: identical, hidden from screen readers. It exists only so
            the loop has no empty gap when copy 1 scrolls away. */}
        <span className="contents" aria-hidden>
          <TickerItems products={products} />
        </span>
      </ul>
    </div>
  );
}
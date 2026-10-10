import type { Market } from "@/types";
import { formatPrice } from "@/lib/format";
import { getMarketAverage } from "@/lib/product-utils";

export default function MarketTable({ markets }: { markets: Market[] }) {
  return (
    <section>
      <h2 className="text-lg font-extrabold sm:text-xl">
        বাজারভিত্তিক আজকের দাম
      </h2>

      {/* =============== DESKTOP / TABLET: a real table =============== */}
      {/* `hidden md:block` = invisible on mobile, visible from 768px up.
          overflow-x-auto is a safety net: if the screen is a bit narrow the
          table scrolls inside its box instead of breaking the page. */}
      <div className="mt-4 hidden overflow-x-auto rounded-2xl border border-black/5 md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/10 text-slate-500">
              <th className="px-4 py-3 text-left font-semibold">বাজার</th>
              <th className="px-4 py-3 text-left font-semibold">বিভাগ</th>
              <th className="px-4 py-3 text-right font-semibold">সর্বনিম্ন</th>
              <th className="px-4 py-3 text-right font-semibold">সর্বাধিক</th>
              <th className="px-4 py-3 text-right font-semibold">গড়</th>
            </tr>
          </thead>
          <tbody>
            {markets.map((m) => (
              // even:bg-slate-50 gives the striped rows seen in the Figma
              <tr
                key={`${m.market}-${m.division}`}
                className="border-b border-black/10 last:border-b-0 even:bg-slate-50"
              >
                <td className="px-4 py-3 font-medium">{m.market}</td>
                <td className="px-4 py-3 text-slate-600">{m.division}</td>
                <td className="px-4 py-3 text-right">{formatPrice(m.min)}</td>
                <td className="px-4 py-3 text-right">{formatPrice(m.max)}</td>
                {/* Average of this market: (min + max) / 2, shown bold */}
                <td className="px-4 py-3 text-right font-bold">
                  {formatPrice(getMarketAverage(m.min, m.max))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =============== MOBILE: one card per market =============== */}
      {/* `md:hidden` = visible on mobile only. A 5-column table is
          unreadable on a phone, so each row becomes its own small card. */}
      <ul className="mt-4 space-y-3 md:hidden">
        {markets.map((m) => (
          <li
            key={`${m.market}-${m.division}`}
            className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm"
          >
            <div className="flex items-baseline justify-between gap-2">
              <p className="font-bold">{m.market}</p>
              <p className="text-xs text-slate-500">{m.division}</p>
            </div>

            {/* Three labelled numbers side by side */}
            <dl className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
              <div>
                <dt className="text-xs text-slate-500">সর্বনিম্ন</dt>
                <dd className="mt-0.5">{formatPrice(m.min)}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">সর্বাধিক</dt>
                <dd className="mt-0.5">{formatPrice(m.max)}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">গড়</dt>
                <dd className="mt-0.5 font-bold">
                  {formatPrice(getMarketAverage(m.min, m.max))}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </section>
  );
}
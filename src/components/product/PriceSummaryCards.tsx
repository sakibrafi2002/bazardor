import { formatNumber, getUnitLabel } from "@/lib/format";
import type { Unit } from "@/types";

interface Props {
  min: number;
  max: number;
  avg: number;
  unit: Unit;
}

export default function PriceSummaryCards({ min, max, avg, unit }: Props) {
  // Describe the three cards as data, then loop over them.
  // This avoids copy-pasting the same JSX three times.
  const cards = [
    {
      label: "সর্বনিম্ন দাম",
      value: min,
      caption: "সবচেয়ে কম দামের বাজার",
      color: "text-down", // green
    },
    {
      label: "সর্বাধিক দাম",
      value: max,
      caption: "সবচেয়ে বেশি দামের বাজার",
      color: "text-up", // red
    },
    {
      label: "গড় দাম",
      value: avg,
      caption: `প্রতি ${getUnitLabel(unit)}-এর হিসাবে`,
      color: "text-down", // green
    },
  ];

  return (
    <section>
      <h2 className="text-lg font-extrabold sm:text-xl">দামের সারসংক্ষেপ</h2>

      {/* Mobile: cards stacked. sm and up: three in a row. */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-black/5 bg-slate-50/60 p-4"
          >
            <p className="text-xs text-slate-600">{card.label}</p>
            <p className={`mt-1 ${card.color}`}>
              <span className="text-3xl font-extrabold">
                {formatNumber(card.value)}
              </span>{" "}
              <span className="text-sm font-semibold">টাকা</span>
            </p>
            <p className="mt-1 text-xs text-slate-500">{card.caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
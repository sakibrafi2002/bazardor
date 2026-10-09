import type { Product, SortOption } from "@/types";

/**
 * Section A of Home: the products whose price ROSE the most.
 * 1) keep only dir === "up"   2) biggest % first   3) take the first 6
 */
export function getTopRisers(products: Product[], count = 6): Product[] {
  return products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, count);
}

/**
 * Section B of Home: the products whose price FELL the most.
 * pct is NEGATIVE for fallers (e.g. -12.4), so the most negative comes first
 * when we sort ascending (a - b).
 */
export function getTopFallers(products: Product[], count = 6): Product[] {
  return products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, count);
}

/**
 * Category page sorting (challenge C1).
 * We compare `today`, which is a real NUMBER, so 99 < 148 is correct.
 * (Comparing strings would wrongly say "99" > "148" because "9" > "1".)
 *
 * We copy the array with [...products] first, because .sort() changes the
 * original array and React state must never be mutated directly.
 */
export function sortProducts(
  products: Product[],
  sort: SortOption
): Product[] {
  if (sort === "price-asc") return [...products].sort((a, b) => a.today - b.today);
  if (sort === "price-desc") return [...products].sort((a, b) => b.today - a.today);
  return products; // "default" keeps the API's original order
}

/**
 * Numbers for the "দামের সারসংক্ষেপ" cards on the details page:
 *  - lowest price in any market  -> smallest `min`
 *  - highest price in any market -> largest `max`
 *  - average -> today's price (matches the Figma: batam chal avg = 66 = today)
 */
export function getPriceSummary(product: Product) {
  return {
    min: Math.min(...product.markets.map((m) => m.min)),
    max: Math.max(...product.markets.map((m) => m.max)),
    avg: product.today,
  };
}

/** Average of ONE market row: (min + max) / 2, e.g. (60 + 67) / 2 = 63.5 */
export function getMarketAverage(min: number, max: number): number {
  return (min + max) / 2;
}
// These types describe EXACTLY what the API returns, so TypeScript can warn us
// if we ever use a wrong field name (for example product.price instead of product.today).

// Direction of the price change compared to yesterday
export type ChangeDir = "up" | "down" | "flat";

export interface PriceChange {
  dir: ChangeDir; // "up" = price rose, "down" = fell, "flat" = unchanged
  pct: number;    // percentage, e.g. 2.1 or -2.9 (negative when it fell)
}

// One row of the "বাজারভিত্তিক আজকের দাম" table
export interface Market {
  market: string;   // market name, e.g. "কারওয়ান বাজার"
  division: string; // division, e.g. "ঢাকা"
  min: number;      // lowest price in this market
  max: number;      // highest price in this market
}

// English unit values that the API sends
export type Unit = "kg" | "litre" | "dozen" | "piece";

export interface Product {
  id: number;
  slug: string;             // used in the URL: /product/sorno-machi-chal
  nameBn: string;           // Bangla name
  category: string;         // category slug, e.g. "chal"
  categoryNameBn: string;   // e.g. "চাল"
  categoryIcon: string;     // category emoji
  unit: Unit;
  image: string;            // the product's own emoji, e.g. "🍚"
  today: number;            // today's price (a plain number!)
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: PriceChange;
  markets: Market[];
}

export interface Category {
  id: string;
  slug: string;   // "chal", "dal", "tel", ...
  nameBn: string; // "চাল", "ডাল", ...
  icon: string;   // emoji
}

// The 3 sort choices of the category page dropdown
export type SortOption = "default" | "price-asc" | "price-desc";
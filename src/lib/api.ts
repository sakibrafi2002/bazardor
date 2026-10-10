import type { Category, Product } from "@/types";

// Read the base URL from .env.local. The fallback keeps things working
// even if the variable is missing (for example on a fresh deployment).
// const BASE_URL =
//   process.env.NEXT_PUBLIC_API_BASE_URL ??
//   "https://api.api-store.workers.dev/api/bazardor";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://openapi.programming-hero.com/api/bazardor";  

/**
 * A small wrapper around fetch used by every API function.
 *
 * `next: { revalidate: 300 }` tells Next.js to cache the response for
 * 5 minutes. Prices don't change every second, so this makes pages faster
 * and avoids hammering the API.
 */
async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    next: { revalidate: 300 },
  });

  // fetch() only throws on network errors. A 404/500 still "succeeds",
  // so we check res.ok ourselves and throw a useful error message.
  if (!res.ok) {
    throw new Error(`API request failed: ${path} (${res.status})`);
  }
  return res.json() as Promise<T>;
}

/** All products. Optionally filter by category slug: getProducts("chal") */
export async function getProducts(category?: string): Promise<Product[]> {
  // encodeURIComponent makes the slug safe to place inside a URL
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return fetchJson<Product[]>(`/products${query}`);
}

/**
 * One product by its slug, or null if it does not exist.
 * The API filters with ?slug=..., and returns an ARRAY, so we take the first item.
 * Returning null (instead of throwing) lets the page call notFound() cleanly.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const products = await getProducts();
    return products.find((p) => p.slug === slug) ?? null;
  } catch (error) {
    // Log the real problem. Without this, an API outage looks exactly like
    // "product not found", which makes bugs very hard to spot.
    console.error("getProductBySlug failed:", error);
    return null;
  }
}

/** All 8 categories (চাল, ডাল, তেল, ...) */
export async function getCategories(): Promise<Category[]> {
  return fetchJson<Category[]>("/categories");
}

/** One category by slug, or null if the slug is invalid (like /category/xyz). */
export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  try {
    const categories = await getCategories();
    return categories.find((c) => c.slug === slug) ?? null;
  } catch (error) {
    console.error("getCategoryBySlug failed:", error);
    return null;
  }
}
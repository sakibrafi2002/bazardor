import Link from "next/link";
import { getCategories, getProducts } from "@/lib/api";
import { getBanglaDate } from "@/lib/format";
import CategoryNav from "./CategoryNav";
import AuthMenu from "./AuthMenu";
import PriceTicker from "./PriceTicker";
import logo from "@/assets/logo-icon.png";
import Image from "next/image";

// This is a SERVER component (no "use client"), so it can be async and
// fetch data directly. The browser receives ready-made HTML.
export default async function Navbar() {
  // Fetch both lists at the same time (Promise.all) instead of one after
  // the other, which is faster.
  // .catch(() => []) means: if the API is down, show an empty navbar
  // instead of crashing the ENTIRE website.
  const [categories, products] = await Promise.all([
    getCategories().catch(() => []),
    getProducts().catch(() => []),
  ]);

  return (
    <>
      <header className="border-b border-black/5 bg-white/80 backdrop-blur">
        {/* ---------- Row 1: logo (left) + auth (right) ---------- */}
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            {/* Green square with the cart emoji */}
            <span
              className="grid size-10 place-items-center rounded-xl bg-brand text-xl sm:size-11"
              aria-hidden
            >
              <Image src={logo} alt="Logo" className="size-6 sm:size-7" />
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-extrabold sm:text-xl">
                বাজার দর
              </span>
              {/* Today's date in Bangla, e.g. "মঙ্গলবার, ৬ অক্টোবর, ২০২৬" */}
              <span className="block text-[11px] text-slate-600 sm:text-xs">
                {getBanglaDate()}
              </span>
            </span>
          </Link>

          <AuthMenu />
        </div>

        {/* ---------- Row 2: category links ---------- */}
        <div className="border-t border-black/5">
          <CategoryNav categories={categories} />
        </div>
      </header>

      {/* ---------- Price ticker (only if we actually have products) ---------- */}
      {products.length > 0 && <PriceTicker products={products} />}
    </>
  );
}
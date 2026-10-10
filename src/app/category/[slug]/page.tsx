import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryProducts from "@/components/category/CategoryProducts";
import { getCategoryBySlug, getProducts } from "@/lib/api";
import { formatNumber } from "@/lib/format";

// In Next.js 15+, `params` is a Promise, so we must `await` it.
// The folder name [slug] means: whatever is in the URL after /category/
// becomes `slug`. /category/chal -> slug = "chal"
type Props = { params: Promise<{ slug: string }> };

// Sets the browser-tab title for each category, e.g. "চাল | বাজার দর"
// (the "| বাজার দর" part comes from the template in layout.tsx)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  return { title: category ? category.nameBn : "ক্যাটাগরি পাওয়া যায়নি" };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  // 1) Does this category exist? (returns null for something like /category/xyz)
  const category = await getCategoryBySlug(slug);

  // 2) Invalid slug -> show the 404 page (see not-found.tsx next to this file).
  //    notFound() stops this function right here.
  if (!category) notFound();

  // 3) Load only this category's products: /products?category=chal
  const products = await getProducts(category.slug);

  return (
    <div className="space-y-5">
      {/* ---------- Header card: emoji + name + subtitle ---------- */}
      <section className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:p-6">
        <span className="text-4xl sm:text-5xl" aria-hidden>
          {category.icon}
        </span>
        <div>
          <h1 className="text-2xl font-extrabold sm:text-3xl">
            {category.nameBn}
          </h1>
          <p className="text-sm text-slate-500">
            {formatNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </section>

      {/* Sort bar + result count + grid (interactive, so it is a client component) */}
      <CategoryProducts products={products} />
    </div>
  );
}
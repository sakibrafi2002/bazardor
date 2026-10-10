import Image from "next/image";
import { getBanglaDate } from "@/lib/format";

// Static import: Next.js reads the file at build time and knows its exact
// width and height, so <Image> needs no width/height props and there is
// no layout shift. "@/" points to the src/ folder.
import heroImage from "@/assets/bazar-hero.png";

export default function Hero() {
  return (
    <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
      {/* Mobile: one column (text, then image below = "stacks").
          md and up: two columns (text left, image right). */}
      <div className="grid items-center gap-6 md:grid-cols-2">
        {/* ---------- Left: text ---------- */}
        <div>
          {/* Eyebrow chip: today's date */}
          <span className="inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand sm:text-sm">
            {getBanglaDate()}
          </span>

          <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
            গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* CTA = Call To Action button.
              It is a normal <a> with an anchor (#...), NOT a Next.js <Link>:
              no route change, the browser just scrolls to the element whose
              id is "সব-পণ্য". `scroll-behavior: smooth` in globals.css
              makes the scroll animated. */}
          <a
            href="#সব-পণ্য"
            className="mt-6 inline-flex h-10 items-center rounded-lg bg-brand px-5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-dark sm:h-11 sm:text-base"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        {/* ---------- Right: hero image ---------- */}
        <div className="flex justify-center md:justify-end">
          <Image
            src={heroImage}
            alt="সবজির ঝুড়ি"
            // priority: this image is at the top of the page, so load it
            // immediately (better Core Web Vitals / LCP score)
            priority
            // Tells the browser how wide the image will be at each screen
            // size, so it downloads a right-sized file instead of a huge one
            sizes="(min-width: 768px) 360px, 70vw"
            className="h-auto w-3/4 max-w-[260px] sm:max-w-xs md:w-full md:max-w-[360px]"
          />
        </div>
      </div>
    </section>
  );
}
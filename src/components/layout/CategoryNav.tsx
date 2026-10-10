"use client";
// Client component: we need usePathname() to know which page we are on.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { Category } from "@/types";

export default function CategoryNav({
  categories,
}: {
  categories: Category[];
}) {
  // Current URL path, e.g. "/category/chal"
  const pathname = usePathname();

  // A reference to the ACTIVE link element, so we can scroll it into view
  const activeRef = useRef<HTMLAnchorElement | null>(null);

  // On small screens the row scrolls sideways. When the page changes, make
  // sure the highlighted category is visible (e.g. "মসলা" at the far right).
  useEffect(() => {
    activeRef.current?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [pathname]);

  return (
    <nav
      aria-label="পণ্যের ক্যাটাগরি"
      // overflow-x-auto = horizontal scroll on mobile
      className="no-scrollbar mx-auto max-w-6xl overflow-x-auto px-4 sm:px-6"
    >
      {/* w-max keeps all items on ONE line; min-w-full lets it stay
          left-aligned and fill the row on wide screens */}
      <ul className="flex w-max min-w-full items-center gap-1 py-2">
        {categories.map((category) => {
          // A link is "active" only when we are on that category's page
          const href = `/category/${category.slug}`;
          const isActive = pathname === href;

          return (
            <li key={category.id}>
              <Link
                href={href}
                ref={isActive ? activeRef : null}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand text-white shadow-sm" // highlighted (green pill)
                    : "text-slate-700 hover:bg-brand-soft", // normal
                ].join(" ")}
              >
                <span aria-hidden className="text-base leading-none">
                  {category.icon}
                </span>
                {category.nameBn}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
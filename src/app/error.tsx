"use client";
// Error boundaries MUST be client components (a Next.js rule).

import { Button } from "@heroui/react";

// If anything throws while rendering a page (for example the price API is
// down), Next.js shows this instead of a blank/crashed screen.
// `reset` re-tries rendering the page.
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-black/5 bg-white p-8 text-center shadow-sm">
      <p className="text-5xl" aria-hidden>
        ⚠️
      </p>
      <h2 className="mt-4 text-xl font-bold">কিছু একটা সমস্যা হয়েছে</h2>
      <p className="mt-2 text-sm text-slate-600">
        দাম লোড করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।
      </p>
      <Button
        onPress={reset}
        className="mt-5 bg-brand font-semibold text-white hover:bg-brand-dark"
      >
        আবার চেষ্টা করুন
      </Button>
    </div>
  );
}
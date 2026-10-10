import Link from "next/link";

interface Props {
  title: string;
  message: string;
  emoji?: string;
}

// A friendly "nothing here" screen with a button back to Home.
// Used for: invalid category slug, invalid product slug, empty category
// and (in Step 10) the global 404 page.
// No state or browser features, so this stays a Server Component.
export default function NotFoundView({ title, message, emoji = "🧺" }: Props) {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-black/5 bg-white p-8 text-center shadow-sm">
      <p className="text-5xl" aria-hidden>
        {emoji}
      </p>
      <h2 className="mt-4 text-xl font-extrabold">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">{message}</p>

      {/* CTA: links back to the Home page ("/") */}
      <Link
        href="/"
        className="mt-6 inline-flex h-10 items-center rounded-lg bg-brand px-5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-dark sm:h-11 sm:text-base"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
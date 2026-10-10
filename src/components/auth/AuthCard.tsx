import Link from "next/link";

interface Props {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

// The centered layout both auth pages share: title, subtitle, white card,
// and the "back to home" link. A Server Component (no state needed).
export default function AuthCard({ title, subtitle, children }: Props) {
  return (
    // max-w-md: full width on phones, a neat narrow card on bigger screens
    <div className="mx-auto w-full max-w-md py-4 sm:py-8">
      <div className="text-center">
        <h1 className="text-2xl font-extrabold sm:text-3xl">{title}</h1>
        <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
      </div>

      <div className="mt-6 rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:p-6">
        {children}
      </div>

      <p className="mt-6 text-center text-sm">
        <Link href="/" className="text-slate-500 hover:text-brand">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}
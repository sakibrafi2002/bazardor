import type { Metadata } from "next";
import Link from "next/link";
import ProfileCard from "@/components/profile/ProfileCard";
import { formatBanglaDateOnly } from "@/lib/format";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = { title: "আমার প্রোফাইল" };

export default async function ProfilePage() {
  // Protected: no valid login -> redirect to /signin and come back here after
  const { user } = await requireSession("/profile");

  return (
    <div className="mx-auto w-full max-w-2xl space-y-5">
      <header>
        <h1 className="text-2xl font-extrabold sm:text-3xl">আমার প্রোফাইল</h1>
        <p className="mt-1 text-sm text-slate-600">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </header>

      {/* Avatar + name + email + sign out */}
      <ProfileCard name={user.name} email={user.email} image={user.image} />

      {/* "তথ্য" card: the account details and the update button */}
      <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-extrabold">তথ্য</h2>

        {/* <dl> = description list: pairs of label (dt) and value (dd) */}
        <dl className="mt-4 divide-y divide-black/5 text-sm">
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-slate-500">নাম</dt>
            <dd className="font-medium">{user.name}</dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-slate-500">ইমেইল</dt>
            <dd className="break-all text-right font-medium">{user.email}</dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-slate-500">অ্যাকাউন্ট তৈরি</dt>
            <dd className="font-medium">
              {/* new Date(...) makes sure we always have a real Date object */}
              {formatBanglaDateOnly(new Date(user.createdAt))}
            </dd>
          </div>
        </dl>

        {/* Takes the user to ANOTHER route (requirement C3) */}
        <Link
          href="/profile/update"
          className="mt-4 flex h-11 w-full items-center justify-center rounded-lg bg-brand font-semibold text-white shadow-md transition-colors hover:bg-brand-dark"
        >
          তথ্য আপডেট করুন
        </Link>
      </section>
    </div>
  );
}
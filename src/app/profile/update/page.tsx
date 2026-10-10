import type { Metadata } from "next";
import UpdateProfileForm from "@/components/profile/UpdateProfileForm";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = { title: "তথ্য আপডেট" };

export default async function UpdateProfilePage() {
  // Protected, like the profile page
  const { user } = await requireSession("/profile/update");

  return (
    <div className="mx-auto w-full max-w-md">
      <header>
        <h1 className="text-2xl font-extrabold sm:text-3xl">তথ্য আপডেট করুন</h1>
        <p className="mt-1 text-sm text-slate-600">
          আপনার নাম পরিবর্তন করে সংরক্ষণ করুন।
        </p>
      </header>

      <div className="mt-5 rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:p-6">
        {/* The server passes the current name down as a prop,
            and the client form uses it as the starting value */}
        <UpdateProfileForm initialName={user.name} />
      </div>
    </div>
  );
}
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard";
import SignUpForm from "@/components/auth/SignUpForm";
import { getSafeRedirect } from "@/lib/auth-utils";
import { getSession } from "@/lib/session";

export const metadata: Metadata = { title: "সাইন আপ" };

type Props = { searchParams: Promise<{ redirect?: string }> };

export default async function SignUpPage({ searchParams }: Props) {
  const params = await searchParams;
  const redirectTo = getSafeRedirect(params.redirect);

  // Already logged in -> nothing to sign up for
  const session = await getSession();
  if (session) redirect("/");

  return (
    <AuthCard
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
    >
      <SignUpForm redirectTo={redirectTo} />
    </AuthCard>
  );
}
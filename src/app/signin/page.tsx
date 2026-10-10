import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard";
import SignInForm from "@/components/auth/SignInForm";
import { getSafeRedirect } from "@/lib/auth-utils";
import { getSession } from "@/lib/session";

export const metadata: Metadata = { title: "সাইন ইন" };

// In Next.js 15+, searchParams (the ?a=b part of the URL) is a Promise.
type Props = {
  searchParams: Promise<{ redirect?: string; reason?: string; error?: string }>;
};

export default async function SignInPage({ searchParams }: Props) {
  const params = await searchParams;

  // Where to go after login. Unsafe values become "/" (see getSafeRedirect).
  const redirectTo = getSafeRedirect(params.redirect);

  // Already logged in? No reason to see the form: go straight on.
  const session = await getSession();
  if (session) redirect(redirectTo);

  return (
    <AuthCard
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
    >
      <SignInForm
        redirectTo={redirectTo}
        loginRequired={params.reason === "login-required"}
        socialError={!!params.error}
      />
    </AuthCard>
  );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button, Input } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import {
  getAuthErrorMessage,
  inputClassNames,
  isValidEmail,
  withRedirect,
} from "@/lib/auth-utils";
import PasswordInput from "./PasswordInput";
import SocialButtons from "./SocialButtons";

interface Props {
  redirectTo: string;       // where to go after login ("/" by default)
  loginRequired: boolean;   // true when a protected page sent the user here
  socialError: boolean;     // true when a social login failed and came back
}

type Errors = { email?: string; password?: string };

export default function SignInForm({ redirectTo, loginRequired, socialError }: Props) {
  const router = useRouter();

  // Controlled inputs: React state holds what the user typed
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  // Show toasts that depend on how the user arrived here.
  // The fixed `id` stops duplicates (in development React runs effects twice).
  useEffect(() => {
    if (loginRequired) {
      toast("এই পেজ দেখতে সাইন ইন করুন", { id: "login-required", icon: "🔒" });
    }
    if (socialError) {
      toast.error("সোশ্যাল লগইন করা যায়নি, আবার চেষ্টা করুন", {
        id: "social-error",
      });
    }
  }, [loginRequired, socialError]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // stop the browser's normal page-reloading submit

    // ---------- 1) Validate ----------
    const nextErrors: Errors = {};
    if (!email.trim()) nextErrors.email = "ইমেইল লিখুন";
    else if (!isValidEmail(email.trim())) nextErrors.email = "সঠিক ইমেইল লিখুন";
    if (!password) nextErrors.password = "পাসওয়ার্ড লিখুন";

    setErrors(nextErrors); // inline messages under the fields

    const firstError = Object.values(nextErrors)[0];
    if (firstError) {
      toast.error(firstError); // plus a toast
      return; // stop: don't call the server
    }

    // ---------- 2) Call Better Auth ----------
    setLoading(true);
    const { error } = await authClient.signIn.email({
      email: email.trim(),
      password,
    });

    // ---------- 3) Failure: show a Bangla message ----------
    if (error) {
      toast.error(getAuthErrorMessage(error));
      setLoading(false);
      return;
    }

    // ---------- 4) Success: toast, go to the wanted page ----------
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(redirectTo);
    router.refresh(); // re-run server components so they see the new login
  }

  return (
    <>
      {/* noValidate: we do our own validation, so turn off the browser's */}
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <Input
          label="ইমেইল"
          labelPlacement="outside"
          placeholder="you@example.com"
          variant="bordered"
          type="email"
          autoComplete="email"
          value={email}
          onValueChange={setEmail}
          isInvalid={!!errors.email}
          errorMessage={errors.email}
          classNames={inputClassNames}
        />

        <PasswordInput
          label="পাসওয়ার্ড"
          placeholder="কমপক্ষে ৮ অক্ষর"
          value={password}
          onValueChange={setPassword}
          error={errors.password}
          autoComplete="current-password"
        />

        <Button
          type="submit"
          fullWidth
          isLoading={loading}
          className="h-11 bg-brand font-semibold text-white shadow-md hover:bg-brand-dark"
        >
          সাইন ইন
        </Button>
      </form>

      <SocialButtons callbackURL={redirectTo} />

      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link
          href={withRedirect("/signup", redirectTo)}
          className="font-medium text-brand hover:underline"
        >
          সাইন আপ করুন
        </Link>
      </p>
    </>
  );
}
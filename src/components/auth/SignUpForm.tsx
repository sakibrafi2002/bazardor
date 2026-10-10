"use client";

import { useState } from "react";
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

type Errors = {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
};

export default function SignUpForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // ---------- 1) Validate every field ----------
    const nextErrors: Errors = {};

    if (name.trim().length < 2) nextErrors.name = "নাম লিখুন (কমপক্ষে ২ অক্ষর)";

    if (!email.trim()) nextErrors.email = "ইমেইল লিখুন";
    else if (!isValidEmail(email.trim())) nextErrors.email = "সঠিক ইমেইল লিখুন";

    if (password.length < 8) {
      nextErrors.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
    }

    if (!confirm) nextErrors.confirm = "পাসওয়ার্ড আবার লিখুন";
    else if (confirm !== password) nextErrors.confirm = "পাসওয়ার্ড দুটি মিলছে না";

    setErrors(nextErrors);

    const firstError = Object.values(nextErrors)[0];
    if (firstError) {
      toast.error(firstError);
      return;
    }

    // ---------- 2) Create the account ----------
    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: name.trim(),
      email: email.trim(),
      password,
    });

    if (error) {
      toast.error(getAuthErrorMessage(error));
      setLoading(false);
      return;
    }

    // ---------- 3) Success: go to the LOGIN page (requirement) ----------
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন");
    router.push(withRedirect("/signin", redirectTo));
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <Input
          label="নাম"
          labelPlacement="outside"
          placeholder="যেমন: রহিম উদ্দিন"
          variant="bordered"
          autoComplete="name"
          value={name}
          onValueChange={setName}
          isInvalid={!!errors.name}
          errorMessage={errors.name}
          classNames={inputClassNames}
        />

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
          autoComplete="new-password"
        />

        <PasswordInput
          label="পাসওয়ার্ড নিশ্চিত করুন"
          placeholder="আবার লিখুন"
          value={confirm}
          onValueChange={setConfirm}
          error={errors.confirm}
          autoComplete="new-password"
        />

        <Button
          type="submit"
          fullWidth
          isLoading={loading}
          className="h-11 bg-brand font-semibold text-white shadow-md hover:bg-brand-dark"
        >
          অ্যাকাউন্ট তৈরি করুন
        </Button>
      </form>

      {/* Social sign up: after success go to HOME ("/"), as required */}
      <SocialButtons callbackURL="/" />

      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট আছে?{" "}
        <Link
          href={withRedirect("/signin", redirectTo)}
          className="font-medium text-brand hover:underline"
        >
          সাইন ইন করুন
        </Link>
      </p>
    </>
  );
}
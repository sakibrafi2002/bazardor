"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button, Input } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { inputClassNames } from "@/lib/auth-utils";

export default function UpdateProfileForm({
  initialName,
}: {
  initialName: string;
}) {
  const router = useRouter();

  // The input starts with the CURRENT name (pre-filled)
  const [name, setName] = useState(initialName);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = name.trim();

    // ---------- 1) Validate ----------
    if (trimmed.length < 2) {
      const message = "নাম লিখুন (কমপক্ষে ২ অক্ষর)";
      setError(message);
      toast.error(message);
      return;
    }
    setError(undefined);

    // Nothing changed -> no need to call the server
    if (trimmed === initialName) {
      toast("নামে কোনো পরিবর্তন করা হয়নি", { icon: "ℹ️" });
      return;
    }

    // ---------- 2) Update the user with Better Auth ----------
    setLoading(true);
    const { error: updateError } = await authClient.updateUser({
      name: trimmed,
    });

    // ---------- 3) Failure ----------
    if (updateError) {
      toast.error("তথ্য আপডেট করা যায়নি, আবার চেষ্টা করুন");
      setLoading(false);
      return;
    }

    // ---------- 4) Success: toast + go back to the profile ----------
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh(); // refresh server components so /profile shows the new name
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Input
        label="নাম"
        labelPlacement="outside"
        placeholder="আপনার নাম লিখুন"
        variant="bordered"
        autoComplete="name"
        value={name}
        onValueChange={setName}
        isInvalid={!!error}
        errorMessage={error}
        classNames={inputClassNames}
      />

      <Button
        type="submit"
        fullWidth
        isLoading={loading}
        className="h-11 bg-brand font-semibold text-white shadow-md hover:bg-brand-dark"
      >
        আপডেট
      </Button>

      {/* A way out without saving */}
      <p className="text-center text-sm">
        <Link href="/profile" className="text-slate-500 hover:text-brand">
          ← প্রোফাইলে ফিরে যান
        </Link>
      </p>
    </form>
  );
}
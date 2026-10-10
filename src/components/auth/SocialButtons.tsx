"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

type Provider = "google" | "github";

// `callbackURL` = where to go after a successful social login
export default function SocialButtons({ callbackURL }: { callbackURL: string }) {
  // Which provider is currently loading (null = none)
  const [loading, setLoading] = useState<Provider | null>(null);

  async function handleSocial(provider: Provider) {
    setLoading(provider);

    // This sends the browser to Google/GitHub's login screen.
    // Afterwards the provider sends the user to /api/auth/callback/<provider>,
    // Better Auth creates the session, then redirects to `callbackURL`.
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL,
      // If something goes wrong at the provider, come back to /signin
      // (Better Auth adds ?error=... and the page shows a toast)
      errorCallbackURL: "/signin",
    });

    // We only reach this line if the request FAILED (on success the browser
    // has already navigated away). For example: keys missing in .env.local.
    if (error) {
      toast.error("সোশ্যাল লগইন করা যায়নি, আবার চেষ্টা করুন");
      setLoading(null);
    }
  }

  return (
    <>
      {/* The "অথবা" (or) divider */}
      <div className="my-5 flex items-center gap-3 text-xs text-slate-500">
        <span className="h-px flex-1 bg-black/10" />
        অথবা
        <span className="h-px flex-1 bg-black/10" />
      </div>

      {/* Stacked on phones, side by side from `sm` up */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Button
          variant="bordered"
          className="bg-white font-semibold"
          isLoading={loading === "google"}
          isDisabled={loading !== null}
          startContent={loading === "google" ? null : <FcGoogle size={18} />}
          onPress={() => handleSocial("google")}
        >
          Google দিয়ে চালিয়ে যান
        </Button>

        <Button
          variant="bordered"
          className="bg-white font-semibold"
          isLoading={loading === "github"}
          isDisabled={loading !== null}
          startContent={loading === "github" ? null : <FaGithub size={18} />}
          onPress={() => handleSocial("github")}
        >
          GitHub দিয়ে চালিয়ে যান
        </Button>
      </div>
    </>
  );
}
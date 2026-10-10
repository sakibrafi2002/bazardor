"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "./auth-client";

// A custom hook = a reusable function that can use React features.
// Both the navbar menu and the profile page need "sign out", so the logic
// lives here once.
export function useSignOut() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function signOut() {
    setLoading(true);

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/"); // back to Home
          router.refresh(); // re-run server components so no old data stays
        },
        onError: () => toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন"),
      },
    });

    setLoading(false);
  }

  return { signOut, loading };
}
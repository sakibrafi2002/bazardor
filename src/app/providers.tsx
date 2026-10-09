"use client";
// "use client" is needed because HeroUIProvider and the router hook run in the browser.

import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    // `navigate` makes HeroUI links/buttons use Next.js client-side navigation
    // (no full page reload). `locale` tells HeroUI components to use Bangla.
    <HeroUIProvider navigate={router.push} locale="bn-BD">
      {children}

      {/* One single Toaster for the whole app. Any page can now call
          toast.success("...") or toast.error("...") and it appears here. */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: { fontFamily: "inherit" },
        }}
      />
    </HeroUIProvider>
  );
}
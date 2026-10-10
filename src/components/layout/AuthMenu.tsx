"use client";
// Client component: it reads the live login state and handles clicks.

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
} from "@heroui/react";
import { FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function AuthMenu() {
  const router = useRouter();

  // useSession() is a React hook from Better Auth.
  //   data      -> { user, session } when logged in, null when logged out
  //   isPending -> true while the first check is still running
  const { data: session, isPending } = authClient.useSession();

  /* ---------- Sign out ---------- */
  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        // Runs only if the sign out request succeeded
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/"); // go to Home
          router.refresh(); // re-run server components so nothing stays stale
        },
        onError: () => toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন"),
      },
    });
  }

  /* ---------- State 1: still checking -> skeleton ---------- */
  // Prevents a flash of "সাইন ইন" for users who ARE logged in.
  if (isPending) {
    return <Skeleton className="h-9 w-28 rounded-lg" />;
  }

  /* ---------- State 2: logged out -> two buttons ---------- */
  if (!session) {
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Plain text link: "সাইন ইন" */}
        <Button
          as={Link}
          href="/signin"
          variant="light"
          // Responsive size (the HeroUI version of "btn-sm sm:btn-md"):
          // small on mobile, bigger from the `sm` breakpoint up
          className="h-8 min-w-0 px-3 text-sm font-semibold sm:h-10 sm:px-4 sm:text-base"
        >
          সাইন ইন
        </Button>

        {/* Green filled button: "সাইন আপ" */}
        <Button
          as={Link}
          href="/signup"
          className="h-8 min-w-0 bg-brand px-3 text-sm font-semibold text-white shadow-md hover:bg-brand-dark sm:h-10 sm:px-5 sm:text-base"
        >
          সাইন আপ
        </Button>
      </div>
    );
  }

  /* ---------- State 3: logged in -> avatar + dropdown ---------- */
  const { user } = session;
  const firstName = user.name?.split(" ")[0] ?? "ব্যবহারকারী";

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg p-1 outline-none transition-colors hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-brand"
        >
          <Avatar
            // Google/GitHub users have a photo. Email users don't, so
            // HeroUI shows the initials from `name` instead.
            src={user.image ?? undefined}
            name={user.name}
            size="sm"
            // Google blocks some avatar requests that send a referrer
            imgProps={{ referrerPolicy: "no-referrer" }}
          />
          {/* Name is hidden on very small screens to save space */}
          <span className="hidden text-sm font-medium sm:inline">
            {firstName}
          </span>
          <FiChevronDown className="text-slate-400" aria-hidden />
        </button>
      </DropdownTrigger>

      {/* onAction receives the `key` of the clicked item */}
      <DropdownMenu
        aria-label="ব্যবহারকারীর মেনু"
        onAction={(key) => {
          if (key === "signout") handleSignOut();
        }}
      >
        {/* Header: full name + email (not clickable) */}
        <DropdownItem
          key="info"
          isReadOnly
          textValue={user.name}
          className="cursor-default data-[hover=true]:bg-transparent"
        >
          <p className="font-semibold">{user.name}</p>
          <p className="text-xs text-slate-500">{user.email}</p>
        </DropdownItem>

        {/* Link to the profile page */}
        <DropdownItem
          key="profile"
          href="/profile"
          startContent={<FiUser aria-hidden />}
        >
          আমার প্রোফাইল
        </DropdownItem>

        {/* Red sign out item */}
        <DropdownItem
          key="signout"
          color="danger"
          className="text-danger"
          startContent={<FiLogOut aria-hidden />}
        >
          সাইন আউট
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
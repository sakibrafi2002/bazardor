"use client";
// Client component: it has a click handler (sign out) and uses HeroUI.

import { Avatar, Button } from "@heroui/react";
import { FiLogOut } from "react-icons/fi";
import { useSignOut } from "@/lib/use-sign-out";

interface Props {
  name: string;
  email: string;
  image?: string | null; // Google/GitHub users have a photo, email users don't
}

export default function ProfileCard({ name, email, image }: Props) {
  const { signOut, loading } = useSignOut();

  return (
    // Mobile: stacked and centered. sm and up: avatar + text left, button right.
    <section className="flex flex-col items-center gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:flex-row sm:justify-between sm:p-6">
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <Avatar
          // No photo -> HeroUI shows the initials from `name`
          src={image ?? undefined}
          name={name}
          className="size-20 text-xl"
          radius="lg"
          imgProps={{ referrerPolicy: "no-referrer" }}
        />
        <div>
          <h2 className="text-xl font-bold">{name}</h2>
          {/* break-all: a very long email wraps instead of overflowing */}
          <p className="break-all text-slate-500">{email}</p>
        </div>
      </div>

      {/* Red outlined sign out button */}
      <Button
        variant="bordered"
        color="danger"
        isLoading={loading}
        startContent={loading ? null : <FiLogOut aria-hidden />}
        onPress={signOut}
        className="font-semibold"
      >
        সাইন আউট
      </Button>
    </section>
  );
}
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePlatform } from "@/context/platform-context";

export function SignedInMocksNotice() {
  const { currentUser, isClientReady } = usePlatform();
  if (!isClientReady || !currentUser) return null;

  const href = currentUser.role === "admin" ? "/admin/mocks" : "/dashboard";
  const label = currentUser.role === "admin" ? "Go to Mock Command Centre" : "Go to your mocks";

  return (
    <div className="border-b border-gold/20 bg-navy px-6 py-3 text-center text-sm font-bold text-white">
      You&apos;re signed in as {currentUser.name}.{" "}
      <Link href={href} className="inline-flex items-center gap-1 text-gold-light underline underline-offset-2 hover:text-gold">
        {label} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

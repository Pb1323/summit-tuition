"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MAIN_NAV, HEADER_CTA } from "@/data/nav";
import { SITE } from "@/data/site";
import { usePlatform } from "@/context/platform-context";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { currentUser, isClientReady, logout } = usePlatform();
  const dashboardHref = currentUser?.role === "admin" ? "/admin" : "/dashboard";

  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-white/82 shadow-[0_12px_40px_-32px_rgba(17,24,39,0.55)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/72">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-gold-light">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight text-navy">{SITE.shortName}</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {MAIN_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium text-ink/80 transition-colors hover:text-navy",
                pathname === link.href && "text-navy font-semibold"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {!isClientReady ? (
            <span className="text-sm font-bold text-muted">Account</span>
          ) : currentUser ? (
            <>
              <Link href={dashboardHref} className="text-sm font-bold text-navy">
                {currentUser.role === "admin" ? "Admin" : "Dashboard"}
              </Link>
              <button onClick={logout} className="text-sm font-bold text-muted hover:text-navy">Sign out</button>
            </>
          ) : (
            <Link href="/login" className="text-sm font-bold text-navy">Student Login</Link>
          )}
          <Button href={HEADER_CTA.href} size="md">
            {HEADER_CTA.label}
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-navy lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gold/20 bg-white/95 px-6 py-4 shadow-[0_18px_50px_-36px_rgba(17,24,39,0.45)] backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1">
            {MAIN_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink/80 hover:bg-cream hover:text-navy"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Button href={HEADER_CTA.href} size="md" className="mt-4 w-full">
            {HEADER_CTA.label}
          </Button>
          {!isClientReady ? (
            <span className="mt-3 block rounded-full border border-line px-4 py-2 text-center text-sm font-bold text-muted">
              Account
            </span>
          ) : currentUser ? (
            <button onClick={() => { logout(); setOpen(false); }} className="mt-3 w-full rounded-full border border-line px-4 py-2 text-sm font-bold text-navy">
              Sign out
            </button>
          ) : (
            <Button href="/login" variant="outline" size="md" className="mt-3 w-full">
              Student Login
            </Button>
          )}
        </div>
      )}
    </header>
  );
}

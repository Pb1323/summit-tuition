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
  // Signed-in users clicking "Mocks" mean "take me to my mocks", not the marketing page they've already converted from.
  const mocksHref = currentUser?.role === "admin" ? "/admin/mocks" : currentUser ? "/dashboard" : "/mocks";
  const navHref = (link: { href: string }) => (link.href === "/mocks" ? mocksHref : link.href);
  // Notes sits alongside Mocks in the primary nav, not tucked into the account controls.
  const navLinks =
    currentUser && currentUser.role !== "admin"
      ? MAIN_NAV.flatMap((link) => (link.href === "/mocks" ? [link, { label: "Notes", href: "/notes" }] : [link]))
      : MAIN_NAV;

  return (
    <header className="sticky top-0 z-[70] border-b border-gold/20 bg-white/82 shadow-[0_12px_40px_-32px_rgba(17,24,39,0.55)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/72">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white">
        Skip to content
      </a>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-gold-light">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight text-navy">{SITE.shortName}</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={navHref(link)}
              aria-current={pathname === navHref(link) ? "page" : undefined}
              className={cn(
                "cursor-pencil relative text-sm font-medium text-ink/80 transition-colors duration-300 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gold after:transition-all after:duration-300 hover:text-navy hover:after:w-full",
                pathname === navHref(link) && "font-semibold text-navy after:w-full"
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
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-navy lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div id="mobile-navigation" className="border-t border-gold/20 bg-white/95 px-6 py-4 shadow-[0_18px_50px_-36px_rgba(17,24,39,0.45)] backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={navHref(link)}
                aria-current={pathname === navHref(link) ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "cursor-pencil rounded-xl px-3 py-2.5 text-sm font-medium text-ink/80 transition-colors duration-300 hover:bg-cream hover:text-navy",
                  pathname === navHref(link) && "bg-cream text-navy"
                )}
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
            <div className="mt-3 grid gap-2">
              <Button href={dashboardHref} variant="outline" size="md" className="w-full">
                {currentUser.role === "admin" ? "Admin dashboard" : "Student dashboard"}
              </Button>
              <button onClick={() => { logout(); setOpen(false); }} className="w-full rounded-full border border-line px-4 py-2 text-sm font-bold text-navy">
                Sign out
              </button>
            </div>
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

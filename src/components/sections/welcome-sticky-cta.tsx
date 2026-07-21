import Link from "next/link";
import { PhoneCall, UserPlus } from "lucide-react";

export function WelcomeStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_30px_-20px_rgba(15,23,42,0.35)] backdrop-blur">
      <div className="mx-auto flex max-w-md gap-2.5">
        <Link
          href="/book-a-call"
          className="focus-gold flex flex-1 items-center justify-center gap-2 rounded-full bg-navy px-4 py-3 text-sm font-black text-white transition active:translate-y-px"
        >
          <PhoneCall className="h-4 w-4" />
          Book a Free Call
        </Link>
        <Link
          href="/account"
          className="focus-gold gold-shimmer flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light px-4 py-3 text-sm font-black text-navy-dark transition active:translate-y-px"
        >
          <UserPlus className="h-4 w-4" />
          Free Account
        </Link>
      </div>
    </div>
  );
}

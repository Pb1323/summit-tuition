"use client";

import Script from "next/script";
import { CalendarClock } from "lucide-react";

/**
 * Calendar embed slot. Set NEXT_PUBLIC_CALENDLY_URL (or swap in another
 * booking provider's embed) to replace the placeholder with a live calendar.
 * Uses Calendly's official inline widget script rather than a bare iframe so
 * resizing/loading behaves the same as Calendly's own embed snippet.
 */
export function BookingPlaceholder() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  if (calendlyUrl) {
    return (
      <div className="overflow-hidden rounded-3xl border border-line bg-white">
        <div className="calendly-inline-widget" data-url={calendlyUrl} style={{ minWidth: "320px", height: "700px" }} />
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-navy/15 bg-white px-6 py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy/5 text-navy">
        <CalendarClock className="h-7 w-7" />
      </span>
      <div>
        <p className="text-base font-semibold text-navy">Calendar integration coming soon</p>
        <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-muted">
          This slot is wired up to take a Calendly, Google Calendar or other booking embed —
          set <code className="rounded bg-cream-dark px-1.5 py-0.5 text-xs">NEXT_PUBLIC_CALENDLY_URL</code> to
          go live. For now, send us an enquiry and we&apos;ll get back to you within one working day.
        </p>
      </div>
    </div>
  );
}

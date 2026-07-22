import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Retired named products (Weekly Mock Club, Practice Paper Simulator, Complete 11+
   * Programme) folded into the Free/Pro/Max tier ladder — see CLAUDE.md Recent Feature
   * State. Redirect so no stale-copy page is reachable, even via an old bookmark/link. */
  async redirects() {
    return [
      { source: "/weekly-mock-club", destination: "/pricing#platform", permanent: false },
      { source: "/practice-paper-simulator", destination: "/pricing#platform", permanent: false },
      { source: "/complete-programme", destination: "/pricing#platform", permanent: false },
      /* TEMPORARY (added 2026-07-22): a WhatsApp broadcast accidentally linked the root
       * domain instead of /welcome and couldn't be corrected after sending. Redirect root
       * to /welcome so those clicks land on the mobile-friendly page; /welcome already has
       * a "Prefer the full site?" link at the bottom for everyone else. REMOVE this entry
       * once the WhatsApp traffic has passed (a day or two) to restore the normal homepage. */
      { source: "/", destination: "/welcome", permanent: false },
    ];
  },
};

export default nextConfig;

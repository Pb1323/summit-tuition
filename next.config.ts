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
    ];
  },
};

export default nextConfig;

// Per-student review/UX features, gated by a simple client-side email allowlist — NOT a
// security/access-control boundary (it doesn't grant any extra data access), just a UX flow
// change for specific students whose tutor has asked for it. Deliberately config-only, no
// database schema change: see CLAUDE.md's "Known Limitations" note on the referral-code
// incident for why schema drift against the shared production database is avoided here.
//
// To add another student, just add their (lowercased-at-check-time) email to this set.
export const REVIEW_FEATURES_EMAILS = new Set(["lupintan1215@gmail.com", "prime.mr.chess@gmail.com"]);

export function hasReviewFeatures(email?: string | null): boolean {
  if (!email) return false;
  return REVIEW_FEATURES_EMAILS.has(email.trim().toLowerCase());
}

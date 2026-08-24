/** Referral link plumbing shared by server routes and the demo-mode client store. */

export function generateReferralCode(name: string) {
  const first = (name.trim().split(/\s+/)[0] || "student").toLowerCase().replace(/[^a-z0-9]/g, "");
  const suffix = Math.random().toString(36).slice(2, 7);
  return `${first || "student"}-${suffix}`;
}

export const REFERRAL_MAX_QUALIFYING = 3;
export const REFERRAL_DISCOUNT_PER_FRIEND_GBP = 5;

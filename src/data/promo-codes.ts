export type PromoCode = {
  /** Always matched uppercase/trimmed — write codes here in caps. */
  code: string;
  /** Mock ids (from MOCKS in platform.ts) this code unlocks. */
  mockIds: string[];
  /** Shown to the student after a successful redemption. */
  label: string;
  active: boolean;
};

/**
 * Hand-maintained promo code list for referral/marketing pushes (e.g. "invite
 * 20 people to the group chat, redeem this code for a free mock"). One code
 * can be shared with many people — redemption is idempotent per student, not
 * single-use, so there's no separate invite-counting mechanism here.
 * Edit this list directly to launch/retire a campaign.
 */
export const PROMO_CODES: PromoCode[] = [
  {
    code: "INVITE20",
    mockIds: ["english-gl-2-stretch"],
    label: "Free stretch mock unlocked",
    active: true,
  },
];

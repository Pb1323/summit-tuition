import { NextResponse } from "next/server";
import { REFERRAL_MAX_QUALIFYING } from "@/lib/referral";
import { getCurrentUser } from "@/lib/server/auth";
import { isDatabaseConfigured, prisma } from "@/lib/server/db";

export const runtime = "nodejs";

export async function GET() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });
  }
  if (!currentUser.referralCode) {
    return NextResponse.json({ referralCode: null, qualifyingCount: 0, max: REFERRAL_MAX_QUALIFYING });
  }
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ referralCode: currentUser.referralCode, qualifyingCount: 0, max: REFERRAL_MAX_QUALIFYING });
  }

  const referred = await prisma.user.findMany({
    where: { referredByCode: currentUser.referralCode },
    include: { unlocks: { include: { mock: { select: { isFree: true } } } } },
  });
  // Only unlocks of a paid mock count as "actually bought" — a free-tier unlock is
  // granted to every new account, so counting it would let anyone farm referrals
  // just by getting friends to register (no loophole intended here).
  const qualifying = referred.filter((user) => user.unlocks.some((unlock) => !unlock.mock.isFree));

  return NextResponse.json({
    referralCode: currentUser.referralCode,
    qualifyingCount: Math.min(qualifying.length, REFERRAL_MAX_QUALIFYING),
    max: REFERRAL_MAX_QUALIFYING,
  });
}

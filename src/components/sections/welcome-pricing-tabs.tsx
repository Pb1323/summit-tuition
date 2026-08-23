"use client";

import { Calculator, BookOpenText, NotebookText, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckoutButton } from "@/components/ui/checkout-button";
import { SITE } from "@/data/site";
import { MOCK_CLUB_PRICING, PROGRAMME_PRICING, GROUP_TUITION_PRICING, PRIVATE_TUITION_PRICING } from "@/data/pricing";
import type { PricingTier } from "@/types/pricing";

interface TabDef {
  id: string;
  label: string;
  tier: PricingTier;
  learnMoreHref: string;
}

const PLATFORM_TABS: TabDef[] = [
  { id: "pro", label: "Pro", tier: MOCK_CLUB_PRICING[0], learnMoreHref: "/pricing#platform" },
  { id: "max", label: "Max", tier: PROGRAMME_PRICING[0], learnMoreHref: "/pricing#platform" },
];

const TUITION_TABS: TabDef[] = [
  { id: "group", label: "Group", tier: GROUP_TUITION_PRICING[0], learnMoreHref: "/tuition/group" },
  { id: "private", label: "Private", tier: PRIVATE_TUITION_PRICING[0], learnMoreHref: "/tuition/private" },
];

const PLATFORM_STATS = [
  "6 new full-length mocks released every month — around 100 questions each",
  "140+ interactive Study Notes lessons, not PDFs",
  "A marked report after every mock, not just a score",
];

function PricingPlanCard({ tab }: { tab: TabDef }) {
  const tier = tab.tier;
  return (
    <div
      className={cn(
        "premium-card flex h-full flex-col rounded-2xl p-4",
        tier.highlighted && "border-gold/50 shadow-[0_18px_44px_-28px_rgba(180,83,9,0.5)]"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-black text-navy">{tier.name}</h3>
        {tier.badge && (
          <Badge variant={tier.highlighted ? "navy" : "gold"} className="shrink-0 text-[10px]">
            {tier.badge}
          </Badge>
        )}
      </div>
      <ul className="mt-3 space-y-1.5">
        {tier.features.slice(0, 3).map((f) => (
          <li key={f} className="flex items-start gap-1.5 text-[11px] font-medium leading-snug text-ink/85">
            <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
              <Check className="h-2 w-2" />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-3.5 flex flex-col gap-2">
        {SITE.stripeCheckoutEnabled && tier.stripePriceId ? (
          <CheckoutButton
            size="md"
            className="w-full text-sm"
            checkout={{
              priceId: tier.stripePriceId,
              mode: tier.billingMode === "subscription" ? "subscription" : "payment",
              productName: `Summit Tuition — ${tier.name}`,
              productId: tier.id,
            }}
          >
            {tier.cta}
          </CheckoutButton>
        ) : (
          <Button href={tier.ctaHref} size="md" className="w-full text-sm">
            {tier.cta}
          </Button>
        )}
      </div>
    </div>
  );
}

function PricingTabSwitcher({
  tabs,
  showPlatformStats,
}: {
  tabs: TabDef[];
  initialId: string;
  showPlatformStats?: boolean;
}) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        {tabs.map((tab) => (
          <PricingPlanCard key={tab.id} tab={tab} />
        ))}
      </div>

      {showPlatformStats && (
        <div className="mt-4 rounded-xl bg-cream/60 p-3.5">
          <p className="text-[11px] font-bold uppercase tracking-wide text-gold-dark">What you actually get</p>
          <ul className="mt-1.5 space-y-1">
            {PLATFORM_STATS.map((stat) => (
              <li key={stat} className="text-xs leading-relaxed text-navy/80">
                &middot; {stat}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showPlatformStats && (
        <div className="mt-4 border-t border-navy/10 pt-4">
          <p className="text-[11px] font-bold uppercase tracking-wide text-gold-dark">See the quality yourself</p>
          <div className="mt-2.5 grid grid-cols-2 gap-2">
            <Button href="/free-mock?subject=maths" variant="light" size="sm" className="w-full">
              <Calculator className="h-3.5 w-3.5" /> Maths Mock
            </Button>
            <Button href="/free-mock?subject=english" variant="light" size="sm" className="w-full">
              <BookOpenText className="h-3.5 w-3.5" /> English Mock
            </Button>
          </div>
          <Button href="/notes-preview" variant="ghost" size="sm" className="mt-2 w-full">
            <NotebookText className="h-3.5 w-3.5" /> Preview a Study Notes lesson
          </Button>
        </div>
      )}
    </div>
  );
}

export function WelcomePricingTabs() {
  return <PricingTabSwitcher tabs={PLATFORM_TABS} initialId="pro" showPlatformStats />;
}

export function WelcomeTuitionPricingTabs() {
  return <PricingTabSwitcher tabs={TUITION_TABS} initialId="group" />;
}

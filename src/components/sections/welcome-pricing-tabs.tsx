"use client";

import { useState } from "react";
import { ArrowRight, Calculator, BookOpenText, NotebookText, Check } from "lucide-react";
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

function PricingTabSwitcher({
  tabs,
  initialId,
  showPlatformStats,
}: {
  tabs: TabDef[];
  initialId: string;
  showPlatformStats?: boolean;
}) {
  const [activeId, setActiveId] = useState(initialId);
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];
  const tier = active.tier;

  return (
    <div>
      <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-wide text-muted">
        Tap to compare {tabs.map((t) => t.label).join(" vs. ")}
      </p>
      <div
        className="mx-auto flex max-w-xs rounded-full border border-navy/15 bg-white p-1 shadow-[0_6px_18px_-10px_rgba(15,23,42,0.35)]"
        role="tablist"
        aria-label="Pricing plans"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === activeId}
            onClick={() => setActiveId(tab.id)}
            className={cn(
              "focus-gold flex-1 rounded-full px-4 py-2.5 text-sm font-bold transition-all",
              tab.id === activeId
                ? "bg-navy text-white shadow-[0_10px_24px_-14px_rgba(15,23,42,0.7)]"
                : "text-navy/55 hover:text-navy"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="premium-card mt-4 rounded-2xl p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-black text-navy">{tier.name}</h3>
            {tier.badge && (
              <Badge variant={tier.highlighted ? "navy" : "gold"} className="mt-1.5">
                {tier.badge}
              </Badge>
            )}
          </div>
          <div className="text-right">
            <p className="text-2xl font-black leading-none text-navy">{tier.price}</p>
            <p className="text-xs font-semibold text-muted">{tier.period}</p>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted">{tier.description}</p>

        <ul className="mt-4 space-y-2">
          {tier.features.slice(0, 4).map((f) => (
            <li key={f} className="flex items-start gap-2 text-xs font-medium text-ink/85">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
                <Check className="h-2.5 w-2.5" />
              </span>
              {f}
            </li>
          ))}
        </ul>

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

        <div className="mt-5 flex flex-col gap-2.5">
          {SITE.stripeCheckoutEnabled && tier.stripePriceId ? (
            <CheckoutButton
              size="lg"
              className="w-full text-base"
              checkout={{
                priceId: tier.stripePriceId,
                mode: tier.billingMode === "subscription" ? "subscription" : "payment",
                productName: `Summit Tuition — ${tier.name}`,
                productId: tier.id,
              }}
            >
              {tier.cta} <ArrowRight className="h-4 w-4" />
            </CheckoutButton>
          ) : (
            <Button href={tier.ctaHref} size="lg" className="w-full text-base">
              {tier.cta} <ArrowRight className="h-4 w-4" />
            </Button>
          )}
          <Button href={active.learnMoreHref} variant="outline" size="md" className="w-full">
            Learn more about {active.label}
          </Button>
        </div>

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
    </div>
  );
}

export function WelcomePricingTabs() {
  return <PricingTabSwitcher tabs={PLATFORM_TABS} initialId="pro" showPlatformStats />;
}

export function WelcomeTuitionPricingTabs() {
  return <PricingTabSwitcher tabs={TUITION_TABS} initialId="group" />;
}

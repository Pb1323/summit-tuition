"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GROUP_TUITION_PRICING,
  PRIVATE_TUITION_PRICING,
  MOCK_CLUB_PRICING,
  HOLIDAY_PRICING,
  PROGRAMME_PRICING,
} from "@/data/pricing";

const TABS = [
  { id: "mocks", label: "Mock Club", tier: MOCK_CLUB_PRICING[0], learnMoreHref: "/weekly-mock-club" },
  { id: "group", label: "Group Tuition", tier: GROUP_TUITION_PRICING[0], learnMoreHref: "/tuition/group" },
  { id: "private", label: "Private Tuition", tier: PRIVATE_TUITION_PRICING[0], learnMoreHref: "/tuition/private" },
  { id: "holiday", label: "Holiday Booster", tier: HOLIDAY_PRICING[0], learnMoreHref: "/holiday-booster" },
  { id: "programme", label: "Complete Programme", tier: PROGRAMME_PRICING[0], learnMoreHref: "/complete-programme" },
] as const;

export function WelcomePricingTabs() {
  const [activeId, setActiveId] = useState<(typeof TABS)[number]["id"]>("mocks");
  const active = TABS.find((t) => t.id === activeId) ?? TABS[0];
  const tier = active.tier;

  return (
    <div>
      <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1" role="tablist" aria-label="Pricing plans">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === activeId}
            onClick={() => setActiveId(tab.id)}
            className={cn(
              "focus-gold shrink-0 snap-start rounded-full border px-3.5 py-2 text-xs font-bold whitespace-nowrap transition",
              tab.id === activeId
                ? "border-gold bg-navy text-white shadow-[0_10px_24px_-14px_rgba(15,23,42,0.7)]"
                : "border-line bg-white text-navy hover:border-gold/50"
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

        <div className="mt-5 flex flex-col gap-2">
          <Button href={tier.ctaHref} size="md" className="w-full">
            {tier.cta}
          </Button>
          <Button href={active.learnMoreHref} variant="outline" size="sm" className="w-full">
            Learn more about {active.label}
          </Button>
        </div>
      </div>
    </div>
  );
}

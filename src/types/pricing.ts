export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  ctaHref: string;
  badge?: string;
  highlighted?: boolean;
  stripePriceId?: string;
  billingMode: "one-off" | "subscription";
}

export interface ComparisonRow {
  feature: string;
  group: boolean | string;
  private: boolean | string;
  programme: boolean | string;
}

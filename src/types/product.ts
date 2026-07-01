export type ProductCategory =
  | "assessment"
  | "mocks"
  | "practice"
  | "tuition"
  | "programme"
  | "holiday"
  | "packs"
  | "call";

export interface LadderProduct {
  slug: string;
  name: string;
  audience: string;
  benefit: string;
  price: string;
  href: string;
  category: ProductCategory;
  featured?: boolean;
}

export interface UpsellProduct {
  name: string;
  description: string;
  price: string;
  href: string;
}

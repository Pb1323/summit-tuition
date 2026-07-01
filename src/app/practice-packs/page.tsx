import type { Metadata } from "next";
import { ArrowRight, BookText, Calculator, Brain, ShapesIcon, SpellCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { CheckoutButton } from "@/components/ui/checkout-button";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "11+ Practice Packs — English, Maths, VR, NVR & Vocabulary",
  description:
    "Downloadable and online 11+ practice packs covering English, maths, verbal reasoning, non-verbal reasoning and vocabulary, with model answers.",
};

const PACKS = [
  {
    id: "english",
    icon: <BookText className="h-6 w-6" />,
    name: "English Practice Pack",
    description: "Comprehension, inference and writing tasks in real 11+ format.",
    price: "£18",
  },
  {
    id: "maths",
    icon: <Calculator className="h-6 w-6" />,
    name: "Maths Problem Solving Pack",
    description: "Multi-step word problems — the area that trips up most candidates.",
    price: "£18",
  },
  {
    id: "verbal-reasoning",
    icon: <Brain className="h-6 w-6" />,
    name: "Verbal Reasoning Pack",
    description: "All major VR question types, with worked explanations.",
    price: "£18",
  },
  {
    id: "non-verbal-reasoning",
    icon: <ShapesIcon className="h-6 w-6" />,
    name: "Non-Verbal Reasoning Pack",
    description: "Rotations, sequences and codes, the most commonly missed NVR topics.",
    price: "£18",
  },
  {
    id: "vocabulary",
    icon: <SpellCheck className="h-6 w-6" />,
    name: "Vocabulary Booster Pack",
    description: "The synonym, antonym and comprehension vocabulary most often tested.",
    price: "£18",
  },
  {
    id: "comprehension",
    icon: <BookText className="h-6 w-6" />,
    name: "Comprehension Booster Pack",
    description: "Inference, retrieval and summary questions with marking guidance.",
    price: "£18",
  },
];

export default function PracticePacksPage() {
  return (
    <>
      <HeroSection
        eyebrow="Practice Packs"
        title="Targeted practice packs for every 11+ subject"
        description="Downloadable and online practice packs for English, maths, verbal reasoning, non-verbal reasoning and vocabulary — each with full model answers and marking guidance."
        actions={
          <Button href="#packs" size="lg">
            Browse Practice Packs <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />

      <section id="packs" className="py-20">
        <Container>
          <SectionHeading eyebrow="All Packs" title="Buy individually, or bundle for a discount" />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PACKS.map((pack) => (
              <div key={pack.id} id={pack.id} className="flex flex-col rounded-2xl border border-line bg-white p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy/5 text-navy">
                  {pack.icon}
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy">{pack.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{pack.description}</p>
                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <span className="text-sm font-bold text-navy">{pack.price}</span>
                  <CheckoutButton
                    size="sm"
                    variant="outline"
                    checkout={{ priceId: `pack-${pack.id}`, mode: "payment", productName: pack.name }}
                  >
                    Buy pack
                  </CheckoutButton>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Not sure which pack to start with?"
        description="A diagnostic assessment will tell you exactly where to focus first."
        actions={
          <Button href="/diagnostic-assessment" size="lg">
            Book Diagnostic Assessment <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />
    </>
  );
}

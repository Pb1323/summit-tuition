import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { HeroSection } from "@/components/sections/hero-section";
import { FreeMockPreview } from "@/components/sections/free-mock-preview";

export const metadata: Metadata = {
  title: "Try an Official Mock Sample",
  description: "Sit an official Summit mock sample right now — no account needed to get started.",
};

export default function FreeMockPage() {
  return (
    <>
      <HeroSection
        eyebrow="Official Mock Sample"
        title="Try a Real Summit Mock, No Account Needed"
        description="5 real 11+-style questions, exactly like our live mocks, marked instantly as you go. Create a free account afterwards to unlock more."
      />
      <section className="pb-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Suspense fallback={null}>
              <FreeMockPreview />
            </Suspense>
          </div>
        </Container>
      </section>
    </>
  );
}

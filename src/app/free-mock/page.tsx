import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { HeroSection } from "@/components/sections/hero-section";
import { FreeMockPreview } from "@/components/sections/free-mock-preview";

export const metadata: Metadata = {
  title: "Try a Free Mock",
  description: "Take a free 10-question 11+ mock right now — no account needed to get started.",
};

export default function FreeMockPage() {
  return (
    <>
      <HeroSection
        eyebrow="Free Mock Preview"
        title="Try a Free Mock, No Account Needed"
        description="10 real 11+-style questions, marked instantly as you go. Create a free account afterwards to unlock more."
      />
      <section className="pb-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <FreeMockPreview />
          </div>
        </Container>
      </section>
    </>
  );
}

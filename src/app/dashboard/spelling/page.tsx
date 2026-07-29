"use client";

import { Container } from "@/components/ui/container";
import { RequireAuth, RevealOnScroll } from "@/components/platform/ui";
import { SpellingTester } from "@/components/spelling/spelling-tester";

export default function SpellingTesterPage() {
  return (
    <RequireAuth role="student">
      <Container className="py-10">
        <RevealOnScroll>
          <SpellingTester />
        </RevealOnScroll>
      </Container>
    </RequireAuth>
  );
}

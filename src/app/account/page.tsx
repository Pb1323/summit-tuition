import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PremiumBadge, RevealOnScroll } from "@/components/platform/ui";

export default function AccountGatewayPage() {
  return (
    <Container className="flex min-h-[70vh] items-center py-16">
      <RevealOnScroll className="mx-auto w-full max-w-md">
        <Card className="p-8 text-center">
          <PremiumBadge>Summit Tuition Account</PremiumBadge>
          <h1 className="mt-4 text-2xl font-bold text-navy sm:text-3xl">Get started</h1>
          <p className="mt-2 text-sm text-muted">Are you new here, or do you already have an account?</p>
          <div className="mt-8 flex flex-col gap-4">
            <Button href="/register" size="lg" className="w-full">
              Create New Account
            </Button>
            <Button href="/login" variant="outline" size="lg" className="w-full">
              Sign Into Existing Account
            </Button>
          </div>
        </Card>
      </RevealOnScroll>
    </Container>
  );
}

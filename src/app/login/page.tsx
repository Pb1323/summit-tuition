"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { AnimatedButton, PremiumBadge, RevealOnScroll } from "@/components/platform/ui";
import { usePlatform } from "@/context/platform-context";
import { MASTER_ADMIN_EMAIL } from "@/data/platform";

export default function LoginPage() {
  const router = useRouter();
  const { login } = usePlatform();
  const [email, setEmail] = useState(MASTER_ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("First login sets the password for seeded demo accounts.");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await login(email, password);
    if (!result.ok) {
      setMessage(result.message);
      return;
    }
    router.push(result.user.role === "admin" ? "/admin" : "/dashboard");
  }

  return (
    <Container className="py-16">
      <RevealOnScroll className="mx-auto max-w-xl">
        <Card className="overflow-hidden">
          <div className="bg-navy p-8 text-white">
            <PremiumBadge>Secure account access</PremiumBadge>
            <h1 className="mt-4 text-3xl font-bold">Student and admin login</h1>
            <p className="mt-2 text-sm text-cream/75">Mocks stay inside the platform. Sign in to sit exams, review reports or manage access.</p>
          </div>
          <form onSubmit={onSubmit} className="space-y-5 p-8">
            <div>
              <label className="text-sm font-bold text-navy" htmlFor="email">Email</label>
              <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-line px-4 outline-none focus:border-gold" required />
            </div>
            <div>
              <label className="text-sm font-bold text-navy" htmlFor="password">Password</label>
              <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-line px-4 outline-none focus:border-gold" required minLength={8} />
            </div>
            <p className="flex items-start gap-2 rounded-xl bg-cream p-3 text-sm text-muted"><LockKeyhole className="mt-0.5 h-4 w-4 text-gold-dark" /> {message}</p>
            <AnimatedButton type="submit" className="w-full">Sign in</AnimatedButton>
            <p className="text-center text-sm text-muted">
              New student? <Link href="/register" className="font-bold text-navy underline">Create an account</Link>
            </p>
          </form>
        </Card>
      </RevealOnScroll>
    </Container>
  );
}

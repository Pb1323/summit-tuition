"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { AnimatedButton, PremiumBadge, RevealOnScroll } from "@/components/platform/ui";
import { usePlatform } from "@/context/platform-context";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = usePlatform();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await register({ name, email, password });
    if (!result.ok) {
      setMessage(result.message);
      return;
    }
    router.push("/login");
  }

  return (
    <Container className="py-16">
      <RevealOnScroll className="mx-auto max-w-2xl">
        <Card className="p-8">
          <PremiumBadge>Create student account</PremiumBadge>
          <h1 className="mt-4 text-3xl font-bold text-navy">Register for online 11+ mocks</h1>
          <p className="mt-2 text-muted">Instant access — sign in straight away with one free English mock, one free Maths mock and one free notes page. Summit Tuition unlocks further mocks and notes individually as you progress.</p>
          <form onSubmit={onSubmit} className="mt-8 grid gap-5">
            <div>
              <label className="text-sm font-bold text-navy" htmlFor="name">Student name</label>
              <input id="name" value={name} onChange={(event) => setName(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-line px-4 outline-none focus:border-gold" required />
            </div>
            <div>
              <label className="text-sm font-bold text-navy" htmlFor="email">Student email</label>
              <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-line px-4 outline-none focus:border-gold" required />
            </div>
            <div>
              <label className="text-sm font-bold text-navy" htmlFor="password">Password</label>
              <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-line px-4 outline-none focus:border-gold" required minLength={8} />
            </div>
            {message && <p className="rounded-xl bg-cream p-3 text-sm text-muted">{message}</p>}
            <AnimatedButton type="submit" className="w-full">Create my account</AnimatedButton>
          </form>
          <p className="mt-5 text-center text-sm text-muted">
            Already registered? <Link href="/login" className="font-bold text-navy underline">Sign in</Link>
          </p>
        </Card>
      </RevealOnScroll>
    </Container>
  );
}

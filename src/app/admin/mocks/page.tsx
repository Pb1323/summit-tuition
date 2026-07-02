"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { RequireAuth, RevealOnScroll } from "@/components/platform/ui";
import { AdminMocksCommandCentre } from "@/components/platform/admin-mocks-command-centre";

export default function AdminMocksPage() {
  return (
    <RequireAuth role="admin">
      <Container className="py-10">
        <RevealOnScroll>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-dark">Mock Command Centre</p>
              <h1 className="mt-2 text-4xl font-black tracking-tight text-navy">Mocks, questions and quality review</h1>
              <p className="mt-3 max-w-3xl text-muted">Generate GL-style drafts, inspect visual quality, preview as a student, publish mocks, and review attempts in one spacious admin workspace.</p>
            </div>
            <Link href="/admin" className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-navy hover:border-gold">
              <ArrowLeft className="h-4 w-4" /> Admin overview
            </Link>
          </div>
        </RevealOnScroll>
        <AdminMocksCommandCentre />
      </Container>
    </RequireAuth>
  );
}

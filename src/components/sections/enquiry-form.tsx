"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SITE } from "@/data/site";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { EnquiryPayload, InterestedProduct } from "@/types/contact";

const PRODUCT_OPTIONS: InterestedProduct[] = [
  "Diagnostic Assessment",
  "Weekly Mock Club",
  "Practice Paper Simulator",
  "Private Tuition",
  "Group Tuition",
  "Complete 11+ Programme",
  "Holiday Booster",
  "Not sure yet",
];

export function EnquiryForm({
  defaultProduct,
  defaultMessage,
}: {
  defaultProduct?: InterestedProduct;
  defaultMessage?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [interestedProduct, setInterestedProduct] = useState<InterestedProduct>(
    defaultProduct ?? "Not sure yet"
  );
  const [consent, setConsent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload: EnquiryPayload = {
      parentName: String(data.get("parentName") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      childYearGroup: String(data.get("childYearGroup") || ""),
      targetSchool: String(data.get("targetSchool") || ""),
      interestedProduct,
      message: String(data.get("message") || ""),
      consent,
    };

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      form.reset();
      setConsent(false);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-line bg-white px-8 py-16 text-center shadow-[0_22px_70px_-48px_rgba(180,83,9,0.42)]" role="status" aria-live="polite">
        <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        <h3 className="text-xl font-semibold text-navy">Thank you — we&apos;ve got it</h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          A member of the team will be in touch within one working day to help you choose the
          right next step for your child.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-line bg-white p-6 shadow-[0_22px_70px_-48px_rgba(180,83,9,0.42)] sm:p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="parentName">Parent name</Label>
          <Input id="parentName" name="parentName" required autoComplete="name" placeholder="Jane Smith" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" placeholder="jane@email.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="07700 900000" />
        </div>
        <div>
          <Label htmlFor="childYearGroup">Child&apos;s year group</Label>
          <Input id="childYearGroup" name="childYearGroup" placeholder="Year 4" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="targetSchool">Target school or local area</Label>
          <Input id="targetSchool" name="targetSchool" placeholder="e.g. Reading, Kent" />
        </div>
        <div>
          <Label htmlFor="interestedProduct">I&apos;m interested in</Label>
          <Select
            value={interestedProduct}
            onValueChange={(v) => setInterestedProduct(v as InterestedProduct)}
          >
            <SelectTrigger id="interestedProduct">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          defaultValue={defaultMessage}
          placeholder="Tell us a little about your child and what you're looking for..."
        />
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="consent"
          checked={consent}
          onCheckedChange={(v) => setConsent(v === true)}
          required
        />
        <Label htmlFor="consent" className="mb-0 font-normal text-muted">
          I consent to {SITE.name} contacting me about my enquiry and storing my
          details in line with the{" "}
          <a href="/privacy-policy" className="underline hover:text-navy">
            privacy policy
          </a>
          .
        </Label>
      </div>

      {status === "error" && (
        <p className="text-sm text-rose-600" role="alert">Something went wrong — please try again.</p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={status === "loading" || !consent}>
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send enquiry"}
      </Button>
    </form>
  );
}

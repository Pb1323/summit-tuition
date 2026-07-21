"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { SITE } from "@/data/site";
import type { CheckoutRequest } from "@/lib/stripe";

interface CheckoutButtonProps extends Omit<ButtonProps, "href" | "onClick"> {
  checkout: CheckoutRequest;
}

export function CheckoutButton({ checkout, children, ...props }: CheckoutButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "unavailable">("idle");

  async function handleClick() {
    setStatus("loading");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checkout),
      });
      if (!res.ok) {
        setStatus("unavailable");
        return;
      }
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        setStatus("unavailable");
      }
    } catch {
      setStatus("unavailable");
    }
  }

  if (status === "unavailable") {
    const whatsappMessage = `Hi! I'd like to sign up for ${checkout.productName}. My registered email is: `;
    const whatsappHref = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    return (
      <div className="flex flex-col items-start gap-1.5">
        <Button {...props} href={whatsappHref} target="_blank" rel="noopener noreferrer">
          Message Us on WhatsApp
        </Button>
        <p className="text-xs text-muted">
          Quote your registered email — we&apos;ll activate your plan shortly after payment.
        </p>
      </div>
    );
  }

  return (
    <Button {...props} onClick={handleClick} disabled={status === "loading"}>
      {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </Button>
  );
}

import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-gold inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5",
  {
    variants: {
      variant: {
        primary:
          "gold-shimmer bg-gradient-to-r from-gold-dark via-gold to-gold-light text-navy-dark shadow-[0_16px_34px_-18px_rgba(180,83,9,0.9)] hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-20px_rgba(180,83,9,0.95)]",
        navy: "bg-navy text-white shadow-[0_16px_34px_-22px_rgba(15,23,42,0.8)] hover:-translate-y-0.5 hover:bg-navy-light",
        outline: "border border-gold/35 bg-white/70 text-navy hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10",
        ghost: "text-navy hover:bg-gold/10",
        light: "border border-gold/25 bg-white/90 text-navy shadow-sm hover:-translate-y-0.5 hover:bg-cream-dark",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

export function Button({ className, variant, size, href, children, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

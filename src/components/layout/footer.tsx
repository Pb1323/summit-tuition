import Link from "next/link";
import { GraduationCap, ShieldCheck, Mail, Phone } from "lucide-react";
import { FOOTER_COLUMNS } from "@/data/nav";
import { SITE } from "@/data/site";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="border-t border-line bg-navy text-cream/80">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/15 text-gold-light">
                <GraduationCap className="h-5 w-5" />
              </span>
              <span className="text-lg font-bold tracking-tight text-white">{SITE.shortName}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
              {SITE.description}
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4 text-gold-light" /> {SITE.email}
              </a>
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4 text-gold-light" /> {SITE.phone}
              </a>
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/40">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-cream/70 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-cream/50 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-2 max-w-xl">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" />
            <p>
              Safeguarding matters to us. All tutors are DBS-checked and sessions follow our{" "}
              <Link href="/safeguarding" className="underline hover:text-white">
                safeguarding policy
              </Link>
              . Results vary by child; admissions rules and test formats vary by school and local
              authority.
            </p>
          </div>
          <p>© {SITE.copyrightYear} {SITE.name}. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

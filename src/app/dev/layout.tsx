import { notFound } from "next/navigation";

/** These are local-only design previews (see PROJECT_CONTEXT.md) — never publish them to production. */
export default function DevLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === "production") notFound();
  return <>{children}</>;
}

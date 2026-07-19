import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // CLI commands (db push, migrate, studio) need a direct, non-pooled connection —
    // Supabase's pgbouncer transaction-pooling mode (DATABASE_URL) doesn't support the
    // advisory locks Prisma's schema diffing relies on and hangs indefinitely.
    url: process.env.DIRECT_URL || process.env.DATABASE_URL || "postgresql://summit:local@localhost:5432/summit_tuition",
  },
});

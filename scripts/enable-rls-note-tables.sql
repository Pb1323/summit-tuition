-- Fixes Supabase Security Advisor errors: RLS Disabled in Public
-- on public."Note" and public."NoteUnlock".
--
-- This app (Prisma, via DATABASE_URL/DIRECT_URL) connects as the table owner,
-- which bypasses RLS regardless of policies, so enabling RLS here with no
-- policies only blocks Supabase's PostgREST/GraphQL API (anon/authenticated
-- roles) from reading/writing these tables directly. The app itself is
-- unaffected.

ALTER TABLE public."Note" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."NoteUnlock" ENABLE ROW LEVEL SECURITY;

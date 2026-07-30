import "server-only";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/server/auth";
import { NOTE_PAGES } from "@/data/platform";
import type { StudentAccount } from "@/types/platform";

/**
 * Notes lesson content (concept cards, worked examples, self-check answers) must
 * never reach the browser for a note the current session isn't entitled to — a
 * page that imports its topic content only after this returns a user is what
 * actually keeps that data out of the client bundle for a locked/anonymous
 * visitor, since a client-component page's top-level imports ship regardless of
 * any runtime render check. Redirects (mirroring the old client-side RequireAuth)
 * for a missing session or wrong role; returns null (not a redirect) for a valid
 * student who just isn't entitled to this specific note, so the caller can render
 * a locked notice instead of the real content.
 */
export async function requireNoteAccess(noteId: string): Promise<StudentAccount | null> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "student" && user.role !== "admin") redirect("/dashboard");
  return isNoteEntitled(noteId, user) ? user : null;
}

export function isNoteEntitled(noteId: string, user: StudentAccount): boolean {
  const note = NOTE_PAGES.find((item) => item.id === noteId);
  return user.role === "admin" || Boolean(note?.isFree) || user.unlockedNoteIds.includes(noteId);
}

import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "vr-codes-ciphers";

export default async function CodesEssentialsNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { codesEssentialsTopic } = await import("@/components/notes/notes-content/codes-essentials");
  return <NotesTopicPage topic={codesEssentialsTopic} />;
}

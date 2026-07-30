import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "maths-numbers";

export default async function NumbersNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { numbersTopic } = await import("@/components/notes/notes-content/numbers");
  return <NotesTopicPage topic={numbersTopic} />;
}

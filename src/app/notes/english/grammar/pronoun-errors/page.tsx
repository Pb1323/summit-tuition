import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "english-grammar";

export default async function PronounErrorsNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { pronounErrorsTopic } = await import("@/components/notes/notes-content/pronoun-errors");
  return <NotesTopicPage topic={pronounErrorsTopic} />;
}

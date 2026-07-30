import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "english-grammar";

export default async function ApostrophesPossessionErrorsNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { apostrophesPossessionErrorsTopic } = await import("@/components/notes/notes-content/apostrophes-possession-errors");
  return <NotesTopicPage topic={apostrophesPossessionErrorsTopic} />;
}

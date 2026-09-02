import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "gcse-biology-cell-biology";

export default async function GcseBiologyCellBiologyNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { biologyCellBiologyTopic } = await import("@/components/notes/notes-content/biology-cell-biology");
  return <NotesTopicPage topic={biologyCellBiologyTopic} />;
}

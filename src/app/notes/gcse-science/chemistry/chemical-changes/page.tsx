import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "gcse-chemistry-chemical-changes";

export default async function GcseChemistryChemicalChangesNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { chemistryChemicalChangesTopic } = await import("@/components/notes/notes-content/chemistry-chemical-changes");
  return <NotesTopicPage topic={chemistryChemicalChangesTopic} />;
}

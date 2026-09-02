import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "gcse-chemistry-atomic-structure-periodic-table";

export default async function GcseChemistryAtomicStructurePeriodicTableNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { chemistryAtomicStructurePeriodicTableTopic } = await import("@/components/notes/notes-content/chemistry-atomic-structure-periodic-table");
  return <NotesTopicPage topic={chemistryAtomicStructurePeriodicTableTopic} />;
}

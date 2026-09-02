import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "gcse-chemistry-quantitative-chemistry";

export default async function GcseChemistryQuantitativeChemistryNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { chemistryQuantitativeChemistryTopic } = await import("@/components/notes/notes-content/chemistry-quantitative-chemistry");
  return <NotesTopicPage topic={chemistryQuantitativeChemistryTopic} />;
}

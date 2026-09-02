import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "gcse-chemistry-organic-chemistry";

export default async function GcseChemistryOrganicChemistryNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { chemistryOrganicChemistryTopic } = await import("@/components/notes/notes-content/chemistry-organic-chemistry");
  return <NotesTopicPage topic={chemistryOrganicChemistryTopic} />;
}

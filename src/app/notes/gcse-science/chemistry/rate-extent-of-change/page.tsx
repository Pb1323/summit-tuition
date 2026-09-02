import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "gcse-chemistry-rate-extent-of-change";

export default async function GcseChemistryRateExtentOfChangeNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { chemistryRateExtentOfChangeTopic } = await import("@/components/notes/notes-content/chemistry-rate-extent-of-change");
  return <NotesTopicPage topic={chemistryRateExtentOfChangeTopic} />;
}

import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "gcse-chemistry-using-resources";

export default async function GcseChemistryUsingResourcesNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { chemistryUsingResourcesTopic } = await import("@/components/notes/notes-content/chemistry-using-resources");
  return <NotesTopicPage topic={chemistryUsingResourcesTopic} />;
}

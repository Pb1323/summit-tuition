import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "gcse-chemistry-chemistry-of-the-atmosphere";

export default async function GcseChemistryChemistryOfTheAtmosphereNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { chemistryChemistryOfTheAtmosphereTopic } = await import("@/components/notes/notes-content/chemistry-chemistry-of-the-atmosphere");
  return <NotesTopicPage topic={chemistryChemistryOfTheAtmosphereTopic} />;
}

import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "gcse-biology-infection-response";

export default async function GcseBiologyInfectionResponseNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { biologyInfectionResponseTopic } = await import("@/components/notes/notes-content/biology-infection-response");
  return <NotesTopicPage topic={biologyInfectionResponseTopic} />;
}

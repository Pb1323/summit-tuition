import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "gcse-biology-organisation";

export default async function GcseBiologyOrganisationNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { biologyOrganisationTopic } = await import("@/components/notes/notes-content/biology-organisation");
  return <NotesTopicPage topic={biologyOrganisationTopic} />;
}

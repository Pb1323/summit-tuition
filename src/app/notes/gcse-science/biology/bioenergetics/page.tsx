import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "gcse-biology-bioenergetics";

export default async function GcseBiologyBioenergeticsNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { biologyBioenergeticsTopic } = await import("@/components/notes/notes-content/biology-bioenergetics");
  return <NotesTopicPage topic={biologyBioenergeticsTopic} />;
}

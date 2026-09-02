import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "gcse-biology-ecology";

export default async function GcseBiologyEcologyNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { biologyEcologyTopic } = await import("@/components/notes/notes-content/biology-ecology");
  return <NotesTopicPage topic={biologyEcologyTopic} />;
}

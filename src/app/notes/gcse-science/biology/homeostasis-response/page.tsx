import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "gcse-biology-homeostasis-response";

export default async function GcseBiologyHomeostasisResponseNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { biologyHomeostasisResponseTopic } = await import("@/components/notes/notes-content/biology-homeostasis-response");
  return <NotesTopicPage topic={biologyHomeostasisResponseTopic} />;
}

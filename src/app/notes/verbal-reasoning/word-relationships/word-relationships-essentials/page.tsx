import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "vr-word-relationships";

export default async function WordRelationshipsEssentialsNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { wordRelationshipsEssentialsTopic } = await import("@/components/notes/notes-content/word-relationships-essentials");
  return <NotesTopicPage topic={wordRelationshipsEssentialsTopic} />;
}

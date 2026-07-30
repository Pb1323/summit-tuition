import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "maths-algebra";

export default async function AlgebraNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { algebraTopic } = await import("@/components/notes/notes-content/algebra");
  return <NotesTopicPage topic={algebraTopic} />;
}

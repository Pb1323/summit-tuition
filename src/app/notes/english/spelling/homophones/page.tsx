import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "english-spelling";

export default async function HomophonesNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { homophonesTopic } = await import("@/components/notes/notes-content/homophones");
  return <NotesTopicPage topic={homophonesTopic} />;
}

import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "maths-geometry";

export default async function GeometryNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { geometryTopic } = await import("@/components/notes/notes-content/geometry");
  return <NotesTopicPage topic={geometryTopic} />;
}

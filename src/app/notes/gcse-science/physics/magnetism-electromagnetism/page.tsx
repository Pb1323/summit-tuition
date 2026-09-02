import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "gcse-physics-magnetism-electromagnetism";

export default async function GcsePhysicsMagnetismElectromagnetismNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { physicsMagnetismElectromagnetismTopic } = await import("@/components/notes/notes-content/physics-magnetism-electromagnetism");
  return <NotesTopicPage topic={physicsMagnetismElectromagnetismTopic} />;
}

import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "gcse-physics-atomic-structure";

export default async function GcsePhysicsAtomicStructureNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { physicsAtomicStructureTopic } = await import("@/components/notes/notes-content/physics-atomic-structure");
  return <NotesTopicPage topic={physicsAtomicStructureTopic} />;
}

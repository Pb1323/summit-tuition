import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "gcse-physics-space-physics";

export default async function GcsePhysicsSpacePhysicsNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { physicsSpacePhysicsTopic } = await import("@/components/notes/notes-content/physics-space-physics");
  return <NotesTopicPage topic={physicsSpacePhysicsTopic} />;
}

import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "gcse-physics-energy";

export default async function GcsePhysicsEnergyNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { physicsEnergyTopic } = await import("@/components/notes/notes-content/physics-energy");
  return <NotesTopicPage topic={physicsEnergyTopic} />;
}

import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "gcse-chemistry-bonding-structure-properties";

export default async function GcseChemistryBondingStructurePropertiesNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { chemistryBondingStructurePropertiesTopic } = await import("@/components/notes/notes-content/chemistry-bonding-structure-properties");
  return <NotesTopicPage topic={chemistryBondingStructurePropertiesTopic} />;
}

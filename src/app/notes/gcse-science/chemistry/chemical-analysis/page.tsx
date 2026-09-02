import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "gcse-chemistry-chemical-analysis";

export default async function GcseChemistryChemicalAnalysisNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { chemistryChemicalAnalysisTopic } = await import("@/components/notes/notes-content/chemistry-chemical-analysis");
  return <NotesTopicPage topic={chemistryChemicalAnalysisTopic} />;
}

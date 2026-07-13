"use client";

import { RequireAuth, RequireNoteAccess } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { inferenceTopic } from "@/components/notes/notes-content/inference";

export default function InferenceNotesPage() {
  return (
    <RequireAuth role="student">
      <RequireNoteAccess noteId="english-comprehension">
        <NotesTopicPage topic={inferenceTopic} />
      </RequireNoteAccess>
    </RequireAuth>
  );
}

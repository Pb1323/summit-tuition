"use client";

import { RequireAuth, RequireNoteAccess } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { pronounErrorsTopic } from "@/components/notes/notes-content/pronoun-errors";

export default function PronounErrorsNotesPage() {
  return (
    <RequireAuth role="student">
      <RequireNoteAccess noteId="english-grammar">
        <NotesTopicPage topic={pronounErrorsTopic} />
      </RequireNoteAccess>
    </RequireAuth>
  );
}

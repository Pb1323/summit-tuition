"use client";

import { RequireAuth, RequireNoteAccess } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { numbersTopic } from "@/components/notes/notes-content/numbers";

export default function NumbersNotesPage() {
  return (
    <RequireAuth role="student">
      <RequireNoteAccess noteId="maths-numbers">
        <NotesTopicPage topic={numbersTopic} />
      </RequireNoteAccess>
    </RequireAuth>
  );
}

"use client";

import { RequireAuth, RequireNoteAccess } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { algebraTopic } from "@/components/notes/notes-content/algebra";

export default function AlgebraNotesPage() {
  return (
    <RequireAuth role="student">
      <RequireNoteAccess noteId="maths-algebra">
        <NotesTopicPage topic={algebraTopic} />
      </RequireNoteAccess>
    </RequireAuth>
  );
}

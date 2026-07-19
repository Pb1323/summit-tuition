"use client";

import { RequireAuth, RequireNoteAccess } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { homophonesTopic } from "@/components/notes/notes-content/homophones";

export default function HomophonesNotesPage() {
  return (
    <RequireAuth role="student">
      <RequireNoteAccess noteId="english-spelling">
        <NotesTopicPage topic={homophonesTopic} />
      </RequireNoteAccess>
    </RequireAuth>
  );
}

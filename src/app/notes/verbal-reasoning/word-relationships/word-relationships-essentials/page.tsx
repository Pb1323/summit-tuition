"use client";

import { RequireAuth, RequireNoteAccess } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { wordRelationshipsEssentialsTopic } from "@/components/notes/notes-content/word-relationships-essentials";

export default function WordRelationshipsEssentialsNotesPage() {
  return (
    <RequireAuth role="student">
      <RequireNoteAccess noteId="vr-word-relationships">
        <NotesTopicPage topic={wordRelationshipsEssentialsTopic} />
      </RequireNoteAccess>
    </RequireAuth>
  );
}

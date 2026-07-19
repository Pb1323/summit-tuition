"use client";

import { RequireAuth, RequireNoteAccess } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { apostrophesPossessionErrorsTopic } from "@/components/notes/notes-content/apostrophes-possession-errors";

export default function ApostrophesPossessionErrorsNotesPage() {
  return (
    <RequireAuth role="student">
      <RequireNoteAccess noteId="english-grammar">
        <NotesTopicPage topic={apostrophesPossessionErrorsTopic} />
      </RequireNoteAccess>
    </RequireAuth>
  );
}

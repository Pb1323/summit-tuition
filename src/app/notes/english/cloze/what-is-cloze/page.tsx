"use client";

import { RequireAuth, RequireNoteAccess } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { whatIsClozeTopic } from "@/components/notes/notes-content/what-is-cloze";

export default function WhatIsClozeNotesPage() {
  return (
    <RequireAuth role="student">
      <RequireNoteAccess noteId="english-cloze">
        <NotesTopicPage topic={whatIsClozeTopic} />
      </RequireNoteAccess>
    </RequireAuth>
  );
}

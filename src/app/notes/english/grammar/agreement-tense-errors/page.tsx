"use client";

import { RequireAuth, RequireNoteAccess } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { agreementTenseErrorsTopic } from "@/components/notes/notes-content/agreement-tense-errors";

export default function AgreementTenseErrorsNotesPage() {
  return (
    <RequireAuth role="student">
      <RequireNoteAccess noteId="english-grammar">
        <NotesTopicPage topic={agreementTenseErrorsTopic} />
      </RequireNoteAccess>
    </RequireAuth>
  );
}

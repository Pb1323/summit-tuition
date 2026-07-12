"use client";

import { RequireAuth } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { agreementTenseErrorsTopic } from "@/components/notes/notes-content/agreement-tense-errors";

export default function AgreementTenseErrorsNotesPage() {
  return (
    <RequireAuth role="student">
      <NotesTopicPage topic={agreementTenseErrorsTopic} />
    </RequireAuth>
  );
}

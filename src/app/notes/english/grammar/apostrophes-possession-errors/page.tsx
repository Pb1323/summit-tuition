"use client";

import { RequireAuth } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { apostrophesPossessionErrorsTopic } from "@/components/notes/notes-content/apostrophes-possession-errors";

export default function ApostrophesPossessionErrorsNotesPage() {
  return (
    <RequireAuth role="student">
      <NotesTopicPage topic={apostrophesPossessionErrorsTopic} />
    </RequireAuth>
  );
}

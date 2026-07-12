"use client";

import { RequireAuth } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { partsOfSpeechErrorsTopic } from "@/components/notes/notes-content/parts-of-speech-errors";

export default function PartsOfSpeechErrorsNotesPage() {
  return (
    <RequireAuth role="student">
      <NotesTopicPage topic={partsOfSpeechErrorsTopic} />
    </RequireAuth>
  );
}

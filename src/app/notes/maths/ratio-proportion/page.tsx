"use client";

import { RequireAuth, RequireNoteAccess } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { ratioProportionTopic } from "@/components/notes/notes-content/ratio-proportion";

export default function RatioProportionNotesPage() {
  return (
    <RequireAuth role="student">
      <RequireNoteAccess noteId="maths-ratio-proportion">
        <NotesTopicPage topic={ratioProportionTopic} />
      </RequireNoteAccess>
    </RequireAuth>
  );
}

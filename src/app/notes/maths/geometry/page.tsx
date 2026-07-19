"use client";

import { RequireAuth, RequireNoteAccess } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { geometryTopic } from "@/components/notes/notes-content/geometry";

export default function GeometryNotesPage() {
  return (
    <RequireAuth role="student">
      <RequireNoteAccess noteId="maths-geometry">
        <NotesTopicPage topic={geometryTopic} />
      </RequireNoteAccess>
    </RequireAuth>
  );
}

---
name: status-tracker
description: Keeps status.md (project root) as the always-current, plain-English handover log for the Summit Tuition 11+ project. Triggers whenever work happens in this project — content generation, planning, file edits, discussing next steps, or reviewing status. Reads status.md first to load context, and updates its tracker block at the end of every session so a future session with zero memory of this one can pick up immediately.
---

# Status tracker

## On trigger (before doing anything else)

1. Read `status.md` at the project root first. It's the plain-English status
   log the human (and other agents working on this same repo) rely on — don't
   skip it even if the task looks small.
2. If the task involves planning or "what's next," also skim `TODO.md` — the
   forward-looking companion doc.
3. Multiple agents work on this repo in parallel. Treat `status.md` as shared
   state: if it mentions another agent's in-progress work, don't overwrite or
   contradict it — work around it and flag any conflict to the user instead
   of guessing.

## At the end of every session/response that touches this project

Update the tracker block near the top of `status.md` — the four sections
`## Done`, `## In Progress`, `## Next Up`, `## Decisions / Notes`:

- **Done** — move anything finished this session in, in plain English. No
  jargon, no file paths, no code terms — write it the way you'd tell a
  non-technical person what got finished.
- **In Progress** — rewrite to say exactly where things were left off. Be
  specific enough that a session with zero memory of this one could pick up
  immediately without asking questions.
- **Next Up** — rewrite with clear, plain-English next steps. This is a
  quick-glance summary, not the full backlog — the detailed list still lives
  in `TODO.md`.
- **Decisions / Notes** — if a decision got made or a question got resolved
  this session, add one terse line.

Keep every entry short. Write it like a note left for a busy person, not
documentation.

## Don't

- Don't create a new `STATUS.md` file. `status.md` (lowercase) is the one
  file — on this Windows repo a differently-cased filename resolves to the
  *same* file, so a second file would silently clobber another agent's work
  instead of coexisting with it.
- Don't rewrite the long narrative sections below the tracker block (the
  numbered sections describing the whole product, business research, etc.)
  unless the user explicitly asks for a full status rewrite — those are
  maintained separately and read by other sessions/agents.
- Don't remove the placeholder lines from a section that has nothing new to
  report — leave a short "(no change this session)" instead of an empty
  section.

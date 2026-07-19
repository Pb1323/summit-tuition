import { expect, test } from "@playwright/test";
import { loginAsDemoUser, SEEDED } from "./helpers";

function studentRowLocator(page: import("@playwright/test").Page, email: string) {
  // Each row in the "All Student Accounts" list is a `rounded-2xl border-line bg-white p-5`
  // div; the wrapping GlowCard around the whole list uses the same base classes but `p-6`
  // instead, so `.p-5` disambiguates a single student's row from the section wrapper.
  return page.locator("div.rounded-2xl.border-line.bg-white.p-5", { hasText: email });
}

test("admin assigns a plan and unlocks a mock/note for a pending student", async ({ page }) => {
  test.setTimeout(60_000);
  await loginAsDemoUser(page, SEEDED.admin.id, SEEDED.admin.email);
  await page.goto("/admin/students");
  await expect(page.getByRole("heading", { name: "Student approvals and mock unlocks" })).toBeVisible();

  const studentRow = studentRowLocator(page, SEEDED.student2.email);
  await expect(studentRow.getByRole("heading", { name: "Test Student" })).toBeVisible();

  // Assign a plan.
  const planSelect = studentRow.getByLabel("Assign plan for Test Student");
  await planSelect.selectOption({ label: "Weekly Mock Club Plus" });
  await expect(planSelect).toHaveValue("Weekly Mock Club Plus");

  // Unlock a published mock (student-2 starts with zero unlocked mocks).
  // The unlock panel is now a collapsed "Unlocks for {name}" disclosure (part of the
  // "Fix duplicate/clunky student unlock table" rework) — expand it before locating
  // the per-mock checkbox.
  // Use a plain click + a polling expect (rather than `.check()`, whose own built-in
  // re-verification window is shorter than the round-trip these demo-mode admin actions
  // take: they always attempt a real POST first, get a 503 since no DATABASE_URL is set,
  // and only then fall back to a local state update).
  await studentRow.getByRole("button", { name: /Unlocks for Test Student/ }).click();
  const mockCheckbox = studentRow.locator("label", { hasText: "Maths Diagnostic Sample" }).locator('input[type="checkbox"]');
  await expect(mockCheckbox).not.toBeChecked();
  await mockCheckbox.click();
  await expect(mockCheckbox).toBeChecked();

  // Unlock a notes page (student-2 only has the free strands by default).
  const noteCheckbox = studentRow.locator("label", { hasText: "English: Grammar" }).locator('input[type="checkbox"]');
  await expect(noteCheckbox).not.toBeChecked();
  await noteCheckbox.click();
  await expect(noteCheckbox).toBeChecked();

  // A hard reload re-reads from localStorage: confirm the unlocks actually persisted,
  // not just local component state.
  await page.reload();
  const reloadedRow = studentRowLocator(page, SEEDED.student2.email);
  await expect(reloadedRow.getByLabel("Assign plan for Test Student")).toHaveValue("Weekly Mock Club Plus");
  await reloadedRow.getByRole("button", { name: /Unlocks for Test Student/ }).click();
  await expect(reloadedRow.locator("label", { hasText: "Maths Diagnostic Sample" }).locator('input[type="checkbox"]')).toBeChecked();
  await expect(reloadedRow.locator("label", { hasText: "English: Grammar" }).locator('input[type="checkbox"]')).toBeChecked();
});

test("admin generates, quality-checks, publishes, unpublishes, clones and archives a mock draft", async ({ page }) => {
  test.setTimeout(90_000);
  const draftTitle = `QA Draft ${Date.now()}`;

  await loginAsDemoUser(page, SEEDED.admin.id, SEEDED.admin.email);
  await page.goto("/admin/mocks#generate");
  await expect(page.getByRole("heading", { name: "Mocks, questions and quality review" })).toBeVisible();

  await page.getByPlaceholder("Optional draft title").fill(draftTitle);
  await page.getByRole("button", { name: "Generate draft" }).click();
  await expect(page.getByText(/50\/50 questions generated/i)).toBeVisible();

  // --- Quality check panel: filtering to the new draft shows exactly one result with a
  // pass/fail checklist and a Ready / Needs Review / Broken Draft status badge. ---
  const qualitySection = page.locator("#quality");
  await qualitySection.getByPlaceholder("Search by title or subject...").fill(draftTitle);
  await expect(qualitySection.getByText(draftTitle)).toBeVisible();
  await expect(qualitySection.getByText("1 shown")).toBeVisible();

  // --- Drafts panel: expand the new mock row and publish it. ---
  const draftsSection = page.locator("#drafts");
  await draftsSection.getByPlaceholder(/Search \d+ mocks? by title/).fill(draftTitle);
  const draftRow = draftsSection.getByRole("button", { name: new RegExp(draftTitle) });
  await expect(draftRow).toBeVisible();
  await draftRow.click();
  await expect(draftsSection.getByRole("button", { name: "Publish" })).toBeVisible();
  await draftsSection.getByRole("button", { name: "Publish" }).click();
  await expect(draftsSection.getByText(draftTitle)).toHaveCount(0);

  // --- Published panel: the mock now lives here; unpublish it again. ---
  const publishedSection = page.locator("#published");
  await publishedSection.getByPlaceholder(/Search \d+ mocks? by title/).fill(draftTitle);
  const publishedRow = publishedSection.getByRole("button", { name: new RegExp(draftTitle) });
  await expect(publishedRow).toBeVisible();
  await publishedRow.click();
  await expect(publishedSection.getByRole("button", { name: "Unpublish" })).toBeVisible();
  await publishedSection.getByRole("button", { name: "Unpublish" }).click();
  await expect(publishedSection.getByText(draftTitle)).toHaveCount(0);

  // --- Clone from the Overview panel: confirm it appears as an unpublished Admin draft. ---
  const overviewSection = page.locator("#overview");
  await overviewSection.getByPlaceholder(/Search \d+ mocks? by title/).fill(draftTitle);
  const overviewRow = overviewSection.getByRole("button", { name: new RegExp(draftTitle) });
  await expect(overviewRow).toBeVisible();
  await overviewRow.click();
  await overviewSection.getByRole("button", { name: "Clone" }).click();
  await expect(page.getByText(new RegExp(`Cloned "${draftTitle}" as an unpublished draft`))).toBeVisible();

  const cloneTitle = `${draftTitle} Copy`;
  await draftsSection.getByPlaceholder(/Search \d+ mocks? by title/).fill(cloneTitle);
  const cloneRow = draftsSection.getByRole("button", { name: new RegExp(cloneTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) });
  await expect(cloneRow).toBeVisible();
  await expect(draftsSection.getByText("Draft").first()).toBeVisible();

  // --- Archive the clone: confirm it moves out of Drafts into the Archive section. ---
  await cloneRow.click();
  await draftsSection.getByRole("button", { name: "Archive" }).click();
  await expect(page.getByText(new RegExp(`Archived "${cloneTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`))).toBeVisible();
  await expect(draftsSection.getByText(cloneTitle)).toHaveCount(0);

  const archiveSection = page.locator("#archive");
  await archiveSection.getByPlaceholder(/Search \d+ mocks? by title/).fill(cloneTitle);
  await expect(archiveSection.getByText(cloneTitle)).toBeVisible();
});

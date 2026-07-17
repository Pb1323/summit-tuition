import { expect, test } from "@playwright/test";
import { loginAsDemoUser, SEEDED } from "./helpers";

/**
 * Light coverage for three recently-landed features (see status.md /
 * CLAUDE.md "Recent Feature State" around 2026-07-17):
 *  1. Admin "Preview report (PDF)" before releasing (student-mock-flow.spec.ts already
 *     covers the release + student-review path end to end; this only adds the
 *     not-yet-released preview step admins see first).
 *  2. Per-student lessons editor on /admin/students.
 *  3. Printable-mocks flow at /mocks/[id]/print (no score/report, print-only content).
 */

test("admin previews an unreleased report (PDF view) before releasing it", async ({ page }) => {
  test.setTimeout(60_000);
  // Fresh attempt slate, then submit a short mock as student-1 so there's a
  // "submitted" (not yet released) attempt to preview.
  await loginAsDemoUser(page, SEEDED.student1.id, SEEDED.student1.email, { resetAttempts: true });
  await page.goto("/mocks/maths-gl-1");
  await page.getByRole("button", { name: "Start timed mock" }).click();
  await expect(page.getByText("Question 1")).toBeVisible();
  const radioOption = page.locator("fieldset label").first();
  if (await radioOption.count()) {
    await radioOption.click();
  } else {
    await page.getByPlaceholder("Type your answer").fill("33");
  }
  await page.getByRole("button", { name: "Review & submit" }).click();
  await expect(page.getByRole("heading", { name: "Review before you submit" })).toBeVisible();
  await page.getByRole("button", { name: "Submit for marking" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);

  // Admin: find the submitted attempt and open its PDF-style preview before releasing.
  await loginAsDemoUser(page, SEEDED.admin.id, SEEDED.admin.email);
  await page.goto("/admin/mocks#attempts");
  const attemptsSection = page.locator("#attempts");
  await expect(attemptsSection.getByText("Maths Diagnostic Sample").first()).toBeVisible();
  await expect(attemptsSection.getByText("submitted", { exact: true }).first()).toBeVisible();

  const previewLink = attemptsSection.getByRole("link", { name: "Preview report (PDF)" }).first();
  await expect(previewLink).toBeVisible();
  await previewLink.click();

  // Admin-only PDF-style report page: score, topic breakdown, and a print action —
  // but no "release" affordance here, this is a preview only.
  await expect(page).toHaveURL(/\/admin\/reports\/.+/);
  await expect(page.getByText("Summit Tuition · Admin-only report")).toBeVisible();
  await expect(page.getByText("Marks by topic")).toBeVisible();
  await expect(page.getByRole("button", { name: "Print / Save as PDF" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to attempts" })).toBeVisible();

  // The student can't see any of this yet — report is still pending on their side.
  await loginAsDemoUser(page, SEEDED.student1.id, SEEDED.student1.email);
  await page.goto("/mocks/maths-gl-1/review");
  await expect(page.getByRole("heading", { name: "Report not released yet" })).toBeVisible();
});

test("admin edits a student's lessons-remaining count and upcoming lessons", async ({ page }) => {
  test.setTimeout(60_000);
  await loginAsDemoUser(page, SEEDED.admin.id, SEEDED.admin.email);
  await page.goto("/admin/students");
  await expect(page.getByRole("heading", { name: "Student approvals and mock unlocks" })).toBeVisible();

  const studentRow = page.locator("div.rounded-2xl.border-line.bg-white.p-5", { hasText: SEEDED.student2.email });
  const lessonsToggle = studentRow.getByRole("button", { name: /Lessons — \d+ remaining, \d+ upcoming/ });
  await expect(lessonsToggle).toBeVisible();
  await lessonsToggle.click();

  const remainingInput = studentRow.getByLabel("Lessons remaining");
  await remainingInput.fill("4");
  await expect(remainingInput).toHaveValue("4");
  // The toggle label re-derives its "X remaining" count from the same state.
  await expect(studentRow.getByRole("button", { name: /Lessons — 4 remaining/ })).toBeVisible();

  await studentRow.getByRole("button", { name: "Add upcoming lesson" }).click();
  await studentRow.locator('input[type="date"]').last().fill("2026-08-01");
  await studentRow.locator('input[type="time"]').last().fill("16:00");
  await studentRow.getByPlaceholder("Subject / note").last().fill("Maths — ratio recap");

  // Each field edit fires its own async POST-then-localStorage-fallback save (like the
  // unlock checkboxes); let those settle before reloading, or a fast reload can race
  // ahead of the last write.
  await page.waitForLoadState("networkidle");

  // Persists via the same POST-then-localStorage-fallback pattern as unlocks: confirm
  // it survives a hard reload, not just local component state.
  await page.reload();
  const reloadedRow = page.locator("div.rounded-2xl.border-line.bg-white.p-5", { hasText: SEEDED.student2.email });
  await expect(reloadedRow.getByRole("button", { name: /Lessons — 4 remaining/ })).toBeVisible();
  await reloadedRow.getByRole("button", { name: /Lessons — 4 remaining/ }).click();
  await expect(reloadedRow.getByPlaceholder("Subject / note").last()).toHaveValue("Maths — ratio recap");
});

test("printable mock shows print-only content with no score or report UI", async ({ page }) => {
  test.setTimeout(30_000);
  const PRINT_MOCK_ID = "maths-print-sample";

  // Unlocked (seeded) student can open and print the paper; no score/marking UI appears.
  await loginAsDemoUser(page, "student-demo-testing", "priya.demo@summittuition.local");
  await page.goto(`/mocks/${PRINT_MOCK_ID}/print`);
  await expect(page.getByRole("heading", { name: "Maths Printable Practice Sample" })).toBeVisible();
  await expect(page.getByText(/no online marking or report/i)).toBeVisible();
  await expect(page.getByRole("button", { name: "Print this paper" })).toBeVisible();

  // No score, percentage, submit, or report affordances anywhere on the page.
  await expect(page.getByText(/marked score/i)).toHaveCount(0);
  await expect(page.getByRole("button", { name: /submit/i })).toHaveCount(0);
  await expect(page.getByText(/report released|report pending/i)).toHaveCount(0);

  // A student who hasn't unlocked this printable mock is refused access.
  await loginAsDemoUser(page, SEEDED.student2.id, SEEDED.student2.email);
  await page.goto(`/mocks/${PRINT_MOCK_ID}/print`);
  await expect(page.getByText("This printable mock isn't available.")).toBeVisible();
});

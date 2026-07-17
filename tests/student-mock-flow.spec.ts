import { expect, test, type Page } from "@playwright/test";
import { loginAsDemoUser, SEEDED } from "./helpers";

/**
 * Full student -> admin -> student loop for a short mock (`maths-gl-1`, 9 questions),
 * one of student-1's two already-unlocked seeded mocks.
 *
 * Note: the seed data (`ATTEMPTS` in src/data/platform.ts) ships both of student-1's
 * unlocked mocks with a pre-existing terminal attempt (maths-gl-1 already
 * "report_released", english-gl-1 already "submitted"). That's realistic demo content,
 * but it means a fresh, out-of-the-box browser can't actually sit either mock through
 * the UI. This spec resets local attempt state once at login so the mock room opens in
 * its "not yet started" state, matching what a truly first-time student would see.
 */
const MOCK_ID = "maths-gl-1";
const MOCK_TITLE = "Maths Diagnostic Sample";

async function answerCurrentQuestion(page: Page, fallbackText: string) {
  const radioOption = page.locator("fieldset label").first();
  if (await radioOption.count()) {
    await radioOption.click();
    return;
  }
  const textInput = page.getByPlaceholder("Type your answer");
  await expect(textInput).toBeVisible();
  await textInput.fill(fallbackText);
}

test("student takes a mock, submits, admin releases the report, student reviews it", async ({ page }) => {
  test.setTimeout(90_000);
  // --- Student: sign in with a clean attempt slate and start the mock ---
  await loginAsDemoUser(page, SEEDED.student1.id, SEEDED.student1.email, { resetAttempts: true });
  await page.goto("/dashboard");
  await expect(page.getByRole("heading", { name: /Welcome back/i })).toBeVisible();

  await expect(page.getByText(MOCK_TITLE).first()).toBeVisible();
  await page.getByRole("link", { name: "Start mock" }).first().click();
  await expect(page).toHaveURL(new RegExp(`/mocks/${MOCK_ID}$`));

  await expect(page.getByRole("heading", { name: MOCK_TITLE })).toBeVisible();
  await page.getByRole("button", { name: "Start timed mock" }).click();

  // Q1 (multiple choice): pick an option.
  await expect(page.getByText("Question 1")).toBeVisible();
  await answerCurrentQuestion(page, "33");
  await expect(page.getByRole("button", { name: /Question 1, answered/ })).toBeVisible();

  // Move to Q2 (short number) with Next, answer it, then flag it.
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(page.getByText("Question 2")).toBeVisible();
  await answerCurrentQuestion(page, "48");
  await page.getByRole("button", { name: "Flag question" }).click();
  await expect(page.getByRole("button", { name: "Flagged", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: /Question 2, answered, flagged/ })).toBeVisible();

  // Jump straight to Q4 via the navigator (proves out-of-order navigation), answer it.
  await page.getByRole("button", { name: "Question 4, unanswered" }).click();
  await expect(page.getByText("Question 4")).toBeVisible();
  await answerCurrentQuestion(page, "26");

  // Jump to Q5 too, for a total of 4 answered questions of mixed types.
  await page.getByRole("button", { name: "Question 5, unanswered" }).click();
  await expect(page.getByText("Question 5")).toBeVisible();
  await answerCurrentQuestion(page, "30");

  // Submit (leaving Q3, Q6-9 unanswered on purpose to exercise the "unanswered" warning).
  await page.getByRole("button", { name: "Review & submit" }).click();
  await expect(page.getByRole("heading", { name: "Review before you submit" })).toBeVisible();
  await expect(page.getByText(/unanswered question/)).toBeVisible();
  await page.getByRole("button", { name: "Submit for marking" }).click();

  // Back on the dashboard: awaiting-release state only, no score or answers.
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByText("Report pending").first()).toBeVisible();
  await expect(page.getByText(/Submitted .* Your result and full review will be released after marking/)).toBeVisible();

  // --- Admin: find the new attempt, add feedback, release the report ---
  await loginAsDemoUser(page, SEEDED.admin.id, SEEDED.admin.email);
  await page.goto("/admin/mocks#attempts");
  const attemptsSection = page.locator("#attempts");
  const attemptCard = attemptsSection.locator(".rounded-3xl, [class*='rounded']", { hasText: MOCK_TITLE }).first();
  await expect(attemptsSection.getByText(MOCK_TITLE).first()).toBeVisible();

  const feedbackBox = attemptsSection.getByPlaceholder("Manual feedback notes").first();
  await feedbackBox.fill("Great effort — revisit ratio sharing and geometry perimeter working.");
  await attemptsSection.getByRole("button", { name: "Release report" }).first().click();
  await expect(attemptsSection.getByText("report released").first()).toBeVisible();

  // --- Student: open the review page, confirm the full report is now visible ---
  await loginAsDemoUser(page, SEEDED.student1.id, SEEDED.student1.email);
  await page.goto(`/mocks/${MOCK_ID}/review`);
  await expect(page.getByText("Report released").first()).toBeVisible();
  await expect(page.getByText(/Marked score/i).first()).toBeVisible();
  await expect(page.getByText("Topic breakdown")).toBeVisible();
  await expect(page.getByText("Weak topics and next steps")).toBeVisible();
  await expect(page.getByText("Full question review")).toBeVisible();
  // Correct answers/explanations are now shown for review.
  await expect(page.getByText("Explanation").first()).toBeVisible();
  await expect(page.getByText("Mark scheme").first()).toBeVisible();
  await expect(page.getByText("Great effort — revisit ratio sharing and geometry perimeter working.")).toBeVisible();
});

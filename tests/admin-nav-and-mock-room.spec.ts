import { expect, test } from "@playwright/test";

const adminEmail = "admin@summittuition.local";
const adminPassword = "local-test-password";

async function loginAsDemoAdmin(page: import("@playwright/test").Page) {
  const loginResponse = await page.request.post("/api/auth/login", {
    data: { email: adminEmail, password: adminPassword },
  });
  const loginBody = await loginResponse.json().catch(() => null);
  expect(loginResponse.ok(), `login API status ${loginResponse.status()}: ${JSON.stringify(loginBody)}`).toBeTruthy();
  const cookies = await page.context().cookies();
  if (!cookies.some((cookie) => cookie.name === "summit_session")) {
    await page.context().addCookies([
      {
        name: "summit_session",
        value: "admin-1",
        domain: "127.0.0.1",
        path: "/",
        httpOnly: true,
        sameSite: "Lax",
        expires: Math.floor(Date.now() / 1000) + 60 * 60,
      },
    ]);
  }
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin$/);
}

test("admin nav links and hard refresh keep authenticated session", async ({ page }) => {
  await loginAsDemoAdmin(page);

  const navItems = [
    { label: "Overview", expected: /\/admin$/ },
    { label: "Mocks", expected: /\/admin\/mocks/ },
    { label: "Question Bank", expected: /\/admin\/mocks#question-bank$/ },
    { label: "References", expected: /\/admin\/mocks#references$/ },
    { label: "Attempts", expected: /\/admin\/mocks#attempts$/ },
    { label: "Students", expected: /\/admin\/students$/ },
    { label: "Payments", expected: /\/admin$/ },
    { label: "Products", expected: /\/admin$/ },
  ];

  for (const item of navItems) {
    await page.goto("/admin");
    await page.getByRole("navigation", { name: "Admin sections" }).getByRole("link", { name: item.label }).click();
    await expect(page).not.toHaveURL(/\/login/);
    await expect(page).toHaveURL(item.expected);
  }

  await page.goto("/admin/mocks");
  await page.reload();
  await expect(page).not.toHaveURL(/\/login/);
  await expect(page.getByRole("heading", { name: /Mocks, questions and quality review/i })).toBeVisible();
});

test("50-question mock navigator defaults compact and screenshots desktop/mobile", async ({ page }) => {
  await loginAsDemoAdmin(page);
  await page.goto("/admin/mocks#generate");
  await page.getByRole("button", { name: "Generate draft" }).click();
  await expect(page.getByText(/50\/50 questions generated/i)).toBeVisible();

  await page.getByRole("link", { name: /Preview as Student/i }).last().click();
  await expect(page.getByText("Admin Preview")).toBeVisible();
  await expect(page.getByText("Q 1/50")).toBeVisible();
  await expect(page.getByRole("button", { name: "Show all questions" })).toBeVisible();
  await page.screenshot({ path: "test-results/question-nav-desktop.png", fullPage: false });

  await page.setViewportSize({ width: 375, height: 812 });
  await page.reload();
  await expect(page.getByText("Q 1/50")).toBeVisible();
  await expect(page.getByRole("button", { name: "Show all questions" })).toBeVisible();
  await page.screenshot({ path: "test-results/question-nav-mobile.png", fullPage: false });

  await page.getByRole("button", { name: "Show all questions" }).click();
  await expect(page.getByRole("button", { name: "Compact view" })).toBeVisible();
  await page.getByRole("button", { name: "Question 50, unanswered" }).click();
  await expect(page.getByText("Q 50/50")).toBeVisible();
});

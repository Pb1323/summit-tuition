import { expect, type Page } from "@playwright/test";

/**
 * Demo-mode login helper.
 *
 * The app runs against no DATABASE_URL in this test environment, which puts it in
 * "demo mode": student/admin state lives entirely in browser localStorage
 * (`summit-platform-session-v1` for the logged-in user id, `summit-platform-state-v1`
 * for platform data), driven by `src/context/platform-context.tsx`. The httpOnly
 * `summit_session` cookie set by POST /api/auth/login is still set for parity with
 * production, but nothing in demo mode actually reads it client-side — RequireAuth
 * gates purely on the localStorage session key. Setting only the cookie (as the
 * pre-existing admin-nav-and-mock-room.spec.ts helper does) is not sufficient here and
 * results in an immediate client-side redirect to /login. This helper sets both.
 */
export async function loginAsDemoUser(
  page: Page,
  userId: string,
  email: string,
  options: { resetAttempts?: boolean } = {}
) {
  const password = "local-test-password";
  const loginResponse = await page.request.post("/api/auth/login", {
    data: { email, password },
  });
  const loginBody = await loginResponse.json().catch(() => null);
  expect(loginResponse.ok(), `login API status ${loginResponse.status()}: ${JSON.stringify(loginBody)}`).toBeTruthy();

  // Establish the origin so localStorage writes land on the right page, then seed the
  // client-side session the platform context actually reads in demo mode.
  await page.goto("/login");

  if (options.resetAttempts) {
    // `summit-platform-state-v1` is only ever shallow-merged into the static seed
    // (`{ ...initialState, ...JSON.parse(raw) }` in platform-context.tsx), so writing
    // just `{ attempts: [] }` here wipes every seeded attempt (including the
    // pre-existing "already submitted"/"already released" ones for student-1's two
    // unlocked mocks) while leaving users/mocks/questions/etc. untouched. Only call
    // this on the first login of a test — calling it again after switching to a
    // different demo user would also wipe any attempt that user just created.
    await page.evaluate(() => {
      window.localStorage.setItem("summit-platform-state-v1", JSON.stringify({ attempts: [] }));
    });
  }

  await page.evaluate((id) => {
    window.localStorage.setItem("summit-platform-session-v1", id);
  }, userId);

  const cookies = await page.context().cookies();
  if (!cookies.some((cookie) => cookie.name === "summit_session")) {
    await page.context().addCookies([
      {
        name: "summit_session",
        value: userId,
        domain: "127.0.0.1",
        path: "/",
        httpOnly: true,
        sameSite: "Lax",
        expires: Math.floor(Date.now() / 1000) + 60 * 60,
      },
    ]);
  }
}

export const SEEDED = {
  admin: { id: "admin-1", email: "admin@summittuition.local" },
  student1: { id: "student-1", email: "student@example.com" },
  student2: { id: "student-2", email: "test-student@example.com" },
};

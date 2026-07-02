"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { ATTEMPTS, EMAIL_TEMPLATES, MASTER_ADMIN_EMAIL, MOCKS, PASSAGES, PRODUCT_PLANS, QUESTIONS, REFERENCES, SEEDED_USERS } from "@/data/platform";
import { analyseAttempt, scoreAnswers, weakTopicsForAttempt } from "@/lib/assessment";
import { generateMockFromReferenceProfile, type GenerateMockInput } from "@/lib/mock-generation";
import type { Attempt, EmailTemplate, MockExam, Passage, ProductPlan, Question, ReferenceSource, ReferenceStyle, StudentAccount, Subject } from "@/types/platform";

type PlatformState = {
  users: StudentAccount[];
  mocks: MockExam[];
  questions: Question[];
  passages: Passage[];
  attempts: Attempt[];
  references: ReferenceSource[];
  products: ProductPlan[];
  emailTemplates: EmailTemplate[];
};

type RegisterInput = {
  name: string;
  email: string;
  password: string;
  plan: string;
};

type PlatformContextValue = PlatformState & {
  currentUser: StudentAccount | null;
  isClientReady: boolean;
  login: (email: string, password: string) => Promise<{ ok: true; user: StudentAccount } | { ok: false; message: string }>;
  register: (input: RegisterInput) => Promise<{ ok: true } | { ok: false; message: string }>;
  logout: () => Promise<void>;
  approveUser: (studentId: string, approved: boolean) => Promise<void>;
  rejectUser: (studentId: string) => Promise<void>;
  approveAndUnlockFirstMock: (studentId: string) => Promise<void>;
  createTestStudent: () => Promise<void>;
  assignPlan: (studentId: string, plan: string) => Promise<void>;
  unlockMock: (studentId: string, mockId: string, unlocked: boolean) => Promise<void>;
  setMockPublished: (mockId: string, published: boolean) => Promise<void>;
  createOriginalMockFromReference: (referenceId: string, subject: Subject) => void;
  generateMockDraft: (input: Omit<GenerateMockInput, "reference"> & { referenceId: string }) => { ok: true; mockId: string; questionCount: number; totalMarks: number } | { ok: false; message: string };
  updateMockDraft: (mockId: string, patch: Partial<MockExam>) => void;
  upsertQuestion: (question: Question) => void;
  setReferenceStyle: (referenceId: string, style: ReferenceStyle) => void;
  addReference: (reference: Omit<ReferenceSource, "id" | "lastAnalysedAt">) => void;
  submitAttempt: (mockId: string, answers: Record<string, string>, flaggedQuestionIds: string[], timeSpentSeconds: number) => Promise<Attempt | null>;
  saveAttemptDraft: (mockId: string, answers: Record<string, string>, flaggedQuestionIds: string[], timeSpentSeconds: number) => void;
  releaseReport: (attemptId: string, feedback: string) => Promise<void>;
  addFeedback: (attemptId: string, feedback: string) => Promise<void>;
};

const STORAGE_KEY = "summit-platform-state-v1";
const SESSION_KEY = "summit-platform-session-v1";

const initialState: PlatformState = {
  users: SEEDED_USERS,
  mocks: MOCKS,
  questions: QUESTIONS,
  passages: PASSAGES,
  attempts: ATTEMPTS,
  references: REFERENCES,
  products: PRODUCT_PLANS,
  emailTemplates: EMAIL_TEMPLATES,
};

const PlatformContext = createContext<PlatformContextValue | null>(null);

type PlatformSnapshot = PlatformState & {
  currentUserId: string | null;
  isClientReady: boolean;
};

const SERVER_SNAPSHOT: PlatformSnapshot = {
  ...initialState,
  currentUserId: null,
  isClientReady: false,
};

let memoryState: PlatformState = initialState;
let memoryCurrentUserId: string | null = null;
let hasLoadedBrowserState = false;
let clientSnapshot: PlatformSnapshot = SERVER_SNAPSHOT;
const listeners = new Set<() => void>();

function hashPassword(password: string, salt: string) {
  if (typeof window === "undefined") return "";
  return window.btoa(`${salt}:${password}`);
}

function loadState() {
  if (typeof window === "undefined") return initialState;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return initialState;
  try {
    return { ...initialState, ...JSON.parse(raw) } as PlatformState;
  } catch {
    return initialState;
  }
}

function buildSnapshot(): PlatformSnapshot {
  return {
    ...memoryState,
    currentUserId: memoryCurrentUserId,
    isClientReady: hasLoadedBrowserState,
  };
}

function persistState() {
  if (typeof window === "undefined" || !hasLoadedBrowserState) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryState));
}

function emitChange() {
  clientSnapshot = buildSnapshot();
  listeners.forEach((listener) => listener());
}

async function refreshFromServer() {
  if (typeof window === "undefined") return;
  try {
    const response = await fetch("/api/platform/bootstrap", { credentials: "include", cache: "no-store" });
    if (!response.ok) return;
    const data = (await response.json()) as PlatformState & { currentUser: StudentAccount | null };
    memoryState = {
      users: data.users,
      mocks: data.mocks,
      questions: data.questions,
      passages: data.passages,
      attempts: data.attempts,
      references: data.references,
      products: data.products,
      emailTemplates: data.emailTemplates,
    };
    memoryCurrentUserId = data.currentUser?.id ?? null;
    persistState();
    emitChange();
  } catch {
    // Keep local demo state if the server/database is unavailable.
  }
}

function ensureBrowserStateLoaded() {
  if (typeof window === "undefined" || hasLoadedBrowserState) return;
  memoryState = loadState();
  memoryCurrentUserId = window.localStorage.getItem(SESSION_KEY);
  hasLoadedBrowserState = true;
  clientSnapshot = buildSnapshot();
  void refreshFromServer();
}

function subscribe(listener: () => void) {
  ensureBrowserStateLoaded();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getClientSnapshot() {
  ensureBrowserStateLoaded();
  return clientSnapshot;
}

function getServerSnapshot() {
  return SERVER_SNAPSHOT;
}

function updateStore(updater: (state: PlatformState) => PlatformState) {
  memoryState = updater(memoryState);
  persistState();
  emitChange();
}

async function postAndRefresh(url: string, body: unknown) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
    if (!response.ok) return false;
    await refreshFromServer();
    return true;
  } catch {
    return false;
  }
}

export function PlatformProvider({ children }: { children: React.ReactNode }) {
  const state = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  useEffect(() => {
    void refreshFromServer();
  }, []);

  const currentUser = useMemo(
    () => state.users.find((user) => user.id === state.currentUserId) ?? null,
    [state.currentUserId, state.users]
  );

  function updateUsers(updater: (users: StudentAccount[]) => StudentAccount[]) {
    updateStore((prev) => ({ ...prev, users: updater(prev.users) }));
  }

  const value: PlatformContextValue = {
    ...state,
    currentUser,
    isClientReady: state.isClientReady,
    async login(email, password) {
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json().catch(() => null);
        if (response.ok && data?.ok && data.user) {
          await refreshFromServer();
          return { ok: true, user: data.user as StudentAccount };
        }
        if (response.status !== 404) return { ok: false, message: data?.message ?? "Unable to sign in." };
      } catch {
        // Fall back to local demo login below.
      }
      const normalisedEmail = email.trim().toLowerCase();
      const user = state.users.find((item) => item.email.toLowerCase() === normalisedEmail);
      if (!user) return { ok: false, message: "No account found for that email." };
      if (password.length < 8) return { ok: false, message: "Use at least 8 characters." };
      const expected = hashPassword(password, user.id);
      if (user.passwordHash && user.passwordHash !== expected) {
        return { ok: false, message: "The password did not match this account." };
      }
      if (!user.passwordHash) {
        updateUsers((users) => users.map((item) => (item.id === user.id ? { ...item, passwordHash: expected } : item)));
      }
      memoryCurrentUserId = user.id;
      window.localStorage.setItem(SESSION_KEY, user.id);
      emitChange();
      return { ok: true, user: { ...user, passwordHash: expected } };
    },
    async register(input) {
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(input),
        });
        const data = await response.json().catch(() => null);
        if (response.ok && data?.ok && data.mode !== "demo") {
          await refreshFromServer();
          return { ok: true };
        }
        if (!response.ok) return { ok: false, message: data?.message ?? "Unable to create account." };
      } catch {
        // Fall back to local demo registration below.
      }
      const email = input.email.trim().toLowerCase();
      if (input.password.length < 8) return { ok: false, message: "Use at least 8 characters." };
      if (state.users.some((user) => user.email.toLowerCase() === email)) {
        return { ok: false, message: "An account already exists for that email. Sign in to finish first-run setup." };
      }
      const id = `student-${Date.now()}`;
      const user: StudentAccount = {
        id,
        name: input.name,
        email,
        passwordHash: hashPassword(input.password, id),
        role: email === MASTER_ADMIN_EMAIL ? "admin" : "student",
        approved: email === MASTER_ADMIN_EMAIL,
        plan: input.plan,
        paymentStatus: "pending",
        unlockedMockIds: [],
        createdAt: new Date().toISOString(),
      };
      updateStore((prev) => ({ ...prev, users: [...prev.users, user] }));
      return { ok: true };
    },
    async logout() {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" }).catch(() => undefined);
      memoryCurrentUserId = null;
      window.localStorage.removeItem(SESSION_KEY);
      emitChange();
    },
    async approveUser(studentId, approved) {
      if (currentUser?.role !== "admin") return;
      if (await postAndRefresh(`/api/admin/students/${studentId}/approve`, { approved })) return;
      updateUsers((users) => users.map((user) => (user.id === studentId ? { ...user, approved } : user)));
    },
    async rejectUser(studentId) {
      if (currentUser?.role !== "admin") return;
      if (await postAndRefresh(`/api/admin/students/${studentId}/reject`, {})) return;
      updateStore((prev) => ({
        ...prev,
        users: prev.users.filter((user) => user.id !== studentId),
        attempts: prev.attempts.filter((attempt) => attempt.studentId !== studentId),
      }));
    },
    async approveAndUnlockFirstMock(studentId) {
      if (currentUser?.role !== "admin") return;
      if (await postAndRefresh(`/api/admin/students/${studentId}/unlock-first-mock`, {})) return;
      const firstMock = state.mocks.find((mock) => mock.published && (mock.subject === "Maths" || mock.subject === "English"));
      updateUsers((users) => users.map((user) => {
        if (user.id !== studentId) return user;
        const unlockedMockIds = firstMock && !user.unlockedMockIds.includes(firstMock.id) ? [...user.unlockedMockIds, firstMock.id] : user.unlockedMockIds;
        return { ...user, approved: true, paymentStatus: user.paymentStatus === "none" ? "pending" : user.paymentStatus, unlockedMockIds };
      }));
    },
    async createTestStudent() {
      if (currentUser?.role !== "admin") return;
      const id = `student-test-${Date.now()}`;
      updateStore((prev) => ({
        ...prev,
        users: [
          ...prev.users,
          {
            id,
            name: "Test Student",
            email: `test-student-${Date.now()}@example.com`,
            role: "student",
            approved: false,
            plan: "Weekly Mock Club Plus",
            paymentStatus: "pending",
            unlockedMockIds: [],
            createdAt: new Date().toISOString(),
          },
        ],
      }));
    },
    async assignPlan(studentId, plan) {
      if (currentUser?.role !== "admin") return;
      if (await postAndRefresh(`/api/admin/students/${studentId}/assign-plan`, { plan })) return;
      updateUsers((users) => users.map((user) => (user.id === studentId ? { ...user, plan, paymentStatus: plan ? "paid" : user.paymentStatus } : user)));
    },
    async unlockMock(studentId, mockId, unlocked) {
      if (currentUser?.role !== "admin") return;
      if (await postAndRefresh(`/api/admin/students/${studentId}/unlock-mock`, { mockId, unlocked })) return;
      updateUsers((users) =>
        users.map((user) => {
          if (user.id !== studentId) return user;
          const ids = new Set(user.unlockedMockIds);
          if (unlocked) ids.add(mockId);
          else ids.delete(mockId);
          return { ...user, unlockedMockIds: Array.from(ids) };
        })
      );
    },
    async setMockPublished(mockId, published) {
      if (currentUser?.role !== "admin") return;
      if (await postAndRefresh(`/api/admin/mocks/${mockId}/publish`, { published })) return;
      updateStore((prev) => ({ ...prev, mocks: prev.mocks.map((mock) => (mock.id === mockId ? { ...mock, published } : mock)) }));
    },
    createOriginalMockFromReference(referenceId, subject) {
      if (currentUser?.role !== "admin") return;
      const ref = state.references.find((item) => item.id === referenceId);
      if (!ref || ref.style !== "GL-style" || (subject !== "Maths" && subject !== "English")) return;
      const generated = generateMockFromReferenceProfile({
        subject,
        difficultyLabel: "Summit Stretch",
        questionCount: 50,
        durationMinutes: 50,
        reference: ref,
      });
      updateStore((prev) => ({
        ...prev,
        mocks: [...prev.mocks, generated.mock],
        questions: [...prev.questions, ...generated.questions],
        passages: [...prev.passages, ...generated.passages],
      }));
    },
    generateMockDraft(input) {
      if (currentUser?.role !== "admin") return { ok: false, message: "Admin access is required to generate mocks." };
      const reference = state.references.find((item) => item.id === input.referenceId);
      if (!reference) return { ok: false, message: "Choose a reference profile first." };
      if (reference.style !== "GL-style") return { ok: false, message: "Only GL-style profiles can generate v1 mocks." };
      const generated = generateMockFromReferenceProfile({ ...input, reference });
      updateStore((prev) => ({
        ...prev,
        mocks: [...prev.mocks, generated.mock],
        questions: [...prev.questions, ...generated.questions],
        passages: [...prev.passages, ...generated.passages],
      }));
      return { ok: true, mockId: generated.mock.id, questionCount: generated.questions.length, totalMarks: generated.mock.totalMarks };
    },
    updateMockDraft(mockId, patch) {
      if (currentUser?.role !== "admin") return;
      updateStore((prev) => ({ ...prev, mocks: prev.mocks.map((mock) => (mock.id === mockId ? { ...mock, ...patch } : mock)) }));
    },
    upsertQuestion(question) {
      if (currentUser?.role !== "admin") return;
      updateStore((prev) => {
        const exists = prev.questions.some((item) => item.id === question.id);
        return { ...prev, questions: exists ? prev.questions.map((item) => (item.id === question.id ? question : item)) : [...prev.questions, question] };
      });
    },
    setReferenceStyle(referenceId, style) {
      if (currentUser?.role !== "admin") return;
      updateStore((prev) => ({
        ...prev,
        references: prev.references.map((reference) => (reference.id === referenceId ? { ...reference, style } : reference)),
      }));
    },
    addReference(reference) {
      if (currentUser?.role !== "admin") return;
      updateStore((prev) => ({
        ...prev,
        references: [
          ...prev.references,
          { ...reference, id: `ref-${Date.now()}`, lastAnalysedAt: new Date().toISOString().slice(0, 10) },
        ],
      }));
    },
    async submitAttempt(mockId, answers, flaggedQuestionIds, timeSpentSeconds) {
      try {
        const response = await fetch("/api/attempts/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ mockId, answers, flaggedQuestionIds, timeSpentSeconds }),
        });
        if (response.ok) {
          await refreshFromServer();
          return null;
        }
      } catch {
        // Fall back to local demo attempt below.
      }
      const mock = state.mocks.find((item) => item.id === mockId);
      if (!currentUser || !mock) throw new Error("Cannot submit attempt without a signed-in student and mock.");
      if (currentUser.role !== "student" || !currentUser.approved || !currentUser.unlockedMockIds.includes(mock.id) || !mock.published) {
        throw new Error("This mock is not available for submission by the current account.");
      }
      const score = scoreAnswers(mock, answers, state.questions);
      const weakTopics = weakTopicsForAttempt(mock, answers, state.questions);
      const analysis = analyseAttempt(mock, answers, state.questions);
      const attempt: Attempt = {
        id: `attempt-${Date.now()}`,
        studentId: currentUser.id,
        mockId,
        answers,
        flaggedQuestionIds,
        score: score.score,
        maxScore: score.maxScore,
        submittedAt: new Date().toISOString(),
        timeSpentSeconds,
        status: "submitted",
        adminFeedback: "",
        weakTopics,
        reportReady: false,
        errorPatterns: Object.fromEntries(analysis.weakTopics.flatMap((topic) => topic.questionIds.map((id) => [id, topic.pattern]))),
      };
      updateStore((prev) => ({
        ...prev,
        attempts: [...prev.attempts.filter((item) => !(item.studentId === currentUser.id && item.mockId === mockId && item.status === "in_progress")), attempt],
      }));
      return attempt;
    },
    saveAttemptDraft(mockId, answers, flaggedQuestionIds, timeSpentSeconds) {
      if (!currentUser) return;
      const existing = state.attempts.find((item) => item.studentId === currentUser.id && item.mockId === mockId && item.status === "in_progress");
      const draft: Attempt = {
        id: existing?.id ?? `draft-${Date.now()}`,
        studentId: currentUser.id,
        mockId,
        answers,
        flaggedQuestionIds,
        score: 0,
        maxScore: 0,
        timeSpentSeconds,
        status: "in_progress",
        adminFeedback: "",
        weakTopics: [],
        reportReady: false,
      };
      updateStore((prev) => ({ ...prev, attempts: [...prev.attempts.filter((item) => item.id !== draft.id), draft] }));
    },
    async releaseReport(attemptId, feedback) {
      if (currentUser?.role !== "admin") return;
      if (await postAndRefresh(`/api/admin/reports/${attemptId}/release`, { feedback })) return;
      updateStore((prev) => ({
        ...prev,
        attempts: prev.attempts.map((attempt) =>
          attempt.id === attemptId ? { ...attempt, status: "report_released", reportReady: true, adminFeedback: feedback || attempt.adminFeedback } : attempt
        ),
      }));
    },
    async addFeedback(attemptId, feedback) {
      if (currentUser?.role !== "admin") return;
      if (await postAndRefresh(`/api/admin/reports/${attemptId}/feedback`, { feedback })) return;
      updateStore((prev) => ({
        ...prev,
        attempts: prev.attempts.map((attempt) => (attempt.id === attemptId ? { ...attempt, adminFeedback: feedback } : attempt)),
      }));
    },
  };

  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
}

export function usePlatform() {
  const context = useContext(PlatformContext);
  if (!context) throw new Error("usePlatform must be used inside PlatformProvider");
  return context;
}

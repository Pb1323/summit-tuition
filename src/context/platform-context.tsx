"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import { ATTEMPTS, EMAIL_TEMPLATES, MASTER_ADMIN_EMAIL, MOCKS, PRODUCT_PLANS, QUESTIONS, REFERENCES, SEEDED_USERS } from "@/data/platform";
import { scoreAnswers, weakTopicsForAttempt } from "@/lib/assessment";
import type { Attempt, EmailTemplate, MockExam, ProductPlan, ReferenceSource, StudentAccount, Subject } from "@/types/platform";

type PlatformState = {
  users: StudentAccount[];
  mocks: MockExam[];
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
  login: (email: string, password: string) => { ok: true; user: StudentAccount } | { ok: false; message: string };
  register: (input: RegisterInput) => { ok: true } | { ok: false; message: string };
  logout: () => void;
  approveUser: (studentId: string, approved: boolean) => void;
  assignPlan: (studentId: string, plan: string) => void;
  unlockMock: (studentId: string, mockId: string, unlocked: boolean) => void;
  setMockPublished: (mockId: string, published: boolean) => void;
  createOriginalMockFromReference: (referenceId: string, subject: Subject) => void;
  addReference: (reference: Omit<ReferenceSource, "id" | "lastAnalysedAt">) => void;
  submitAttempt: (mockId: string, answers: Record<string, string>, flaggedQuestionIds: string[], timeSpentSeconds: number) => Attempt;
  saveAttemptDraft: (mockId: string, answers: Record<string, string>, flaggedQuestionIds: string[], timeSpentSeconds: number) => void;
  releaseReport: (attemptId: string, feedback: string) => void;
  addFeedback: (attemptId: string, feedback: string) => void;
};

const STORAGE_KEY = "summit-platform-state-v1";
const SESSION_KEY = "summit-platform-session-v1";

const initialState: PlatformState = {
  users: SEEDED_USERS,
  mocks: MOCKS,
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

function ensureBrowserStateLoaded() {
  if (typeof window === "undefined" || hasLoadedBrowserState) return;
  memoryState = loadState();
  memoryCurrentUserId = window.localStorage.getItem(SESSION_KEY);
  hasLoadedBrowserState = true;
  clientSnapshot = buildSnapshot();
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

export function PlatformProvider({ children }: { children: React.ReactNode }) {
  const state = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

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
    login(email, password) {
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
    register(input) {
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
    logout() {
      memoryCurrentUserId = null;
      window.localStorage.removeItem(SESSION_KEY);
      emitChange();
    },
    approveUser(studentId, approved) {
      updateUsers((users) => users.map((user) => (user.id === studentId ? { ...user, approved } : user)));
    },
    assignPlan(studentId, plan) {
      updateUsers((users) => users.map((user) => (user.id === studentId ? { ...user, plan, paymentStatus: plan ? "paid" : user.paymentStatus } : user)));
    },
    unlockMock(studentId, mockId, unlocked) {
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
    setMockPublished(mockId, published) {
      updateStore((prev) => ({ ...prev, mocks: prev.mocks.map((mock) => (mock.id === mockId ? { ...mock, published } : mock)) }));
    },
    createOriginalMockFromReference(referenceId, subject) {
      const ref = state.references.find((item) => item.id === referenceId);
      const pool = QUESTIONS.filter((question) => question.subject === subject && question.tags.includes("GL-style"));
      if (!ref || ref.style !== "GL-style" || pool.length === 0) return;
      const id = `${subject.toLowerCase()}-generated-${Date.now()}`;
      const totalMarks = pool.reduce((sum, question) => sum + question.marks, 0);
      updateStore((prev) => ({
        ...prev,
        mocks: [
          ...prev.mocks,
          {
            id,
            title: `${subject} Original GL-Style Draft`,
            subject,
            style: "GL-style",
            durationMinutes: 20,
            totalMarks,
            questionIds: pool.map((question) => question.id),
            published: false,
            releaseDate: new Date().toISOString().slice(0, 10),
            tier: "Admin draft",
            description: `Original ${subject} draft generated from ${ref.title} metadata. Review before publishing.`,
          },
        ],
      }));
    },
    addReference(reference) {
      updateStore((prev) => ({
        ...prev,
        references: [
          ...prev.references,
          { ...reference, id: `ref-${Date.now()}`, lastAnalysedAt: new Date().toISOString().slice(0, 10) },
        ],
      }));
    },
    submitAttempt(mockId, answers, flaggedQuestionIds, timeSpentSeconds) {
      const mock = state.mocks.find((item) => item.id === mockId);
      if (!currentUser || !mock) throw new Error("Cannot submit attempt without a signed-in student and mock.");
      const score = scoreAnswers(mock, answers);
      const weakTopics = weakTopicsForAttempt(mock, answers);
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
    releaseReport(attemptId, feedback) {
      updateStore((prev) => ({
        ...prev,
        attempts: prev.attempts.map((attempt) =>
          attempt.id === attemptId ? { ...attempt, status: "report_released", reportReady: true, adminFeedback: feedback || attempt.adminFeedback } : attempt
        ),
      }));
    },
    addFeedback(attemptId, feedback) {
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

"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { RequireAuth, GlowCard, PremiumBadge } from "@/components/platform/ui";
import { usePlatform } from "@/context/platform-context";

const THEME_KEY = "summit-dashboard-theme";

export default function SettingsPage() {
  return (
    <RequireAuth role="student">
      <Container className="py-10">
        <SettingsForm />
      </Container>
    </RequireAuth>
  );
}

function SettingsForm() {
  const { currentUser, updateAccount } = usePlatform();
  const [name, setName] = useState(currentUser?.name ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [dark, setDark] = useState(() => typeof window !== "undefined" && window.localStorage.getItem(THEME_KEY) === "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-dashboard-theme", dark ? "dark" : "light");
  }, [dark]);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    window.localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    document.documentElement.setAttribute("data-dashboard-theme", next ? "dark" : "light");
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setMessage("");
    const result = await updateAccount({
      name: name.trim() !== currentUser?.name ? name.trim() : undefined,
      currentPassword: currentPassword || undefined,
      newPassword: newPassword || undefined,
    });
    if (result.ok) {
      setMessage("Saved.");
      setCurrentPassword("");
      setNewPassword("");
    } else {
      setMessage(result.message);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <PremiumBadge>Account</PremiumBadge>
        <h1 className="mt-3 text-3xl font-black text-navy">Settings</h1>
        <p className="mt-2 text-muted">Update your name and password, and set your preferred dashboard appearance.</p>
      </div>

      <GlowCard className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-bold text-navy" htmlFor="name">Name</label>
            <input id="name" value={name} onChange={(event) => setName(event.target.value)} className="mt-1 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-gold" />
          </div>
          <div>
            <label className="text-sm font-bold text-navy" htmlFor="current-password">Current password</label>
            <input id="current-password" type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} placeholder="Required to change password" className="mt-1 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-gold" />
          </div>
          <div>
            <label className="text-sm font-bold text-navy" htmlFor="new-password">New password</label>
            <input id="new-password" type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} placeholder="Leave blank to keep current password" className="mt-1 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-gold" />
          </div>
          {message && <p className="rounded-xl bg-cream px-4 py-2 text-sm font-bold text-navy" role="status">{message}</p>}
          <button type="submit" className="rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-navy">Save changes</button>
        </form>
      </GlowCard>

      <GlowCard className="p-6">
        <h2 className="text-lg font-bold text-navy">Preferences</h2>
        <div className="mt-4 flex items-center justify-between rounded-xl bg-cream px-4 py-3">
          <div>
            <p className="font-bold text-navy">Dark mode</p>
            <p className="text-sm text-muted">Applies to your dashboard only.</p>
          </div>
          <button type="button" onClick={toggleDark} className={`h-8 w-14 rounded-full transition ${dark ? "bg-navy" : "bg-line"}`} aria-pressed={dark} aria-label="Toggle dark mode">
            <span className={`block h-6 w-6 translate-x-1 rounded-full bg-white shadow transition ${dark ? "translate-x-7" : ""}`} />
          </button>
        </div>
      </GlowCard>
    </div>
  );
}

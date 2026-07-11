export type NotesThemeMode = "default" | "focus";

export interface NotesTheme {
  pageBg: string;
  panelBg: string;
  cardBg: string;
  headline: string;
  body: string;
  subtext: string;
  hairline: string;
  ringTrack: string;
  sidebarBg: string;
  inputBg: string;
}

const DEFAULT_THEME: NotesTheme = {
  pageBg: "#EFEAE0",
  panelBg: "#F8F5EE",
  cardBg: "#FFFFFF",
  headline: "#0A1F44",
  body: "rgba(10,31,68,0.78)",
  subtext: "rgba(10,31,68,0.45)",
  hairline: "rgba(10,31,68,0.1)",
  ringTrack: "rgba(10,31,68,0.1)",
  sidebarBg: "#F8F5EE",
  inputBg: "#FFFFFF",
};

const FOCUS_THEME: NotesTheme = {
  pageBg: "#05070d",
  panelBg: "#12161f",
  cardBg: "#161b26",
  headline: "#F2EFE6",
  body: "rgba(242,239,230,0.82)",
  subtext: "rgba(242,239,230,0.45)",
  hairline: "rgba(201,162,75,0.18)",
  ringTrack: "rgba(201,162,75,0.15)",
  sidebarBg: "#0b0e15",
  inputBg: "#0d1017",
};

export const NOTES_GOLD = "#C9A24B";
export const NOTES_NAVY = "#0A1F44";
export const NOTES_CREAM = "#F8F5EE";

export function getNotesTheme(mode: NotesThemeMode): NotesTheme {
  return mode === "focus" ? FOCUS_THEME : DEFAULT_THEME;
}

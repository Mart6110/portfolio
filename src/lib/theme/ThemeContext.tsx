"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

let currentTheme: Theme = "light";
let initialized = false;
const listeners = new Set<() => void>();

function readInitialTheme(): Theme {
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Theme {
  if (!initialized) {
    initialized = true;
    currentTheme = readInitialTheme();
    document.documentElement.setAttribute("data-theme", currentTheme);
  }
  return currentTheme;
}

function getServerSnapshot(): Theme {
  return "light";
}

function setTheme(theme: Theme) {
  currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  window.localStorage.setItem(STORAGE_KEY, theme);
  listeners.forEach((listener) => listener());
}

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}

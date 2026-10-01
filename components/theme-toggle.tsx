"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "@/components/icons";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const listeners = new Set<() => void>();

function readTheme(): Theme {
  const explicit = document.documentElement.dataset.theme;
  if (explicit === "light" || explicit === "dark") return explicit;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", listener);
  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", listener);
  };
}

function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {}
  listeners.forEach((listener) => listener());
}

export const themeScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('${STORAGE_KEY}');if(t==='light'||t==='dark')d.dataset.theme=t;}catch(e){}})();`;

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme | null>(subscribe, readTheme, () => null);
  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="inline-flex size-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-paper-raised hover:text-ink"
      aria-label={theme ? `Switch to ${next} theme` : "Toggle theme"}
    >
      {theme === "dark" ? <Sun width={18} height={18} /> : <Moon width={18} height={18} />}
    </button>
  );
}

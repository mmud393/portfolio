import { useCallback, useEffect, useRef, useState } from 'react';

type Theme = 'dark' | 'light';

const STORAGE_KEY = 'portfolio-theme';
const AUTO_SWITCH_DELAY_MS = 48_000;

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/** Manages dark/light theme, persisted to localStorage and applied via a root class. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Set while an automatic switch is applied so it isn't saved as the visitor's choice.
  const isAutoSwitch = useRef(false);
  const hasToggled = useRef(false);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    if (isAutoSwitch.current) {
      isAutoSwitch.current = false;
      return;
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // One-time automatic switch a minute after load, unless the visitor already picked a mode.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (hasToggled.current) return;
      isAutoSwitch.current = true;
      setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }, AUTO_SWITCH_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const toggleTheme = useCallback(() => {
    hasToggled.current = true;
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme };
}

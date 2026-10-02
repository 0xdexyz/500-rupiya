import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

export type Theme = 'light' | 'dark';

const KEY = 'hs.theme';

function readStored(): Theme {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

/** Colour of the browser's own chrome (e.g. a phone's address bar): matches the green
    navigation bar that sits at the top of every page, so the two read as one surface. */
export function syncThemeColor() {
  const dark = document.documentElement.dataset.theme === 'dark';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0b3d1a' : '#02791c');
}

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({ theme: 'light', toggle: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readStored);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    syncThemeColor();
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
